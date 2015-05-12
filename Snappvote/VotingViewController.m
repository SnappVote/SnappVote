//
//  VotingViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 5/4/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "VotingViewController.h"
#import "AFHTTPRequestOperationManager.h"
#import "Utils.h"
#import "UserUtils.h"
#import "IncomingViewController.h"
#import "HomeTabBarController.h"

@interface VotingViewController ()
@property (weak, nonatomic) IBOutlet UILabel *labelTitle;
@property (weak, nonatomic) IBOutlet UIButton *btnAnswer1;
@property (weak, nonatomic) IBOutlet UIButton *btnAnswer2;

@end

@implementation VotingViewController{
    int answerIndex;
    NSString* answer1;
    NSString* answer2;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    answerIndex = -1;
    [self.btnAnswer1 setTitle:self.snappvote.answer1 forState:UIControlStateNormal];
    [self.btnAnswer2 setTitle:self.snappvote.answer2 forState:UIControlStateNormal];

    [self.labelTitle setText:self.snappvote.title];
    self.navigationItem.titleView = [Utils getTitleViewWithSubtitle:@"Vote"];

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}
- (IBAction)answer1Tapped:(id)sender {
    answerIndex = 0;
}
- (IBAction)answer2Tapped:(id)sender {
    answerIndex = 1;
}
- (IBAction)confirmTapped:(id)sender {
    if(answerIndex == -1){
        [Utils showAlert:@"Error" withMessage:@"Answer not selected"];
    }
    else{
        AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
        NSString* url =[NSString stringWithFormat:@"%@/snappvotes/answers/%ld",[Utils getBaseUrl], self.snappvote.id];
        NSDictionary *parameters = @{@"voter_id":  [NSNumber numberWithInt:[UserUtils getUserId]],
                                     @"answer_id": [NSNumber numberWithInt:answerIndex]};
        
        [manager PUT:url parameters:parameters
             success:^(AFHTTPRequestOperation *operation, id responseObject) {
                 HomeTabBarController *newView = [self.storyboard instantiateViewControllerWithIdentifier:@"HomeTabBarController"];
                 [self.navigationController pushViewController:newView animated:YES];
             } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                 [Utils showAlert:@"Error" withMessage:@"Could not connect to server"];
                     NSLog(@"%@",[error localizedDescription]);
                 }];
    }
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

@end
