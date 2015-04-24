//
//  User.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/23/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface User : NSObject
@property (nonatomic, assign) NSInteger id;
@property (nonatomic, strong) NSString *username;
@property (nonatomic, strong) NSString *email;
@property (nonatomic, strong) NSString *phone;
@property (nonatomic, strong) NSString *country;

@end
