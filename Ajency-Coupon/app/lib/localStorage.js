
var saveOrganizationId=function(id){
	Ti.App.Properties.setInt('organizationId', id);
};

var getOrganizationId=function(){
  return Ti.App.Properties.getInt('organizationId');
};

var saveAllCategories=function(data){
	Ti.App.Properties.setObject('allCategoryResponse', data);
};

var getAllCategories=function(){
  return Ti.App.Properties.getObject('allCategoryResponse');
};

var saveAllProducts=function(data){
	Ti.App.Properties.setObject('allProductResponse', data);
};

var getAllProducts=function(){
  return Ti.App.Properties.getObject('allProductResponse');
};


var saveCreditedDate=function(data){
   Ti.App.Properties.setString('creditedDate',data) ;
};

var getCreditedDate=function(){
  return Ti.App.Properties.getString('creditedDate');
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


var saveLastLoggedInUserId = function(id){
	Ti.App.Properties.setString('lastLoggedInUserId',id);
};

var getLastLoggedInUserId = function(){
	return Ti.App.Properties.getString('lastLoggedInUserId');
};

var saveErrorAtIndex = function (name) {
    Ti.App.Properties.setString('errorAtIndex',name);
};

var getErrorAtIndex = function () {
    return Ti.App.Properties.getString('errorAtIndex');
};

var saveMultiplierValue = function (number) {
    Ti.App.Properties.setInt('multiplierValue',number);
};

var getMultiplierValue = function(){
	return Ti.App.Properties.getInt('multiplierValue');
};

var saveTemporaryProducts = function (data) {
    Ti.App.Properties.setObject('temporaryProducts',data);
};

var getTemporaryProducts = function(){
	 return Ti.App.Properties.getObject('temporaryProducts');
};

var saveCookToken=function(id){
	Ti.App.Properties.setString('cookToken', id);
};

var getCookToken=function(){
  return Ti.App.Properties.getString('cookToken');
};

var savePendingItems = function (data) {
    Ti.App.Properties.setObject('pendingItems',data);
};

var getPendingItems = function(){
	 return Ti.App.Properties.getObject('pendingItems');
};


exports.saveOrganizationId=saveOrganizationId;
exports.getOrganizationId=getOrganizationId;


exports.saveAllCategories=saveAllCategories;
exports.getAllCategories=getAllCategories;


exports.saveAllProducts=saveAllProducts;
exports.getAllProducts=getAllProducts;


exports.saveCreditedDate=saveCreditedDate;
exports.getCreditedDate=getCreditedDate;


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


exports.saveLastLoggedInUserId=saveLastLoggedInUserId;
exports.getLastLoggedInUserId=getLastLoggedInUserId;

exports.saveErrorAtIndex=saveErrorAtIndex;
exports.getErrorAtIndex=getErrorAtIndex;

exports.saveMultiplierValue = saveMultiplierValue;
exports.getMultiplierValue = getMultiplierValue;

exports.saveTemporaryProducts = saveTemporaryProducts;
exports.getTemporaryProducts = getTemporaryProducts;

exports.saveCookToken = saveCookToken;
exports.getCookToken = getCookToken;

exports.savePendingItems = savePendingItems;
exports.getPendingItems = getPendingItems;