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
    //FBSDKLoginButton *loginButton = [[FBSDKLoginButton alloc] init];
    //loginButton.readPermissions = @[@"public_profile", @"email", @"user_friends"];
    //[self.view addSubview:loginButton];
    //loginButton.center = CGPointMake(220.0, 380.0);
    NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
    NSLog(@"Bool value: %d",[defaults boolForKey:@"registered"]);
}

- (IBAction)test:(id)sender {
    [self performSegueWithIdentifier:@"ToHome" sender:self];

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}


- (void)loginButton:	(FBSDKLoginButton *)loginButton
didCompleteWithResult:	(FBSDKLoginManagerLoginResult *)result
              error:	(NSError *)error{
    NSLog(@"user logged in");

}
- (void) loginButtonDidLogOut:(FBSDKLoginButton *)loginButton{
    NSLog(@"user logged out");
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
