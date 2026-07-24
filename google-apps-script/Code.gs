/**
 * ==============================================================================
 * EDUSOURCE HRD CENTRE - GERMAN LANGUAGE ADMISSION GOOGLE APPS SCRIPT
 * Production-Ready Backend for German Language Training Admissions
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other executions to finish
  if (!lock.tryLock(10000)) {
    return createJsonResponse(false, "Server busy. Please try submitting again.");
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse(false, "No post data received in request.");
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse(false, "Invalid JSON payload format.");
    }

    // Extract fields supporting both direct & legacy property names
    var fullName = (data.fullName || "").toString().trim();
    var dateOfBirth = (data.dateOfBirth || "").toString().trim();
    var gender = (data.gender || "").toString().trim();
    var email = (data.email || "").toString().trim();
    var phoneNumber = (data.phoneNumber || data.mobile || "").toString().trim();
    var currentAddress = (data.currentAddress || data.address || "").toString().trim();
    var educationalBackground = (data.educationalBackground || data.educationalQualification || "").toString().trim();
    var parentGuardianName = (data.parentGuardianName || data.guardianName || "").toString().trim();
    var parentGuardianPhone = (data.parentGuardianPhone || data.guardianMobile || "").toString().trim();
    var germanLevel = (data.germanLevel || "").toString().trim();
    var preferredMode = (data.preferredMode || "").toString().trim();
    var heardFrom = (data.heardFrom || data.referralSource || "").toString().trim();

    var termsAccepted = data.termsAccepted === true || data.acceptedTerms === true || String(data.termsAccepted).toLowerCase() === "true" || String(data.acceptedTerms).toLowerCase() === "true";
    var declarationAccepted = data.declarationAccepted === true || data.acceptedDeclaration === true || String(data.declarationAccepted).toLowerCase() === "true" || String(data.acceptedDeclaration).toLowerCase() === "true";

    // 1. Required Field Validations
    if (!fullName) return createJsonResponse(false, "Full Name is required.");
    if (!dateOfBirth) return createJsonResponse(false, "Date of Birth is required.");
    if (!gender) return createJsonResponse(false, "Gender selection is required.");
    if (!email) return createJsonResponse(false, "Email address is required.");
    if (!phoneNumber) return createJsonResponse(false, "Phone Number is required.");
    if (!currentAddress) return createJsonResponse(false, "Current Address is required.");
    if (!educationalBackground) return createJsonResponse(false, "Educational Background is required.");
    if (!parentGuardianName) return createJsonResponse(false, "Parent / Guardian Name is required.");
    if (!parentGuardianPhone) return createJsonResponse(false, "Parent / Guardian Phone Number is required.");
    if (!germanLevel) return createJsonResponse(false, "German Level selection is required.");
    if (!preferredMode) return createJsonResponse(false, "Preferred Mode selection is required.");
    if (!heardFrom) return createJsonResponse(false, "Referral Source (Heard From) is required.");

    // 2. Email Format Validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return createJsonResponse(false, "Invalid email address format.");
    }

    // 3. Phone Number Validation (Standard 10-digit Indian Mobile check)
    var phoneClean = phoneNumber.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      return createJsonResponse(false, "Invalid mobile number. Must contain at least 10 digits.");
    }

    // 4. Agreement Checkboxes Validation
    if (!termsAccepted) {
      return createJsonResponse(false, "You must accept the Terms and Conditions to proceed.");
    }
    if (!declarationAccepted) {
      return createJsonResponse(false, "You must accept the Declaration to proceed.");
    }

    // Get or Create Sheet Tab "German Admissions"
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = "German Admissions";
    var sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }

    // Define Header Columns
    var headers = [
      "Timestamp",
      "Full Name",
      "Date of Birth",
      "Gender",
      "Email",
      "Phone Number",
      "Current Address",
      "Educational Background",
      "Parent Guardian Full Name",
      "Parent Guardian Contact Number",
      "German Level",
      "Preferred Mode",
      "Referral Source",
      "Terms Accepted",
      "Declaration Accepted"
    ];

    // Automatically create header row if sheet is brand new or empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#059669"); // Emerald theme color
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Prepare Row Values
    var formattedTimestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var rowValues = [
      formattedTimestamp,
      fullName,
      dateOfBirth,
      gender,
      email,
      "'" + phoneNumber, // Prepended single quote to preserve string formatting for phone numbers
      currentAddress,
      educationalBackground,
      parentGuardianName,
      "'" + parentGuardianPhone,
      germanLevel,
      preferredMode,
      heardFrom,
      "Yes",
      "Yes"
    ];

    // Append submission row to sheet
    sheet.appendRow(rowValues);

    return createJsonResponse(true, "Admission submitted successfully");

  } catch (error) {
    return createJsonResponse(false, "Server Error: " + error.toString());
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse(true, "Edusource HRD German Admission API Service is Active");
}

function createJsonResponse(success, message) {
  var response = {
    success: success,
    message: message
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
