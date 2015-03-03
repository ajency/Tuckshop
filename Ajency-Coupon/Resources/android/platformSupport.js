var dpi = 0;

var getScreenDpi = function() {
    0 == dpi | null == dpi && (dpi = Ti.Platform.displayCaps.dpi);
    return dpi;
};

exports.getScreenDpi = getScreenDpi;

var width = 0;

var getScreenWidth = function() {
    width = Ti.Platform.displayCaps.platformWidth;
    width = convertPxtoDp(width);
    return width;
};

exports.getScreenWidth = getScreenWidth;

var height = 0;

var getScreenHeight = function() {
    height = Ti.Platform.displayCaps.platformHeight;
    height = convertPxtoDp(height);
    return height;
};

exports.getScreenHeight = getScreenHeight;

var convertDptoPx = function(dp) {
    return dp * (getScreenDpi() / 160);
};

exports.convertDptoPx = convertDptoPx;

var convertPxtoDp = function(px) {
    return px / (getScreenDpi() / 160);
};

exports.convertPxtoDp = convertPxtoDp;

var osVersion = Ti.Platform.version;

var isiOS7Plus = function() {
    var osName = osVersion;
    var version = 0;
    null != osName && (version = osVersion.split("."));
    var major = parseInt(version[0], 10);
    return major >= 7 ? true : false;
};

exports.isiOS7Plus = isiOS7Plus;

var isPortrait = function() {
    var isPortrait = false;
    (1 == Titanium.UI.orientation || 2 == Titanium.UI.orientation) && (isPortrait = true);
    return isPortrait;
};

exports.isPortrait = isPortrait;