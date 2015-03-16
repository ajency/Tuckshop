function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getSum(data) {
        var sum = 0;
        _.each(data, function(item) {
            sum += parseInt(item.quantity);
        });
        return sum;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "productHistoryStaticView";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.productHistoryStaticView = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "productHistoryStaticView"
    });
    $.__views.productHistoryStaticView && $.addTopLevelView($.__views.productHistoryStaticView);
    $.__views.__alloyId20 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        left: "10%",
        top: 0,
        height: "40%",
        id: "__alloyId20"
    });
    $.__views.productHistoryStaticView.add($.__views.__alloyId20);
    $.__views.topLabel = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        left: 0,
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Bold",
            fontSize: 40
        },
        id: "topLabel"
    });
    $.__views.__alloyId20.add($.__views.topLabel);
    $.__views.__alloyId21 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        top: 0,
        height: "55%",
        id: "__alloyId21"
    });
    $.__views.productHistoryStaticView.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "4%",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        top: "13%",
        touchEnabled: false,
        text: "Quantity",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.quantityView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "quantityView",
        top: "10%"
    });
    $.__views.__alloyId22.add($.__views.quantityView);
    $.__views.quantity = Ti.UI.createLabel({
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        id: "quantity",
        text: "500"
    });
    $.__views.quantityView.add($.__views.quantity);
    $.__views.__alloyId24 = Ti.UI.createView({
        left: "0",
        height: "75%",
        top: "12.5%",
        bottom: "12.5%",
        width: "0.3%",
        backgroundColor: "#444444",
        id: "__alloyId24"
    });
    $.__views.__alloyId21.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "0",
        id: "__alloyId25"
    });
    $.__views.__alloyId21.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        top: "13%",
        touchEnabled: false,
        text: "Debit",
        visible: "false",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.debitView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "debitView",
        top: "10%"
    });
    $.__views.__alloyId25.add($.__views.debitView);
    $.__views.__alloyId27 = Ti.UI.createImageView({
        image: "/images/indian_rupee.png",
        width: 12,
        height: 12,
        id: "__alloyId27"
    });
    $.__views.debitView.add($.__views.__alloyId27);
    $.__views.debit = Ti.UI.createLabel({
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        id: "debit",
        text: "75"
    });
    $.__views.debitView.add($.__views.debit);
    $.__views.__alloyId28 = Ti.UI.createView({
        left: "0",
        height: "75%",
        top: "12.5%",
        bottom: "12.5%",
        width: "0.3%",
        backgroundColor: "#444444",
        id: "__alloyId28"
    });
    $.__views.__alloyId21.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "0",
        right: "4%",
        id: "__alloyId29"
    });
    $.__views.__alloyId21.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        top: "13%",
        touchEnabled: false,
        text: "Total",
        visible: "false",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.totalView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "totalView",
        top: "10%"
    });
    $.__views.__alloyId29.add($.__views.totalView);
    $.__views.__alloyId31 = Ti.UI.createImageView({
        image: "/images/indian_rupee.png",
        width: 12,
        height: 12,
        id: "__alloyId31"
    });
    $.__views.totalView.add($.__views.__alloyId31);
    $.__views.total = Ti.UI.createLabel({
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        id: "total",
        text: "425"
    });
    $.__views.totalView.add($.__views.total);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var hideTransactionValues = function() {
        $.quantityView.visible = false;
        $.debitView.visible = false;
        $.totalView.visible = false;
    };
    hideTransactionValues();
    var showTransactionValues = function(values) {
        $.quantityView.visible = true;
        $.quantity.text = values.total;
    };
    Ti.App.addEventListener("app:adminStaticView", function(e) {
        enteredEmailValue = e.name.split("@");
        $.topLabel.text = enteredEmailValue[0];
        var data = e.data;
        var totalValue = getSum(data);
        var params = {
            total: totalValue
        };
        showTransactionValues(params);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;