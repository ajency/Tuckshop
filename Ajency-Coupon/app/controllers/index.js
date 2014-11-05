//Menu view
var alloy = require('alloy');

	
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

//Back button navigation for android
if(!OS_IOS){
	
	$.drawer.addEventListener('android:back', function(e) {
		
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
	});
}

