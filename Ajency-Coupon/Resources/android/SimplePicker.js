var PickerPopup = function(title, values) {
    var __ = require("platformSupport");
    var _self = null;
    var _values = values;
    var _value = "";
    var _selidx = -1;
    var _tvValues = null;
    var _btnCancel = null;
    var _btnDone = null;
    var _toolbar = null;
    _self = Ti.UI.createWindow({
        backgroundColor: "#FFF",
        layout: "vertical"
    });
    _btnCancel = Ti.UI.createButton({
        title: "Cancel",
        height: 25,
        top: 2,
        left: 20,
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
    });
    _btnDone = Ti.UI.createButton({
        title: "Done",
        height: 25,
        top: 2,
        right: 20,
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
    });
    var spacer = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    _toolbar = Ti.UI.iOS.createToolbar({
        items: [ _btnCancel, spacer, _btnDone ],
        backgroundColor: "#777",
        top: 0,
        borderTop: false,
        borderBottom: true
    });
    if (null != Alloy.CFG.colorCode) {
        _toolbar.backgroundColor = Alloy.CFG.colorCode;
        spacer.backgroundColor = Alloy.CFG.colorCode;
    }
    __.isiOS7Plus() && (_toolbar.top = 20);
    _self.add(_toolbar);
    var data = [];
    for (var i = 0; i < _values.length; i++) data.push({
        title: _values[i]
    });
    var v = Ti.UI.createView({
        left: 0,
        right: 0,
        bottom: 0,
        height: Ti.UI.FILL
    });
    _tvValues = Ti.UI.createTableView({
        data: data,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        top: 5,
        left: 5,
        right: 5,
        bottom: 5,
        allowSelection: false,
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
    });
    _tvValues.addEventListener("click", function(e) {
        var tableData = _tvValues.data[0].rows;
        for (i = 0; i < tableData.length; i++) tableData[i].backgroundColor = "white";
        rowData = e.rowData;
        rowData.backgroundColor = Alloy.CFG.colorCode;
    });
    _tvValues.addEventListener("click", function(e) {
        _self.xsetValue(_values[e.index]);
    });
    _self.add(v);
    v.add(_tvValues);
    _btnDone.addEventListener("click", function() {
        _self.fireEvent("done", {
            value: _value
        });
        _self.close();
    });
    _btnCancel.addEventListener("click", function() {
        _self.close();
    });
    _self.xsetValue = function(value) {
        _selidx > -1 && _tvValues.deselectRow(_selidx);
        for (var i = 0; i < _values.length; i++) if (_values[i] == value) {
            _selidx = i;
            _tvValues.selectRow(_selidx);
            _tvValues.scrollToIndex(_selidx);
            break;
        }
        _value = value;
    };
    return _self;
};

exports.SimplePicker = function(params) {
    var _self = null;
    var _values = [];
    var _value = "";
    var _data = [];
    var _title = "";
    var newparams = {};
    for (var k in params) {
        if ("values" == k) {
            _values = params[k];
            continue;
        }
        if ("title" == k) {
            _title = params[k];
            continue;
        }
        newparams[k] = params[k];
    }
    _values.length > 0 && (_value = _values[0]);
    for (var i = 0; i < _values.length; i++) _data.push(Ti.UI.createPickerRow({
        title: _values[i]
    }));
    "undefined" != typeof newparams.backgroundColor && delete newparams.backgroundColor;
    Ti.API.debug("[SimplePicker] newparams: " + JSON.stringify(newparams));
    _self = Ti.UI.createPicker(newparams);
    _self.addEventListener("change", function(e) {
        _value = e.selectedValue[0];
        _self.fireEvent("TUchange", {
            value: _value
        });
    });
    _self.add(_data);
    _self.xgetValue = function() {
        return _value;
    };
    _self.xsetValue = function(value) {
        for (var i = 0; i < _values.length; i++) if (_values[i] == value) {
            _value = value;
            _self.setSelectedRow(0, i, false);
        }
    };
    return _self;
};