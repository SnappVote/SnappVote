//
//  LoginViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/21/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "LoginViewController.h"
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <FBSDKCoreKit/FBSDKAccessToken.h>
@interface LoginViewController ()

@end

@implementation LoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    FBSDKLoginButton *loginButton = [[FBSDKLoginButton alloc] init];
    [self.view addSubview:loginButton];
    loginButton.center = CGPointMake(220.0, 380.0);// for bottomright
    [loginButton addTarget:self action:@selector(loginClicked) forControlEvents:UIControlEventTouchUpInside];
    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)asda:(id)sender {
    if ([FBSDKAccessToken currentAccessToken]) {
        NSLog(@"user logged in");
        // User is logged in, do work such as go to next view controller.
    }
    else{
        NSLog(@"sad");
    }
}

-(void)loginClicked{
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
