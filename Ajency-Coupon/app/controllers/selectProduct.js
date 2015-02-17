var alloy = require('alloy');
var localStorage=require('/localStorage');
var args = arguments[0] || {};

var categoryPicker;
var productPicker;

var allProducts;
var column1;

var pickerName;

function filterproducts (id){
	
	allProducts = [];
	allProducts = _.filter(localStorage.getAllProducts(), function(product) {
	
		return product.categoryId == id;
	});
	
};


var changeEvent = function(e){
	
	var value;
	
	if(pickerName === 'first'){
		value = e.source.columns[0].children[0].title;
		pickerName = '';
	}
	else 
		value = e.selectedValue;
	
	var selectedProduct = _.filter(localStorage.getAllProducts(), function(product) {
	
		return product.productName == value;
	});
	
	
	var evtData = {id: 'Product Transaction', productid: selectedProduct[0].productId, name: selectedProduct[0].productName };
		 
	 alloy.Globals.navigatedView = evtData.id;
	 Ti.App.fireEvent("app:addViewToMidContainer", evtData);
	 evtData = null; 
};

/*
 * Loading category picker
 */
function loadCategoryPicker(){
	
	categoryPicker = Ti.UI.createPicker({
  		top:'20%',
  		left :'20%',
  		right: '20%',
  		width: '60%',
  		backgroundColor: '#3B0B0B'
	});

	var categoryData = localStorage.getAllCategories();
	
	var data = [];
	for (var i=0;len=categoryData.length, i < len; i++) {
		
	  	data[i]=Ti.UI.createPickerRow({title:categoryData[i].categoryName, width: 'Ti.UI.FILL' });
	};
	
	categoryPicker.add(data);
	
	$.pickerView.add(categoryPicker);
}

/*
 * Loading product picker
 */

function loadProductPicker(id){
	
    filterproducts(id);
    
    if(productPicker!=null)
    	$.pickerView.remove(productPicker);
  
    	
	productPicker = Ti.UI.createPicker({
  		top:'20%',
  		left :'20%',
  		right: '20%',
  		width: '60%',
  		backgroundColor: '#3B0B0B'
	});
	
	column1 = Ti.UI.createPickerColumn();
	
	var productsData = allProducts;
	
	var data = [];
	for (var i=0;len=productsData.length, i < len; i++) {
		
		var row = Ti.UI.createPickerRow({ title:productsData[i].productName, width: 'Ti.UI.FILL' });
  		column1.addRow(row);
	};
	
	productPicker.add([column1]);
	
	$.pickerView.add(productPicker);
	
	productPicker.addEventListener('change', changeEvent);
}


loadCategoryPicker();

loadProductPicker(111);

categoryPicker.addEventListener('change', function(e){
	
	var selectedCategory = _.filter(localStorage.getAllCategories(), function(product) {
	
		return product.categoryName == e.selectedValue;
	});
	
	loadProductPicker(parseInt(selectedCategory[0].categoryId));
	
	pickerName = 'first';
	
	productPicker.fireEvent('change');
	
});


