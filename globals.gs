var   ss                = SpreadsheetApp.openById('1UngJuhGa1Pew9HdMp5vsoS45lUFXxNwmoYq8sT1FckE');
var   allSheets         = ss.getSheets();
var   snaps             = getSheetObj('Snaps');
var   allEmployees      = getSheetObj('Roster');
var   totals            = getSheetObj('Totals');

function employeeUser(nameOrEmailOrObj){
  var arrayGone = userNamer();
  var userObj = arrayGone[0]; 
  var userName = userObj.name;
  var userEmail = userObj.email;
  if (nameOrEmailOrObj === 'name'){
    return userName;
  } else if( nameOrEmailOrObj === 'email'){
    return userEmail;
  } else if( nameOrEmailOrObj === 'object'){
    return userObj;
  }
};  
    
    
//var empSheet          = getSheetObj(employeeUser.name);
var allEmpNameEmail   = employeeNameAndEmailList();

function getUserEmail(){ 
  
  var userEmail = Session.getActiveUser().getEmail();
  return userEmail;
}

function userNamer(){
  var list = employeeNameAndEmailList();
  //Logger.log(list);
  var email = Session.getActiveUser().getEmail();
  return list.filter(function(e) {
    if (e.email == email) {
     
      return e;  
    }
  });
  //return employeeUserNameAndEmail[0]; //empName[0].name;
}

function testGs(){
  var arrayGone = userNamer();
  var userObj = arrayGone[0]; 
  var userName = userObj.name;
  var userEmail = userObj.email;
    Logger.log(userObj);
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



//function userNamer(){
//  
//  return '<img src="https://robohash.org/'+ employeeUser['name'] +'.png?set=set4&size=50x50"><br><h1>'+ employeeUser['name'] +'</h1>';
//
//}