var args = arguments[0] || {};

var  row = leftView = rightView = deleteUserView = nameLabel = null;
var tableData = empty = [];

var userData = dbOperations.getUsersInfo();

function refreshTableData() {
    	$.usersTable.data = empty;
    	userData = [];
    	tableData = [];
		userData = dbOperations.getUsersInfo();
		console.log('user data');
		console.log(userData);
	    populateUserList(userData);
}

var populateUserList = function(data) {
	
	for (var i=0; i < data.length; i++) {
	  
	  row = Ti.UI.createTableViewRow({
			id: data[i].id,
			height : 50,
			backgroundSelectedColor : 'transparent',
		    backgroundColor : 'transparent'
		});
	  
	  outerView = Ti.UI.createView({
			layout : 'horizontal',
			left : 0,
			top : 0.4,
			bottom : 0.4,
			width : Ti.UI.FILL,
			backgroundColor : '#3B0B0B'
	  });
	  
	  leftView = Ti.UI.createView({
	  		id : data[i].id,
			layout : 'horizontal',
			left : 0,
			height : Ti.UI.SIZE,
			width : 25
	  });
	 
	  deleteUserView = Ti.UI.createImageView({
			image : '/images/icon_tick.png',
			width : 20,
			height : 20,
			top : 15,
			bottom : 15,
			left : 2
		});
	
	  rightView = Ti.UI.createView({
	  	
	  	    id : i,
			layout : 'horizontal',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL
	  });
	 
	 enteredEmailValue = data[i].username.split('@');
	 		
	 nameLabel = Ti.UI.createLabel({
			touchEnabled : false,
			top : '10%',
			left : 20,
			text : enteredEmailValue[0] ,
			color : '#F0C60A',
			font : {
				fontFamily : "OpenSans-Regular",
				fontSize : 20
			}
		});
		
		leftView.add(deleteUserView);
		
		leftView.addEventListener('click', function(e) {
		
			e.cancelBubble = true;
			dbOperations.deleteUser(e.source.id);
			
			refreshTableData();
	    
		});
		
		rightView.add(nameLabel);
		
		rightView.addEventListener('click', function(e) {
		
			e.cancelBubble = true;
			var arg = {
        		title: userData[e.source.id].username
    		};
    		
    		var main = Alloy.createController('index', arg).getView().open();
	    
		});
	
		outerView.add(leftView);
		outerView.add(rightView);
		
		row.add(outerView);
		
		tableData.push(row);
		
		row = leftView = deleteUserView = rightView = nameLabel = null;
 
	 };
	 $.usersTable.data = tableData;
	 

};




populateUserList(userData);

