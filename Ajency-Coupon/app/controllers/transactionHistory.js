var moment = require('alloy/moment');


//Transaction History view
var outerView = innerView = leftView = rightView = imageView = transactionScroll = localAnimateObject =  null;
var separator = productNameLabel = dateLabel = priceLabel = null;

var outerErrorView = innerErrorView= null;
var errorViewLabel ,errorViewImageView ;
var loaderErrorAnimate;

var outerAnimateView = innerAnimateView= null;
var animateImageView ;
var loaderSuccessAnimate;

var connectionErrorViewPresent = false;
var connectionErrorAlreadyShown=0;
var localErrorLabel = null;
var loaderAlreadyShown=0;


//Sticky footer
var currentOffset = previousOffset = 0;
var footerHidden = false;
var currentTab = 'tab_week';

//for transactions
var allItems = null;
var deltaArray = [];
var startWeek = moment().isoWeekday(1).format('L');
var endWeek = moment().isoWeekday(7).format('L');

var startMonth = moment().startOf('month').format('L');
var endMonth = moment().endOf('month').format('L');
    
//for local storage
var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');

// set the length of the images you have in your sequence
var loaderArrayLength = 4;

// initialize the index to 1
var loaderIndex = 1;

var loaderAnimate;



//Underscore throttle function
var throttle = function(fn, delay, trail) {
	delay || ( delay = 100);
	var last = 0, timeout, args, context, offset = (trail === false) ? 0 : delay;
	return function() {
		var now = +new Date, elapsed = (now - last - offset);
		args = arguments, context = this;

		function exec() {
			timeout && ( timeout = clearTimeout(timeout));
			fn.apply(context, args);
			last = now;
		}

		if (elapsed > delay)
			exec();
		else if (!timeout && trail !== false)
			timeout = setTimeout(exec, delay);
	};
};

//Hide sticky footer
function hideFooter() {
	
	$.stickyFooter.animate({
		height : 0.1,
		duration : 200
	});
	footerHidden = true;
}

//Show sticky footer
function showFooter() {
    
	$.stickyFooter.animate({
		height : 50,
		duration : 200
	});
	footerHidden = false;
}

//Throttled scroll event
function scroll(e) {
    
	currentOffset = e.y;

	if (currentOffset >= 0) {

		if (currentOffset >= previousOffset) {
			if (!footerHidden)
				hideFooter();
		} else {
			console.log('Show');
			console.log(footerHidden);
			if (footerHidden)
				showFooter();
		}

		previousOffset = currentOffset;
	}
}

function loadingLocalAnimation() {
	// set the image property of the imageview by constructing the path with the loaderIndex variable
	if(localAnimateObject!=null)
	localAnimateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
	//increment the index so that next time it loads the next image in the sequence
	loaderIndex++;
	// if you have reached the end of the sequence, reset it to 1
	if (loaderIndex === 5)
		loaderIndex = 1;
}

function loadingErrorAnimation() {
	console.log('In Error Animate loader');
	if(errorViewImageView!=null)
	errorViewImageView.image = "/images/loader-" + loaderIndex + ".png";
  
  	loaderIndex++;
  
  	if(loaderIndex===5)loaderIndex=1;
}

function loadingSuccessAnimation() {
	console.log('In Success Animate loader');
	if(animateImageView!=null)
	animateImageView.image = "/images/loader-" + loaderIndex + ".png";
  
  	loaderIndex++;
  	
  	if(loaderIndex===5)loaderIndex=1;
}

/*
 * Show and hide imageview
 */

var showImageView = function() {
    localAnimateObject =Ti.UI.createImageView({
			    height : 96,
			    width : 96
	 });
	$.mainView.add(localAnimateObject);
	
};

var hideImageView = function(argument) {
    $.mainView.remove(localAnimateObject);
    
};


var showAnimateConnectionView = function  () {
	 
	 outerErrorView = Ti.UI.createView({
	 		layout : 'vertical',
			width : Ti.UI.FILL,
			height : 70,
			backgroundColor : 'transparent'
		});

	innerErrorView = Ti.UI.createView({
			layout : 'horizontal',
			width : Ti.UI.FILL,
			height : 69.2
		});
		
    
    errorViewLabel=Ti.UI.createLabel({
    	left: "35%",
    	top : 20,
 	 	text :'Tap to Retry',
 	 	font : {
			fontFamily : "OpenSans-Regular",
			fontSize : 15
		}
     
     });
     
    separator = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 0.8,
			backgroundColor : '#F0C60A'
	});
		  
     outerErrorView.addEventListener('click',function(e){
	
	 if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		else{
			errorViewLabel.height=0;
			innerErrorView.remove(errorViewLabel);
			errorViewImageView= Ti.UI.createImageView({
				left :'45%',
         		top : '15',
				height :40,
				width : 48
			});
			
			innerErrorView.add(errorViewImageView);
			loaderErrorAnimate = setInterval(loadingErrorAnimation,200);
			showAnimateView();
   			fetchDeltaTransaction(currentTab);			 
		}	
	});
	
	 innerErrorView.add(errorViewLabel);
     outerErrorView.add(innerErrorView);
	 outerErrorView.add(separator);
	 var interval;
	if(OS_IOS)
		interval=1000;
	else
		interval=500;
		
	 setTimeout(function(){
	 	$.mainView.add(outerErrorView); 
	 },interval);
	    
	
};


var hideAnimateConnectionView = function (){
	if(outerErrorView!=null){
		clearInterval(loaderErrorAnimate);
		$.mainView.remove(outerErrorView);	
	}
    
};

var showAnimateView = function  () {
	 
	 outerAnimateView = Ti.UI.createView({
	 		layout : 'vertical',
			width : Ti.UI.FILL,
			height : 70,
			backgroundColor : 'transparent'
		});

	innerAnimateView = Ti.UI.createView({
			layout : 'horizontal',
			width : Ti.UI.FILL,
			height : 69.2
		});
		
    
    separator = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 0.8,
			backgroundColor : '#F0C60A'
	});
	
	animateImageView= Ti.UI.createImageView({
				left :'45%',
         		top : '15',
				height :40,
				width : 48
			});
	innerAnimateView.add(animateImageView);
	loaderSuccessAnimate = setInterval(loadingSuccessAnimation,200);
						  
    outerAnimateView.add(innerAnimateView);
	outerAnimateView.add(separator);
	
	var interval;
	if(OS_IOS)
		interval=1000;
	else
		interval=500;
		
	 setTimeout(function(){
	 	$.mainView.add(outerAnimateView); 
	 },interval);
	    
	
};


var hideAnimateView = function (){
	if(outerAnimateView!=null){
		clearInterval(loaderSuccessAnimate);
		$.mainView.remove(outerAnimateView);
	}
    	
};
	
var displayTransactionHistory = function(data) {
	console.log('Size:');
	console.log(_.size(data));
	
//	transactionScroll= null;
	
	if (_.size(data)>=1 ) {      //only if records are present
		
		if(connectionErrorViewPresent){  //Connection view needs to be set 
		
			if(connectionErrorAlreadyShown !=0){  //set it since it is present the first time
				console.log('connection view not present');
				showAnimateConnectionView();
				
			}
			else
			connectionErrorAlreadyShown = 1;
	
		}
		
		else{ //Connection error view not present
			   
			//Do not show the loader the first time since it is shown in fetch delta
			if(loaderAlreadyShown!=0){
				console.log('Loader not present');
				/*
				showImageView();
    	   		loaderAnimate = setInterval(loadingLocalAnimation,200);
    	   		*/
    	   		showAnimateView();
			 }
			 else
		 	 loaderAlreadyShown=1;
		}
		
			
		
	
		transactionScroll = Ti.UI.createScrollView({

		layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.FILL, scrollType: 'vertical', disableBounce: true
	
		});
        
    	transactionScroll.addEventListener('scroll', throttle(scroll, 1000));
    	
	
   
	for (var i = 0; len = _.size(data), i < len; i++) {
		
		var day = moment(data[i].created_at);

		outerView = Ti.UI.createView({
			layout : 'vertical',
			width : Ti.UI.FILL,
			height : 70,
			backgroundColor : 'transparent'
		});

		innerView = Ti.UI.createView({
			layout : 'horizontal',
			width : Ti.UI.FILL,
			height : 69.2
		});

		//Left view
		leftView = Ti.UI.createView({
			layout : 'vertical',
			left : '10%',
			width : '70%',
			height : Ti.UI.FILL
		});

		productNameLabel = Ti.UI.createLabel({
			touchEnabled : false,
			top : '10%',
			left : 0,
			text : data[i].productName,
			color : '#3B0B0B',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});

		if (data[i].productName === 'Credit') {

			productNameLabel.setColor('#FF0000');
			productNameLabel.font = {
				fontFamily : "OpenSans-Regular",
				fontSize : 20,
				fontWeight : 'bold'
			};
		}

		dateLabel = Ti.UI.createLabel({
			touchEnabled : false,
			top : '10%',
			left : 0,
			text : day.format("L"),
			color : '#A4A4A4',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 13
			}
		});

		leftView.add(productNameLabel);
		leftView.add(dateLabel);

		//Right view
		rightView = Ti.UI.createView({
			layout : 'horizontal',
			left : 0,
			width : '20%',
			height : Ti.UI.FILL
		});

		imageView = Ti.UI.createImageView({
			image : '/images/indian_rupee.png',
			width : 15,
			height : 15,
			top : '20%',
			right : 0
		});

		priceLabel = Ti.UI.createLabel({
			touchEnabled : false,
			top : '10%',
			right : 0,
			text : data[i].productPrice,
			color : '#3B0B0B',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});

		rightView.add(imageView);
		rightView.add(priceLabel);

		innerView.add(leftView);
		innerView.add(rightView);

		outerView.add(innerView);

		separator = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 0.8,
			backgroundColor : '#F0C60A'
		});

		outerView.add(separator);

		transactionScroll.add(outerView);
        
		outerView = innerView = leftView = rightView = imageView = null;
		separator = productNameLabel = dateLabel = priceLabel = null;
	}
	
	var interval;
	if(OS_IOS)
	interval=1000;
	else
	interval=500;
	
	
	
	setTimeout(function() {
		   
		    if(localAnimateObject!=null){
		    	localAnimateObject.height = 0;
				localAnimateObject.width = 0;
				localAnimateObject.top = 0;
				$.mainView.remove(localAnimateObject);
		    }
		
		  
		
		/*
	    if (! connectionErrorViewPresent) 
        clearInterval(loaderAnimate);
        */
       
       $.mainView.add(transactionScroll);
       setTimeout(function(){
       		
       	
       },100);
       
       	setTimeout(function(){
       		if(loaderAlreadyShown!=0)
		    hideAnimateView();
       	
      	 },1000);
       
	 },interval);	
	 
    
	};
	console.log('Removing Children of main views');
	console.log($.mainView.children.length);
};

//displayTransactionHistory(json);





//Footer tabs
function clearSelectedTabs() {

	$.lbl_week.setColor('#83837C');
	$.lbl_month.setColor('#83837C');
	$.lbl_all.setColor('#83837C');
}

//Sort transactions based on week, month
var sortTransactions = function(period) {
    
    if(!dbOperations.checkTransactionsPresentForUser(localStorage.getLastLoggedInUserId()))
    alert('No records to fetch');
    
    else{
    	
  //  allItems = localStorage.getAllTransactions();
    allItems = dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId());
    
    if(transactionScroll != null ){
    	$.mainView.remove(transactionScroll);
    	$.mainView.removeAllChildren();
    	transactionScroll= null;
    } 
    	
	console.log('Removing Children of main views');
	console.log($.mainView.children.length);
     
	setTimeout(function() {

		switch(period) {

		case 'tab_week':
		    
			var weekTransaction = allItems.filter(function(item) {

				var created_at = moment(item.created_at).format('L');
				return (created_at >= startWeek && created_at <= endWeek);
			});

			var params = {
				data : weekTransaction
			};
			Ti.App.fireEvent('app:transactionStaticView', params);

			displayTransactionHistory(weekTransaction);
			currentTab = period;
			break;

		case 'tab_month':

			var monthTransaction = allItems.filter(function(item) {

				var created_at = moment(item.created_at).format('L');
				return (created_at >= startMonth && created_at <= endMonth);
			});

			var params = {
				data : monthTransaction
			};
			Ti.App.fireEvent('app:transactionStaticView', params);

			displayTransactionHistory(monthTransaction);
			currentTab = period;
			break;

		case 'tab_all':

			var params = {
				data : allItems
			};
			Ti.App.fireEvent('app:transactionStaticView', params);
			displayTransactionHistory(allItems);
			currentTab = period;
			break;
		}

	  }, 200);
    }

};

function onTabSelected(e) {

	clearSelectedTabs();

	var tabId = e.source.id;

	if (currentTab != tabId)
		sortTransactions(tabId);

	switch(tabId) {

	case 'tab_week':
		$.lbl_week.setColor('#F0C60A');
		break;

	case 'tab_month':
		$.lbl_month.setColor('#F0C60A');
		break;

	case 'tab_all':
		$.lbl_all.setColor('#F0C60A');
		break;

	default:
		console.log('Invalid selection');
	}

}

//Default tab selected (Week)
$.lbl_week.setColor('#F0C60A');

//fetch delta of transactions
var fetchDeltaTransaction = function(currentTab) {
	
	    /*
		showImageView();
		// start the setInverval -- adjust the time to make a smooth animation
   		 loaderAnimate = setInterval(loadingLocalAnimation,200);
		*/
		
		
	Cloud.Objects.query({
		classname : 'testItems',
		limit : 1000,

		where : { "$and": [ {userId : localStorage.getUserId()},
		{ created_at : {"$gt" : dbOperations.getLatestTransactionDate(localStorage.getLastLoggedInUserId()) } }
		
		]}
		
	}, function(e) {

		if (e.success) {
			
			hideAnimateConnectionView();
			
    		
           //If new items are fetched
			if (e.testItems.length > 0) {
			
                dbOperations.saveTransactionRows(e.testItems);
				//week is loaded first
		    	sortTransactions(currentTab);
				
			}
			hideAnimateView();
			/*
			hideImageView();
    		clearInterval(loaderAnimate);
    		*/
			getSum(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()));
			
			connectionErrorViewPresent = false;
		
		} else {
			hideAnimateView();
			/*
			hideImageView();
    		clearInterval(loaderAnimate);
    		*/
    		showAnimateConnectionView();
    		
    		connectionErrorViewPresent = true;
    		//week is loaded first
			sortTransactions(currentTab);
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

function getSum(data){
	
	var sum = 0;
	
	_.each(data, function(item){
		
		sum += parseInt(item.productPrice) ;
	});
	
	Ti.App.fireEvent('Calculate',{value:sum});
	
}

if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE){
	showAnimateConnectionView();
	loaderAlreadyShown=1;     //loader not displayed if connection view removed
	connectionErrorViewPresent = true;
	sortTransactions('tab_week');
} 


else{
	showAnimateView();
	sortTransactions('tab_week');
	fetchDeltaTransaction(currentTab);

}
	

