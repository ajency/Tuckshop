var getNetworkStatus = function(){
	if (Titanium.Network.networkType === Titanium.Network.NETWORK_NONE)
	 return 0;
	 
	else
	 return 1; 
};
exports.getNetworkStatus = getNetworkStatus;