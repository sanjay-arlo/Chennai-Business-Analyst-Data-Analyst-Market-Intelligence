CREATE DATABASE IF NOT EXISTS chennai_market_intelligence;
USE chennai_market_intelligence;

DROP TABLE IF EXISTS job_listings;
CREATE TABLE job_listings (
  job_title VARCHAR(120),
  company VARCHAR(160),
  location VARCHAR(120),
  industry VARCHAR(120),
  min_salary_lpa DECIMAL(8,2),
  max_salary_lpa DECIMAL(8,2),
  work_arrangement VARCHAR(40),
  skills TEXT
);

-- Load sample_listings_chennai.csv into job_listings before running analysis.

-- 1. Overall sample size
SELECT COUNT(*) AS listings
FROM job_listings;

-- 2. Typical salary midpoint by role
SELECT
  job_title,
  COUNT(*) AS listings,
  ROUND(AVG((min_salary_lpa + max_salary_lpa) / 2), 2) AS average_salary_midpoint_lpa
FROM job_listings
GROUP BY job_title
ORDER BY listings DESC;

-- 3. Median-style salary summary using ordered-window logic
WITH salary_points AS (
  SELECT
    job_title,
    (min_salary_lpa + max_salary_lpa) / 2 AS salary_midpoint_lpa,
    ROW_NUMBER() OVER (PARTITION BY job_title ORDER BY (min_salary_lpa + max_salary_lpa) / 2) AS rn,
    COUNT(*) OVER (PARTITION BY job_title) AS cnt
  FROM job_listings
)
SELECT
  job_title,
  ROUND(AVG(salary_midpoint_lpa), 2) AS median_salary_midpoint_lpa
FROM salary_points
WHERE rn IN (FLOOR((cnt + 1) / 2), FLOOR((cnt + 2) / 2))
GROUP BY job_title;

-- 4. Role mix
SELECT job_title, COUNT(*) AS listings
FROM job_listings
GROUP BY job_title
ORDER BY listings DESC;

-- 5. Industry mix
SELECT industry, COUNT(*) AS listings,
       ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM job_listings), 1) AS share_pct
FROM job_listings
GROUP BY industry
ORDER BY listings DESC;

-- 6. Chennai hiring areas
SELECT location, COUNT(*) AS listings,
       ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM job_listings), 1) AS share_pct
FROM job_listings
GROUP BY location
ORDER BY listings DESC;

-- 7. Work style mix
SELECT work_arrangement, COUNT(*) AS listings,
       ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM job_listings), 1) AS share_pct
FROM job_listings
GROUP BY work_arrangement
ORDER BY listings DESC;

-- 8. Business Analyst vs Data Analyst skill comparison
-- Skills are separated into individual rows for analysis.
WITH RECURSIVE skill_parts AS (
  SELECT
    job_title,
    TRIM(SUBSTRING_INDEX(skills, ';', 1)) AS skill,
    CASE WHEN INSTR(skills, ';') > 0
         THEN SUBSTRING(skills, INSTR(skills, ';') + 1)
         ELSE '' END AS rest
  FROM job_listings
  UNION ALL
  SELECT
    job_title,
    TRIM(SUBSTRING_INDEX(rest, ';', 1)) AS skill,
    CASE WHEN INSTR(rest, ';') > 0
         THEN SUBSTRING(rest, INSTR(rest, ';') + 1)
         ELSE '' END AS rest
  FROM skill_parts
  WHERE rest <> ''
),
role_totals AS (
  SELECT job_title, COUNT(*) AS role_listings
  FROM job_listings
  WHERE job_title IN ('Business Analyst','Data Analyst')
  GROUP BY job_title
),
skill_counts AS (
  SELECT job_title, skill, COUNT(*) AS mentions
  FROM skill_parts
  WHERE job_title IN ('Business Analyst','Data Analyst')
    AND skill <> ''
  GROUP BY job_title, skill
)
SELECT
  s.skill,
  MAX(CASE WHEN s.job_title='Business Analyst' THEN ROUND(s.mentions * 100.0 / r.role_listings, 1) END) AS business_analyst_pct,
  MAX(CASE WHEN s.job_title='Data Analyst' THEN ROUND(s.mentions * 100.0 / r.role_listings, 1) END) AS data_analyst_pct
FROM skill_counts s
JOIN role_totals r ON r.job_title = s.job_title
GROUP BY s.skill
ORDER BY s.skill;

-- 9. Business questions to answer with the output
-- Which role has the largest share?
-- Which skills appear most often?
-- Which industries/areas are most represented?
-- What work style dominates?
-- Where does the BA vs DA skill profile differ?

-- Integrity note:
-- These queries analyse the portfolio sample. Do not present synthetic results as live labour-market facts.
