function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "history";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.history = Ti.UI.createWindow({
        id: "history"
    });
    $.__views.history && $.addTopLevelView($.__views.history);
    $.__views.__alloyId20 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId20"
    });
    $.__views.history.add($.__views.__alloyId20);
    $.__views.tabView = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        height: 47,
        width: Ti.UI.FILL,
        backgroundColor: "#C0C0C0",
        id: "tabView"
    });
    $.__views.__alloyId20.add($.__views.tabView);
    $.__views.tabIcons = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 47,
        id: "tabIcons"
    });
    $.__views.tabView.add($.__views.tabIcons);
    $.__views.firstTab = Ti.UI.createView({
        layout: "vertical",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        height: Ti.UI.FILL,
        width: 70,
        cIndex: "0",
        id: "firstTab"
    });
    $.__views.tabIcons.add($.__views.firstTab);
    onTabChange ? $.__views.firstTab.addEventListener("click", onTabChange) : __defers["$.__views.firstTab!click!onTabChange"] = true;
    $.__views.lbl_summary = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Monda-Regular"
        },
        height: 24.4,
        color: "#FFF",
        id: "lbl_summary",
        text: "SUMMARY",
        cIndex: "0"
    });
    $.__views.firstTab.add($.__views.lbl_summary);
    $.__views.__alloyId21 = Ti.UI.createView({
        layout: "vertical",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        height: Ti.UI.FILL,
        width: 70,
        cIndex: "1",
        id: "__alloyId21"
    });
    $.__views.tabIcons.add($.__views.__alloyId21);
    onTabChange ? $.__views.__alloyId21.addEventListener("click", onTabChange) : __defers["$.__views.__alloyId21!click!onTabChange"] = true;
    $.__views.lbl_credit = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Monda-Regular"
        },
        height: 24.4,
        bottom: 5,
        color: "#FFF",
        id: "lbl_credit",
        text: "CREDIT",
        cIndex: "1"
    });
    $.__views.__alloyId21.add($.__views.lbl_credit);
    $.__views.__alloyId22 = Ti.UI.createView({
        layout: "vertical",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        height: Ti.UI.FILL,
        width: 70,
        cIndex: "2",
        id: "__alloyId22"
    });
    $.__views.tabIcons.add($.__views.__alloyId22);
    onTabChange ? $.__views.__alloyId22.addEventListener("click", onTabChange) : __defers["$.__views.__alloyId22!click!onTabChange"] = true;
    $.__views.lbl_debit = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Monda-Regular"
        },
        height: 24.4,
        bottom: 5,
        color: "#FFF",
        id: "lbl_debit",
        text: "DEBIT",
        cIndex: "2"
    });
    $.__views.__alloyId22.add($.__views.lbl_debit);
    $.__views.middleContainer = Ti.UI.createView({
        id: "middleContainer"
    });
    $.__views.__alloyId20.add($.__views.middleContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var __ = require("platformSupport");
    require("animation");
    var TAB_COUNT = 3, TAB_WIDTH = 80, _SUMMARY = 0, _CREDIT = 1, _DEBIT = 2;
    var totalItemWidth = TAB_COUNT * TAB_WIDTH;
    var padding = (__.getScreenWidth() - totalItemWidth) / 2;
    $.firstTab.left = padding;
    var clearView = function() {
        $.middleContainer.removeAllChildren();
    };
    var clearSelectedTabs = function() {
        $.lbl_summary.color = "#FFF";
        $.lbl_credit.color = "#FFF";
        $.lbl_debit.color = "#FFF";
    };
    var changeSelectedTab = function(index) {
        0 == index ? $.lbl_summary.color = "#fcf307" : 1 == index ? $.lbl_credit.color = "#fcf307" : 2 == index && ($.lbl_debit.color = "#fcf307");
    };
    var onTabChange = function(e) {
        Ti.App.fireEvent("tab:changeView", {
            id: e.source.cIndex
        });
        clearSelectedTabs();
        changeSelectedTab(e.source.cIndex);
    };
    var loadSummaryView = function() {
        clearView();
        $.middleContainer.add(Alloy.createController("summary").getView());
    };
    var loadCreditTransactionView = function() {
        clearView();
        $.middleContainer.add(Alloy.createController("creditTransaction").getView());
    };
    var loadDebitTransactionView = function() {
        clearView();
        $.middleContainer.add(Alloy.createController("debitTransaction").getView());
    };
    Ti.App.addEventListener("tab:changeView", function(e) {
        e.id == _SUMMARY ? loadSummaryView() : e.id == _CREDIT ? loadCreditTransactionView() : e.id == _DEBIT && loadDebitTransactionView();
    });
    loadSummaryView();
    changeSelectedTab(0);
    __defers["$.__views.firstTab!click!onTabChange"] && $.__views.firstTab.addEventListener("click", onTabChange);
    __defers["$.__views.__alloyId21!click!onTabChange"] && $.__views.__alloyId21.addEventListener("click", onTabChange);
    __defers["$.__views.__alloyId22!click!onTabChange"] && $.__views.__alloyId22.addEventListener("click", onTabChange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;