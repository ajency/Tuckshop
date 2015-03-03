function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
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
    $.__views.startWindow = Ti.UI.createWindow({
        backgroundColor: "#000000",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "startWindow"
    });
    $.__views.startWindow && $.addTopLevelView($.__views.startWindow);
    $.__views.__alloyId64 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId64"
    });
    $.__views.startWindow.add($.__views.__alloyId64);
    $.__views.headerView = Ti.UI.createView({
        width: Ti.UI.FILL,
        top: 0,
        backgroundColor: "#F5CE1E",
        id: "headerView",
        height: "9%"
    });
    $.__views.__alloyId64.add($.__views.headerView);
    $.__views.headerMenu = Ti.UI.createImageView({
        left: "5%",
        top: "20%",
        bottom: "20%",
        image: "/images/menu.png",
        width: "8%",
        height: "60%",
        id: "headerMenu"
    });
    $.__views.headerView.add($.__views.headerMenu);
    $.__views.headerLogo = Ti.UI.createImageView({
        top: "20%",
        bottom: "20%",
        image: "/images/header_logo.png",
        width: "50%",
        height: "60%",
        id: "headerLogo"
    });
    $.__views.headerView.add($.__views.headerLogo);
    $.__views.staticView = Ti.UI.createView({
        width: Ti.UI.FILL,
        top: 0,
        backgroundColor: "#F0C60A",
        id: "staticView",
        height: "25%"
    });
    $.__views.__alloyId64.add($.__views.staticView);
    $.__views.midContainer = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0,
        backgroundColor: "#FFFFFF",
        id: "midContainer"
    });
    $.__views.__alloyId64.add($.__views.midContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("platformSupport");
    require("animation");
    require("alloy/animation");
    var alloy = require("alloy");
    console.log("main called");
    $.headerMenu.addEventListener("click", function() {
        if ("/images/menu_back.png" === $.headerMenu.image) {
            null != alloy.Globals.successOnRefresh && Ti.App.removeEventListener("successOnFetch", alloy.Globals.successOnRefresh);
            Ti.App.fireEvent("screen:back");
        } else Ti.App.fireEvent("menu:toggleLeftMenu");
    });
    var clearViews = function() {
        $.staticView.removeAllChildren();
        $.midContainer.removeAllChildren();
    };
    var getCategoriesJson = function(categoryId) {
        var data = {};
        Ti.include("/data/categoriesData.js");
        var feeds = localStorage.getAllCategories();
        for (var i = 0; len = _.size(feeds), len > i; i++) {
            console.log(feeds[i]);
            if (feeds[i].categoryId === categoryId) {
                data.imagePath = feeds[i].photo.urls.small_240;
                data.labelText = feeds[i].categoryFancyName;
            }
        }
        return data;
    };
    var loadStaticView = function(id) {
        var view = Ti.UI.createView({
            bottom: "5%",
            left: "10%",
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        var horizontalSeparator = Ti.UI.createView({
            bottom: 0,
            height: "2%",
            width: Ti.UI.FILL,
            backgroundColor: "#E7BE07"
        });
        var boldLabel = Ti.UI.createLabel({
            left: 0,
            color: "#3B0B0B",
            width: "auto",
            height: 40,
            font: {
                fontFamily: "OpenSans-Bold",
                fontSize: 35
            }
        });
        var regularLabel = Ti.UI.createLabel({
            left: 0,
            color: "#3B0B0B",
            width: "auto",
            height: "auto",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 35
            }
        });
        var image = Ti.UI.createImageView({
            left: 0,
            bottom: 5,
            height: 50,
            width: 45
        });
        switch (id) {
          case "Home":
            view.setLayout("vertical");
            boldLabel.setText("I want");
            regularLabel.setText("something...");
            view.add(boldLabel);
            view.add(regularLabel);
            break;

          case "Transaction History":
            view = null;
            view = Alloy.createController("transactionHistoryStaticView").getView();
            break;

          case "Manage":
            view.setLayout("horizontal");
            boldLabel.height = "auto";
            boldLabel.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
            boldLabel.font = {
                fontFamily: "OpenSans-Bold",
                fontSize: 40
            };
            boldLabel.setText("Manage");
            view.add(boldLabel);
            break;

          case "Pending":
            view.setLayout("horizontal");
            boldLabel.height = "auto";
            boldLabel.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
            boldLabel.font = {
                fontFamily: "OpenSans-Bold",
                fontSize: 40
            };
            boldLabel.setText("Pending");
            view.add(boldLabel);
            break;

          case "Manage Users":
            view.setLayout("horizontal");
            boldLabel.height = "auto";
            boldLabel.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
            boldLabel.font = {
                fontFamily: "OpenSans-Bold",
                fontSize: 40
            };
            boldLabel.setText("Users");
            view.add(boldLabel);
            break;

          case "UserList":
            view = null;
            view = Alloy.createController("adminHistoryStaticView").getView();
            break;

          case "Manage Products":
            view.setLayout("horizontal");
            boldLabel.height = "auto";
            boldLabel.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
            boldLabel.font = {
                fontFamily: "OpenSans-Bold",
                fontSize: 40
            };
            boldLabel.setText("Products");
            view.add(boldLabel);
            break;

          case "Product Transaction":
            view = null;
            view = Alloy.createController("productHistoryStaticView").getView();
            break;

          case "Stock":
          case "Add Stock":
          case "Settings":
            view.setLayout("horizontal");
            boldLabel.height = "auto";
            boldLabel.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
            boldLabel.font = {
                fontFamily: "OpenSans-Bold",
                fontSize: 40
            };
            boldLabel.setText(id);
            view.add(boldLabel);
            break;

          default:
            var data = getCategoriesJson(id);
            view.setLayout("horizontal");
            boldLabel.height = "auto";
            boldLabel.verticalAlign = Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP;
            boldLabel.font = {
                fontFamily: "OpenSans-Bold",
                fontSize: 40
            };
            boldLabel.setText(data.labelText);
            image.setImage(data.imagePath);
            view.add(image);
            view.add(boldLabel);
        }
        $.staticView.add(view);
        $.staticView.add(horizontalSeparator);
    };
    var getAllProducts = function(categoryId) {
        var params = {
            categoryId: categoryId
        };
        $.midContainer.add(Alloy.createController("allProducts", params).getView());
    };
    var getAllUsers = function() {
        $.midContainer.add(Alloy.createController("usersList").getView());
    };
    var getUserTransactions = function(params) {
        $.midContainer.add(Alloy.createController("adminHistory", params).getView());
    };
    var productSelection = function() {
        $.midContainer.add(Alloy.createController("selectProduct").getView());
    };
    var getProductTransactions = function(params) {
        $.midContainer.add(Alloy.createController("adminHistory", params).getView());
    };
    var addRemoveStock = function() {
        $.midContainer.add(Alloy.createController("stocks").getView());
    };
    var init = function(view) {
        setTimeout(function() {
            switch (view) {
              case "Home":
                loadStaticView(view);
                $.midContainer.add(Alloy.createController("home").getView());
                break;

              case "Transaction History":
                loadStaticView(view);
                $.midContainer.add(Alloy.createController("transactionHistory").getView());
                break;

              case "Manage":
                loadStaticView(view);
                $.midContainer.add(Alloy.createController("adminMainView", "admin").getView());
                break;

              case "Pending":
                loadStaticView(view);
                $.midContainer.add(Alloy.createController("pending").getView());
                break;

              case "Stock":
                loadStaticView(view);
                $.midContainer.add(Alloy.createController("adminMainView", "stock").getView());
                break;

              case "Settings":
                loadStaticView(view);
                $.midContainer.add(Alloy.createController("settings").getView());
            }
        }, 200);
    };
    alloy.Globals.midContainerReference = function(e) {
        clearViews();
        var id = e.id;
        switch (id) {
          case "Home":
            console.log("Home");
            $.headerMenu.image = "/images/menu.png";
            init("Home");
            break;

          case "Transaction History":
            console.log("Transaction history");
            $.headerMenu.image = "/images/menu_back.png";
            init("Transaction History");
            break;

          case "Manage":
            $.headerMenu.image = "/images/menu_back.png";
            init("Manage");
            break;

          case "Pending":
            $.headerMenu.image = "/images/menu_back.png";
            init("Pending");
            break;

          case "Manage Users":
            console.log("Manage users");
            $.headerMenu.image = "/images/menu_back.png";
            loadStaticView(id);
            getAllUsers();
            break;

          case "UserList":
            $.headerMenu.image = "/images/menu_back.png";
            loadStaticView(id);
            var params = {
                userid: e.userid,
                name: e.name
            };
            getUserTransactions(params);
            break;

          case "Manage Products":
            $.headerMenu.image = "/images/menu_back.png";
            loadStaticView(id);
            productSelection();
            break;

          case "Product Transaction":
            $.headerMenu.image = "/images/menu_back.png";
            loadStaticView(id);
            var params = {
                productid: e.productid,
                name: e.name
            };
            getProductTransactions(params);
            break;

          case "Stock":
            $.headerMenu.image = "/images/menu_back.png";
            init("Stock");
            break;

          case "Add Stock":
            $.headerMenu.image = "/images/menu_back.png";
            loadStaticView(id);
            addRemoveStock();
            break;

          case "Settings":
            $.headerMenu.image = "/images/menu_back.png";
            init("Settings");
            break;

          default:
            console.log("Product id: " + id);
            $.headerMenu.image = "/images/menu_back.png";
            loadStaticView(id);
            getAllProducts(id);
        }
    };
    Ti.App.addEventListener("app:addViewToMidContainer", alloy.Globals.midContainerReference);
    init("Home");
    $.startWindow.addEventListener("close", function() {
        $.destroy();
        $.off();
        $.startWindow.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;