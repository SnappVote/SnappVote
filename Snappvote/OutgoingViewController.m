//
//  OutgoingViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/30/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "OutgoingViewController.h"
#import "AFHTTPRequestOperationManager.h"
#import "Utils.h"
#import "UserUtils.h"
#import "Snappvote.h"
#import "SVModelParser.h"
#import "OutgoingTableCell.h"
#import "VotingViewController.h"

@interface OutgoingViewController ()

@end

@implementation OutgoingViewController{
    NSArray *data;
    NSMutableArray* users;
    NSMutableArray *isExpanded;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    users = [[NSMutableArray alloc] init];
    isExpanded = [[NSMutableArray alloc] init];
    
    
    NSString* url = [NSString stringWithFormat:@"%@/snappvotes/out/%i", [Utils getBaseUrl], [UserUtils getUserId]];
    SVModelParser* parser = [[SVModelParser alloc] init];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        data = [parser parseSnappvotes:responseObject];
        NSMutableArray* snappvotes = [[NSMutableArray alloc] init];
        for (NSDictionary *dictionary in responseObject) {
            Snappvote* snappvote = [parser parseSnappvote:dictionary];
            [snappvotes addObject:snappvote];
            [isExpanded addObject:[NSNumber numberWithBool:0]];

            [manager GET:@"http://localhost/api/v1/snappvotes/out/answers/10" parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
                NSMutableArray* usernames = [[NSMutableArray alloc] init];
                for (NSDictionary *dictionary in responseObject) {
                    NSString *title = dictionary[@"username"];
                    [usernames addObject:title];
                }
                [users addObject:usernames];
            } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                NSLog(@"Error: %@", error);
            }];
        }
        
        data = [NSArray arrayWithArray:snappvotes];
       
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
    
    static NSString *cellIdentifier = @"OutgoingTableCell";
    
    OutgoingTableCell *cell = (OutgoingTableCell *)[tableView dequeueReusableCellWithIdentifier:cellIdentifier];
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
    cell.labelAnswer1.text = snappvote.answer1;
    cell.labelAnswer2.text = snappvote.answer2;
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [self.tableView beginUpdates];
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    NSArray* arr = [users objectAtIndex:indexPath.row];
    BOOL flag = [[isExpanded objectAtIndex:indexPath.row] boolValue];
    
    if(flag){
        [isExpanded replaceObjectAtIndex:indexPath.row withObject:@NO];
        for (int i = 0; i < arr.count; i++) {
            [[cell.contentView viewWithTag:10]removeFromSuperview] ;
            
        }
    }
    else{
        [isExpanded replaceObjectAtIndex:indexPath.row withObject:@YES];
        for (int i = 0; i < arr.count; i++) {
            CGRect frame = CGRectMake(0, 90 +(i*20), 160, 50);
            UILabel *label = [[UILabel alloc] initWithFrame:frame];
            label.text = [arr objectAtIndex:i];
            label.tag = 10;
            [cell.contentView addSubview:label];
        }
    }
    
    [self.tableView endUpdates];
}


-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    BOOL flagValue = [[isExpanded objectAtIndex:indexPath.row] boolValue];
    if(flagValue)
    {
        return  200;
    }
    else{
        return 100;
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
