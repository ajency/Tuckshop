var alloy = require('alloy');
var args = arguments[0] || {};


var rowheight;
var rowTop;
var separatorViewDistance;
var separatorHeight;

var options = ["Manage Users", "Manage Products"];

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
		id: data
	});
	
	if(position===0) view.setLeft(0);
	
	else view.setRight(0);
	
	
	var label = Ti.UI.createLabel({
		touchEnabled: false,
		height:'100%',
		width: '50%',
		textAlign: 'center',
		color: '#000000',
		font : {
			fontFamily: "OpenSans-Regular",
			fontSize: 20
		},
		text: data
	});
	
	view.add(label);
	
	view.addEventListener('click', function(e){
				 
		 var evtData = {id: e.source.id };
		 
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

init = function(){
	
	var outerRow, leftGrid, rightGrid = null; 
	
	for(var i=0; len=options.length, i<len; i++){
		
		var grid = i+1;
		
		if(isOdd(grid)){
			//When grid is odd
			outerRow = createRow();
			
			if(grid===1){
				leftGrid = getGrid(0, options[i]);
				outerRow.add(leftGrid);
				
				if(len===1)
					$.adminMainView.add(outerRow);
					
			}
			else{
				$.adminMainView.add(horizontalSeparator());
				
				leftGrid = getGrid(0, options[i]);
				outerRow.add(leftGrid);
				
				if(grid===len)
					$.adminMainView.add(outerRow);
					
			}
		}
		
		else{
			//When grid is even
			outerRow.add(verticalSeparator());
			
			rightGrid = getGrid(1, options[i]);
			outerRow.add(rightGrid);
			
			$.adminMainView.add(outerRow);
			
			outerRow = null;
		}
		
		leftGrid = rightGrid = null;
	}
	
	$.adminMainView.add(bottomView());
};

init();
