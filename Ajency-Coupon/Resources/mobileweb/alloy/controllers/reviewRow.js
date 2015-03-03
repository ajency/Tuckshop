function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "reviewRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.reviewRow = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 15,
        id: "reviewRow"
    });
    $.__views.reviewRow && $.addTopLevelView($.__views.reviewRow);
    $.__views.imReviewer = Ti.UI.createImageView({
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        borderRadius: 25,
        id: "imReviewer"
    });
    $.__views.reviewRow.add($.__views.imReviewer);
    $.__views.__alloyId71 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: 0,
        left: "60",
        id: "__alloyId71"
    });
    $.__views.reviewRow.add($.__views.__alloyId71);
    $.__views.lblReviewer = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        color: "#878787",
        text: "Kim Tae-hee",
        id: "lblReviewer"
    });
    $.__views.__alloyId71.add($.__views.lblReviewer);
    $.__views.lblReview = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        color: "#878787",
        text: "If you are looking for some of plan, I do believe this Chiffon Women S Summer Casual Dress is a excellent preference for your design plan future, sodon’t miss to check out the main posting.",
        id: "lblReview"
    });
    $.__views.__alloyId71.add($.__views.lblReview);
    $.__views.lblReviewTime = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        top: 0,
        color: "#878787",
        text: "2 min ago",
        id: "lblReviewTime"
    });
    $.__views.__alloyId71.add($.__views.lblReviewTime);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var init = function() {
        $.imReviewer.backgroundImage = args.imagePath;
        $.lblReviewer.text = args.name;
        $.lblReview.text = args.description;
        $.lblReviewTime.text = args.time;
    };
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;