//
//  LoginViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/23/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "LoginViewController.h"
#import "Utils.h"
#import "SWRevealViewController.h"
#import "UUDatePicker.h"

@interface LoginViewController (){
    NSArray *_pickerData;
    UIPickerView* pickerView;

}
@property (weak, nonatomic) IBOutlet UITextField *field;

@end

@implementation LoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.titleView = [Utils getTitleViewWithSubtitle:@"Login"];
    
    SWRevealViewController *revealViewController = self.revealViewController;

    if ( revealViewController )
    {
        [self.sidebarButton setTarget: self.revealViewController];
        [self.sidebarButton setAction: @selector( revealToggle: )];
        [self.view addGestureRecognizer:self.revealViewController.panGestureRecognizer];
    }
    
    _pickerData = @[ @[@"1", @"2", @"3", @"4", @"5"],
                     @[@"a", @"b", @"c", @"d", @"e", @"f"],
                     @[@"5", @"10", @"15", @"20", @"25"] ];
    
    
    self.picker.dataSource = self;
    self.picker.delegate = self;
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
    return (80.0);
}
// The data to return for the row and component (column) that's being passed in
// The data to return for the row and component (column) that's being passed in
- (NSString*)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    return _pickerData[component][row];
}
- (IBAction)testTapped:(id)sender {
    //UIAlertView * alert = [[UIAlertView alloc] initWithTitle:@"Alert" message:@"This is an example alert!" delegate:self cancelButtonTitle:@"Hide" otherButtonTitles:nil];
    //alert.alertViewStyle = UIAlertViewStylePlainTextInput;
    //[alert show];
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
