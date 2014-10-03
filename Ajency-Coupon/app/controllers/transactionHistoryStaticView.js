var hideTransactionValues=function(){
	
	$.creditView.visible=false;
	$.debitView.visible=false;
	$.totalView.visible=false;
};

hideTransactionValues();

var showTransactionValues=function(values){
	
	$.creditView.visible = true;
	$.credit.text = values.credit;
	
	$.debitView.visible = true;
	$.debit.text = values.debit;
	
	$.totalView.visible = true;
	$.total.text = values.total;
};


function getSum(data){
	
	var sum = 0;
	
	_.each(data, function(item){
		
		sum += item.productPrice;
	});
	
	return sum;
}


Ti.App.addEventListener('app:transactionStaticView',function(e){
	
	var data = e.data;
	
	var creditData = data.filter(function(item){
		
		return(item.productName === 'Credit');
	});
	
	var creditValue = getSum(creditData);
	
	var debitData = data.filter(function(item){
		
		return(item.productName != 'Credit');
	});
	
	var debitValue = getSum(debitData);
	
	var totalValue = getSum(data);
	
	var params = {
		credit: creditValue,
		debit: debitValue,
		total: totalValue
	};
	
	showTransactionValues(params);
	
});
