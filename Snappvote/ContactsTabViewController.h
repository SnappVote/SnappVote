//
//  ContactsTabViewController.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/27/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Snappvote.h"
@interface ContactsTabViewController : UITabBarController<UITabBarControllerDelegate>
@property(strong, nonatomic) Snappvote *snappvote;
@end
