var setAllTransactions=function(data){
  Ti.App.Properties.setList('allTransactionResponse', data);
};

var getAllTransactions=function(){
  return Ti.App.Properties.getList('allTransactionResponse');
};

var saveAllProducts=function(data){
  Ti.App.Properties.setList('allProductResponse', data);
};

var getAllProducts=function(){
  return Ti.App.Properties.getList('allProductResponse');
};


var saveCreditedDate=function(data){
   Ti.App.Properties.setString('creditedDate',data) ;
};

var getCreditedDate=function(){
  return Ti.App.Properties.getString('creditedDate');
};

var saveLatestTransaction=function(data){
   Ti.App.Properties.setString('latestTransaction',data) ;
};

var getLatestTransaction=function(){
  return Ti.App.Properties.getString('latestTransaction');
};

var saveUserId=function(user){
  Ti.App.Properties.setString('userid', user.id);
};

var getUserId=function(){
  return Ti.App.Properties.getString('userid');
};

var saveUserName=function(data){
   Ti.App.Properties.setString('username', data);
};

var getUserName=function(){
  return Ti.App.Properties.getString('username');
};

var saveDisplayName=function(data){
   Ti.App.Properties.setString('displayName',data);
};

var getDisplayName=function(){
  return Ti.App.Properties.getString('displayName');
};

var saveSessionId=function(data){
   Ti.App.Properties.setString('sessionID',data);
};

var getSessionId = function(){
  return Ti.App.Properties.getString('sessionID');
};

var saveDeviceToken = function(data){
	Ti.App.Properties.setString('localDeviceToken',data);
};

var getDeviceToken = function(){
  return Ti.App.Properties.getString('localDeviceToken');
};

var setIfAlreadyRegistered = function(data){
	Ti.App.Properties.setString('alreadyRegistered',data);
};

var getIfAlreadyRegistered = function(){
	return Ti.App.Properties.getString('alreadyRegistered');
};

var setIfNotCredited = function(data){
	Ti.App.Properties.setString('alreadyCredited',data);
};

var getIfNotCredited = function(){
	return Ti.App.Properties.getString('alreadyCredited');
};

var saveLastLoggedInUserId = function(id){
	Ti.App.Properties.setString('lastLoggedInUserId',id);
};

var getLastLoggedInUserId = function(){
	return Ti.App.Properties.getString('lastLoggedInUserId');
};

exports.setAllTransactions=setAllTransactions;
exports.getAllTransactions=getAllTransactions;

exports.saveAllProducts=saveAllProducts;
exports.getAllProducts=getAllProducts;


exports.saveCreditedDate=saveCreditedDate;
exports.getCreditedDate=getCreditedDate;

exports.saveLatestTransaction=saveLatestTransaction;
exports.getLatestTransaction=getLatestTransaction;

exports.saveUserId=saveUserId;
exports.getUserId=getUserId;

exports.saveUserName=saveUserName;
exports.getUserName=getUserName;

exports.saveDisplayName=saveDisplayName;
exports.getDisplayName=getDisplayName;

exports.saveSessionId=saveSessionId;
exports.getSessionId=getSessionId;

exports.saveDeviceToken=saveDeviceToken;
exports.getDeviceToken=getDeviceToken;

exports.setIfAlreadyRegistered=setIfAlreadyRegistered;
exports.getIfAlreadyRegistered=getIfAlreadyRegistered;

exports.setIfNotCredited=setIfNotCredited;
exports.getIfNotCredited=getIfNotCredited;

exports.saveLastLoggedInUserId=saveLastLoggedInUserId;
exports.getLastLoggedInUserId=getLastLoggedInUserId;