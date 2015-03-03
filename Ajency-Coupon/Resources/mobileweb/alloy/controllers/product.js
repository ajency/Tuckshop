function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "product";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.product = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical",
        navBarHidden: true,
        id: "product",
        productId: "101"
    });
    $.__views.product && $.addTopLevelView($.__views.product);
    openProductView ? $.__views.product.addEventListener("click", openProductView) : __defers["$.__views.product!click!openProductView"] = true;
    $.__views.productImgView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: 0,
        id: "productImgView",
        productId: "101"
    });
    $.__views.product.add($.__views.productImgView);
    $.__views.imProductImage = Ti.UI.createImageView({
        width: 195,
        height: Ti.UI.SIZE,
        backgroundColor: "#FFcc00",
        id: "imProductImage",
        productId: "101"
    });
    $.__views.productImgView.add($.__views.imProductImage);
    $.__views.productShadow = Ti.UI.createImageView({
        bottom: 0,
        image: "/images/productImages/ProductPhotoShadow.png",
        width: Ti.UI.SIZE,
        opacity: .8,
        id: "productShadow",
        productId: "101"
    });
    $.__views.productImgView.add($.__views.productShadow);
    $.__views.productDiscountView = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        right: 0,
        top: 0,
        id: "productDiscountView",
        visible: "false"
    });
    $.__views.productImgView.add($.__views.productDiscountView);
    $.__views.productDiscountIcon = Ti.UI.createImageView({
        image: "/images/blue/promotionTag.png",
        width: 35,
        height: 35,
        top: 0,
        id: "productDiscountIcon",
        productId: "101"
    });
    $.__views.productDiscountView.add($.__views.productDiscountIcon);
    $.__views.lblDiscount = Ti.UI.createLabel({
        top: 0,
        font: {
            fontSize: 10,
            fontWeight: "bold",
            fontFamily: "Monda-Regular"
        },
        height: 20,
        color: "#FFF",
        text: "%OFF",
        id: "lblDiscount"
    });
    $.__views.productDiscountView.add($.__views.lblDiscount);
    $.__views.lblProductPrice = Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontFamily: "LithosPro-Regular"
        },
        height: 28,
        textAlign: "right",
        width: Ti.UI.FILL,
        right: 5,
        bottom: 0,
        color: "#FFF",
        text: "S$ 2000",
        id: "lblProductPrice"
    });
    $.__views.productImgView.add($.__views.lblProductPrice);
    $.__views.productLoveIcon = Ti.UI.createImageView({
        bottom: 0,
        image: "/images/heart.png",
        width: 35,
        height: 35,
        id: "productLoveIcon",
        productId: "101"
    });
    $.__views.productImgView.add($.__views.productLoveIcon);
    $.__views.lblProductName = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: 24.4,
        textAlign: "center",
        width: Ti.UI.FILL,
        text: "Product is the product is the product",
        color: "#878787",
        productId: "101",
        id: "lblProductName"
    });
    $.__views.product.add($.__views.lblProductName);
    $.__views.productColorIcon = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "productColorIcon"
    });
    $.__views.product.add($.__views.productColorIcon);
    $.__views.__alloyId40 = Ti.UI.createView({
        top: 10,
        bottom: 15,
        height: Ti.UI.SIZE,
        id: "__alloyId40"
    });
    $.__views.product.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        left: 20,
        right: 20,
        height: .7,
        image: "/images/strikeDDD.png",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var myAnimation = require("animation");
    require("platformSupport");
    var openProductView = function() {
        var contentView = Alloy.createController("confirmBuy", args).getView();
        myAnimation.in(contentView);
    };
    var init = function() {
        var tmpWidth = 150;
        Alloy.isTablet && (tmpWidth = 185);
        $.product.width = tmpWidth;
        var width = .8 * tmpWidth;
        $.imProductImage.width = width;
        $.imProductImage.height = 200 * (width / 250);
        $.productShadow.width = width;
        $.productShadow.height = 56 * (width / 253);
        var smallPadding = (tmpWidth - width) / 2 + 5;
        $.lblProductPrice.right = smallPadding;
        $.productLoveIcon.left = smallPadding;
        $.productColorIcon.left = smallPadding;
        $.productDiscountView.right = smallPadding;
        $.imProductImage.image = args.imagePath;
        $.lblProductPrice.text = args.productPrice;
        $.lblProductName.text = args.productName;
        "true" == args.hasDiscount && ($.productDiscountView.visible = true);
        if (args.availableColors) {
            var availableColors = args.availableColors;
            var length = availableColors.length;
            var tag = null;
            for (var i = 0; length > i; i++) {
                tag = Ti.UI.createImageView({
                    bottom: 0,
                    image: availableColors[i].imagePath
                });
                $.addClass(tag, "productColorIcon");
                $.productColorIcon.add(tag);
            }
        }
        $.product.productId = args.productId;
        $.productImgView.productId = args.productId;
        $.imProductImage.productId = args.productId;
        $.productShadow.productId = args.productId;
        $.productDiscountView.productId = args.productId;
        $.productDiscountIcon.productId = args.productId;
        $.lblDiscount.productId = args.productId;
        $.lblProductPrice.productId = args.productId;
        $.productLoveIcon.productId = args.productId;
        $.lblProductName.productId = args.productId;
    };
    init();
    __defers["$.__views.product!click!openProductView"] && $.__views.product.addEventListener("click", openProductView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;