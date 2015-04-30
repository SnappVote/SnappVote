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
#import "Utils.h"
#import "UserUtils.h"
#import "SVModelParser.h"
@interface GroupsViewController ()

@end

@implementation GroupsViewController{
    NSArray *data;
    NSMutableSet* contactsIds;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    UIBarButtonItem *anotherButton = [[UIBarButtonItem alloc] initWithTitle:@"OK" style:UIBarButtonItemStylePlain target:self action:@selector(okTapped)];
    self.parentViewController.navigationItem.rightBarButtonItem = anotherButton;
    contactsIds = [[NSMutableSet alloc] init];
    SVModelParser* parser = [[SVModelParser alloc] init];
    NSString* url = [NSString stringWithFormat:@"%@/users/1/groups", [Utils getBaseUrl]];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        data = [parser parseGroups:responseObject];
        [self.tableView reloadData];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
}

-(void)okTapped{
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    NSString* url = [NSString stringWithFormat:@"%@/snappvotes/out/1", [Utils getBaseUrl]];
    NSDictionary *parameters = @{@"title": self.snappvote.title,
                                 @"img_1": @"test",
                                 @"img_2" :@"test",
                                 @"answer_1": self.snappvote.answer1,
                                 @"answer_2" : self.snappvote.answer2,
                                 @"expire_date": self.snappvote.expireDate};
    
    [manager POST:url parameters:parameters
          success:^(AFHTTPRequestOperation *operation, id responseObject) {
              NSLog(@"JSON: %@", responseObject);
          } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
              NSLog(@"%@",[error localizedDescription]);
          }];
    
    for (NSNumber* contactId in contactsIds) {
        NSDictionary *parameters = @{@"voter_id": contactId,
                                     @"answer_id": contactId};
        NSString* url = [NSString stringWithFormat:@"%@/snappvotes/answers/1", [Utils getBaseUrl]];
        [manager POST:url parameters:parameters
              success:^(AFHTTPRequestOperation *operation, id responseObject) {
                  NSLog(@"JSON: %@", responseObject);
              } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                  NSLog(@"%@",[error localizedDescription]);
              }];
    }
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
    NSString* url = [NSString stringWithFormat:@"%@/groups/%ld/users", [Utils getBaseUrl], groupId];
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
