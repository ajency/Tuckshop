function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function refreshLeftMenu() {
        $.drawerLeftView.removeAllChildren();
        var leftMenu = Alloy.createController("leftMenu").getView();
        $.drawerLeftView.add(leftMenu);
    }
    function destroyMenu() {
        $.destroy();
        $.off();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.__alloyId12 = require("xp.ui").createWindow({
        backgroundColor: "#FFFFFF",
        navBarHidden: true,
        role: "leftWindow",
        id: "__alloyId12"
    });
    $.__views.drawerLeftView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "drawerLeftView"
    });
    $.__views.__alloyId12.add($.__views.drawerLeftView);
    $.__views.__alloyId13 = Ti.UI.createWindow({
        backgroundColor: "#FFFFFF",
        navBarHidden: true,
        role: "centerWindow",
        id: "__alloyId13"
    });
    $.__views.drawerCenterView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "drawerCenterView"
    });
    $.__views.__alloyId13.add($.__views.drawerCenterView);
    $.__views.drawer = Alloy.createWidget("nl.fokkezb.drawer", "widget", {
        exitOnClose: true,
        navBarHidden: true,
        fading: .2,
        parallaxAmount: .2,
        leftDrawerWidth: "280dp",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        shadowWidth: "2dp",
        openDrawerGestureMode: "OPEN_MODE_ALL",
        closeDrawerGestureMode: "CLOSE_MODE_ALL",
        animationMode: "ANIMATION_NONE",
        id: "drawer",
        children: [ $.__views.__alloyId12, $.__views.__alloyId13 ],
        __parentSymbol: __parentSymbol
    });
    $.__views.drawer && $.addTopLevelView($.__views.drawer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    console.log("menu called");
    var mainView = Alloy.createController("main").getView();
    $.drawerCenterView.add(mainView);
    var leftMenuView = Alloy.createController("leftMenu").getView();
    $.drawerLeftView.add(leftMenuView);
    $.drawer.open();
    alloy.Globals.toggleLeft = function() {
        $.drawer.instance.toggleLeftWindow();
    };
    Ti.App.addEventListener("menu:toggleLeftMenu", alloy.Globals.toggleLeft);
    alloy.Globals.navigatePrevious = function(e) {
        e.cancelBubble = true;
        if ($.drawer.instance.isLeftWindowOpen()) $.drawer.instance.toggleLeftWindow(); else {
            var currentView = alloy.Globals.navigatedView;
            console.log("current view");
            console.log(currentView);
            if ("Home" === currentView) ; else if ("Manage Users" === currentView || "Manage Products" === currentView) {
                alloy.Globals.navigatedView = "Manage";
                var evtData = {
                    id: "Manage"
                };
                Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            } else if ("UserList" === currentView) {
                alloy.Globals.navigatedView = "Manage Users";
                var evtData = {
                    id: "Manage Users"
                };
                Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            } else if ("Product Transaction" === currentView) {
                alloy.Globals.navigatedView = "Manage Products";
                var evtData = {
                    id: "Manage Products"
                };
                Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            } else {
                alloy.Globals.navigatedView = "Home";
                var evtData = {
                    id: "Home"
                };
                Ti.App.fireEvent("app:addViewToMidContainer", evtData);
                refreshLeftMenu();
            }
        }
    };
    Ti.App.addEventListener("screen:back", alloy.Globals.navigatePrevious);
    Ti.App.addEventListener("destroy:menu:instance", destroyMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;