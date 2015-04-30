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
@interface OutgoingViewController ()

@end

@implementation OutgoingViewController{
    NSArray *data;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    NSMutableArray* responseData = [[NSMutableArray alloc] init];
    NSString* url = [NSString stringWithFormat:@"%@/snappvotes/out/1", [Utils getBaseUrl]];
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    [manager GET:url parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        for (NSDictionary *dictionary in responseObject) {
            NSNumber *identifier = dictionary[@"id"];
            NSNumber *author_id = dictionary[@"author_id"];
            NSString* answer1 = dictionary[@"answer_1"];
            NSString* answer2 = dictionary[@"answer_2"];
            NSDate* expireDate = dictionary[@"expire_date"];
            Snappvote* snappvote = [[Snappvote alloc] init];
            snappvote.id = [identifier integerValue];
            snappvote.authorId = [author_id integerValue];
            snappvote.answer1 = answer1;
            snappvote.answer2 = answer2;
            snappvote.expireDate = expireDate;
            [responseData addObject:snappvote];
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
    cell.labelTitle.text = snappvote.answer1;
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
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
