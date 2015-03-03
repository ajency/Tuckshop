var getNetworkStatus = function() {
    return Titanium.Network.networkType === Titanium.Network.NETWORK_NONE ? 0 : 1;
};

exports.getNetworkStatus = getNetworkStatus;