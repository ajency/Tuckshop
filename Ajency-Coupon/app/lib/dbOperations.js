var localStorage=require('/localStorage');

var createDB = function(){
 	var db = Ti.Database.open('TuckshopDatabase');
 	
 	db.execute('CREATE TABLE IF NOT EXISTS users (user_id INTEGER, user_name TEXT, login_status BOOlEAN, session_id INTEGER)');
 	
	db.execute('CREATE TABLE IF NOT EXISTS transactions (user_id INTEGER, created_at TEXT, productName TEXT, productPrice TEXT, productId INTEGER, quantity INTEGER)');
	
	db.close();
 	
};

var getDB = function(){
	
	var db = Ti.Database.open('TuckshopDatabase');
	return db;
};


var checkIfRowExists =  function (id) {  //check if user is present or no
    
    var db = getDB();
	var row = db.execute('SELECT * FROM users WHERE user_id = ?',id);
	db.close();
	if(row.isValidRow())
		return true;
	else
		return false;
};

var insertRow = function (user,username,status,sessionid){
	
	var db = getDB();
	db.execute('INSERT INTO users (user_id, user_name, login_status, session_id) VALUES (?, ?, ?,?)', user, username, status, sessionid);
	db.close();
};

var getCount = function (){
	
	var db = getDB();
	var row = db.execute('SELECT COUNT(*) AS totalUsers FROM users');
	var count = row.fieldByName('totalUsers');
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
  	db.close();
  	return row.fieldByName('login_status');
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
  	db.close();
  	return row.fieldByName('session_id');
};

var updateSessionId = function (id){
	var db = getDB();
	db.execute('UPDATE users SET session_id=? WHERE user_id=?','',id);
	db.close();	
};


//Transaction related

var getTxnCount = function (){
	
	var db = getDB();
	var row = db.execute('SELECT COUNT(*) AS totalUsers FROM transactions');
	var count = row.fieldByName('totalUsers');
	db.close();
	return count;
};

var saveTransactionRows = function  (data) {
   var db = getDB();
   for (var i = 0, len = data.length; i < len; i++) {
   	
	db.execute('INSERT INTO transactions (user_id, created_at, productName, productPrice, productId, quantity ) VALUES (?, ?, ?, ?, ?, ?)'
	, localStorage.getLastLoggedInUserId(),data[i].created_at,data[i].productName,data[i].productPrice,data[i].productId,data[i].quantity);
   }
    
   db.close();
};

var checkTransactionsPresentForUser =  function (id) {  //check if users transactions present
    
    var db = getDB();
	var row = db.execute('SELECT * FROM transactions WHERE user_id = ?',id);
	db.close();
	if(row.isValidRow())
		return true;
	else
		return false;
};

var getAllTransactionRows = function (userid) {
	
	var db = getDB();
	var data = [];
	
	var rows = db.execute('SELECT * FROM transactions WHERE user_id=?', userid);
	
	while (rows.isValidRow()){
	
		  data.push({
		  		created_at: rows.fieldByName('created_at'),
		  		productName: rows.fieldByName('productName'),
		  		productPrice: rows.fieldByName('productPrice') 
		  	
		  });
	
	  rows.next();
	}
	rows.close();
	db.close();
	
	return data;
  
};

exports.createDB = createDB;
exports.checkIfRowExists = checkIfRowExists;
exports.insertRow = insertRow;
exports.getCount = getCount;
exports.ifTableExists = ifTableExists;

exports.getLoginStatus = getLoginStatus;
exports.onlineLoginStatus = onlineLoginStatus;
exports.offlineLoginStatus = offlineLoginStatus;

exports.getSessionId = getSessionId;
exports.updateSessionId = updateSessionId;

//transaction related

exports.getTxnCount = getTxnCount;
exports.saveTransactionRows = saveTransactionRows;
exports.checkTransactionsPresentForUser = checkTransactionsPresentForUser;
exports.getAllTransactionRows = getAllTransactionRows;