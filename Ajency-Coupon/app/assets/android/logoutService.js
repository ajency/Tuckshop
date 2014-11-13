var alloy = require('alloy');
var service = Titanium.Android.currentService;

setTimeout(function(){  //timeout of 5 minutes so that service does not start immediately
	
	 	Cloud.Users.logout(function (e) {
	 		
    		if (e.success) {
    		dbOperations.updateSessionId(localStorage.getLastLoggedInUserId());
			dbOperations.offlineLoginStatus(localStorage.getLastLoggedInUserId());
			
			alloy.Globals.autoLogin = false;
			var multiView = Alloy.createController('multiUser', {}).getView().open();
			
			service.stop();
   		 	} else {
   		 	   
   		 	}
 		});
 		
	 },50000);

