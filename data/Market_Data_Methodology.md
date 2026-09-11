# Market Data Methodology

## Purpose

This document explains the data and calculations in plain English so a recruiter or non-technical stakeholder can understand the project.

## Data grain

One row represents **one illustrative job listing**.

The dataset is intentionally small and synthetic for portfolio demonstration.

## Core fields

| Field | Meaning |
|---|---|
| Job Title | Business Analyst, Data Analyst or another analyst role in the sample |
| Company | Example employer |
| Location | Chennai hiring area |
| Industry | Industry category |
| Min Salary LPA | Illustrative lower salary value |
| Max Salary LPA | Illustrative upper salary value |
| Work Arrangement | Hybrid, On-site or Remote |
| Skills | Skills mentioned in the listing |

## Main calculations

### Salary midpoint

`(Min Salary LPA + Max Salary LPA) / 2`

The dashboard reports the median of these listing-level midpoints.

### Skill demand

A listing counts once for a skill.

`Skill demand % = Listings mentioning skill / Listings in selected view × 100`

### Role comparison

For Business Analyst and Data Analyst:

`Role skill % = Listings for that role mentioning skill / Total listings for that role × 100`

This is a demand percentage, not a skill quality score.

## Business interpretation

The model is designed to help answer:

- What roles are most represented?
- Which skills appear most often?
- Which industries and areas appear most often?
- Which work style appears most often?
- How do Business Analyst and Data Analyst requirements differ?

## Data integrity rules

- Salary values must be numeric and the maximum should not be below the minimum.
- Blank role, industry, location or skill fields are treated as data-quality issues.
- Duplicate rows should be reviewed before using results.
- The dashboard and notebook use the same CSV as the source of truth.

## Important limitation

The 120 rows are **synthetic / illustrative**. They are not live scraped listings and do not prove current Chennai hiring demand, salary levels or employer behaviour.

A production research version should add source URL, collection date, experience level, employment type, company size and legally collected real-world listings.
