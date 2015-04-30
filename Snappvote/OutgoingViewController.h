//
//  OutgoingViewController.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/30/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface OutgoingViewController : UIViewController<UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UITableView *tableView;

@end
