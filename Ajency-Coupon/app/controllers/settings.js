var args = arguments[0] || {};


var mailStatus = dbOperations.getMailStatus(localStorage.getLastLoggedInUserId());

var mailSwitchValue = mailStatus.mails;
var dailyWeeklySwitchValue = mailStatus.daily_weekly;

console.log('Switch values');
console.log(mailSwitchValue);
console.log(dailyWeeklySwitchValue);

if (!OS_IOS){
	
	var RealSwitch = require("com.yydigital.realswitch");
	
	var leftValue;
	
	if(Alloy.isTablet)
	   leftValue = '43%';
	else
	   leftValue = '38%';
	   
	var dailyWeeklySwitch = RealSwitch.createRealSwitch({
		
		titleOn:'    ',
		titleOff:'    ',
  		left: leftValue,
  		focusable: true,
  		visible: false
	});
	
    $.dailyWeeklySwitch = dailyWeeklySwitch;
    
	$.dailyWeeklyView.add($.dailyWeeklySwitch);
}



function populateStates(boolValue){
	console.log('populate called');
	console.log(boolValue);
	
	switch(boolValue){
		
		case 0:
			$.mailSwitch.value = false;
			
			//Set the state of daily/wekly switch(specially for ios)
			$.dailyWeeklySwitch.touchEnabled = false;	
			if(dailyWeeklySwitchValue === 'daily')
				$.dailyWeeklySwitch.value = true;
			else if(dailyWeeklySwitchValue === 'weekly')	
			    $.dailyWeeklySwitch.value = false;
			    
			$.dailyWeeklyView.touchEnabled = false;	
			$.dailyWeeklyView.opacity = 0.5;             //disable touch event if mails disabled
			break;	
			
			
		case 1:
			$.mailSwitch.value = true;
			
			//Set the state of daily/wekly switch(specially for ios)
			$.dailyWeeklySwitch.touchEnabled = true;
			if(dailyWeeklySwitchValue === 'daily')
				$.dailyWeeklySwitch.value = true;
			else if(dailyWeeklySwitchValue === 'weekly')	
			    $.dailyWeeklySwitch.value = false;
			    
			$.dailyWeeklyView.touchEnabled = true;
			$.dailyWeeklyView.opacity = 1.0;  
			break;
		
	}
	
};

populateStates(mailStatus.mails); 


$.mailSwitch.addEventListener('change',function(e){
       
	  if($.mailSwitch.value)
	  	mailSwitchValue = 1;
	  
	  else
	  	mailSwitchValue = 0;

	  dbOperations.updateMailStatus(localStorage.getLastLoggedInUserId(), mailSwitchValue, dailyWeeklySwitchValue);
	  populateStates(mailSwitchValue);	 
});

$.dailyWeeklySwitch.addEventListener('change',function(e){
	
	if($.dailyWeeklySwitch.value)
	  	dailyWeeklySwitchValue = 'daily';
	  	
	else
	  	dailyWeeklySwitchValue = 'weekly';
	
	 dbOperations.updateMailStatus(localStorage.getLastLoggedInUserId(), mailSwitchValue, dailyWeeklySwitchValue);  	
	
});
