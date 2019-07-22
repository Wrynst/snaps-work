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

var snapping3 = function (employeeName) {
  return snaps.map(function (x) {
    if (x.name === employeeName && x != null) {
      return x;
    }


  })

}

function testmain() {
//  Logger.log(snapping3('Lauren'));
}