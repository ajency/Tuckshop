var args = arguments[0] || {};

var alloy = require('alloy');
var __ = require('platformSupport');
var myAnimation = require('animation');

var enteredEmailValue;

var moment = require('alloy/moment');
var day;
var totalSum;
//for image loader
var loaderAnimate;
var instanceOfListener;
var instanceOfFireListener;


if (OS_IOS) {
	Titanium.UI.iPhone.setAppBadge(null);
}

//for local storage
var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');
var fetchProductsJs = require('/fetchCloudProducts');


// var db = Ti.Database.install('DB1', 'tuckshop');

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

/*
 * Check if organization details present
 */
if(localStorage.getOrganizationId()){
		
	if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())){ 
		
		 var organizationDetails =  dbOperations.getOrganizationRow(localStorage.getOrganizationId());
		
		 $.companyLogo.image = organizationDetails[0].organization_logo;
	}
}

if (localStorage.getErrorAtIndex()) {   // if error is present do not allow the user to navigate
	
	if (OS_IOS)
		$.win1.open();
	else 
		$.index.open();
		
	hideComponents();
    showConnectionErrorView();
}
else
   doNavigation();

$.errorLabel.addEventListener('click',function(e){
	if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		
		else{
			 
    			showImageView();
   				// start the setInverval -- adjust the time to make a smooth animation
    			loaderAnimate = setInterval(loadingAnimation,200);
    		    hideConnectionErrorView(); 
    		    
    				if(localStorage.getErrorAtIndex() === 'updateCreditDate')
    				updateCreditDate();
    				
    				else if(localStorage.getErrorAtIndex() === 'updateCreditAmount')
    				updateCreditAmount();
    				
    				else if(localStorage.getErrorAtIndex() === 'removeCarryForward')
    				removeCarryForward(totalSum);
    				
    		        else if(localStorage.getErrorAtIndex() === 'deviceTokenError'){
    		        	// Initialize the module
						CloudPush.retrieveDeviceToken({
							success : deviceTokenSuccess,
							error : deviceTokenError
						});
    		        }
    				
    				else if(localStorage.getErrorAtIndex() === 'updateLastMailDate')
    				updateLastMailDate();
    				
    				else if(localStorage.getErrorAtIndex() === 'updateDeviceToken')
    				updateDeviceToken();
    				
    				else if(localStorage.getErrorAtIndex() === 'subscribeToChannel')
    				subscribeToChannel();
    				
    				else if(localStorage.getErrorAtIndex() === 'subscribeToPendingChannel')
    				subscribeToPendingChannel();
    				
    				else if(localStorage.getErrorAtIndex() === 'organizationData')
    				organizationData();
    				
    				else if(localStorage.getErrorAtIndex() === 'fetchCategories'){
						fetchProductsJs.fetchCategories('menu');
    				}
    				
    				else if(localStorage.getErrorAtIndex() === 'fetchCloudProducts'){
						fetchProductsJs.fetchCloudProducts('menu');
    				}
    				
    				else if(localStorage.getErrorAtIndex() === 'transactionsOnProductIds'){
						fetchProductsJs.transactionsOnProductIds('menu');
    				}
    				
    				else if(localStorage.getErrorAtIndex() === 'transactionsOnProductIdsGreaterThanThousand'){
						fetchProductsJs.transactionsOnProductIdsGreaterThanThousand('menu');
    				}
    				
    				else if(localStorage.getErrorAtIndex() === 'pushRegisterError'){
						
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

    			Ti.App.Properties.removeProperty('errorAtIndex');
    	
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
	localStorage.saveErrorAtIndex(data.name);
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
if(Object.keys(args).length != 0){       //populate from multi user page
	$.usernameTextfield.value = args.title;
}
else if( localStorage.getUserName()) {
	$.usernameTextfield.value = localStorage.getUserName();
};

function dbUserInfo(e){
	
	var user = e.users[0];
	
	 if(dbOperations.checkIfRowExists(user.id)){
    	dbOperations.onlineLoginStatus(user.id);
    	dbOperations.setOrganizationId(user.id,user.custom_fields.organizationId);  //adding the organization id value to the users table
    	
    	var mailStatus = dbOperations.getMailStatus(localStorage.getLastLoggedInUserId());    //only if the mail status's are not set for the user
    	if(mailStatus.mails === null && mailStatus.daily_weekly=== null)
    	  dbOperations.updateMailStatus(user.id, 1, 'daily');
    	  
    	var mailDate = dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId());   
    	if(mailDate === null)
    	  dbOperations.updateLastMailDate(user.id, user.custom_fields.last_mail_date);
    	
    	var userType = dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId());  
    	if(userType === null)
    	   dbOperations.updateUserType(user.id, user.admin);	
    	
    	if(user.hasOwnProperty('role')){
    		console.log('user has a role');
    		dbOperations.updateUserRole(user.id, user.role);  
    	} 
    	else
    		dbOperations.updateUserRole(user.id, 'consumer'); 	 
    }
        
	else{
		
		var role;
		if(user.hasOwnProperty('role')){
			console.log('user has a role');
			role='cook';
		}
    	    
    	else
    		role='consumer';
    		
		dbOperations.insertRow(user.id, $.usernameTextfield.value, true, e.meta.session_id, user.custom_fields.credited_date_at, user.custom_fields.organizationId, 1, 'daily',user.custom_fields.last_mail_date, user.admin, role);	
				
	}
		
				
};

/*
 * Update device token in case cook changes
 */
function updateDeviceToken(){
	
	Cloud.Users.update({
		custom_fields : {
			device_token : deviceToken
		}
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			
			dbUserInfo(e);
			
			//Check if particular organization details present
            if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) 
            	 subscribeToChannel();
            else 
            	organizationData();	
			

		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			localStorage.saveErrorAtIndex('updateDeviceToken');
            showConnectionErrorView();
		}

	});
	
};

/*
 * Update last mail date
 */
function updateLastMailDate(){
	
	Cloud.Users.update({
		custom_fields : {
			last_mail_date : moment().format(),
			device_token : deviceToken
		}
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			
			dbUserInfo(e);
			
			//Check if particular organization details present
            if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) 
            	 subscribeToChannel();
            else 
            	organizationData();	
			

		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			localStorage.saveErrorAtIndex('updateLastMailDate');
            showConnectionErrorView();
		}

	});
	
};

/*
 * organization data
 */
function organizationData () {
	
    Cloud.Objects.query({
		classname : 'organization',
		limit : 1000,
		where : {
			organizationId : localStorage.getOrganizationId()
		}
		
	}, function(e) {

		if (e.success) {
			
			 dbOperations.saveOrganizationRow(e.organization);
			 subscribeToChannel();
		}
		else{
			hideImageView();
			clearInterval(loaderAnimate);
			type='organizationData';
            showConnectionErrorView();
		}
	});	
};

function login(){
	
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
				console.log('User details');
				console.log(user);
				alloy.Globals.autoLogin = true;
				
				if(dbOperations.getCount()>1)
					alloy.Globals.forceLogout();
				 
                localStorage.saveUserId(user);
                localStorage.saveUserName($.usernameTextfield.value);
                localStorage.saveDisplayName(enteredEmailValue[0]);
                localStorage.saveSessionId(e.meta.session_id);
				localStorage.saveCreditedDate(user.custom_fields.credited_date_at);
                localStorage.saveLastLoggedInUserId(user.id);
                
				Ti.API.info('test credited date:::\n' + user.custom_fields.credited_date_at);
				day = moment(user.custom_fields.credited_date_at);
				
				if(alloy.Globals.midContainerReference != null)
				Ti.App.removeEventListener("app:addViewToMidContainer", alloy.Globals.midContainerReference);
				
				if(alloy.Globals.navigatePrevious != null)
				Ti.App.removeEventListener("screen:back", alloy.Globals.navigatePrevious);
				
				if(alloy.Globals.successOnRefresh != null)
				Ti.App.removeEventListener("successOnFetch", alloy.Globals.successOnRefresh);
				
				if(alloy.Globals.toggleLeft != null)
				Ti.App.removeEventListener("menu:toggleLeftMenu", alloy.Globals.toggleLeft);
				
				/*
                  * ORGANIZATION PURPOSE
                  */ 
                if(enteredEmailValue[1] === 'ajency.in')	
                    localStorage.saveOrganizationId(1);
                else if(enteredEmailValue[1] === 'ascotwm.com')    	
                	localStorage.saveOrganizationId(2);
                
                //update purpose 4.0	
				if(!user.custom_fields.hasOwnProperty('last_mail_date')){
					console.log('last mail date called');
					 updateLastMailDate(); 
				}
				else if(user.custom_fields.device_token != deviceToken){  // case where the cook changes
					updateDeviceToken();
				} 
				else{
					dbUserInfo(e);
					
					//Check if particular organization details present
	                if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) 
	                	 subscribeToChannel();
	                else 
	                	organizationData();	
				}  
					
				
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
};

/*
 * Login button clicked
 */
function loginClicked(e) {
	//	var main = Alloy.createController('menu').getView().open();
	
	//check if fields are empty
	if ($.usernameTextfield.value.trim() != '' && $.passwordTextfield.value.trim() != '') {
		
		 enteredEmailValue=$.usernameTextfield.value.split('@');
         
		//check for valid email
		if (!checkemail($.usernameTextfield.value)) {
			alert("Please enter a valid email");
		} else {
			//check if email is ajency mail or ascot mail
			if (enteredEmailValue[1] === 'ajency.in' || enteredEmailValue[1] === 'ascotwm.com') {
				
				//check for network
				if (networkCheck.getNetworkStatus()==0) {
					alert('No Internet Connection');

				} else {
					
					
				   if(localStorage.getOrganizationId()){
						
						if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())){ 
							
						 	var organizationDetails =  dbOperations.getOrganizationRow(localStorage.getOrganizationId());
						 	
						 	//do not allow another organization user to login
							 if(organizationDetails[0].domainName === enteredEmailValue[1])
							     login();
							 else
							 	 alert('Sorry your organization is not registered');  
						}
						else
						   login();	
					}
					else{
						
						login();
					}
							
				 
				}
			} else {
                alert('Sorry your organization is not registered');
                $.loginButton.enabled = true;
			}

		}

	} else {
		alert("Username/Password are required");
		$.loginButton.enabled = true;
	}

}

//Action on keyboard done key
$.passwordTextfield.addEventListener('return', function(e) {
	loginClicked();
});

/*
 * subscribe to new channel for admin
 */
function subscribeToPendingChannel(){
	
	//fetch pending channel organization wise
	 var organizationDetails =  dbOperations.getOrganizationRow(localStorage.getOrganizationId());
		
	 var pendingChannel = organizationDetails[0].organizationPendingChannel;
	 
	Cloud.PushNotifications.subscribeToken({
		device_token : deviceToken,
		channel : pendingChannel,
		type : Ti.Platform.name == 'android' ? 'android' : 'ios'
	}, function(e) {
		if (e.success) {
			
			updateCreditDate();
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			localStorage.saveErrorAtIndex('subscribeToPendingChannel');
            showConnectionErrorView();
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

/*
 * Subscribe the device to a channel for
 * push notification
 */
function subscribeToChannel() {
	
	
	//fetch push channel organization wise
	 var organizationDetails =  dbOperations.getOrganizationRow(localStorage.getOrganizationId());
		
	 var pushChannel = organizationDetails[0].organizationPushChannel;
	
	// Subscribes the device to the 'news_alerts' channel
	// Specify the push type as either 'android' for Android or 'ios' for iOS
	Cloud.PushNotifications.subscribeToken({
		device_token : deviceToken,
		channel : pushChannel,
		type : Ti.Platform.name == 'android' ? 'android' : 'ios'
	}, function(e) {
		if (e.success) {
			//subscribe to new channel for admin
			if(dbOperations.getUserRole(localStorage.getLastLoggedInUserId()) === 'cook'){
				console.log('cook id');
				subscribeToPendingChannel();	
			}
			   
			else
			   updateCreditDate();
		
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			localStorage.saveErrorAtIndex('subscribeToChannel');
            showConnectionErrorView();
            console.log('SUBSCRIBE CHANNEL');
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}


/*
 * Update the new credit date
 * after a month is over
 */
var updateCreditDate = function() {
	
    totalSum=0;
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
				
				//whether to perform carry forward or no
				_.each(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()), function(item){
		
					totalSum += parseFloat(item.productPrice) ;
				});
				console.log("The Sum after a month");
				console.log(totalSum);
				
				dbOperations.updateCreditDate(user.id, user.custom_fields.credited_date_at);
				
				if(totalSum<0)
					updateCreditAmount();
				else
				    removeCarryForward(totalSum);
				
			//	alert('Success:\n' + 'id: ' + user.id + '\n' + 'credited date: ' + user.credited_date_at);

			} else {
				hideImageView();
				clearInterval(loaderAnimate);
				localStorage.saveErrorAtIndex('updateCreditDate');
				// type='updateCreditDate';
                showConnectionErrorView();
                console.log('UPDATE CREDIT DATE');
			
			}

		});
	}
	else{
		//if application is deleted from device load the products
		if (! localStorage.getAllProducts() && !alloy.Globals.pushNotificationReceived) {
			// fetchProductsJs.fetchCloudProducts('menu'); //for categories
			   fetchProductsJs.fetchCategories('menu');	

		} else {
			Ti.App.fireEvent('destroy:menu:instance');
			var main = Alloy.createController('menu', {}).getView().open();
			hideImageView();
			clearInterval(loaderAnimate);
		}
		
	}

};


/*
 * Remove any carry forward balance 
 */
var removeCarryForward = function (totalSum) {
	
     Cloud.Objects.create({
		classname : 'testItems',
		fields : {
			productName : 'Debit balance',
			productPrice : -totalSum,
			productId : 1010,
			userId : localStorage.getUserId()
		}
	}, function(e) {
		if (e.success) {
			console.log('Amount carry forward in index');
			var testItem = e.testItems[0];	
			dbOperations.saveTransactionRows(e.testItems);
			updateCreditAmount();
			
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			localStorage.saveErrorAtIndex('removeCarryForward');
            showConnectionErrorView();
            console.log('CARRY FORWARD AMOUNT');
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	}); 
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
			
			dbOperations.saveTransactionRows(e.testItems);
			//if application is deleted from device load the products
			if (! localStorage.getAllProducts()) {
				// fetchProductsJs.fetchCloudProducts('menu'); // for categories
				 fetchProductsJs.fetchCategories('menu');

			} else {
				var main = Alloy.createController('menu', {}).getView().open();
				hideImageView();
				clearInterval(loaderAnimate);
			}
			
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			localStorage.saveErrorAtIndex('updateCreditAmount');
            showConnectionErrorView();
            console.log('UPDATE CREDIT AMOUNT');
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};


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


//autoLogin();
function doNavigation(){
	console.log('In do navigation');
	var result = dbOperations.ifTableExists();
	var rows;
	if(result.isValidRow()) {
   
    	var totalUsers = dbOperations.getCount();
		Ti.API.info('Row count: '+totalUsers);
		switch(totalUsers){
	
			case 0: 
					
					if (OS_IOS)
						$.win1.open();

					else 
						$.index.open();
				break;
			case 1:
					if(localStorage.getLastLoggedInUserId() && !alloy.Globals.navigatedFromAllProducts){ //if user has navigated from all products/register then do not open menu
						var main = Alloy.createController('menu', {}).getView().open();
					}
					else if(!localStorage.getLastLoggedInUserId()){
						if (OS_IOS)
							$.win1.open();
	
						else 
							$.index.open();
					}
					
				break;		
	
			default:		
					var multiView = Alloy.createController('multiUser', {}).getView().open();
				break;
	 		
		}
 	}
 	
};



// console.log(db.execute('SELECT COUNT(user_id) FROM users'));
Ti.App.addEventListener('pushNotificationRegisterError',function(e){
	
	localStorage.saveErrorAtIndex('pushRegisterError');
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

//Back button navigation for android
if(!OS_IOS){
   	$.index.addEventListener('android:back', function(e){
   		
   		if(Object.keys(args).length != 0){  // when index.js navigated from multi user screen
   			
			var totalUsers = dbOperations.getCount();
   			
   			if(totalUsers === 1)
   			   $.index.close(); 
   			else if(totalUsers>1)
   			   var multiView = Alloy.createController('multiUser', {}).getView().open();
		}
		else
		   $.index.close(); 
   		
   	});
   	

	$.index.addEventListener("close", function(){
    	$.destroy();
    	$.off();
    	$.index.close();
	});
   	
   	
}
else{
	$.win1.addEventListener("close", function  () {
	  $.destroy();
      $.off();
      $.win1.close();
	});
}

