function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadingTableAnimation() {
        loaderImage.image = "/images/loader-" + loaderIndex + ".png";
        loaderIndex++;
        5 === loaderIndex && (loaderIndex = 1);
    }
    function clearTableData() {
        $.productsTable.data = empty;
        $.productsTable.data = tableData;
    }
    function retrieveCookId(eSwipe) {
        localStorage.getCookToken() ? pendingPushNotification(eSwipe) : Cloud.Users.query({
            limit: 1e3,
            where: {
                $and: [ {
                    role: "cook"
                }, {
                    organizationId: localStorage.getOrganizationId()
                } ]
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                console.log("Cook details");
                console.log(user);
                localStorage.saveCookToken(user.custom_fields.device_token);
                pendingPushNotification(eSwipe);
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "retrieveCookId"));
        });
    }
    function pendingPushNotification(eSwipe) {
        var organizationDetails = dbOperations.getOrganizationRow(localStorage.getOrganizationId());
        var pendingChannel = organizationDetails[0].organizationPendingChannel;
        enteredEmailValue = dbOperations.getUserName(localStorage.getLastLoggedInUserId()).split("@");
        Cloud.PushNotifications.notifyTokens({
            channel: pendingChannel,
            to_tokens: localStorage.getCookToken(),
            payload: {
                alert: enteredEmailValue[0] + " ordered " + eSwipe.rowData.name,
                message: {
                    name: enteredEmailValue[0] + " ordered " + eSwipe.rowData.name,
                    date: moment().format("L")
                },
                custom_property: "order"
            }
        }, function(e) {
            if (e.success) {
                clearInterval(loaderTableAnimate);
                $.productsTable.updateRow(eSwipe.index, getPurchaseRow(eSwipe));
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "pendingPushNotification"));
        });
    }
    function sendEmail(eSwipe) {
        var data = dbOperations.getDailyTransactions(localStorage.getLastLoggedInUserId(), dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId()), moment.utc().format());
        console.log(data);
        var productNameArray = [];
        var productpriceArray = [];
        var productTimeArray = [];
        for (i = 0; i < data.length; i++) {
            productNameArray.unshift(data[i].productName);
            productpriceArray.unshift(data[i].productPrice);
            productTimeArray.unshift(moment(data[i].updated_at).format("L"));
        }
        var myTable = "<table><tr><td style='width: 100px; text-align: center;'>Product Name</td>";
        myTable += "<td style='width: 100px; text-align: center;'>Product Price</td>";
        myTable += "<td style='width: 100px; text-align: center;'>Date</td></tr>";
        for (i = 0; i < data.length; i++) {
            myTable += "<tr><td style='width: 100px; text-align: center;'>" + productNameArray[i] + "</td>";
            myTable += "<td style='width: 100px; text-align: center;'>" + productpriceArray[i] + "</td>";
            myTable += "<td style='width: 100px; text-align: center;'>" + productTimeArray[i] + "</td></tr>";
        }
        myTable += "</table>";
        Cloud.Emails.send({
            template: "Daily Purchase",
            recipients: "vishnu@ajency.in",
            displayName: localStorage.getDisplayName(),
            structure: myTable
        }, function(e) {
            if (e.success) {
                dbOperations.updateLastMailDate(localStorage.getLastLoggedInUserId(), moment().format());
                if (toBeServed) {
                    console.log("Cheese sandwich bought");
                    retrieveCookId(eSwipe);
                } else {
                    clearInterval(loaderTableAnimate);
                    $.productsTable.updateRow(eSwipe.index, getPurchaseRow(eSwipe));
                }
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "sendEmail"));
        });
    }
    function updateLastMailDate(eSwipe) {
        Cloud.Users.update({
            custom_fields: {
                last_mail_date: moment().format()
            }
        }, function(e) {
            if (e.success) {
                {
                    e.users[0];
                }
                sendEmail(eSwipe);
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "updateLastMailDate"));
        });
    }
    function checkMailDate(eSwipe) {
        var ms = moment().diff(dbOperations.getLastMailDate(localStorage.getLastLoggedInUserId()));
        var d = moment.duration(ms).asHours();
        console.log("minutes");
        console.log(d);
        var mailStatus = dbOperations.getMailStatus(localStorage.getLastLoggedInUserId());
        if (moment.duration(ms).asHours() > 24 && 1 === mailStatus.mails) {
            console.log("Send mails");
            updateLastMailDate(eSwipe);
        } else if (toBeServed) {
            console.log("Cheese sandwich bought");
            retrieveCookId(eSwipe);
        } else {
            clearInterval(loaderTableAnimate);
            $.productsTable.updateRow(eSwipe.index, getPurchaseRow(eSwipe));
        }
    }
    function getSum(data) {
        var sum = 0;
        _.each(data, function(item) {
            sum += parseFloat(item.productPrice);
        });
        sum = sum.toFixed(2);
        Ti.App.fireEvent("Calculate", {
            value: sum
        });
    }
    function buyActionPerformed(productid, eSwipe) {
        var totalUsers = dbOperations.getCount();
        Ti.API.info("Row count: " + totalUsers);
        var loginStatus = dbOperations.getLoginStatus(localStorage.getLastLoggedInUserId());
        loginStatus = "true" === loginStatus ? 1 : 0;
        if (loginStatus) if (alloy.Globals.autoLogin) {
            console.log("App not closed");
            day = moment(dbOperations.getLastCreditDate(localStorage.getLastLoggedInUserId()));
            console.log("day");
            console.log(day);
            updateCreditDate(productid, eSwipe);
            $.productsTable.updateRow(eSwipe.index, getLoaderRow(eSwipe));
        } else checkIfLoggedIn(productid, eSwipe); else if (1 === totalUsers) {
            alloy.Globals.navigatedFromAllProducts = true;
            {
                Alloy.createController("index", {}).getView().open();
            }
        } else if (totalUsers > 1) {
            Alloy.createController("multiUser", {}).getView().open();
        }
    }
    function getErrorRow(eSwipe, type) {
        errorPresent = true;
        var row = Ti.UI.createTableViewRow({
            id: "swipeRow",
            height: 70,
            focusable: true,
            backgroundSelectedColor: "white"
        });
        var view = Ti.UI.createView({
            layout: "horizontal",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            backgroundColor: "#F0C60A"
        });
        var aLabel = Ti.UI.createLabel({
            text: "Tap to Retry",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 15,
                fontWeight: "bold"
            },
            top: 20,
            left: "40%",
            textAlign: "center"
        });
        row.addEventListener("click", function() {
            if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else {
                "fetchDelta" === type ? fetchDeltaTransaction(eSwipe) : "makeEntry" === type ? makeTransactionEntry(eSwipe.rowData.id, eSwipe) : "updateCreditDate" === type ? updateCreditDate(eSwipe.rowData.id, eSwipe) : "updateCreditAmount" === type ? updateCreditAmount(eSwipe.rowData.id, eSwipe) : "removeCarryForward" === type ? removeCarryForward(totalSum, eSwipe.rowData.id, eSwipe) : "updateLastMailDate" === type ? updateLastMailDate(eSwipe) : "sendEmail" === type ? sendEmail(eSwipe) : "pendingPushNotification" === type ? pendingPushNotification(eSwipe) : "retrieveCookId" === type && retrieveCookId(eSwipe);
                $.productsTable.updateRow(eSwipe.index, getLoaderRow(eSwipe));
            }
        });
        view.add(aLabel);
        row.add(view);
        return row;
    }
    function getLoaderRow() {
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
        loaderImage = Ti.UI.createImageView({
            left: "45%",
            top: "15",
            height: 40,
            width: 48
        });
        view.add(loaderImage);
        loaderTableAnimate = setInterval(loadingTableAnimation, 200);
        row.add(view);
        return row;
    }
    function getPurchaseRow() {
        function cancelClicked(e) {
            e.cancelBubble = true;
            clearTableData();
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
            backgroundColor: "#3B0B0B"
        });
        var purchaseView = Ti.UI.createView({
            left: "10%",
            layout: "horizontal",
            height: Ti.UI.SIZE,
            width: "55%"
        });
        var purchaseLabel = Ti.UI.createLabel({
            left: 0,
            text: "Purchase Successful",
            color: "#F0C60A",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 20
            }
        });
        purchaseView.add(purchaseLabel);
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
            backgroundColor: "#F0C60A"
        });
        var cancelArrow = Ti.UI.createImageView({
            left: "10%",
            height: 30,
            width: 30,
            image: "/images/icon_tick.png"
        });
        var cancelLabel = Ti.UI.createLabel({
            left: "2%",
            text: "OK",
            color: "#F0C60A",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 20
            }
        });
        cancelView.add(verticalSeparator);
        cancelView.add(cancelArrow);
        cancelView.add(cancelLabel);
        cancelView.addEventListener("click", cancelClicked);
        view.add(purchaseView);
        view.add(cancelView);
        row.add(view);
        return row;
    }
    function getSwipeRow(eSwipe) {
        function buyClicked(e) {
            e.cancelBubble = true;
            console.log(eSwipe.rowData.id);
            if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else {
                buyActionPerformed(eSwipe.rowData.id, eSwipe);
                cancelView.removeEventListener("click", cancelClicked);
                buyView.removeEventListener("click", buyClicked);
            }
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
            text: "BUY",
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
    this.__controllerPath = "allProducts";
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
    $.__views.allProducts = Ti.UI.createView({
        layout: "vertical",
        id: "allProducts"
    });
    $.__views.allProducts && $.addTopLevelView($.__views.allProducts);
    $.__views.productsTable = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "productsTable",
        separatorColor: "#F0C60A"
    });
    $.__views.allProducts.add($.__views.productsTable);
    $.__views.animateObject = Ti.UI.createImageView({
        id: "animateObject",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.allProducts.add($.__views.animateObject);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var alloy = require("alloy");
    var args = arguments[0] || {};
    var errorPresent = false;
    var toBeServed = false;
    var tableData = empty = tempTableData = [];
    var day;
    var totalSum;
    var loaderTableAnimate;
    var loaderImage;
    var localStorage = require("/localStorage");
    var networkCheck = require("/networkCheck");
    var moment = require("alloy/moment");
    var loaderIndex = 1;
    var allProducts = _.filter(localStorage.getAllProducts(), function(product) {
        return product.categoryId == args.categoryId;
    });
    var populateProducts = function(jsonData) {
        console.log("Length of table");
        console.log(_.size($.productsTable.data));
        var row = view = imageView = productNameLabel = priceLabel = null;
        for (var i = 0; len = _.size(jsonData), len > i; i++) {
            row = Ti.UI.createTableViewRow({
                id: jsonData[i].productId,
                name: jsonData[i].productName,
                height: 70,
                backgroundSelectedColor: "transparent",
                backgroundColor: "white"
            });
            productNameLabel = Ti.UI.createLabel({
                touchEnabled: false,
                left: "10%",
                textAlign: "left",
                text: jsonData[i].productName,
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
            imageView = Ti.UI.createImageView({
                image: localStorage.getCurrencyUrl(),
                width: 15,
                height: 15,
                top: 10,
                right: 0
            });
            priceLabel = Ti.UI.createLabel({
                touchEnabled: false,
                top: "10%",
                right: 0,
                text: jsonData[i].productPrice,
                color: "#3B0B0B",
                font: {
                    fontFamily: "OpenSans-Regular",
                    fontSize: 20
                }
            });
            view.add(imageView);
            view.add(priceLabel);
            row.add(productNameLabel);
            row.add(view);
            tableData.push(row);
            row = view = imageView = productNameLabel = priceLabel = null;
        }
        $.productsTable.data = tableData;
    };
    populateProducts(allProducts);
    var fetchDeltaTransaction = function(eSwipe) {
        Cloud.Objects.query({
            classname: "testItems",
            limit: 1e3,
            where: {
                $and: [ {
                    userId: localStorage.getLastLoggedInUserId()
                }, {
                    updated_at: {
                        $gt: dbOperations.getLatestTransactionDate(localStorage.getLastLoggedInUserId())
                    }
                } ]
            }
        }, function(e) {
            if (e.success) {
                e.testItems.length > 0 && dbOperations.saveTransactionRows(e.testItems);
                checkMailDate(eSwipe);
                getSum(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()));
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "fetchDelta"));
        });
    };
    var makeTransactionEntry = function(productid, eSwipe) {
        var selectedProduct = _.filter(allProducts, function(product) {
            return product.productId === productid;
        });
        toBeServed = "yes" === selectedProduct[0].served ? true : false;
        Cloud.Objects.create({
            classname: "testItems",
            fields: {
                productName: selectedProduct[0].productName,
                productPrice: -selectedProduct[0].productPrice,
                productId: selectedProduct[0].productId,
                userId: localStorage.getUserId(),
                quantity: -1
            }
        }, function(e) {
            if (e.success) {
                errorPresent = false;
                {
                    e.testItems[0];
                }
                fetchDeltaTransaction(eSwipe);
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "makeEntry"));
        });
    };
    var updateCreditDate = function(productid, eSwipe) {
        totalSum = 0;
        createdDateValue = day.add("months", 1);
        moment().diff(createdDateValue, "minutes") > 0 ? Cloud.Users.update({
            custom_fields: {
                credited_date_at: moment(createdDateValue).format()
            }
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                _.each(dbOperations.getAllTransactionRows(localStorage.getLastLoggedInUserId()), function(item) {
                    totalSum += parseFloat(item.productPrice);
                });
                console.log("In all products");
                console.log(user);
                console.log(user.credited_date_at);
                dbOperations.updateCreditDate(user.id, user.custom_fields.credited_date_at);
                0 > totalSum ? updateCreditAmount(productid, eSwipe) : removeCarryForward(totalSum, productid, eSwipe);
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "updateCreditDate"));
        }) : makeTransactionEntry(productid, eSwipe);
    };
    var removeCarryForward = function(totalSum, productid, eSwipe) {
        Cloud.Objects.create({
            classname: "testItems",
            fields: {
                productName: "Debit balance",
                productPrice: -totalSum,
                productId: 1010,
                userId: localStorage.getUserId()
            }
        }, function(e) {
            if (e.success) {
                console.log("Amount carry forward in index");
                {
                    e.testItems[0];
                }
                updateCreditAmount(productid, eSwipe);
            } else $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "removeCarryForward"));
        });
    };
    var updateCreditAmount = function(productid, eSwipe) {
        Cloud.Objects.create({
            classname: "testItems",
            fields: {
                productName: "Credit",
                productPrice: 500,
                productId: 1010,
                userId: localStorage.getUserId()
            }
        }, function(e) {
            e.success ? makeTransactionEntry(productid, eSwipe) : $.productsTable.updateRow(eSwipe.index, getErrorRow(eSwipe, "updateCreditAmount"));
        });
    };
    var checkIfLoggedIn = function(productid, eSwipe) {
        if (null != dbOperations.getSessionId(localStorage.getLastLoggedInUserId())) {
            $.productsTable.updateRow(eSwipe.index, getLoaderRow(eSwipe));
            Cloud.sessionId = localStorage.getSessionId();
            Cloud.Users.showMe(function(e) {
                if (e.success) {
                    var user = e.users[0];
                    console.log("Logged in");
                    day = moment(user.custom_fields.credited_date_at);
                    updateCreditDate(productid, eSwipe);
                } else {
                    var toast = Ti.UI.createNotification({
                        message: "Auto Login failed. Please Login again",
                        duration: Ti.UI.NOTIFICATION_DURATION_LONG
                    });
                    toast.show();
                    {
                        Alloy.createController("index", {}).getView().open();
                    }
                }
            });
        } else {
            Alloy.createController("index", {}).getView().open();
        }
    };
    $.productsTable.addEventListener("click", function(e) {
        if (e.rowData && "swipeRow" != e.rowData.id) {
            clearTableData();
            $.productsTable.updateRow(e.index, getSwipeRow(e));
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;