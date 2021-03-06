var __ = require('platformSupport');
var myAnimation = require('animation');

var moment = require('alloy/moment');
var day;
//for image loader
var loaderAnimate;
var instanceOfListener;
var instanceOfFireListener;
var type;

if (OS_IOS) {
	Titanium.UI.iPhone.setAppBadge(null);
}

//for local storage
var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');
var fetchProductsJs = require('/fetchCloudProducts');

// set the length of the images you have in your sequence
var loaderArrayLength=4;
 
// initialize the index to 1
var loaderIndex=1;

 
// this function will be called by the setInterval
function loadingAnimation(){
  // set the image property of the imageview by constructing the path with the loaderIndex variable
  $.animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
  //increment the index so that next time it loads the next image in the sequence
  loaderIndex++;
  // if you have reached the end of the sequence, reset it to 1
  if(loaderIndex===5)loaderIndex=1;
}

/*
 * Show and hide imageview
 */

var showImageView = function(){
	
	$.animateObject.height=96;
	$.animateObject.width=96;
	
};

var hideImageView= function (argument) {
	
    $.animateObject.height=0;
	$.animateObject.width=0;
};


/*
 * Show and hide View components
 */

var showComponents = function  (argument) {
   
    $.passwordTextfield.visible = true;
	$.usernameTextfield.visible = true;
	$.loginButton.visible = true;
	$.registerButton.visible = true;
};

var hideComponents = function  () {
  
    $.passwordTextfield.visible = false;
	$.usernameTextfield.visible = false;
	$.loginButton.visible = false;
	$.registerButton.visible = false;
};

var showConnectionErrorView = function () {
    $.errorLabel.height="15%";
    $.errorLabel.width="30%";
};

$.errorLabel.addEventListener('click',function(e){
	if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		
		else{
			
			if(type==='autoLogin')
    			autoLogin();
    		else{
    			showImageView();
   				// start the setInverval -- adjust the time to make a smooth animation
    			loaderAnimate = setInterval(loadingAnimation,200);
    		    hideConnectionErrorView(); 
    		    
    				if(type==='updateCreditDate')
    				updateCreditDate();
    				
    				else if(type==='updateCreditAmount')
    				updateCreditAmount();
    		
    		        else if(type==='deviceTokenError'){
    		        	// Initialize the module
						CloudPush.retrieveDeviceToken({
							success : deviceTokenSuccess,
							error : deviceTokenError
						});
    		        }
    				
    				
    				else if(type==='subscribeToChannel')
    				subscribeToChannel();
    				
    				else if(type==='fetchCloudProducts'){
						
						fetchProductsJs.fetchCloudProducts('menu');
    				}
    				
    				else if(type==='transactionsOnProductIds'){
						
						fetchProductsJs.transactionsOnProductIds('menu');
    				}
    				
    				else if(type==='pushRegisterError'){
						
					 	if (OS_IOS) {
					 			Ti.Network.registerForPushNotifications({
								// Specifies which notifications to receive
								types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
								success : deviceTokenSuccess,
								error : deviceTokenError,
								callback : receivePush
							});
					 	}
					 
					 	else{
					 		   
								CloudPush.retrieveDeviceToken({
									success : deviceTokenSuccess,
									error : deviceTokenError
								});
					 	}
    				}
    				
    		}	
    	
    	
		}
	
});
var hideConnectionErrorView = function  () {
    $.errorLabel.height=0;
    $.errorLabel.width=0;
};


Ti.App.addEventListener('errorIndex', function(data) {
	console.log('Error event fired');
	hideImageView();
	clearInterval(loaderAnimate);
	type=data.name;
	showConnectionErrorView();
	
	
});

//Open Register View
function openRegister(e) {

	var register = Alloy.createController("register").getView();
	if (OS_IOS)
	   $.win1.openWindow(register);
	 else
	   register.open();  
	   
}

/*
 *Textfield to retrieve the last value
 */
if ( localStorage.getUserName()) {
	$.usernameTextfield.value = localStorage.getUserName();
};

/*
 * Login button clicked
 */
function loginClicked(e) {
	//	var main = Alloy.createController('menu').getView().open();
	var enteredEmailValue;
	
	//check if fields are empty
	if ($.usernameTextfield.value.trim() != '' && $.passwordTextfield.value.trim() != '') {
		
		 enteredEmailValue=$.usernameTextfield.value.split('@');
         
		//check for valid email
		if (!checkemail($.usernameTextfield.value)) {
			alert("Please enter a valid email");
		} else {
			//check if email is ajency mail
			if (enteredEmailValue[1] === 'ajency.in') {
				//check for network
				if (networkCheck.getNetworkStatus()==0) {
					alert('No Internet Connection');

				} else {
					
				   $.usernameTextfield.blur();
				   $.passwordTextfield.blur();
				   showImageView();
				   // start the setInverval -- adjust the time to make a smooth animation
                    loaderAnimate = setInterval(loadingAnimation,200);
                  
				    hideComponents();
				   
       				$.loginButton.enabled = false;
					Cloud.Users.login({
						login : $.usernameTextfield.value,
						password : $.passwordTextfield.value
					}, function(e) {
						
						if (e.success) {
							var user = e.users[0];
							//	subscribeToChannel();
							
                            localStorage.saveUserId(user);
                            localStorage.saveUserName($.usernameTextfield.value);
                            localStorage.saveDisplayName(enteredEmailValue[0]);
                            localStorage.saveSessionId(e.meta.session_id);
							localStorage.saveCreditedDate(user.custom_fields.credited_date_at);
                            
							Ti.API.info('test credited date:::\n' + user.custom_fields.credited_date_at);
							day = moment(user.custom_fields.credited_date_at);
							
							//get the last credited date
							updateCreditDate();
                            /*
							//if application is deleted from device load the products
							if (! localStorage.getAllProducts()) {
								
								//Subscribe to channel for push notifications
								subscribeToChannel();
								var fetchProductsJs = require('/fetchCloudProducts');
								//	fetchProductsJs.fetchCloudProducts('main');
								fetchProductsJs.fetchCloudProducts('menu');

							} else {
								//	var main = Alloy.createController('main', {}).getView().open();
								var main = Alloy.createController('menu', {}).getView().open();
								hideImageView();
								clearInterval(loaderAnimate);
							}
                            */
						} else {
							hideImageView();
							showComponents();
							clearInterval(loaderAnimate);
							
							if(e.code==401){
								alert('Invalid username and password');
							}else{
								alert('Could not connect to server. Try again ');
							}
							
							$.loginButton.enabled = true;
						}
					});
				}
			} else {
                alert('Enter Ajency mail id');
                $.loginButton.enabled = true;
			}

		}

	} else {
		alert("Username/Password are required");
		$.loginButton.enabled = true;
	}

}

/*
 * Auto Login function
 */

var autoLogin = function  () {

  if (localStorage.getSessionId() != null){
  		showImageView();
   		// start the setInverval -- adjust the time to make a smooth animation
    	loaderAnimate = setInterval(loadingAnimation,200);
		
		hideComponents();
		hideConnectionErrorView();
    
    
        Cloud.sessionId = localStorage.getSessionId();
        Cloud.Users.showMe(function (e) {
                if (e.success) {
                	var user = e.users[0];
                    hideImageView();
					clearInterval(loaderAnimate);
					day = moment(user.custom_fields.credited_date_at);
					updateCreditDate();
                }else{
                	hideImageView();
					clearInterval(loaderAnimate);
					
					if(e.code==400){
					  alert('Failed to find current User');
					  showComponents();
					}else{
						type='autoLogin';
                		showConnectionErrorView();
					}
				
                }
                
         });
 	}	      
};

/*
 * Update the new credit date
 * after a month is over
 */
var updateCreditDate = function() {

	//	createdDateValue=new Date(day.add('months',1));
	//	Ti.API.info('Date:::\n' + new Date(day.add('months',1)));
	createdDateValue = day.add('months', 1);

	Ti.API.info('Created Date:::\n' + moment(createdDateValue).format());

	Ti.API.info('Minutes remaining:::\n' + moment().diff(createdDateValue, 'minutes'));

	if (moment().diff(createdDateValue, 'minutes') > 0) {
		Cloud.Users.update({
			custom_fields : {
				credited_date_at : moment(createdDateValue).format()
			}
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				updateCreditAmount();
			//	alert('Success:\n' + 'id: ' + user.id + '\n' + 'credited date: ' + user.credited_date_at);

			} else {
				hideImageView();
				clearInterval(loaderAnimate);
				type='updateCreditDate';
                showConnectionErrorView();
                console.log('UPDATE CREDIT DATE');
			//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}

		});
	}
	else{
		//if application is deleted from device load the products
		if (! localStorage.getAllProducts() && !pushNotificationReceived) {
			subscribeToChannel();

		} else {
			var main = Alloy.createController('menu', {}).getView().open();
			hideImageView();
			clearInterval(loaderAnimate);
		}
		
	}

};

/*
 * make entry of credited amount in transaction
 */
var updateCreditAmount = function() {

    
	Cloud.Objects.create({
		classname : 'testItems',
		fields : {
			productName : 'Credit',
			productPrice : +500,
			productId : 1010,
			userId : localStorage.getUserId()
		}
	}, function(e) {
		if (e.success) {
			console.log('Amount credited in index');
			var testItem = e.testItems[0];
			//if application is deleted from device load the products
			if (! localStorage.getAllProducts()) {
				
				subscribeToChannel();
				

			} else {
				var main = Alloy.createController('menu', {}).getView().open();
				hideImageView();
				clearInterval(loaderAnimate);
			}
			
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			type='updateCreditAmount';
            showConnectionErrorView();
            console.log('UPDATE CREDIT AMOUNT');
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

/*
 * Subscribe the device to a channel for
 * push notification
 */
function subscribeToChannel() {
	
	
	// Subscribes the device to the 'news_alerts' channel
	// Specify the push type as either 'android' for Android or 'ios' for iOS
	Cloud.PushNotifications.subscribeToken({
		device_token : deviceToken,
		channel : 'test',
		type : Ti.Platform.name == 'android' ? 'android' : 'ios'
	}, function(e) {
		if (e.success) {
			fetchProductsJs.fetchCloudProducts('menu');
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			type='subscribeToChannel';
            showConnectionErrorView();
            console.log('SUBSCRIBE CHANNEL');
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

/*
 * validation for email address
 */

function checkemail(emailAddress) {
	var str = emailAddress;
	var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
	if (filter.test(str)) {
		testresults = true;
	} else {
		testresults = false;
	}
	return (testresults);
};

/*
if (localStorage.getSessionId() != null){
	
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) 
		alert('No Internet Connection');
	else{
		autoLogin();
	}
	
} 
*/  
autoLogin();

Ti.App.addEventListener('pushNotificationRegisterError',function(e){
	
	type='pushRegisterError';
	showConnectionErrorView();
     hideComponents();
    
});

function deviceTokenSuccess(e) {
	deviceToken = e.deviceToken;
	hideImageView();
	clearInterval(loaderAnimate);
	showComponents();
	localStorage.saveDeviceToken(e.deviceToken);
}

function deviceTokenError(e) {
	alert('Failed to register for push notifications! ');
	Ti.App.fireEvent('pushNotificationRegisterError');
	
}

if (OS_IOS)
$.win1.open();

else 
$.index.open();

