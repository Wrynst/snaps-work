function sheetValues(){
  var sp = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sp.getSheetByName("leaderboard");
  var values = sheet.getDataRange().getValues();
  return values;
}

function testFuncs(){
  
   Logger.log(makeTables(['leaderboard1','leaderboard2', 'leaderboard3']));
};

function makeTables(arrayofSheetNames){
  var tables = [];
  arrayofSheetNames.forEach(function(sheet){
    var table = sheet2htmlTable(sheet);
    var sheetName = sheet.toString();
    tables.push({ 'name' : sheetName, 'table' : table });
  }); 
 // Logger.log(tables);
  return tables;
}

function sheet2htmlTable(sheetName){
 
  
  var sheet = ss.getSheetByName(sheetName) ;
  var values = sheet.getDataRange().getValues() ;
  
  var htmlStr = '<table class="w3-table-all">' ; // open with the HTML tag <table>
  htmlStr += values.map(function(row) {
  //each row in values array contribute for an HTML table row :
   // <tr> htmlRow </tr>
    return "<tr>" + row.map(function(d){
      
      for ( i=0; i<allEmpNameEmail.length; i++){ 
        if(allEmpNameEmail[i].name === d ) {
         // Logger.log(allEmpNameEmail[i].name);
          return '<td><button id="'+ d +'" onclick="natemodal(this.id)" class="fancy-link">'+ d +'</button></td>';
        } 
      }
        
      if( d === "Team Snap" || d === "Solo Snap" || d === "Efficiency" || d ===  "Quality" || d === "Initiative" || d ===  "Leader" || d === "Self Starting" || d === "Overall" || d === "5/15/2019" || d === "✵" || d === "5/31/2019" || d === "☂" || d === "⚶" || d === "ꗈ" || d === "6/15/2019"){
        return '<th>'+ d +"</th>"
      }else{
        return '<td class="cell">'+ d +'</td>'
        }
    
    }).join("") + "</tr>" ;
  }).join("");
  htmlStr += "</table>" ; // close with the HTML tag </table>
 
  return htmlStr;
  //Logger.log( htmlStr );
}

function sheet2htmlTableHome(nameOfSheet){
 
 
  var sheet = ss.getSheetByName(nameOfSheet) ;
  var values = sheet.getDataRange().getDisplayValues() ;
  var header = values.shift();
  var header1 = values.shift();
  //var htmlStr = '<h1 class="title home-title">'+ employeeUser.name +' calls it home.</h1><div class=" kitty-card"><div class=""><img src="https://robohash.org/'+ employeeUser.name +'.png?set=set4&size=150x150"><div class="w3-container w3-center"><h1>'+ employeeUser.name +'</h1></div></div></div>'; // open with the HTML tag <table>
  //header
  var htmlStr = '<br><div class="w3-container"><table class="indvidual w3-table-all"><tr>';
  htmlStr += header1.map(function(cell) {return '<th style="padding: 5px;">'+ cell +'</th>'}).join(""); 
  htmlStr += '</tr>';
  //body
  htmlStr += values.map(function(row) {
  //each row in values array contribute for an HTML table row :
    //<tr> htmlRow </tr>
   // Logger.log(htmlStr);
    return "<tr>" + row.map(function(d){
      return '<td class="cell">'+ d +"</td>"
      }).join("") + "</tr>";
   }).join("");
  htmlStr += "</table></div>"
  return htmlStr;
}

function statsModal(){
  

}




/*
 * @param(string) sheetName is the name of the sheet as a string
 * this is called from js.html and callback goes to js.html
 */
function getSheetObj2headers(sheetName) {
 
  var sheet = ss.getSheetByName(sheetName).getDataRange().getDisplayValues();
  var name = sheet.shift();
  var sheetObj = objectSheet(sheet);
  return {'name': sheetName, 'obj': sheetObj};
}

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