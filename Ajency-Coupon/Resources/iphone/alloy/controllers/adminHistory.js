function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideFooter() {
        $.stickyFooter.animate({
            height: .1,
            duration: 200
        });
        footerHidden = true;
    }
    function showFooter() {
        $.stickyFooter.animate({
            height: 50,
            duration: 200
        });
        footerHidden = false;
    }
    function scroll(e) {
        currentOffset = e.y;
        if (currentOffset >= 0) {
            if (currentOffset >= previousOffset) footerHidden || hideFooter(); else {
                console.log("Show");
                console.log(footerHidden);
                footerHidden && showFooter();
            }
            previousOffset = currentOffset;
        }
    }
    function loadingErrorAnimation() {
        console.log("In Error Animate loader");
        null != errorViewImageView && (errorViewImageView.image = "/images/loader-" + loaderIndex + ".png");
        loaderIndex++;
        5 === loaderIndex && (loaderIndex = 1);
    }
    function loadingSuccessAnimation() {
        console.log("In Success Animate loader");
        null != animateImageView && (animateImageView.image = "/images/loader-" + loaderIndex + ".png");
        loaderIndex++;
        5 === loaderIndex && (loaderIndex = 1);
    }
    function clearSelectedTabs() {
        $.lbl_week.setColor("#83837C");
        $.lbl_month.setColor("#83837C");
        $.lbl_all.setColor("#83837C");
    }
    function onTabSelected(e) {
        clearSelectedTabs();
        var tabId = e.source.id;
        currentTab != tabId && sortTransactions(tabId);
        switch (tabId) {
          case "tab_week":
            $.lbl_week.setColor("#F0C60A");
            break;

          case "tab_month":
            $.lbl_month.setColor("#F0C60A");
            break;

          case "tab_all":
            $.lbl_all.setColor("#F0C60A");
            break;

          default:
            console.log("Invalid selection");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "adminHistory";
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
    $.__views.adminHistory = Ti.UI.createView({
        id: "adminHistory"
    });
    $.__views.adminHistory && $.addTopLevelView($.__views.adminHistory);
    $.__views.mainView = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "mainView"
    });
    $.__views.adminHistory.add($.__views.mainView);
    $.__views.errorLabel = Ti.UI.createLabel({
        color: "#83837C",
        touchEnabled: false,
        text: "Tap to Retry",
        id: "errorLabel",
        height: "0",
        width: "0",
        top: "0"
    });
    $.__views.mainView.add($.__views.errorLabel);
    $.__views.stickyFooter = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        bottom: 0,
        backgroundColor: "#3B0B0B",
        id: "stickyFooter",
        height: "50",
        opacity: "0.9"
    });
    $.__views.adminHistory.add($.__views.stickyFooter);
    onTabSelected ? $.__views.stickyFooter.addEventListener("click", onTabSelected) : __defers["$.__views.stickyFooter!click!onTabSelected"] = true;
    $.__views.tab_week = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "tab_week",
        width: "30%",
        left: "4%"
    });
    $.__views.stickyFooter.add($.__views.tab_week);
    $.__views.lbl_week = Ti.UI.createLabel({
        color: "#83837C",
        touchEnabled: false,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18,
            fontWeight: "bold"
        },
        id: "lbl_week",
        text: "Week"
    });
    $.__views.tab_week.add($.__views.lbl_week);
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "#F0C60A",
        left: "0",
        height: "60%",
        top: "20%",
        bottom: "20%",
        width: "0.3%",
        id: "__alloyId0"
    });
    $.__views.stickyFooter.add($.__views.__alloyId0);
    $.__views.tab_month = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "tab_month",
        width: "30%",
        left: "0"
    });
    $.__views.stickyFooter.add($.__views.tab_month);
    $.__views.lbl_month = Ti.UI.createLabel({
        color: "#83837C",
        touchEnabled: false,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18,
            fontWeight: "bold"
        },
        id: "lbl_month",
        text: "Month"
    });
    $.__views.tab_month.add($.__views.lbl_month);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "#F0C60A",
        left: "0",
        height: "60%",
        top: "20%",
        bottom: "20%",
        width: "0.3%",
        id: "__alloyId1"
    });
    $.__views.stickyFooter.add($.__views.__alloyId1);
    $.__views.tab_all = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "tab_all",
        width: "30%",
        left: "0",
        right: "4%"
    });
    $.__views.stickyFooter.add($.__views.tab_all);
    $.__views.lbl_all = Ti.UI.createLabel({
        color: "#83837C",
        touchEnabled: false,
        font: {
            fontFamily: "OpenSans-Regular",
            fontSize: 18,
            fontWeight: "bold"
        },
        id: "lbl_all",
        text: "All"
    });
    $.__views.tab_all.add($.__views.lbl_all);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    var args = arguments[0] || {};
    var query;
    args.userid ? query = {
        userId: args.userid
    } : args.productid && (query = {
        productId: args.productid
    });
    var outerView = innerView = leftView = rightView = imageView = transactionScroll = localAnimateObject = null;
    var separator = productNameLabel = dateLabel = priceLabel = null;
    var outerErrorView = innerErrorView = null;
    var errorViewLabel, errorViewImageView;
    var loaderErrorAnimate;
    var outerAnimateView = innerAnimateView = null;
    var animateImageView;
    var loaderSuccessAnimate;
    var connectionErrorViewPresent = false;
    var connectionErrorAlreadyShown = 0;
    var loaderAlreadyShown = 0;
    var currentOffset = previousOffset = 0;
    var footerHidden = false;
    var currentTab = "tab_week";
    var allItems = [];
    var startWeek = moment().isoWeekday(1).format("L");
    var endWeek = moment().isoWeekday(7).format("L");
    var startMonth = moment().startOf("month").format("L");
    var endMonth = moment().endOf("month").format("L");
    var localStorage = require("/localStorage");
    var networkCheck = require("/networkCheck");
    var loaderIndex = 1;
    var throttle = function(fn, delay, trail) {
        delay || (delay = 100);
        var timeout, args, context, last = 0, offset = false === trail ? 0 : delay;
        return function() {
            function exec() {
                timeout && (timeout = clearTimeout(timeout));
                fn.apply(context, args);
                last = now;
            }
            var now = +new Date(), elapsed = now - last - offset;
            args = arguments, context = this;
            elapsed > delay ? exec() : timeout || false === trail || (timeout = setTimeout(exec, delay));
        };
    };
    var showAnimateConnectionView = function() {
        outerErrorView = Ti.UI.createView({
            layout: "vertical",
            width: Ti.UI.FILL,
            height: 70,
            backgroundColor: "transparent"
        });
        innerErrorView = Ti.UI.createView({
            layout: "horizontal",
            width: Ti.UI.FILL,
            height: 69.2
        });
        errorViewLabel = Ti.UI.createLabel({
            left: "35%",
            top: 20,
            text: "Tap to Retry",
            font: {
                fontFamily: "OpenSans-Regular",
                fontSize: 15
            }
        });
        separator = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: .8,
            backgroundColor: "#F0C60A"
        });
        outerErrorView.addEventListener("click", function() {
            if (0 == networkCheck.getNetworkStatus()) alert("No Internet Connection"); else {
                errorViewLabel.height = 0;
                innerErrorView.remove(errorViewLabel);
                errorViewImageView = Ti.UI.createImageView({
                    left: "45%",
                    top: "15",
                    height: 40,
                    width: 48
                });
                innerErrorView.add(errorViewImageView);
                loaderErrorAnimate = setInterval(loadingErrorAnimation, 200);
                showAnimateView();
                fetchAllTransaction(currentTab);
            }
        });
        innerErrorView.add(errorViewLabel);
        outerErrorView.add(innerErrorView);
        outerErrorView.add(separator);
        var interval;
        interval = 1e3;
        setTimeout(function() {
            $.mainView.add(outerErrorView);
        }, interval);
    };
    var hideAnimateConnectionView = function() {
        if (null != outerErrorView) {
            clearInterval(loaderErrorAnimate);
            $.mainView.remove(outerErrorView);
        }
    };
    var showAnimateView = function() {
        outerAnimateView = Ti.UI.createView({
            layout: "vertical",
            width: Ti.UI.FILL,
            height: 70,
            backgroundColor: "transparent"
        });
        innerAnimateView = Ti.UI.createView({
            layout: "horizontal",
            width: Ti.UI.FILL,
            height: 69.2
        });
        separator = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: .8,
            backgroundColor: "#F0C60A"
        });
        animateImageView = Ti.UI.createImageView({
            left: "45%",
            top: "15",
            height: 40,
            width: 48
        });
        innerAnimateView.add(animateImageView);
        loaderSuccessAnimate = setInterval(loadingSuccessAnimation, 200);
        outerAnimateView.add(innerAnimateView);
        outerAnimateView.add(separator);
        var interval;
        interval = 1e3;
        setTimeout(function() {
            $.mainView.add(outerAnimateView);
        }, interval);
    };
    var hideAnimateView = function() {
        if (null != outerAnimateView) {
            clearInterval(loaderSuccessAnimate);
            $.mainView.remove(outerAnimateView);
        }
    };
    var displayTransactionHistory = function(data) {
        console.log("Size:");
        console.log(_.size(data));
        if (_.size(data) >= 1) {
            if (connectionErrorViewPresent) if (0 != connectionErrorAlreadyShown) {
                console.log("connection view not present");
                showAnimateConnectionView();
            } else connectionErrorAlreadyShown = 1; else if (0 != loaderAlreadyShown) {
                console.log("Loader not present");
                showAnimateView();
            } else loaderAlreadyShown = 1;
            transactionScroll = Ti.UI.createScrollView({
                layout: "vertical",
                width: Ti.UI.FILL,
                height: Ti.UI.FILL,
                scrollType: "vertical",
                disableBounce: true
            });
            transactionScroll.addEventListener("scroll", throttle(scroll, 1e3));
            for (var i = 0; len = _.size(data), len > i; i++) {
                var day = moment(data[i].updated_at);
                outerView = Ti.UI.createView({
                    layout: "vertical",
                    width: Ti.UI.FILL,
                    height: 70,
                    backgroundColor: "transparent"
                });
                innerView = Ti.UI.createView({
                    layout: "horizontal",
                    width: Ti.UI.FILL,
                    height: 69.2
                });
                leftView = Ti.UI.createView({
                    layout: "vertical",
                    left: "10%",
                    width: "70%",
                    height: Ti.UI.FILL
                });
                productNameLabel = Ti.UI.createLabel({
                    touchEnabled: false,
                    top: "10%",
                    left: 0,
                    text: data[i].productName,
                    color: "#3B0B0B",
                    font: {
                        fontFamily: "OpenSans-Regular",
                        fontSize: 20
                    }
                });
                if ("Credit" === data[i].productName) {
                    productNameLabel.setColor("#FF0000");
                    productNameLabel.font = {
                        fontFamily: "OpenSans-Regular",
                        fontSize: 20,
                        fontWeight: "bold"
                    };
                }
                var txnDetails;
                args.userid ? txnDetails = day.format("L") : args.productid && (txnDetails = day.format("L") + "  Qty: " + data[i].quantity);
                dateLabel = Ti.UI.createLabel({
                    touchEnabled: false,
                    top: "10%",
                    left: 0,
                    text: txnDetails,
                    color: "#A4A4A4",
                    font: {
                        fontFamily: "OpenSans-Regular",
                        fontSize: 13
                    }
                });
                leftView.add(productNameLabel);
                leftView.add(dateLabel);
                rightView = Ti.UI.createView({
                    layout: "horizontal",
                    left: 0,
                    width: "20%",
                    height: Ti.UI.FILL
                });
                imageView = Ti.UI.createImageView({
                    image: localStorage.getCurrencyUrl(),
                    width: 15,
                    height: 15,
                    top: "20%",
                    right: 0
                });
                var value;
                value = parseInt(data[i].productPrice);
                priceLabel = Ti.UI.createLabel({
                    touchEnabled: false,
                    top: "10%",
                    right: 0,
                    text: value,
                    color: "#3B0B0B",
                    font: {
                        fontFamily: "OpenSans-Regular",
                        fontSize: 20
                    }
                });
                rightView.add(imageView);
                rightView.add(priceLabel);
                innerView.add(leftView);
                innerView.add(rightView);
                outerView.add(innerView);
                separator = Ti.UI.createView({
                    width: Ti.UI.FILL,
                    height: .8,
                    backgroundColor: "#F0C60A"
                });
                outerView.add(separator);
                transactionScroll.add(outerView);
                outerView = innerView = leftView = rightView = imageView = null;
                separator = productNameLabel = dateLabel = priceLabel = null;
            }
            var interval;
            interval = 1e3;
            setTimeout(function() {
                if (null != localAnimateObject) {
                    localAnimateObject.height = 0;
                    localAnimateObject.width = 0;
                    localAnimateObject.top = 0;
                    $.mainView.remove(localAnimateObject);
                }
                $.mainView.add(transactionScroll);
                setTimeout(function() {}, 100);
                setTimeout(function() {
                    0 != loaderAlreadyShown && hideAnimateView();
                }, 1e3);
            }, interval);
        }
    };
    var sortTransactions = function(period) {
        console.log("Sort transactions");
        console.log(period);
        if (0 === allItems.length) alert("No records to fetch"); else {
            if (null != transactionScroll) {
                console.log("transaction scroll not null");
                $.mainView.remove(transactionScroll);
                $.mainView.removeAllChildren();
                transactionScroll = null;
            }
            console.log("Removing Children of main views");
            console.log($.mainView.children.length);
            setTimeout(function() {
                switch (period) {
                  case "tab_week":
                    var weekTransaction = allItems.filter(function(item) {
                        var updated_at = moment(item.updated_at).format("L");
                        return updated_at >= startWeek && endWeek >= updated_at;
                    });
                    var params = {
                        data: weekTransaction,
                        name: args.name
                    };
                    Ti.App.fireEvent("app:adminStaticView", params);
                    displayTransactionHistory(weekTransaction);
                    currentTab = period;
                    break;

                  case "tab_month":
                    var monthTransaction = allItems.filter(function(item) {
                        var updated_at = moment(item.updated_at).format("L");
                        return updated_at >= startMonth && endMonth >= updated_at;
                    });
                    var params = {
                        data: monthTransaction,
                        name: args.name
                    };
                    Ti.App.fireEvent("app:adminStaticView", params);
                    displayTransactionHistory(monthTransaction);
                    currentTab = period;
                    break;

                  case "tab_all":
                    var params = {
                        data: allItems,
                        name: args.name
                    };
                    Ti.App.fireEvent("app:adminStaticView", params);
                    displayTransactionHistory(allItems);
                    currentTab = period;
                }
            }, 200);
        }
    };
    $.lbl_week.setColor("#F0C60A");
    var fetchAllTransaction = function(currentTab) {
        Cloud.Objects.query({
            classname: "testItems",
            limit: 1e3,
            where: query
        }, function(e) {
            if (e.success) {
                hideAnimateConnectionView();
                for (i = 0; len = e.testItems.length, len > i; i++) allItems.push(e.testItems[i]);
                sortTransactions(currentTab);
                hideAnimateView();
                connectionErrorViewPresent = false;
            } else {
                hideAnimateView();
                showAnimateConnectionView();
                connectionErrorViewPresent = true;
                sortTransactions(currentTab);
            }
        });
    };
    if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE) {
        showAnimateConnectionView();
        loaderAlreadyShown = 1;
        connectionErrorViewPresent = true;
        sortTransactions("tab_week");
    } else {
        showAnimateView();
        fetchAllTransaction(currentTab);
    }
    __defers["$.__views.stickyFooter!click!onTabSelected"] && $.__views.stickyFooter.addEventListener("click", onTabSelected);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;