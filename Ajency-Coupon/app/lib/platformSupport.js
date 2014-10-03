var dpi = 0;
// Get Screen DPi
var getScreenDpi = function() {
	if (dpi == 0 | dpi == null) {
		dpi = Ti.Platform.displayCaps.dpi;
	}
	return dpi;
};
exports.getScreenDpi = getScreenDpi;

var width = 0;
// Get Current Screen Width
var getScreenWidth = function() {

	width = Ti.Platform.displayCaps.platformWidth;

	if (!OS_IOS) {
		width = convertPxtoDp(width);
	}

	return width;
};
exports.getScreenWidth = getScreenWidth;

var height = 0;
// Get Current Screen Height
var getScreenHeight = function() {

	height = Ti.Platform.displayCaps.platformHeight;

	if (!OS_IOS) {
		height = convertPxtoDp(height);
	}
	return height;
};
exports.getScreenHeight = getScreenHeight;

// Get real px from dp
var convertDptoPx = function(dp) {

	return dp * (getScreenDpi() / 160);
};
exports.convertDptoPx = convertDptoPx;

// Get dp px from dp
var convertPxtoDp = function(px) {

	return px / (getScreenDpi() / 160);
};
exports.convertPxtoDp = convertPxtoDp;

var osVersion = Ti.Platform.version;
// get current os is ios7
var isiOS7Plus = function() {
	var osName = osVersion;
	var version = 0;

	if (osName != null)
		version = osVersion.split(".");

	var major = parseInt(version[0], 10);

	// Can only test this support on a 3.2+ device
	if (major >= 7)
		return true;
	else
		return false;
};
exports.isiOS7Plus = isiOS7Plus;

// return screen is portrait or landscape
var isPortrait = function() {
	var isPortrait = false;

	if (Titanium.UI.orientation == 1 || Titanium.UI.orientation == 2) {
		isPortrait = true;
	}
	
	return isPortrait;
};
exports.isPortrait = isPortrait;

