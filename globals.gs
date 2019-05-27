var snaps     = getSheetObj('Snaps');
var employees = getSheetObj('Roster');


function testGs(){
 
    Logger.log(getNamesOfEmps());
  }
    
function empList(){
  var empFirstNameAndEmailList = employees.map(function(emp){
    if (emp.displayName === undefined || emp.email === null){
     // Logger.log("This is Nate %s logged",emp.displayName); 
    }else{
      return { "name" : emp.displayName, "email" : emp.email };
    }
  });
    return empFirstNameAndEmailList;
}

function getSheetsInBook () {

  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheets()
  .map(function (d) {
    return d.getName();
  });
}
function getNamesOfEmps () {

  return employees
    .map(function (d) {
      return { "name" : d.displayName, "email" : d.email };
    });
}