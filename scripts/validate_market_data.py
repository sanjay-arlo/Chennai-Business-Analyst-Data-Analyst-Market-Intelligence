from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'sample_listings_chennai.csv'
EXPECTED = {
    'Job Title','Company','Location','Industry','Min Salary LPA',
    'Max Salary LPA','Work Arrangement','Skills'
}

def main() -> None:
    if not DATA.exists():
        raise SystemExit(f'Missing dataset: {DATA}')

    df = pd.read_csv(DATA)
    missing = EXPECTED - set(df.columns)
    if missing:
        raise SystemExit(f'Missing columns: {sorted(missing)}')

    required = ['Job Title','Company','Location','Industry','Skills']
    blanks = {c: int(df[c].isna().sum() + (df[c].astype(str).str.strip() == '').sum()) for c in required}
    bad_blank = {k:v for k,v in blanks.items() if v}
    if bad_blank:
        raise SystemExit(f'Blank required fields: {bad_blank}')

    df['Min Salary LPA'] = pd.to_numeric(df['Min Salary LPA'], errors='coerce')
    df['Max Salary LPA'] = pd.to_numeric(df['Max Salary LPA'], errors='coerce')
    if df[['Min Salary LPA','Max Salary LPA']].isna().any().any():
        raise SystemExit('Non-numeric salary value found.')
    if (df['Max Salary LPA'] < df['Min Salary LPA']).any():
        raise SystemExit('A listing has maximum salary below minimum salary.')
    if df.duplicated().sum():
        raise SystemExit(f'Duplicate rows found: {int(df.duplicated().sum())}')
    if len(df) != 120:
        raise SystemExit(f'Expected 120 illustrative records, found {len(df)}')

    print(f'PASS: {len(df)} records validated.')
    print(f"Roles: {df['Job Title'].nunique()} | Industries: {df['Industry'].nunique()} | Areas: {df['Location'].nunique()}")

if __name__ == '__main__':
    main()
