var alloy = require('alloy');
var args = arguments[0] || {};

var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');

var tableData = empty = [];

var loaderArrayLength = 4;
var loaderIndex = 1;

function loadingAnimation() {
	
	if($.animateObject!=null)
	  $.animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
	
	loaderIndex++;
	
	if (loaderIndex === 5)
		loaderIndex = 1;
}

var showImageView = function(){
	
	$.animateObject.height=96;
	$.animateObject.width=96;
	
};

var hideImageView= function () {
	
    $.animateObject.height=0;
	$.animateObject.width=0;
};

var showConnectionErrorView = function () {
	
    $.itemErrorLabel.height="15%";
    $.itemErrorLabel.width="30%";
    	
};

var hideConnectionErrorView = function  () {
	
    $.itemErrorLabel.height=0;
    $.itemErrorLabel.width=0;
};

$.itemErrorLabel.addEventListener('click',function(e){
		
		if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		else
			populateItems(localStorage.getPendingItems());
});

function clearTableData() {
    	$.itemsTable.data = empty;
		$.itemsTable.data = tableData;
	
}

var populateItems = function(jsonData) {
	
	console.log('table data');
	console.log(jsonData);
	
	var row = view = imageView = productNameLabel = dateLabel =  null;
   
	for (var i = 0; len = _.size(jsonData), i < len; i++) {
		console.log('Table data');
		console.log(jsonData[i].name);
		
		
		
		row = Ti.UI.createTableViewRow({
			id: i,
			height : 70,
			backgroundSelectedColor : 'transparent',
		    backgroundColor : 'white'
		});
		
		view = Ti.UI.createView({
	 		layout : 'vertical',
			width : Ti.UI.FILL,
			height : 70,
			backgroundColor : 'transparent'
		});
		
		productNameLabel = Ti.UI.createLabel({
			touchEnabled : false,
			left : '20%',
			textAlign : 'left',
			text : jsonData[i].name,
			color : '#3B0B0B',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});

		dateLabel = Ti.UI.createLabel({
			touchEnabled : false,
			top : '10%',
			left : '20%',
			textAlign : 'center',
			text : jsonData[i].date,
			color : '#A4A4A4',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 13
			}
		});

		view.add(productNameLabel);
		view.add(dateLabel);
		
		row.add(view);
		
		tableData.push(row);

		row =  productNameLabel =  null;
	}
	 
     
	 $.itemsTable.data = tableData;
	 
	 
};

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
		text : 'DONE',
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
		
		if (!OS_IOS){
			Ti.App.Properties.removeProperty('pendingItems');	
			tableData.splice(eSwipe.rowData.id,1);
			localStorage.savePendingItems(tableData);   
			clearTableData();
		}
		else{
			tableData.splice(eSwipe.rowData.id,1);
			var array = localStorage.getPendingItems();
			array.splice(eSwipe.rowData.id,1);
			Ti.App.Properties.removeProperty('pendingItems');	
			localStorage.savePendingItems(array);
			alert(array);
			clearTableData();
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

if(!localStorage.getPendingItems())
	alert('No Pending Items');
else
	populateItems(localStorage.getPendingItems());	

$.itemsTable.addEventListener('click', function(e) {
	
	clearTableData();
	$.itemsTable.updateRow(e.index, getSwipeRow(e));
	
});