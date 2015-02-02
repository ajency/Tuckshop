var localStorage=require('/localStorage');

var createDB = function(){
 	var db = Ti.Database.open('TuckshopDatabase');
 	db.execute('CREATE TABLE IF NOT EXISTS users (user_id INTEGER, user_name TEXT, login_status BOOlEAN, session_id INTEGER, last_credit_date TEXT, organization_id INTEGER)');
 	
	db.execute('CREATE TABLE IF NOT EXISTS transactions (txn_id INTEGER UNIQUE, user_id INTEGER, updated_at TEXT, productName TEXT, productPrice TEXT, productId INTEGER, quantity INTEGER)');
	
	db.execute('CREATE TABLE IF NOT EXISTS organizations (organizationId INTEGER UNIQUE, organizationName TEXT, organization_logo TEXT)');
	
	db.close();
 	
};

// organization_id column is added to the users table for version 4.0
// ADD COLUMN TO A TABLE
var addColumn = function() {
    var db = getDB();
    
    var fieldExists = false;
    resultSet = db.execute('PRAGMA TABLE_INFO(' + 'users' + ')');
    
    while (resultSet.isValidRow()) {
        if(resultSet.field(1)=='organization_id') {
            fieldExists = true;
        }
        resultSet.next();
    } // end while
    if(!fieldExists) {
        // field does not exist, so add it
        db.execute('ALTER TABLE ' + 'users' + ' ADD COLUMN '+'organization_id' + ' ' + 'INTEGER');
    }
    db.close();
};

var getDB = function() {
	
	var db = Ti.Database.open('TuckshopDatabase');
	return db;
};


var checkIfRowExists =  function (id) {  //check if user is present or no
    
    var db = getDB();
	var row = db.execute('SELECT * FROM users WHERE user_id = ?',id);
	var record = row;
	
	
	if(record.isValidRow()){
		row.close();
		db.close();
		return true;
	}
	else{
		row.close();
		db.close();
		return false;
	}
		
};

var insertRow = function (user, username, status, sessionid, date){
	
	var db = getDB();
	db.execute('INSERT INTO users (user_id, user_name, login_status, session_id, last_credit_date) VALUES (?, ?, ?, ?, ?)', user, username, status, sessionid, date);
	db.close();
};

var getCount = function (){
	
	var db = getDB();
	var row = db.execute('SELECT COUNT(*) AS totalUsers FROM users');
	var count = row.fieldByName('totalUsers');
	
	row.close();
	db.close();
	return count;
};

var ifTableExists = function (db){
	
	var db = getDB();
	var table = db.execute('SELECT name FROM sqlite_master WHERE type="table" AND name="users"');
	db.close();
	return table;
};

var getLoginStatus = function  (id) {
	
	var db = getDB();
  	var row = db.execute("SELECT login_status FROM users WHERE user_id=?", [id]);
  	var returnStatus = row.fieldByName('login_status');
  	
  	row.close();
  	db.close();
  	return returnStatus;
};

var setOrganizationId = function (userid,organizationid) {
	console.log('Setting organization id');
    var db = getDB();
	db.execute('UPDATE users SET organization_id=? WHERE user_id=?',organizationid,userid);
	db.close();
};

var onlineLoginStatus = function (id){
	var db = getDB();
	db.execute('UPDATE users SET login_status=? WHERE user_id=?',true,id);
	db.close();
};

var offlineLoginStatus = function (id){
	var db = getDB();
	db.execute('UPDATE users SET login_status=? WHERE user_id=?',false,id);
	db.close();
};

var getSessionId = function  (id) {
	
	var db = getDB();
  	var row = db.execute("SELECT session_id FROM users WHERE user_id=?", [id]);
  	var returnId = row.fieldByName('session_id');
  	
  	row.close();
  	db.close();
  	return returnId;
};

var updateSessionId = function (id){
	var db = getDB();
	db.execute('UPDATE users SET session_id=? WHERE user_id=?','',id);
	db.close();	
};

var getUsersInfo = function(){
 	
 	var data = [];
 	
 	var db = getDB();
 	var rows = db.execute('SELECT * FROM users');
 	
  	while (rows.isValidRow()){
	
		  data.push({
		  		id: rows.fieldByName('user_id'),
		  		username: rows.fieldByName('user_name')
		  });
	
	  rows.next();
	}
	rows.close();
	db.close();
	
	return  data;
};

var deleteUser = function (userid){
	var db = getDB();
	db.execute('DELETE FROM users WHERE user_id=?',userid);
	db.close();	
};

var logoutUsers = function(){
	var db = getDB();
	db.execute('UPDATE users SET login_status=?',false);
	db.close();
};

var updateCreditDate = function (userid, date) {
  	var db = getDB();
	db.execute('UPDATE users SET last_credit_date=? WHERE user_id=?', date, userid);
	db.close();
};

var getLastCreditDate = function(userid){
	
	var db = getDB();
  	var row = db.execute("SELECT last_credit_date FROM users WHERE user_id=?", userid);
  	var returnDate = row.fieldByName('last_credit_date');
  	
  	row.close();
  	db.close();
  	return returnDate;
};

//Transaction related

var getTxnCount = function (){
	
	var db = getDB();
	var row = db.execute('SELECT COUNT(*) AS totalUsers FROM transactions');
	var count = row.fieldByName('totalUsers');
	
	row.close();
	db.close();
	return count;
};

var saveTransactionRows = function  (data) {
   var db = getDB();
   data.reverse();
   for (var i = 0, len = data.length; i < len; i++) {
   	
	db.execute('INSERT OR REPLACE INTO transactions (txn_id, user_id, updated_at, productName, productPrice, productId, quantity ) VALUES (?, ?, ?, ?, ?, ?, ?)'
	, data[i].id, localStorage.getLastLoggedInUserId(), data[i].updated_at, data[i].productName, data[i].productPrice, data[i].productId, data[i].quantity);
   }
    
   db.close();
};

var checkTransactionsPresentForUser =  function (id) {  //check if users transactions present
    
    var db = getDB();
	var row = db.execute('SELECT * FROM transactions WHERE user_id = ?',id);
	
	if(row.isValidRow()){
		row.close();
		db.close();
		return true;
	}	
	else{
		row.close();
		db.close();
		return false;
	}
		
};

var getAllTransactionRows = function (userid) {
	
	var db = getDB();
	var data = [];
	
	var rows = db.execute('SELECT * FROM transactions WHERE user_id=?', userid);
	
	while (rows.isValidRow()){
	
		  data.push({
		  		updated_at: rows.fieldByName('updated_at'),
		  		productName: rows.fieldByName('productName'),
		  		productPrice: rows.fieldByName('productPrice') 
		  	
		  });
	
	  rows.next();
	}
	rows.close();
	db.close();
	
	return data.reverse();
  
};

var getLatestTransactionDate = function (userid){
	
	var db = getDB();
	var row = db.execute('SELECT * FROM transactions WHERE user_id =? ORDER BY updated_at DESC LIMIT 1',userid);
	var returnDate = row.fieldByName('updated_at');
	
	row.close();
	db.close();
	
	return returnDate;
};

//Organization related
var saveOrganizationRow = function  (data) {
   var db = getDB();
   console.log('data passed');
   console.log(data);
   
   for (var i = 0, len = data.length; i < len; i++) {
   	console.log('In loop');
	db.execute('INSERT OR REPLACE INTO organizations (organizationId, organizationName, organization_logo) VALUES (?, ?, ?)'
	, data[i].organizationId, data[i].organizationName, data[i].photo.urls.small_240);
   }
    
   db.close();
};


var getOrganizationRow = function  () {
 
    var db = getDB();
	var data = [];
	
	var rows = db.execute('SELECT * FROM organizations');
	console.log('rows');
	console.log(rows);
	
	while (rows.isValidRow()){
	
		  data.push({
		  		organizationId: rows.fieldByName('organizationId'),
		  		organizationName: rows.fieldByName('organizationName'),
		  		organization_logo: rows.fieldByName('organization_logo') 
		  	
		  });
	
	  rows.next();
	}
	rows.close();
	db.close();
	
	return data;
};

var checkOrganizationPresent =  function (id) {  //check if users transactions present
    
    var db = getDB();
    
	var row = db.execute('SELECT * FROM organizations WHERE organizationId = ?',id);
    
	if(row.isValidRow()){
		row.close();
		db.close();
		return true;
	}	
	else{
		row.close();
		db.close();
		return false;
	}
		
};

exports.createDB = createDB;
exports.addColumn = addColumn;
exports.checkIfRowExists = checkIfRowExists;
exports.insertRow = insertRow;
exports.getCount = getCount;
exports.ifTableExists = ifTableExists;

exports.setOrganizationId = setOrganizationId;

exports.getLoginStatus = getLoginStatus;
exports.onlineLoginStatus = onlineLoginStatus;
exports.offlineLoginStatus = offlineLoginStatus;

exports.getSessionId = getSessionId;
exports.updateSessionId = updateSessionId;

exports.getUsersInfo = getUsersInfo;
exports.deleteUser = deleteUser;

exports.logoutUsers = logoutUsers;

exports.updateCreditDate = updateCreditDate;
exports.getLastCreditDate = getLastCreditDate;

//transaction related

exports.getTxnCount = getTxnCount;
exports.saveTransactionRows = saveTransactionRows;
exports.checkTransactionsPresentForUser = checkTransactionsPresentForUser;
exports.getAllTransactionRows = getAllTransactionRows;
exports.getLatestTransactionDate = getLatestTransactionDate;

//Organization related

exports.saveOrganizationRow = saveOrganizationRow;
exports.getOrganizationRow = getOrganizationRow;
exports.checkOrganizationPresent = checkOrganizationPresent;