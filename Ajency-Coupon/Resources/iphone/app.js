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

var CloudPush;

console.log("In iphone");

Titanium.UI.iPhone.setAppBadge(null);

if (true && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
    Ti.App.iOS.addEventListener("usernotificationsettings", registerForPush);
    Ti.App.iOS.registerUserNotificationSettings({
        types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE ]
    });
} else Ti.Network.registerForPushNotifications({
    types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
    success: deviceTokenSuccess,
    error: deviceTokenError,
    callback: receivePush
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