function Controller() {
    function registerClicked() {
        Cloud.Users.create({
            username: $.usernameTextfield.value,
            password: $.passwordTextfield.value,
            password_confirmation: $.confirmpasswordTextfield.value,
            custom_fields: {
                credited_date_at: moment().format()
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                Ti.App.Properties.setString("userid", user.id);
                $.registerWindow.close();
                $.registerWindow = null;
                updateCreditAmount();
                if (Ti.App.Properties.getObject("juiceResponse")) {
                    var index = Alloy.createController("index", {}).getView();
                    index.open();
                } else {
                    subscribeToChannel();
                    var fetchProductsJs = require("/fetchCloudProducts");
                    fetchProductsJs.fetchCloudProducts("index");
                }
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function subscribeToChannel() {
        Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "test",
            type: "ios"
        }, function(e) {
            e.success || alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.registerWindow = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "registerWindow"
    });
    $.__views.registerWindow && $.addTopLevelView($.__views.registerWindow);
    $.__views.__alloyId63 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#50a0be",
        top: 0,
        id: "__alloyId63"
    });
    $.__views.registerWindow.add($.__views.__alloyId63);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId63.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Register"
    });
    $.__views.AppWrapper.add($.__views.mainTitle);
    closeWindow ? $.__views.mainTitle.addEventListener("click", closeWindow) : __defers["$.__views.mainTitle!click!closeWindow"] = true;
    $.__views.btnIcon = Ti.UI.createButton({
        backgroundImage: "/images/back.png",
        backgroundSelectedImage: "/images/back.png",
        width: 20,
        height: 40,
        left: 5,
        id: "btnIcon"
    });
    $.__views.AppWrapper.add($.__views.btnIcon);
    closeWindow ? $.__views.btnIcon.addEventListener("click", closeWindow) : __defers["$.__views.btnIcon!click!closeWindow"] = true;
    $.__views.registerView = Ti.UI.createScrollView({
        layout: "vertical",
        left: 15,
        right: 15,
        top: 5,
        id: "registerView"
    });
    $.__views.registerWindow.add($.__views.registerView);
    $.__views.__alloyId64 = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        top: 15,
        width: "98%",
        left: "1%",
        right: "1%",
        text: "User Name",
        color: "#464646",
        id: "__alloyId64"
    });
    $.__views.registerView.add($.__views.__alloyId64);
    $.__views.usernameTextfield = Ti.UI.createTextField({
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        borderWidth: 1,
        borderColor: "#50a0be",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        id: "usernameTextfield",
        hintText: "User Name"
    });
    $.__views.registerView.add($.__views.usernameTextfield);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        top: 15,
        width: "98%",
        left: "1%",
        right: "1%",
        text: "Password",
        color: "#464646",
        id: "__alloyId65"
    });
    $.__views.registerView.add($.__views.__alloyId65);
    $.__views.passwordTextfield = Ti.UI.createTextField({
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        borderWidth: 1,
        borderColor: "#50a0be",
        id: "passwordTextfield",
        hintText: "Password",
        passwordMask: "true",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        maxLength: "4"
    });
    $.__views.registerView.add($.__views.passwordTextfield);
    $.__views.__alloyId66 = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        top: 15,
        width: "98%",
        left: "1%",
        right: "1%",
        text: "Confirm Password",
        color: "#464646",
        id: "__alloyId66"
    });
    $.__views.registerView.add($.__views.__alloyId66);
    $.__views.confirmpasswordTextfield = Ti.UI.createTextField({
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        borderWidth: 1,
        borderColor: "#50a0be",
        id: "confirmpasswordTextfield",
        hintText: "Confirm Password",
        passwordMask: "true",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        maxLength: "4"
    });
    $.__views.registerView.add($.__views.confirmpasswordTextfield);
    $.__views.__alloyId67 = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        top: 20,
        bottom: 10,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#50a0be",
        backgroundSelectedColor: "#116686",
        borderColor: "#116686",
        color: "#FFF",
        backgroundImage: "null",
        selectedColor: "#AAA",
        title: " Register ",
        id: "__alloyId67"
    });
    $.__views.registerView.add($.__views.__alloyId67);
    registerClicked ? $.__views.__alloyId67.addEventListener("click", registerClicked) : __defers["$.__views.__alloyId67!click!registerClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var __ = require("platformSupport");
    require("animation");
    var moment = require("alloy/moment");
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var closeWindow = function() {
        var index = Alloy.createController("index", {}).getView();
        index.open();
    };
    var updateCreditAmount = function() {
        Cloud.Objects.create({
            classname: "testItems",
            fields: {
                productName: "Credit",
                productPrice: 500,
                userId: Ti.App.Properties.getString("userid")
            }
        }, function(e) {
            e.success ? e.testItems[0] : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    };
    $.registerWindow.open();
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.btnIcon!click!closeWindow"] && $.__views.btnIcon.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId67!click!registerClicked"] && $.__views.__alloyId67.addEventListener("click", registerClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;