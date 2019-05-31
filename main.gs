function doGet(e) {
  
  //var email = userEmail();
  
  
  var html = HtmlService.createTemplateFromFile('index');
  
  //html.userEmail = email;
  //Logger.log( html.userEmail);
  
 return html.evaluate()
     .setTitle('Snap!')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setFaviconUrl("https://arnold.systems/img/lobster.png"); 
}

function Boss(name,filth,impotency){
  this.name = name;
  this.filth = filth;
  this.impotency = impotency;
}

Boss.prototype.attack = function(){
  

}



function testmain(){
  Logger.log(userEmail());
}