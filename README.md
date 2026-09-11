# Chennai Job Market Insights

> Business Analyst portfolio project analysing a sample of Chennai analyst job listings to identify role, salary, skill, industry, location and work-style patterns.

## 🚀 Live Dashboard

**[Open the interactive dashboard](https://sanjay-arlo.github.io/Chennai-Business-Analyst-Data-Analyst-Market-Intelligence/)**

## Business question

**What patterns appear in the sample job market, and what should a candidate focus on?**

**Flow:** Job listings → Data checks → KPIs → Market patterns → Role comparison → Recommendation

## What the dashboard shows

- **Listings in view** — number of records after filters
- **Typical salary midpoint** — median of listing-level salary midpoints
- **Most common role** — role with the highest listing count
- **Most requested skill** — skill mentioned in the highest share of listings
- **Role / industry / area / work-style mix** — where the sample is concentrated
- **BA vs DA skills** — percentage of listings in each role mentioning a skill
- **Recommendations** — practical actions based on the selected sample

## Dataset

`sample_listings_chennai.csv`

The repository contains **120 synthetic / illustrative records** for portfolio demonstration. It is **not live scraped labour-market research** and should not be used as evidence of real Chennai hiring volumes or salaries.

## Analysis

The project answers:

1. Which analyst roles appear most often?
2. What is the typical salary signal by role?
3. Which skills appear most frequently?
4. Which Chennai areas, industries and work styles are most represented?
5. How do Business Analyst and Data Analyst skill patterns differ?
6. What job-search or skill-building action follows from the analysis?

## Project files

- `index.html` — dashboard interface
- `app.js` — dashboard calculations, filters and rendering
- `sample_listings_chennai.csv` — source dataset
- `analysis_chennai.ipynb` — Python / Pandas analysis
- `sql/chennai_market_intelligence.sql` — SQL analysis
- `excel/Excel_Analysis_Guide.md` — Excel implementation guide
- `powerbi/PowerBI_Model_and_DAX_Guide.md` — Power BI and DAX specification
- `data/Market_Data_Methodology.md` — data definitions and limitations
- `scripts/validate_market_data.py` — dataset quality checks
- `scripts/validate_dashboard.py` — dashboard validation

## 8. Technical stack

- **Excel** — business calculations and analysis planning
- **SQL / MySQL** — querying and business analysis
- **Python / Pandas** — data preparation and analysis
- **HTML / CSS / JavaScript** — interactive dashboard
- **GitHub Actions** — automated validation
- **GitHub Pages** — live dashboard hosting
- **Power BI** — recommended implementation specification and DAX design

## KPI logic

**Salary midpoint**

`(Minimum salary + Maximum salary) / 2`

The dashboard reports the **median** of these listing-level midpoints.

**Skill demand**

`Listings mentioning skill / Listings in selected view × 100`

**BA vs DA skill percentage**

`Role listings mentioning skill / Total listings for that role × 100`

## Data quality

The validation script checks required columns, blank required fields, salary validity, duplicate rows and the expected 120-record sample size.

## Limitation

This is a **portfolio case study**, not production market research. A production version would require dated, source-traceable job listings, collection metadata, experience level and stronger salary normalisation.

## Author

**Sanjay Arlo**

Business Analyst / Data Analyst Portfolio  
[GitHub](https://github.com/sanjay-arlo)
