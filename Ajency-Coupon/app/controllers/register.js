var args = arguments[0] || {};

var __ = require('platformSupport');
var myAnimation = require('animation');

var enteredEmailValue;
var firstRequest=true; // in case the user is created but not credited
var type;

var moment = require('alloy/moment');
//for image loader
var loaderAnimate;

// close the current register window
var closeWindow = function() {
	var index = Alloy.createController('index', {}).getView();
	index.open();
	//	myAnimation.out($.register);
};

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
   
    $.passwordTextfield.visible=true;
	$.usernameTextfield.visible=true;
	$.signUpButton.visible=true;
	if(OS_IOS)  $.backIcon.visible = true;
};

var hideComponents = function  () {
  
    $.passwordTextfield.visible = false;
	$.usernameTextfield.visible = false;
	$.signUpButton.visible = false;
	if(OS_IOS)  $.backIcon.visible = false;
};

var showConnectionErrorView = function () {
    $.registerErrorLabel.height="15%";
    $.registerErrorLabel.width="30%";
    	
};

$.registerErrorLabel.addEventListener('click',function(e){
	
		if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		
		else{
			showImageView();
   			// start the setInverval -- adjust the time to make a smooth animation
    		loaderAnimate = setInterval(loadingAnimation,200);
    		hideConnectionErrorView(); 
    		
			if(type==='autoLogin')
	    		autoLogin();
	    	else if(type==='organizationData')
	    		organizationData();	
	    	else if(type==='updateCreditAmount')
	    		updateCreditAmount();
	    	else if(type==='subscribeToChannel')
	    		subscribeToChannel();
	    	
	    	else if(type==='fetchCategories'){
	    		
	    			 fetchProductsJs.fetchCategories('index');
	    		 }
	    		 
	    	else if(type==='fetchCloudProducts'){
	    			 
					fetchProductsJs.fetchCloudProducts('index');
	    		 }
	    		 
	    	else if(type==='transactionsOnProductIds'){
	    			 
					fetchProductsJs.transactionsOnProductIds('index');
	    		}	
    				
		}	
});

var hideConnectionErrorView = function  () {
    $.registerErrorLabel.height=0;
    $.registerErrorLabel.width=0;
};

Ti.App.addEventListener('errorOnRegister', function(data) {
	console.log('Error event fired register');
	hideImageView();
	clearInterval(loaderAnimate);
	type=data.name;
	showConnectionErrorView();
	
});

function registration(){
	
	   $.usernameTextfield.blur();
	   $.passwordTextfield.blur();
	   showImageView();
	   // start the setInverval -- adjust the time to make a smooth animation
	   loaderAnimate = setInterval(loadingAnimation,200);
	   hideComponents();
	   
	    /*
	      * ORGANIZATION PURPOSE
	      */ 
	    if(enteredEmailValue[1] === 'ajency.in')
	    	localStorage.saveOrganizationId(1);
	    	
	    else if(enteredEmailValue[1] === 'ascotwm.com')
	    	localStorage.saveOrganizationId(2);
	            		
		Cloud.Users.create({
			username : $.usernameTextfield.value,
			password : $.passwordTextfield.value,
			password_confirmation : $.passwordTextfield.value,
			custom_fields : {
				credited_date_at : moment().format(),
				organizationId : localStorage.getOrganizationId()
			}
		}, function(e) {
			
		//	firstRequest = false ;
			if (e.success) {
				
				var user = e.users[0];
				
				dbOperations.insertRow(user.id, $.usernameTextfield.value, false, e.meta.session_id, user.custom_fields.credited_date_at, user.custom_fields.organizationId, 1, 'daily', moment().format(), user.admin);
				
				localStorage.saveUserId(user);
	            localStorage.saveUserName($.usernameTextfield.value);
	            localStorage.saveDisplayName(enteredEmailValue[0]);
	            	
	            
	            //Check if particular organization details present
	            if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) 
	            	 updateCreditAmount();
	            else 
	            	organizationData();	
				// updateCreditAmount();
	
			} else {
				
				hideImageView();
				showComponents();
				clearInterval(loaderAnimate);
				
				if(e.code==400){
					
					alert('Username is already taken');
				}
				else{
					
					alert('Could not connect to server. Try again ');
				}
			//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
};

/*
 * Register the user
 */
function registerClicked(e) {
	
	
	//check if fields are empty
	if ($.usernameTextfield.value.trim() != '' && $.passwordTextfield.value.trim() != '') {

	//	domain = $.usernameTextfield.value.replace(/.*@/, "");
        enteredEmailValue=$.usernameTextfield.value.split('@');
        
		//check for valid email
		if (!checkemail($.usernameTextfield.value)) {
			alert("Please enter a valid email");
		} else {
			
			
			//check if email is ajency mail or ascotwm mail
			if (enteredEmailValue[1] === 'ajency.in' || enteredEmailValue[1] === 'ascotwm.com') {

				//check for network
				if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
					alert('No Internet Connection');

				} else {
					
					//do not allow another organization user to register
					if(localStorage.getOrganizationId()){
		
						if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())){ 
							
						 	var organizationDetails =  dbOperations.getOrganizationRow(localStorage.getOrganizationId());
							 if(organizationDetails[0].domainName === enteredEmailValue[1])
							     registration();
							 else
							 	 alert('Sorry your organization is not registered');   
							 
						}
					}
					else{
						registration();
					}
				   	
					
				}
			} else {
				alert('Sorry your organization is not registered');
			}

		}
	} else {
		alert("All fields are required");

	}

}


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
			 updateCreditAmount();
		}
		else{
			hideImageView();
			clearInterval(loaderAnimate);
			type='organizationData';
            showConnectionErrorView();
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
			var testItem = e.testItems[0];
			
			
			//if application is deleted from device load the products
			if (! localStorage.getAllProducts()) {
				subscribeToChannel();
				
			} else {
				var index = Alloy.createController('index', {}).getView();
				index.open();
				
			}

		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			type='updateCreditAmount';
            showConnectionErrorView();
            console.log('REGSITER USER');
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};


/*
 * Subscribe the device to a channel for
 * push notification
 */
function subscribeToChannel() {
	
	//fetch push channel: organization wise
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
			var fetchProductsJs = require('/fetchCloudProducts');
			// fetchProductsJs.fetchCloudProducts('index');  //for categories
			fetchProductsJs.fetchCategories('index');
			
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
	//	var emails = str.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);

	if (filter.test(str)) {
		testresults = true;
	} else {
		testresults = false;
	}
	return (testresults);
};
// $.register.open();
if(!OS_IOS){
	
$.registerWindow.addEventListener("close", function(){
    	$.destroy();
    	$.off();
	});
}	