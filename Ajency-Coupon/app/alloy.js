// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var Cloud = require('ti.cloud');
Cloud.debug = true;
// optional; if you add this line, set it to false for production

var finalArray = [];
var allProductsArray = [];
var localPath;
var createdDateValue;

//for local storage
var localStorage=require('/localStorage');

var deviceToken = null;
Alloy.Globals.pushNotificationReceived = false; //handle push notifications on auto login

var dbOperations=require('/dbOperations');
dbOperations.createDB();
dbOperations.addColumn();

if (OS_IOS) {
	
	console.log('In iphone');
	Titanium.UI.iPhone.setAppBadge(null);
	// Check if the device is running iOS 8 or later
		if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
			
		    function registerForPush() {
		        Ti.Network.registerForPushNotifications({
		            success: deviceTokenSuccess,
		            error: deviceTokenError,
		            callback: receivePush
		        });
		        // Remove event listener once registered for push notifications
		        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
		    };
		 
			// Wait for user settings to be registered before registering for push notifications
		    Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);
		 	
		    // Register notification types to use
		    Ti.App.iOS.registerUserNotificationSettings({
			    types: [
		            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
		            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
		            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
		        ]
		    });
		
		} 
		else{
			Ti.Network.registerForPushNotifications({
				// Specifies which notifications to receive
				types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivePush
			});
		}
		

} else {
	// Require the module
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
	CloudPush.enabled = true;
	CloudPush.showTrayNotificationsWhenFocused = true;
	CloudPush.focusAppOnPush = false;
	
	// Initialize the module
	CloudPush.retrieveDeviceToken({
		success : deviceTokenSuccess,
		error : deviceTokenError
	});
	
    
	// Process incoming push notifications (android)
	
	CloudPush.addEventListener('callback', function(evt) {
		
		var a = JSON.parse(evt.payload);
		
		if(a.hasOwnProperty('custom_property')){
			
			if(localStorage.getPendingItems())
				finalArray = localStorage.getPendingItems();
			
			finalArray.unshift(a.message);
			
			Ti.App.Properties.removeProperty('pendingItems');
			
			localStorage.savePendingItems(finalArray);
		}
		else{
			Alloy.Globals.pushNotificationReceived = true;       //set push notification to true since we received one
			var fetchProductsJs = require('/fetchCloudProducts');
			
			//Update purpose 4.0
			var totalUsers = dbOperations.getCount();
			if(totalUsers ===1)
				fetchProductsJs.fetchCategories('home');
			else if(totalUsers>1)
				fetchProductsJs.fetchCategories('alloy');	
			
			
			
			var confirm = Titanium.UI.createAlertDialog({
	        	title: 'Notification',
	        	message: a.android.alert,
	        	buttonNames: ['OK'],
	        	cancel: 0
			});
			
			confirm.show();
		}
		
	});
	
	/*
	CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
    	var fetchProductsJs = require('/fetchCloudProducts');
		fetchProductsJs.fetchCloudProducts('');
    	alert('Tray Click Launched App (app was not running)');
    });
	CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
    	var fetchProductsJs = require('/fetchCloudProducts');
		fetchProductsJs.fetchCloudProducts('');
    	alert('Tray Click Focused App (app was already running)');
	});
	*/
   /*
	CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
		var fetchProductsJs = require('/fetchCloudProducts');
		fetchProductsJs.fetchCloudProducts('');

	});
	*/
}

// Enable push notifications for this device
// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {
	deviceToken = e.deviceToken;
	
}

function deviceTokenError(e) {
	alert('Failed to register for push notifications!');
	Ti.App.fireEvent('pushNotificationRegisterError');
	
}


// Process incoming push notifications (ios)
function receivePush(e) {
	
	
	if(e.data.hasOwnProperty('custom_property')){
		
		if(localStorage.getPendingItems())
			finalArray = localStorage.getPendingItems();
			
		finalArray.unshift(e.data.message);
		
		Ti.App.Properties.removeProperty('pendingItems');
		
		localStorage.savePendingItems(finalArray);
	}
	else{
		Alloy.Globals.pushNotificationReceived = true;       //set push notification to true since we received one
		var fetchProductsJs = require('/fetchCloudProducts');
	
		//Update purpose 4.0
		var totalUsers = dbOperations.getCount();
		if(totalUsers ===1)
			fetchProductsJs.fetchCategories('home');
		else if(totalUsers>1)
			fetchProductsJs.fetchCategories('alloy');
		
		
		// alert(e.data.alert);
		var confirm = Titanium.UI.createAlertDialog({
	        	title: 'Notification',
	        	message: e.data.alert,
	        	buttonNames: ['OK'],
	        	cancel: 0
			});
			
		confirm.show();
	}
	
}

Alloy.Globals.categoryResponse=[];

Alloy.Globals.userResponse = [];
//Navigation track (Default - Home)
Alloy.Globals.navigatedView = 'Home';

Alloy.Globals.successOnRefresh;

Alloy.Globals.navigatePrevious;
Alloy.Globals.toggleLeft;

Alloy.Globals.midContainerReference;

Alloy.Globals.navigatedFromAllProducts = false;

Alloy.Globals.autoLogin=false;          

Alloy.Globals.logoutInterval;
         
Alloy.Globals.forceLogout = function (){
		
       Alloy.Globals.logoutInterval = setTimeout(function(){
       	
			Cloud.Users.logout(function (e) {
	 		
    			if (e.success) {
    				
    					dbOperations.updateSessionId(localStorage.getLastLoggedInUserId());
						dbOperations.offlineLoginStatus(localStorage.getLastLoggedInUserId());
			
						Alloy.Globals.autoLogin = false;
						var multiView = Alloy.createController('multiUser', {}).getView().open();
			
			
   		 	  		} else {  //if autologout fails
   		 	   			var main = Alloy.createController('index', {}).getView().open();
   		 			}
 			});
 			
		},250000);
};


// if(Titanium.App.version >= '2.0' && dbOperations.getCount() ===0){    //clear all products for an app update version 2.0 so that users do not have to refresh
	// console.log('App version greater');
	// Ti.App.Properties.removeProperty('allProductResponse');
// }
