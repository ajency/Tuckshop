
//for local storage
var localStorage=require('/localStorage');
var alloy = require('alloy');
var allProductIdsArray =[];
var filteredProductArray =[];
var xhr = Ti.Network.createHTTPClient();

var fetchCategories = function (controllername) {
	
	alloy.Globals.categoryResponse = [];
	Ti.App.Properties.removeProperty('allCategoryResponse');
	localStorage.saveMultiplierValue(1);
	  
	Cloud.Objects.query({
		classname : 'categories',
		limit : 1000,
		
		where : {
			organizationId : localStorage.getOrganizationId()
		}
		
	}, function(e) {

		if (e.success) {
			console.log('categories success response');
			console.log(e);
			
			for (var i = 0,len=e.categories.length; i < len; i++) {
				
				var category = e.categories[i];
				
				alloy.Globals.categoryResponse.unshift(category);
			}
			
			localStorage.saveAllCategories(alloy.Globals.categoryResponse);	
			
			fetchCurrencyLogo(controllername);
		}else{
			if (controllername === 'menu') {
				Ti.App.fireEvent('errorIndex',{name:'fetchCategories'});
			
			} else if (controllername === 'index') {
				Ti.App.fireEvent('errorOnRegister',{name:'fetchCategories'});			
			
			}else if (controllername === 'leftMenu') {
				
				Ti.App.fireEvent('errorOnFetch',{name:'fetchCategories'});			
			}else if (controllername === 'alloy') {
				alert('Failed to fetch new Products! Please Click Refresh');
							
			}else if (controllername === 'home') {
				
				Ti.App.fireEvent('errorOnHome',{name:'fetchCategories'});		
			}
		}
	});
			
};

var fetchCurrencyLogo = function(controllername){
	
	Cloud.Photos.query({
	   limit : 1000,
	   where : {
			organizationId : localStorage.getOrganizationId()
		}
	}, function (e) {
	    if (e.success) {
	        var photo = e.photos[0];
	        localStorage.saveCurrencyUrl(photo.urls.small_240);
	        
	        fetchCloudProducts(controllername);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
};

var fetchCloudProducts = function(controllername) {
	var flag = 3;
	/*
	 * Clear all data
	 */
	console.log('fetch called');
	 allProductsArray = [];
	 Ti.App.Properties.removeProperty('allProductResponse');
	 
	//fetch all the juices
	Cloud.Objects.query({
		classname : 'products',
		limit : 1000
		
	}, function(e) {

		if (e.success) {

			for (var i = 0,len=e.products.length; i < len; i++) {
				
				var thing = e.products[i];
				
				
				allProductsArray.push({
					"imageLargePaths" : [{
						"imagePath" : thing.photo.urls.large_1024
					}],
					"imagePath" : thing.photo.urls.small_240,
					"categoryId":thing.categoryId,
					"productId" : thing.id,
					"productName" : thing.productName,
					"productPrice" : thing.productPrice,
					"hasDiscount" : "false",
					"hasLove" : "false",
					"available" : thing.available,
					"served" : thing.served,
					"description" : " ",
					"promotion" : "-",
					"loveCount" : " ",
					"availableColors" : [],
					"reviews" : []

				});
			};
		
		    
	        
	        
	        localStorage.saveAllProducts(allProductsArray);
	        localStorage.saveCloudProducts(allProductsArray);
	        
			transactionsOnProductIds(controllername);
			
		
		} else {
			console.log('the error');
			console.log(e);
			if (controllername === 'menu') {
				Ti.App.fireEvent('errorIndex',{name:'fetchCloudProducts'});
			
			} else if (controllername === 'index') {
				Ti.App.fireEvent('errorOnRegister',{name:'fetchCloudProducts'});			
			
			}else if (controllername === 'leftMenu') {
				Ti.App.fireEvent('errorOnFetch',{name:'fetchCloudProducts'});			
			}else if (controllername === 'alloy') {
				alert('Failed to fetch new Products! Please Click Refresh');
							
			}else if (controllername === 'home') {
				Ti.App.fireEvent('errorOnHome',{name:'fetchCloudProducts'});		
			}
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

   
	
};

//filter transactions based on product ids greater than 1000
var transactionsOnProductIdsGreaterThanThousand = function(controllername){
	
	if(allProductIdsArray.length === 0){
		
		for (var i=0;len=localStorage.getAllProducts().length, i < len; i++) {
		
	   			allProductIdsArray.push(allProductsArray[i].productId);
	      };
	
	}
	
	Cloud.Objects.query({
		classname : 'testItems',
		skip: 1000 * localStorage.getMultiplierValue(),
		limit: 1000,
		
		where : {
			 productId: {"$in": allProductIdsArray } 
		} 
		
	}, function(e) {
        console.log('the count');
     //   console.log(e.testItems.length);
		if (e.success) {
			
		    	
		    if(e.testItems.length === 1000){
		    	
		    	var finalArray = e.testItems.concat(localStorage.getTemporaryProducts());
		    	Ti.App.Properties.removeProperty('temporaryProducts');
		    	localStorage.saveTemporaryProducts(finalArray);
		    	
		    	var number = localStorage.getMultiplierValue();
		    	number = number+1;
		    	localStorage.saveMultiplierValue(number);
		    	
		    	transactionsOnProductIdsGreaterThanThousand(controllername);
		    }
		    else{
		    	var finalArray = e.testItems.concat(localStorage.getTemporaryProducts());
		    	Ti.App.Properties.removeProperty('temporaryProducts');
		    	Ti.App.Properties.removeProperty('multiplierValue');
		    	computeQuantityOnProductids(finalArray,controllername);
		    }
				
			
		} else {
			console.log('TRANSACTION IDS PRODUCT');
			if (controllername === 'menu') {
				Ti.App.fireEvent('errorIndex',{name:'transactionsOnProductIdsGreaterThanThousand'});
			
			} else if (controllername === 'index') {
				Ti.App.fireEvent('errorOnRegister',{name:'transactionsOnProductIdsGreaterThanThousand'});			
			
			}else if (controllername === 'leftMenu') {
				console.log('In left menu');
				Ti.App.fireEvent('errorOnFetch',{name:'transactionsOnProductIdsGreaterThanThousand'});	
						
			}else if (controllername === 'alloy') {
				alert('Failed to fetch new Products! Please Click Refresh');			
			}else if (controllername === 'home') {
			
				Ti.App.fireEvent('errorOnHome',{name:'transactionsOnProductIdsGreaterThanThousand'});		
			}
			
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	 });
};

//filter transactions based on product ids
var transactionsOnProductIds = function(controllername) {
	
	allProductIdsArray = [];
    if(localStorage.getAllProducts()){
    	
    	  for (var i=0;len=localStorage.getAllProducts().length, i < len; i++) {
		
	   			allProductIdsArray.push(allProductsArray[i].productId);
	      };
	
	Cloud.Objects.query({
		classname : 'testItems',
		limit : 1000,
		
		where : {
			 productId: {"$in": allProductIdsArray } 
		} 
		
	}, function(e) {
        console.log('the count');
     //   console.log(e.testItems.length);
		if (e.success) {
			
		    if(e.testItems.length === 1000){
				localStorage.saveTemporaryProducts(e.testItems);
				transactionsOnProductIdsGreaterThanThousand(controllername);
			}
			else
				computeQuantityOnProductids(e.testItems,controllername);
			
		} else {
			console.log('TRANSACTION IDS PRODUCT');
			if (controllername === 'menu') {
				Ti.App.fireEvent('errorIndex',{name:'transactionsOnProductIds'});
			
			} else if (controllername === 'index') {
				Ti.App.fireEvent('errorOnRegister',{name:'transactionsOnProductIds'});			
			
			}else if (controllername === 'leftMenu') {
				console.log('In left menu');
				Ti.App.fireEvent('errorOnFetch',{name:'transactionsOnProductIds'});	
						
			}else if (controllername === 'alloy') {
				alert('Failed to fetch new Products! Please Click Refresh');			
			}else if (controllername === 'home') {
			
				Ti.App.fireEvent('errorOnHome',{name:'transactionsOnProductIds'});		
			}
			
		//	alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	 });
	 
    }
  
};

//calculate quantity based on product ids
var computeQuantityOnProductids = function(data,controllername){
	
	//to flush all previous records after purchase is clicked
	filteredProductArray = [];
	filteredProductArray.length=0;
	
	var prdouctkeyIds;
	var productIdGroupByArray= _.groupBy(data,function(item){
		
		return item.productId;
	});
	
	
	var keyIds=_.keys(productIdGroupByArray);
	
	
	_.each(keyIds,function(keyId){
		
		prdouctkeyIds=productIdGroupByArray[keyId];
		
		var quantities=_.pluck(prdouctkeyIds,'quantity');
		
		var total=_.reduce(quantities, function(memo, num){ return memo + num; }, 0);
		
		_.each(localStorage.getAllProducts(),function(product){
			
			if(product.productId ==keyId && total>0){
				filteredProductArray.push(product);
			}
		});
		
	});
	console.log('the flitered array');
	console.log(filteredProductArray);
	
	Ti.App.Properties.removeProperty('allProductResponse');
	localStorage.saveAllProducts(filteredProductArray);
	
    navigateControllers(controllername);
	
};

var navigateControllers= function(controllername){
	
//	localStorage.saveAllProducts(allProductsArray);
     //   Ti.App.Properties.setList('allProductResponse', allProductsArray);
			
			alloy.Globals.pushNotificationReceived = false;   //finished processing push notification
			
			if (controllername === 'menu') {
				console.log('In menu');
				var main = Alloy.createController('menu', {}).getView().open();
				
			} else if (controllername === 'index') {
				console.log('In index');
				var index = Alloy.createController('index', {}).getView();
				index.open();			
			}else if (controllername === 'leftMenu') {
				Ti.App.fireEvent('successOnFetch');		
					
			}else if (controllername === 'home') {
				Ti.App.fireEvent('successOnHome');			
			}
};

exports.fetchCategories = fetchCategories;
exports.transactionsOnProductIds = transactionsOnProductIds;
exports.transactionsOnProductIdsGreaterThanThousand = transactionsOnProductIdsGreaterThanThousand;
exports.fetchCloudProducts = fetchCloudProducts;
/*
 function cachedImageView(imageDirectoryName, url) {
 	
 	 var deferred = Q.defer();
    // Grab the filename
    Ti.API.info('Started');
    var filename = url.split('/');
    filename = filename[filename.length - 1];
    // Try and get the file that has been previously cached
    var file= Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
 
    if (file.exists()) {
        // If it has been cached, assign the local asset path to the image view object.
    //    imageViewObject.image = file.nativePath;
         localPath=file.nativePath;
    } else {
        // If it hasn't been cached, grab the directory it will be stored in.
        var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
        if (!g.exists()) {
            // If the directory doesn't exist, make it
            g.createDirectory();
        };
 
        // Create the HTTP client to download the asset.
        var xhr = Ti.Network.createHTTPClient();
        xhr.setTimeout(15e3);
        xhr.onload = function() {
            if (xhr.status == 200) {
                // On successful load, take that image file we tried to grab before and
                // save the remote image data to it.
                file.write(xhr.responseData);
                // Assign the local asset path to the image view object.
             //   imageViewObject.image = file.nativePath;
             Ti.API.info('file path');
         //    localPath=file.nativePath;
             Ti.API.info(file.nativePath);
             var result= {
              'response' : file.nativePath
             };
              deferred.resolve(result);
            };
        };
 
        // Issuing a GET request to the remote URL
        xhr.open('GET', url);
        // Finally, sending the request out.
        xhr.send();
    };
};
*/