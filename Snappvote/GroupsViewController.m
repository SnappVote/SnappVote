//
//  GroupsViewController.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/27/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "GroupsViewController.h"
#import "AFHTTPRequestOperationManager.h"
#import "Utils.h"
#import "UserUtils.h"
#import "Group.h"
#import "SVModelParser.h"
#import "GroupsTableCell.h"

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
    [self fetchGroups];
    
}
-(void)fetchGroups{
    NSString* url = [NSString stringWithFormat:@"%@/users/%i/groups", [Utils getBaseUrl], [UserUtils getUserId]];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    SVModelParser* parser = [[SVModelParser alloc] init];

    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        data = [parser parseGroups:responseObject];
        [self.tableView reloadData];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
    
}
-(void)okTapped{
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    NSString* url = [NSString stringWithFormat:@"%@/snappvotes/out/%i", [Utils getBaseUrl],[UserUtils getUserId]];
    NSDictionary *parameters = @{@"title": self.snappvote.title,
                                 @"img_1": @"test",
                                 @"img_2" :@"test",
                                 @"answer_1": self.snappvote.answer1,
                                 @"answer_2" : self.snappvote.answer2,
                                 @"expire_date": self.snappvote.expireDate};
    
    [manager POST:url parameters:parameters
          success:^(AFHTTPRequestOperation *operation, id responseObject) {
              for (NSNumber* contactId in contactsIds) {
                  NSNumber* snapvoteId = responseObject[@"id"];
                  NSDictionary *parameters = @{@"voter_id": contactId,
                                               @"answer_id": [NSNumber numberWithInt:-1]};
                  NSString* url = [NSString stringWithFormat:@"%@/snappvotes/answers/%ld", [Utils getBaseUrl], [snapvoteId integerValue]];
                  [manager POST:url parameters:parameters
                        success:^(AFHTTPRequestOperation *operation, id responseObject) {
                            NSLog(@"JSON: %@", responseObject);
                        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                            NSLog(@"%@",[error localizedDescription]);
                        }];
              }
              NSLog(@"JSON: %@", responseObject);
          } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
              NSLog(@"%@",[error localizedDescription]);
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
    
    cell.switchSelectGroup.tag = indexPath.row;
    [cell.switchSelectGroup addTarget:self action:@selector(switchClicked:) forControlEvents:UIControlEventTouchUpInside];

    Group* group =[data objectAtIndex:indexPath.row];
    cell.labelName.text = group.name;
    
    return cell;
}

-(void)switchClicked:(UISwitch*)sender
{
    if(!sender.isOn){
    Group* group =[data objectAtIndex:sender.tag];
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
    else{
        Group* group =[data objectAtIndex:sender.tag];
        NSInteger groupId = group.id;
        NSString* url = [NSString stringWithFormat:@"%@/groups/%ld/users", [Utils getBaseUrl], groupId];
        AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
        [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
            for (NSDictionary *dictionary in responseObject) {
                NSNumber *identifier = dictionary[@"id"];
                [contactsIds removeObject:identifier];
            }
            
        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
            NSLog(@"Error: %@", error);
        }];
    }
    NSLog(@"%ld", [contactsIds count]);
   // for(NSNumber* number in contactsIds) {
   //     NSLog(@"%ld", [number integerValue]);
    //}
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
   
}


-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 44;
}
- (IBAction)addGroupTapped:(id)sender {
    UIAlertView * alert = [[UIAlertView alloc] initWithTitle:@"New group" message:@"Group name" delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil];
    alert.alertViewStyle = UIAlertViewStylePlainTextInput;
    [alert show];
}
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex{
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    NSString* url = [NSString stringWithFormat:@"%@/groups/%i",[Utils getBaseUrl], [UserUtils getUserId]];
    NSDictionary *parameters = @{@"name": [[alertView textFieldAtIndex:0] text]};
    
    [manager POST:url parameters:parameters
          success:^(AFHTTPRequestOperation *operation, id responseObject) {
              [self fetchGroups];
              NSLog(@"JSON: %@", responseObject);
          } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
              NSLog(@"%@",[error localizedDescription]);
          }];
    
    NSLog(@"Entered: %@",[[alertView textFieldAtIndex:0] text]);
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
