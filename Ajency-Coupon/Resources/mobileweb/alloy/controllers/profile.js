function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.profileView = Ti.UI.createScrollView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "profileView"
    });
    $.__views.profileView && $.addTopLevelView($.__views.profileView);
    $.__views.contactDeatilTopImage = Ti.UI.createImageView({
        backgroundImage: "/images/blue/profileTop.png",
        width: Ti.UI.FILL,
        height: 100,
        top: 0,
        id: "contactDeatilTopImage"
    });
    $.__views.profileView.add($.__views.contactDeatilTopImage);
    $.__views.__alloyId47 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "-60",
        id: "__alloyId47"
    });
    $.__views.profileView.add($.__views.__alloyId47);
    $.__views.userPhoto = Ti.UI.createImageView({
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#FFF",
        borderWidth: 3,
        borderColor: "#eee",
        id: "userPhoto",
        image: "/images/profile.png"
    });
    $.__views.__alloyId47.add($.__views.userPhoto);
    $.__views.__alloyId48 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        left: 15,
        right: 15,
        id: "__alloyId48"
    });
    $.__views.profileView.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createImageView({
        left: 0,
        top: 15,
        image: "/images/profileIcons/name.png",
        width: "25",
        height: "25",
        id: "__alloyId50"
    });
    $.__views.__alloyId49.add($.__views.__alloyId50);
    $.__views.txtName = Ti.UI.createTextField({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "center",
        width: Ti.UI.SIZE,
        top: 15,
        color: "#878787",
        id: "txtName",
        backgroundImage: "null",
        hintText: "Fullname",
        value: "Johnson James"
    });
    $.__views.__alloyId49.add($.__views.txtName);
    $.__views.__alloyId51 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId51"
    });
    $.__views.__alloyId48.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createImageView({
        left: 0,
        top: 15,
        image: "/images/profileIcons/email.png",
        width: "25",
        height: "25",
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.txtEmail = Ti.UI.createTextField({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "center",
        width: Ti.UI.SIZE,
        top: 15,
        color: "#878787",
        id: "txtEmail",
        backgroundImage: "null",
        hintText: "Email",
        value: "james@gmail.com"
    });
    $.__views.__alloyId51.add($.__views.txtEmail);
    $.__views.__alloyId53 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId53"
    });
    $.__views.__alloyId48.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createImageView({
        left: 0,
        top: 15,
        image: "/images/profileIcons/password.png",
        width: "25",
        height: "25",
        id: "__alloyId54"
    });
    $.__views.__alloyId53.add($.__views.__alloyId54);
    $.__views.txtPassword = Ti.UI.createTextField({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "center",
        width: Ti.UI.SIZE,
        top: 15,
        color: "#878787",
        id: "txtPassword",
        passwordMask: "true",
        backgroundImage: "null",
        hintText: "Password",
        value: "james12345"
    });
    $.__views.__alloyId53.add($.__views.txtPassword);
    $.__views.__alloyId55 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId55"
    });
    $.__views.__alloyId48.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createImageView({
        left: 0,
        top: 15,
        image: "/images/profileIcons/phone.png",
        width: "25",
        height: "25",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.txtPhone = Ti.UI.createTextField({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "center",
        width: Ti.UI.SIZE,
        top: 15,
        color: "#878787",
        id: "txtPhone",
        backgroundImage: "null",
        hintText: "Phone",
        value: "+654545434"
    });
    $.__views.__alloyId55.add($.__views.txtPhone);
    $.__views.__alloyId57 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId57"
    });
    $.__views.__alloyId48.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createImageView({
        left: 0,
        top: 15,
        backgroundImage: "/images/profileIcons/address.png",
        width: "25",
        height: "25",
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.txtAddress = Ti.UI.createTextField({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        left: 0,
        top: 15,
        color: "#878787",
        id: "txtAddress",
        backgroundImage: "null",
        hintText: "Address",
        value: "Blk - 3001, #01-07, Central Road, Yangon Myanmar Contact : 9592502504 ",
        width: "80%"
    });
    $.__views.__alloyId57.add($.__views.txtAddress);
    $.__views.__alloyId59 = Ti.UI.createButton({
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
        title: "Save",
        id: "__alloyId59"
    });
    $.__views.__alloyId48.add($.__views.__alloyId59);
    $.__views.strike1 = Ti.UI.createImageView({
        top: 15,
        bottom: 15,
        width: Ti.UI.FILL,
        left: 20,
        right: 20,
        height: .7,
        image: "/images/strikeDDD.png",
        id: "strike1"
    });
    $.__views.__alloyId48.add($.__views.strike1);
    $.__views.__alloyId60 = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        text: "If you may need for user registration and login process, you may take a look a below.",
        productId: "101",
        color: "#464646",
        id: "__alloyId60"
    });
    $.__views.__alloyId48.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        top: 20,
        bottom: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#50a0be",
        backgroundSelectedColor: "#116686",
        borderColor: "#116686",
        color: "#FFF",
        backgroundImage: "null",
        selectedColor: "#AAA",
        title: "For User Registration ",
        id: "__alloyId61"
    });
    $.__views.__alloyId48.add($.__views.__alloyId61);
    openRegister ? $.__views.__alloyId61.addEventListener("click", openRegister) : __defers["$.__views.__alloyId61!click!openRegister"] = true;
    $.__views.__alloyId62 = Ti.UI.createButton({
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
        title: "For User Login",
        id: "__alloyId62"
    });
    $.__views.__alloyId48.add($.__views.__alloyId62);
    openLogin ? $.__views.__alloyId62.addEventListener("click", openLogin) : __defers["$.__views.__alloyId62!click!openLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    var openRegister = function() {
        var contentView = Alloy.createController("register").getView();
        myAnimation.in(contentView);
    };
    var openLogin = function() {
        var contentView = Alloy.createController("login").getView();
        myAnimation.in(contentView);
    };
    var init = function() {
        var screenWidth = __.getScreenWidth();
        $.profileView.contentWidth = screenWidth;
        $.profileView.width = screenWidth;
        Alloy.isTablet && ($.contactDeatilTopImage.height = 160);
        Ti.Gesture.addEventListener("orientationchange", function() {
            var screenWidth = __.getScreenWidth();
            $.profileView.contentWidth = screenWidth;
            $.profileView.width = screenWidth;
        });
    };
    init();
    __defers["$.__views.__alloyId61!click!openRegister"] && $.__views.__alloyId61.addEventListener("click", openRegister);
    __defers["$.__views.__alloyId62!click!openLogin"] && $.__views.__alloyId62.addEventListener("click", openLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;