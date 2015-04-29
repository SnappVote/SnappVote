//
//  NewSnappvoteViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/27/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "NewSnappvoteViewController.h"
#import "ContactsTabViewController.h"
#import "Snappvote.h"
#import "UserUtils.h"
@interface NewSnappvoteViewController ()
@property (weak, nonatomic) IBOutlet UITextField *wtf;
@property (weak, nonatomic) IBOutlet UIImageView *img1ImageView;
@property (weak, nonatomic) IBOutlet UIDatePicker *expireDatePicker;

@end

@implementation NewSnappvoteViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    UIBarButtonItem *anotherButton = [[UIBarButtonItem alloc] initWithTitle:@"OK" style:UIBarButtonItemStylePlain target:self action:@selector(goToContacts)];
    self.navigationItem.rightBarButtonItem = anotherButton;
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(void)goToContacts{
    [self performSegueWithIdentifier:@"toContacts" sender:self];
}
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    Snappvote* snappvote = [[Snappvote alloc] init];
    
    snappvote.title = @"TITLE";
    
        // Make sure your segue name in storyboard is the same as this line
    if ([[segue identifier] isEqualToString:@"toContacts"])
    {
        // Get reference to the destination view controller
        ContactsTabViewController *vc = [segue destinationViewController];
        vc.snappvote = snappvote;
        // Pass any objects to the view controller here, like...
        
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
