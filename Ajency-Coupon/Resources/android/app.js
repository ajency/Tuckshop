function registerForPush() {
    Ti.Network.registerForPushNotifications({
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
    Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
}

function deviceTokenSuccess(e) {
    deviceToken = e.deviceToken;
}

function deviceTokenError() {
    alert("Failed to register for push notifications!");
    Ti.App.fireEvent("pushNotificationRegisterError");
}

function receivePush(e) {
    if (e.data.hasOwnProperty("custom_property")) {
        localStorage.getPendingItems() && (finalArray = localStorage.getPendingItems());
        finalArray.unshift(e.data.message);
        Ti.App.Properties.removeProperty("pendingItems");
        localStorage.savePendingItems(finalArray);
    } else {
        Alloy.Globals.pushNotificationReceived = true;
        var fetchProductsJs = require("/fetchCloudProducts");
        var totalUsers = dbOperations.getCount();
        1 === totalUsers ? fetchProductsJs.fetchCategories("home") : totalUsers > 1 && fetchProductsJs.fetchCategories("alloy");
        var confirm = Titanium.UI.createAlertDialog({
            title: "Notification",
            message: e.data.alert,
            buttonNames: [ "OK" ],
            cancel: 0
        });
        confirm.show();
    }
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Cloud = require("ti.cloud");

Cloud.debug = true;

var finalArray = [];

var allProductsArray = [];

var localPath;

var createdDateValue;

var localStorage = require("/localStorage");

var deviceToken = null;

Alloy.Globals.pushNotificationReceived = false;

var dbOperations = require("/dbOperations");

dbOperations.createDB();

dbOperations.addColumn();

var CloudPush = require("ti.cloudpush");

CloudPush.debug = true;

CloudPush.enabled = true;

CloudPush.showTrayNotificationsWhenFocused = true;

CloudPush.focusAppOnPush = false;

CloudPush.retrieveDeviceToken({
    success: deviceTokenSuccess,
    error: deviceTokenError
});

CloudPush.addEventListener("callback", function(evt) {
    var a = JSON.parse(evt.payload);
    if (a.hasOwnProperty("custom_property")) {
        localStorage.getPendingItems() && (finalArray = localStorage.getPendingItems());
        finalArray.unshift(a.message);
        Ti.App.Properties.removeProperty("pendingItems");
        localStorage.savePendingItems(finalArray);
    } else {
        Alloy.Globals.pushNotificationReceived = true;
        var fetchProductsJs = require("/fetchCloudProducts");
        var totalUsers = dbOperations.getCount();
        1 === totalUsers ? fetchProductsJs.fetchCategories("home") : totalUsers > 1 && fetchProductsJs.fetchCategories("alloy");
        var confirm = Titanium.UI.createAlertDialog({
            title: "Notification",
            message: a.android.alert,
            buttonNames: [ "OK" ],
            cancel: 0
        });
        confirm.show();
    }
});

Alloy.Globals.categoryResponse = [];

Alloy.Globals.userResponse = [];

Alloy.Globals.navigatedView = "Home";

Alloy.Globals.successOnRefresh;

Alloy.Globals.navigatePrevious;

Alloy.Globals.toggleLeft;

Alloy.Globals.midContainerReference;

Alloy.Globals.navigatedFromAllProducts = false;

Alloy.Globals.autoLogin = false;

Alloy.Globals.logoutInterval;

Alloy.Globals.forceLogout = function() {
    Alloy.Globals.logoutInterval = setTimeout(function() {
        Cloud.Users.logout(function(e) {
            if (e.success) {
                dbOperations.updateSessionId(localStorage.getLastLoggedInUserId());
                dbOperations.offlineLoginStatus(localStorage.getLastLoggedInUserId());
                Alloy.Globals.autoLogin = false;
                {
                    Alloy.createController("multiUser", {}).getView().open();
                }
            } else {
                Alloy.createController("index", {}).getView().open();
            }
        });
    }, 25e4);
};

Alloy.createController("index");