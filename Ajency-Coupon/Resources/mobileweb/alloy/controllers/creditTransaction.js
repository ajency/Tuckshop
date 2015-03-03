function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "creditTransaction";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("platformSupport");
    require("animation");
    var moment = require("alloy/moment");
    Cloud.Objects.query({
        classname: "testItems",
        page: 1,
        per_page: 50,
        where: {
            userId: Ti.App.Properties.getString("userid"),
            productName: "Credit"
        }
    }, function(e) {
        if (e.success) {
            Ti.API.info("response:", JSON.stringify(e.testItems));
            var items = [];
            var day;
            for (var i = 0, len = e.testItems.length; len > i; i++) {
                var testItem = e.testItems[i];
                day = moment(testItem.created_at);
                items.push({
                    productLabel: {
                        text: testItem.productName
                    },
                    userLabel: {
                        text: testItem.productPrice
                    },
                    dateLabel: {
                        text: day.format("MMMM Do YYYY")
                    }
                });
            }
            $.section.items = $.section.items.concat(items);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;