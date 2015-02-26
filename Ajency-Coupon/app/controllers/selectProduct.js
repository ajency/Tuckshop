var alloy = require('alloy');
var localStorage=require('/localStorage');
var args = arguments[0] || {};

var androidCategoryPicker;
var androidProductPicker;

var iosCategoryPicker;
var iosProductPicker;
var id = 111;

var allProducts;
var column1;

var pickerName;
var topMargin;
var heightValue;
if (OS_IOS) {
	topMargin = '5%';
	heightValue = '30%';
}
else{
	topMargin = '20%';
	heightValue= null;
}

function filterproducts (id){
	
	allProducts = [];
	allProducts = _.filter(localStorage.getCloudProducts(), function(product) {
	
		return product.categoryId === id;
	});
	
};


var changeEvent = function(e){
	
	var value;
	
	value = e.selectedValue;
	
	var selectedProduct = _.filter(localStorage.getCloudProducts(), function(product) {
	
		return product.productName == value;
	});
	
	
	
	if(selectedProduct[0] != undefined){
		
		var evtData = {id: 'Product Transaction', productid: selectedProduct[0].productId, name: selectedProduct[0].productName };
	 
		alloy.Globals.navigatedView = evtData.id;
	 	Ti.App.fireEvent("app:addViewToMidContainer", evtData);
	    evtData = null; 
	}	
	
	
};

/*
 * Loading category picker
 */
function loadCategoryPicker(){
	
	androidCategoryPicker = Ti.UI.createPicker({
		top: topMargin,
		left :'20%', 
		right: '20%',
		width: '60%',
		height: heightValue, 
		backgroundImage: '/images/dropdown.png'
	});

	var categoryData = localStorage.getAllCategories();
	
	var data = [];
	for (var i=0;len=categoryData.length, i < len; i++) {
		
	  	data[i]=Ti.UI.createPickerRow({title:categoryData[i].categoryName, width: 'Ti.UI.FILL'  });
	};
	
	androidCategoryPicker.add(data);
	
	$.pickerView.add(androidCategoryPicker);
}

/*
 * Loading product picker
 */

function loadProductPicker(id){
	
    filterproducts(id);
    
    if(androidProductPicker!=null)
    	$.pickerView.remove(androidProductPicker);
  
    	
	androidProductPicker = Ti.UI.createPicker({
  		top: topMargin,
  		left :'20%',
  		right: '20%',
  		width: '60%',
  		height: heightValue, 
  		backgroundImage: '/images/dropdown.png'
	});
	
	column1 = Ti.UI.createPickerColumn();
	
	
	allProducts.unshift({productName: 'Select a Product'});
	
	console.log('length of products');
	console.log(allProducts.length);
	var productsData = allProducts;
	
	var data = [];
	for (var i=0;len=productsData.length, i < len; i++) {
		
		var row = Ti.UI.createPickerRow({ title:productsData[i].productName, width: 'Ti.UI.FILL' });
  		column1.addRow(row);
	};
	
	androidProductPicker.add([column1]);
	
	$.pickerView.add(androidProductPicker);
	
	androidProductPicker.addEventListener('change', changeEvent);
}

if (!OS_IOS){
	loadCategoryPicker();

	loadProductPicker(111);
	
	androidCategoryPicker.addEventListener('change', categoryChange);
}
else{
	$.categoryButton.addEventListener('click', loadIosCategoryPicker);
	
	$.productButton.addEventListener('click', loadIosProductPicker);
}

function categoryChange(e){
	
	
	var selectedCategory = _.filter(localStorage.getAllCategories(), function(product) {
	
		return product.categoryName == e.selectedValue;
	});
	
	if (OS_IOS){
		$.categoryButton.setTitle(selectedCategory[0].categoryName);
		id = parseInt(selectedCategory[0].categoryId);
	}
	else{
		loadProductPicker(parseInt(selectedCategory[0].categoryId));
	}
	
	
	
};

function loadIosCategoryPicker(){
	
	if(iosProductPicker!=null)
    	$.pickerView.remove(iosProductPicker);
    	
	//to remove the picker when select category is pressed
	if(iosCategoryPicker!=null) 
    	$.pickerView.remove(iosCategoryPicker);
    	
   
    	iosCategoryPicker = Ti.UI.createPicker({
			bottom: '0%',
			width: '100%'
		});
	
		var categoryData = localStorage.getAllCategories();
		
		var data = [];
		for (var i=0;len=categoryData.length, i < len; i++) {
			
		  	data[i]=Ti.UI.createPickerRow({title:categoryData[i].categoryName, width: 'Ti.UI.FILL'  });
		};
		
		iosCategoryPicker.add(data);
		
		$.pickerView.add(iosCategoryPicker);
		
		iosCategoryPicker.addEventListener('change', categoryChange);
	
};

function loadIosProductPicker(){
	
	filterproducts(id);
	
	if(iosCategoryPicker!=null)
    	$.pickerView.remove(iosCategoryPicker);
    
    if(iosProductPicker!=null)
    	$.pickerView.remove(iosProductPicker);
    		
	iosProductPicker = Ti.UI.createPicker({
		bottom : '0%',
  		width: '100%'
	});
	
	column1 = Ti.UI.createPickerColumn();
	
	
	allProducts.unshift({productName: 'Select a Product'});
	
	var productsData = allProducts;
	
	var data = [];
	for (var i=0;len=productsData.length, i < len; i++) {
		
		var row = Ti.UI.createPickerRow({ title:productsData[i].productName, width: 'Ti.UI.FILL' });
  		column1.addRow(row);
	};
	
	iosProductPicker.add([column1]);
	
	$.pickerView.add(iosProductPicker);
	
	iosProductPicker.addEventListener('change', changeEvent);
};

