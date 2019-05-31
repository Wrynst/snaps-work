function sheetValues(){
  var sp = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sp.getSheetByName("leaderboard");
  var values = sheet.getDataRange().getValues();
  return values;
}

function makeTables(arrayofSheetNames){
  var tables = [];
  arrayofSheetNames.forEach(function(sheet){
    var table = sheet2htmlTable(sheet);
    var sheet = sheet;
    tables.push({ sheet : table });
  }); 
  Logger.log(tables);
  return tables;
}

function sheet2htmlTable(sheetName){
 
  var sp = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sp.getSheetByName(sheetName) ;
  var values = sheet.getDataRange().getDisplayValues() ;
  
  var htmlStr = '<table class="w3-table-all w3-animate-zoom">' ; // open with the HTML tag <table>
  htmlStr += values.map(function(row) {
  //each row in values array contribute for an HTML table row :
   // <tr> htmlRow </tr>
    return "<tr>" + row.map(function(d){
    Logger.log(userName);  
      if( d === "Team Snap" || d === "Solo Snap" || d === "Efficiency" || d ===  "Quality" || d === "Initiative" || d ===  "Leader" || d === "Add Rolls" || d === "Overall" || d === "5/15/2019" || d === "✵" || d === "5/31/2019" || d === "☂" || d === "⚶" || d === "ꗈ" || d === "6/15/2019"){
        return '<th class="w3-black">'+ d +"</th>"
      }else if( d === userName ){
        return '<td><a href="#'+ userName +'"class="fancy-link">'+ d +'</a></td>'
      }else{
        return '<td class="cell">'+ d +"</td>"
      }
        }).join("") + "</tr>" ;
  }).join("");
  htmlStr += "</table>" ; // close with the HTML tag </table>
 
  return htmlStr;
  //Logger.log( htmlStr );
}

function testFuncs(){
  
   Logger.log();
}


/*
 * @param(string) sheetName is the name of the sheet as a string
 */
function getSheetObj(sheetName) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName).getDataRange().getDisplayValues();
  return objectSheet(sheet);
}

function objectSheet(data) {
  
  var headers = data.shift();
  var fixedHeaders = normalizeHeaders(headers);
  
  // convert 2d array into object array
  // https://stackoverflow.com/a/22917499/1027723
  var obj = data.map(function(values) {
    return fixedHeaders.reduce(function(o, k, i) {
      o[k] = values[i];
      return o;
    }, {});
  });
  return obj;
}

function include(html){
  return HtmlService.createHtmlOutputFromFile(html).getContent();
}
//formQuestions(form,obj);
// ScriptApp.newTrigger().forSpreadsheet(ss).onFormSubmit().create();

// Returns an Array of normalized Strings.
// Empty Strings are returned for all Strings that could not be successfully normalized.
// Arguments:
//   - headers: Array of Strings to normalize
//
//
//[empData]
//[invoice, hcpId, createdAt, date, endTime, travelDuration, onJobDuration, totalDuration, customer, firstName, lastName, 
// email, company, mobilePhone, homePhone, customerTags, address, street, streetLine2, city, state, zip, description, lineItems, 
// amount, labor, materials, subtotal, paymentHistory, creditCardFee, paidAmount, due, discount, tax, taxableAmount, taxRate, 
// jobTags, notes, employee, jobStatus, finished, payment, invoiceSent, window, attachments, segments, hcJob, tipAmount, onlineBookingSource]

function normalizeHeaders(headers) {
  var keys = [];
  for (var i = 0; i < headers.length; ++i) {
    keys.push(normalizeHeader(headers[i]));
    //Logger.log("string: "+headers[i]);
  }
  return keys;
}
// Normalizes a string, by removing all alphanumeric characters and using mixed case
// to separate words. The output will always start with a lower case letter.
// This function is designed to produce JavaScript object property names.
// Arguments:
//   - header: string to normalize
// Examples:
//   "First Name" -> "firstName"
//   "Market Cap (millions) -> "marketCapMillions
//   "1 number at the beginning is ignored" -> "numberAtTheBeginningIsIgnored"
function normalizeHeader(header) {
  var key = "";
  var upperCase = false;
  for (var i = 0; i < header.length; ++i) {
    var letter = header[i];
    if (letter == " " && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum(letter)) {
      continue;
    }
    if (key.length == 0 && isDigit(letter)) {
      continue; // first character must be a letter
    }
    if (upperCase) {
      upperCase = false;
      key += letter.toUpperCase();
    } else {
      key += letter.toLowerCase();
    }
  }
  //Logger.log("header: "+key);
  return key;
}

// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}

// Returns true if the character char is alphabetical, false otherwise.
function isAlnum(char) {
  return char >= 'A' && char <= 'Z' ||
    char >= 'a' && char <= 'z' ||
    isDigit(char);
}

// Returns true if the character char is a digit, false otherwise.
function isDigit(char) {
  return char >= '0' && char <= '9';
}