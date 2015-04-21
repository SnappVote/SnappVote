//
//  RegisterViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/20/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "RegisterViewController.h"
#import "AFHTTPRequestOperationManager.h"
#import <FBSDKCoreKit/FBSDKAccessToken.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
@interface RegisterViewController ()
@property (weak, nonatomic) IBOutlet UITextField *name;
@property (weak, nonatomic) IBOutlet UITextField *email;
@property (weak, nonatomic) IBOutlet UITextField *phone;
@property (weak, nonatomic) IBOutlet UITextField *country;

@end

@implementation RegisterViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    if ([FBSDKAccessToken currentAccessToken]) {
        NSLog(@"user logged in");
        // User is logged in, do work such as go to next view controller.
    }
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/
- (IBAction)test:(id)sender {
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    NSDictionary *parameters = @{@"email": @"bar", @"phone" :@"ASD", @"country" :@"asdf"};
    [manager POST:@"http://localhost/api/v1/users" parameters:parameters success:^(AFHTTPRequestOperation *operation, id responseObject) {
        NSLog(@"JSON: %@", responseObject);
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
}

@end
