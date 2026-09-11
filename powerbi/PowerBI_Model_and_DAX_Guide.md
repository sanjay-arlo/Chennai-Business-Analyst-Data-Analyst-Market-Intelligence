# Power BI Model & DAX Guide — Business-Friendly Version

This document defines a Power BI version of the project. It is a **model/DAX specification**, not a claim that a `.pbix` file is stored here.

## Business pages

### 1. Job Market Overview
KPI cards and charts answering: how large is the sample, what role dominates, what is the typical salary midpoint and which skill is mentioned most often?

### 2. Skills
Show the most frequently mentioned skills and their percentage of selected listings.

### 3. Where the Jobs Are
Show hiring-area, industry and work-style mix.

### 4. Business Analyst vs Data Analyst
Compare the percentage of listings for each role mentioning each skill.

### 5. Decisions
Show finding → evidence → business meaning → next action.

## Friendly field names

| Data field | Business label |
|---|---|
| Job Title | Role |
| Location | Chennai Area |
| Industry | Industry |
| Work Arrangement | Work Style |
| Min Salary LPA | Minimum Salary |
| Max Salary LPA | Maximum Salary |
| Salary Midpoint | Typical Salary Midpoint |
| Skill penetration | Skill Demand % |

## Core measures

```DAX
Listings = COUNTROWS(Jobs)

Salary Midpoint LPA = DIVIDE(Jobs[Min Salary LPA] + Jobs[Max Salary LPA], 2)

Median Salary Midpoint = MEDIAN(Jobs[Salary Midpoint LPA])

Skill Listings = DISTINCTCOUNT(JobSkills[Listing ID])

Skill Demand % = DIVIDE([Skill Listings], [Listings])
```

For BA/DA comparison:

```DAX
Role Skill Demand % =
VAR RoleListings =
    CALCULATE(
        [Listings],
        ALLEXCEPT(Jobs, Jobs[Job Title])
    )
RETURN
DIVIDE([Skill Listings], RoleListings)
```

## Model recommendation

Use separate `Jobs` and `JobSkills` tables if building a production-style model. Create one unique Listing ID for each row in `Jobs` and one row per listing-skill combination in `JobSkills`.

This avoids counting the same listing multiple times when analysing skills.

## Communication rule

The dashboard should lead with business language. Technical concepts such as text splitting, normalisation and data modelling belong in the model/documentation rather than headline visuals.

## Integrity rule

The sample is synthetic/illustrative. Do not present Power BI output as live Chennai labour-market research.
