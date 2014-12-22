//Menu view
var alloy = require('alloy');
console.log('menu called');


var mainView = Alloy.createController('main').getView();
$.drawerCenterView.add(mainView);


var leftMenuView = Alloy.createController('leftMenu').getView();
$.drawerLeftView.add(leftMenuView);



$.drawer.open();


function refreshLeftMenu(){
	
	$.drawerLeftView.removeAllChildren();
	
	var leftMenu = Alloy.createController('leftMenu').getView();
	$.drawerLeftView.add(leftMenu);
}



Ti.App.addEventListener('menu:toggleLeftMenu', function(data) {
	
    $.drawer.instance.toggleLeftWindow();
});

function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

var navigatePrevious = function (e) {
  	 e.cancelBubble = true;
	    
	    if($.drawer.instance.isLeftWindowOpen()) $.drawer.instance.toggleLeftWindow();
	    
	    else{
	    	
		    var currentView = alloy.Globals.navigatedView;
		    
		    if(currentView === 'Home'){
		    	
		    	var activity = Titanium.Android.currentActivity;
				activity.finish();
		    }
		    
		    else{
		    	
		    	alloy.Globals.navigatedView = 'Home';
		    	
		    	var evtData = {id: 'Home'};
				Ti.App.fireEvent("app:addViewToMidContainer", evtData);
				
				refreshLeftMenu();
		    }
		  }
};

var navigateIosPrevious = function (e) {
  	 e.cancelBubble = true;
	    
	    if($.drawer.instance.isLeftWindowOpen()) $.drawer.instance.toggleLeftWindow();
	    
	    else{
	    	
		    var currentView = alloy.Globals.navigatedView;
		    
		    if(currentView === 'Home'){
		    	
		    	currentView.close();
		    }
		    
		    else{
		    	
		    	alloy.Globals.navigatedView = 'Home';
		    	
		    	var evtData = {id: 'Home'};
				Ti.App.fireEvent("app:addViewToMidContainer", evtData);
				
				refreshLeftMenu();
		    }
		  }
};

//Back button navigation for android
if(!OS_IOS){
	
	$.drawer.addEventListener('android:back', navigatePrevious);
	//menu back to navigate back to categories page from products
	Ti.App.addEventListener('screen:back:android',navigatePrevious);
}
else{
	//menu back to navigate back to categories page from products
	Ti.App.addEventListener('screen:back:ios',navigateIosPrevious);
}


function destroyMenu (){
	$.destroy();
	// remove all event listeners on the controller
  	$.off();
};

Ti.App.addEventListener('destroy:menu:instance', destroyMenu);

