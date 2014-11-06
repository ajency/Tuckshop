var createDB = function(){
 	return Ti.Database.open('TuckshopDatabase');
};

var createTable = function (db){
	db.execute('CREATE TABLE IF NOT EXISTS users (user_id INTEGER, user_name TEXT, login_status BOOlEAN)');
};

var insertRow = function (db,user,username,status){
	db.execute('INSERT INTO users (user_id, user_name, login_status) VALUES (?, ?, ?)', user, username, status);
};

var getCount = function (db){
	return db.execute('SELECT COUNT(*) AS totalUsers FROM users');
};

var ifTableExists = function (db){
	return db.execute('SELECT name FROM sqlite_master WHERE type="table" AND name="users"');
};

var getLoginStatus = function  (db,id) {
  	var row = db.execute("SELECT login_status FROM users WHERE user_id=?", [id]);
  	
  	console.log(row);
  	return row.fieldByName('login_status');
};

exports.createDB = createDB;
exports.createTable = createTable;
exports.insertRow = insertRow;
exports.getCount = getCount;
exports.ifTableExists = ifTableExists;
exports.getLoginStatus = getLoginStatus;