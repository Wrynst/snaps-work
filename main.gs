function doGet(e) {
  
 // var named = employeeUser.name;
  
  
  var html = HtmlService.createTemplateFromFile('index');
  
  //html.userName = named;
  
  //Logger.log( html.name);
  
 return html.evaluate()
      .setTitle('Snap!')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setFaviconUrl("https://arnold.systems/img/lobster.png")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 
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