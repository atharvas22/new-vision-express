/**
 * New Vision Express — website form intake
 *
 * Receives form submissions from the website, appends a row to this
 * spreadsheet, and emails a notification for every new lead.
 *
 * Setup steps are in SETUP.md next to this file.
 */

// Where to send the "new lead" notification email.
// MailApp sends from the Google account that owns this script.
const NOTIFY_EMAIL = "atharva@newvisionexpress.com";

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ success: false, error: "Invalid payload" });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // One tab per form type — "Contact" now, "Quote" can reuse this later.
  const tabName = data.formType === "quote" ? "Quote" : "Contact";
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Service Interest",
      "Message",
    ]);
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.service || "",
    data.message || "",
  ]);

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New website inquiry from " + (data.name || "Unknown"),
      body:
        "A new inquiry just came in from newvisionexpressart.com:\n\n" +
        "Name:    " + (data.name || "—") + "\n" +
        "Email:   " + (data.email || "—") + "\n" +
        "Phone:   " + (data.phone || "—") + "\n" +
        "Service: " + (data.service || "—") + "\n\n" +
        "Message:\n" + (data.message || "—") + "\n\n" +
        "Full log: " + ss.getUrl(),
    });
  } catch (err) {
    // Row is already saved — a failed email should not fail the submission.
    console.error("Notification email failed: " + err);
  }

  return jsonResponse({ success: true });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
