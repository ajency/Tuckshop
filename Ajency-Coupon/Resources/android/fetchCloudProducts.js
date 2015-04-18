var localStorage = require("/localStorage");

var alloy = require("alloy");

var allProductIdsArray = [];

var filteredProductArray = [];

var xhr = Ti.Network.createHTTPClient();

var fetchCategories = function(controllername) {
    alloy.Globals.categoryResponse = [];
    Ti.App.Properties.removeProperty("allCategoryResponse");
    localStorage.saveMultiplierValue(1);
    Cloud.Objects.query({
        classname: "categories",
        limit: 1e3,
        where: {
            organizationId: localStorage.getOrganizationId()
        }
    }, function(e) {
        if (e.success) {
            console.log("categories success response");
            console.log(e);
            for (var i = 0, len = e.categories.length; len > i; i++) {
                var category = e.categories[i];
                alloy.Globals.categoryResponse.unshift(category);
            }
            localStorage.saveAllCategories(alloy.Globals.categoryResponse);
            fetchCurrencyLogo(controllername);
        } else "menu" === controllername ? Ti.App.fireEvent("errorIndex", {
            name: "fetchCategories"
        }) : "index" === controllername ? Ti.App.fireEvent("errorOnRegister", {
            name: "fetchCategories"
        }) : "leftMenu" === controllername ? Ti.App.fireEvent("errorOnFetch", {
            name: "fetchCategories"
        }) : "alloy" === controllername ? alert("Failed to fetch new Products! Please Click Refresh") : "home" === controllername && Ti.App.fireEvent("errorOnHome", {
            name: "fetchCategories"
        });
    });
};

var fetchCurrencyLogo = function(controllername) {
    Cloud.Photos.query({
        limit: 1e3,
        where: {
            organizationId: localStorage.getOrganizationId()
        }
    }, function(e) {
        if (e.success) {
            var photo = e.photos[0];
            localStorage.saveCurrencyUrl(photo.urls.small_240);
            fetchCloudProducts(controllername);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
};

var fetchCloudProducts = function(controllername) {
    console.log("fetch called");
    allProductsArray = [];
    Ti.App.Properties.removeProperty("allProductResponse");
    Cloud.Objects.query({
        classname: "things",
        limit: 1e3
    }, function(e) {
        if (e.success) {
            for (var i = 0, len = e.things.length; len > i; i++) {
                var thing = e.things[i];
                allProductsArray.push({
                    imageLargePaths: [ {
                        imagePath: thing.photo.urls.large_1024
                    } ],
                    imagePath: thing.photo.urls.small_240,
                    categoryId: thing.categoryId,
                    productId: thing.id,
                    productName: thing.productName,
                    productPrice: thing.productPrice,
                    hasDiscount: "false",
                    hasLove: "false",
                    available: thing.available,
                    served: thing.served,
                    description: " ",
                    promotion: "-",
                    loveCount: " ",
                    availableColors: [],
                    reviews: []
                });
            }
            localStorage.saveAllProducts(allProductsArray);
            localStorage.saveCloudProducts(allProductsArray);
            transactionsOnProductIds(controllername);
        } else {
            console.log("the error");
            console.log(e);
            "menu" === controllername ? Ti.App.fireEvent("errorIndex", {
                name: "fetchCloudProducts"
            }) : "index" === controllername ? Ti.App.fireEvent("errorOnRegister", {
                name: "fetchCloudProducts"
            }) : "leftMenu" === controllername ? Ti.App.fireEvent("errorOnFetch", {
                name: "fetchCloudProducts"
            }) : "alloy" === controllername ? alert("Failed to fetch new Products! Please Click Refresh") : "home" === controllername && Ti.App.fireEvent("errorOnHome", {
                name: "fetchCloudProducts"
            });
        }
    });
};

var transactionsOnProductIdsGreaterThanThousand = function(controllername) {
    if (0 === allProductIdsArray.length) for (var i = 0; len = localStorage.getAllProducts().length, 
    len > i; i++) allProductIdsArray.push(allProductsArray[i].productId);
    Cloud.Objects.query({
        classname: "testItems",
        skip: 1e3 * localStorage.getMultiplierValue(),
        limit: 1e3,
        where: {
            productId: {
                $in: allProductIdsArray
            }
        }
    }, function(e) {
        console.log("the count");
        if (e.success) if (1e3 === e.testItems.length) {
            var finalArray = e.testItems.concat(localStorage.getTemporaryProducts());
            Ti.App.Properties.removeProperty("temporaryProducts");
            localStorage.saveTemporaryProducts(finalArray);
            var number = localStorage.getMultiplierValue();
            number += 1;
            localStorage.saveMultiplierValue(number);
            transactionsOnProductIdsGreaterThanThousand(controllername);
        } else {
            var finalArray = e.testItems.concat(localStorage.getTemporaryProducts());
            Ti.App.Properties.removeProperty("temporaryProducts");
            Ti.App.Properties.removeProperty("multiplierValue");
            computeQuantityOnProductids(finalArray, controllername);
        } else {
            console.log("TRANSACTION IDS PRODUCT");
            if ("menu" === controllername) Ti.App.fireEvent("errorIndex", {
                name: "transactionsOnProductIdsGreaterThanThousand"
            }); else if ("index" === controllername) Ti.App.fireEvent("errorOnRegister", {
                name: "transactionsOnProductIdsGreaterThanThousand"
            }); else if ("leftMenu" === controllername) {
                console.log("In left menu");
                Ti.App.fireEvent("errorOnFetch", {
                    name: "transactionsOnProductIdsGreaterThanThousand"
                });
            } else "alloy" === controllername ? alert("Failed to fetch new Products! Please Click Refresh") : "home" === controllername && Ti.App.fireEvent("errorOnHome", {
                name: "transactionsOnProductIdsGreaterThanThousand"
            });
        }
    });
};

var transactionsOnProductIds = function(controllername) {
    allProductIdsArray = [];
    if (localStorage.getAllProducts()) {
        for (var i = 0; len = localStorage.getAllProducts().length, len > i; i++) allProductIdsArray.push(allProductsArray[i].productId);
        Cloud.Objects.query({
            classname: "testItems",
            limit: 1e3,
            where: {
                productId: {
                    $in: allProductIdsArray
                }
            }
        }, function(e) {
            console.log("the count");
            if (e.success) if (1e3 === e.testItems.length) {
                localStorage.saveTemporaryProducts(e.testItems);
                transactionsOnProductIdsGreaterThanThousand(controllername);
            } else computeQuantityOnProductids(e.testItems, controllername); else {
                console.log("TRANSACTION IDS PRODUCT");
                if ("menu" === controllername) Ti.App.fireEvent("errorIndex", {
                    name: "transactionsOnProductIds"
                }); else if ("index" === controllername) Ti.App.fireEvent("errorOnRegister", {
                    name: "transactionsOnProductIds"
                }); else if ("leftMenu" === controllername) {
                    console.log("In left menu");
                    Ti.App.fireEvent("errorOnFetch", {
                        name: "transactionsOnProductIds"
                    });
                } else "alloy" === controllername ? alert("Failed to fetch new Products! Please Click Refresh") : "home" === controllername && Ti.App.fireEvent("errorOnHome", {
                    name: "transactionsOnProductIds"
                });
            }
        });
    }
};

var computeQuantityOnProductids = function(data, controllername) {
    filteredProductArray = [];
    filteredProductArray.length = 0;
    var prdouctkeyIds;
    var productIdGroupByArray = _.groupBy(data, function(item) {
        return item.productId;
    });
    var keyIds = _.keys(productIdGroupByArray);
    _.each(keyIds, function(keyId) {
        prdouctkeyIds = productIdGroupByArray[keyId];
        var quantities = _.pluck(prdouctkeyIds, "quantity");
        var total = _.reduce(quantities, function(memo, num) {
            return memo + num;
        }, 0);
        _.each(localStorage.getAllProducts(), function(product) {
            product.productId == keyId && total > 0 && filteredProductArray.push(product);
        });
    });
    console.log("the flitered array");
    console.log(filteredProductArray);
    Ti.App.Properties.removeProperty("allProductResponse");
    localStorage.saveAllProducts(filteredProductArray);
    navigateControllers(controllername);
};

var navigateControllers = function(controllername) {
    alloy.Globals.pushNotificationReceived = false;
    if ("menu" === controllername) {
        console.log("In menu");
        {
            Alloy.createController("menu", {}).getView().open();
        }
    } else if ("index" === controllername) {
        console.log("In index");
        var index = Alloy.createController("index", {}).getView();
        index.open();
    } else "leftMenu" === controllername ? Ti.App.fireEvent("successOnFetch") : "home" === controllername && Ti.App.fireEvent("successOnHome");
};

exports.fetchCategories = fetchCategories;

exports.transactionsOnProductIds = transactionsOnProductIds;

exports.transactionsOnProductIdsGreaterThanThousand = transactionsOnProductIdsGreaterThanThousand;

exports.fetchCloudProducts = fetchCloudProducts;