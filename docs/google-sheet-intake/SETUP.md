# Google Sheet intake — one-time setup (~5 minutes)

The website's contact form posts to `/api/contact`, which forwards each
submission to a Google Apps Script attached to your sheet. The script appends
a row and emails a notification. The script URL lives in the Vercel env var
`CONTACT_WEBHOOK_URL`.

## Steps (do these in the Google account that owns the sheet)

1. Open your Google Sheet.
2. Menu: **Extensions → Apps Script**. A script editor opens.
3. Delete whatever is in the editor and paste the full contents of
   [`Code.gs`](./Code.gs).
4. (Optional) Change `NOTIFY_EMAIL` at the top if you want notifications to go
   somewhere other than sales@newvisionexpress.com.
5. Click **Deploy → New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
8. Click **Deploy**, approve the permissions prompt (it will warn that the app
   is unverified — click "Advanced → Go to … (unsafe)"; it's your own script).
9. Copy the **Web app URL** (ends in `/exec`).
10. Send that URL to Claude (or add it yourself in Vercel: Project
    **new-vision-express** → Settings → Environment Variables →
    `CONTACT_WEBHOOK_URL` = the URL, all environments), then redeploy.

## Notes

- "Who has access: Anyone" is safe here — the URL contains a long random
  token, is only stored server-side in Vercel, and the script only appends
  rows; it cannot read the sheet back out.
- If you ever update `Code.gs`, you must do **Deploy → Manage deployments →
  edit (pencil) → New version** for changes to take effect.
- The script writes to a tab named **Contact** (created automatically). The
  quote form can later reuse the same script — it will write to a **Quote**
  tab.
