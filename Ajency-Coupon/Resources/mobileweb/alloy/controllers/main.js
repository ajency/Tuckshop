function Controller() {
    function refreshView() {
        clearSelectedIcon();
        changeSelectedIcon(0);
        clearView();
        $.midContainer.add(Alloy.createController("home").getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        exitOnClose: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId37 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId37"
    });
    $.__views.index.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#db6868",
        top: 0,
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId38.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: 50,
        id: "mainTitle",
        text: "TuckShop"
    });
    $.__views.AppWrapper.add($.__views.mainTitle);
    $.__views.btnIcon = Ti.UI.createButton({
        backgroundImage: "/images/logo.png",
        backgroundSelectedImage: "/images/logo.png",
        width: 40,
        height: 40,
        left: 5,
        id: "btnIcon"
    });
    $.__views.AppWrapper.add($.__views.btnIcon);
    $.__views.CardsCountView = Ti.UI.createView({
        width: 40,
        height: 40,
        right: 8,
        id: "CardsCountView",
        visible: "true"
    });
    $.__views.AppWrapper.add($.__views.CardsCountView);
    openCheckOut ? $.__views.CardsCountView.addEventListener("click", openCheckOut) : __defers["$.__views.CardsCountView!click!openCheckOut"] = true;
    $.__views.refreshButton = Ti.UI.createButton({
        backgroundImage: "/images/bottom_menu/home/homeIcon.png",
        backgroundSelectedImage: "/images/bottom_menu/home/homeIconPress.png",
        width: 26,
        height: 26,
        id: "refreshButton"
    });
    $.__views.CardsCountView.add($.__views.refreshButton);
    refreshView ? $.__views.refreshButton.addEventListener("click", refreshView) : __defers["$.__views.refreshButton!click!refreshView"] = true;
    $.__views.midContainer = Ti.UI.createView({
        id: "midContainer",
        bottom: "65"
    });
    $.__views.__alloyId37.add($.__views.midContainer);
    $.__views.footerView = Ti.UI.createView({
        layout: "vertical",
        bottom: 0,
        height: 47,
        width: Ti.UI.FILL,
        backgroundColor: "#db6868",
        id: "footerView"
    });
    $.__views.index.add($.__views.footerView);
    $.__views.footerIcons = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 47,
        id: "footerIcons"
    });
    $.__views.footerView.add($.__views.footerIcons);
    $.__views.firstTab = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: 70,
        cIndex: "0",
        id: "firstTab"
    });
    $.__views.footerIcons.add($.__views.firstTab);
    showView ? $.__views.firstTab.addEventListener("click", showView) : __defers["$.__views.firstTab!click!showView"] = true;
    $.__views.btnHome = Ti.UI.createButton({
        backgroundImage: "/images/bottom_menu/home/homeIcon.png",
        backgroundSelectedImage: "/images/bottom_menu/home/homeIconPress.png",
        width: 26,
        height: 26,
        id: "btnHome",
        top: "2",
        cIndex: "0"
    });
    $.__views.firstTab.add($.__views.btnHome);
    $.__views.lblHome = Ti.UI.createLabel({
        font: {
            fontSize: 9,
            fontFamily: "Monda-Regular"
        },
        height: 20,
        color: "#FFF",
        id: "lblHome",
        text: "Home",
        cIndex: "0"
    });
    $.__views.firstTab.add($.__views.lblHome);
    $.__views.__alloyId39 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: 70,
        cIndex: "1",
        id: "__alloyId39"
    });
    $.__views.footerIcons.add($.__views.__alloyId39);
    showView ? $.__views.__alloyId39.addEventListener("click", showView) : __defers["$.__views.__alloyId39!click!showView"] = true;
    $.__views.btnSearch = Ti.UI.createButton({
        backgroundImage: "/images/bottom_menu/search/searchIcon.png",
        backgroundSelectedImage: "/images/bottom_menu/search/searchIconPress.png",
        width: 26,
        height: 26,
        id: "btnSearch",
        top: "2",
        cIndex: "1"
    });
    $.__views.__alloyId39.add($.__views.btnSearch);
    $.__views.lblSearch = Ti.UI.createLabel({
        font: {
            fontSize: 9,
            fontFamily: "Monda-Regular"
        },
        height: 20,
        bottom: 5,
        color: "#FFF",
        id: "lblSearch",
        text: "History",
        cIndex: "1"
    });
    $.__views.__alloyId39.add($.__views.lblSearch);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var __ = require("platformSupport");
    require("animation");
    var TAB_COUNT = 2, TAB_WIDTH = 70, _HOME = 0, _SEARCH = 1, _INFO = 2, _PROFILE = 3;
    if (__.isiOS7Plus()) {
        $.AppWrapper.top = 20;
        $.footerView.bottom = 0;
    }
    "blue" == Alloy.CFG.theme ? Alloy.CFG.colorCode = "#349dc5" : "green" == Alloy.CFG.theme ? Alloy.CFG.colorCode = "#11ab9f" : "red" == Alloy.CFG.theme && (Alloy.CFG.colorCode = "#db6868");
    var clearSelectedIcon = function() {
        $.btnHome.backgroundImage = "/images/bottom_menu/home/homeIcon.png";
        $.btnSearch.backgroundImage = "/images/bottom_menu/search/searchIcon.png";
        $.lblHome.color = "#FFF";
        $.lblSearch.color = "#FFF";
    };
    var changeSelectedIcon = function(index) {
        if (0 == index) {
            $.btnHome.backgroundImage = "/images/bottom_menu/home/homeIconPress.png";
            $.lblHome.color = "#fcf307";
        } else if (1 == index) {
            $.btnSearch.backgroundImage = "/images/bottom_menu/search/searchIconPress.png";
            $.lblSearch.color = "#fcf307";
        } else if (2 == index) {
            $.btnShopInfo.backgroundImage = "/images/bottom_menu/info/infoIconPress.png";
            $.lblShopInfo.color = "#fcf307";
        } else if (3 == index) {
            $.btnUserInfo.backgroundImage = "/images/bottom_menu/profile/profileIconPress.png";
            $.lblUserInfo.color = "#fcf307";
        }
    };
    var clearView = function() {
        $.midContainer.removeAllChildren();
    };
    var openCheckOut = function() {};
    var showView = function(e) {
        Ti.App.fireEvent("app:changeView", {
            id: e.source.cIndex
        });
        clearSelectedIcon();
        changeSelectedIcon(e.source.cIndex);
    };
    var loadHomeView = function() {
        clearView();
        $.midContainer.add(Alloy.createController("home").getView());
    };
    var loadSearchView = function() {
        clearView();
        $.midContainer.add(Alloy.createController("history").getView());
    };
    var loadInfoView = function() {
        clearView();
        $.midContainer.add(Alloy.createController("info").getView());
    };
    var loadProfileView = function() {
        clearView();
        $.midContainer.add(Alloy.createController("profile").getView());
    };
    Ti.App.addEventListener("app:changeView", function(e) {
        e.id == _HOME ? loadHomeView() : e.id == _SEARCH ? loadSearchView() : e.id == _INFO ? loadInfoView() : e.id == _PROFILE && loadProfileView();
    });
    $.index.open();
    loadHomeView();
    var totalItemWidth = TAB_COUNT * TAB_WIDTH;
    var padding = (__.getScreenWidth() - totalItemWidth) / 2;
    $.firstTab.left = padding;
    Ti.Gesture.addEventListener("orientationchange", function() {
        var totalItemWidth = TAB_COUNT * TAB_WIDTH;
        var padding = (__.getScreenWidth() - totalItemWidth) / 2;
        $.firstTab.left = padding;
    });
    changeSelectedIcon(0);
    __defers["$.__views.CardsCountView!click!openCheckOut"] && $.__views.CardsCountView.addEventListener("click", openCheckOut);
    __defers["$.__views.refreshButton!click!refreshView"] && $.__views.refreshButton.addEventListener("click", refreshView);
    __defers["$.__views.firstTab!click!showView"] && $.__views.firstTab.addEventListener("click", showView);
    __defers["$.__views.__alloyId39!click!showView"] && $.__views.__alloyId39.addEventListener("click", showView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;