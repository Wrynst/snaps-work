function doGet(e) {
  
  var list = empList();
  
  var html = HtmlService.createTemplateFromFile('index');
  
 html.list = list;
  
  Logger.log(list);
  
 return  html.evaluate()
      .setTitle('Snap!')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setFaviconUrl("https://arnold.systems/img/lobster.png");
 // Logger.log( html);
  
}

function Boss(filth,impotency){
  this.filth = filth;
  this.impotency = impotency;
}

Boss.prototype.attack = function(){
  

}

function testmain(){
  Logger.log(empList());
}