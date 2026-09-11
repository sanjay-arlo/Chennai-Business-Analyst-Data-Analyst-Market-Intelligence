# Chennai Job Market Insights — Business Analyst / Data Analyst

> A portfolio case study showing how a Business Analyst turns a job-listing dataset into clear business questions, KPIs, comparisons and practical recommendations.

## 🚀 Live Dashboard

**[Open the interactive dashboard](https://sanjay-arlo.github.io/Chennai-Business-Analyst-Data-Analyst-Market-Intelligence/)**

The dashboard reads `sample_listings_chennai.csv` and calculates the visible numbers and charts from that file.

---

## What is this project?

Imagine a manager asks:

> **“What kinds of Business Analyst and Data Analyst jobs are appearing in our sample, what skills do they ask for, and where should a candidate focus?”**

This project answers that question with a small, transparent analysis workflow.

**Business flow:**

**Job listings → Clean data → KPIs → Market patterns → Role comparison → Recommendation**

You do not need labour-market or technical knowledge to understand the dashboard.

---

## Business questions

1. How many job listings are in the sample?
2. What is the typical salary range signal?
3. Which analyst role appears most often?
4. Which skills are mentioned most often?
5. Which industries and Chennai areas appear most often?
6. What work style is most common: hybrid, on-site or remote?
7. How does the skill pattern differ between Business Analyst and Data Analyst roles?
8. How can these findings guide a job-search or skill-building decision?

---

## Dashboard — explained simply

### 1. What does the sample market look like?

The first section shows:

- **Typical salary midpoint** — the middle value between each listing's minimum and maximum salary.
- **Skills mentioned most often** — how frequently a skill appears in the sample.
- **Where the sampled jobs are located** — Chennai hiring areas represented in the data.
- **Work style mix** — hybrid, on-site and remote.
- **Industry mix** — industries represented in the sample.
- **Role mix** — how many listings belong to each role.

### 2. Business Analyst vs Data Analyst

The comparison shows the **percentage of listings within each role that mention a skill**.

This is not a “skill score”. It is a simple way to answer:

> “Which skills appear more often in Business Analyst listings, and which appear more often in Data Analyst listings?”

### 3. Skills to prioritise

The table turns the chart into a clear action list: skill name, number of listings mentioning it, percentage of the sample, and a plain-English interpretation.

### 4. Business recommendations

The dashboard translates the analysis into three decisions:

- Build the common skill baseline.
- Choose a role path using evidence rather than guesswork.
- Narrow the job search by industry, work style and Chennai area.

---

## Why the dashboard uses plain English

Technical analysis can be useful without being the headline language.

For example:

| Technical idea | Business-friendly dashboard language |
|---|---|
| Listing count | **Listings in view** |
| Salary midpoint | **Typical salary midpoint** |
| Job title segmentation | **Role** |
| Industry segmentation | **Industry** |
| Work arrangement segmentation | **Work style** |
| Location segmentation | **Chennai area** |
| Skill penetration | **Skill mentioned in % of listings** |
| BA vs DA profile | **Business Analyst vs Data Analyst Skills** |

The goal is that an HR recruiter, hiring manager or non-technical stakeholder can understand the project before reading the technical details.

---

## Data transparency

The repository contains **120 synthetic / illustrative records** created for portfolio demonstration.

This is **not live scraped labour-market data**, not a survey and not evidence of current Chennai hiring volumes or real salaries.

Therefore, all conclusions should be described as:

> **“Illustrative signals from the sample dataset.”**

That limitation is deliberate. The project demonstrates the **Business Analyst method** without pretending fabricated records are real market research.

---

## Dataset

`sample_listings_chennai.csv`

| Field | Plain-English meaning |
|---|---|
| `Job Title` | Analyst role in the listing |
| `Company` | Example employer name |
| `Location` | Chennai hiring area |
| `Industry` | Industry category |
| `Min Salary LPA` | Illustrative minimum annual package |
| `Max Salary LPA` | Illustrative maximum annual package |
| `Work Arrangement` | Hybrid, On-site or Remote |
| `Skills` | Skills mentioned in the listing, separated by semicolons |

---

## KPI definitions

### Typical salary midpoint

For each listing:

`Salary midpoint = (Minimum salary + Maximum salary) / 2`

The dashboard then takes the **median** of those listing-level midpoints.

This is a transparent portfolio metric. It is not a claim about the actual market salary.

### Skill demand

`Skill demand % = Listings mentioning the skill / Listings in the selected view × 100`

A listing counts once for a skill, even when that skill is repeated in the same text field.

### BA vs DA skill profile

`Role skill % = Role listings mentioning the skill / Total listings for that role × 100`

This keeps the denominator inside each role and makes the comparison fairer.

---

## Analysis workflow

### 1. Ask a business question

Define what decision the analysis should support.

### 2. Load the data

Read the CSV into Python or the browser dashboard.

### 3. Validate the data

Check:

- Row count
- Missing values
- Duplicate rows
- Number of companies
- Locations and role categories
- Salary fields

### 4. Create useful fields

Calculate salary midpoint and salary spread.

### 5. Segment the data

Break the sample down by role, skill, industry, work style and location.

### 6. Compare roles

Compare Business Analyst and Data Analyst skill demand using role-level percentages.

### 7. Visualise

Present the calculated numbers through an interactive dashboard.

### 8. Recommend an action

Turn patterns into a practical job-search or skill-prioritisation decision.

---

## Python notebook

`analysis_chennai.ipynb` reproduces the core analysis in Python.

It includes:

- Data validation
- Salary analysis
- Skill analysis
- Role and industry analysis
- Location and work-style analysis
- Business Analyst vs Data Analyst comparison
- Decision-oriented interpretation

Run it in **Jupyter Notebook** or **Google Colab**.

---

## SQL analysis

`sql/chennai_market_intelligence.sql` contains reusable SQL for:

- Listing and role counts
- Salary summaries
- Skill demand
- Industry and location mix
- Work-style mix
- Business Analyst vs Data Analyst comparison

SQL is included to demonstrate that the same business questions can be answered outside the notebook/dashboard layer.

---

## Excel specification

`excel/Excel_Analysis_Guide.md` gives a business-friendly spreadsheet implementation plan: tables, formulas, pivots, recommended charts and interpretation notes.

It is a guide, not a claim that an `.xlsx` binary is stored in the repository.

---

## Power BI specification

`powerbi/PowerBI_Model_and_DAX_Guide.md` defines a Power BI version of the project, including model structure, measures, pages and business-friendly labels.

It is a specification, not a claim that a `.pbix` file is stored in the repository.

---

## Data methodology

`data/Market_Data_Methodology.md` documents the dataset grain, field definitions, KPI formulas, limitations and the difference between **illustrative portfolio data** and **real market research**.

---

## Quality checks

`scripts/validate_market_data.py` performs basic validation of the CSV, including:

- Expected column presence
- Non-empty role / industry / location fields
- Valid salary ranges
- Duplicate checks
- Skill-field checks

GitHub Actions can run these checks automatically.

---

## Tech stack

**Business analysis:** KPI design, segmentation, comparative analysis, decision support

**Data:** CSV, Python, Pandas, SQL

**Visualisation:** HTML, CSS, JavaScript, Plotly.js, interactive filters

**Delivery:** GitHub Pages, GitHub Actions

---

## Repository structure

```text
Chennai-Business-Analyst-Data-Analyst-Market-Intelligence/
├── data/
│   └── Market_Data_Methodology.md
├── excel/
│   └── Excel_Analysis_Guide.md
├── powerbi/
│   └── PowerBI_Model_and_DAX_Guide.md
├── sql/
│   └── chennai_market_intelligence.sql
├── scripts/
│   └── validate_market_data.py
├── .github/workflows/
│   └── validate_market_data.yml
├── index.html
├── sample_listings_chennai.csv
├── analysis_chennai.ipynb
├── requirements_chennai.txt
├── .nojekyll
└── README.md
```

---

## Run locally

The dashboard loads the CSV through a browser request, so use a small HTTP server instead of opening the HTML file directly.

```bash
python -m http.server 8000
```

Open:

`http://localhost:8000`

---

## Important limitation

A real production version would need a legally collected, dated and source-traceable job dataset with source URLs, collection date, experience level and stronger salary normalisation.

The current project should be judged on **analytical process, clarity and decision thinking**, not as live labour-market research.

---

## Author

**Sanjay Arlo**

Business Analyst / Data Analyst Portfolio

GitHub: https://github.com/sanjay-arlo
