function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "search";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.search = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "search"
    });
    $.__views.search && $.addTopLevelView($.__views.search);
    $.__views.txtSearch = Ti.UI.createTextField({
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        borderWidth: 1,
        borderColor: "#50a0be",
        id: "txtSearch",
        hintText: "Search"
    });
    $.__views.search.add($.__views.txtSearch);
    $.__views.pickersView = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: 10,
        id: "pickersView"
    });
    $.__views.search.add($.__views.pickersView);
    $.__views.productView = Ti.UI.createScrollView({
        top: 5,
        height: 300,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "productView"
    });
    $.__views.search.add($.__views.productView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var picker = require("SimplePicker");
    var _sp1 = picker.SimplePicker({
        title: "Category",
        values: [ "Women", "Men", "Child", "Lady Shoe" ]
    });
    $.addClass(_sp1, "bottom2 span7");
    $.pickersView.add(_sp1);
    _sp1.addEventListener("TUchange", function(e) {
        $.txtSearch.value = e.value;
    });
    var _sp2 = picker.SimplePicker({
        title: "Sort",
        values: [ "Price", "Popular", "Love" ]
    });
    $.addClass(_sp2, "bottom2 span5");
    $.pickersView.add(_sp2);
    _sp2.addEventListener("TUchange", function(e) {
        $.txtSearch.value = e.value;
    });
    var initProducts = function(feeds) {
        var tmpWidth = 150;
        Alloy.isTablet && (tmpWidth = 185);
        var screenWidth = __.getScreenWidth();
        var tmpSpace = screenWidth % tmpWidth;
        $.productView.width = screenWidth - tmpSpace;
        $.productView.contentWidth = screenWidth - tmpSpace;
        var screenHeight = __.getScreenHeight();
        if (Alloy.isTablet) {
            screenHeight -= 219;
            $.productView.height = screenHeight;
            Ti.Gesture.addEventListener("orientationchange", function() {
                var tmpWidth = 150;
                Alloy.isTablet && (tmpWidth = 185);
                var screenWidth = __.getScreenWidth();
                var tmpSpace = screenWidth % tmpWidth;
                $.productView.width = screenWidth - tmpSpace;
                $.productView.contentWidth = screenWidth - tmpSpace;
                screenHeight = __.getScreenHeight();
                screenHeight -= 219;
                $.productView.height = screenHeight;
            });
        } else {
            screenHeight -= 219;
            $.productView.height = screenHeight;
        }
        var contentView = null;
        for (var i = 0; feeds.length > i; i++) {
            var params = {
                imagePath: feeds[i].imagePath,
                productId: feeds[i].productId,
                productName: feeds[i].productName,
                productPrice: feeds[i].productPrice,
                hasDiscount: feeds[i].hasDiscount,
                hasLove: feeds[i].hasLove,
                availableColors: feeds[i].availableColors,
                available: feeds[i].available,
                description: feeds[i].description,
                promotion: feeds[i].promotion,
                reviews: feeds[i].reviews,
                loveCount: feeds[i].loveCount,
                imageLargePath: feeds[i].imageLargePaths
            };
            contentView = Alloy.createController("product", params).getView();
            $.productView.add(contentView);
        }
    };
    Ti.include("/data/productsData.js");
    var feedsForProducts = eval("(" + productsJson + ")");
    initProducts(feedsForProducts);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;