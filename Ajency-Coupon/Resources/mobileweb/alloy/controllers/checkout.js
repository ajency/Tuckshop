function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "checkout";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.checkout = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "checkout"
    });
    $.__views.checkout && $.addTopLevelView($.__views.checkout);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#50a0be",
        top: 0,
        id: "__alloyId0"
    });
    $.__views.checkout.add($.__views.__alloyId0);
    $.__views.AppWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "AppWrapper"
    });
    $.__views.__alloyId0.add($.__views.AppWrapper);
    $.__views.mainTitle = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "Monda-Regular"
        },
        height: 44.4,
        color: "#FFF",
        left: "25",
        id: "mainTitle",
        text: "Check Out"
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
    $.__views.__alloyId1 = Ti.UI.createButton({
        backgroundColor: "#50a0be",
        backgroundSelectedColor: "#116686",
        borderColor: "#116686",
        color: "#FFF",
        backgroundImage: "null",
        selectedColor: "#AAA",
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
        title: " Check Out ",
        id: "__alloyId1"
    });
    $.__views.checkout.add($.__views.__alloyId1);
    checkout ? $.__views.__alloyId1.addEventListener("click", checkout) : __defers["$.__views.__alloyId1!click!checkout"] = true;
    var __alloyId2 = [];
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        modelId: "0",
        id: "__alloyId3"
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.img = Ti.UI.createImageView({
        left: "10dp",
        top: "5dp",
        height: "50dp",
        width: "50dp",
        id: "img",
        image: "/images/productImages/product1.jpg"
    });
    $.__views.__alloyId3.add($.__views.img);
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.title = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        top: "5dp",
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        color: "#222",
        textAlign: "left",
        id: "title",
        text: "Product Title "
    });
    $.__views.__alloyId4.add($.__views.title);
    $.__views.price = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        bottom: "10dp",
        top: 0,
        font: {
            fontSize: 9,
            fontFamily: "Monda-Regular"
        },
        height: 20,
        color: "#444",
        textAlign: "left",
        id: "price",
        text: "Product Description "
    });
    $.__views.__alloyId4.add($.__views.price);
    $.__views.__alloyId5 = Ti.UI.createButton({
        right: 5,
        width: 40,
        height: 40,
        backgroundImage: "/images/blue/minusButton.png",
        modelId: "0",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    removeItem ? $.__views.__alloyId5.addEventListener("click", removeItem) : __defers["$.__views.__alloyId5!click!removeItem"] = true;
    $.__views.__alloyId6 = Ti.UI.createTableViewRow({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        modelId: "1",
        id: "__alloyId6"
    });
    __alloyId2.push($.__views.__alloyId6);
    $.__views.img = Ti.UI.createImageView({
        left: "10dp",
        top: "5dp",
        height: "50dp",
        width: "50dp",
        id: "img",
        image: "/images/productImages/product2.jpg"
    });
    $.__views.__alloyId6.add($.__views.img);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.title = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        top: "5dp",
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        color: "#222",
        textAlign: "left",
        id: "title",
        text: "Product Title "
    });
    $.__views.__alloyId7.add($.__views.title);
    $.__views.price = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        bottom: "10dp",
        top: 0,
        font: {
            fontSize: 9,
            fontFamily: "Monda-Regular"
        },
        height: 20,
        color: "#444",
        textAlign: "left",
        id: "price",
        text: "Product Description "
    });
    $.__views.__alloyId7.add($.__views.price);
    $.__views.__alloyId8 = Ti.UI.createButton({
        right: 5,
        width: 40,
        height: 40,
        backgroundImage: "/images/blue/minusButton.png",
        modelId: "1",
        id: "__alloyId8"
    });
    $.__views.__alloyId6.add($.__views.__alloyId8);
    removeItem ? $.__views.__alloyId8.addEventListener("click", removeItem) : __defers["$.__views.__alloyId8!click!removeItem"] = true;
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        modelId: "2",
        id: "__alloyId9"
    });
    __alloyId2.push($.__views.__alloyId9);
    $.__views.img = Ti.UI.createImageView({
        left: "10dp",
        top: "5dp",
        height: "50dp",
        width: "50dp",
        id: "img",
        image: "/images/productImages/product3.jpg"
    });
    $.__views.__alloyId9.add($.__views.img);
    $.__views.__alloyId10 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.title = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        top: "5dp",
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        color: "#222",
        textAlign: "left",
        id: "title",
        text: "Product Title "
    });
    $.__views.__alloyId10.add($.__views.title);
    $.__views.price = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        bottom: "10dp",
        top: 0,
        font: {
            fontSize: 9,
            fontFamily: "Monda-Regular"
        },
        height: 20,
        color: "#444",
        textAlign: "left",
        id: "price",
        text: "Product Description "
    });
    $.__views.__alloyId10.add($.__views.price);
    $.__views.__alloyId11 = Ti.UI.createButton({
        right: 5,
        width: 40,
        height: 40,
        backgroundImage: "/images/blue/minusButton.png",
        modelId: "2",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    removeItem ? $.__views.__alloyId11.addEventListener("click", removeItem) : __defers["$.__views.__alloyId11!click!removeItem"] = true;
    $.__views.__alloyId12 = Ti.UI.createTableViewRow({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        modelId: "3",
        id: "__alloyId12"
    });
    __alloyId2.push($.__views.__alloyId12);
    $.__views.img = Ti.UI.createImageView({
        left: "10dp",
        top: "5dp",
        height: "50dp",
        width: "50dp",
        id: "img",
        image: "/images/productImages/product4.jpg"
    });
    $.__views.__alloyId12.add($.__views.img);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.title = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        top: "5dp",
        font: {
            fontSize: 15,
            fontFamily: "Monda-Regular"
        },
        height: 33.3,
        color: "#222",
        textAlign: "left",
        id: "title",
        text: "Product Title "
    });
    $.__views.__alloyId13.add($.__views.title);
    $.__views.price = Ti.UI.createLabel({
        left: "70dp",
        right: 50,
        bottom: "10dp",
        top: 0,
        font: {
            fontSize: 9,
            fontFamily: "Monda-Regular"
        },
        height: 20,
        color: "#444",
        textAlign: "left",
        id: "price",
        text: "Product Description "
    });
    $.__views.__alloyId13.add($.__views.price);
    $.__views.__alloyId14 = Ti.UI.createButton({
        right: 5,
        width: 40,
        height: 40,
        backgroundImage: "/images/blue/minusButton.png",
        modelId: "3",
        id: "__alloyId14"
    });
    $.__views.__alloyId12.add($.__views.__alloyId14);
    removeItem ? $.__views.__alloyId14.addEventListener("click", removeItem) : __defers["$.__views.__alloyId14!click!removeItem"] = true;
    $.__views.tableView = Ti.UI.createTableView({
        data: __alloyId2,
        id: "tableView"
    });
    $.__views.checkout.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var __ = require("platformSupport");
    var myAnimation = require("animation");
    __.isiOS7Plus() && ($.AppWrapper.top = 20);
    var checkout = function() {
        alert("Check out");
    };
    var removeItem = function(e) {
        var i = parseInt(e.source.modelId);
        $.tableView.deleteRow(i);
    };
    var closeWindow = function() {
        myAnimation.out($.checkout);
    };
    __defers["$.__views.mainTitle!click!closeWindow"] && $.__views.mainTitle.addEventListener("click", closeWindow);
    __defers["$.__views.btnIcon!click!closeWindow"] && $.__views.btnIcon.addEventListener("click", closeWindow);
    __defers["$.__views.__alloyId1!click!checkout"] && $.__views.__alloyId1.addEventListener("click", checkout);
    __defers["$.__views.__alloyId5!click!removeItem"] && $.__views.__alloyId5.addEventListener("click", removeItem);
    __defers["$.__views.__alloyId8!click!removeItem"] && $.__views.__alloyId8.addEventListener("click", removeItem);
    __defers["$.__views.__alloyId11!click!removeItem"] && $.__views.__alloyId11.addEventListener("click", removeItem);
    __defers["$.__views.__alloyId14!click!removeItem"] && $.__views.__alloyId14.addEventListener("click", removeItem);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;