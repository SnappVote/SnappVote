//
//  NewSnappvoteViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/27/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "NewSnappvoteViewController.h"
#import "UserUtils.h"
#import "Snappvote.h"
#import "ContactsTabViewController.h"

@interface NewSnappvoteViewController ()
@property (weak, nonatomic) IBOutlet UITextField *editTextTitle;
@property (weak, nonatomic) IBOutlet UIImageView *img1ImageView;
@property (weak, nonatomic) IBOutlet UIDatePicker *expireDatePicker;
@end

@implementation NewSnappvoteViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initNavItems];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)initNavItems{
    UIBarButtonItem *anotherButton = [[UIBarButtonItem alloc] initWithTitle:@"OK" style:UIBarButtonItemStylePlain target:self action:@selector(goToContacts)];
    self.navigationItem.rightBarButtonItem = anotherButton;
}

-(void)goToContacts{
    [self performSegueWithIdentifier:@"toContacts" sender:self];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    Snappvote* snappvote = [[Snappvote alloc] init];
    snappvote.title = self.editTextTitle.text;
    snappvote.authorId = [UserUtils getUserId];
    snappvote.isSingle = TRUE;
    snappvote.image1 = self.img1ImageView.image;
    snappvote.answer1 = @"YES";
    snappvote.answer2= @"NO";
    snappvote.expireDate = self.expireDatePicker.date;
    
    if ([[segue identifier] isEqualToString:@"toContacts"])
    {
        ContactsTabViewController *vc = [segue destinationViewController];
        vc.snappvote = snappvote;
    }
}

@end
