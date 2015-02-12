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
	
    $.userErrorLabel.height="15%";
    $.userErrorLabel.width="30%";
    	
};

var hideConnectionErrorView = function  () {
	
    $.userErrorLabel.height=0;
    $.userErrorLabel.width=0;
};

$.userErrorLabel.addEventListener('click',function(e){
		
		if (networkCheck.getNetworkStatus()==0) 
			alert('No Internet Connection');
		else
			getAllCloudUsers();
});

var populateUsers = function(jsonData) {
	
	console.log('table data');
	console.log(jsonData);
	
	var row = view = imageView = productNameLabel = null;
   
	for (var i = 0; len = _.size(jsonData), i < len; i++) {
		
		
		row = Ti.UI.createTableViewRow({
			id: 'UserList',
			userid: jsonData[i].id,
			username: jsonData[i].username,
			height : 70,
			backgroundSelectedColor : 'transparent',
		    backgroundColor : 'white'
		});

		productNameLabel = Ti.UI.createLabel({
			touchEnabled : false,
			left : '20%',
			textAlign : 'center',
			text : jsonData[i].username,
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

		row.add(productNameLabel);
		row.add(view);
		
		
		tableData.push(row);

		row = view = imageView = productNameLabel =  null;
	}
	 
     
	 $.usersTable.data = tableData;
	 
	 
};

function getAllCloudUsers(){
		
	   showImageView();
       loaderAnimate = setInterval(loadingAnimation,200);
       hideConnectionErrorView();
       
		Cloud.Users.query({
		    limit: 1000,
		    where: {
               organizationId: localStorage.getOrganizationId()
      		}
		}, function (e) {
		    if (e.success) {
		    	
		        hideImageView();
				clearInterval(loaderAnimate);
				
				for(i=0;len=e.users.length,i<len;i++){
            	
            		alloy.Globals.userResponse.push(e.users[i]);
            	}
		        populateUsers(e.users); 
		    } else {
		    	hideImageView();
				clearInterval(loaderAnimate);
				showConnectionErrorView();
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
};

if(alloy.Globals.userResponse.length === 0)
	getAllCloudUsers();
else
	populateUsers(alloy.Globals.userResponse);	

$.usersTable.addEventListener('click', function(e) {
	
	//passing the id , userid, username to identify the screen, user id and display username respectively
	 var evtData = {id: e.rowData.id, userid: e.rowData.userid, username: e.rowData.username };
		 
	 alloy.Globals.navigatedView = evtData.id;
	 Ti.App.fireEvent("app:addViewToMidContainer", evtData);
	 evtData = null; 
		
});