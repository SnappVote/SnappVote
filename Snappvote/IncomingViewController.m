//
//  IncomingViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/29/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "IncomingViewController.h"
#import "AFHTTPRequestOperationManager.h"
#import "Utils.h"
#import "UserUtils.h"
#import "Snappvote.h"
#import "SVModelParser.h"
#import "IncomingTableCell.h"
#import "NewSnappvoteViewController.h"
#import "VotingViewController.h"

@interface IncomingViewController ()

@end

@implementation IncomingViewController{
    NSArray *data;
    NSMutableArray *usernames;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self initNavItems];

    usernames = [[NSMutableArray alloc] init];
    NSString* url = [NSString stringWithFormat:@"%@/snappvotes/in/%i", [Utils getBaseUrl], [UserUtils getUserId]];
    SVModelParser* parser = [[SVModelParser alloc] init];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        for (NSDictionary *dictionary in responseObject) {
            [usernames addObject:dictionary[@"author_username"]];
        }
        data = [parser parseSnappvotes:responseObject];
        [self.tableView reloadData];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [data count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    NSString* cellIdentifier = @"IncomingTableCell";
    
    IncomingTableCell *cell = (IncomingTableCell *)[tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:cellIdentifier owner:nil options:nil];
        for (id eachObject in nib) {
            if ([eachObject isKindOfClass:[UITableViewCell class]]) {
                cell = eachObject;
                break;
            }
        }
    }
    
    Snappvote* snappvote = [data objectAtIndex:indexPath.row];
    cell.labelTitle.text = snappvote.title;
    cell.labelUsername.text = [usernames objectAtIndex:indexPath.row];
    cell.labelExpireDate.text = [Utils getFriendlyDateString:snappvote.expireDate];
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    Snappvote *snappvote = [data objectAtIndex:indexPath.row];
    
    VotingViewController *controller = [self.storyboard instantiateViewControllerWithIdentifier:@"VotingViewController"];
    
    controller.snappvote = snappvote;
    [self.navigationController pushViewController:controller animated:YES];
}


-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 100;
}

-(void) initNavItems{
    UIBarButtonItem *okButton = [[UIBarButtonItem alloc] initWithTitle:@"OK" style:UIBarButtonItemStylePlain target:self action:@selector(okTapped)];
    self.parentViewController.navigationItem.rightBarButtonItem = okButton;
}
-(void)okTapped{
    NewSnappvoteViewController *vc2 = [[self storyboard] instantiateViewControllerWithIdentifier:@"NewSnappvoteViewController"];
    [self.navigationController pushViewController:vc2 animated:YES];
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
