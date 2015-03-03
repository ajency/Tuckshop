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
        null != $.animateObject && ($.animateObject.image = "/images/loaderlogin-" + loaderIndex + ".png");
        loaderIndex++;
        5 === loaderIndex && (loaderIndex = 1);
    }
    function getAllCloudUsers() {
        showImageView();
        loaderAnimate = setInterval(loadingAnimation, 200);
        hideConnectionErrorView();
        Cloud.Users.query({
            limit: 1e3,
            where: {
                organizationId: localStorage.getOrganizationId()
            }
        }, function(e) {
            if (e.success) {
                hideImageView();
                clearInterval(loaderAnimate);
                for (i = 0; len = e.users.length, len > i; i++) alloy.Globals.userResponse.push(e.users[i]);
                populateUsers(e.users);
            } else {
                hideImageView();
                clearInterval(loaderAnimate);
                showConnectionErrorView();
                alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "usersList";
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
    $.__views.usersList = Ti.UI.createView({
        layout: "vertical",
        id: "usersList"
    });
    $.__views.usersList && $.addTopLevelView($.__views.usersList);
    $.__views.animateObject = Ti.UI.createImageView({
        id: "animateObject",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.usersList.add($.__views.animateObject);
    $.__views.userErrorLabel = Ti.UI.createLabel({
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 15
        },
        text: "Tap to Retry",
        id: "userErrorLabel",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.usersList.add($.__views.userErrorLabel);
    $.__views.usersTable = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "usersTable",
        separatorColor: "#F0C60A"
    });
    $.__views.usersList.add($.__views.usersTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    arguments[0] || {};
    var localStorage = require("/localStorage");
    var networkCheck = require("/networkCheck");
    var tableData = [];
    var loaderIndex = 1;
    var showImageView = function() {
        $.animateObject.height = 96;
        $.animateObject.width = 96;
    };
    var hideImageView = function() {
        $.animateObject.height = 0;
        $.animateObject.width = 0;
    };
    var showConnectionErrorView = function() {
        $.userErrorLabel.height = "15%";
        $.userErrorLabel.width = "30%";
    };
    var hideConnectionErrorView = function() {
        $.userErrorLabel.height = 0;
        $.userErrorLabel.width = 0;
    };
    $.userErrorLabel.addEventListener("click", function() {
        0 == networkCheck.getNetworkStatus() ? alert("No Internet Connection") : getAllCloudUsers();
    });
    var populateUsers = function(jsonData) {
        console.log("table data");
        console.log(jsonData);
        var row = view = imageView = productNameLabel = null;
        for (var i = 0; len = _.size(jsonData), len > i; i++) {
            row = Ti.UI.createTableViewRow({
                id: "UserList",
                userid: jsonData[i].id,
                username: jsonData[i].username,
                height: 70,
                backgroundSelectedColor: "transparent",
                backgroundColor: "white"
            });
            productNameLabel = Ti.UI.createLabel({
                touchEnabled: false,
                left: "20%",
                textAlign: "center",
                text: jsonData[i].username,
                color: "#3B0B0B",
                font: {
                    fontFamily: "OpenSans-Regular",
                    fontSize: 20
                }
            });
            view = Ti.UI.createView({
                layout: "horizontal",
                right: 0,
                height: Ti.UI.SIZE,
                width: "20%",
                align: "center"
            });
            row.add(productNameLabel);
            row.add(view);
            tableData.push(row);
            row = view = imageView = productNameLabel = null;
        }
        $.usersTable.data = tableData;
    };
    0 === alloy.Globals.userResponse.length ? getAllCloudUsers() : populateUsers(alloy.Globals.userResponse);
    $.usersTable.addEventListener("click", function(e) {
        var evtData = {
            id: e.rowData.id,
            userid: e.rowData.userid,
            name: e.rowData.username
        };
        alloy.Globals.navigatedView = evtData.id;
        Ti.App.fireEvent("app:addViewToMidContainer", evtData);
        evtData = null;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;