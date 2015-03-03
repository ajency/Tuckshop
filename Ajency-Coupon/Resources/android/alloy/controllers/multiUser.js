function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function newAccountClicked() {
        var arg = {
            title: ""
        };
        Alloy.createController("index", arg).getView().open();
    }
    function refreshTableData() {
        userData = tableData = [];
        $.usersTable.data = [];
        userData = dbOperations.getUsersInfo();
        if (0 === userData.length) {
            Alloy.createController("index", {}).getView().open();
        } else {
            if (1 === userData.length) {
                enteredEmailValue = userData[0].username.split("@");
                localStorage.saveLastLoggedInUserId(userData[0].id);
                localStorage.saveDisplayName(enteredEmailValue[0]);
            }
            populateUserList(userData);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "multiUser";
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
    $.__views.multiWindow = Ti.UI.createWindow({
        backgroundColor: "transparent",
        opacity: 1,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "vertical",
        navBarHidden: true,
        backgroundImage: "/background.jpg",
        id: "multiWindow"
    });
    $.__views.multiWindow && $.addTopLevelView($.__views.multiWindow);
    $.__views.__alloyId14 = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        height: "80%",
        id: "__alloyId14"
    });
    $.__views.multiWindow.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "5%",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.companyLogo = Ti.UI.createImageView({
        image: "/images/tuckshopLogo.png",
        width: "45%",
        height: "29%",
        id: "companyLogo"
    });
    $.__views.__alloyId15.add($.__views.companyLogo);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 22,
            fontWeight: "bold"
        },
        textAlign: "center",
        width: Ti.UI.FILL,
        color: "#3B0B0B",
        text: "Choose an account",
        top: "3%",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        height: "42.5%",
        top: "2%",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
    $.__views.usersTable = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        left: "5%",
        right: "5%",
        id: "usersTable",
        height: Ti.UI.SIZE,
        top: "0%",
        separatorStyle: "none",
        backgroundColor: "transparent"
    });
    $.__views.__alloyId17.add($.__views.usersTable);
    $.__views.newAccountButton = Ti.UI.createButton({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 15
        },
        width: "70%",
        left: "15%",
        right: "15%",
        color: "#F0C60A",
        backgroundColor: "#585858",
        title: "Add new account",
        height: "11%",
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
        id: "newAccountButton",
        top: "3%",
        bottom: "0%"
    });
    $.__views.__alloyId15.add($.__views.newAccountButton);
    newAccountClicked ? $.__views.newAccountButton.addEventListener("click", newAccountClicked) : __defers["$.__views.newAccountButton!click!newAccountClicked"] = true;
    $.__views.__alloyId18 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        bottom: 0,
        height: "20%",
        id: "__alloyId18"
    });
    $.__views.multiWindow.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        image: "/images/footer.png",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var localStorage = require("/localStorage");
    var row = outerView = leftView = rightView = deleteUserView = expandImageView = nameLabel = null;
    var tableData = empty = [];
    if (localStorage.getOrganizationId() && dbOperations.checkOrganizationPresent(localStorage.getOrganizationId())) {
        var organizationDetails = dbOperations.getOrganizationRow(localStorage.getOrganizationId());
        $.companyLogo.image = organizationDetails[0].organization_logo;
    }
    dbOperations.logoutUsers();
    var userData = dbOperations.getUsersInfo();
    var populateUserList = function(data) {
        for (var i = 0; i < _.size(data); i++) {
            row = Ti.UI.createTableViewRow({
                id: data[i].id,
                height: 50,
                backgroundSelectedColor: "transparent",
                backgroundColor: "transparent"
            });
            outerView = Ti.UI.createView({
                layout: "horizontal",
                left: 0,
                top: .8,
                bottom: .8,
                width: Ti.UI.FILL,
                backgroundColor: "#3B0B0B",
                opacity: .8
            });
            leftView = Ti.UI.createView({
                layout: "vertical",
                top: "20%",
                left: "2%",
                height: "60%",
                width: "10%"
            });
            deleteUserView = Ti.UI.createImageView({
                image: "/images/delete_user.png",
                width: Ti.UI.SIZE,
                height: Ti.UI.FILL,
                id: i
            });
            outerRightView = Ti.UI.createView({
                id: i,
                layout: "horizontal",
                height: Ti.UI.FILL,
                width: "88%"
            });
            centerView = Ti.UI.createView({
                id: i,
                layout: "vertical",
                height: Ti.UI.FILL,
                width: "89.5%"
            });
            nameLabel = Ti.UI.createLabel({
                touchEnabled: false,
                top: "20%",
                left: 20,
                text: data[i].username,
                color: "#F0C60A",
                font: {
                    fontFamily: "OpenSans-Regular",
                    fontSize: 20
                }
            });
            rightView = Ti.UI.createView({
                layout: "vertical",
                top: "20%",
                height: "60%",
                width: "10%"
            });
            expandImageView = Ti.UI.createImageView({
                image: "/images/expand-arrow.png",
                left: "5%",
                width: Ti.UI.SIZE,
                height: Ti.UI.FILL,
                id: i,
                right: "0%"
            });
            leftView.add(deleteUserView);
            deleteUserView.addEventListener("click", function(e) {
                e.cancelBubble = true;
                dbOperations.deleteUser(userData[e.source.id].id);
                setTimeout(function() {
                    refreshTableData();
                }, 1e3);
            });
            centerView.add(nameLabel);
            rightView.add(expandImageView);
            outerRightView.add(centerView);
            outerRightView.add(rightView);
            outerRightView.addEventListener("click", function(e) {
                e.cancelBubble = true;
                var arg = {
                    title: userData[e.source.id].username
                };
                Alloy.createController("index", arg).getView().open();
            });
            outerView.add(leftView);
            outerView.add(outerRightView);
            row.add(outerView);
            tableData.push(row);
            row = outerView = leftView = deleteUserView = expandImageView = rightView = nameLabel = null;
        }
        $.usersTable.data = tableData;
    };
    populateUserList(userData);
    $.multiWindow.addEventListener("android:back", function() {
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    });
    $.multiWindow.addEventListener("close", function() {
        $.destroy();
        $.off();
        $.multiWindow.close();
    });
    __defers["$.__views.newAccountButton!click!newAccountClicked"] && $.__views.newAccountButton.addEventListener("click", newAccountClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;