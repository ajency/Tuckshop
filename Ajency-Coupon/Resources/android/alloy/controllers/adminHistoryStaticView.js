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
            sum += parseFloat(item.productPrice);
        });
        sum = sum.toFixed(2);
        return sum;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "adminHistoryStaticView";
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
    $.__views.adminHistoryStaticView = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "adminHistoryStaticView"
    });
    $.__views.adminHistoryStaticView && $.addTopLevelView($.__views.adminHistoryStaticView);
    $.__views.__alloyId2 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        left: "10%",
        top: 0,
        height: "40%",
        id: "__alloyId2"
    });
    $.__views.adminHistoryStaticView.add($.__views.__alloyId2);
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
    $.__views.__alloyId2.add($.__views.topLabel);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        top: 0,
        height: "55%",
        id: "__alloyId3"
    });
    $.__views.adminHistoryStaticView.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "4%",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        top: "13%",
        touchEnabled: false,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        text: "Credit",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.creditView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "creditView",
        top: "10%"
    });
    $.__views.__alloyId4.add($.__views.creditView);
    $.__views.rupeeSymbol1 = Ti.UI.createImageView({
        width: 12,
        height: 12,
        id: "rupeeSymbol1"
    });
    $.__views.creditView.add($.__views.rupeeSymbol1);
    $.__views.credit = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        color: "#3B0B0B",
        id: "credit",
        text: "500"
    });
    $.__views.creditView.add($.__views.credit);
    $.__views.__alloyId6 = Ti.UI.createView({
        left: "0",
        height: "75%",
        top: "12.5%",
        bottom: "12.5%",
        width: "0.3%",
        backgroundColor: "#444444",
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "0",
        id: "__alloyId7"
    });
    $.__views.__alloyId3.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        top: "13%",
        touchEnabled: false,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        text: "Debit",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.debitView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "debitView",
        top: "10%"
    });
    $.__views.__alloyId7.add($.__views.debitView);
    $.__views.rupeeSymbol2 = Ti.UI.createImageView({
        width: 12,
        height: 12,
        id: "rupeeSymbol2"
    });
    $.__views.debitView.add($.__views.rupeeSymbol2);
    $.__views.debit = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        color: "#3B0B0B",
        id: "debit",
        text: "75"
    });
    $.__views.debitView.add($.__views.debit);
    $.__views.__alloyId9 = Ti.UI.createView({
        left: "0",
        height: "75%",
        top: "12.5%",
        bottom: "12.5%",
        width: "0.3%",
        backgroundColor: "#444444",
        id: "__alloyId9"
    });
    $.__views.__alloyId3.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "0",
        right: "4%",
        id: "__alloyId10"
    });
    $.__views.__alloyId3.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        top: "13%",
        touchEnabled: false,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        text: "Total",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.totalView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "totalView",
        top: "10%"
    });
    $.__views.__alloyId10.add($.__views.totalView);
    $.__views.rupeeSymbol3 = Ti.UI.createImageView({
        width: 12,
        height: 12,
        id: "rupeeSymbol3"
    });
    $.__views.totalView.add($.__views.rupeeSymbol3);
    $.__views.total = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        color: "#3B0B0B",
        id: "total",
        text: "425"
    });
    $.__views.totalView.add($.__views.total);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var localStorage = require("/localStorage");
    var hideTransactionValues = function() {
        $.creditView.visible = false;
        $.debitView.visible = false;
        $.totalView.visible = false;
    };
    hideTransactionValues();
    var showTransactionValues = function(values) {
        $.rupeeSymbol1.image = localStorage.getCurrencyUrl();
        $.rupeeSymbol2.image = localStorage.getCurrencyUrl();
        $.rupeeSymbol3.image = localStorage.getCurrencyUrl();
        $.creditView.visible = true;
        $.credit.text = values.credit;
        $.debitView.visible = true;
        $.debit.text = values.debit;
        $.totalView.visible = true;
        $.total.text = values.total;
    };
    Ti.App.addEventListener("app:adminStaticView", function(e) {
        enteredEmailValue = e.name.split("@");
        $.topLabel.text = enteredEmailValue[0];
        var data = e.data;
        var creditData = data.filter(function(item) {
            return "Credit" === item.productName;
        });
        var creditValue = getSum(creditData);
        var debitData = data.filter(function(item) {
            return "Credit" != item.productName;
        });
        var debitValue = getSum(debitData);
        var totalValue = getSum(data);
        var params = {
            credit: creditValue,
            debit: debitValue,
            total: totalValue
        };
        showTransactionValues(params);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;