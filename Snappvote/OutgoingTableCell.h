//
//  OutgoingTableCell.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/30/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface OutgoingTableCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *labelTitle;
@property (weak, nonatomic) IBOutlet UILabel *labelAnswer1;
@property (weak, nonatomic) IBOutlet UILabel *labelAnswer2;
@property (weak, nonatomic) IBOutlet UILabel *labelAnswer1Count;
@property (weak, nonatomic) IBOutlet UILabel *labelAnswer2Count;
@property (weak, nonatomic) IBOutlet UILabel *labelTimeRemaining;
@end
