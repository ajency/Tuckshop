var localStorage=require('/localStorage');
var hideTransactionValues=function(){
	
	$.creditView.visible=false;
	$.debitView.visible=false;
	$.totalView.visible=false;
};

hideTransactionValues();

var showTransactionValues=function(values){
	
	$.rupeeSymbol1.image = localStorage.getCurrencyUrl();
	$.rupeeSymbol2.image = localStorage.getCurrencyUrl();
	$.rupeeSymbol3.image = localStorage.getCurrencyUrl();
	
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
		
		sum += parseFloat(item.productPrice) ;
	});
	
	sum = sum.toFixed(2);
	
	return sum;
}


Ti.App.addEventListener('app:adminStaticView',function(e){
	
	enteredEmailValue = e.name.split('@');
	$.topLabel.text = enteredEmailValue[0];
	
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
