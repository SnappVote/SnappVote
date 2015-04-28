//
//  Group.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/28/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Group : NSObject
@property (nonatomic, assign) NSInteger id;
@property (nonatomic, assign) NSInteger userId;
@property (nonatomic, strong) NSString *name;
@end
