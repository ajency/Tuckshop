var alloy = require('alloy');

var data = [];
var row = label = null;

var fetchProductsJs = require('/fetchCloudProducts');
var loaderAnimate;
var networkCheck=require('/networkCheck');
var type='fetchCloudProducts';

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

function populateLeftMenu(){
	data = [];
	var labelText= null;

	var loginStatus = dbOperations.getLoginStatus(localStorage.getLastLoggedInUserId());
	console.log('login status');
	console.log(loginStatus);
	
	if (OS_IOS){
		if(loginStatus)   //user online
	 		labelText = ['Home', 'Transaction History', 'Logout'];
		else
			labelText = ['Home', 'Transaction History'];
	}
	else{
		if(loginStatus=== 'true')   //user online
	 		labelText = ['Home', 'Transaction History', 'Logout'];
		else
			labelText = ['Home', 'Transaction History'];
	}
		
	for(var i=0; len = _.size(labelText), i<len; i++){
	
		row = Ti.UI.createTableViewRow({
			id: labelText[i],
			height: 40,
			focusable: true,
			backgroundSelectedColor: 'transparent'
		});
	
		label = Ti.UI.createLabel({
			touchEnabled: false,
			left: '10%',
	    	text: labelText[i],
	    	textAlign: 'left',
	    	color: '#3B0B0B',
	    	font:{
	    	fontFamily: "OpenSans-Regular",
	    	fontSize: 15
	   	 }
		});
	    
		row.add(label);
		data.push(row);
		
		row = label = null;
	}

	$.menuTable.data = data;
}

populateLeftMenu();

if (OS_IOS)
$.menuTable.setSeparatorInsets({
	left : 0
});

//Default highlighted view [home controller]
data[0].setBackgroundColor('#F0C60A');


function clearMenuSelection(rowId){
	
	for(i=0; len=_.size(data), i<len; i++){
		
		if(data[i].id != rowId)
			data[i].setBackgroundColor('transparent');
	}
}


function onMenuTableClick(e){
	
	rowId = e.source.id;
	
	alloy.Globals.navigatedView = rowId;
	
	var evtData = {id: rowId};
	
	clearMenuSelection(rowId);
	
	//Highlight selected row
	e.source.backgroundColor = '#F0C60A';
	
	
	
	switch(rowId) {
	    case 'Home':
	        Ti.App.fireEvent('menu:toggleLeftMenu');
	    	Ti.App.fireEvent("app:addViewToMidContainer", evtData);
			evtData = null;
	        break;
	        
	    case 'Transaction History':
	        Ti.App.fireEvent('menu:toggleLeftMenu');
			Ti.App.fireEvent("app:addViewToMidContainer", evtData);
			evtData = null;
	        break;
	    
	    case 'Logout':
	         userLogout();
	        break;
	        
	    default :
	    	console.log('Invalid row');
	    
	}
}

Ti.App.addEventListener('errorOnFetch', function(data) {
	hideImageView();
    if(loaderAnimate!=null)
	clearInterval(loaderAnimate);
	$.menuTable.visible=true;
	$.leftMenuRefreshLabel.visible=true;
	$.leftMenuRefreshLabel.text="Error. Try Again";
	type=data.name;
});

Ti.App.addEventListener('successOnFetch', function(data) {
	console.log('Success on fetch');
	hideImageView();
	if(loaderAnimate!=null)
	clearInterval(loaderAnimate);
	$.menuTable.visible=true;
	$.leftMenuRefreshLabel.visible=true;
	$.leftMenuRefreshLabel.text="Refresh";
	
});

function refreshClick(){
	if (networkCheck.getNetworkStatus()==0) 
		alert('No Internet Connection');
	else{
		showImageView();
		// start the setInverval -- adjust the time to make a smooth animation
    	loaderAnimate = setInterval(loadingAnimation,200);
    	$.menuTable.visible=false;
    	$.leftMenuRefreshLabel.visible=false;
    	
    	if(type==='fetchCloudProducts') //fails on fetch products
    		fetchProductsJs.fetchCloudProducts('leftMenu');
    	
    	else if(type==='transactionsOnProductIds')
			fetchProductsJs.transactionsOnProductIds('leftMenu');
	}	
};

function userLogout(){
	
	if (networkCheck.getNetworkStatus()==0) 
		alert('No Internet Connection');
	else{
		
		showImageView();
		// start the setInverval -- adjust the time to make a smooth animation
    	loaderAnimate = setInterval(loadingAnimation,200);
    	$.menuTable.visible=false;
        $.leftMenuRefreshLabel.visible=false;
        
		Cloud.Users.logout(function (e) {
    		if (e.success) {
    	
    		hideImageView();
			clearInterval(loaderAnimate);
			Ti.App.Properties.removeProperty('sessionID');
			
			$.menuTable.visible=true;
			$.leftMenuRefreshLabel.visible=true;
			
			dbOperations.updateSessionId(localStorage.getLastLoggedInUserId());
			dbOperations.offlineLoginStatus(localStorage.getLastLoggedInUserId());
			
			alloy.Globals.autoLogin = false;
			
			var totalUsers = dbOperations.getCount();
			
			if(totalUsers>1){
				clearTimeout(alloy.Globals.logoutInterval);
				var multiView = Alloy.createController('multiUser', {}).getView().open();
			}
				
			else{
				Ti.App.fireEvent('menu:toggleLeftMenu');
				populateLeftMenu();
			}
			
   		 } else {
   		 	   hideImageView();
			   clearInterval(loaderAnimate);
			   $.menuTable.visible=true;
			   $.leftMenuRefreshLabel.visible=true;
			   
			   alert('Could not connect to server. Try again ');
       		// alert('Error:\n' +((e.error && e.message) || JSON.stringify(e)));
   		 }
 		});
	}	
	
};

Ti.App.addEventListener('Calculate',function(data){
	
	$.lbl_availableCredit.text=data.value;
});

Ti.App.addEventListener('Display',function(data){
	
	$.lbl_username.text='Hello'+' '+ data.displayValue;
});