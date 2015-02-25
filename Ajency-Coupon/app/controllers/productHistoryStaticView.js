
var hideTransactionValues=function(){
	
	$.quantityView.visible=false;
	$.debitView.visible=false;
	$.totalView.visible=false;
};

hideTransactionValues();

var showTransactionValues=function(values){
	
	$.quantityView.visible = true;
	$.quantity.text = values.total;
	
	// $.debitView.visible = true;
	// $.debit.text = values.debit;
// 	
	// $.totalView.visible = true;
	// $.total.text = values.total;
};


function getSum(data){
	
	var sum = 0;
	
	_.each(data, function(item){
		
		sum += parseInt(item.quantity) ;
	});
	
	return sum;
}


Ti.App.addEventListener('app:adminStaticView',function(e){
	
	enteredEmailValue = e.name.split('@');
	$.topLabel.text = enteredEmailValue[0];
	
	var data = e.data;
	
	var totalValue = getSum(data);
	
	var params = {
		
		total: totalValue
	};
	
	showTransactionValues(params);
	
});
