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

var juicesProductArray = [];
var biscuitsProductArray = [];
var rollsProductArray = [];
var allProductsArray = [];
var Settings;
var newFile;
var localPath;
var createdDateValue;

//for local storage
var localStorage=require('/localStorage');

var deviceToken = null;
var pushNotificationReceived = false; //handle push notifications on auto login

if (OS_IOS) {
	console.log('In iphone');
	Titanium.UI.iPhone.setAppBadge(null);
	Ti.Network.registerForPushNotifications({
		// Specifies which notifications to receive
		types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
		success : deviceTokenSuccess,
		error : deviceTokenError,
		callback : receivePush
	});

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
		pushNotificationReceived = true;       //set push notification to true since we received one
		var fetchProductsJs = require('/fetchCloudProducts');
		fetchProductsJs.fetchCloudProducts('alloy');
	//	alert("Notification received: " + evt.payload);
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
	localStorage.saveDeviceToken(e.deviceToken);
}

function deviceTokenError(e) {
	alert('Failed to register for push notifications!');
	Ti.App.fireEvent('pushNotificationRegisterError');
	
}


// Process incoming push notifications (ios)
function receivePush(e) {
	var fetchProductsJs = require('/fetchCloudProducts');
	fetchProductsJs.fetchCloudProducts('alloy');
//	alert("Notification received: " + e.payload);
}


//Navigation track (Default - Home)
Alloy.Globals.navigatedView = 'Home';
var dbOperations=require('/dbOperations');
db = dbOperations.createDB();
var autoLogin = null;                   
