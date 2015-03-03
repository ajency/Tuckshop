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
    function loadCategoryPicker() {
        androidCategoryPicker = Ti.UI.createPicker({
            top: topMargin,
            left: "20%",
            right: "20%",
            width: "60%",
            height: heightValue,
            backgroundImage: "/images/dropdown.png"
        });
        var categoryData = localStorage.getAllCategories();
        var data = [];
        for (var i = 0; len = categoryData.length, len > i; i++) data[i] = Ti.UI.createPickerRow({
            title: categoryData[i].categoryName,
            width: "Ti.UI.FILL"
        });
        androidCategoryPicker.add(data);
        $.pickerView.add(androidCategoryPicker);
    }
    function loadProductPicker(id) {
        filterproducts(id);
        null != androidProductPicker && $.pickerView.remove(androidProductPicker);
        androidProductPicker = Ti.UI.createPicker({
            top: topMargin,
            left: "20%",
            right: "20%",
            width: "60%",
            height: heightValue,
            backgroundImage: "/images/dropdown.png"
        });
        column1 = Ti.UI.createPickerColumn();
        allProducts.unshift({
            productName: "Select a Product"
        });
        console.log("length of products");
        console.log(allProducts.length);
        var productsData = allProducts;
        for (var i = 0; len = productsData.length, len > i; i++) {
            var row = Ti.UI.createPickerRow({
                title: productsData[i].productName,
                width: "Ti.UI.FILL"
            });
            column1.addRow(row);
        }
        androidProductPicker.add([ column1 ]);
        $.pickerView.add(androidProductPicker);
        androidProductPicker.addEventListener("change", changeEvent);
    }
    function categoryChange(e) {
        var selectedCategory = _.filter(localStorage.getAllCategories(), function(product) {
            return product.categoryName == e.selectedValue;
        });
        loadProductPicker(parseInt(selectedCategory[0].categoryId));
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
        layout: "horizontal",
        id: "pickerView"
    });
    $.__views.pickerView && $.addTopLevelView($.__views.pickerView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    var localStorage = require("/localStorage");
    arguments[0] || {};
    var androidCategoryPicker;
    var androidProductPicker;
    var allProducts;
    var column1;
    var topMargin;
    var heightValue;
    topMargin = "20%";
    heightValue = null;
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
    loadCategoryPicker();
    loadProductPicker(111);
    androidCategoryPicker.addEventListener("change", categoryChange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;