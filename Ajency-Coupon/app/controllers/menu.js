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


alloy.Globals.toggleLeft = function (data) {
    
    $.drawer.instance.toggleLeftWindow();
};

Ti.App.addEventListener('menu:toggleLeftMenu', alloy.Globals.toggleLeft);

function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

alloy.Globals.navigatePrevious = function (e) {
  	 e.cancelBubble = true;
	    
	    if($.drawer.instance.isLeftWindowOpen()) $.drawer.instance.toggleLeftWindow();
	    
	    else{
	    	console.log('Called');
		    var currentView = alloy.Globals.navigatedView;
		    console.log('current view');
		    console.log(currentView);
		    if(currentView === 'Home'){
		    	
		    	if(!OS_IOS){
		    		console.log('In finish');
		    		var activity = Titanium.Android.currentActivity;
					activity.finish();
					
		    	}
		    	
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
	
	$.drawer.addEventListener('android:back', alloy.Globals.navigatePrevious);
}

//menu back to navigate back to categories page from products
Ti.App.addEventListener('screen:back',alloy.Globals.navigatePrevious);


function destroyMenu (){
	$.destroy();
	// remove all event listeners on the controller
  	$.off();
};

Ti.App.addEventListener('destroy:menu:instance', destroyMenu);

