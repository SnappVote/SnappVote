//
//  Utils.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/24/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "Utils.h"

@implementation Utils

+ (NSString *)encodeToBase64String:(UIImage *)image {
    return [UIImagePNGRepresentation(image) base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
}
+(NSString*)getBaseUrl{
    return @"http://localhost/api/v1";
}
+ (UIImage *)decodeFromBase64:(NSString *)strEncodeData {
    NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
    return [UIImage imageWithData:data];
}
+(NSString*)getFriendlyDateString:(NSDate *)date{
    NSDateFormatter *dateformate=[[NSDateFormatter alloc]init];
    [dateformate setDateFormat:@"yyyy-MM-dd HH:mm:ss zzz"]; // Date formater
    NSString *dateStr = [dateformate stringFromDate:[NSDate date]];
    return dateStr;
}
@end
