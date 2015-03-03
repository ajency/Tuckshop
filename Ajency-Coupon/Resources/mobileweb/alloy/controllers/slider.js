function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "slider";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.slider = Ti.UI.createWindow({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#FFF",
        navBarHidden: "true",
        id: "slider"
    });
    $.__views.slider && $.addTopLevelView($.__views.slider);
    $.__views.__alloyId72 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#50a0be",
        top: 0,
        id: "__alloyId72"
    });
    $.__views.slider.add($.__views.__alloyId72);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId72.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Images"
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
    var __alloyId73 = [];
    $.__views.scroller = Ti.UI.createScrollableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        views: __alloyId73,
        id: "scroller"
    });
    $.__views.slider.add($.__views.scroller);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var closeWindow = function() {
        myAnimation.out($.slider);
    };
    var init = function() {
        var images = args.imageLargePath;
        var cnt = 1;
        for (var i = 0; images.length > i; i++) {
            var productImageView = Ti.UI.createView({
                height: Ti.UI.FILL,
                width: Ti.UI.FILL
            });
            var productImage = Ti.UI.createImageView({
                image: images[i].imagePath
            });
            productImageView.add(productImage);
            var indicatorLabel = Ti.UI.createLabel({
                backgroundColor: Alloy.CFG.colorCode,
                color: "#FFF",
                right: "10",
                top: "10",
                width: Ti.UI.SIZE,
                height: "30",
                text: " " + cnt + "  of  " + images.length + " "
            });
            cnt++;
            productImageView.add(indicatorLabel);
            $.scroller.addView(productImageView);
        }
    };
    init();
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.btnIcon!click!closeWindow"] && $.__views.btnIcon.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;