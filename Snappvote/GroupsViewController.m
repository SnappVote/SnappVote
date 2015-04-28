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

@interface GroupsViewController ()

@end

@implementation GroupsViewController{
    NSArray *data;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    NSLog(@"groups");
    NSLog(self.snappvote.title);
    data = [[NSArray alloc] init];
    NSMutableArray* responseData = [[NSMutableArray alloc] init];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    [manager GET:@"http://localhost/api/v1/users/1/groups" parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        NSDictionary *jsonDict = (NSDictionary *) responseObject;
        for (NSDictionary *dictionary in responseObject) {
            NSNumber *identifier = dictionary[@"id"];
            NSString* name = dictionary[@"name"];
            [responseData addObject:name];
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
    return 2;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    // Return the number of rows in the section.
    return [data count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *simpleTableIdentifier = @"SimpleTableItem";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:simpleTableIdentifier];
    
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:simpleTableIdentifier];
    }
    
    cell.textLabel.text = [data objectAtIndex:indexPath.row];
    return cell;
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
