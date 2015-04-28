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
}

- (void)viewDidLoad {
    [super viewDidLoad];
    NSLog(@"Groups");
    NSLog(self.snappvote.title);
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

    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    // Return the number of sections.
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    // Return the number of rows in the section.
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
