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
    function registration() {
        $.usernameTextfield.blur();
        $.passwordTextfield.blur();
        showImageView();
        loaderAnimate = setInterval(loadingAnimation, 200);
        hideComponents();
        "ajency.in" === enteredEmailValue[1] ? localStorage.saveOrganizationId(1) : "ascotwm.com" === enteredEmailValue[1] && localStorage.saveOrganizationId(2);
        Cloud.Users.create({
            username: $.usernameTextfield.value,
            password: $.passwordTextfield.value,
            password_confirmation: $.passwordTextfield.value,
            custom_fields: {
                credited_date_at: moment().format(),
                organizationId: localStorage.getOrganizationId(),
                last_mail_date: moment().format(),
                device_token: deviceToken
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                dbOperations.insertRow(user.id, $.usernameTextfield.value, false, e.meta.session_id, user.custom_fields.credited_date_at, user.custom_fields.organizationId, 1, "daily", user.custom_fields.last_mail_date, user.admin, "consumer");
                localStorage.saveUserId(user);
                localStorage.saveUserName($.usernameTextfield.value);
                localStorage.saveDisplayName(enteredEmailValue[0]);
                dbOperations.checkOrganizationPresent(localStorage.getOrganizationId()) ? updateCreditAmount() : organizationData();
            } else {
                hideImageView();
                showComponents();
                clearInterval(loaderAnimate);
                alert(400 == e.code ? "Username is already taken" : "Could not connect to server. Try again ");
            }
        });
    }
    function registerClicked() {
        if ("" != $.usernameTextfield.value.trim() && "" != $.passwordTextfield.value.trim()) {
            enteredEmailValue = $.usernameTextfield.value.split("@");
            if (checkemail($.usernameTextfield.value)) if ("ajency.in" === enteredEmailValue[1] || "ascotwm.com" === enteredEmailValue[1]) if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) alert("No Internet Connection"); else if (localStorage.getOrganizationId()) if (dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) {
                var organizationDetails = dbOperations.getOrganizationRow(localStorage.getOrganizationId());
                organizationDetails[0].domainName === enteredEmailValue[1] ? registration() : alert("Sorry your organization is not registered");
            } else registration(); else registration(); else alert("Sorry your organization is not registered"); else alert("Please enter a valid email");
        } else alert("All fields are required");
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
                updateCreditAmount();
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                type = "organizationData";
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
            type: "ios"
        }, function(e) {
            if (e.success) {
                var fetchProductsJs = require("/fetchCloudProducts");
                fetchProductsJs.fetchCategories("index");
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                type = "subscribeToChannel";
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
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
    $.__views.registerWindow = Ti.UI.createWindow({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        backgroundImage: "/background.jpg",
        id: "registerWindow"
    });
    $.__views.registerWindow && $.addTopLevelView($.__views.registerWindow);
    $.__views.__alloyId32 = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        height: "80%",
        id: "__alloyId32"
    });
    $.__views.registerWindow.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "5%",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createImageView({
        image: "/images/tuckshopLogo.png",
        width: "45%",
        height: "29%",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 22,
            fontWeight: "bold"
        },
        textAlign: "center",
        width: Ti.UI.FILL,
        color: "#3B0B0B",
        text: "Create my account",
        top: "5.5%",
        id: "__alloyId35"
    });
    $.__views.__alloyId33.add($.__views.__alloyId35);
    $.__views.usernameTextfield = Ti.UI.createTextField({
        backgroundColor: "#FFF",
        color: "#222",
        borderWidth: 1,
        borderColor: "#F0C60A",
        height: "11%",
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        textAlign: "center",
        width: "90%",
        left: "5%",
        right: "5%",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        top: "4%",
        id: "usernameTextfield",
        hintText: "Organization email id"
    });
    $.__views.__alloyId33.add($.__views.usernameTextfield);
    $.__views.passwordTextfield = Ti.UI.createTextField({
        backgroundColor: "#FFF",
        color: "#222",
        borderWidth: 1,
        borderColor: "#F0C60A",
        height: "11%",
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        textAlign: "center",
        width: "90%",
        left: "5%",
        right: "5%",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        top: "2%",
        id: "passwordTextfield",
        hintText: "Password",
        maxLength: "4"
    });
    $.__views.__alloyId33.add($.__views.passwordTextfield);
    $.__views.animateObject = Ti.UI.createImageView({
        id: "animateObject",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.__alloyId33.add($.__views.animateObject);
    $.__views.registerErrorLabel = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 15,
            fontWeight: "bold"
        },
        text: "Tap to Retry",
        id: "registerErrorLabel",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.__alloyId33.add($.__views.registerErrorLabel);
    $.__views.signUpButton = Ti.UI.createButton({
        width: "90%",
        left: "5%",
        right: "5%",
        color: "#3B0B0B",
        backgroundColor: "#F0C60A",
        title: "Sign up",
        height: "11%",
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 20,
            fontWeight: "bold"
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
        id: "signUpButton",
        top: "2%"
    });
    $.__views.__alloyId33.add($.__views.signUpButton);
    registerClicked ? $.__views.signUpButton.addEventListener("click", registerClicked) : __defers["$.__views.signUpButton!click!registerClicked"] = true;
    $.__views.backIcon = Ti.UI.createButton({
        color: "#3B0B0B",
        id: "backIcon",
        top: "2%",
        left: "42.5%",
        backgroundImage: "/images/left_arrow.png",
        height: "10%",
        width: "15%"
    });
    $.__views.__alloyId33.add($.__views.backIcon);
    closeWindow ? $.__views.backIcon.addEventListener("click", closeWindow) : __defers["$.__views.backIcon!click!closeWindow"] = true;
    $.__views.__alloyId36 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        bottom: 0,
        height: "20%",
        id: "__alloyId36"
    });
    $.__views.registerWindow.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        image: "/images/footer.png",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    require("platformSupport");
    require("animation");
    var enteredEmailValue;
    var type;
    var moment = require("alloy/moment");
    var loaderAnimate;
    var closeWindow = function() {
        var index = Alloy.createController("index", {}).getView();
        index.open();
    };
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
        $.signUpButton.visible = true;
        $.backIcon.visible = true;
    };
    var hideComponents = function() {
        $.passwordTextfield.visible = false;
        $.usernameTextfield.visible = false;
        $.signUpButton.visible = false;
        $.backIcon.visible = false;
    };
    var showConnectionErrorView = function() {
        $.registerErrorLabel.height = "15%";
        $.registerErrorLabel.width = "30%";
    };
    $.registerErrorLabel.addEventListener("click", function() {
        if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else {
            showImageView();
            loaderAnimate = setInterval(loadingAnimation, 200);
            hideConnectionErrorView();
            "autoLogin" === type ? autoLogin() : "organizationData" === type ? organizationData() : "updateCreditAmount" === type ? updateCreditAmount() : "subscribeToChannel" === type ? subscribeToChannel() : "fetchCategories" === type ? fetchProductsJs.fetchCategories("index") : "fetchCloudProducts" === type ? fetchProductsJs.fetchCloudProducts("index") : "transactionsOnProductIds" === type ? fetchProductsJs.transactionsOnProductIds("index") : "transactionsOnProductIdsGreaterThanThousand" === type && fetchProductsJs.transactionsOnProductIdsGreaterThanThousand("index");
        }
    });
    var hideConnectionErrorView = function() {
        $.registerErrorLabel.height = 0;
        $.registerErrorLabel.width = 0;
    };
    Ti.App.addEventListener("errorOnRegister", function(data) {
        console.log("Error event fired register");
        hideImageView();
        clearInterval(loaderAnimate);
        type = data.name;
        showConnectionErrorView();
    });
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
                {
                    e.testItems[0];
                }
                if (localStorage.getAllProducts()) {
                    var index = Alloy.createController("index", {}).getView();
                    index.open();
                } else subscribeToChannel();
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                type = "updateCreditAmount";
                showConnectionErrorView();
                console.log("REGSITER USER");
            }
        });
    };
    __defers["$.__views.signUpButton!click!registerClicked"] && $.__views.signUpButton.addEventListener("click", registerClicked);
    __defers["$.__views.backIcon!click!closeWindow"] && $.__views.backIcon.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;