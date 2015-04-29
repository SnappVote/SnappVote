//
//  ContactsTabViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/27/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "ContactsTabViewController.h"
#import "GroupsViewController.h"
@interface ContactsTabViewController ()

@end

@implementation ContactsTabViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setDelegate:self];
    NSLog(@"Tab Controller");
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (BOOL)tabBarController:(UITabBarController *)tbController shouldSelectViewController:(UIViewController *)viewController
{
    if (viewController == [tbController.viewControllers objectAtIndex:0] )
    {
        NSLog(@"Contacts");
    }
    if (viewController == [tbController.viewControllers objectAtIndex:1] )
    {
        ((GroupsViewController*)viewController).snappvote = self.snappvote;
        NSLog(@"Groups");
    }
    return YES;
}/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
