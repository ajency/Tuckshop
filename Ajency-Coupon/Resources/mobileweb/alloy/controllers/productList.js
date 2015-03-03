function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "productList";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.productList = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "productList"
    });
    $.__views.productList && $.addTopLevelView($.__views.productList);
    $.__views.__alloyId46 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#50a0be",
        top: 0,
        id: "__alloyId46"
    });
    $.__views.productList.add($.__views.__alloyId46);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId46.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Product List"
    });
    $.__views.AppWrapper.add($.__views.mainTitle);
    closeWindow ? $.__views.mainTitle.addEventListener("click", closeWindow) : __defers["$.__views.mainTitle!click!closeWindow"] = true;
    $.__views.btnIcon = Ti.UI.createButton({
        backgroundImage: "/images/back.png",
        backgroundSelectedImage: "/images/back.png",
        width: 20,
        height: 40,
        left: 5,
        id: "btnIcon"
    });
    $.__views.AppWrapper.add($.__views.btnIcon);
    closeWindow ? $.__views.btnIcon.addEventListener("click", closeWindow) : __defers["$.__views.btnIcon!click!closeWindow"] = true;
    $.__views.CardsCountView = Ti.UI.createView({
        width: 40,
        height: 40,
        right: 8,
        id: "CardsCountView",
        visible: "true"
    });
    $.__views.AppWrapper.add($.__views.CardsCountView);
    openCheckOut ? $.__views.CardsCountView.addEventListener("click", openCheckOut) : __defers["$.__views.CardsCountView!click!openCheckOut"] = true;
    $.__views.txtSearch = Ti.UI.createTextField({
        top: 5,
        width: "98%",
        left: "1%",
        right: "1%",
        borderWidth: 1,
        borderColor: "#50a0be",
        backgroundColor: "#EEE",
        color: "#222",
        font: {
            fontFamily: "Monda-Regular"
        },
        id: "txtSearch",
        hintText: "Search"
    });
    $.__views.productList.add($.__views.txtSearch);
    $.__views.productView = Ti.UI.createScrollView({
        top: 5,
        height: 300,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "productView"
    });
    $.__views.productList.add($.__views.productView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var openCheckOut = function() {};
    var closeWindow = function() {
        myAnimation.out($.productList);
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
            screenHeight = screenHeight;
            $.productView.height = screenHeight - 100;
            Ti.Gesture.addEventListener("orientationchange", function() {
                var tmpWidth = 150;
                Alloy.isTablet && (tmpWidth = 185);
                var screenWidth = __.getScreenWidth();
                var tmpSpace = screenWidth % tmpWidth;
                $.productView.width = screenWidth - tmpSpace;
                $.productView.contentWidth = screenWidth - tmpSpace;
                screenHeight = __.getScreenHeight() - 100;
                screenHeight = screenHeight;
                $.productView.height = screenHeight;
            });
        } else {
            screenHeight -= 100;
            $.productView.height = screenHeight;
        }
        var contentView = null;
        for (var i = 0; feeds.length > i; i++) {
            var params = {
                imagePath: feeds[i].imagePath,
                productId: feeds[i].id,
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
    var feedsForProducts;
    feedsForProducts = "111" == args.categoryId ? Ti.App.Properties.getObject("juiceResponse") : "112" == args.categoryId ? Ti.App.Properties.getObject("biscuitResponse") : "113" == args.categoryId ? Ti.App.Properties.getObject("rollResponse") : eval("(" + productsJson + ")");
    initProducts(feedsForProducts);
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.btnIcon!click!closeWindow"] && $.__views.btnIcon.addEventListener("click", closeWindow);
    __defers["$.__views.CardsCountView!click!openCheckOut"] && $.__views.CardsCountView.addEventListener("click", openCheckOut);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;