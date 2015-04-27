//
//  Utils.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/24/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface Utils : NSObject
+ (NSString *)encodeToBase64String:(UIImage *)image;
+ (UIImage *)decodeFromBase64:(NSString *)strEncodeData;
@end