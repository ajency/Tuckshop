function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadingAnimation() {
        $.animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png";
        loaderIndex++;
        5 === loaderIndex && (loaderIndex = 1);
    }
    function clearMenuSelection(rowId) {
        for (i = 0; len = _.size(tableData), len > i; i++) tableData[i].id != rowId && tableData[i].setBackgroundColor("transparent");
    }
    function onMenuTableClick(e) {
        rowId = e.source.id;
        alloy.Globals.navigatedView = rowId;
        var evtData = {
            id: rowId
        };
        clearMenuSelection(rowId);
        e.source.backgroundColor = "#F0C60A";
        switch (rowId) {
          case "Home":
            Ti.App.fireEvent("menu:toggleLeftMenu");
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
            break;

          case "Transaction History":
            Ti.App.fireEvent("menu:toggleLeftMenu");
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
            break;

          case "Manage":
            Ti.App.fireEvent("menu:toggleLeftMenu");
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
            break;

          case "Pending":
            Ti.App.fireEvent("menu:toggleLeftMenu");
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
            break;

          case "Stock":
            Ti.App.fireEvent("menu:toggleLeftMenu");
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
            break;

          case "Settings":
            Ti.App.fireEvent("menu:toggleLeftMenu");
            Ti.App.fireEvent("app:addViewToMidContainer", evtData);
            evtData = null;
            break;

          case "Logout":
            userLogout();
            break;

          default:
            console.log("Invalid row");
        }
    }
    function refreshClick() {
        if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else {
            showImageView();
            loaderAnimate = setInterval(loadingAnimation, 200);
            $.menuTable.visible = false;
            $.leftMenuRefreshLabel.visible = false;
            "fetchCategories" === type ? fetchProductsJs.fetchCategories("leftMenu") : "fetchCloudProducts" === type ? fetchProductsJs.fetchCloudProducts("leftMenu") : "transactionsOnProductIds" === type ? fetchProductsJs.transactionsOnProductIds("leftMenu") : "transactionsOnProductIdsGreaterThanThousand" === type && fetchProductsJs.transactionsOnProductIdsGreaterThanThousand("leftMenu");
        }
    }
    function userLogout() {
        if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else {
            showImageView();
            loaderAnimate = setInterval(loadingAnimation, 200);
            $.menuTable.visible = false;
            $.leftMenuRefreshLabel.visible = false;
            Cloud.Users.logout(function(e) {
                if (e.success) {
                    hideImageView();
                    clearInterval(loaderAnimate);
                    Ti.App.Properties.removeProperty("sessionID");
                    $.menuTable.visible = true;
                    $.leftMenuRefreshLabel.visible = true;
                    dbOperations.updateSessionId(localStorage.getLastLoggedInUserId());
                    dbOperations.offlineLoginStatus(localStorage.getLastLoggedInUserId());
                    alloy.Globals.autoLogin = false;
                    alloy.Globals.userResponse = [];
                    var totalUsers = dbOperations.getCount();
                    if (totalUsers > 1) {
                        null != alloy.Globals.logoutInterval && clearTimeout(alloy.Globals.logoutInterval);
                        {
                            Alloy.createController("multiUser", {}).getView().open();
                        }
                    } else {
                        Ti.App.fireEvent("menu:toggleLeftMenu");
                        alloy.Globals.populateLeftMenu();
                    }
                } else {
                    hideImageView();
                    clearInterval(loaderAnimate);
                    $.menuTable.visible = true;
                    $.leftMenuRefreshLabel.visible = true;
                    alert("Could not connect to server. Try again ");
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "leftMenu";
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
    var __defers = {};
    $.__views.leftMenu = Ti.UI.createWindow({
        backgroundColor: "#FFFFFF",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        id: "leftMenu"
    });
    $.__views.leftMenu && $.addTopLevelView($.__views.leftMenu);
    $.__views.__alloyId55 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        left: 0,
        top: 0,
        height: "85%",
        id: "__alloyId55"
    });
    $.__views.leftMenu.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createView({
        height: "25%",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.menuHeaderIcon = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "menuHeaderIcon",
        image: "/images/menu_header.png"
    });
    $.__views.__alloyId56.add($.__views.menuHeaderIcon);
    $.__views.__alloyId57 = Ti.UI.createView({
        top: "2%",
        height: "7%",
        id: "__alloyId57"
    });
    $.__views.__alloyId55.add($.__views.__alloyId57);
    $.__views.lbl_username = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 25
        },
        left: "10%",
        color: "#3B0B0B",
        id: "lbl_username",
        text: ""
    });
    $.__views.__alloyId57.add($.__views.lbl_username);
    $.__views.__alloyId58 = Ti.UI.createView({
        top: "4%",
        height: "4%",
        id: "__alloyId58"
    });
    $.__views.__alloyId55.add($.__views.__alloyId58);
    $.__views.lbl_credit = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 15
        },
        left: "10%",
        color: "#3B0B0B",
        id: "lbl_credit",
        text: "Your available credit is"
    });
    $.__views.__alloyId58.add($.__views.lbl_credit);
    $.__views.__alloyId59 = Ti.UI.createView({
        layout: "horizontal",
        top: "2%",
        height: "12%",
        id: "__alloyId59"
    });
    $.__views.__alloyId55.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createView({
        width: "25%",
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    $.__views.rupeeSymbol = Ti.UI.createImageView({
        right: 0,
        top: "37.5%",
        bottom: "37.5%",
        height: "25%",
        width: "15%",
        id: "rupeeSymbol"
    });
    $.__views.__alloyId60.add($.__views.rupeeSymbol);
    $.__views.__alloyId61 = Ti.UI.createView({
        width: "75%",
        id: "__alloyId61"
    });
    $.__views.__alloyId59.add($.__views.__alloyId61);
    $.__views.lbl_availableCredit = Ti.UI.createLabel({
        textAlign: "center",
        color: "#3B0B0B",
        left: "1%",
        font: {
            fontFamily: "OpenSans-Bold",
            fontSize: 35
        },
        id: "lbl_availableCredit",
        text: ""
    });
    $.__views.__alloyId61.add($.__views.lbl_availableCredit);
    $.__views.animateObject = Ti.UI.createImageView({
        id: "animateObject",
        height: "0",
        width: "0",
        top: "0",
        image: "/images/loader-1.png"
    });
    $.__views.__alloyId55.add($.__views.animateObject);
    $.__views.menuTable = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        id: "menuTable",
        top: "0.1%",
        height: "36%",
        separatorColor: "#F0C60A"
    });
    $.__views.__alloyId55.add($.__views.menuTable);
    onMenuTableClick ? $.__views.menuTable.addEventListener("click", onMenuTableClick) : __defers["$.__views.menuTable!click!onMenuTableClick"] = true;
    $.__views.__alloyId62 = Ti.UI.createView({
        top: "1%",
        height: "4%",
        id: "__alloyId62"
    });
    $.__views.__alloyId55.add($.__views.__alloyId62);
    $.__views.leftMenuRefreshLabel = Ti.UI.createLabel({
        text: "Refresh",
        id: "leftMenuRefreshLabel",
        left: "35%",
        height: "40",
        width: "200"
    });
    $.__views.__alloyId62.add($.__views.leftMenuRefreshLabel);
    refreshClick ? $.__views.leftMenuRefreshLabel.addEventListener("click", refreshClick) : __defers["$.__views.leftMenuRefreshLabel!click!refreshClick"] = true;
    $.__views.__alloyId63 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        left: 0,
        bottom: 0,
        height: "15%",
        id: "__alloyId63"
    });
    $.__views.leftMenu.add($.__views.__alloyId63);
    $.__views.menu_footer = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "menu_footer",
        image: "/images/footer.png"
    });
    $.__views.__alloyId63.add($.__views.menu_footer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    var tableData = [];
    var row = label = null;
    var fetchProductsJs = require("/fetchCloudProducts");
    var loaderAnimate;
    var networkCheck = require("/networkCheck");
    var type = "fetchCategories";
    var loaderIndex = 1;
    var showImageView = function() {
        $.animateObject.height = 96;
        $.animateObject.width = 96;
    };
    var hideImageView = function() {
        $.animateObject.height = 0;
        $.animateObject.width = 0;
    };
    Alloy.Globals.populateLeftMenu = function() {
        tableData = [];
        var labelText = null;
        var loginStatus = dbOperations.getLoginStatus(localStorage.getLastLoggedInUserId());
        loginStatus = "true" === loginStatus ? 1 : 0;
        labelText = loginStatus ? "true" === dbOperations.getUserType(localStorage.getLastLoggedInUserId()) ? [ "Home", "Transaction History", "Manage", "Stock", "Settings", "Logout" ] : "cook" === dbOperations.getUserRole(localStorage.getLastLoggedInUserId()) ? [ "Home", "Transaction History", "Pending", "Stock", "Settings", "Logout" ] : [ "Home", "Transaction History", "Settings", "Logout" ] : [ "Home", "Transaction History" ];
        for (var i = 0; len = _.size(labelText), len > i; i++) {
            row = Ti.UI.createTableViewRow({
                id: labelText[i],
                height: 40,
                focusable: true,
                backgroundSelectedColor: "transparent"
            });
            label = Ti.UI.createLabel({
                touchEnabled: false,
                left: "10%",
                text: labelText[i],
                textAlign: "left",
                color: "#3B0B0B",
                font: {
                    fontFamily: "OpenSans-Regular",
                    fontSize: 15
                }
            });
            row.add(label);
            tableData.push(row);
            row = label = null;
        }
        $.menuTable.data = tableData;
        $.rupeeSymbol.image = localStorage.getCurrencyUrl();
    };
    alloy.Globals.populateLeftMenu();
    tableData[0].setBackgroundColor("#F0C60A");
    Ti.App.addEventListener("errorOnFetch", function(data) {
        hideImageView();
        null != loaderAnimate && clearInterval(loaderAnimate);
        $.menuTable.visible = true;
        $.leftMenuRefreshLabel.visible = true;
        $.leftMenuRefreshLabel.text = "Error. Try Again";
        type = data.name;
    });
    alloy.Globals.successOnRefresh = function() {
        console.log("Success on fetch");
        hideImageView();
        null != loaderAnimate && clearInterval(loaderAnimate);
        $.menuTable.visible = true;
        $.leftMenuRefreshLabel.visible = true;
        $.leftMenuRefreshLabel.text = "Refresh";
        Ti.App.fireEvent("refreshCategories");
    };
    Ti.App.addEventListener("successOnFetch", alloy.Globals.successOnRefresh);
    Ti.App.addEventListener("Calculate", function(data) {
        $.lbl_availableCredit.text = data.value;
    });
    Ti.App.addEventListener("Display", function(data) {
        $.lbl_username.text = "Hello " + data.displayValue;
    });
    __defers["$.__views.menuTable!click!onMenuTableClick"] && $.__views.menuTable.addEventListener("click", onMenuTableClick);
    __defers["$.__views.leftMenuRefreshLabel!click!refreshClick"] && $.__views.leftMenuRefreshLabel.addEventListener("click", refreshClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;