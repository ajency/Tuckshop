var alloy = require('alloy');
var localStorage=require('/localStorage');
var args = arguments[0] || {};

var androidCategoryPicker;
var androidProductPicker;
var quantityTextField;
var addButton;
var selectedProduct;

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
	topMargin = '10%';
	heightValue= null;
}

function addStock(){
	
	if(selectedProduct != undefined){
		
			if(quantityTextField.value.trim() != ''){
		 
					Cloud.Objects.create({
					    classname: 'testItems',
					    fields: {
					    	productName: selectedProduct[0].productName,
					        productId: selectedProduct[0].productId,
					        quantity: quantityTextField.value
						    }
						}, function (e) {
						    if (e.success) {
					        alert('Stock added successfully');
					    } else {
					        alert('Error:\n' +
					            ((e.error && e.message) || JSON.stringify(e)));
					    }
					});
			}
			else
				alert('Quantity cannot be blank');	
	}
	else
		alert('Please select a Product');
	
	
	
};

function filterproducts (id){
	
	allProducts = [];
	allProducts = _.filter(localStorage.getCloudProducts(), function(product) {
	
		return product.categoryId == id;
	});
	
};


var productChange = function(e){
	
	var value;
	
	value = e.selectedValue;
	
	selectedProduct = _.filter(localStorage.getCloudProducts(), function(product) {
	
		return product.productName == value;
	});
	
};

/*
 * Loading category picker
 */
function loadAndroidCategoryPicker(){
	
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
	
	$.topView.add(androidCategoryPicker);
}

/*
 * Loading product picker
 */

function loadAndroidProductPicker(id){
	
    filterproducts(id);
    
    if(androidProductPicker!=null)
    	$.topView.remove(androidProductPicker);
  
    	
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
	
	var productsData = allProducts;
	
	var data = [];
	for (var i=0;len=productsData.length, i < len; i++) {
		
		var row = Ti.UI.createPickerRow({ title:productsData[i].productName, width: 'Ti.UI.FILL' });
  		column1.addRow(row);
	};
	
	androidProductPicker.add([column1]);
	
	$.topView.add(androidProductPicker);
	
	androidProductPicker.addEventListener('change', productChange);
}

/*
 * Text field and buttons
 */
function addComponents(){
		
		// Create a TextField.
		quantityTextField = Ti.UI.createTextField({
			top : '10%',
			left :'20%',
  			right: '20%',
  			width: '60%',
			hintText : 'Enter Quantity',
			backgroundColor : '#FFF',
			color : '#222',
   			borderWidth : 1,
    		borderColor: '#3B0B0B',
			softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
			keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
			returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
			borderStyle :  Titanium.UI.INPUT_BORDERSTYLE_NONE
		});
		
		quantityTextField.addEventListener('return', function(e) {
			quantityTextField.blur();
		});
		
		$.bottomView.add(quantityTextField);
		
		
		addButton = Ti.UI.createButton({
			title : 'Add',
			top : '10%',
			left :'20%',
  			right: '20%',
  			width: '60%',
  			color: '#3B0B0B',
  			backgroundColor: '#F0C60A',
			style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		
		$.bottomView.add(addButton);
		
		addButton.addEventListener('click', addStock);
		
};

if (!OS_IOS){
	loadAndroidCategoryPicker();

	loadAndroidProductPicker(111);
	
	addComponents();
	
	androidCategoryPicker.addEventListener('change', categoryChange);
}

function categoryChange(e){
	
	var selectedCategory = _.filter(localStorage.getAllCategories(), function(product) {
	
		return product.categoryName == e.selectedValue;
	});
	
	loadAndroidProductPicker(parseInt(selectedCategory[0].categoryId));
	
};

