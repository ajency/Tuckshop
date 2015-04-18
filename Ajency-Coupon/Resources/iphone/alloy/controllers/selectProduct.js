function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function filterproducts(id) {
        allProducts = [];
        allProducts = _.filter(localStorage.getCloudProducts(), function(product) {
            return product.categoryId === id;
        });
    }
    function categoryChange(e) {
        var selectedCategory = _.filter(localStorage.getAllCategories(), function(product) {
            return product.categoryName == e.selectedValue;
        });
        $.categoryButton.setTitle(selectedCategory[0].categoryName);
        id = parseInt(selectedCategory[0].categoryId);
    }
    function loadIosCategoryPicker() {
        null != iosProductPicker && $.pickerView.remove(iosProductPicker);
        null != iosCategoryPicker && $.pickerView.remove(iosCategoryPicker);
        iosCategoryPicker = Ti.UI.createPicker({
            bottom: "0%",
            width: "100%"
        });
        var categoryData = localStorage.getAllCategories();
        var data = [];
        for (var i = 0; len = categoryData.length, len > i; i++) data[i] = Ti.UI.createPickerRow({
            title: categoryData[i].categoryName,
            width: "Ti.UI.FILL"
        });
        iosCategoryPicker.add(data);
        $.pickerView.add(iosCategoryPicker);
        iosCategoryPicker.addEventListener("change", categoryChange);
    }
    function loadIosProductPicker() {
        filterproducts(id);
        null != iosCategoryPicker && $.pickerView.remove(iosCategoryPicker);
        null != iosProductPicker && $.pickerView.remove(iosProductPicker);
        iosProductPicker = Ti.UI.createPicker({
            bottom: "0%",
            width: "100%"
        });
        column1 = Ti.UI.createPickerColumn();
        allProducts.unshift({
            productName: "Select a Product"
        });
        var productsData = allProducts;
        for (var i = 0; len = productsData.length, len > i; i++) {
            var row = Ti.UI.createPickerRow({
                title: productsData[i].productName,
                width: "Ti.UI.FILL"
            });
            column1.addRow(row);
        }
        iosProductPicker.add([ column1 ]);
        $.pickerView.add(iosProductPicker);
        iosProductPicker.addEventListener("change", changeEvent);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "selectProduct";
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
    $.__views.pickerView = Ti.UI.createView({
        layout: "vertical",
        id: "pickerView"
    });
    $.__views.pickerView && $.addTopLevelView($.__views.pickerView);
    $.__views.categoryButton = Ti.UI.createButton({
        width: "90%",
        left: "5%",
        right: "5%",
        color: "#3B0B0B",
        backgroundColor: "#F0C60A",
        title: "Select a Category",
        top: "10%",
        id: "categoryButton"
    });
    $.__views.pickerView.add($.__views.categoryButton);
    $.__views.productButton = Ti.UI.createButton({
        width: "90%",
        left: "5%",
        right: "5%",
        color: "#3B0B0B",
        backgroundColor: "#F0C60A",
        title: "Select a Product",
        top: "10%",
        id: "productButton"
    });
    $.__views.pickerView.add($.__views.productButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    var localStorage = require("/localStorage");
    arguments[0] || {};
    var iosCategoryPicker;
    var iosProductPicker;
    var id = 111;
    var allProducts;
    var column1;
    var topMargin;
    var heightValue;
    topMargin = "5%";
    heightValue = "30%";
    var changeEvent = function(e) {
        var value;
        value = e.selectedValue;
        var selectedProduct = _.filter(localStorage.getCloudProducts(), function(product) {
            return product.productName == value;
        });
        if (void 0 != selectedProduct[0]) {
            var evtData = {
                id: "Product Transaction",
                productid: selectedProduct[0].productId,
                name: selectedProduct[0].productName
            };
            alloy.Globals.navigatedView = evtData.id;
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
        }
    };
    $.categoryButton.addEventListener("click", loadIosCategoryPicker);
    $.productButton.addEventListener("click", loadIosProductPicker);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;