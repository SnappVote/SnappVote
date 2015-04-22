//
//  ContactInfoViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/21/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "ContactInfoViewController.h"
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <FBSDKCoreKit/FBSDKAccessToken.h>

@interface ContactInfoViewController ()
@property (weak, nonatomic) IBOutlet UITextField *email;
@property (weak, nonatomic) IBOutlet UITextField *phone;

@end

@implementation ContactInfoViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)okTapped:(id)sender {
    if ([FBSDKAccessToken currentAccessToken]) {
        NSLog(@"user logged in");
        // User is logged in, do work such as go to next view controller.
    }
    else{
        NSLog(@"sad");
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
