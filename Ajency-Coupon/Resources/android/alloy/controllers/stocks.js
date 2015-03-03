function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addStock() {
        void 0 != selectedProduct ? "" != quantityTextField.value.trim() ? Cloud.Objects.create({
            classname: "testItems",
            acl_name: "object_update_access",
            fields: {
                productName: selectedProduct[0].productName,
                productPrice: selectedProduct[0].productPrice,
                productId: selectedProduct[0].productId,
                quantity: parseInt(quantityTextField.value)
            }
        }, function(e) {
            alert(e.success ? "Stock added successfully" : "Error:\n" + (e.error && e.message || JSON.stringify(e)));
        }) : alert("Quantity cannot be blank") : alert("Please select a Product");
    }
    function filterproducts(id) {
        allProducts = [];
        allProducts = _.filter(localStorage.getCloudProducts(), function(product) {
            return product.categoryId == id;
        });
    }
    function loadAndroidCategoryPicker() {
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
        $.topView.add(androidCategoryPicker);
    }
    function loadAndroidProductPicker(id) {
        filterproducts(id);
        null != androidProductPicker && $.topView.remove(androidProductPicker);
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
        var productsData = allProducts;
        for (var i = 0; len = productsData.length, len > i; i++) {
            var row = Ti.UI.createPickerRow({
                title: productsData[i].productName,
                width: "Ti.UI.FILL"
            });
            column1.addRow(row);
        }
        androidProductPicker.add([ column1 ]);
        $.topView.add(androidProductPicker);
        androidProductPicker.addEventListener("change", productChange);
    }
    function addComponents() {
        quantityTextField = Ti.UI.createTextField({
            top: "10%",
            left: "20%",
            right: "20%",
            width: "60%",
            hintText: "Enter Quantity",
            backgroundColor: "#FFF",
            color: "#222",
            borderWidth: 1,
            borderColor: "#3B0B0B",
            softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS,
            keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
            returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE
        });
        quantityTextField.addEventListener("return", function() {
            quantityTextField.blur();
        });
        $.bottomView.add(quantityTextField);
        addButton = Ti.UI.createButton({
            title: "Add",
            top: "10%",
            left: "20%",
            right: "20%",
            width: "60%",
            color: "#3B0B0B",
            backgroundColor: "#F0C60A",
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        $.bottomView.add(addButton);
        addButton.addEventListener("click", addStock);
    }
    function categoryChange(e) {
        var selectedCategory = _.filter(localStorage.getAllCategories(), function(product) {
            return product.categoryName == e.selectedValue;
        });
        loadAndroidProductPicker(parseInt(selectedCategory[0].categoryId));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "stocks";
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
    $.__views.scrollView = Ti.UI.createView({
        layout: "vertical",
        id: "scrollView"
    });
    $.__views.scrollView && $.addTopLevelView($.__views.scrollView);
    $.__views.topView = Ti.UI.createView({
        layout: "vertical",
        id: "topView",
        height: "50%"
    });
    $.__views.scrollView.add($.__views.topView);
    $.__views.bottomView = Ti.UI.createView({
        layout: "vertical",
        id: "bottomView",
        height: "50%"
    });
    $.__views.scrollView.add($.__views.bottomView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy");
    var localStorage = require("/localStorage");
    arguments[0] || {};
    var androidCategoryPicker;
    var androidProductPicker;
    var quantityTextField;
    var addButton;
    var selectedProduct;
    var allProducts;
    var column1;
    var topMargin;
    var heightValue;
    topMargin = "10%";
    heightValue = null;
    var productChange = function(e) {
        var value;
        value = e.selectedValue;
        selectedProduct = _.filter(localStorage.getCloudProducts(), function(product) {
            return product.productName == value;
        });
    };
    loadAndroidCategoryPicker();
    loadAndroidProductPicker(111);
    addComponents();
    androidCategoryPicker.addEventListener("change", categoryChange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;