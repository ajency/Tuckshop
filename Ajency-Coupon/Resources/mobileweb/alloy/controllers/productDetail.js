function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "productDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.productDetail = Ti.UI.createWindow({
        navBarHidden: "true",
        id: "productDetail"
    });
    $.__views.productDetail && $.addTopLevelView($.__views.productDetail);
    $.__views.__alloyId42 = Ti.UI.createView({
        backgroundColor: "#FFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "__alloyId42"
    });
    $.__views.productDetail.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#50a0be",
        top: 0,
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId43.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Product Detail"
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
    $.__views.midContainer = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "midContainer"
    });
    $.__views.__alloyId42.add($.__views.midContainer);
    $.__views.productImgView = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "productImgView"
    });
    $.__views.midContainer.add($.__views.productImgView);
    openSlider ? $.__views.productImgView.addEventListener("click", openSlider) : __defers["$.__views.productImgView!click!openSlider"] = true;
    $.__views.imProductImage = Ti.UI.createImageView({
        width: 320,
        height: 200,
        id: "imProductImage"
    });
    $.__views.productImgView.add($.__views.imProductImage);
    $.__views.productShadow = Ti.UI.createImageView({
        bottom: 0,
        backgroundImage: "/images/productImages/ProductPhotoShadow.png",
        width: 320,
        height: 56,
        opacity: .8,
        id: "productShadow"
    });
    $.__views.productImgView.add($.__views.productShadow);
    $.__views.productLoveCount = Ti.UI.createLabel({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 45,
        textAlign: "right",
        bottom: 0,
        right: 45,
        color: "#FFF",
        text: "22",
        id: "productLoveCount"
    });
    $.__views.productImgView.add($.__views.productLoveCount);
    $.__views.productColorIcon = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 15,
        id: "productColorIcon"
    });
    $.__views.midContainer.add($.__views.productColorIcon);
    $.__views.infoContainer = Ti.UI.createView({
        layout: "vertical",
        bottom: 25,
        id: "infoContainer"
    });
    $.__views.midContainer.add($.__views.infoContainer);
    $.__views.lblProductName = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontFamily: "Monda-Regular",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        text: "Product is the product",
        id: "lblProductName",
        color: "#464646"
    });
    $.__views.infoContainer.add($.__views.lblProductName);
    $.__views.strike1 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: .7,
        image: "/images/strikeDDD.png",
        id: "strike1"
    });
    $.__views.infoContainer.add($.__views.strike1);
    $.__views.lblProductPrice = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        text: "Price       	 : 	 S$2500",
        id: "lblProductPrice",
        color: "#464646"
    });
    $.__views.infoContainer.add($.__views.lblProductPrice);
    $.__views.lblProductPromotion = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        text: "Promotion   	 : 	 -",
        id: "lblProductPromotion",
        color: "#464646"
    });
    $.__views.infoContainer.add($.__views.lblProductPromotion);
    $.__views.lblProductAvai = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        text: "Available   	 : 	 100",
        id: "lblProductAvai",
        color: "#464646"
    });
    $.__views.infoContainer.add($.__views.lblProductAvai);
    $.__views.lblProductDesc = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        text: "Description 	 : 	 There are 6 cool pics more that you can see below including Leopard Chiffon Sleeveless Casual Dress Summer image, Summer Casual Dress Style image, Free Shipping 20Summer New Style Casual Dress, image.",
        id: "lblProductDesc",
        color: "#464646"
    });
    $.__views.infoContainer.add($.__views.lblProductDesc);
    $.__views.productId = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        top: 20,
        bottom: 10,
        width: "98%",
        left: "1%",
        right: "1%",
        backgroundColor: "#50a0be",
        backgroundSelectedColor: "#116686",
        borderColor: "#116686",
        color: "#FFF",
        backgroundImage: "null",
        selectedColor: "#AAA",
        productId: "",
        id: "productId",
        title: "Buy "
    });
    $.__views.infoContainer.add($.__views.productId);
    addToCard ? $.__views.productId.addEventListener("click", addToCard) : __defers["$.__views.productId!click!addToCard"] = true;
    $.__views.strike2 = Ti.UI.createImageView({
        top: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: .7,
        image: "/images/strikeDDD.png",
        id: "strike2"
    });
    $.__views.infoContainer.add($.__views.strike2);
    $.__views.__alloyId44 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId44"
    });
    $.__views.infoContainer.add($.__views.__alloyId44);
    $.__views.lblProductReview = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "left",
        width: Ti.UI.FILL,
        text: "",
        id: "lblProductReview",
        color: "#464646"
    });
    $.__views.__alloyId44.add($.__views.lblProductReview);
    $.__views.__alloyId45 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        right: 0,
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    openReview ? $.__views.__alloyId45.addEventListener("click", openReview) : __defers["$.__views.__alloyId45!click!openReview"] = true;
    $.__views.lblWriteReview = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: Ti.UI.SIZE,
        textAlign: "right",
        width: Ti.UI.SIZE,
        color: "#50a0be",
        text: "",
        id: "lblWriteReview"
    });
    $.__views.__alloyId45.add($.__views.lblWriteReview);
    $.__views.reviewView = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "reviewView"
    });
    $.__views.infoContainer.add($.__views.reviewView);
    $.__views.imCard = Ti.UI.createImageView({
        image: "/images/blue/flyingBag.png",
        id: "imCard",
        width: "40",
        height: "40",
        opacity: "0"
    });
    $.__views.productDetail.add($.__views.imCard);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("product id", args.prductId);
    Ti.API.info("product name:", args.productName);
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    __.getScreenWidth() - 50;
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var addToCard = function() {
        var contentView = Alloy.createController("confirmBuy", args).getView();
        myAnimation.in(contentView);
    };
    var openCheckOut = function() {};
    var openSlider = function() {
        var contentView = Alloy.createController("slider", args).getView();
        myAnimation.in(contentView);
    };
    var closeWindow = function() {
        myAnimation.out($.productDetail);
    };
    var openReview = function() {};
    var init = function() {
        var screenWidth = __.getScreenWidth();
        var padding = "";
        if (Alloy.isTablet) padding = 50; else {
            padding = 20;
            $.imProductImage.width = screenWidth;
            $.imProductImage.height = 328 * (screenWidth / 541);
            $.productShadow.width = screenWidth;
        }
        $.midContainer.applyProperties({
            width: screenWidth,
            contentWidth: screenWidth
        });
        $.productColorIcon.right = padding;
        $.infoContainer.applyProperties({
            left: padding,
            right: padding
        });
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
        if (args.reviews) {
            var reviews = args.reviews;
            var length = availableColors.length;
            var review = null;
            for (var i = 0; length > i; i++) {
                review = Alloy.createController("reviewRow", reviews[i]).getView();
                $.reviewView.add(review);
            }
        }
        $.imProductImage.image = args.imageLargePath[0].imagePath;
        $.productLoveCount.text = args.loveCount;
        $.lblProductName.text = args.productName;
        $.lblProductPrice.text = "Price 					 : 	 " + args.productPrice;
        $.lblProductPromotion.text = "Promotion 		 : 	 " + args.promotion;
        $.lblProductAvai.text = "Available 		 : 	 " + args.available;
        $.lblProductDesc.text = "Description 	 : 	 " + args.description;
        $.productId.productId = args.id;
        if (Alloy.isTablet) {
            $.imProductImage.top = 50;
            $.imProductImage.width = 550;
            $.imProductImage.height = 328 * (550 / 541);
            $.productShadow.width = 550;
            $.productColorIcon.right = (screenWidth - 550) / 2;
            $.lblProductName.top = 10;
            $.strike1.applyProperties({
                top: 7,
                bottom: 7
            });
            $.addClass($.lblProductPrice, "p h-size");
            $.addClass($.lblProductPromotion, "p h-size");
            $.addClass($.lblProductAvai, "p h-size");
            $.addClass($.lblProductDesc, "p h-size");
            $.addClass($.lblProductReview, "p h-size");
            $.addClass($.lblWriteReview, "p h-size");
            $.lblProductPrice.text = "Price 			 : 	 " + args.productPrice;
            $.lblProductPromotion.text = "Promotion 		 : 	 " + args.promotion;
        }
    };
    init();
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.btnIcon!click!closeWindow"] && $.__views.btnIcon.addEventListener("click", closeWindow);
    __defers["$.__views.CardsCountView!click!openCheckOut"] && $.__views.CardsCountView.addEventListener("click", openCheckOut);
    __defers["$.__views.productImgView!click!openSlider"] && $.__views.productImgView.addEventListener("click", openSlider);
    __defers["$.__views.productId!click!addToCard"] && $.__views.productId.addEventListener("click", addToCard);
    __defers["$.__views.__alloyId45!click!openReview"] && $.__views.__alloyId45.addEventListener("click", openReview);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;