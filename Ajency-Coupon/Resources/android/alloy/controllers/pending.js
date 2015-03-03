function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function clearTableData() {
        $.itemsTable.data = empty;
        $.itemsTable.data = tableData;
    }
    function getSwipeRow(eSwipe) {
        function buyClicked(e) {
            e.cancelBubble = true;
            Ti.App.Properties.removeProperty("pendingItems");
            tableData.splice(eSwipe.rowData.id, 1);
            localStorage.savePendingItems(tableData);
            clearTableData();
        }
        function cancelClicked(e) {
            e.cancelBubble = true;
            clearTableData();
            buyView.removeEventListener("click", buyClicked);
            cancelView.removeEventListener("click", cancelClicked);
        }
        var row = Ti.UI.createTableViewRow({
            id: "swipeRow",
            height: 70,
            focusable: true,
            backgroundSelectedColor: "transparent"
        });
        var view = Ti.UI.createView({
            layout: "horizontal",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            backgroundColor: "#F0C60A"
        });
        var buyView = Ti.UI.createView({
            left: "10%",
            layout: "horizontal",
            height: Ti.UI.SIZE,
            width: "55%"
        });
        var buyLabel = Ti.UI.createLabel({
            left: 0,
            text: "DONE",
            color: "#444444",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 20,
                fontWeight: "bold"
            }
        });
        var buyImage = Ti.UI.createImageView({
            left: "2%",
            height: 40,
            width: 40,
            image: "/images/icon_buy.png"
        });
        buyView.add(buyLabel);
        buyView.add(buyImage);
        var cancelView = Ti.UI.createView({
            layout: "horizontal",
            height: Ti.UI.SIZE,
            width: "35%"
        });
        var verticalSeparator = Ti.UI.createView({
            left: 0,
            top: "12.5%",
            bottom: "12.5%",
            height: "75%",
            width: "1%",
            backgroundColor: "#444444"
        });
        var cancelArrow = Ti.UI.createImageView({
            left: "10%",
            height: 30,
            width: 30,
            image: "/images/icon_cancel.png"
        });
        var cancelLabel = Ti.UI.createLabel({
            left: "2%",
            text: "Cancel",
            color: "#444444",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 15
            }
        });
        cancelView.add(verticalSeparator);
        cancelView.add(cancelArrow);
        cancelView.add(cancelLabel);
        buyView.addEventListener("click", buyClicked);
        cancelView.addEventListener("click", cancelClicked);
        view.add(buyView);
        view.add(cancelView);
        row.add(view);
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pending";
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
    $.__views.pending = Ti.UI.createView({
        layout: "vertical",
        id: "pending"
    });
    $.__views.pending && $.addTopLevelView($.__views.pending);
    $.__views.animateObject = Ti.UI.createImageView({
        id: "animateObject",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.pending.add($.__views.animateObject);
    $.__views.itemErrorLabel = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 15
        },
        text: "Tap to Retry",
        id: "itemErrorLabel",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.pending.add($.__views.itemErrorLabel);
    $.__views.itemsTable = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "itemsTable",
        separatorColor: "#F0C60A"
    });
    $.__views.pending.add($.__views.itemsTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy");
    arguments[0] || {};
    var localStorage = require("/localStorage");
    var networkCheck = require("/networkCheck");
    var tableData = empty = [];
    $.itemErrorLabel.addEventListener("click", function() {
        0 == networkCheck.getNetworkStatus() ? alert("No Internet Connection") : populateItems(localStorage.getPendingItems());
    });
    var populateItems = function(jsonData) {
        console.log("table data");
        console.log(jsonData);
        var row = view = imageView = productNameLabel = dateLabel = null;
        for (var i = 0; len = _.size(jsonData), len > i; i++) {
            console.log("Table data");
            console.log(jsonData[i].name);
            row = Ti.UI.createTableViewRow({
                id: i,
                height: 70,
                backgroundSelectedColor: "transparent",
                backgroundColor: "white"
            });
            view = Ti.UI.createView({
                layout: "vertical",
                width: Ti.UI.FILL,
                height: 70,
                backgroundColor: "transparent"
            });
            productNameLabel = Ti.UI.createLabel({
                touchEnabled: false,
                left: "20%",
                textAlign: "left",
                text: jsonData[i].name,
                color: "#3B0B0B",
                font: {
                    fontFamily: "OpenSans-Regular",
                    fontSize: 20
                }
            });
            dateLabel = Ti.UI.createLabel({
                touchEnabled: false,
                top: "10%",
                left: "20%",
                textAlign: "center",
                text: jsonData[i].date,
                color: "#A4A4A4",
                font: {
                    fontFamily: "OpenSans-Regular",
                    fontSize: 13
                }
            });
            view.add(productNameLabel);
            view.add(dateLabel);
            row.add(view);
            tableData.push(row);
            row = productNameLabel = null;
        }
        $.itemsTable.data = tableData;
    };
    localStorage.getPendingItems() ? populateItems(localStorage.getPendingItems()) : alert("No Pending Items");
    $.itemsTable.addEventListener("click", function(e) {
        clearTableData();
        $.itemsTable.updateRow(e.index, getSwipeRow(e));
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;