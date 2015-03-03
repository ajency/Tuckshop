function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "summary";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.summary = Ti.UI.createWindow({
        id: "summary"
    });
    $.__views.summary && $.addTopLevelView($.__views.summary);
    $.__views.__alloyId74 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId74"
    });
    $.__views.summary.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        top: 0,
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        layout: "center",
        top: 15,
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.totalCredit = Ti.UI.createLabel({
        bottom: 20,
        font: {
            fontSize: 21,
            fontWeight: "bold",
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        color: "#878787",
        id: "totalCredit",
        text: "Total Credit: ",
        layout: "center",
        textAlign: "center"
    });
    $.__views.__alloyId76.add($.__views.totalCredit);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;