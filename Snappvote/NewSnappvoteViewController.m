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
#import "VSDropdown.h"

@interface NewSnappvoteViewController ()<VSDropdownDelegate>
@property (weak, nonatomic) IBOutlet UITextField *editTextTitle;
@property (weak, nonatomic) IBOutlet UIImageView *img1ImageView;
@property (weak, nonatomic) IBOutlet UIDatePicker *expireDatePicker;
@property (weak, nonatomic) IBOutlet UIButton *answer1Button;
@property (weak, nonatomic) IBOutlet UIPickerView *picker;
@property (weak, nonatomic) IBOutlet UIButton *answer2Button;
@property (weak, nonatomic) IBOutlet UIButton *hiddenButton;
@end

@implementation NewSnappvoteViewController{
    NSString* answer1;
    NSString* answer2;
    NSArray *_pickerData;
    VSDropdown *_dropdown;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initNavItems];
    _dropdown = [[VSDropdown alloc]initWithDelegate:self];
    [_dropdown setAdoptParentTheme:NO];
    [_dropdown setShouldSortItems:NO];
    [self.answer1Button.layer setCornerRadius:1.0];
    [self.answer1Button.layer setBorderWidth:1.0];
    [self.answer1Button.layer setBorderColor:[self.answer1Button.titleLabel.textColor CGColor]];
    [_dropdown setupDropdownForView:self.answer1Button];
    
   
    self.navigationItem.titleView = [Utils getTitleViewWithSubtitle:@"New"];
    
    // Do any additional setup after loading the view.
}

#pragma mark -
#pragma mark - VSDropdown Delegate methods.
- (void)dropdown:(VSDropdown *)dropDown didChangeSelectionForValue:(NSString *)str atIndex:(NSUInteger)index selected:(BOOL)selected
{
    UIButton *btn = (UIButton *)dropDown.dropDownView;
    NSString *allSelectedItems = [dropDown.selectedItems componentsJoinedByString:@";"];
    [btn setTitle:allSelectedItems forState:UIControlStateNormal];
    
}

- (UIColor *)outlineColorForDropdown:(VSDropdown *)dropdown
{
    UIButton *btn = (UIButton *)dropdown.dropDownView;
    
    return btn.titleLabel.textColor;
    
}

- (CGFloat)outlineWidthForDropdown:(VSDropdown *)dropdown
{
    return 0.0;
}

- (CGFloat)cornerRadiusForDropdown:(VSDropdown *)dropdown
{
    return 0.0;
}

- (CGFloat)offsetForDropdown:(VSDropdown *)dropdown
{
    return -0.0;
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
    
    _pickerData = @[ @[@"1", @"2", @"3", @"4", @"5"],
                     @[@"1", @"2", @"3", @"4", @"5", @"6", @"7"],
                     @[@"5", @"10", @"15", @"20", @"25", @"30"] ];
    
    
    self.picker.dataSource = self;
    self.picker.delegate = self;
    NSInteger height = 162;
    
    self.picker.bounds = CGRectMake(self.picker.frame.origin.x, self.picker.frame.origin.x,
                                    self.picker.frame.size.width, height);
}


-(void)switchClicked:(UIButton*)sender
{
    UIButton *button = [UIButton buttonWithType:UIButtonTypeRoundedRect];
  
    [button setTitle:@"Show View" forState:UIControlStateNormal];
    [button setHidden:YES];
    button.frame = CGRectMake(sender.frame.origin.x + sender.frame.size.width, sender.frame.origin.y + sender.frame.size.height, 160.0, 40.0);
    [self.view addSubview:button];
        [self showDropDownForButton:button adContents:@[@"answer1",@"long answer", @"longer answer",] multipleSelection:NO];
   // answer1 = [self.answer1Button titleForState:UIControlStateNormal];
   // answer2 = [self.answer2Button titleForState:UIControlStateNormal];
   // [self.answer1Button setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
   // [self.answer2Button setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
}
-(void)showDropDownForButton:(UIButton *)sender adContents:(NSArray *)contents multipleSelection:(BOOL)multipleSelection
{
    [_dropdown setDrodownAnimation:rand()%2];
    
    [_dropdown setAllowMultipleSelection:multipleSelection];
    [_dropdown setupDropdownForView:sender];
    [_dropdown setupDropdownForView:sender direction:(VSDropdownDirection_Up) withTopColor:[UIColor blueColor] bottomColor:[UIColor blueColor]scale:1];
    [_dropdown setSeparatorColor:sender.titleLabel.textColor];
    
    if (_dropdown.allowMultipleSelection)
    {
        [_dropdown reloadDropdownWithContents:contents andSelectedItems:[sender.titleLabel.text componentsSeparatedByString:@";"]];
        
    }
    else
    {
        [_dropdown reloadDropdownWithContents:contents andSelectedItems:@[sender.titleLabel.text]];
        
    }
    
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
// The number of columns of data
- (int)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    return 3;
}
// The number of rows of data
- (int)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
    return ((NSArray*)_pickerData[component]).count;;
}
- (CGFloat)pickerView:(UIPickerView *)pickerView rowHeightForComponent:(NSInteger)component
{
    return (50.0);
}
// The data to return for the row and component (column) that's being passed in
// The data to return for the row and component (column) that's being passed in
- (NSString*)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    return _pickerData[component][row];
}
@end
