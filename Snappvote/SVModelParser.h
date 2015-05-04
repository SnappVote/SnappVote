//
//  SVModelParser.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/30/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Group.h"
#import "User.h"
#import "Snappvote.h"

@interface SVModelParser : NSObject
-(NSArray*)parseGroups:(id)responseObject;
-(NSArray*)parseSnappvotes:(id)responseObject;

@end
