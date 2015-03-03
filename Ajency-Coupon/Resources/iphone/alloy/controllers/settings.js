function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function populateStates(boolValue) {
        console.log("populate called");
        console.log(boolValue);
        switch (boolValue) {
          case 0:
            $.mailSwitch.value = false;
            $.dailyWeeklySwitch.touchEnabled = false;
            "daily" === dailyWeeklySwitchValue ? $.dailyWeeklySwitch.value = true : "weekly" === dailyWeeklySwitchValue && ($.dailyWeeklySwitch.value = false);
            $.dailyWeeklyView.touchEnabled = false;
            $.dailyWeeklyView.opacity = .5;
            break;

          case 1:
            $.mailSwitch.value = true;
            $.dailyWeeklySwitch.touchEnabled = true;
            "daily" === dailyWeeklySwitchValue ? $.dailyWeeklySwitch.value = true : "weekly" === dailyWeeklySwitchValue && ($.dailyWeeklySwitch.value = false);
            $.dailyWeeklyView.touchEnabled = true;
            $.dailyWeeklyView.opacity = 1;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
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
    $.__views.settings = Ti.UI.createView({
        layout: "vertical",
        id: "settings"
    });
    $.__views.settings && $.addTopLevelView($.__views.settings);
    $.__views.__alloyId64 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "70",
        id: "__alloyId64"
    });
    $.__views.settings.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        left: "10%",
        text: "Mails",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.mailSwitch = Ti.UI.createSwitch({
        right: "15%",
        value: false,
        id: "mailSwitch"
    });
    $.__views.__alloyId64.add($.__views.mailSwitch);
    $.__views.__alloyId66 = Ti.UI.createView({
        bottom: "0%",
        width: Ti.UI.FILL,
        height: "0.8",
        backgroundColor: "#F0C60A",
        id: "__alloyId66"
    });
    $.__views.__alloyId64.add($.__views.__alloyId66);
    $.__views.dailyWeeklyView = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "dailyWeeklyView",
        height: "70",
        visible: "false"
    });
    $.__views.settings.add($.__views.dailyWeeklyView);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        left: "10%",
        text: "Weekly",
        id: "__alloyId67"
    });
    $.__views.dailyWeeklyView.add($.__views.__alloyId67);
    $.__views.dailyWeeklySwitch = Ti.UI.createSwitch({
        value: true,
        id: "dailyWeeklySwitch",
        left: "45%",
        titleOn: "Daily",
        titleOff: "Weekly"
    });
    $.__views.dailyWeeklyView.add($.__views.dailyWeeklySwitch);
    $.__views.__alloyId68 = Ti.UI.createLabel({
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        right: "15%",
        text: "Daily",
        id: "__alloyId68"
    });
    $.__views.dailyWeeklyView.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
        bottom: "0%",
        width: Ti.UI.FILL,
        height: "0.8",
        backgroundColor: "#F0C60A",
        id: "__alloyId69"
    });
    $.__views.dailyWeeklyView.add($.__views.__alloyId69);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var mailStatus = dbOperations.getMailStatus(localStorage.getLastLoggedInUserId());
    var mailSwitchValue = mailStatus.mails;
    var dailyWeeklySwitchValue = mailStatus.daily_weekly;
    console.log("Switch values");
    console.log(mailSwitchValue);
    console.log(dailyWeeklySwitchValue);
    populateStates(mailStatus.mails);
    $.mailSwitch.addEventListener("change", function() {
        mailSwitchValue = $.mailSwitch.value ? 1 : 0;
        dbOperations.updateMailStatus(localStorage.getLastLoggedInUserId(), mailSwitchValue, dailyWeeklySwitchValue);
        populateStates(mailSwitchValue);
    });
    $.dailyWeeklySwitch.addEventListener("change", function() {
        dailyWeeklySwitchValue = $.dailyWeeklySwitch.value ? "daily" : "weekly";
        dbOperations.updateMailStatus(localStorage.getLastLoggedInUserId(), mailSwitchValue, dailyWeeklySwitchValue);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;