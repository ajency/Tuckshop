
var PickerPopup = function (title, values)
{
	var __ = require('platformSupport');
	var _self = null;
	var _values = values;
	var _value = '';
	var _selidx = -1;
	
	var _tvValues = null;
	var _btnCancel = null;
	var _btnDone = null;
	var _toolbar = null;
	
	_self = Ti.UI.createWindow({
		backgroundColor: "#FFF",//TU.UI.Theme.lightBackgroundColor,
		layout: 'vertical'
	});
	
	
 
	_btnCancel =  Ti.UI.createButton({
		title: 'Cancel',
		height: 25,
		top: 2,
		left: 20,
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});
 
	_btnDone =  Ti.UI.createButton({
		title: 'Done',
		height: 25,
		top: 2,
		right: 20,
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var spacer =  Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});	

 	_toolbar = Ti.UI.iOS.createToolbar ({
 		items: [_btnCancel, spacer, _btnDone],
		backgroundColor:'#777',
		top: 0,
		borderTop: false,
		borderBottom: true
	});
	if(Alloy.CFG.colorCode != null){
		_toolbar.backgroundColor = Alloy.CFG.colorCode;
		spacer.backgroundColor = Alloy.CFG.colorCode;
	}
	if (__.isiOS7Plus()) {
		_toolbar.top = 20;
		
	}
	_self.add (_toolbar);
	
	var data = [];
	for (var i = 0; i < _values.length; i++)
	{
		data.push ({title: _values[i]});
	}
	
	var v = Ti.UI.createView ({
	   left: 0,
	   right: 0,
	   bottom: 0,
	   height: Ti.UI.FILL	    
	});

	_tvValues = Ti.UI.createTableView ({
		data: data,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 5,
		top: 5,
		left: 5,
		right: 5,
		bottom: 5,
		allowSelection: false,
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
	
	});
	_tvValues.addEventListener('click', function(e){
 
		var tableData = _tvValues.data[0].rows;
	         for(i=0;i<tableData.length;i++)
	         {
	             // this will reset color of all the rows
	            tableData[i].backgroundColor = "white";
	         }
	         rowData = e.rowData;
	                 // this will set selected row color to red
	         rowData.backgroundColor = Alloy.CFG.colorCode;
	 
	});
	
	_tvValues.addEventListener ('click', function (e) {
		_self.xsetValue (_values[e.index]);
	});
	
	_self.add (v);
	v.add (_tvValues);
	
	_btnDone.addEventListener('click', function (e) {
		_self.fireEvent ('done', { value: _value });
		_self.close ();
	});
	
	_btnCancel.addEventListener('click', function (e) {
		_self.close ();
	});
	
	_self.xsetValue = function (value)
	{
		if (_selidx > -1)
		{
			_tvValues.deselectRow (_selidx);
		}
		
	    for (var i = 0; i < _values.length; i++)
	    {
	        if (_values[i] == value)
	        {
	        	_selidx = i;
	            _tvValues.selectRow (_selidx);
	            _tvValues.scrollToIndex (_selidx);
	            break;
	        }
	    }

		_value = value;
	};
	
	return _self;
};


exports.SimplePicker= function (params)
{
	var _self = null;
	var _label = null;
	var _values = [];
	var _value = "";
	var _data = [];
	var _title = '';
	var _ppopup = null;
	
	var _btn_disclosure = null;
	
	var newparams = {};
	
	for (var k in params)
	{
		if (k == 'values')
		{
			_values = params[k];
			continue;
		}
		if (k == 'title')
		{
			_title = params[k];
			continue;
		}
		
		newparams[k] = params[k];
	}
	
	if (_values.length > 0)
	{
		_value = _values[0];
	}

	for (var i = 0; i < _values.length; i++)
	{
		_data.push (Ti.UI.createPickerRow({title: _values[i]}));
	}	

	if (Ti.Platform.osname == 'android')
	{
		if (typeof newparams.backgroundColor != "undefined")
		{
			// don't set a background color on android; that will remove the "control look" of
			// the picker...
			delete newparams.backgroundColor;
		}
		Ti.API.debug ('[SimplePicker] newparams: ' + JSON.stringify (newparams));
		
		_self = Ti.UI.createPicker (newparams);
		_self.addEventListener ('change', function (e) {
			_value = e.selectedValue[0];
			_self.fireEvent ('TUchange', { value: _value });
		});
		_self.add (_data);
	}
	else
	{
		if (typeof newparams.height === 'undefined')
		{
			newparams.height = 35;		
		}
		if (typeof newparams.borderColor === 'undefined')
		{
			newparams.borderColor = '#686868';		
		}
		if (typeof newparams.borderRadius === 'undefined')
		{
			newparams.borderRadius = 5;		
		}
		if (typeof newparams.backgroundColor === 'undefined')
		{
			newparams.backgroundColor = '#fff';		
		}
		if (typeof newparams.font === 'undefined')
		{
			newparams.font = { fontSize: 16, fontWeight: 'bold' };		
		}
		if (typeof newparams.color === 'undefined')
		{
			newparams.color = Alloy.CFG.colorCode;//'#385487';		
		}
		if(Alloy.CFG.colorCode != null){
			newparams.borderColor = Alloy.CFG.colorCode;
		}
		newparams.text = _value;
	
		_self = Ti.UI.createView (newparams);
		
		var labelparams = {
            left: 10,
            top: 8,
            color: newparams.color,
            font: newparams.font,
            text: _value
		};
		
        _label = Ti.UI.createLabel (labelparams);
			
		var tr = Ti.UI.create2DMatrix();
		tr = tr.rotate(90);
		_btn_disclosure = Ti.UI.createButton ({
			right: 5,
			width : 20,
			height : 20,
			image : "/images/red/dropdownButton.png",
			backgroundColor : "null",
			backgroundImage :  "null"
			//style: Ti.UI.iPhone.SystemButton.DISCLOSURE,
			//transform: tr
		});
		
		if(Alloy.CFG.theme != null){
			
			if(Alloy.CFG.theme == "blue"){
				_btn_disclosure.image = "/images/blue/dropdownButton.png";
			}else if(Alloy.CFG.theme == "green"){
				_btn_disclosure.image = "/images/green/dropdownButton.png";
			}else if(Alloy.CFG.theme == "red"){
				_btn_disclosure.image = "/images/red/dropdownButton.png";
			}
			
		}
		
		_self.add (_label);
		_self.add (_btn_disclosure);
		
		_self.addEventListener ('click', function (e) {
			_ppopup = new PickerPopup (_title, _values);
			_ppopup.addEventListener ('done', function (e) {
				if (e.value == _value)
				{
					return;
				}
	
				_value = e.value;
				_label.text = _value;
				
				_self.fireEvent ('TUchange', e);
			});

			_ppopup.xsetValue (_value);

			// will open w/o a nav bar, but no fancy transition
			//_ppopup.open ();

			// open in modal so you can get a fancy transition, but this necessitates
			// hiding the navbar
			_ppopup.open ({
				modal: true, 
				navBarHidden:true 
			});
			
		});
	}
	
	_self.xgetValue = function ()
	{
		return _value;
	};
	
	_self.xsetValue = function (value)
	{
		for (var i = 0; i < _values.length; i++)
		{
			if (_values[i] == value)
			{
				_value = value;
				if (Ti.Platform.osname == 'android')
				{
					_self.setSelectedRow (0, i, false);
				}
				else
				{
					_label.text = _value;
				}
			}
		}
	};
	
	return _self;
};

