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
    NSMutableArray* usernames;
    NSMutableArray* asd;
    NSMutableArray *isExpanded;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    usernames = [[NSMutableArray alloc] init];
    asd = [[NSMutableArray alloc] init];
    isExpanded = [[NSMutableArray alloc] init];

    SVModelParser* parser = [[SVModelParser alloc] init];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    NSString* url = [NSString stringWithFormat:@"%@/snappvotes/out/%i", [Utils getBaseUrl], [UserUtils getUserId]];
    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        
        NSMutableArray* snappvotes = [[NSMutableArray alloc] init];
        
        for (NSDictionary *dictionary in responseObject) {
            Snappvote* snappvote = [parser parseSnappvote:dictionary];
            [snappvotes addObject:snappvote];
            [isExpanded addObject:[NSNumber numberWithBool:0]];
            
            NSString* url =[NSString stringWithFormat:@"%@/snappvotes/out/answers/%ld", [Utils getBaseUrl], snappvote.id];
            [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
                NSMutableArray* names = [[NSMutableArray alloc] init];
                NSMutableArray* answers = [[NSMutableArray alloc] init];
                for (NSDictionary *dictionary in responseObject) {
                    NSString *username = dictionary[@"username"];
                    NSNumber *answerId = dictionary[@"answer_id"];

                    [names addObject:username];
                    [answers addObject:answerId];
                }
                [usernames addObject:names];
                [asd addObject:answers];
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

-(void)viewWillAppear:(BOOL)animated{
    self.tabBarController.navigationItem.titleView = [Utils getTitleViewWithSubtitle:@"Outgoing"];
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
    NSArray* usersArr = [usernames objectAtIndex:indexPath.row];
    NSArray* answersArr = [asd objectAtIndex:indexPath.row];

    BOOL flag = [[isExpanded objectAtIndex:indexPath.row] boolValue];
    
    if(flag){
        [isExpanded replaceObjectAtIndex:indexPath.row withObject:@NO];
        for (int i = 0; i < usersArr.count; i++) {
            [[cell.contentView viewWithTag:10]removeFromSuperview] ;
            [[cell.contentView viewWithTag:11]removeFromSuperview] ;

        }
    }
    else{
        [isExpanded replaceObjectAtIndex:indexPath.row withObject:@YES];
        for (int i = 0; i < usersArr.count; i++) {
            CGRect frame = CGRectMake(0, 90 +(i*30), 160, 50);
            UILabel *usernameLabel = [[UILabel alloc] initWithFrame:frame];
            usernameLabel.text = [usersArr objectAtIndex:i];
            usernameLabel.tag = 10;
            [cell.contentView addSubview:usernameLabel];
            
            CGRect frame2 = CGRectMake(200, 90 +(i*30), 160, 50);

            UILabel *oherasda = [[UILabel alloc] initWithFrame:frame2];
            oherasda.text = [self getAnswerFromAnswerId:[answersArr objectAtIndex:i] snappvoteId:indexPath.row];// [usersArr objectAtIndex:i];
            oherasda.tag = 11;
            [cell.contentView addSubview:oherasda];
            
        }
    }
    
    [self.tableView endUpdates];
}


-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    BOOL flagValue = [[isExpanded objectAtIndex:indexPath.row] boolValue];
    if(flagValue)
    {
        NSArray* arr = [usernames objectAtIndex:indexPath.row];
        return  120 + (30* arr.count);
    }
    else{
        return 100;
    }
}

-(NSString*)getAnswerFromAnswerId:(NSNumber*)answerId snappvoteId:(NSInteger)snappvoteIndex{
    Snappvote* snappvote = [data objectAtIndex:snappvoteIndex];
    if([answerId isEqualToNumber:@0]){
        return snappvote.answer1;
    }
    if([answerId isEqualToNumber:@0]){
        return snappvote.answer2;
    }
    else {
        return @"PENDING";
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
