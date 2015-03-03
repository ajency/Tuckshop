function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadingAnimation() {
        null != animateObject && (animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png");
        loaderIndex++;
        5 === loaderIndex && (loaderIndex = 1);
    }
    function getDeviceType() {
        if (Alloy.isTablet) {
            rowHeight = 150;
            rowTop = 12.6;
            separatorViewDistance = 30;
            separatorHeight = 1.8;
        } else {
            rowHeight = 90;
            rowTop = 21;
            separatorViewDistance = 18;
            separatorHeight = 1.08;
        }
    }
    function subscribeToPendingChannel() {
        var organizationDetails = dbOperations.getOrganizationRow(localStorage.getOrganizationId());
        var pendingChannel = organizationDetails[0].organizationPendingChannel;
        Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: pendingChannel,
            type: "android"
        }, function(e) {
            if (e.success) {
                alloy.Globals.populateLeftMenu();
                fetchProductsJs.fetchCategories("home");
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                type = "subscribeToPendingChannel";
                showConnectionErrorView();
            }
        });
    }
    function updateLastMailDate() {
        Cloud.Users.update({
            custom_fields: {
                last_mail_date: moment().format(),
                device_token: deviceToken
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                dbOperations.updateLastMailDate(user.id, user.custom_fields.last_mail_date);
                dbOperations.updateUserType(user.id, user.admin);
                if (user.hasOwnProperty("role")) {
                    console.log("user has a role in home");
                    dbOperations.updateUserRole(user.id, user.role);
                } else dbOperations.updateUserRole(user.id, "consumer");
                if ("cook" === dbOperations.getUserRole(localStorage.getLastLoggedInUserId())) {
                    console.log("cook id");
                    subscribeToPendingChannel();
                } else fetchProductsJs.fetchCategories("home");
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                var toast = Ti.UI.createNotification({
                    message: "Please Login again to continue",
                    duration: Ti.UI.NOTIFICATION_DURATION_LONG
                });
                toast.show();
                alloy.Globals.navigatedFromAllProducts = true;
                {
                    Alloy.createController("index", {}).getView().open();
                }
            }
        });
    }
    function organizationData() {
        Cloud.Objects.query({
            classname: "organization",
            limit: 1e3,
            where: {
                organizationId: localStorage.getOrganizationId()
            }
        }, function(e) {
            if (e.success) {
                dbOperations.saveOrganizationRow(e.organization);
                updateLastMailDate();
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                type = "organizationData";
                showConnectionErrorView();
            }
        });
    }
    function getSum(data) {
        var sum = 0;
        _.each(data, function(item) {
            sum += parseFloat(item.productPrice);
        });
        sum = sum.toFixed(2);
        Ti.App.fireEvent("Calculate", {
            value: sum
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.categoryView = Ti.UI.createScrollView({
        top: "0%",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        showHorizontalScrollIndicator: false,
        showVerticalScrollIndicator: true,
        scrollType: "vertical",
        contentHeight: "auto",
        layout: "vertical",
        id: "categoryView",
        scrollingEnabled: "true"
    });
    $.__views.categoryView && $.addTopLevelView($.__views.categoryView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    require("animation");
    require("platformSupport");
    arguments[0] || {};
    var type;
    var loaderAnimate;
    var feedsForCategories;
    var rowTop;
    var separatorViewDistance;
    var separatorHeight;
    var animateObject;
    var homeErrorLabel;
    var localStorage = require("/localStorage");
    var networkCheck = require("/networkCheck");
    var fetchProductsJs = require("/fetchCloudProducts");
    var loaderIndex = 1;
    getDeviceType();
    var showImageView = function() {
        animateObject = Ti.UI.createImageView({
            height: 96,
            width: 96,
            top: "45%"
        });
        $.categoryView.add(animateObject);
    };
    var hideImageView = function() {
        null != animateObject && $.categoryView.remove(animateObject);
    };
    var showConnectionErrorView = function() {
        homeErrorLabel = Ti.UI.createLabel({
            height: "12%",
            width: "30%",
            top: "45%",
            text: "Tap to Retry",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 15
            }
        });
        $.categoryView.add(homeErrorLabel);
    };
    null != homeErrorLabel && homeErrorLabel.addEventListener("click", function() {
        if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else if ("fetchAllTransactions" === type) fetchAllTransactions(); else {
            showImageView();
            loaderAnimate = setInterval(loadingAnimation, 250);
            hideConnectionErrorView();
            "organizationData" === type ? organizationData() : "subscribeToPendingChannel" === type ? subscribeToPendingChannel() : "fetchCategories" === type ? fetchProductsJs.fetchCategories("home") : "fetchCloudProducts" === type ? fetchProductsJs.fetchCloudProducts("home") : "transactionsOnProductIds" === type ? fetchProductsJs.transactionsOnProductIds("home") : "transactionsOnProductIdsGreaterThanThousand" === type && fetchProductsJs.transactionsOnProductIdsGreaterThanThousand("home");
        }
    });
    var hideConnectionErrorView = function() {
        null != homeErrorLabel && $.categoryView.remove(homeErrorLabel);
    };
    var isOdd = function(no) {
        return no % 2 ? true : false;
    };
    var createRow = function() {
        var view = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: rowHeight,
            top: rowTop
        });
        return view;
    };
    var getGrid = function(position, data) {
        var view = Ti.UI.createView({
            touchEnabled: true,
            layout: "vertical",
            width: "50%",
            height: "100%",
            id: data.categoryId
        });
        0 === position ? view.setLeft(0) : view.setRight(0);
        var image = Ti.UI.createImageView({
            touchEnabled: false,
            height: "60%",
            width: "30%",
            align: "center",
            image: data.photo.urls.small_240
        });
        var label = Ti.UI.createLabel({
            touchEnabled: false,
            height: "40%",
            width: "100%",
            textAlign: "center",
            color: "#000000",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 20
            },
            text: data.categoryName
        });
        view.add(image);
        view.add(label);
        view.addEventListener("click", function(e) {
            var evtData = {
                id: e.source.id
            };
            alloy.Globals.navigatedView = evtData.id;
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
        });
        return view;
    };
    var verticalSeparator = function() {
        var view = Ti.UI.createView({
            layout: "vertical",
            backgroundColor: "#F0C60A",
            height: "100%",
            width: "0.3%",
            align: "center"
        });
        return view;
    };
    var horizontalSeparator = function() {
        var view = Ti.UI.createView({
            backgroundColor: "#F0C60A",
            height: separatorHeight,
            width: "85%",
            top: separatorViewDistance
        });
        return view;
    };
    var bottomView = function() {
        var view = Ti.UI.createView({
            height: separatorViewDistance,
            width: "100%",
            top: "0%"
        });
        return view;
    };
    var initCategories = function(feeds) {
        var outerRow, leftGrid, rightGrid = null;
        for (var i = 0; len = feeds.length, len > i; i++) {
            var grid = i + 1;
            if (isOdd(grid)) {
                outerRow = createRow();
                if (1 === grid) {
                    leftGrid = getGrid(0, feeds[i]);
                    outerRow.add(leftGrid);
                    1 === len && $.categoryView.add(outerRow);
                } else {
                    $.categoryView.add(horizontalSeparator());
                    leftGrid = getGrid(0, feeds[i]);
                    outerRow.add(leftGrid);
                    grid === len && $.categoryView.add(outerRow);
                }
            } else {
                outerRow.add(verticalSeparator());
                rightGrid = getGrid(1, feeds[i]);
                outerRow.add(rightGrid);
                $.categoryView.add(outerRow);
                outerRow = null;
            }
            leftGrid = rightGrid = null;
        }
        $.categoryView.add(bottomView());
    };
    var fetchAllTransactions = function() {
        showImageView();
        loaderAnimate = setInterval(loadingAnimation, 250);
        hideConnectionErrorView();
        Cloud.Objects.query({
            classname: "testItems",
            limit: 1e3,
            where: {
                userId: localStorage.getUserId()
            }
        }, function(e) {
            if (e.success) {
                hideImageView();
                clearInterval(loaderAnimate);
                dbOperations.saveTransactionRows(e.testItems);
                getSum(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()));
                feedsForCategories = localStorage.getAllCategories();
                initCategories(feedsForCategories);
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                type = "fetchAllTransactions";
                showConnectionErrorView();
            }
        });
    };
    Ti.include("/data/categoriesData.js");
    Ti.App.fireEvent("Display", {
        displayValue: localStorage.getDisplayName()
    });
    Ti.App.addEventListener("errorOnHome", function(data) {
        hideImageView();
        clearInterval(loaderAnimate);
        type = data.name;
        showConnectionErrorView();
    });
    Ti.App.addEventListener("successOnHome", function() {
        console.log("Success on home called");
        hideImageView();
        null != loaderAnimate && clearInterval(loaderAnimate);
        $.categoryView.removeAllChildren();
        feedsForCategories = localStorage.getAllCategories();
        initCategories(feedsForCategories);
    });
    Ti.App.addEventListener("refreshCategories", function(e) {
        e.cancelBubble = true;
        $.categoryView.removeAllChildren();
        initCategories(feedsForCategories);
    });
    if (dbOperations.checkTransactionsPresentForUser(localStorage.getLastLoggedInUserId())) {
        getSum(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()));
        if (Titanium.App.version >= "4.0" && !localStorage.getAllCategories() && !alloy.Globals.pushNotificationReceived) {
            showImageView();
            loaderAnimate = setInterval(loadingAnimation, 250);
            hideConnectionErrorView();
            enteredEmailValue = localStorage.getUserName().split("@");
            if ("ajency.in" === enteredEmailValue[1]) {
                console.log("Entered is ajency mail");
                localStorage.saveOrganizationId(1);
            } else "ascotwm.com" === enteredEmailValue[1] && localStorage.saveOrganizationId(2);
            dbOperations.setOrganizationId(localStorage.getLastLoggedInUserId(), localStorage.getOrganizationId());
            dbOperations.updateMailStatus(localStorage.getLastLoggedInUserId(), 1, "daily");
            null != dbOperations.getSessionId(localStorage.getLastLoggedInUserId()) && (Cloud.sessionId = localStorage.getSessionId());
            organizationData();
        } else if (alloy.Globals.pushNotificationReceived) {
            if (alloy.Globals.pushNotificationReceived) {
                $.categoryView.removeAllChildren();
                showImageView();
                loaderAnimate = setInterval(loadingAnimation, 250);
                hideConnectionErrorView();
            }
        } else {
            console.log("No push received");
            feedsForCategories = localStorage.getAllCategories();
            initCategories(feedsForCategories);
        }
    } else fetchAllTransactions();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;