# Excel Analysis Guide — Business-Friendly Version

This guide describes how to recreate the dashboard in Excel using the same CSV.

## Goal

Turn job-listing records into a simple management view:

**How many jobs? → Which roles? → Which skills? → Where? → What work style? → What should I focus on?**

## Suggested sheets

### 1. Raw_Data
Import `sample_listings_chennai.csv` as an Excel Table named `Jobs`.

### 2. Calculations
Add:

`Salary Midpoint = (Min Salary LPA + Max Salary LPA) / 2`

`Salary Spread = Max Salary LPA - Min Salary LPA`

### 3. Dashboard
Create KPI cards for:

- Listings in view
- Typical salary midpoint
- Most common role
- Most requested skill

Create charts for:

- Typical salary by role
- Skills mentioned most often
- Hiring areas
- Work style
- Industry mix
- Role mix
- Business Analyst vs Data Analyst skill profile

### 4. Decision_Notes
Write findings in this format:

**Finding → Evidence → Business meaning → Recommended action**

## PivotTable ideas

| Business question | Pivot setup |
|---|---|
| Which role appears most often? | Rows = Job Title; Values = Count of Job Title |
| Which industry appears most often? | Rows = Industry; Values = Count |
| Where are sampled jobs located? | Rows = Location; Values = Count |
| What work style dominates? | Rows = Work Arrangement; Values = Count |
| What is typical salary by role? | Rows = Job Title; Values = Median Salary Midpoint |

## Skill analysis

Because `Skills` is stored as semicolon-separated text, split it into separate rows before building a skill PivotTable.

Count a skill once per listing.

`Skill Demand % = Listings mentioning skill / Total selected listings`

## Business-friendly naming

Avoid technical chart titles. Use:

- `Typical Salary Midpoint by Role`
- `Skills Mentioned Most Often`
- `Where the Sampled Jobs Are Located`
- `Work Style Mix`
- `Industry Mix`
- `Business Analyst vs Data Analyst Skills`

## Important limitation

The dataset is synthetic/illustrative. Excel outputs demonstrate analysis technique and should not be treated as live Chennai labour-market research.
