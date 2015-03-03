function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "indicator";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.indicator = Ti.UI.createWindow({
        backgroundColor: "transparent",
        zIndex: 5e3,
        id: "indicator"
    });
    $.__views.indicator && $.addTopLevelView($.__views.indicator);
    $.__views.indicatorBack = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            opacity: .8,
            height: "50dp",
            width: "150dp",
            borderRadius: 10,
            backgroundColor: "black"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            opacity: .8,
            height: "70dp",
            width: "170dp",
            borderRadius: 10,
            backgroundColor: "black"
        });
        _.extend(o, {
            id: "indicatorBack"
        });
        return o;
    }());
    $.__views.indicator.add($.__views.indicatorBack);
    $.__views.activityInd = Ti.UI.createActivityIndicator({
        color: "white",
        font: Alloy.Globals.fontLargeBold,
        message: " Loading...",
        zIndex: 10,
        opacity: 1,
        id: "activityInd"
    });
    $.__views.indicator.add($.__views.activityInd);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.indicator.showIndicator = function() {
        try {
            $.indicator.open();
            $.activityInd.show();
        } catch (e) {
            Ti.API.info("Exception in opening indicator");
        }
    };
    $.indicator.hideIndicator = function() {
        try {
            $.activityInd.hide();
            $.indicator.close();
        } catch (e) {
            Ti.API.info("Exception in hiding indicator");
        }
    };
    $.activityInd.show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;