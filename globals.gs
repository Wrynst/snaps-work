var ss = SpreadsheetApp.openById('1UngJuhGa1Pew9HdMp5vsoS45lUFXxNwmoYq8sT1FckE');
var allSheets = ss.getSheets();
var snaps = getSheetObj('Snaps');
var allEmployees = getSheetObj('Roster');
var totals = getSheetObj('Totals');

function employeeUser(nameOrEmailOrObj) {
  var arrayGone = userNamer();
  var userObj = arrayGone[0];
  var userName = userObj.name;
  var userEmail = userObj.email;
  if (nameOrEmailOrObj === 'name') {
    return userName;
  } else if (nameOrEmailOrObj === 'email') {
    return userEmail;
  } else if (nameOrEmailOrObj === 'object') {
    return userObj;
  }
};

function getData (){
  var arrayNames = [];

  allSheets.forEach(function(sheet){
    Logger.log(sheet.getName());
    arrayNames.push(sheet.getName());

  })
  Logger.log(arrayNames);

}

//var empSheet          = getSheetObj(employeeUser.name);
var allEmpNameEmail = employeeNameAndEmailList();

function getUserEmail() {

  var userEmail = Session.getActiveUser().getEmail();
  return userEmail;
}

function userNamer() {
  var list = employeeNameAndEmailList();
  //Logger.log(list);
  var email = Session.getActiveUser().getEmail();
  return list.filter(function (e) {
    if (e.email == email) {

      return e;
    }
  });
  //return employeeUserNameAndEmail[0]; //empName[0].name;
}

function testGs() {
  Logger.log(getEmpSheet({name : "Becca", email : "jenna@yahoo.com", round : 1}));
 // Logger.log(userObj);
}


function sheetNameList() {
  return allSheets.map(function (sheet) {
    return sheet.getName()
  })
}

function getEmpSheet(nameandemail) {
  // dat object with look up requests - sent from fight2-js on client side
  var roundRequested = nameandemail.round;
  var empname = nameandemail.name;
  var empemail = nameandemail.email;
  
  // Look it up and objectify th e
  var sheet = ss.getSheetByName('Snaps');
  var lastrow = sheet.getLastRow();
  var lastcol = sheet.getLastColumn();
  var range = sheet.getRange(1,1,lastrow,lastcol).getDisplayValues();
  var obj =  objectSheet(range);
  
  // Three Snap Categories
  var solo = 0
  var team = 0
  var initiative = 0
  
  // Counter
  var i = 0;
  
 // var snapTypes = ['Initiative', 'Solo', 'Team'];  
  var playerInfoStats = {name: empname,
                         email: empemail,
                         round: roundRequested
                        };
 
       
   // ---TEAM------  --|||| 1 point = 1 Special |||  filter out the rows with these points
  var empObj = obj.filter( function( row ){
    
    if ( row.name === empname && row.round === roundRequested && row.event === 'Snap' && row.type === 'Team' ){ return row };
  })
  // ----TEAM ------- Loop through all the rows left and count up the points
  empObj.forEach(function(x){
    var points = x.points;
    team += parseInt( points );
      
  });
  
  playerInfoStats.team = team;
  
  // ---SOLO------  --|||| 1 point = 1 Heal |||  filter out the rows with these points
  var empObj2 = obj.filter( function( row ){
    if ( row.name === empname && row.round === '1' && row.event === 'Snap' && row.type === 'Solo'){ return row} ;
  })
  
  // ----SOLO ------- Loop through all the rows left and count up the points
  empObj2.forEach(function(x){
    var points = x.points;
    solo += parseInt(points);
  });
    
  playerInfoStats.solo = solo;
  
  // ---INITIATIVE-  --ADDL HP?  filter out the rows with these points
  var empObj3 = obj.filter( function( row ){
    if ( row.name === empname && row.round === '1' && row.event === 'Initiative'){ return row} ;
  })
  // ------INITIATIVE--- Loop through all the rows left and count up the points
  empObj3.forEach(function(x){
    var points = x.points;
    initiative += parseInt(points);
  });
  
  playerInfoStats.initiative = initiative;
  
  return playerInfoStats;
//playerInfoStats = {
//  'initiative': initiative,
//  'team' : team,
//  'solo' : solo,
//  'name' : empname,
//  'email' : empemail 
};
  
//  for( i = 0 ; empObj.length > i ; i++ ){
//    if ( empObj[i]['event'] === 'Initiative'){
//      initiative += empObj[i]['points'];
//    }
//  } 
 // Logger.log(playerInfoStats);



function employeeNameAndEmailList() {
  return allEmployees
    .map(function (d) {
      return {
        "name": d.displayName,
        "email": d.email
      };
    });
}



//function userNamer(){
//  
//  return '<img src="https://robohash.org/'+ employeeUser['name'] +'.png?set=set4&size=50x50"><br><h1>'+ employeeUser['name'] +'</h1>';
//
//}