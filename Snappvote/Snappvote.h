//
//  Snappvote.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/23/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@interface Snappvote : NSObject
@property (nonatomic, assign) NSInteger id;
@property (nonatomic, assign) NSInteger authorId;
@property (nonatomic, strong) NSString *title;
@property (nonatomic, assign) BOOL isSingle;
@property (nonatomic, strong) UIImage *image1;
@property (nonatomic, strong) UIImage *image2;
@property (nonatomic, strong) NSString *answer1;
@property (nonatomic, strong) NSString *answer2;
@property (nonatomic, strong) NSDate *expireDate;

@end
