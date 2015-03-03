function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "info";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.info = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "info"
    });
    $.__views.info && $.addTopLevelView($.__views.info);
    $.__views.infoView = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        bottom: "46",
        left: 20,
        right: 20,
        top: 0,
        id: "infoView"
    });
    $.__views.info.add($.__views.infoView);
    $.__views.lblDescription = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        text: 'A boutique is a small shopping outlet, especially one that specializes in elite and fashionable items such as clothing and jewelry. The word is French for "shop". The term entered into everyday English use in the late 1960s when, for a brief period, London was the centre of the fashion trade. Carnaby Street and the Kings Road were the focus of much media attention as home to the most fashionable boutiques of the era.',
        id: "lblDescription",
        color: "#464646"
    });
    $.__views.infoView.add($.__views.lblDescription);
    $.__views.lblTremsTitle = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 15,
        text: "Terms and Conditions",
        id: "lblTremsTitle",
        color: "#464646"
    });
    $.__views.infoView.add($.__views.lblTremsTitle);
    $.__views.lblTerms = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        text: "Terms and conditions is an important step in protecting yourself and your company. Terms and conditions can be legally binding. They can protect you and your company from lawsuits and other legal action.",
        id: "lblTerms",
        color: "#464646"
    });
    $.__views.infoView.add($.__views.lblTerms);
    $.__views.lblAddressTitle = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 15,
        text: "Address",
        id: "lblAddressTitle",
        color: "#464646"
    });
    $.__views.infoView.add($.__views.lblAddressTitle);
    $.__views.lblAddress = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        text: "Blk - 3001, #01-07, Central Road, Yangon Myanmar Contact : 9592502504",
        id: "lblAddress",
        color: "#464646"
    });
    $.__views.infoView.add($.__views.lblAddress);
    $.__views.imMap = Ti.UI.createImageView({
        image: "/images/map.png",
        width: 250,
        height: 170,
        id: "imMap"
    });
    $.__views.infoView.add($.__views.imMap);
    $.__views.feedbackView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        bottom: 20,
        id: "feedbackView"
    });
    $.__views.infoView.add($.__views.feedbackView);
    $.__views.__alloyId32 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId32"
    });
    $.__views.feedbackView.add($.__views.__alloyId32);
    openFeedback ? $.__views.__alloyId32.addEventListener("click", openFeedback) : __defers["$.__views.__alloyId32!click!openFeedback"] = true;
    $.__views.lblWriteFeedback = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "right",
        width: Ti.UI.SIZE,
        color: "#50a0be",
        text: "Feedback To Shop",
        id: "lblWriteFeedback"
    });
    $.__views.__alloyId32.add($.__views.lblWriteFeedback);
    $.__views.imWriteReviewIcon = Ti.UI.createImageView({
        width: 20,
        height: 20,
        image: "/images/blue/reviewWriteButton.png",
        id: "imWriteReviewIcon"
    });
    $.__views.__alloyId32.add($.__views.imWriteReviewIcon);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    var openFeedback = function() {
        var contentView = Alloy.createController("feedback").getView();
        myAnimation.in(contentView);
    };
    var init = function() {
        var screenWidth = __.getScreenWidth();
        $.infoView.contentWidth = screenWidth - 40;
        $.infoView.width = screenWidth - 40;
        Ti.include("/data/shopInfoData.js");
        var feedsForInfo = eval("(" + shopInfoJson + ")");
        $.lblDescription.text = feedsForInfo[0].description;
        $.lblTerms.text = feedsForInfo[0].tandc;
        $.lblAddress.text = feedsForInfo[0].address;
        if (Alloy.isTablet) {
            $.lblDescription.top = 30;
            $.addClass($.lblDescription, "p h-size");
            $.lblTerms.top = 15;
            $.addClass($.lblTerms, "p h-size");
            $.lblAddress.top = 15;
            $.addClass($.lblAddress, "p h-size");
            $.lblTremsTitle.top = 50;
            $.addClass($.lblTremsTitle, "p-strong h-size");
            $.lblAddressTitle.top = 50;
            $.addClass($.lblAddressTitle, "p-strong h-size");
            $.imMap.top = 50;
            $.imMap.applyProperties({
                width: 650,
                height: 442
            });
            $.feedbackView.top = 40;
            $.addClass($.lblWriteFeedback, "p h-size");
            Ti.Gesture.addEventListener("orientationchange", function() {
                var screenWidth = __.getScreenWidth();
                $.infoView.contentWidth = screenWidth - 40;
                $.infoView.width = screenWidth - 40;
            });
        }
    };
    init();
    __defers["$.__views.__alloyId32!click!openFeedback"] && $.__views.__alloyId32.addEventListener("click", openFeedback);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;