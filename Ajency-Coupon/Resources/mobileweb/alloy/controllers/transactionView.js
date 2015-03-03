function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "transactionView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    require("platformSupport");
    require("animation");
    var moment = require("alloy/moment");
    Cloud.Objects.query({
        classname: "testItems",
        page: 1,
        per_page: 50,
        where: {
            userId: Ti.App.Properties.getString("userid")
        }
    }, function(e) {
        if (e.success) {
            Ti.API.info("response:", JSON.stringify(e.testItems));
            var items = [];
            var totalAmountArray = [];
            var amountSpent = 0;
            var day;
            for (var i = 0, len = e.testItems.length; len > i; i++) {
                var testItem = e.testItems[i];
                day = moment(testItem.created_at);
                Ti.API.info("Date:" + day.format("lll"));
                items.push({
                    productLabel: {
                        text: testItem.productName
                    },
                    userLabel: {
                        text: testItem.productPrice
                    },
                    dateLabel: {
                        text: day.format("lll")
                    }
                });
                totalAmountArray.push(testItem.productPrice);
                amountSpent += totalAmountArray[i];
            }
            $.section.items = $.section.items.concat(items);
            $.totalLabel.text = "Total : " + amountSpent;
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;