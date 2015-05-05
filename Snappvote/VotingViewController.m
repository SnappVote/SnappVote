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

@interface VotingViewController ()
@property (weak, nonatomic) IBOutlet UILabel *labelTitle;
@property (weak, nonatomic) IBOutlet UIButton *btnAnswer1;
@property (weak, nonatomic) IBOutlet UIButton *btnAnswer2;

@end

@implementation VotingViewController{
    int answerIndex;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    answerIndex = -1;
    [self.labelTitle setText:self.snappvote.title];
    [self.btnAnswer1 setTitle: self.snappvote.answer1 forState: UIControlStateNormal];
    [self.btnAnswer2 setTitle: self.snappvote.answer2 forState: UIControlStateNormal];
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
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    NSString* url =@"http://localhost/api/v1/snappvotes/answers/9";// [NSString stringWithFormat:@"%@/snappvotes/%i/answers",[Utils getBaseUrl], 9];
    NSDictionary *parameters = @{@"voter_id": @2,
                                 @"answer_id": @1};
    
    [manager PUT:url parameters:parameters
          success:^(AFHTTPRequestOperation *operation, id responseObject) {
              NSLog(@"JSON: %@", responseObject);
          } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
              NSLog(@"%@",[error localizedDescription]);
          }];

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
