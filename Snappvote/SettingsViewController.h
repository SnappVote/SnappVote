//
//  SettingsViewController.h
//  Snappvote
//
//  Created by Martin Dzhonov on 5/12/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SettingsViewController : UIViewController <UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UITableView *rearTableView;

@end
