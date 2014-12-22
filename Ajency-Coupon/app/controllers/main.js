var __ = require('platformSupport');
var myAnimation = require('animation');
var anim = require('alloy/animation');
var alloy = require('alloy');

console.log('main called');
if (OS_IOS) {
	Titanium.UI.iPhone.setAppBadge(null);
}


$.headerMenu.addEventListener('click', function(e){
	
	if($.headerMenu.image ==='/images/menu_back.png'){ //menu back to navigate back to categories page from products
		$.headerMenu.image ='/images/menu.png';
		if(!OS_IOS)
			Ti.App.fireEvent('screen:back:android');
		else	
			Ti.App.fireEvent('screen:back:ios');
	}
	else	
		Ti.App.fireEvent('menu:toggleLeftMenu');
});



//Clear all static and midContainer child views.
var clearViews = function() {
	
	$.staticView.removeAllChildren();
	$.midContainer.removeAllChildren();
};


var getCategoriesJson = function(categoryId){
	
	var data = {};
	
	Ti.include("/data/categoriesData.js");
	var feeds = eval('(' + categoriesJsonTuckShop + ')');
	
	for(var i=0; len=_.size(feeds), i<len; i++){
		
		if(feeds[i].categoryId === categoryId){
			data.imagePath = feeds[i].imagePath;
			data.labelText = feeds[i].categoryFancyName;
		}
	}
	
	return data;
};



//Display static view contents based on the menu and product selection.
var loadStaticView = function(id) {
	
	var view = Ti.UI.createView({
		bottom: '5%', left: '10%', width: Ti.UI.SIZE, height: Ti.UI.SIZE
	});
	
	var horizontalSeparator = Ti.UI.createView({
		bottom: 0, height: '2%', width: Ti.UI.FILL, backgroundColor: '#E7BE07'
	});
	
	var boldLabel = Ti.UI.createLabel({
		left: 0, color: '#3B0B0B', width: 'auto', height: 40,
		font: { fontFamily: "OpenSans-Bold", fontSize: 35 }
	});
	
	var regularLabel = Ti.UI.createLabel({
		left: 0, color: '#3B0B0B', width: 'auto', height: 'auto',
		font: { fontFamily: "OpenSans-Regular", fontSize: 35 }
	});
	
	var image = Ti.UI.createImageView({
		left: 0,bottom: 5, height: 50, width: 45
	});
	
	switch(id){
		case 'Home':
			view.setLayout('vertical');
			boldLabel.setText('I want');
			regularLabel.setText('something...');
			view.add(boldLabel);
			view.add(regularLabel);
			break;
			
		case 'Transaction History':
			view = null;
			view = Alloy.createController("transactionHistoryStaticView").getView();
			break;
			
		default:
			//Category ids
			var data = getCategoriesJson(id);
			view.setLayout('horizontal');
			boldLabel.height='auto';
			boldLabel.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP ;
			boldLabel.font = { fontFamily: "OpenSans-Bold", fontSize: 40 };
			boldLabel.setText(data.labelText);
			image.setImage(data.imagePath);
			view.add(image);
			view.add(boldLabel);
	};
	
	$.staticView.add(view);
	$.staticView.add(horizontalSeparator);
	 // anim.popIn(view);
};


var getAllProducts = function(categoryId){
	
	var params = {categoryId: categoryId};
	$.midContainer.add(Alloy.createController("allProducts", params).getView());
};


var init = function(view) {
	setTimeout(function(){
	
		switch(view){
			case 'Home':
				loadStaticView(view);
				$.midContainer.add(Alloy.createController("home").getView());
				break;
				
			case 'Transaction History':
				loadStaticView(view);
				$.midContainer.add(Alloy.createController("transactionHistory").getView());
				break;
		}
		
	}, 200);
};

alloy.Globals.midContainerReference = function (e) {
  
  clearViews();
	
	var id = e.id;
	
	switch(id) {
	    case 'Home':
	    	console.log('Home');
	    	$.headerMenu.image ='/images/menu.png';
	    	init('Home');
	        break;
	        
	    case 'Transaction History':
	    	console.log('Transaction history');
	    	$.headerMenu.image ='/images/menu_back.png';
	    	init('Transaction History');
	    	break;
	        
	    default :
	    	//Default values will be product category ids.
	    	console.log('Product id: '+id);
	    	$.headerMenu.image ='/images/menu_back.png';
	    	loadStaticView(id);
	    	getAllProducts(id);
	}
};

Ti.App.addEventListener("app:addViewToMidContainer", alloy.Globals.midContainerReference);


//Default view
init('Home');

if(!OS_IOS){
	
	$.startWindow.addEventListener("close", function(){
    	$.destroy();
    	$.off();
    	$.startWindow.close();
	});
}	