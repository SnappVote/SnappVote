//
//  IncomingViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/29/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "IncomingViewController.h"
#import "NewSnappvoteViewController.h"

@interface IncomingViewController ()

@end

@implementation IncomingViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    UIBarButtonItem *anotherButton = [[UIBarButtonItem alloc] initWithTitle:@"OK" style:UIBarButtonItemStylePlain target:self action:@selector(okTapped)];
    self.parentViewController.navigationItem.rightBarButtonItem = anotherButton;
    // Do any additional setup after loading the view.
}

-(void)okTapped{
    NewSnappvoteViewController *vc2 = [[self storyboard] instantiateViewControllerWithIdentifier:@"NewSnappvoteViewController"];

    
    [[self navigationController] pushViewController:vc2 animated:YES];
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

@end
