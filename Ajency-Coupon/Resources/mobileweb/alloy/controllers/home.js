function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.home = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "home"
    });
    $.__views.home && $.addTopLevelView($.__views.home);
    $.__views.__alloyId23 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId23"
    });
    $.__views.home.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: .7,
        image: "/images/strikeDDD.png",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        backgroundColor: "#FFF",
        width: Ti.UI.SIZE,
        color: "#878787",
        text: "Categories",
        id: "__alloyId25"
    });
    $.__views.__alloyId23.add($.__views.__alloyId25);
    $.__views.categoryView = Ti.UI.createScrollView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        showHorizontalScrollIndicator: true,
        showVerticalScrollIndicator: false,
        scrollType: "horizontal",
        contentWidth: 1250,
        contentHeight: Ti.UI.SIZE,
        height: 101,
        top: -10,
        id: "categoryView"
    });
    $.__views.home.add($.__views.categoryView);
    $.__views.__alloyId26 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId26"
    });
    $.__views.home.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: .7,
        image: "/images/strikeDDD.png",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        backgroundColor: "#FFF",
        width: Ti.UI.SIZE,
        color: "#878787",
        text: "All Products",
        id: "__alloyId28"
    });
    $.__views.__alloyId26.add($.__views.__alloyId28);
    $.__views.productView = Ti.UI.createScrollView({
        height: 300,
        width: Ti.UI.FILL,
        layout: "horizontal",
        top: 5,
        id: "productView",
        bottom: "70"
    });
    $.__views.home.add($.__views.productView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var myAnimation = require("animation");
    var __ = require("platformSupport");
    var args = arguments[0] || {};
    var initCategories = function(feeds) {
        if (Alloy.isTablet) {
            $.categoryView.contentWidth = __.convertDptoPx(130 * feeds.length + 20);
            $.categoryView.contentHeight = __.convertDptoPx(138.2);
            $.categoryView.height = __.convertDptoPx(138.2);
        } else $.categoryView.contentWidth = __.convertDptoPx(120 * feeds.length + 20);
        var contentView = null;
        for (var i = 0; feeds.length > i; i++) {
            var params = {
                imagePath: feeds[i].imagePath,
                categoryId: feeds[i].categoryId,
                categoryName: feeds[i].categoryName
            };
            Ti.API.info("category ids are::", params.categoryId);
            contentView = Alloy.createController("category", params).getView();
            $.categoryView.add(contentView);
        }
    };
    var initProducts = function(feeds) {
        var tmpWidth = 150;
        Alloy.isTablet && (tmpWidth = 185);
        var screenWidth = __.getScreenWidth();
        var tmpSpace = screenWidth % tmpWidth;
        $.productView.width = screenWidth - tmpSpace;
        $.productView.contentWidth = screenWidth - tmpSpace;
        var screenHeight = __.getScreenHeight();
        if (Alloy.isTablet) {
            screenHeight -= 322.4;
            $.productView.height = screenHeight;
            Ti.Gesture.addEventListener("orientationchange", function() {
                var tmpWidth = 150;
                Alloy.isTablet && (tmpWidth = 185);
                var screenWidth = __.getScreenWidth();
                var tmpSpace = screenWidth % tmpWidth;
                $.productView.width = screenWidth - tmpSpace;
                $.productView.contentWidth = screenWidth - tmpSpace;
                screenHeight = __.getScreenHeight();
                screenHeight -= 322.4;
                $.productView.height = screenHeight;
            });
        } else {
            screenHeight -= 269;
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
    Ti.include("/data/categoriesData.js");
    var categoriesJson = "";
    "blue" == Alloy.CFG.theme ? categoriesJson = categoriesJsonBlue : "green" == Alloy.CFG.theme ? categoriesJson = categoriesJsonGreen : "red" == Alloy.CFG.theme && (categoriesJson = categoriesJsonRed);
    var feedsForCategories = eval("(" + categoriesJson + ")");
    initCategories(feedsForCategories);
    Ti.include("/data/productsData.js");
    var feedsForProducts = eval("(" + productsJson + ")");
    Ti.API.info("The response from assest");
    feedsForProducts = Ti.App.Properties.getObject("allProductResponse");
    initProducts(feedsForProducts);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;