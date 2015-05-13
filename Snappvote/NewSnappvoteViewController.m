//
//  NewSnappvoteViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/27/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "NewSnappvoteViewController.h"
#import "Utils.h"
#import "UserUtils.h"
#import "Snappvote.h"
#import "ContactsTabViewController.h"

@interface NewSnappvoteViewController ()
@property (weak, nonatomic) IBOutlet UITextField *editTextTitle;
@property (weak, nonatomic) IBOutlet UIImageView *img1ImageView;
@property (weak, nonatomic) IBOutlet UIDatePicker *expireDatePicker;
@property (weak, nonatomic) IBOutlet UIButton *answer1Button;
@property (weak, nonatomic) IBOutlet UIButton *answer2Button;
@end

@implementation NewSnappvoteViewController{
    NSString* answer1;
    NSString* answer2;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initNavItems];
    self.navigationItem.titleView = [Utils getTitleViewWithSubtitle:@"New"];
    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)initNavItems{

    
    UIImage* icon = [Utils imageWithImage:[UIImage imageNamed:@"okIcon.png"] scaledToSize:CGSizeMake(35, 35)];
    UIBarButtonItem * rightBarButton = [[UIBarButtonItem alloc] initWithImage:icon style:UIBarButtonItemStylePlain target:self action:@selector(goToContacts)];
    
    self.navigationItem.rightBarButtonItem = rightBarButton;
    
    [self.answer1Button setTitle: @"Yes" forState: UIControlStateNormal];
    [self.answer2Button setTitle: @"No" forState: UIControlStateNormal];
    [self.answer1Button addTarget:self action:@selector(switchClicked:) forControlEvents:UIControlEventTouchUpInside];
    [self.answer2Button addTarget:self action:@selector(switchClicked:) forControlEvents:UIControlEventTouchUpInside];
}


-(void)switchClicked:(UIButton*)sender
{
    answer1 = [self.answer1Button titleForState:UIControlStateNormal];
    answer2 = [self.answer2Button titleForState:UIControlStateNormal];
    [self.answer1Button setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
    [self.answer2Button setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
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
    snappvote.answer1 = answer1;
    snappvote.answer2= answer2;
    snappvote.expireDate = self.expireDatePicker.date;
    NSString *className = NSStringFromClass([snappvote.expireDate class]);
    NSLog(@"%@", className);
    if ([[segue identifier] isEqualToString:@"toContacts"])
    {
        ContactsTabViewController *vc = [segue destinationViewController];
        vc.snappvote = snappvote;
    }
}

@end
