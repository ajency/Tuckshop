function Controller() {
    function openRegister() {
        $.index.close();
        $.index = null;
        var contentView = Alloy.createController("register").getView();
        myAnimation.in(contentView);
    }
    function loginClicked() {
        Alloy.Globals.showIndicator();
        $.loginButton.enabled = false;
        Cloud.Users.login({
            login: $.usernameTextfield.value,
            password: $.passwordTextfield.value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                Ti.App.Properties.setString("username", $.usernameTextfield.value);
                Ti.App.Properties.setString("userid", user.id);
                Ti.API.info("test credited date:::\n" + user.custom_fields.credited_date_at);
                day = moment(user.custom_fields.credited_date_at);
                updateCreditDate();
                if (Ti.App.Properties.getObject("juiceResponse")) {
                    Alloy.createController("main", {}).getView().open();
                    Alloy.Globals.hideIndicator();
                } else {
                    subscribeToChannel();
                    var fetchProductsJs = require("/fetchCloudProducts");
                    fetchProductsJs.fetchCloudProducts("main");
                }
            } else {
                Alloy.Globals.hideIndicator();
                alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            }
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
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId29 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#50a0be",
        top: 0,
        id: "__alloyId29"
    });
    $.__views.index.add($.__views.__alloyId29);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId29.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Login"
    });
    $.__views.AppWrapper.add($.__views.mainTitle);
    $.__views.registerView = Ti.UI.createScrollView({
        layout: "vertical",
        left: 15,
        right: 15,
        top: 5,
        id: "registerView"
    });
    $.__views.index.add($.__views.registerView);
    $.__views.__alloyId30 = Ti.UI.createLabel({
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
        id: "__alloyId30"
    });
    $.__views.registerView.add($.__views.__alloyId30);
    $.__views.usernameTextfield = Ti.UI.createTextField({
        borderWidth: 1,
        borderColor: "#db6868",
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        id: "usernameTextfield",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        hintText: "User Name"
    });
    $.__views.registerView.add($.__views.usernameTextfield);
    $.__views.__alloyId31 = Ti.UI.createLabel({
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
        id: "__alloyId31"
    });
    $.__views.registerView.add($.__views.__alloyId31);
    $.__views.passwordTextfield = Ti.UI.createTextField({
        borderWidth: 1,
        borderColor: "#db6868",
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        id: "passwordTextfield",
        keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
        hintText: "Password",
        passwordMask: "true",
        maxLength: "4"
    });
    $.__views.registerView.add($.__views.passwordTextfield);
    $.__views.loginButton = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        backgroundColor: "#db6868",
        backgroundSelectedColor: "#b62929",
        borderColor: "#b62929",
        color: "#FFF",
        backgroundImage: "null",
        selectedColor: "#AAA",
        top: 100,
        width: "98%",
        left: "1%",
        right: "1%",
        id: "loginButton",
        title: " Login "
    });
    $.__views.registerView.add($.__views.loginButton);
    loginClicked ? $.__views.loginButton.addEventListener("click", loginClicked) : __defers["$.__views.loginButton!click!loginClicked"] = true;
    $.__views.registerButton = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        backgroundColor: "#db6868",
        backgroundSelectedColor: "#b62929",
        borderColor: "#b62929",
        color: "#FFF",
        backgroundImage: "null",
        selectedColor: "#AAA",
        top: 100,
        width: "98%",
        left: "1%",
        right: "1%",
        id: "registerButton",
        title: "New User Registration "
    });
    $.__views.registerView.add($.__views.registerButton);
    openRegister ? $.__views.registerButton.addEventListener("click", openRegister) : __defers["$.__views.registerButton!click!openRegister"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("platformSupport");
    var myAnimation = require("animation");
    var moment = require("alloy/moment");
    var day;
    if (Ti.App.Properties.getString("username")) {
        $.usernameTextfield.value = Ti.App.Properties.getString("username");
        $.passwordTextfield.focus();
    }
    var updateCreditDate = function() {
        createdDateValue = day.add("months", 1);
        Ti.API.info("Created Date:::\n" + moment(createdDateValue).format());
        Ti.API.info("Minutes remaining:::\n" + moment().diff(createdDateValue, "minutes"));
        moment().diff(createdDateValue, "minutes") > 0 && Cloud.Users.update({
            custom_fields: {
                credited_date_at: moment(createdDateValue).format()
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                updateCreditAmount();
                alert("Success:\nid: " + user.id + "\n" + "credited date: " + user.credited_date_at);
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
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
    $.index.open();
    __defers["$.__views.loginButton!click!loginClicked"] && $.__views.loginButton.addEventListener("click", loginClicked);
    __defers["$.__views.registerButton!click!openRegister"] && $.__views.registerButton.addEventListener("click", openRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;