//
//  OutgoingViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/30/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "OutgoingViewController.h"
#import "OutgoingTableCell.h"
#import "AFHTTPRequestOperationManager.h"
#import "Utils.h"
#import "Snappvote.h"
#import "SVModelParser.h"
#import "VotingViewController.h"
@interface OutgoingViewController ()

@end

@implementation OutgoingViewController{
    NSArray *data;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString* url = [NSString stringWithFormat:@"%@/snappvotes/out/1", [Utils getBaseUrl]];
    SVModelParser* parser = [[SVModelParser alloc] init];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        data = [parser parseSnappvotes:responseObject];
        [self.tableView reloadData];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [data count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    static NSString *simpleTableIdentifier = @"OutgoingTableCell";
    
    OutgoingTableCell *cell = (OutgoingTableCell *)[tableView dequeueReusableCellWithIdentifier:simpleTableIdentifier];
    if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"OutgoingTableCell" owner:nil options:nil];
        for (id eachObject in nib) {
            if ([eachObject isKindOfClass:[UITableViewCell class]]) {
                cell = eachObject;
                break;
            }
        }
    }
    Snappvote* snappvote = [data objectAtIndex:indexPath.row];
    cell.labelTitle.text = snappvote.title;
    cell.labelAnswer1.text = snappvote.answer1;
    cell.labelAnswer2.text = snappvote.answer2;
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    Snappvote *snappvote = [data objectAtIndex:indexPath.row];
    
    VotingViewController *controller = [self.storyboard instantiateViewControllerWithIdentifier:@"VotingViewController"];
    
    // Pass data to controller
    controller.snappvote = snappvote;
    [self.navigationController pushViewController:controller animated:YES];
}


-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 100;
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
