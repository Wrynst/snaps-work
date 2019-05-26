function doGet(e) {
  
  //var table = sheet2htmlTable('leaderboard1');
  
  var html = HtmlService.createTemplateFromFile('index');
  
 // html.table = table;
  
  Logger.log(html.table);
  
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