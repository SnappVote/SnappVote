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

+ (UIImage *)decodeFromBase64:(NSString *)strEncodeData {
    NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
    return [UIImage imageWithData:data];
}
@end
