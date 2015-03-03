function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getDeviceType() {
        if (Alloy.isTablet) {
            rowHeight = 150;
            rowTop = 12.6;
            separatorViewDistance = 30;
            separatorHeight = 1.8;
        } else {
            rowHeight = 90;
            rowTop = 21;
            separatorViewDistance = 18;
            separatorHeight = 1.08;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "adminMainView";
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
    $.__views.adminMainView = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "adminMainView"
    });
    $.__views.adminMainView && $.addTopLevelView($.__views.adminMainView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    var args = arguments[0] || {};
    var rowTop;
    var separatorViewDistance;
    var separatorHeight;
    if ("admin" === args) var options = [ "Manage Users", "Manage Products" ]; else if ("stock" === args) var options = [ "Add Stock", "Remove Stock" ];
    getDeviceType();
    var isOdd = function(no) {
        return no % 2 ? true : false;
    };
    var createRow = function() {
        var view = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: rowHeight,
            top: rowTop
        });
        return view;
    };
    var getGrid = function(position, data) {
        var view = Ti.UI.createView({
            touchEnabled: true,
            layout: "vertical",
            width: "50%",
            height: "100%",
            id: data
        });
        0 === position ? view.setLeft(0) : view.setRight(0);
        var label = Ti.UI.createLabel({
            touchEnabled: false,
            height: "100%",
            width: "50%",
            textAlign: "center",
            color: "#000000",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 20
            },
            text: data
        });
        view.add(label);
        view.addEventListener("click", function(e) {
            var evtData = {
                id: e.source.id
            };
            alloy.Globals.navigatedView = evtData.id;
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
        });
        return view;
    };
    var verticalSeparator = function() {
        var view = Ti.UI.createView({
            layout: "vertical",
            backgroundColor: "#F0C60A",
            height: "100%",
            width: "0.3%",
            align: "center"
        });
        return view;
    };
    var horizontalSeparator = function() {
        var view = Ti.UI.createView({
            backgroundColor: "#F0C60A",
            height: separatorHeight,
            width: "85%",
            top: separatorViewDistance
        });
        return view;
    };
    var bottomView = function() {
        var view = Ti.UI.createView({
            height: separatorViewDistance,
            width: "100%",
            top: "0%"
        });
        return view;
    };
    init = function() {
        var outerRow, leftGrid, rightGrid = null;
        for (var i = 0; len = options.length, len > i; i++) {
            var grid = i + 1;
            if (isOdd(grid)) {
                outerRow = createRow();
                if (1 === grid) {
                    leftGrid = getGrid(0, options[i]);
                    outerRow.add(leftGrid);
                    1 === len && $.adminMainView.add(outerRow);
                } else {
                    $.adminMainView.add(horizontalSeparator());
                    leftGrid = getGrid(0, options[i]);
                    outerRow.add(leftGrid);
                    grid === len && $.adminMainView.add(outerRow);
                }
            } else {
                outerRow.add(verticalSeparator());
                rightGrid = getGrid(1, options[i]);
                outerRow.add(rightGrid);
                $.adminMainView.add(outerRow);
                outerRow = null;
            }
            leftGrid = rightGrid = null;
        }
        $.adminMainView.add(bottomView());
    };
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;