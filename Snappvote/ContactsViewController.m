//
//  ContactsViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/28/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "ContactsViewController.h"
#import "Utils.h"
@interface ContactsViewController ()

@end

@implementation ContactsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    UIImage* icon = [Utils imageWithImage:[UIImage imageNamed:@"okTapped.png"] scaledToSize:CGSizeMake(35, 35)];
    UIBarButtonItem * rightBarButton = [[UIBarButtonItem alloc] initWithImage:icon style:UIBarButtonItemStylePlain target:self action:@selector(okTapped)];
    
    self.parentViewController.navigationItem.rightBarButtonItem = rightBarButton;    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(void)viewWillAppear:(BOOL)animated{
    self.tabBarController.navigationItem.titleView = [Utils getTitleViewWithSubtitle:@"Contacts"];
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
