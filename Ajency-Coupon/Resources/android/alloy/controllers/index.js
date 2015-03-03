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
        $.animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
        loaderIndex++;
        5 === loaderIndex && (loaderIndex = 1);
    }
    function openRegister() {
        var register = Alloy.createController("register").getView();
        register.open();
    }
    function dbUserInfo(e) {
        var user = e.users[0];
        if (dbOperations.checkIfRowExists(user.id)) {
            dbOperations.onlineLoginStatus(user.id);
            dbOperations.setOrganizationId(user.id, user.custom_fields.organizationId);
            var mailStatus = dbOperations.getMailStatus(localStorage.getLastLoggedInUserId());
            null === mailStatus.mails && null === mailStatus.daily_weekly && dbOperations.updateMailStatus(user.id, 1, "daily");
            var mailDate = dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId());
            null === mailDate && dbOperations.updateLastMailDate(user.id, user.custom_fields.last_mail_date);
            var userType = dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId());
            null === userType && dbOperations.updateUserType(user.id, user.admin);
            if (user.hasOwnProperty("role")) {
                console.log("user has a role");
                dbOperations.updateUserRole(user.id, user.role);
            } else dbOperations.updateUserRole(user.id, "consumer");
        } else {
            var role;
            if (user.hasOwnProperty("role")) {
                console.log("user has a role");
                role = "cook";
            } else role = "consumer";
            dbOperations.insertRow(user.id, $.usernameTextfield.value, true, e.meta.session_id, user.custom_fields.credited_date_at, user.custom_fields.organizationId, 1, "daily", user.custom_fields.last_mail_date, user.admin, role);
        }
    }
    function updateDeviceToken() {
        Cloud.Users.update({
            custom_fields: {
                device_token: deviceToken
            }
        }, function(e) {
            if (e.success) {
                {
                    e.users[0];
                }
                dbUserInfo(e);
                dbOperations.checkOrganizationPresent(localStorage.getOrganizationId()) ? subscribeToChannel() : organizationData();
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                localStorage.saveErrorAtIndex("updateDeviceToken");
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
                {
                    e.users[0];
                }
                dbUserInfo(e);
                dbOperations.checkOrganizationPresent(localStorage.getOrganizationId()) ? subscribeToChannel() : organizationData();
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                localStorage.saveErrorAtIndex("updateLastMailDate");
                showConnectionErrorView();
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
                subscribeToChannel();
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                type = "organizationData";
                showConnectionErrorView();
            }
        });
    }
    function login() {
        $.usernameTextfield.blur();
        $.passwordTextfield.blur();
        showImageView();
        loaderAnimate = setInterval(loadingAnimation, 200);
        hideComponents();
        $.loginButton.enabled = false;
        Cloud.Users.login({
            login: $.usernameTextfield.value,
            password: $.passwordTextfield.value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                console.log("User details");
                console.log(user);
                alloy.Globals.autoLogin = true;
                dbOperations.getCount() > 1 && alloy.Globals.forceLogout();
                localStorage.saveUserId(user);
                localStorage.saveUserName($.usernameTextfield.value);
                localStorage.saveDisplayName(enteredEmailValue[0]);
                localStorage.saveSessionId(e.meta.session_id);
                localStorage.saveCreditedDate(user.custom_fields.credited_date_at);
                localStorage.saveLastLoggedInUserId(user.id);
                Ti.API.info("test credited date:::\n" + user.custom_fields.credited_date_at);
                day = moment(user.custom_fields.credited_date_at);
                null != alloy.Globals.midContainerReference && Ti.App.removeEventListener("app:addViewToMidContainer", alloy.Globals.midContainerReference);
                null != alloy.Globals.navigatePrevious && Ti.App.removeEventListener("screen:back", alloy.Globals.navigatePrevious);
                null != alloy.Globals.successOnRefresh && Ti.App.removeEventListener("successOnFetch", alloy.Globals.successOnRefresh);
                null != alloy.Globals.toggleLeft && Ti.App.removeEventListener("menu:toggleLeftMenu", alloy.Globals.toggleLeft);
                "ajency.in" === enteredEmailValue[1] ? localStorage.saveOrganizationId(1) : "ascotwm.com" === enteredEmailValue[1] && localStorage.saveOrganizationId(2);
                if (user.custom_fields.hasOwnProperty("last_mail_date")) if (user.custom_fields.device_token != deviceToken) updateDeviceToken(); else {
                    dbUserInfo(e);
                    dbOperations.checkOrganizationPresent(localStorage.getOrganizationId()) ? subscribeToChannel() : organizationData();
                } else {
                    console.log("last mail date called");
                    updateLastMailDate();
                }
            } else {
                hideImageView();
                showComponents();
                clearInterval(loaderAnimate);
                alert(401 == e.code ? "Invalid username and password" : "Could not connect to server. Try again ");
                $.loginButton.enabled = true;
            }
        });
    }
    function loginClicked() {
        if ("" != $.usernameTextfield.value.trim() && "" != $.passwordTextfield.value.trim()) {
            enteredEmailValue = $.usernameTextfield.value.split("@");
            if (checkemail($.usernameTextfield.value)) if ("ajency.in" === enteredEmailValue[1] || "ascotwm.com" === enteredEmailValue[1]) if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else if (localStorage.getOrganizationId()) if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) {
                var organizationDetails = dbOperations.getOrganizationRow(localStorage.getOrganizationId());
                organizationDetails[0].domainName === enteredEmailValue[1] ? login() : alert("Sorry your organization is not registered");
            } else login(); else login(); else {
                alert("Sorry your organization is not registered");
                $.loginButton.enabled = true;
            } else alert("Please enter a valid email");
        } else {
            alert("Username/Password are required");
            $.loginButton.enabled = true;
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
            if (e.success) updateCreditDate(); else {
                hideImageView();
                clearInterval(loaderAnimate);
                localStorage.saveErrorAtIndex("subscribeToPendingChannel");
                showConnectionErrorView();
            }
        });
    }
    function subscribeToChannel() {
        var organizationDetails = dbOperations.getOrganizationRow(localStorage.getOrganizationId());
        var pushChannel = organizationDetails[0].organizationPushChannel;
        Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: pushChannel,
            type: "android"
        }, function(e) {
            if (e.success) if ("cook" === dbOperations.getUserRole(localStorage.getLastLoggedInUserId())) {
                console.log("cook id");
                subscribeToPendingChannel();
            } else updateCreditDate(); else {
                hideImageView();
                clearInterval(loaderAnimate);
                localStorage.saveErrorAtIndex("subscribeToChannel");
                showConnectionErrorView();
                console.log("SUBSCRIBE CHANNEL");
            }
        });
    }
    function checkemail(emailAddress) {
        var str = emailAddress;
        var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        testresults = filter.test(str) ? true : false;
        return testresults;
    }
    function doNavigation() {
        console.log("In do navigation");
        var result = dbOperations.ifTableExists();
        if (result.isValidRow()) {
            var totalUsers = dbOperations.getCount();
            Ti.API.info("Row count: " + totalUsers);
            switch (totalUsers) {
              case 0:
                $.index.open();
                break;

              case 1:
                if (localStorage.getLastLoggedInUserId() && !alloy.Globals.navigatedFromAllProducts) {
                    Alloy.createController("menu", {}).getView().open();
                } else localStorage.getLastLoggedInUserId() || $.index.open();
                break;

              default:
                {
                    Alloy.createController("multiUser", {}).getView().open();
                }
            }
        }
    }
    function deviceTokenSuccess(e) {
        deviceToken = e.deviceToken;
        hideImageView();
        clearInterval(loaderAnimate);
        showComponents();
        localStorage.saveDeviceToken(e.deviceToken);
    }
    function deviceTokenError() {
        alert("Failed to register for push notifications! ");
        Ti.App.fireEvent("pushNotificationRegisterError");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        exitOnClose: true,
        backgroundImage: "/background.jpg",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId51 = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        height: "80%",
        id: "__alloyId51"
    });
    $.__views.index.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "5%",
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.companyLogo = Ti.UI.createImageView({
        image: "/images/tuckshopLogo.png",
        width: "45%",
        height: "29%",
        id: "companyLogo"
    });
    $.__views.__alloyId52.add($.__views.companyLogo);
    $.__views.usernameTextfield = Ti.UI.createTextField({
        backgroundColor: "#FFF",
        color: "#222",
        borderWidth: 1,
        borderColor: "#F0C60A",
        height: "11%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        textAlign: "center",
        width: "90%",
        left: "5%",
        right: "5%",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        top: "4%",
        id: "usernameTextfield",
        hintText: "Username"
    });
    $.__views.__alloyId52.add($.__views.usernameTextfield);
    $.__views.passwordTextfield = Ti.UI.createTextField({
        backgroundColor: "#FFF",
        color: "#222",
        borderWidth: 1,
        borderColor: "#F0C60A",
        height: "11%",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        textAlign: "center",
        width: "90%",
        left: "5%",
        right: "5%",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        passwordMask: true,
        top: "2%",
        id: "passwordTextfield",
        hintText: "Password",
        maxLength: "4"
    });
    $.__views.__alloyId52.add($.__views.passwordTextfield);
    $.__views.animateObject = Ti.UI.createImageView({
        id: "animateObject",
        height: "0",
        width: "0",
        top: "0",
        image: "/images/loader-1.png"
    });
    $.__views.__alloyId52.add($.__views.animateObject);
    $.__views.errorLabel = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        text: "Tap to Retry",
        id: "errorLabel",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.__alloyId52.add($.__views.errorLabel);
    $.__views.loginButton = Ti.UI.createButton({
        width: "90%",
        left: "5%",
        right: "5%",
        color: "#3B0B0B",
        backgroundColor: "#F0C60A",
        title: "Login",
        height: "11%",
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 20,
            fontWeight: "bold"
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
        id: "loginButton",
        top: "4%"
    });
    $.__views.__alloyId52.add($.__views.loginButton);
    loginClicked ? $.__views.loginButton.addEventListener("click", loginClicked) : __defers["$.__views.loginButton!click!loginClicked"] = true;
    $.__views.registerButton = Ti.UI.createButton({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 15
        },
        top: "10%",
        width: "70%",
        left: "15%",
        right: "15%",
        color: "#F0C60A",
        backgroundColor: "#585858",
        title: "New to Tuckshop? Sign up.",
        height: "11%",
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
        id: "registerButton"
    });
    $.__views.__alloyId52.add($.__views.registerButton);
    openRegister ? $.__views.registerButton.addEventListener("click", openRegister) : __defers["$.__views.registerButton!click!openRegister"] = true;
    $.__views.__alloyId53 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        bottom: 0,
        height: "20%",
        id: "__alloyId53"
    });
    $.__views.index.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        image: "/images/footer.png",
        id: "__alloyId54"
    });
    $.__views.__alloyId53.add($.__views.__alloyId54);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var alloy = require("alloy");
    require("platformSupport");
    require("animation");
    var enteredEmailValue;
    var moment = require("alloy/moment");
    var day;
    var totalSum;
    var loaderAnimate;
    var localStorage = require("/localStorage");
    var networkCheck = require("/networkCheck");
    var fetchProductsJs = require("/fetchCloudProducts");
    var loaderIndex = 1;
    var showImageView = function() {
        $.animateObject.height = 96;
        $.animateObject.width = 96;
    };
    var hideImageView = function() {
        $.animateObject.height = 0;
        $.animateObject.width = 0;
    };
    var showComponents = function() {
        $.passwordTextfield.visible = true;
        $.usernameTextfield.visible = true;
        $.loginButton.visible = true;
        $.registerButton.visible = true;
    };
    var hideComponents = function() {
        $.passwordTextfield.visible = false;
        $.usernameTextfield.visible = false;
        $.loginButton.visible = false;
        $.registerButton.visible = false;
    };
    var showConnectionErrorView = function() {
        $.errorLabel.height = "15%";
        $.errorLabel.width = "30%";
    };
    if (localStorage.getOrganizationId() && dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) {
        var organizationDetails = dbOperations.getOrganizationRow(localStorage.getOrganizationId());
        $.companyLogo.image = organizationDetails[0].organization_logo;
    }
    if (localStorage.getErrorAtIndex()) {
        $.index.open();
        hideComponents();
        showConnectionErrorView();
    } else doNavigation();
    $.errorLabel.addEventListener("click", function() {
        if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else {
            showImageView();
            loaderAnimate = setInterval(loadingAnimation, 200);
            hideConnectionErrorView();
            "updateCreditDate" === localStorage.getErrorAtIndex() ? updateCreditDate() : "updateCreditAmount" === localStorage.getErrorAtIndex() ? updateCreditAmount() : "removeCarryForward" === localStorage.getErrorAtIndex() ? removeCarryForward(totalSum) : "deviceTokenError" === localStorage.getErrorAtIndex() ? CloudPush.retrieveDeviceToken({
                success: deviceTokenSuccess,
                error: deviceTokenError
            }) : "updateLastMailDate" === localStorage.getErrorAtIndex() ? updateLastMailDate() : "updateDeviceToken" === localStorage.getErrorAtIndex() ? updateDeviceToken() : "subscribeToChannel" === localStorage.getErrorAtIndex() ? subscribeToChannel() : "subscribeToPendingChannel" === localStorage.getErrorAtIndex() ? subscribeToPendingChannel() : "organizationData" === localStorage.getErrorAtIndex() ? organizationData() : "fetchCategories" === localStorage.getErrorAtIndex() ? fetchProductsJs.fetchCategories("menu") : "fetchCloudProducts" === localStorage.getErrorAtIndex() ? fetchProductsJs.fetchCloudProducts("menu") : "transactionsOnProductIds" === localStorage.getErrorAtIndex() ? fetchProductsJs.transactionsOnProductIds("menu") : "transactionsOnProductIdsGreaterThanThousand" === localStorage.getErrorAtIndex() ? fetchProductsJs.transactionsOnProductIdsGreaterThanThousand("menu") : "pushRegisterError" === localStorage.getErrorAtIndex() && CloudPush.retrieveDeviceToken({
                success: deviceTokenSuccess,
                error: deviceTokenError
            });
            Ti.App.Properties.removeProperty("errorAtIndex");
        }
    });
    var hideConnectionErrorView = function() {
        $.errorLabel.height = 0;
        $.errorLabel.width = 0;
    };
    Ti.App.addEventListener("errorIndex", function(data) {
        console.log("Error event fired");
        hideImageView();
        clearInterval(loaderAnimate);
        localStorage.saveErrorAtIndex(data.name);
        showConnectionErrorView();
    });
    0 != Object.keys(args).length ? $.usernameTextfield.value = args.title : localStorage.getUserName() && ($.usernameTextfield.value = localStorage.getUserName());
    $.passwordTextfield.addEventListener("return", function() {
        loginClicked();
    });
    var updateCreditDate = function() {
        totalSum = 0;
        createdDateValue = day.add("months", 1);
        Ti.API.info("Created Date:::\n" + moment(createdDateValue).format());
        Ti.API.info("Minutes remaining:::\n" + moment().diff(createdDateValue, "minutes"));
        if (moment().diff(createdDateValue, "minutes") > 0) Cloud.Users.update({
            custom_fields: {
                credited_date_at: moment(createdDateValue).format()
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                _.each(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()), function(item) {
                    totalSum += parseFloat(item.productPrice);
                });
                console.log("The Sum after a month");
                console.log(totalSum);
                dbOperations.updateCreditDate(user.id, user.custom_fields.credited_date_at);
                0 > totalSum ? updateCreditAmount() : removeCarryForward(totalSum);
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                localStorage.saveErrorAtIndex("updateCreditDate");
                showConnectionErrorView();
                console.log("UPDATE CREDIT DATE");
            }
        }); else if (localStorage.getAllProducts() || alloy.Globals.pushNotificationReceived) {
            Ti.App.fireEvent("destroy:menu:instance");
            {
                Alloy.createController("menu", {}).getView().open();
            }
            hideImageView();
            clearInterval(loaderAnimate);
        } else fetchProductsJs.fetchCategories("menu");
    };
    var removeCarryForward = function(totalSum) {
        Cloud.Objects.create({
            classname: "testItems",
            fields: {
                productName: "Debit balance",
                productPrice: -totalSum,
                productId: 1010,
                userId: localStorage.getUserId()
            }
        }, function(e) {
            if (e.success) {
                console.log("Amount carry forward in index");
                {
                    e.testItems[0];
                }
                dbOperations.saveTransactionRows(e.testItems);
                updateCreditAmount();
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                localStorage.saveErrorAtIndex("removeCarryForward");
                showConnectionErrorView();
                console.log("CARRY FORWARD AMOUNT");
            }
        });
    };
    var updateCreditAmount = function() {
        Cloud.Objects.create({
            classname: "testItems",
            fields: {
                productName: "Credit",
                productPrice: 500,
                productId: 1010,
                userId: localStorage.getUserId()
            }
        }, function(e) {
            if (e.success) {
                console.log("Amount credited in index");
                {
                    e.testItems[0];
                }
                dbOperations.saveTransactionRows(e.testItems);
                if (localStorage.getAllProducts()) {
                    {
                        Alloy.createController("menu", {}).getView().open();
                    }
                    hideImageView();
                    clearInterval(loaderAnimate);
                } else fetchProductsJs.fetchCategories("menu");
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                localStorage.saveErrorAtIndex("updateCreditAmount");
                showConnectionErrorView();
                console.log("UPDATE CREDIT AMOUNT");
            }
        });
    };
    Ti.App.addEventListener("pushNotificationRegisterError", function() {
        localStorage.saveErrorAtIndex("pushRegisterError");
        showConnectionErrorView();
        hideComponents();
    });
    $.index.addEventListener("android:back", function() {
        if (0 != Object.keys(args).length) {
            var totalUsers = dbOperations.getCount();
            if (1 === totalUsers) $.index.close(); else if (totalUsers > 1) {
                Alloy.createController("multiUser", {}).getView().open();
            }
        } else $.index.close();
    });
    $.index.addEventListener("close", function() {
        $.destroy();
        $.off();
        $.index.close();
    });
    __defers["$.__views.loginButton!click!loginClicked"] && $.__views.loginButton.addEventListener("click", loginClicked);
    __defers["$.__views.registerButton!click!openRegister"] && $.__views.registerButton.addEventListener("click", openRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;