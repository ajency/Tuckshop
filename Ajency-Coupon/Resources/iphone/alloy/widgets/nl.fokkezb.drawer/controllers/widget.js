function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.drawer/" + s : s.substring(0, index) + "/nl.fokkezb.drawer/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    new (require("alloy/widget"))("nl.fokkezb.drawer");
    this.__widgetId = "nl.fokkezb.drawer";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.module = require("dk.napp.drawer");
    args.children && _.each(args.children, function(child) {
        if (!child) return;
        var role = child.role;
        role && (args[role] = child);
    });
    _.each([ "closeDrawerGestureMode", "openDrawerGestureMode", "centerHiddenInteractionMode", "animationMode", "statusBarStyle" ], function(arg) {
        args[arg] && "string" == typeof args[arg] && (args[arg] = $.module[args[arg]]);
    });
    delete args.id;
    delete args.__parentSymbol;
    delete args.children;
    $.instance = $.module.createDrawer(args);
    $.addTopLevelView($.instance);
    _.each([ "centerWindow", "leftWindow", "rightWindow", "closeDrawerGestureMode", "openDrawerGestureMode", "leftDrawerWidth", "rightDrawerWidth", "orientationModes", "centerHiddenInteractionMode", "animationMode", "animationVelocity", "showShadow", "shadowWidth", "shouldStretchDrawer", "fading", "parallaxAmount", "statusBarStyle" ], function(key) {
        var cc = key[0].toUpperCase() + key.substring(1);
        var get = exports["get" + cc] || ($["get" + cc] = function() {
            return $.instance[key];
        });
        var set = exports["set" + cc] || ($["set" + cc] = function(val) {
            $.instance[key] = val;
        });
        Object.defineProperty($, key, {
            get: get,
            set: set
        });
    });
    _.each([ "toggleLeftWindow", "toggleRightWindow", "bounceLeftWindow", "bounceRightWindow", "isAnyWindowOpen", "isLeftWindowOpen", "isRightWindowOpen", "open" ], function(fn) {
        exports[fn] || (exports[fn] = function() {
            return $.instance[fn]();
        });
    });
    exports.on = function(event, callback) {
        return $.instance.addEventListener(event, callback);
    };
    exports.off = function(event, callback) {
        return $.instance.removeEventListener(event, callback);
    };
    exports.trigger = function(event) {
        return $.instance.fireEvent(event, callback, context);
    };
    exports.addEventListener = exports.on;
    exports.removeEventListener = exports.off;
    exports.fireEvent = exports.trigger;
    exports.closeLeftWindow = function() {
        if ($.instance.isLeftWindowOpen()) return $.instance.toggleLeftWindow();
    };
    exports.closeRightWindow = function() {
        if ($.instance.isRightWindowOpen()) return $.instance.toggleRightWindow();
    };
    exports.openLeftWindow = function() {
        if (!$.instance.isLeftWindowOpen()) return $.instance.toggleLeftWindow();
    };
    exports.openRightWindow = function() {
        if (!$.instance.isRightWindowOpen()) return $.instance.toggleRightWindow();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;