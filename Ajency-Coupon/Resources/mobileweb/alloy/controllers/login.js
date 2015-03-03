function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.__alloyId33 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#50a0be",
        top: 0,
        id: "__alloyId33"
    });
    $.__views.login.add($.__views.__alloyId33);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId33.add($.__views.AppWrapper);
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
    $.__views.login.add($.__views.registerView);
    $.__views.__alloyId34 = Ti.UI.createLabel({
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
        text: "Email",
        color: "#464646",
        id: "__alloyId34"
    });
    $.__views.registerView.add($.__views.__alloyId34);
    $.__views.txtSearch = Ti.UI.createTextField({
        borderWidth: 1,
        borderColor: "#50a0be",
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        id: "txtSearch",
        hintText: "Email"
    });
    $.__views.registerView.add($.__views.txtSearch);
    $.__views.__alloyId35 = Ti.UI.createLabel({
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
        id: "__alloyId35"
    });
    $.__views.registerView.add($.__views.__alloyId35);
    $.__views.txtSearch = Ti.UI.createTextField({
        borderWidth: 1,
        borderColor: "#50a0be",
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        id: "txtSearch",
        hintText: "Password",
        passwordMask: "true"
    });
    $.__views.registerView.add($.__views.txtSearch);
    $.__views.__alloyId36 = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        backgroundColor: "#50a0be",
        backgroundSelectedColor: "#116686",
        borderColor: "#116686",
        color: "#FFF",
        backgroundImage: "null",
        selectedColor: "#AAA",
        top: 20,
        bottom: 10,
        width: "98%",
        left: "1%",
        right: "1%",
        title: " Login ",
        id: "__alloyId36"
    });
    $.__views.registerView.add($.__views.__alloyId36);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var closeWindow = function() {
        myAnimation.out($.login);
    };
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.btnIcon!click!closeWindow"] && $.__views.btnIcon.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;