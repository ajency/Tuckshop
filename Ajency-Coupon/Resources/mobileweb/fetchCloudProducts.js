var Q = require("/q");

var xhr = Ti.Network.createHTTPClient();

var fetchCloudProducts = function(controllername) {
    var flag = 3;
    juicesProductArray = [];
    biscuitsProductArray = [];
    rollsProductArray = [];
    allProductsArray = [];
    Ti.App.Properties.removeProperty("juiceResponse");
    Ti.App.Properties.removeProperty("biscuitResponse");
    Ti.App.Properties.removeProperty("rollResponse");
    Ti.App.Properties.removeProperty("allProductResponse");
    Cloud.Objects.query({
        classname: "things",
        page: 1,
        per_page: 25,
        where: {
            category: "juices"
        }
    }, function(e) {
        if (e.success) {
            for (var i = 0, len = e.things.length; len > i; i++) {
                var thing = e.things[i];
                juicesProductArray.push({
                    imageLargePaths: [ {
                        imagePath: thing.photo.urls.large_1024
                    } ],
                    imagePath: thing.photo.urls.small_240,
                    productId: thing.id,
                    productName: thing.productName,
                    productPrice: thing.productPrice,
                    hasDiscount: "false",
                    hasLove: "false",
                    available: thing.available,
                    description: " ",
                    promotion: "-",
                    loveCount: " ",
                    availableColors: [],
                    reviews: []
                });
            }
            Ti.App.fireEvent("check");
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    Cloud.Objects.query({
        classname: "things",
        page: 1,
        per_page: 25,
        where: {
            category: "biscuits"
        }
    }, function(e) {
        if (e.success) {
            Ti.API.info("response:", JSON.stringify(e.things));
            for (var i = 0, len = e.things.length; len > i; i++) {
                var thing = e.things[i];
                biscuitsProductArray.push({
                    imageLargePaths: [ {
                        imagePath: thing.photo.urls.large_1024
                    } ],
                    imagePath: thing.photo.urls.small_240,
                    productId: thing.id,
                    productName: thing.productName,
                    productPrice: thing.productPrice,
                    hasDiscount: "false",
                    hasLove: "false",
                    available: thing.available,
                    description: "",
                    promotion: "-",
                    loveCount: " ",
                    availableColors: [],
                    reviews: []
                });
            }
            Ti.App.fireEvent("check");
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    Cloud.Objects.query({
        classname: "things",
        page: 1,
        per_page: 25,
        where: {
            category: "rolls"
        }
    }, function(e) {
        if (e.success) {
            Ti.API.info("response:", JSON.stringify(e.things));
            for (var i = 0, len = e.things.length; len > i; i++) {
                var thing = e.things[i];
                rollsProductArray.push({
                    imageLargePaths: [ {
                        imagePath: thing.photo.urls.large_1024
                    } ],
                    imagePath: thing.photo.urls.small_240,
                    productId: thing.id,
                    productName: thing.productName,
                    productPrice: thing.productPrice,
                    hasDiscount: "false",
                    hasLove: "false",
                    available: thing.available,
                    description: "",
                    promotion: "-",
                    loveCount: " ",
                    availableColors: [],
                    reviews: []
                });
            }
            Ti.App.fireEvent("check");
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
    Ti.App.addEventListener("check", function() {
        flag--;
        if (0 == flag) {
            Ti.App.Properties.setObject("juiceResponse", juicesProductArray);
            Ti.App.Properties.setObject("biscuitResponse", biscuitsProductArray);
            Ti.App.Properties.setObject("rollResponse", rollsProductArray);
            allProductsArray.push.apply(allProductsArray, juicesProductArray);
            allProductsArray.push.apply(allProductsArray, biscuitsProductArray);
            allProductsArray.push.apply(allProductsArray, rollsProductArray);
            Ti.App.Properties.setObject("allProductResponse", allProductsArray);
            if ("main" === controllername) {
                Alloy.createController("main", {}).getView().open();
                Alloy.Globals.hideIndicator();
            } else if ("index" === controllername) {
                var index = Alloy.createController("index", {}).getView();
                index.open();
                Alloy.Globals.hideIndicator();
            }
        }
    });
};

exports.fetchCloudProducts = fetchCloudProducts;