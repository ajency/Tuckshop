function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "category";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.categoryView = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: 120,
        height: 101,
        layout: "vertical",
        navBarHidden: true,
        top: 0,
        id: "categoryView",
        categoryId: "111"
    });
    $.__views.categoryView && $.addTopLevelView($.__views.categoryView);
    openProductList ? $.__views.categoryView.addEventListener("click", openProductList) : __defers["$.__views.categoryView!click!openProductList"] = true;
    $.__views.imCategoryImage = Ti.UI.createImageView({
        image: "/images/categories/dress.png",
        width: 85,
        height: 85,
        top: 0,
        id: "imCategoryImage",
        categoryId: "111"
    });
    $.__views.categoryView.add($.__views.imCategoryImage);
    $.__views.lblCategoryName = Ti.UI.createLabel({
        text: "",
        top: -10,
        width: Ti.UI.FILL,
        font: {
            fontSize: 11,
            fontFamily: "Monda-Regular"
        },
        height: 24.4,
        textAlign: "center",
        color: "#878787",
        categoryId: "101",
        id: "lblCategoryName"
    });
    $.__views.categoryView.add($.__views.lblCategoryName);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var myAnimation = require("animation");
    require("platformSupport");
    var openProductList = function() {
        var contentView = Alloy.createController("productList", args).getView();
        myAnimation.in(contentView);
    };
    var init = function() {
        if (Alloy.isTablet) {
            $.imCategoryImage.width = 130;
            $.imCategoryImage.height = 130;
            $.categoryView.width = 130;
            $.categoryView.height = 154.4;
        }
        $.imCategoryImage.image = args.imagePath;
        $.lblCategoryName.text = args.categoryName;
        $.categoryView.categoryId = args.categoryId;
        $.imCategoryImage.categoryId = args.categoryId;
        $.lblCategoryName.categoryId = args.categoryId;
    };
    init();
    __defers["$.__views.categoryView!click!openProductList"] && $.__views.categoryView.addEventListener("click", openProductList);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;