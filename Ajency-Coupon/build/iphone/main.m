//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"test";
NSString * const TI_APPLICATION_ID = @"com.ajency.tuckshopapp";
NSString * const TI_APPLICATION_PUBLISHER = @"Ajency.in";
NSString * const TI_APPLICATION_URL = @"http://www.ajency.in";
NSString * const TI_APPLICATION_NAME = @"TuckShop";
NSString * const TI_APPLICATION_VERSION = @"4.0";
NSString * const TI_APPLICATION_DESCRIPTION = @"Ajency.in";
NSString * const TI_APPLICATION_COPYRIGHT = @"2014 by Ajency.in";
NSString * const TI_APPLICATION_GUID = @"4e7e0023-7da3-471c-ae50-6befe141f7ba";
BOOL const TI_APPLICATION_ANALYTICS = true;
NSString * const TI_APPLICATION_BUILD_TYPE = @"";

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
