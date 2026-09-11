(function(){
  'use strict';

  var CSV_URL = 'sample_listings_chennai.csv?v=20260911-final3';
  var raw = [];

  function $(id){ return document.getElementById(id); }
  function uniq(values){
    var out = [];
    var seen = Object.create(null);
    values.forEach(function(v){
      var s = String(v == null ? '' : v).trim();
      if(s && !seen[s]){ seen[s] = true; out.push(s); }
    });
    return out;
  }
  function median(values){
    var x = values.filter(function(v){ return Number.isFinite(v); }).slice().sort(function(a,b){ return a-b; });
    if(!x.length) return null;
    var m = Math.floor(x.length/2);
    return x.length % 2 ? x[m] : (x[m-1] + x[m]) / 2;
  }
  function countBy(rows, fn){
    var out = Object.create(null);
    rows.forEach(function(r){
      var key = fn(r);
      if(key) out[key] = (out[key] || 0) + 1;
    });
    return out;
  }
  function top(o){
    var entries = Object.keys(o).map(function(k){ return [k,o[k]]; });
    entries.sort(function(a,b){ return b[1]-a[1]; });
    return entries.length ? entries[0] : [null,0];
  }
  function escapeHtml(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }
  function meaning(skill){
    var map = {
      'SQL':'Querying and analysing data',
      'Excel':'Spreadsheet analysis and reporting',
      'Power BI':'Dashboarding and reporting',
      'Python':'Automation and data analysis',
      'Requirements Gathering':'Understanding business needs',
      'Stakeholder Management':'Working with business users',
      'Process Mapping':'Understanding and improving processes',
      'Agile':'Iterative delivery and teamwork',
      'Jira':'Task and workflow tracking',
      'PowerPoint':'Business communication',
      'DAX':'Advanced BI calculations',
      'ETL':'Data preparation and integration',
      'Product Analytics':'Product and user behaviour analysis',
      'Tableau':'Data visualisation',
      'Risk Analytics':'Risk-focused analysis',
      'Client Management':'Working with clients',
      'Statistics':'Quantitative analysis',
      'A/B Testing':'Testing product changes'
    };
    return map[skill] || 'Capability mentioned in the listing';
  }
  function parseCSV(text){
    var rows = [];
    var row = [];
    var cell = '';
    var quoted = false;
    for(var i=0;i<text.length;i++){
      var c = text[i];
      var n = text[i+1];
      if(quoted){
        if(c === '"' && n === '"'){ cell += '"'; i++; }
        else if(c === '"'){ quoted = false; }
        else{ cell += c; }
      }else if(c === '"'){ quoted = true; }
      else if(c === ','){ row.push(cell); cell = ''; }
      else if(c === '\n'){
        row.push(cell);
        if(row.some(function(v){ return v.trim() !== ''; })) rows.push(row);
        row = []; cell = '';
      }else if(c !== '\r'){ cell += c; }
    }
    row.push(cell);
    if(row.some(function(v){ return v.trim() !== ''; })) rows.push(row);
    if(!rows.length) return [];
    var headers = rows.shift().map(function(h){ return h.trim(); });
    return rows.map(function(r){
      var obj = {};
      headers.forEach(function(h,idx){ obj[h] = (r[idx] == null ? '' : r[idx]).trim(); });
      return obj;
    });
  }
  function fillSelect(id, values, label){
    var el = $(id);
    el.innerHTML = '<option value="All">' + label + '</option>';
    uniq(values).sort(function(a,b){ return a.localeCompare(b); }).forEach(function(v){
      var opt = document.createElement('option');
      opt.value = v; opt.textContent = v; el.appendChild(opt);
    });
  }
  function filtered(){
    var role = $('role').value;
    var industry = $('industry').value;
    var work = $('work').value;
    var location = $('location').value;
    return raw.filter(function(x){
      return (role === 'All' || x['Job Title'] === role) &&
             (industry === 'All' || x['Industry'] === industry) &&
             (work === 'All' || x['Work Arrangement'] === work) &&
             (location === 'All' || x['Location'] === location);
    });
  }
  function renderBars(id,title,items,formatter){
    var el = $(id);
    el.innerHTML = '<h3>' + title + '</h3>';
    if(!items.length){ el.insertAdjacentHTML('beforeend','<div class="empty">No data for this selection.</div>'); return; }
    var max = Math.max.apply(null,items.map(function(x){ return x.v; }).concat([1]));
    var wrap = document.createElement('div');
    wrap.className = 'bars';
    items.forEach(function(item){
      var row = document.createElement('div'); row.className='barrow';
      var label = document.createElement('div'); label.className='barlabel'; label.textContent=item.k; label.title=item.k;
      var track = document.createElement('div'); track.className='track';
      var fill = document.createElement('div'); fill.className='fill'; fill.style.width=Math.max(2,(item.v/max)*100)+'%';
      track.appendChild(fill);
      var value = document.createElement('div'); value.className='value'; value.textContent=formatter(item.v);
      row.appendChild(label); row.appendChild(track); row.appendChild(value); wrap.appendChild(row);
    });
    el.appendChild(wrap);
  }
  function render(){
    var rows = filtered();
    var n = rows.length;
    var mids = rows.map(function(x){ return (x.min+x.max)/2; });
    $('kpiListings').textContent = n || '—';
    $('kpiSalary').textContent = mids.length ? '₹' + median(mids).toFixed(1) + ' LPA' : '—';
    var roles = countBy(rows,function(x){ return x['Job Title']; });
    $('kpiRole').textContent = top(roles)[0] || '—';
    var skills = {};
    rows.forEach(function(x){ x.skills.forEach(function(s){ skills[s]=(skills[s]||0)+1; }); });
    $('kpiSkill').textContent = top(skills)[0] || '—';
    $('status').className='status good';
    $('status').textContent='Showing ' + n + ' of ' + raw.length + ' repository records. All numbers are calculated from the CSV.';
    if(!n){
      ['salaryBox','skillBox','areaBox','workBox','industryBox','roleBox','profileBox'].forEach(function(id){ $(id).innerHTML='<div class="empty">No records match the selected filters.</div>'; });
      $('skillBody').innerHTML='<tr><td colspan="4">No records match these filters.</td></tr>';
      return;
    }
    var salaryMap = {};
    rows.forEach(function(x){ var k=x['Job Title']; if(!salaryMap[k]) salaryMap[k]=[]; salaryMap[k].push((x.min+x.max)/2); });
    var salaryItems = Object.keys(salaryMap).map(function(k){ return {k:k,v:median(salaryMap[k])}; }).sort(function(a,b){ return b.v-a.v; });
    renderBars('salaryBox','Typical Salary Midpoint by Role',salaryItems,function(v){ return '₹'+v.toFixed(1)+' LPA'; });
    var skillItems = Object.keys(skills).map(function(k){ return {k:k,v:skills[k]/n*100}; }).sort(function(a,b){ return b.v-a.v; }).slice(0,12);
    renderBars('skillBox','Skills Mentioned Most Often',skillItems,function(v){ return v.toFixed(1)+'%'; });
    var areaMap = countBy(rows,function(x){ return x.Location; });
    var areaItems = Object.keys(areaMap).map(function(k){ return {k:k,v:areaMap[k]}; }).sort(function(a,b){ return b.v-a.v; }).slice(0,10);
    renderBars('areaBox','Where Sampled Jobs Are Located',areaItems,function(v){ return v+' listings'; });
    var workMap = countBy(rows,function(x){ return x['Work Arrangement']; });
    var workItems = Object.keys(workMap).map(function(k){ return {k:k,v:workMap[k]}; });
    renderBars('workBox','Work Style Mix',workItems,function(v){ return v+' listings'; });
    var industryMap = countBy(rows,function(x){ return x.Industry; });
    var industryItems = Object.keys(industryMap).map(function(k){ return {k:k,v:industryMap[k]}; }).sort(function(a,b){ return b.v-a.v; });
    renderBars('industryBox','Industry Mix',industryItems,function(v){ return v+' listings'; });
    var roleItems = Object.keys(roles).map(function(k){ return {k:k,v:roles[k]}; }).sort(function(a,b){ return b.v-a.v; });
    renderBars('roleBox','Role Mix',roleItems,function(v){ return v+' listings'; });

    var baDa = raw.filter(function(x){ return x['Job Title']==='Business Analyst' || x['Job Title']==='Data Analyst'; });
    var profileSkills = uniq(baDa.reduce(function(arr,x){ return arr.concat(x.skills); },[]));
    var profileEl = $('profileBox');
    profileEl.innerHTML = '<h3>Business Analyst vs Data Analyst Skills</h3>';
    ['Business Analyst','Data Analyst'].forEach(function(role){
      var sub = baDa.filter(function(x){ return x['Job Title']===role; });
      var den = Math.max(sub.length,1);
      var vals = profileSkills.map(function(s){
        var count = sub.filter(function(x){ return x.skills.indexOf(s) !== -1; }).length;
        return {k:s,v:count/den*100};
      }).sort(function(a,b){ return b.v-a.v; }).slice(0,8);
      var h = document.createElement('div'); h.style.margin='15px 0 6px'; h.innerHTML='<strong>'+escapeHtml(role)+'</strong>'; profileEl.appendChild(h);
      var wrap = document.createElement('div'); wrap.className='bars';
      vals.forEach(function(item){
        var row = document.createElement('div'); row.className='barrow';
        row.innerHTML='<div class="barlabel">'+escapeHtml(item.k)+'</div><div class="track"><div class="fill" style="width:'+Math.max(2,item.v)+'%"></div></div><div class="value">'+item.v.toFixed(0)+'%</div>';
        wrap.appendChild(row);
      });
      profileEl.appendChild(wrap);
    });

    var skillRows = Object.keys(skills).map(function(s){ return {s:s,v:skills[s],p:skills[s]/n*100}; }).sort(function(a,b){ return b.v-a.v; }).slice(0,15);
    $('skillBody').innerHTML = skillRows.map(function(x){ return '<tr><td>'+escapeHtml(x.s)+'</td><td>'+x.v+'</td><td>'+x.p.toFixed(1)+'%</td><td>'+meaning(x.s)+'</td></tr>'; }).join('');
    var topSkill=top(skills)[0], topRole=top(roles)[0], topArea=top(areaMap)[0], topIndustry=top(industryMap)[0];
    $('rec1').textContent='Prioritise '+(topSkill||'the most common skills')+' because it has the highest share in this selected sample.';
    $('rec2').textContent=(topRole||'The leading role')+' has the largest listing count in this view; compare the BA and DA skill profiles before choosing your target.';
    $('rec3').textContent='The sample is most represented in '+(topArea||'the leading area')+' and '+(topIndustry||'the leading industry')+'. Use the filters to narrow your search.';
  }
  function showFatal(message){
    $('status').className='status bad';
    $('status').textContent=message;
  }
  document.addEventListener('DOMContentLoaded', function(){
    ['role','industry','work','location'].forEach(function(id){ $(id).addEventListener('change',render); });
    fetch(CSV_URL,{cache:'no-store'})
      .then(function(res){
        if(!res.ok) throw new Error('CSV request failed with HTTP '+res.status);
        return res.text();
      })
      .then(function(text){
        raw = parseCSV(text).map(function(r){
          return {
            'Job Title': r['Job Title'],
            Company: r.Company,
            Location: r.Location,
            Industry: r.Industry,
            'Min Salary LPA': r['Min Salary LPA'],
            'Max Salary LPA': r['Max Salary LPA'],
            'Work Arrangement': r['Work Arrangement'],
            Skills: r.Skills,
            min: Number(r['Min Salary LPA']),
            max: Number(r['Max Salary LPA']),
            skills: uniq(String(r.Skills || '').split(';'))
          };
        }).filter(function(r){
          return r['Job Title'] && r.Industry && r.Location && Number.isFinite(r.min) && Number.isFinite(r.max);
        });
        if(!raw.length) throw new Error('CSV loaded but no valid records were found.');
        fillSelect('role',raw.map(function(x){return x['Job Title'];}),'All roles');
        fillSelect('industry',raw.map(function(x){return x.Industry;}),'All industries');
        fillSelect('work',raw.map(function(x){return x['Work Arrangement'];}),'All work styles');
        fillSelect('location',raw.map(function(x){return x.Location;}),'All areas');
        render();
        $('status').className='status good';
        $('status').textContent='Loaded '+raw.length+' sample records successfully. Dashboard calculations are driven by the repository CSV.';
      })
      .catch(function(err){ showFatal('Dashboard data could not be loaded: '+err.message); });
  });
})();
