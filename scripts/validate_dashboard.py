from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / 'index.html').read_text(encoding='utf-8')
app = ROOT / 'app.js'

if not app.exists():
    raise SystemExit('Missing app.js')
if 'app.js' not in html:
    raise SystemExit('index.html does not reference app.js')
if 'fetch(' not in app.read_text(encoding='utf-8'):
    raise SystemExit('app.js does not contain the CSV loading logic')

print('PASS: index.html references app.js and app.js exists.')
