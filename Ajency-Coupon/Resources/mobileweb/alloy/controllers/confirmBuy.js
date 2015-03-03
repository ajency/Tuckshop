function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "confirmBuy";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.confirmBuy = Ti.UI.createWindow({
        navBarHidden: "true",
        backgroundColor: "#FFF",
        id: "confirmBuy"
    });
    $.__views.confirmBuy && $.addTopLevelView($.__views.confirmBuy);
    $.__views.__alloyId15 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#db6868",
        top: 0,
        id: "__alloyId15"
    });
    $.__views.confirmBuy.add($.__views.__alloyId15);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId15.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: 50,
        id: "mainTitle",
        text: "Confirm Buy"
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
    $.__views.confirmLabel = Ti.UI.createLabel({
        left: "20%",
        top: "30%",
        id: "confirmLabel"
    });
    $.__views.confirmBuy.add($.__views.confirmLabel);
    $.__views.confirmButton = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        top: "40%",
        bottom: 10,
        width: "25%",
        left: "20%",
        right: "1%",
        backgroundColor: "#db6868",
        id: "confirmButton",
        title: "Confirm"
    });
    $.__views.confirmBuy.add($.__views.confirmButton);
    confirmClicked ? $.__views.confirmButton.addEventListener("click", confirmClicked) : __defers["$.__views.confirmButton!click!confirmClicked"] = true;
    $.__views.cancelButton = Ti.UI.createButton({
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        top: "40%",
        bottom: 10,
        width: "25%",
        left: "55%",
        right: "1%",
        backgroundColor: "#db6868",
        id: "cancelButton",
        title: "Cancel"
    });
    $.__views.confirmBuy.add($.__views.cancelButton);
    cancelClicked ? $.__views.cancelButton.addEventListener("click", cancelClicked) : __defers["$.__views.cancelButton!click!cancelClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    $.confirmLabel.text = "Are You Sure You want to buy   " + args.productName + "  for Rs" + args.productPrice;
    var confirmClicked = function() {
        Cloud.Objects.update({
            classname: "things",
            id: args.productId,
            fields: {
                available: args.available - 1
            }
        }, function(e) {
            if (e.success) {
                e.things[0];
                makeTransactionEntry();
                var dlg = Titanium.UI.createAlertDialog({
                    message: "You bought this product",
                    buttonNames: [ "OK", "Cancel" ]
                });
                dlg.addEventListener("click", function(ev) {
                    0 == ev.index ? Alloy.createController("main", {}).getView().open() : 1 == ev.index;
                });
                dlg.show();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    };
    var cancelClicked = function() {
        myAnimation.out($.confirmBuy);
    };
    var closeWindow = function() {
        myAnimation.out($.confirmBuy);
    };
    var makeTransactionEntry = function() {
        Cloud.Objects.create({
            classname: "testItems",
            fields: {
                productName: args.productName,
                productPrice: -args.productPrice,
                userId: Ti.App.Properties.getString("userid")
            }
        }, function(e) {
            e.success ? e.testItems[0] : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    };
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.btnIcon!click!closeWindow"] && $.__views.btnIcon.addEventListener("click", closeWindow);
    __defers["$.__views.confirmButton!click!confirmClicked"] && $.__views.confirmButton.addEventListener("click", confirmClicked);
    __defers["$.__views.cancelButton!click!cancelClicked"] && $.__views.cancelButton.addEventListener("click", cancelClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;