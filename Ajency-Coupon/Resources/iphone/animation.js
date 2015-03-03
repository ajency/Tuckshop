var platform = require("platformSupport");

var screenWidth;

screenWidth = platform.getScreenWidth();

var screenHeight;

screenHeight = platform.getScreenHeight();

exports.in = function(form) {
    form.left = screenWidth;
    form.right = -screenWidth;
    form.opacity = 0;
    form.open();
    form.animate({
        left: screenWidth,
        right: -screenWidth,
        duration: 1
    }, function() {
        form.opacity = 1;
        form.animate({
            left: 0,
            right: 0,
            duration: 200
        });
    });
};

exports.inAndClose = function(form, closeForm) {
    form.left = screenWidth;
    form.right = -screenWidth;
    form.opacity = 0;
    form.open();
    form.animate({
        left: screenWidth,
        right: -screenWidth,
        duration: 1
    }, function() {
        form.opacity = 1;
        form.animate({
            left: 0,
            right: 0,
            duration: 200
        }, function() {
            closeForm.close();
        });
    });
};

exports.out = function(form) {
    form.animate({
        left: screenWidth,
        right: -screenWidth,
        duration: 200
    }, function() {
        form.close();
    });
};