require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});

AV.Cloud.afterSave("Messages", function(request){
	var message = request.object.get("data");
  console.log(request.object);

	AV.Cloud.httpRequest({
	  method: 'POST',
	  url: 'http://183.247.151.178:2090/appin_one/interface/GetInfoService.aspx?module=SyncMessage',
		
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': message.length
			//'Content-Type': 'application/x-www-form-urlencoded'
		},

		body: message,
	  success: function(httpResponse) {
			console.log(message);
			console.log(message.length);
			console.log(httpResponse.status + "ok..");
	    console.log(httpResponse.text);
	  },
	  error: function(httpResponse) {
			console.log(httpResponse);
	    console.error('Request failed with response code ' + httpResponse.status);
	  }
	});

	//response.success();
})

