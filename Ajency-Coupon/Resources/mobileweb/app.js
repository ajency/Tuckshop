function deviceTokenSuccess(e) {
    deviceToken = e.deviceToken;
}

function deviceTokenError(e) {
    alert("Failed to register for push notifications! " + e.error);
}

function receivePush() {
    var fetchProductsJs = require("/fetchCloudProducts");
    fetchProductsJs.fetchCloudProducts("");
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Cloud = require("ti.cloud");

Cloud.debug = true;

var juicesProductArray = [];

var biscuitsProductArray = [];

var rollsProductArray = [];

var allProductsArray = [];

var Settings;

var newFile;

var localPath;

var createdDateValue;

var deviceToken = null;

var CloudPush = require("ti.cloudpush");

CloudPush.debug = true;

CloudPush.enabled = true;

CloudPush.showTrayNotificationsWhenFocused = true;

CloudPush.focusAppOnPush = false;

CloudPush.retrieveDeviceToken({
    success: deviceTokenSuccess,
    error: deviceTokenError
});

CloudPush.addEventListener("callback", function() {
    var fetchProductsJs = require("/fetchCloudProducts");
    fetchProductsJs.fetchCloudProducts("");
});

var indWin = null;

Alloy.Globals.showIndicator = function() {
    try {
        null == indWin && (indWin = Alloy.createController("indicator").getView());
        indWin.showIndicator();
    } catch (e) {
        Ti.API.info("Exception in opening indicator");
    }
};

Alloy.Globals.hideIndicator = function() {
    try {
        if (null != indWin) {
            indWin.hideIndicator();
            indWin = null;
        }
    } catch (e) {
        Ti.API.info("Exception in hiding indicator");
    }
};

Alloy.createController("index");