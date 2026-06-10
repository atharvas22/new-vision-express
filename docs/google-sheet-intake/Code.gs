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

// The intake spreadsheet. Opening by ID works whether this script is
// bound to the sheet or standalone.
const SHEET_ID = "1VkgXBntfJQJTD9r2ZlpPNapceh8lpy2VxGK50WjLVf4";

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ success: false, error: "Invalid payload" });
  }

  const ss = SpreadsheetApp.openById(SHEET_ID);

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

/**
 * Run this once from the editor (select "testSetup" in the toolbar, click
 * Run) to grant permissions and verify the whole flow: it appends a test
 * row to the Contact tab and sends a test notification email.
 */
function testSetup() {
  const e = {
    postData: {
      contents: JSON.stringify({
        formType: "contact",
        name: "Test from editor",
        email: "test@example.com",
        phone: "+91 00000 00000",
        service: "Setup check",
        message: "If you can read this in the sheet and got an email, everything works. Safe to delete.",
      }),
    },
  };
  const result = doPost(e).getContent();
  Logger.log(result);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
