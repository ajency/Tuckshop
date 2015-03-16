var alloy = require('alloy');
var args = arguments[0] || {};
//{"categoryId":"111"}

var errorPresent = false;
var toBeServed = false;

var tableData = empty = tempTableData = [];
var filteredProductArray =[];
var allProductIdsArray =[];

var day;
var totalSum;

var loaderTableAnimate;
var loaderAnimate;
var loaderImage;

//for local storage
var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');
var moment = require('alloy/moment');

// set the length of the images you have in your sequence
var loaderArrayLength=4;
 
// initialize the index to 1
var loaderIndex=1;
 
// this function will be called by the setInterval
function loadingTableAnimation(){
 
  loaderImage.image = "/images/loader-" + loaderIndex + ".png";
  
  loaderIndex++;
  
  if(loaderIndex===5)loaderIndex=1;
}


function loadingAnimation() {
	
	$.animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
	
	loaderIndex++;
	
	if (loaderIndex === 5)
		loaderIndex = 1;
}

var showImageView = function() {
	
	$.animateObject.height = 96;
	$.animateObject.width = 96;
	$.animateObject.top= '45%';	
};

var hideImageView = function() {
	
	$.animateObject.height = 0;
	$.animateObject.width = 0;
	$.animateObject.top= 0;
	
};


var allProducts = _.filter(localStorage.getAllProducts(), function(product) {
	
	return product.categoryId == args.categoryId;
});


var populateProducts = function(jsonData) {
	
    
	console.log('Length of table');
	console.log(_.size($.productsTable.data));
	
	
	var row = view = imageView = productNameLabel = priceLabel = null;
   
	for (var i = 0; len = _.size(jsonData), i < len; i++) {
		
		row = Ti.UI.createTableViewRow({
			id: jsonData[i].productId,
			name: jsonData[i].productName,
			height : 70,
			backgroundSelectedColor : 'transparent',
		    backgroundColor : 'white'
		});

		productNameLabel = Ti.UI.createLabel({
			touchEnabled : false,
			left : '10%',
			textAlign : 'left',
			text : jsonData[i].productName,
			color : '#3B0B0B',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});

		view = Ti.UI.createView({
			layout : 'horizontal',
			right : 0,
			height : Ti.UI.SIZE,
			width : '20%',
			align : 'center'
		});

		imageView = Ti.UI.createImageView({
			image : localStorage.getCurrencyUrl(),
			width : 15,
			height : 15,
			top : 10,
			right : 0
		});

		priceLabel = Ti.UI.createLabel({
			touchEnabled : false,
			top : '10%',
			right : 0,
			text : jsonData[i].productPrice,
			color : '#3B0B0B',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});

		view.add(imageView);
		view.add(priceLabel);

		row.add(productNameLabel);
		row.add(view);
		
		
		tableData.push(row);

		row = view = imageView = productNameLabel = priceLabel = null;
	}
	 
     
	 $.productsTable.data = tableData;
	 
	 
	 
	 
};

populateProducts(allProducts);

if (OS_IOS)
$.productsTable.setSeparatorInsets({
	left : 0
});


function clearTableData() {
    	$.productsTable.data = empty;
		$.productsTable.data = tableData;
	
}

/*
 * retrieve the id if not fetched for the user cook
 */
function retrieveCookId(eSwipe){
	
	if(localStorage.getCookToken()){
		
		pendingPushNotification(eSwipe);
	}
	else{

		Cloud.Users.query({
		    limit: 1000,
		   
		    where: { "$and": [ { role : 'cook' },
				   { organizationId : localStorage.getOrganizationId()  }]
		    }
			
		}, function (e) {
		    if (e.success) {
		    	
		    	var user = e.users[0];
		    	console.log('Cook details');
		    	console.log(user);
		    	
		    	localStorage.saveCookToken(user.custom_fields.device_token);
		    	pendingPushNotification(eSwipe);
		    } else {
		    	$.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'retrieveCookId')); 
		    }
		});
	}
}

/*
 * Sening push notification for pending items
 */
function pendingPushNotification(eSwipe){
		
	var organizationDetails =  dbOperations.getOrganizationRow(localStorage.getOrganizationId());
	
 	var pendingChannel = organizationDetails[0].organizationPendingChannel;
 	
 	enteredEmailValue = dbOperations.getUserName(localStorage.getLastLoggedInUserId()).split('@');
 	
 	Cloud.PushNotifications.notifyTokens({
	    channel: pendingChannel,
	    to_tokens: localStorage.getCookToken(),
	    payload: { "alert": enteredEmailValue[0] +' ordered ' + eSwipe.rowData.name, "message": { "name":  enteredEmailValue[0] +' ordered ' + eSwipe.rowData.name, "date": moment().format("L")}  , "custom_property": "order"} 
	    
	}, function (e) {
	    if (e.success) {
	       	clearInterval(loaderTableAnimate);
			$.productsTable.updateRow(eSwipe.index, getPurchaseRow(eSwipe));
	    } else {
	       $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'pendingPushNotification'));
	    }
	});

};

/*
 * sending of mails
 */
function sendEmail(eSwipe){
	
	 //send the start date and end date to fetch the records
	  var data = dbOperations.getDailyTransactions(localStorage.getLastLoggedInUserId(), dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId()), moment.utc().format());
	  console.log(data);
		
		var productNameArray=[];
		var productpriceArray = [];
		var productTimeArray = [];
    		
		for(i=0;i<data.length;i++){
			productNameArray.unshift(data[i].productName);
			productpriceArray.unshift(data[i].productPrice);
			productTimeArray.unshift(moment(data[i].updated_at).format('L'));
		}
		
		var myTable= "<table><tr><td style='width: 100px; text-align: center;'>Product Name</td>";
    		myTable+= "<td style='width: 100px; text-align: center;'>Product Price</td>";
    		myTable+="<td style='width: 100px; text-align: center;'>Date</td></tr>";
    	
		for(i=0; i<data.length; i++){
			myTable+="<tr><td style='width: 100px; text-align: center;'>" + productNameArray[i] + "</td>";
    		myTable+="<td style='width: 100px; text-align: center;'>" +productpriceArray[i] + "</td>";
    		myTable+="<td style='width: 100px; text-align: center;'>" + productTimeArray[i] + "</td></tr>";
		};
		
		 myTable+="</table>";
		   
		Cloud.Emails.send({
		    template: 'Daily Purchase',
		    // recipients: 'deepak@ajency.in',
		    recipients: dbOperations.getUserName(localStorage.getLastLoggedInUserId()),
		    displayName:  localStorage.getDisplayName(),
		    structure: myTable
		    
		}, function (e) {
		    if (e.success) {
		        
		        dbOperations.updateLastMailDate(localStorage.getLastLoggedInUserId(), moment().format());
		        
		        if(toBeServed){     //send a pending push notification
					console.log('Cheese sandwich bought');
					retrieveCookId(eSwipe);
				}
				else{
					clearInterval(loaderTableAnimate);
					$.productsTable.updateRow(eSwipe.index, getPurchaseRow(eSwipe));
				}
		        
				
		    } else {
		        // alert('Error:\n' +((e.error && e.message) || JSON.stringify(e)));
		        $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'sendEmail'));   
		    }
		});	
};

/*
 * Update last mail date
 */
function updateLastMailDate(eSwipe){
	
	Cloud.Users.update({
		custom_fields : {
			last_mail_date : moment().format()
		}
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			
			sendEmail(eSwipe);

		} else {
			$.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'updateLastMailDate')); 
		}

	});
	
};

//send mail depending on date which it was last sent
function checkMailDate(eSwipe){
	
	var ms= moment().diff(dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId()));
	
	var d = moment.duration(ms).asHours();
	console.log('minutes');
	console.log(d);
	
	var mailStatus = dbOperations.getMailStatus(localStorage.getLastLoggedInUserId());
	
	if(moment.duration(ms).asHours() >24 && mailStatus.mails === 1){   //send an email
		console.log('Send mails');
	  	updateLastMailDate(eSwipe);	
	  
	}
	else{   //do not send an email
		
		if(toBeServed){     //send a pending push notification
			console.log('Cheese sandwich bought');
			retrieveCookId(eSwipe);
		}
		else{
			clearInterval(loaderTableAnimate);
			$.productsTable.updateRow(eSwipe.index, getPurchaseRow(eSwipe));
		}
		
	}
	
};

 
//fetch delta of transactions
var fetchDeltaTransaction = function(eSwipe) {
	
	
	Cloud.Objects.query({
		classname : 'testItems',
		limit : 1000,

		where : { "$and": [ {userId : localStorage.getLastLoggedInUserId() },
		{ updated_at : {"$gt" : dbOperations.getLatestTransactionDate(localStorage.getLastLoggedInUserId()) } }
		
		]}
		
	}, function(e) {

		if (e.success) {
			
           //If new items are fetched
			if (e.testItems.length > 0) {
				
				dbOperations.saveTransactionRows(e.testItems);
			}
			
			checkMailDate(eSwipe);
			// clearInterval(loaderTableAnimate);
			// $.productsTable.updateRow(eSwipe.index, getPurchaseRow(eSwipe));
			
			getSum(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()));
			
		} else {
			$.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'fetchDelta'));
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

function getSum(data){
	
	var sum = 0;
	
	_.each(data, function(item){
		
		sum += parseFloat(item.productPrice) ;
	});
	
	sum = sum.toFixed(2);
	Ti.App.fireEvent('Calculate',{value:sum});
	
}

//make entry to the transaction list
var makeTransactionEntry = function(productid,eSwipe) {
	
	var selectedProduct = _.filter(allProducts, function(product) {
	
		return product.productId === productid;
	});
	
	if(selectedProduct[0].served === 'yes')
		toBeServed = true;
	else
		toBeServed = false;
			
	Cloud.Objects.create({
		classname : 'testItems',
		fields : {
			productName : selectedProduct[0].productName ,
			productPrice : -selectedProduct[0].productPrice ,
			productId : selectedProduct[0].productId ,
			userId : localStorage.getUserId() ,
			quantity : -1
		}
	}, function(e) {
		if (e.success) {
			errorPresent = false ;
			var testItem = e.testItems[0];
			fetchDeltaTransaction(eSwipe);
		    
		} else {
			$.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'makeEntry'));
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

/*
 * Update the new credit date
 * after a month is over
 */
var updateCreditDate = function(productid,eSwipe) {
	
	totalSum = 0;
	createdDateValue = day.add('months', 1);

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
				console.log('In all products');
				console.log(user);
				console.log(user.credited_date_at);
				dbOperations.updateCreditDate(user.id, user.custom_fields.credited_date_at);
				if(totalSum<0)
					updateCreditAmount(productid,eSwipe);
				else
				    removeCarryForward(totalSum, productid, eSwipe);
				

			} else {
				$.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'updateCreditDate'));
			}

		});
	}
	else{
		makeTransactionEntry(productid,eSwipe);
	}

};

/*
 * Remove any carry forward balance 
 */
var removeCarryForward = function (totalSum, productid,eSwipe) {
	
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
			
			updateCreditAmount(productid,eSwipe);
			
		} else {
			$.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'removeCarryForward'));
		}
	}); 
};

/*
 * make entry of credited amount in transaction
 */
var updateCreditAmount = function(productid,eSwipe) {

    
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
			
			makeTransactionEntry(productid,eSwipe);
			
		} else {
			$.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe,'updateCreditAmount'));
		}
	});
};

var checkIfLoggedIn = function  (productid,eSwipe) {

  if (dbOperations.getSessionId(localStorage.getLastLoggedInUserId()) != null){
  		$.productsTable.updateRow(eSwipe.index, getLoaderRow(eSwipe));
  		
        Cloud.sessionId = localStorage.getSessionId();
        Cloud.Users.showMe(function (e) {
        	
                if (e.success) {
                	var user = e.users[0];
                    console.log('Logged in');
					day = moment(user.custom_fields.credited_date_at);
					updateCreditDate(productid,eSwipe);
                	
                }else{
                	var toast = Ti.UI.createNotification({
    					message:"Auto Login failed. Please Login again",
    					duration: Ti.UI.NOTIFICATION_DURATION_LONG
					});
					toast.show();
                	var main = Alloy.createController('index', {}).getView().open();
					
                }
                
         });
   }
   else
 		var main = Alloy.createController('index', {}).getView().open();	      
};

function buyActionPerformed(productid,eSwipe){
	
	var totalUsers = dbOperations.getCount();
	Ti.API.info('Row count: '+totalUsers);
	
			var loginStatus = dbOperations.getLoginStatus(localStorage.getLastLoggedInUserId());
			
			if(!OS_IOS){
				if(loginStatus=== 'true')
		   			loginStatus = 1;
				else
		   			loginStatus = 0;   
			}
			
			if(loginStatus) {   //user is online
				
				if(!alloy.Globals.autoLogin ){   // app is closed
					checkIfLoggedIn(productid,eSwipe);
				}
				else{
					console.log('App not closed');
					day = moment(dbOperations.getLastCreditDate(localStorage.getLastLoggedInUserId()));
					console.log('day');
					console.log(day);
					updateCreditDate(productid,eSwipe);
					
				 	$.productsTable.updateRow(eSwipe.index, getLoaderRow(eSwipe));
				}
			}
			else{
				
			    if(totalUsers ===1){
			    	alloy.Globals.navigatedFromAllProducts = true; // so that switch on index.js is not executed when single user present
			    	 var main = Alloy.createController('index', {}).getView().open();
			    }	
			     
			      
			    else if(totalUsers>1)
			      var multiView = Alloy.createController('multiUser', {}).getView().open();
			     
			}
				
	
};


function getErrorRow(eSwipe,type){
	
	errorPresent = true;
	
	var row = Ti.UI.createTableViewRow({
		id : 'swipeRow',
		height : 70,
		focusable : true,
		backgroundSelectedColor : 'white'
	 });
	 
	 var view = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : '#F0C60A'
	}); 
	
	
	// Create a Label.
	var aLabel = Ti.UI.createLabel({
		text : 'Tap to Retry',
		font : {
			fontFamily: "OpenSans-Regular",
			fontSize: 15,
			fontWeight :'bold'
		},
		top : 20,
		left : '40%',
		textAlign : 'center'
	});
	
	
	// Listen for click events.
	row.addEventListener('click', function() {
		
		if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		else{
		//	buyProduct(eSwipe.rowData.id,eSwipe);
		
		    if(type === 'fetchDelta')
		    	fetchDeltaTransaction(eSwipe);
		    else if(type === 'makeEntry')
		    	makeTransactionEntry(eSwipe.rowData.id,eSwipe);
		    else if(type === 'updateCreditDate')
		    	updateCreditDate(eSwipe.rowData.id,eSwipe);
		    else if(type === 'updateCreditAmount')
		    	updateCreditAmount(eSwipe.rowData.id,eSwipe);
		    else if(type === 'removeCarryForward')
		    	removeCarryForward(totalSum, eSwipe.rowData.id,eSwipe);
		    
		    else if(type === 'updateLastMailDate')
		    	updateLastMailDate(eSwipe);
		    else if(type === 'sendEmail')
		    	sendEmail(eSwipe);		
		    else if(type === 'pendingPushNotification')   //in case cheese sandwich is ordered
		    	pendingPushNotification(eSwipe);	
		    	
		    else if(type === 'retrieveCookId')
		    	retrieveCookId(eSwipe);		
		    	
		    $.productsTable.updateRow(eSwipe.index, getLoaderRow(eSwipe));
		}	
		
	});
	
	// Add to the parent view.
	view.add(aLabel);
	row.add(view);
	return row;
};

function getLoaderRow(eSwipe){
      
      var row = Ti.UI.createTableViewRow({
		id : 'swipeRow',
		height : 70,
		focusable : true,
		backgroundSelectedColor : 'transparent'
	 });

	var view = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : '#F0C60A'
	}); 
	
	 loaderImage = Ti.UI.createImageView({
	 	 left :'45%',
         top : '15',
		 height : 40,
		 width : 48,
     }); 	
     
    view.add(loaderImage);
    // start the setInverval -- adjust the time to make a smooth animation
     loaderTableAnimate = setInterval(loadingTableAnimation,200);
	row.add(view);
    
	return row;
}

function getPurchaseRow(eSwipe){
	
	var row = Ti.UI.createTableViewRow({
		id : 'swipeRow',
		height : 70,
		focusable : true,
		backgroundSelectedColor : 'transparent'
	});

	var view = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : '#3B0B0B'
	});

	var purchaseView = Ti.UI.createView({
		left : '10%',
		layout : 'horizontal',
		height : Ti.UI.SIZE,
		width : '55%'
	});

	var purchaseLabel = Ti.UI.createLabel({
		left : 0,
		text : 'Purchase Successful',
		color : '#F0C60A',
		font : {
			fontFamily : "OpenSans-Regular",
			fontSize : 20
		}
	});

	purchaseView.add(purchaseLabel);
	
	var cancelView = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.SIZE,
		width : '35%'
	});

	var verticalSeparator = Ti.UI.createView({
		left : 0,
		top : '12.5%',
		bottom : '12.5%',
		height : '75%',
		width : '1%',
		backgroundColor : '#F0C60A'
	});

	var cancelArrow = Ti.UI.createImageView({
		left : '10%',
		height : 30,
		width : 30,
		image : '/images/icon_tick.png'
	});

	var cancelLabel = Ti.UI.createLabel({
		left : '2%',
		text : 'OK',
		color : '#F0C60A',
		font : {
			fontFamily : "OpenSans-Regular",
			fontSize : 20
		}
	});

	cancelView.add(verticalSeparator);
	cancelView.add(cancelArrow);
	cancelView.add(cancelLabel);
	
	function cancelClicked (e) {
		
	  e.cancelBubble = true;
	  clearTableData();
	  cancelView.removeEventListener('click', cancelClicked);
	}
	cancelView.addEventListener('click', cancelClicked);

	view.add(purchaseView);
	view.add(cancelView);

	row.add(view);
	
	return row;
}

function getSwipeRow(eSwipe) {

	var row = Ti.UI.createTableViewRow({
		id : 'swipeRow',
		height : 70,
		focusable : true,
		backgroundSelectedColor : 'transparent'
	});

	var view = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		backgroundColor : '#F0C60A'
	});

	var buyView = Ti.UI.createView({
		left : '10%',
		layout : 'horizontal',
		height : Ti.UI.SIZE,
		width : '55%'
	});

	var buyLabel = Ti.UI.createLabel({
		left : 0,
		text : 'BUY',
		color : '#444444',
		font : {
			fontFamily : "OpenSans-Regular",
			fontSize : 20,
			fontWeight : 'bold'
		}
	});

	var buyImage = Ti.UI.createImageView({
		left : '2%',
		height : 40,
		width : 40,
		image : '/images/icon_buy.png'
	});

	buyView.add(buyLabel);
	buyView.add(buyImage);

	var cancelView = Ti.UI.createView({
		layout : 'horizontal',
		height : Ti.UI.SIZE,
		width : '35%'
	});

	var verticalSeparator = Ti.UI.createView({
		left : 0,
		top : '12.5%',
		bottom : '12.5%',
		height : '75%',
		width : '1%',
		backgroundColor : '#444444'
	});

	var cancelArrow = Ti.UI.createImageView({
		left : '10%',
		height : 30,
		width : 30,
		image : '/images/icon_cancel.png'
	});

	var cancelLabel = Ti.UI.createLabel({
		left : '2%',
		text : 'Cancel',
		color : '#444444',
		font : {
			fontFamily : "OpenSans-Regular",
			fontSize : 15
		}
	});

	cancelView.add(verticalSeparator);
	cancelView.add(cancelArrow);
	cancelView.add(cancelLabel);
	
	function buyClicked(e){
		
		e.cancelBubble = true;
		
		console.log(eSwipe.rowData.id);
		//check for network when buying an item
		if (networkCheck.getNetworkStatus()==0)  alert('No Internet Connection');
		else {
			buyActionPerformed(eSwipe.rowData.id,eSwipe);
			cancelView.removeEventListener('click', cancelClicked);
			buyView.removeEventListener('click', buyClicked);
		}
	 	
	
	}

	buyView.addEventListener('click', buyClicked);

	function cancelClicked(e){
		
		e.cancelBubble = true;
		clearTableData();
		buyView.removeEventListener('click', buyClicked);
		cancelView.removeEventListener('click', cancelClicked);
	}
	cancelView.addEventListener('click', cancelClicked);

	view.add(buyView);
	view.add(cancelView);

	row.add(view);

	return row;
}


/*
$.productsTable.addEventListener('swipe', function(e) {

	var swipeDirection = e.direction;
	
    if (e.rowData)
    	
    	switch(swipeDirection) {
			case 'left':
				console.log(JSON.stringify(e));
				if (e.rowData.id != 'swipeRow') {
					clearTableData();
					$.productsTable.updateRow(e.index, getSwipeRow(e));
				}
		
			default:
				console.log('Swiped: ' + swipeDirection);
		}
    
		
});
*/
$.productsTable.addEventListener('click', function(e) {
	
    if (e.rowData)
    	
	 if (e.rowData.id != 'swipeRow') {
        
	// 	if(!errorPresent){  //refresh view only if error is not present	
	 		clearTableData();
			$.productsTable.updateRow(e.index, getSwipeRow(e));
	 //	}
		
	
	}
		
});

