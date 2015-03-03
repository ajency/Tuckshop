var Q = require("/q");

var cachedImageView = function(imageDirectoryName, url) {
    var deferred = Q.defer();
    Ti.API.info("Started");
    var filename = url.split("/");
    filename = filename[filename.length - 1];
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
    if (file.exists()) localPath = file.nativePath; else {
        var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
        g.exists() || g.createDirectory();
        var xhr = Ti.Network.createHTTPClient();
        xhr.setTimeout(15e3);
        xhr.onload = function() {
            if (200 == xhr.status) {
                file.write(xhr.responseData);
                Ti.API.info("file path");
                Ti.API.info(file.nativePath);
                var result = {
                    response: file.nativePath
                };
                deferred.resolve(result);
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }
};

exports.cachedImageView = cachedImageView;