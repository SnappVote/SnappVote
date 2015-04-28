//
//  GroupsTableCell.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/28/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface GroupsTableCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *labelName;
@property (weak, nonatomic) IBOutlet UILabel *labelName2;
@property (weak, nonatomic) IBOutlet UISwitch *switchSelectGroup;

@end
