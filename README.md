# Chennai Business Analyst & Data Analyst Market Intelligence Dashboard

> A portfolio-grade case study demonstrating how a Business Analyst / Data Analyst can turn structured job-listing-style data into KPIs, comparisons, segmentation, and decision-oriented recommendations.

## 🔴 Live Dashboard

### 🚀 [Open the Live Interactive Dashboard](https://sanjay-arlo.github.io/chennai-ba-da-market-intelligence/)

The dashboard is published with **GitHub Pages**. It reads `sample_listings_chennai.csv` directly in the browser and calculates the displayed KPIs and charts from that dataset.

---

## ⚠️ Data Transparency

The repository contains **120 synthetic / illustrative job-listing records** created for portfolio demonstration.

This dataset is **not live scraped data**, not a survey of the Chennai labour market, and not evidence of actual current hiring volumes or salaries. Any insight from the dashboard should therefore be described as an **illustrative signal from the sample**.

That distinction is intentional: the project demonstrates the analytical process without pretending that fabricated data is real market research.

---

## 🎯 Business Objective

The project answers practical questions a hiring-market or workforce analyst might investigate:

1. Which analyst roles appear most often in the sample?
2. What salary midpoint is typical for each role?
3. Which skills appear in the largest share of listings?
4. Which Chennai hiring hubs are most represented?
5. Which industries contribute the most sampled roles?
6. What work arrangement dominates the sample?
7. How does the skill mix differ between Business Analyst and Data Analyst roles?

### Decision framework

**Data → Validation → Feature Engineering → KPI → Segmentation → Insight → Recommendation**

---

## 📊 Dashboard Features

| View | What it does |
|---|---|
| **Executive KPIs** | Shows filtered listing count, median salary midpoint, top role and top skill |
| **Salary by Role** | Calculates median salary midpoint for each role |
| **Skill Demand** | Counts listings mentioning each skill and converts them to listing penetration % |
| **Hiring Hubs** | Shows the distribution of sampled listings by Chennai location |
| **Work Arrangement** | Compares hybrid, on-site and remote listings |
| **Industry Mix** | Shows sampled listing counts by industry |
| **Role Mix** | Compares the volume of each analyst role |
| **BA vs DA Skill Profile** | Calculates the percentage of each role's listings mentioning each skill |
| **Interactive Filters** | Recalculates all dashboard views by role, industry, work arrangement and location |

---

## 🧮 KPI Definitions

To avoid ambiguous numbers, the dashboard uses explicit formulas.

### Salary midpoint

For each listing:

`Salary Midpoint = (Min Salary LPA + Max Salary LPA) / 2`

The executive salary KPI is the **median** of those listing-level midpoints.

### Skill demand

`Skill Demand % = Listings mentioning skill / Filtered listings × 100`

A listing contributes a maximum of one count per skill.

### BA vs DA profile

For each skill and role:

`Skill Demand % = Role listings mentioning skill / Total listings for that role × 100`

This makes the comparison transparent and reproducible.

---

## 🗂️ Dataset

`sample_listings_chennai.csv` contains these fields:

| Column | Description |
|---|---|
| `Job Title` | Analyst role |
| `Company` | Example employer |
| `Location` | Chennai hiring hub |
| `Industry` | Industry classification |
| `Min Salary LPA` | Illustrative minimum annual package |
| `Max Salary LPA` | Illustrative maximum annual package |
| `Work Arrangement` | Hybrid, On-site or Remote |
| `Skills` | Semicolon-separated skills mentioned in the listing |

---

## 🧪 Data & Analysis Workflow

### 1. Load
Read the CSV with Pandas.

### 2. Validate
Check row count, missing values, duplicates, unique companies and locations.

### 3. Feature engineer
Create salary midpoint and salary spread.

### 4. Analyse
Calculate role mix, salary statistics, skill penetration, hub distribution, work arrangement and industry mix.

### 5. Compare
Build a BA vs DA skill-demand view using role-level denominators.

### 6. Visualise
Render the calculated metrics in the browser with Plotly.

### 7. Interpret
Translate observed sample patterns into practical portfolio recommendations while clearly labelling them as illustrative.

---

## 📓 Analysis Notebook

`analysis_chennai.ipynb` mirrors the dashboard logic in Python.

It includes:

- Data loading
- Data-quality checks
- KPI calculation
- Salary analysis
- Skill-demand analysis
- Location / work-arrangement / industry analysis
- BA vs DA skill comparison
- Decision-oriented interpretation guidance

Run it in **Jupyter Notebook** or **Google Colab**.

---

## 🛠️ Tech Stack

- **Python**
- **Pandas**
- **Jupyter Notebook**
- **HTML / CSS / JavaScript**
- **Plotly.js**
- **Papa Parse**
- **GitHub Pages**

---

## 📂 Repository Structure

```text
chennai-ba-da-market-intelligence/
├── index.html
├── sample_listings_chennai.csv
├── analysis_chennai.ipynb
├── requirements_chennai.txt
├── README.md
└── .nojekyll
```

---

## 🌐 How the Dashboard Works

The browser loads the repository CSV:

`sample_listings_chennai.csv`

Then JavaScript:

1. Parses the records
2. Applies active filters
3. Calculates KPIs
4. Aggregates the data
5. Renders Plotly charts

There are **no manually typed KPI values or chart datasets** in the dashboard.

This makes the CSV the single source of truth for the visual layer.

---

## ▶️ Run Locally

Because the browser loads the CSV using a web request, use a small local HTTP server instead of opening `index.html` directly with `file://`.

Example:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

---

## 🔮 Future Improvements

A production-style version could add:

- A legally collected real-world job dataset
- Collection date and source URL
- SQL data model and queries
- Power BI version
- Automated data refresh
- Salary normalisation by experience
- Experience-level segmentation
- Company-level comparison
- Time-series hiring trends
- Data-quality tests and CI checks

---

## 👤 Author

**Sanjay Arlo**

Business Analyst / Data Analyst Portfolio

GitHub: https://github.com/sanjay-arlo
