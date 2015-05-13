//
//  UserUtils.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/23/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface UserUtils : NSObject
+(void)createUser: (NSString*)username phone:(NSString*)phone email:(NSString*)email country:(NSString*)country;
+(int)getUserId;
+(BOOL)userExists;
@end
