var args = arguments[0] || {};

//for local storage
var localStorage=require('/localStorage');

var  row = outerView = leftView = rightView = deleteUserView = expandImageView = nameLabel = null;
var tableData = empty = [];

//logout users
dbOperations.logoutUsers();

var userData = dbOperations.getUsersInfo();

function newAccountClicked (e) {
	 var arg = {
        		title: ''
    		};
     var main = Alloy.createController('index', arg).getView().open();
};

function refreshTableData() {
	    
    	userData = tableData = [];
    	$.usersTable.data = [];
		userData = dbOperations.getUsersInfo();
		
		if(userData.length === 0)   // If all users are deleted from users list
			var main = Alloy.createController('index', {}).getView().open();
			
		else{
			if (userData.length ===1){  //if last logged in user is deleted, update the last logged in user id and the display name
				enteredEmailValue=userData[0].username.split('@');
				
				localStorage.saveLastLoggedInUserId(userData[0].id);
				localStorage.saveDisplayName(enteredEmailValue[0]);
			}  
				
			 populateUserList(userData);   
		}	
	      
}

var populateUserList = function(data) {
	
	
	for (var i=0; i < _.size(data); i++) {
	  
	  row = Ti.UI.createTableViewRow({
			id: data[i].id,
			height : 50,
			backgroundSelectedColor : 'transparent',
		    backgroundColor : 'transparent'
		});
	  
	  outerView = Ti.UI.createView({
			layout : 'horizontal',
			left : 0,
			top : 0.8,
			bottom : 0.8,
			width : Ti.UI.FILL,
			backgroundColor : '#3B0B0B',
			opacity:0.8,
	  });
	  
	  leftView = Ti.UI.createView({
			layout : 'vertical',
			top : '20%',
			left: '2%',
			height : '60%',
			width : '10%'
	  });
	 
	  deleteUserView = Ti.UI.createImageView({
			image : '/images/delete_user.png',
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			id: i
		});
	
	  outerRightView = Ti.UI.createView({
	  	
	  	    id : i,
			layout : 'horizontal',
			height : Ti.UI.FILL,
			width : '88%'
	  });
	  
	  centerView = Ti.UI.createView({
	  	
	  	    id : i,
			layout : 'vertical',
			height : Ti.UI.FILL,
			width : '90%'
	  });
	 
	 		
	 nameLabel = Ti.UI.createLabel({
			touchEnabled : false,
			top : '20%',
			left : 20,
			text : data[i].username ,
			color : '#F0C60A',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});
	
	 rightView = Ti.UI.createView({
	  	
			layout : 'vertical',
			top : '20%',
			height : '60%',
			width : '10%'
	  });
	  
	expandImageView = Ti.UI.createImageView({
			image : '/images/expand-arrow.png',
			left : '2%',
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			id: i,
			right : '0%',
	 });
			
		leftView.add(deleteUserView);
		
		deleteUserView.addEventListener('click', function(e) {
			
			e.cancelBubble = true;
			
			dbOperations.deleteUser(userData[e.source.id].id);
			
			setTimeout(function(){
				
				refreshTableData();
			},1000);
			
	    
		});
		
		centerView.add(nameLabel);
		rightView.add(expandImageView);
		
		outerRightView.add(centerView);
		outerRightView.add(rightView);
		
		outerRightView.addEventListener('click', function(e) {
			
			e.cancelBubble = true;
			var arg = {
        		title: userData[e.source.id].username
    		};
    		
    		var main = Alloy.createController('index', arg).getView().open();
	    
		});
	
		outerView.add(leftView);
		outerView.add(outerRightView);
		
		row.add(outerView);
		
		tableData.push(row);
		
		row = outerView = leftView = deleteUserView = expandImageView = rightView = nameLabel = null;
 
	 };
	 $.usersTable.data = tableData;
	 

};




populateUserList(userData);

//Back button navigation for android
if(!OS_IOS){
   	$.multiWindow.addEventListener('android:back', function(e){
   		
   		var activity = Titanium.Android.currentActivity;
		activity.finish();
   		
   	});
   
	
	$.multiWindow.addEventListener("close", function(){
    	$.destroy();
    	$.off();
    	$.multiWindow.close();
	});
	
}