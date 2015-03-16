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
    this.__controllerPath = "transactionHistoryStaticView";
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
    $.__views.transactionHistoryStaticView = Ti.UI.createView({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "transactionHistoryStaticView"
    });
    $.__views.transactionHistoryStaticView && $.addTopLevelView($.__views.transactionHistoryStaticView);
    $.__views.__alloyId40 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        left: "10%",
        top: 0,
        height: "40%",
        id: "__alloyId40"
    });
    $.__views.transactionHistoryStaticView.add($.__views.__alloyId40);
    $.__views.topLabel = Ti.UI.createLabel({
        width: "auto",
        height: "auto",
        left: 0,
        text: "history",
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Bold",
            fontSize: 40
        },
        id: "topLabel"
    });
    $.__views.__alloyId40.add($.__views.topLabel);
    $.__views.__alloyId41 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        top: 0,
        height: "55%",
        id: "__alloyId41"
    });
    $.__views.transactionHistoryStaticView.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "4%",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        top: "13%",
        touchEnabled: false,
        text: "Credit",
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.creditView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "creditView",
        top: "10%"
    });
    $.__views.__alloyId42.add($.__views.creditView);
    $.__views.rupeeSymbol1 = Ti.UI.createImageView({
        width: 12,
        height: 12,
        id: "rupeeSymbol1"
    });
    $.__views.creditView.add($.__views.rupeeSymbol1);
    $.__views.credit = Ti.UI.createLabel({
        color: "#3B0B0B",
        font: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "bold",
            fontSize: 15
        },
        id: "credit",
        text: "500"
    });
    $.__views.creditView.add($.__views.credit);
    $.__views.__alloyId44 = Ti.UI.createView({
        left: "0",
        height: "75%",
        top: "12.5%",
        bottom: "12.5%",
        width: "0.3%",
        backgroundColor: "#444444",
        id: "__alloyId44"
    });
    $.__views.__alloyId41.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "0",
        id: "__alloyId45"
    });
    $.__views.__alloyId41.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        top: "13%",
        touchEnabled: false,
        text: "Debit",
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    $.__views.debitView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "debitView",
        top: "10%"
    });
    $.__views.__alloyId45.add($.__views.debitView);
    $.__views.rupeeSymbol2 = Ti.UI.createImageView({
        width: 12,
        height: 12,
        id: "rupeeSymbol2"
    });
    $.__views.debitView.add($.__views.rupeeSymbol2);
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
    $.__views.__alloyId47 = Ti.UI.createView({
        left: "0",
        height: "75%",
        top: "12.5%",
        bottom: "12.5%",
        width: "0.3%",
        backgroundColor: "#444444",
        id: "__alloyId47"
    });
    $.__views.__alloyId41.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "30%",
        left: "0",
        right: "4%",
        id: "__alloyId48"
    });
    $.__views.__alloyId41.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18
        },
        color: "#3B0B0B",
        top: "13%",
        touchEnabled: false,
        text: "Total",
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.totalView = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "totalView",
        top: "10%"
    });
    $.__views.__alloyId48.add($.__views.totalView);
    $.__views.rupeeSymbol3 = Ti.UI.createImageView({
        width: 12,
        height: 12,
        id: "rupeeSymbol3"
    });
    $.__views.totalView.add($.__views.rupeeSymbol3);
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
    Ti.App.addEventListener("app:transactionStaticView", function(e) {
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