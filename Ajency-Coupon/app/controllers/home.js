var alloy = require('alloy');
var myAnimation = require('animation');
var __ = require("platformSupport");
var args = arguments[0] || {};

var type;
var loaderAnimate;
var feedsForCategories;
var rowheight;
var rowTop;
var separatorViewDistance;
var separatorHeight;

var animateObject;
var homeErrorLabel;

//for local storage
var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');
var fetchProductsJs = require('/fetchCloudProducts');

// set the length of the images you have in your sequence
var loaderArrayLength = 4;

// initialize the index to 1
var loaderIndex = 1;

// this function will be called by the setInterval
function loadingAnimation() {
	
	if(animateObject!=null)
	  animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
	//increment the index so that next time it loads the next image in the sequence
	loaderIndex++;
	// if you have reached the end of the sequence, reset it to 1
	if (loaderIndex === 5)
		loaderIndex = 1;
}

function getDeviceType(){
	
	if(Alloy.isTablet){
		rowHeight=150;
		rowTop=12.6;
		separatorViewDistance=30;
		separatorHeight=1.8;
	}   
	else{
		rowHeight=90;
		rowTop=21;
		separatorViewDistance=18;
		separatorHeight=1.08;
	}
	   	   
	 
};

getDeviceType();
/*
 * Show and hide imageview
 */

var showImageView = function() {
	
	 animateObject =Ti.UI.createImageView({
			    height : 96,
			    width : 96,
			    top: '45%'
	 });
	 
	 $.categoryView.add(animateObject);
	
	// $.animateObject.height = 96;
	// $.animateObject.width = 96;
    // $.animateObject.top= '45%';
};

var hideImageView = function(argument) {
	
	if(animateObject!=null)
		$.categoryView.remove(animateObject);
	// $.animateObject.height = 0;
	// $.animateObject.width = 0;
	// $.animateObject.top= 0;
};

var showConnectionErrorView = function () {
	 
	  	
	 homeErrorLabel=Ti.UI.createLabel({
  		height:"12%",
  		width: "30%",
    	top : "45%",
 	 	text :'Tap to Retry',
 	 	font : {
			fontFamily : "OpenSans-Regular",
			fontSize : 15
		}
     
     });
     
     $.categoryView.add(homeErrorLabel);
    // $.homeErrorLabel.height="12%";
    // $.homeErrorLabel.width="30%";
    // $.homeErrorLabel.top= "45%";
    
};

if(homeErrorLabel!=null){
	
	homeErrorLabel.addEventListener('click',function(e){
	
    	if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		else{
			
			if(type ==='fetchAllTransactions')   //Since loader function already present inside fetch transactions
				fetchAllTransactions();
			else{
				showImageView();
				loaderAnimate = setInterval(loadingAnimation, 250);
				hideConnectionErrorView();
				
				if(type ==='organizationData') 
    			   organizationData();
    				
				else if(type ==='fetchCategories') //fails on fetch products
    				fetchProductsJs.fetchCategories('home');
    			
				else if(type ==='fetchCloudProducts') //fails on fetch products
    				fetchProductsJs.fetchCloudProducts('home');
    	
    			else if(type ==='transactionsOnProductIds')
					fetchProductsJs.transactionsOnProductIds('home');
				
				else if(type ==='transactionsOnProductIdsGreaterThanThousand')
					fetchProductsJs.transactionsOnProductIdsGreaterThanThousand('home');	
			}		
			
		}
   			
    	
	});
}


var hideConnectionErrorView= function  () {
	
	if(homeErrorLabel!=null)
		$.categoryView.remove(homeErrorLabel);
    // $.homeErrorLabel.height=0;
    // $.homeErrorLabel.width=0;
    // $.homeErrorLabel.top=0;
};

var isOdd = function(no){
	
	if(no % 2)
		return true;
	else
		return false;
};


var createRow = function(){
	
	var view = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: rowHeight,
		top: rowTop
	});
	
	return(view);
};


var getGrid = function(position, data){
	
	//position - 0 = 'left'
	//position - 1 = 'right'
	
	var view = Ti.UI.createView({
		touchEnabled: true,
		layout: 'vertical',
		width: '50%',
		height: '100%',
		id: data.categoryId
	});
	
	if(position===0) view.setLeft(0);
	
	else view.setRight(0);
	
	var image = Ti.UI.createImageView({
		touchEnabled: false,
		height: '60%',
		width: '30%',
		align: 'center',
		image: data.photo.urls.small_240
	});
	
	var label = Ti.UI.createLabel({
		touchEnabled: false,
		height:'40%',
		width: '100%',
		textAlign: 'center',
		color: '#000000',
		font : {
			fontFamily: "OpenSans-Regular",
			fontSize: 20
		},
		text: data.categoryName
	});
	
	view.add(image);
	view.add(label);
	
	view.addEventListener('click', function(e){
				 
		 var evtData = {id: e.source.id};
		 alloy.Globals.navigatedView = evtData.id;
		 Ti.App.fireEvent("app:addViewToMidContainer", evtData);
		 evtData = null;
	});
	
	return(view);
};


var verticalSeparator = function(){
	
	var view = Ti.UI.createView({
		layout: 'vertical',
		backgroundColor: '#F0C60A',
		height: '100%',
		width: '0.3%',
		align: 'center'
	});
	
	return(view);
};


var horizontalSeparator = function(){
	
	var view = Ti.UI.createView({
		backgroundColor: '#F0C60A',
		height: separatorHeight, 
		width: '85%',
		top: separatorViewDistance
	});
	
	return(view);
};


var bottomView = function(){
	
	var view = Ti.UI.createView({
		height: separatorViewDistance, 
		width: '100%',
		top: '0%'
	});
	
	return(view);
};



//Initialize the categories UI according to the JSON
var initCategories = function(feeds){
	
	var outerRow, leftGrid, rightGrid = null; 
	
	for(var i=0; len=feeds.length, i<len; i++){
		
		var grid = i+1;
		
		if(isOdd(grid)){
			//When grid is odd
			outerRow = createRow();
			
			if(grid===1){
				leftGrid = getGrid(0, feeds[i]);
				outerRow.add(leftGrid);
				
				if(len===1)
					$.categoryView.add(outerRow);
					
			}
			else{
				$.categoryView.add(horizontalSeparator());
				
				leftGrid = getGrid(0, feeds[i]);
				outerRow.add(leftGrid);
				
				if(grid===len)
					$.categoryView.add(outerRow);
					
			}
		}
		
		else{
			//When grid is even
			outerRow.add(verticalSeparator());
			
			rightGrid = getGrid(1, feeds[i]);
			outerRow.add(rightGrid);
			
			$.categoryView.add(outerRow);
			
			outerRow = null;
		}
		
		leftGrid = rightGrid = null;
	}
	
	$.categoryView.add(bottomView());
};


//fetch all the transactions
var fetchAllTransactions = function(e) {
	
	showImageView();
	// start the setInverval -- adjust the time to make a smooth animation
	loaderAnimate = setInterval(loadingAnimation, 250);
	hideConnectionErrorView();
	
	Cloud.Objects.query({
		classname : 'testItems',
		limit : 1000,

		where : {
			userId : localStorage.getUserId()
		}
	}, function(e) {

		if (e.success) {
			
            hideImageView();
			clearInterval(loaderAnimate);
			
			dbOperations.saveTransactionRows(e.testItems);
			getSum(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()));
			
			// dbOperations.getDailyTransactions(localStorage.getUserId());
			
            feedsForCategories = localStorage.getAllCategories();
            initCategories(feedsForCategories);
            
			
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			type='fetchAllTransactions';
			showConnectionErrorView();
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

//Get the data with json format, this will include categoriesJson
Ti.include("/data/categoriesData.js");

var categoriesJson = categoriesJsonTuckShop;
 // var categoriesJson = alloy.Globals.categoryResponse;
 
// var feedsForCategories = eval('(' + categoriesJson + ')');

/*
 * Update last mail date
 */
function updateLastMailDate(){
	
	Cloud.Users.update({
		custom_fields : {
			last_mail_date : moment().format()
		}
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			
			dbOperations.updateLastMailDate(user.id, user.custom_fields.last_mail_date);
        	dbOperations.updateUserType(user.id, user.admin);
        	
        	fetchProductsJs.fetchCategories('home');	

		} else {
			 hideImageView();
			 clearInterval(loaderAnimate);
			 
			 var toast = Ti.UI.createNotification({
				message:"Please Login again to continue",
				duration: Ti.UI.NOTIFICATION_DURATION_LONG
			 });
			 toast.show();
			 
			 alloy.Globals.navigatedFromAllProducts = true; // so that switch on index.js is not executed when single user present
	    	 var main = Alloy.createController('index', {}).getView().open();
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
			 updateLastMailDate();
			 
		}
		else{
			hideImageView();
			clearInterval(loaderAnimate);
			type='organizationData';
			showConnectionErrorView();
		}
	});	
};

function getSum(data){
	
	var sum = 0;
	
	_.each(data, function(item){
		
		sum += parseInt(item.productPrice) ;
	});
	console.log("the Sum");
	console.log(sum);
	Ti.App.fireEvent('Calculate',{value:sum});
	
}


Ti.App.fireEvent('Display',{displayValue:localStorage.getDisplayName()});

Ti.App.addEventListener('errorOnHome', function(data) {
	
	hideImageView();
	clearInterval(loaderAnimate);
	type=data.name;
	showConnectionErrorView();
	
	
});


Ti.App.addEventListener('successOnHome',function(e){
	
	console.log('Success on home called');
	
	hideImageView();
	if(loaderAnimate!=null)
	clearInterval(loaderAnimate);
	
	$.categoryView.removeAllChildren();
	feedsForCategories = localStorage.getAllCategories();
	initCategories(feedsForCategories);
    
});

Ti.App.addEventListener('refreshCategories',function(e){
	 e.cancelBubble = true;
	$.categoryView.removeAllChildren();
	initCategories(feedsForCategories);	
});


if (!dbOperations.checkTransactionsPresentForUser(localStorage.getLastLoggedInUserId()))
	fetchAllTransactions();

else{
	getSum(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()));
	
	
	if(Titanium.App.version >= '4.0' && !localStorage.getAllCategories() && !alloy.Globals.pushNotificationReceived){ //Update purpose
		
		showImageView();
		loaderAnimate = setInterval(loadingAnimation, 250);
		hideConnectionErrorView();
		
		enteredEmailValue=localStorage.getUserName().split('@');
		
		if(enteredEmailValue[1]==='ajency.in'){
			console.log('Entered is ajency mail');
			localStorage.saveOrganizationId(1);
		}	   
        else if(enteredEmailValue[1]==='ascotwm.com')    	
        	localStorage.saveOrganizationId(2);
        
        dbOperations.setOrganizationId(localStorage.getLastLoggedInUserId(), localStorage.getOrganizationId());
        dbOperations.updateMailStatus(localStorage.getLastLoggedInUserId(), 1, 'daily');
       	
       	if (dbOperations.getSessionId(localStorage.getLastLoggedInUserId()) != null)
       		Cloud.sessionId = localStorage.getSessionId();
       		
        organizationData();
        
	}
	else if(!alloy.Globals.pushNotificationReceived){  //No push notification received
		console.log('No push received');
		feedsForCategories = localStorage.getAllCategories();
		initCategories(feedsForCategories);
	}
	else if(alloy.Globals.pushNotificationReceived){   //push notification being processed
			
			$.categoryView.removeAllChildren();
   			showImageView();
			// start the setInverval -- adjust the time to make a smooth animation
			loaderAnimate = setInterval(loadingAnimation, 250);
			hideConnectionErrorView();
       	
		
	}
	
	
}

