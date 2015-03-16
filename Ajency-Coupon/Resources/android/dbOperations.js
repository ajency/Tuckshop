var localStorage = require("/localStorage");

var moment = require("alloy/moment");

var createDB = function() {
    var db = Ti.Database.open("TuckshopDatabase");
    db.execute("CREATE TABLE IF NOT EXISTS users (user_id INTEGER, user_name TEXT, login_status BOOlEAN, session_id INTEGER, last_credit_date TEXT)");
    db.execute("CREATE TABLE IF NOT EXISTS transactions (txn_id INTEGER UNIQUE, user_id INTEGER, updated_at TEXT, productName TEXT, productPrice TEXT, productId INTEGER, quantity INTEGER)");
    db.execute("CREATE TABLE IF NOT EXISTS organizations (organizationId INTEGER UNIQUE, organizationName TEXT, organization_logo TEXT, organizationPushChannel TEXT, organizationPendingChannel TEXT, domainName TEXT)");
    db.close();
};

var addColumn = function() {
    var db = getDB();
    var fieldExists = false;
    resultSet = db.execute("PRAGMA TABLE_INFO(users)");
    while (resultSet.isValidRow()) {
        "organizationId" == resultSet.field(1) && (fieldExists = true);
        resultSet.next();
    }
    if (!fieldExists) {
        db.execute("ALTER TABLE users ADD COLUMN organizationId INTEGER");
        db.execute("ALTER TABLE users ADD COLUMN last_mail_date TEXT");
        db.execute("ALTER TABLE users ADD COLUMN admin TEXT");
        db.execute("ALTER TABLE users ADD COLUMN role TEXT");
        db.execute("ALTER TABLE users ADD COLUMN mails INTEGER");
        db.execute("ALTER TABLE users ADD COLUMN daily_weekly TEXT");
    }
    db.close();
};

var getDB = function() {
    var db = Ti.Database.open("TuckshopDatabase");
    return db;
};

var checkIfRowExists = function(id) {
    var db = getDB();
    var row = db.execute("SELECT * FROM users WHERE user_id = ?", id);
    var record = row;
    if (record.isValidRow()) {
        row.close();
        db.close();
        return true;
    }
    row.close();
    db.close();
    return false;
};

var insertRow = function(user, username, status, sessionid, date, organizationId, mails, daily_weekly, mailDate, admin, role) {
    var db = getDB();
    db.execute("INSERT INTO users (user_id, user_name, login_status, session_id, last_credit_date, organizationId, mails, daily_weekly, last_mail_date, admin, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", user, username, status, sessionid, date, organizationId, mails, daily_weekly, moment.utc(mailDate).format(), admin, role);
    db.close();
};

var getCount = function() {
    var db = getDB();
    var row = db.execute("SELECT COUNT(*) AS totalUsers FROM users");
    var count = row.fieldByName("totalUsers");
    row.close();
    db.close();
    return count;
};

var ifTableExists = function(db) {
    var db = getDB();
    var table = db.execute('SELECT name FROM sqlite_master WHERE type="table" AND name="users"');
    db.close();
    return table;
};

var getMailStatus = function(id) {
    var db = getDB();
    var row = db.execute("SELECT mails,daily_weekly FROM users WHERE user_id=?", [ id ]);
    var returnObj = {
        mails: row.fieldByName("mails"),
        daily_weekly: row.fieldByName("daily_weekly")
    };
    row.close();
    db.close();
    return returnObj;
};

var getLoginStatus = function(id) {
    var db = getDB();
    var row = db.execute("SELECT login_status FROM users WHERE user_id=?", [ id ]);
    var returnStatus = row.fieldByName("login_status");
    row.close();
    db.close();
    return returnStatus;
};

var setOrganizationId = function(userid, organizationid) {
    console.log("Setting organization id");
    var db = getDB();
    db.execute("UPDATE users SET organizationId=? WHERE user_id=?", organizationid, userid);
    db.close();
};

var updateMailStatus = function(userid, mails, daily_weekly) {
    var db = getDB();
    db.execute("UPDATE users SET mails=?, daily_weekly=? WHERE user_id=?", mails, daily_weekly, userid);
    db.close();
};

var onlineLoginStatus = function(id) {
    var db = getDB();
    db.execute("UPDATE users SET login_status=? WHERE user_id=?", true, id);
    db.close();
};

var offlineLoginStatus = function(id) {
    var db = getDB();
    db.execute("UPDATE users SET login_status=? WHERE user_id=?", false, id);
    db.close();
};

var getSessionId = function(id) {
    var db = getDB();
    var row = db.execute("SELECT session_id FROM users WHERE user_id=?", [ id ]);
    var returnId = row.fieldByName("session_id");
    row.close();
    db.close();
    return returnId;
};

var updateSessionId = function(id) {
    var db = getDB();
    db.execute("UPDATE users SET session_id=? WHERE user_id=?", "", id);
    db.close();
};

var getUsersInfo = function() {
    var data = [];
    var db = getDB();
    var rows = db.execute("SELECT * FROM users");
    while (rows.isValidRow()) {
        data.push({
            id: rows.fieldByName("user_id"),
            username: rows.fieldByName("user_name")
        });
        rows.next();
    }
    rows.close();
    db.close();
    return data;
};

var deleteUser = function(userid) {
    var db = getDB();
    db.execute("DELETE FROM users WHERE user_id=?", userid);
    db.close();
};

var logoutUsers = function() {
    var db = getDB();
    db.execute("UPDATE users SET login_status=?", false);
    db.close();
};

var updateCreditDate = function(userid, date) {
    var db = getDB();
    db.execute("UPDATE users SET last_credit_date=? WHERE user_id=?", date, userid);
    db.close();
};

var getLastCreditDate = function(userid) {
    var db = getDB();
    var row = db.execute("SELECT last_credit_date FROM users WHERE user_id=?", userid);
    var returnDate = row.fieldByName("last_credit_date");
    row.close();
    db.close();
    return returnDate;
};

var updateLastMailDate = function(userid, date) {
    var db = getDB();
    db.execute("UPDATE users SET last_mail_date=? WHERE user_id=?", moment.utc(date).format(), userid);
    db.close();
};

var getLastMailDate = function(userid) {
    var db = getDB();
    var row = db.execute("SELECT last_mail_date FROM users WHERE user_id=?", userid);
    var returnDate = row.fieldByName("last_mail_date");
    row.close();
    db.close();
    return returnDate;
};

var updateUserType = function(userid, usertype) {
    var db = getDB();
    db.execute("UPDATE users SET admin=? WHERE user_id=?", usertype, userid);
    db.close();
};

var getUserType = function(userid) {
    var db = getDB();
    var row = db.execute("SELECT admin FROM users WHERE user_id=?", userid);
    var returnType = row.fieldByName("admin");
    row.close();
    db.close();
    return returnType;
};

var getUserName = function(userid) {
    var db = getDB();
    var row = db.execute("SELECT user_name FROM users WHERE user_id=?", userid);
    var returnName = row.fieldByName("user_name");
    row.close();
    db.close();
    return returnName;
};

var updateUserRole = function(userid, userrole) {
    var db = getDB();
    db.execute("UPDATE users SET role=? WHERE user_id=?", userrole, userid);
    db.close();
};

var getUserRole = function(userid) {
    var db = getDB();
    var row = db.execute("SELECT role FROM users WHERE user_id=?", userid);
    var returnType = row.fieldByName("role");
    row.close();
    db.close();
    return returnType;
};

var getTxnCount = function() {
    var db = getDB();
    var row = db.execute("SELECT COUNT(*) AS totalUsers FROM transactions");
    var count = row.fieldByName("totalUsers");
    row.close();
    db.close();
    return count;
};

var saveTransactionRows = function(data) {
    var db = getDB();
    data.reverse();
    for (var i = 0, len = data.length; len > i; i++) db.execute("INSERT OR REPLACE INTO transactions (txn_id, user_id, updated_at, productName, productPrice, productId, quantity ) VALUES (?, ?, ?, ?, ?, ?, ?)", data[i].id, localStorage.getLastLoggedInUserId(), data[i].updated_at, data[i].productName, data[i].productPrice, data[i].productId, data[i].quantity);
    db.close();
};

var checkTransactionsPresentForUser = function(id) {
    var db = getDB();
    var row = db.execute("SELECT * FROM transactions WHERE user_id = ?", id);
    if (row.isValidRow()) {
        row.close();
        db.close();
        return true;
    }
    row.close();
    db.close();
    return false;
};

var getAllTransactionRows = function(userid) {
    var db = getDB();
    var data = [];
    var rows = db.execute("SELECT * FROM transactions WHERE user_id=?", userid);
    while (rows.isValidRow()) {
        data.push({
            updated_at: rows.fieldByName("updated_at"),
            productName: rows.fieldByName("productName"),
            productPrice: rows.fieldByName("productPrice")
        });
        rows.next();
    }
    rows.close();
    db.close();
    return data.reverse();
};

var getLatestTransactionDate = function(userid) {
    var db = getDB();
    var row = db.execute("SELECT * FROM transactions WHERE user_id =? ORDER BY updated_at DESC LIMIT 1", userid);
    var returnDate = row.fieldByName("updated_at");
    row.close();
    db.close();
    return returnDate;
};

var getDailyTransactions = function(userid, startDate, endDate) {
    moment().startOf("day");
    moment().endOf("day");
    var data = [];
    var db = getDB();
    var rows = db.execute("SELECT * FROM transactions WHERE user_id =? AND updated_at BETWEEN ? AND ?", userid, startDate, endDate);
    while (rows.isValidRow()) {
        data.push({
            productName: rows.fieldByName("productName"),
            productPrice: rows.fieldByName("productPrice"),
            updated_at: rows.fieldByName("updated_at")
        });
        rows.next();
    }
    rows.close();
    db.close();
    return data;
};

var saveOrganizationRow = function(data) {
    var db = getDB();
    console.log("data passed");
    console.log(data);
    for (var i = 0, len = data.length; len > i; i++) {
        console.log("In loop");
        db.execute("INSERT OR REPLACE INTO organizations (organizationId, organizationName, organization_logo, organizationPushChannel, organizationPendingChannel, domainName) VALUES (?, ?, ?, ?, ?, ?)", data[i].organizationId, data[i].organizationName, data[i].photo.urls.small_240, data[i].organizationPushChannel, data[i].organizationPendingChannel, data[i].domainName);
    }
    db.close();
};

var getOrganizationRow = function() {
    var db = getDB();
    var data = [];
    var rows = db.execute("SELECT * FROM organizations");
    console.log("rows");
    console.log(rows);
    while (rows.isValidRow()) {
        data.push({
            organizationId: rows.fieldByName("organizationId"),
            organizationName: rows.fieldByName("organizationName"),
            organization_logo: rows.fieldByName("organization_logo"),
            organizationPushChannel: rows.fieldByName("organizationPushChannel"),
            organizationPendingChannel: rows.fieldByName("organizationPendingChannel"),
            domainName: rows.fieldByName("domainName")
        });
        rows.next();
    }
    rows.close();
    db.close();
    return data;
};

var checkOrganizationPresent = function(id) {
    var db = getDB();
    var row = db.execute("SELECT * FROM organizations WHERE organizationId = ?", id);
    if (row.isValidRow()) {
        row.close();
        db.close();
        return true;
    }
    row.close();
    db.close();
    return false;
};

exports.createDB = createDB;

exports.addColumn = addColumn;

exports.checkIfRowExists = checkIfRowExists;

exports.insertRow = insertRow;

exports.getCount = getCount;

exports.ifTableExists = ifTableExists;

exports.setOrganizationId = setOrganizationId;

exports.updateMailStatus = updateMailStatus;

exports.getMailStatus = getMailStatus;

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

exports.updateLastMailDate = updateLastMailDate;

exports.getLastMailDate = getLastMailDate;

exports.updateUserType = updateUserType;

exports.getUserType = getUserType;

exports.getUserName = getUserName;

exports.updateUserRole = updateUserRole;

exports.getUserRole = getUserRole;

exports.getTxnCount = getTxnCount;

exports.saveTransactionRows = saveTransactionRows;

exports.checkTransactionsPresentForUser = checkTransactionsPresentForUser;

exports.getAllTransactionRows = getAllTransactionRows;

exports.getLatestTransactionDate = getLatestTransactionDate;

exports.getDailyTransactions = getDailyTransactions;

exports.saveOrganizationRow = saveOrganizationRow;

exports.getOrganizationRow = getOrganizationRow;

exports.checkOrganizationPresent = checkOrganizationPresent;