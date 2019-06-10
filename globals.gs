var ss                = SpreadsheetApp.getActiveSpreadsheet();
var allSheets         = ss.getSheets();
var snaps             = getSheetObj('Snaps');
var allEmployees      = getSheetObj('Roster');
var employeeUser      = userNamer();
//var empSheet          = getSheetObj(employeeUser.name);
var allEmpNameEmail   = employeeNameAndEmailList();


function userNamer(){
  var list = employeeNameAndEmailList();
  //Logger.log(list);
  var email = Session.getActiveUser();
  var employeeUserNameAndEmail = list.filter(function(e) {
    if (e.email == email) {
      return e.name;  
    }
  });
  return employeeUserNameAndEmail[0];//empName[0].name;
}

function testGs(){

    Logger.log(allEmpNameEmail[0].name);
  }
    

function sheetNameList(){
  return allSheets.map(function(sheet){ return sheet.getName()})
}

function getEmpSheet(){
  

}

function employeeNameAndEmailList () {
  return allEmployees
    .map(function (d) {
      return { "name" : d.displayName, "email" : d.email };
    });
}

function getUserStats(){
  

}

//function userNamer(){
//  
//  return '<img src="https://robohash.org/'+ employeeUser['name'] +'.png?set=set4&size=50x50"><br><h1>'+ employeeUser['name'] +'</h1>';
//
//}