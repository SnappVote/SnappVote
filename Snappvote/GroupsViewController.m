//
//  GroupsViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/27/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "GroupsViewController.h"
#import "ContactsTabViewController.h"
#import "AFHTTPRequestOperationManager.h"
#import "GroupsTableCell.h"
#import "OfferBidsUITableViewCell.h"
#import "Group.h"
@interface GroupsViewController ()

@end

@implementation GroupsViewController{
    NSArray *data;
    NSMutableSet* contactsIds;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    NSLog(@"Groups");
   
    contactsIds = [[NSMutableSet alloc] init];
    NSMutableArray* responseData = [[NSMutableArray alloc] init];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    [manager GET:@"http://localhost/api/v1/users/1/groups" parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        for (NSDictionary *dictionary in responseObject) {
            NSNumber *identifier = dictionary[@"id"];
            NSNumber *userId = dictionary[@"user_id"];
            NSString* name = dictionary[@"name"];
            Group* group = [[Group alloc] init];
            group.id = [identifier integerValue];
            group.userId = [userId integerValue];
            group.name = name;
            [responseData addObject:group];
        }
        data = [NSArray arrayWithArray:responseData];
        [self.tableView reloadData];

    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
}
-(void)test{
    NSLog(@"TESTING");
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

    static NSString *simpleTableIdentifier = @"GroupsTableCell";
    
    GroupsTableCell *cell = (GroupsTableCell *)[tableView dequeueReusableCellWithIdentifier:simpleTableIdentifier];
    if (cell == nil)
    {
        NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"GroupsTableCell" owner:nil options:nil];
        for (id eachObject in nib) {
            if ([eachObject isKindOfClass:[UITableViewCell class]]) {
                cell = eachObject;
                break;
            }
        }
    }
    
    Group* group =[data objectAtIndex:indexPath.row];
    cell.labelName.text = group.name;

    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    Group* group =[data objectAtIndex:indexPath.row];
    NSInteger groupId = group.id;
    NSString* baseUrl =@"http://localhost/api/v1";
    NSString* url = [NSString stringWithFormat:@"%@/groups/%ld/users", baseUrl, groupId];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        for (NSDictionary *dictionary in responseObject) {
            NSNumber *identifier = dictionary[@"id"];
            [contactsIds addObject:identifier];
        }
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
}


-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 44;
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
