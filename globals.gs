
var snaps     = getSheetObj('Snaps');
var employees = getSheetObj('Roster');
var userName  = userNamer();


function userEmail(){
  return Session.getActiveUser().getEmail();
}

function userNamer(){
  var list = employeeNameAndEmailList();
  //Logger.log(list);
  var email = Session.getActiveUser();
  var name = list.filter(function(e) {
    if (e.email == email) {
      return e.name;  
    }
  });
  return name[0].name;
}

function testGs(){

    Logger.log(userNamer());
  }
    


function getSheetsInBook () {

  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheets()
  .map(function (d) {
    return d.getName();
  });
}
function employeeNameAndEmailList () {

  return employees
    .map(function (d) {
      return { "name" : d.displayName, "email" : d.email };
    });
}

function getUserStats(){
  

}

function getUserDataFight(){
  
  return '<img src="https://robohash.org/'+ userName +'.png?set=set4&size=50x50"><br><h1>'+ userName +'</h1>';

}