function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stocks";
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
    $.__views.scrollView = Ti.UI.createView({
        layout: "vertical",
        id: "scrollView"
    });
    $.__views.scrollView && $.addTopLevelView($.__views.scrollView);
    $.__views.topView = Ti.UI.createView({
        layout: "vertical",
        id: "topView",
        height: "50%"
    });
    $.__views.scrollView.add($.__views.topView);
    $.__views.bottomView = Ti.UI.createView({
        layout: "vertical",
        id: "bottomView",
        height: "50%"
    });
    $.__views.scrollView.add($.__views.bottomView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy");
    require("/localStorage");
    arguments[0] || {};
    var topMargin;
    var heightValue;
    topMargin = "5%";
    heightValue = "30%";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;