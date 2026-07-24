# Google Apps Script Setup Guide - German Admissions

This folder contains the complete, production-ready Google Apps Script backend for the **German Language Training Program Admission System** at **Edusource HRD Centre, Kollam**.

---

## 📁 File Manifest

- `google-apps-script/Code.gs`: Production Apps Script backend supporting POST JSON parsing, auto-creating sheet `"German Admissions"` & 15 column headers, LockService concurrency protection, validation, and CORS JSON responses.
- `google-apps-script/README.md`: This deployment & authorization guide.

---

## 📊 Sheet Structure & Headers

The script targets a sheet tab named **`German Admissions`**. If the tab or spreadsheet headers do not exist, they will be created automatically on the first submission:

1. `Timestamp`
2. `Full Name`
3. `Date of Birth`
4. `Gender`
5. `Email`
6. `Phone Number`
7. `Current Address`
8. `Educational Background`
9. `Parent Guardian Full Name`
10. `Parent Guardian Contact Number`
11. `German Level`
12. `Preferred Mode`
13. `Referral Source`
14. `Terms Accepted`
15. `Declaration Accepted`

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Open Google Sheet & Apps Script Editor
1. Open your target Google Sheet (or create a new blank Google Sheet).
2. Name your spreadsheet (e.g. `Edusource HRD - German Admissions 2026`).
3. Click **Extensions** in the top menu bar.
4. Select **Apps Script**.

### Step 2: Paste `Code.gs`
1. Erase any existing placeholder code inside the `Code.gs` editor window.
2. Copy all contents from [`google-apps-script/Code.gs`](./Code.gs) and paste it into the editor.
3. Click the **Save** icon (💾) or press `Ctrl + S`.

### Step 3: Deploy as Web App
1. Click the blue **Deploy** button at the top right of the Apps Script interface.
2. Select **New deployment**.
3. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
4. Configure the deployment settings:
   - **Description**: `German Admission API Production v1`
   - **Execute as**: `Me (your-google-account@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: must be "Anyone" so Next.js serverless functions can post without Google authentication challenges)*
5. Click **Deploy**.

### Step 4: Authorize Application Permissions
1. Click **Authorize access** when prompted.
2. Choose your Google Account.
3. If Google displays "Google hasn't verified this app", click **Advanced** at the bottom left.
4. Click **Go to Untitled project (unsafe)**.
5. Review permissions and click **Allow**.

### Step 5: Copy Web App URL & Add to `.env.local`
1. Copy the generated **Web App URL** (it will look like `https://script.google.com/macros/s/AKfycbx.../exec`).
2. Open your local `.env.local` file in the Next.js project.
3. Set the environment variable:

```env
GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/AKfycbw0Wa4naZAno7mzi4bOgEmAJLgqWHiArZa29Rm-BnfczRZHwXsF1g0-00KwM9LNaNoAXQ/exec
GERMAN_GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/YOUR_NEW_WEB_APP_URL_HERE/exec
```

4. Save `.env.local`. Also ensure `GERMAN_GOOGLE_SHEET_SCRIPT_URL` is added to your production environment variables (e.g. Vercel Dashboard / Cloudflare Pages).

---

## 🧪 Testing

1. Submissions to General Admission (`/admission/general`) submit strictly to `GOOGLE_SHEET_SCRIPT_URL`.
2. Submissions to German Admission (`/admission/german`) submit strictly to `GERMAN_GOOGLE_SHEET_SCRIPT_URL`.
3. Both forms remain 100% isolated and failure-safe.
