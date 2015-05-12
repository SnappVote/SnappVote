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

-(NSArray*)parseSnappvotes:(id)responseObject{
    NSMutableArray* snappvotes = [[NSMutableArray alloc] init];
    for (NSDictionary *dictionary in responseObject) {
        NSNumber *identifier = dictionary[@"id"];
        NSNumber *author_id = dictionary[@"author_id"];
        NSString *title = dictionary[@"title"];
        NSString* answer1 = dictionary[@"answer_1"];
        NSString* answer2 = dictionary[@"answer_2"];
        NSDate* expireDate = dictionary[@"expire_date"];
        Snappvote* snappvote = [[Snappvote alloc] init];
        snappvote.id = [identifier integerValue];
        snappvote.authorId = [author_id integerValue];
        snappvote.title = title;
        snappvote.answer1 = answer1;
        snappvote.answer2 = answer2;
        snappvote.expireDate = expireDate;
        [snappvotes addObject:snappvote];
    }
    return [NSArray arrayWithArray:snappvotes];
}

-(Snappvote*)parseSnappvote:(NSDictionary*)dictionary{
        NSNumber *identifier = dictionary[@"id"];
        NSNumber *author_id = dictionary[@"author_id"];
        NSString *title = dictionary[@"title"];
        NSString* answer1 = dictionary[@"answer_1"];
        NSString* answer2 = dictionary[@"answer_2"];
        NSString* expireDateStr = dictionary[@"expire_date"];
        NSDate* expireDate = [self getDateFromString:expireDateStr];
        Snappvote* snappvote = [[Snappvote alloc] init];
        snappvote.id = [identifier integerValue];
        snappvote.authorId = [author_id integerValue];
        snappvote.title = title;
        snappvote.answer1 = answer1;
        snappvote.answer2 = answer2;
        snappvote.expireDate = expireDate;
        return snappvote;
}

-(NSDate*)getDateFromString:(NSString *)pstrDate
{
    NSDateFormatter *df1 = [[NSDateFormatter alloc] init];
    [df1 setDateFormat:@"yyyy-MM-dd"];
    NSDate *dtPostDate = [df1 dateFromString:pstrDate];
    return dtPostDate;
}

@end
