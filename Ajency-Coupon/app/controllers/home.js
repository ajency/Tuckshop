var alloy = require('alloy');
var myAnimation = require('animation');
var __ = require("platformSupport");
var args = arguments[0] || {};

var type;
var loaderAnimate;
 
//for local storage
var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');


pushNotificationReceived = false;
// set the length of the images you have in your sequence
var loaderArrayLength = 4;

// initialize the index to 1
var loaderIndex = 1;

// this function will be called by the setInterval
function loadingAnimation() {
	// set the image property of the imageview by constructing the path with the loaderIndex variable
	$.animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
	//increment the index so that next time it loads the next image in the sequence
	loaderIndex++;
	// if you have reached the end of the sequence, reset it to 1
	if (loaderIndex === 5)
		loaderIndex = 1;
}

/*
 * Show and hide imageview
 */

var showImageView = function() {
	$.animateObject.height = 96;
	$.animateObject.width = 96;
    $.animateObject.top= '45%';
};

var hideImageView = function(argument) {

	$.animateObject.height = 0;
	$.animateObject.width = 0;
	$.animateObject.top= 0;
};

var showConnectionErrorView = function () {
    $.homeErrorLabel.height="12%";
    $.homeErrorLabel.width="30%";
    $.homeErrorLabel.top= "45%";
    
};

$.homeErrorLabel.addEventListener('click',function(e){
    	if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		else{
			// fetchAllTransactions();	
			showImageView();
			loaderAnimate = setInterval(loadingAnimation, 250);
			if(type ==='fetchCloudProducts') //fails on fetch products
    			fetchProductsJs.fetchCloudProducts('home');
    	
    		else if(type ==='transactionsOnProductIds')
				fetchProductsJs.transactionsOnProductIds('home');
		}
   			
    	
});

var hideConnectionErrorView= function  () {
    $.homeErrorLabel.height=0;
    $.homeErrorLabel.width=0;
    $.homeErrorLabel.top=0;
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
		height: '25%',
		top: '3.5%'
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
		image: data.imagePath
	});
	
	var label = Ti.UI.createLabel({
		touchEnabled: false,
		height: '40%',
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
		height: '0.3%', 
		width: '85%',
		top: '5%'
	});
	
	return(view);
};


var bottomView = function(){
	
	var view = Ti.UI.createView({
		height: '5%', 
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
	
   var loaderAnimate;
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
			for (var i = 0, len = e.testItems.length; i < len; i++) {
				if (i == 0) {
					 localStorage.saveLatestTransaction(e.testItems[i].created_at);
				}
			}
			
            localStorage.setAllTransactions(e.testItems);
		//	Ti.App.Properties.setList('allTransactionResponse', e.testItems);
			getSum(localStorage.getAllTransactions());
			
            initCategories(feedsForCategories);
		} else {
			hideImageView();
			clearInterval(loaderAnimate);
			showConnectionErrorView();
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

//Get the data with json format, this will include categoriesJson
Ti.include("/data/categoriesData.js");

var categoriesJson = categoriesJsonTuckShop;

var feedsForCategories = eval('(' + categoriesJson + ')');

function getSum(data){
	
	var sum = 0;
	
	_.each(data, function(item){
		
		sum += item.productPrice;
	});
	
	Ti.App.fireEvent('Calculate',{value:sum});
	
}


Ti.App.fireEvent('Display',{displayValue:localStorage.getDisplayName()});

Ti.App.addEventListener('errorOnHome', function(data) {
	hideImageView();
	showConnectionErrorView();
	type = data.name;
});

Ti.App.addEventListener('successOnHome', function(data) {
	 hideImageView();
	 initCategories(feedsForCategories);
});


if (!localStorage.getAllTransactions())
	fetchAllTransactions();

else{
	getSum(localStorage.getAllTransactions());
	initCategories(feedsForCategories);
}

if (localStorage.getLastLoggedInUserId() != null){
  		console.log('User status');
  		console.log(dbOperations.getLoginStatus(db,localStorage.getLastLoggedInUserId()));
  		var loginStatus = dbOperations.getLoginStatus(db,localStorage.getLastLoggedInUserId());
  		
  		if(loginStatus){   //user online
  			
  		}
  		else{
  			
  			
  		}
        // Cloud.sessionId = localStorage.getSessionId();
        // Cloud.Users.showMe(function (e) {
                // if (e.success) {
                	// var user = e.users[0];
                    // hideImageView();
					// clearInterval(loaderAnimate);
					// day = moment(user.custom_fields.credited_date_at);
					// updateCreditDate();
                // }else{
                	// hideImageView();
					// clearInterval(loaderAnimate);
					// alert('Could not connect to server.');
					// showComponents();
					// /*
					// if(e.code==400){
					  // alert('Failed to find current User');
					  // showComponents();
					// }else{
						// type='autoLogin';
                		// showConnectionErrorView();
					// }
				    // */
                // }
//                 
         // });
}	 
