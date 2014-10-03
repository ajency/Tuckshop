var platform = require('platformSupport');

var screenWidth ;
if(OS_IOS){
	screenWidth = platform.getScreenWidth();
}else{
	screenWidth = platform.convertDptoPx(platform.getScreenWidth());
}

var screenHeight ;
if(OS_IOS){
	screenHeight = platform.getScreenHeight();
}else{
	screenHeight = platform.convertDptoPx(platform.getScreenHeight());
}


//alert(screenWidth);
exports.in = function(form){
	form.left = screenWidth;
	form.right = -(screenWidth);
	form.opacity = 0;
	
	form.open();

	form.animate({
		left : screenWidth,
		right : -(screenWidth),
		duration : 1
	}, function() {
		form.opacity = 1;
			form.animate({
			left : 0,
			right : 0,
			duration : 200
		});
	});
};
exports.inAndClose = function(form, closeForm){
	form.left = screenWidth;
	form.right = -(screenWidth);
	form.opacity = 0;
	
	form.open();

	form.animate({
		left : screenWidth,
		right : -(screenWidth),
		duration : 1
	}, function() {
		form.opacity = 1;
			form.animate({
			left : 0,
			right : 0,
			duration : 200
		}, function(){
			closeForm.close();
		});
	});
};
exports.out = function(form){
	form.animate({
		left : screenWidth,
		right : -(screenWidth),
		duration : 200
	}, function() {
		form.close();
	});
};

