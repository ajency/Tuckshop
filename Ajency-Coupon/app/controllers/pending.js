var alloy = require('alloy');
var args = arguments[0] || {};

var localStorage=require('/localStorage');
var networkCheck=require('/networkCheck');

var tableData = [];

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

var populateItems = function(jsonData) {
	
	console.log('table data');
	console.log(jsonData);
	
	var row = view = imageView = productNameLabel = null;
   
	for (var i = 0; len = _.size(jsonData), i < len; i++) {
		
		
		row = Ti.UI.createTableViewRow({
			id: i,
			height : 70,
			backgroundSelectedColor : 'transparent',
		    backgroundColor : 'white'
		});

		productNameLabel = Ti.UI.createLabel({
			touchEnabled : false,
			left : '25%',
			textAlign : 'center',
			text : jsonData[i],
			color : '#3B0B0B',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});

		

		row.add(productNameLabel);
		
		tableData.push(row);

		row =  productNameLabel =  null;
	}
	 
     
	 $.itemsTable.data = tableData;
	 
	 
};

if(localStorage.getPendingItems().length === 0)
	alert('No Pending Items');
else
	populateItems(localStorage.getPendingItems());	

$.itemsTable.addEventListener('click', function(e) {
	
	
		
});