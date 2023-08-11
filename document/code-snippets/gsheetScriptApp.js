/*
 * note: this script is also used as a library
 * please confirm related impact before change
 *
 * shared susage:
 *
 */

const columnNumber = 1; // Set the column number you want to retrieve data from (1 for Column A, 2 for Column B, etc.)

function logMessage(message) {
  // Open the Google Sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Get the log sheet or create it if it doesn't exist
  var logSheet =
    spreadsheet.getSheetByName("Execution Log") ||
    spreadsheet.insertSheet("Execution Log");

  // Append the log message to the next available row
  var timestamp = new Date();
  logSheet.appendRow([timestamp, message]);

  // delete old records
  const MAX_LOG_ROW = 50000;
  var lastRow = logSheet.getLastRow();
  if (lastRow > MAX_LOG_ROW) {
    logSheet.deleteRows(1, lastRow - MAX_LOG_ROW); // remove older logs, starting from row 1
  }
}

function getAllDataInColumn(TabName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TabName);
  // Get the last row with data in the specified column
  var lastRow = sheet.getLastRow();

  // Get the data in the specified column
  var dataRange = sheet.getRange(1, columnNumber, lastRow, 1);
  var data = dataRange.getValues();

  const start_row = 1;
  // Log the data to the console
  data.shift(); // remove header
  let result = data.reduce(
    (acc, row) => [
      ...acc,
      ...row[0]
        .split(",")
        .map((v) => v.trim())
        .filter((v) => !!v),
    ],
    []
  );
  return result;
}

function labelWatchedEmails() {
  logMessage("Script started");
  var watch_emails = getAllDataInColumn("whitelist");
  var archive_emails = getAllDataInColumn("blacklist");
  // Search for unread emails
  var threads = GmailApp.search("newer_than:1h is:unread");

  var label_need_str = "[GAS]NEED_HANDLE";
  var label_ignore_str = "[GAS]IGNORE";

  // Check if the label exists; if not, create it
  var label_need = GmailApp.getUserLabelByName(label_need_str);
  var label_ignore = GmailApp.getUserLabelByName(label_ignore_str);

  label_need === null && (label_need = GmailApp.createLabel(label_need_str));
  label_ignore === null &&
    (label_ignore = GmailApp.createLabel(label_ignore_str));

  // Log subject and sender of each unread email
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    var last_msg = messages[messages.length - 1];

    var receivedTime = last_msg.getDate().getTime();
    var currentTime = new Date().getTime();
    var timeDifference = (currentTime - receivedTime) / (1000 * 60);
    if (timeDifference > 15) {
      // only process emails messages within 15 minutes
      continue;
    }

    if (last_msg.isUnread()) {
      var subject = last_msg.getSubject();
      var from = last_msg.getFrom();
      var regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      var emailAddress = from.match(regex)[0];

      function listHasMatch(list, address) {
        /*
         * email addresss and match regex may be capitalized
         * match regex mayonly contain domain part. e.g.:  "@xxxx.com"
         */
        return !!list.find(
          (reg) => !!address.toLowerCase().match(reg.toLowerCase())
        );
      }

      if (listHasMatch(watch_emails, emailAddress)) {
        threads[i].addLabel(label_need);
        GmailApp.moveThreadToArchive(threads[i]);
        logMessage(`need handle: ${emailAddress}; subject: ${subject}`);
      }
      if (listHasMatch(archive_emails, emailAddress)) {
        threads[i].removeLabel(label_need);
        threads[i].addLabel(label_ignore);

        GmailApp.moveThreadToArchive(threads[i]);
        logMessage(`ignore: ${emailAddress}; Subject: ${subject}`);
      }
    }
  }
  logMessage("Script Finished");
}
