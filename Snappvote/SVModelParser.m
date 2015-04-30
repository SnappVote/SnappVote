//
//  SVModelParser.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/30/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "SVModelParser.h"

@implementation SVModelParser
-(NSArray*)parseGroups:(id)responseObject{
    NSMutableArray* groups = [[NSMutableArray alloc] init];
    for (NSDictionary *dictionary in responseObject) {
        NSNumber *identifier = dictionary[@"id"];
        NSNumber *userId = dictionary[@"user_id"];
        NSString* name = dictionary[@"name"];
        Group* group = [[Group alloc] init];
        group.id = [identifier integerValue];
        group.userId = [userId integerValue];
        group.name = name;
        [groups addObject:group];
    }
    return [NSArray arrayWithArray:groups];
}
@end
