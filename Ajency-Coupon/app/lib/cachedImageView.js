/*
Expects parameters of the directory name you wish to save it under, the url of the remote image,
 and the Image View Object its being assigned to. */
 var Q = require('/q');
 
 var cachedImageView = function(imageDirectoryName, url) {
 	
 	 var deferred = Q.defer();
    // Grab the filename
    Ti.API.info('Started');
    var filename = url.split('/');
    filename = filename[filename.length - 1];
    // Try and get the file that has been previously cached
    var file= Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
 
    if (file.exists()) {
        // If it has been cached, assign the local asset path to the image view object.
    //    imageViewObject.image = file.nativePath;
         localPath=file.nativePath;
    } else {
        // If it hasn't been cached, grab the directory it will be stored in.
        var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
        if (!g.exists()) {
            // If the directory doesn't exist, make it
            g.createDirectory();
        };
 
        // Create the HTTP client to download the asset.
        var xhr = Ti.Network.createHTTPClient();
        xhr.setTimeout(15e3);
        xhr.onload = function() {
            if (xhr.status == 200) {
                // On successful load, take that image file we tried to grab before and
                // save the remote image data to it.
                file.write(xhr.responseData);
                // Assign the local asset path to the image view object.
             //   imageViewObject.image = file.nativePath;
             Ti.API.info('file path');
         //    localPath=file.nativePath;
             Ti.API.info(file.nativePath);
             var result= {
              'response' : file.nativePath
             };
              deferred.resolve(result);
            };
        };
 
        // Issuing a GET request to the remote URL
        xhr.open('GET', url);
        // Finally, sending the request out.
        xhr.send();
    };
};

exports.cachedImageView=cachedImageView;