//
//  UserUtils.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/23/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "UserUtils.h"
#import "AFHTTPRequestOperationManager.h"

@implementation UserUtils

+(void)createUser: (NSString*)username phone:(NSString*)phone email:(NSString*)email country:(NSString*)country{
    
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    NSDictionary *parameters = @{@"username": username, @"phone" :phone, @"email": email, @"country" : country};
    
    [manager POST:@"http://localhost/api/v1/users" parameters:parameters
          success:^(AFHTTPRequestOperation *operation, id responseObject) {
              NSLog(@"JSON: %@", responseObject);
              NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
              
              NSNumber* userId = responseObject[@"id"];
              [defaults setObject:userId forKey:@"id"];
              [defaults setObject:username forKey:@"username"];
              [defaults setObject:phone forKey:@"phone"];
              [defaults setObject:email forKey:@"email"];
              [defaults setObject:country forKey:@"country"];
              [defaults setBool:TRUE forKey:@"registered"];
              
              [defaults synchronize];
          } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
              NSLog(@"Error");
          }];
}

+(NSInteger)getUserId{
    NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
    if([defaults objectForKey:@"id"]){
        return [[defaults objectForKey:@"id"] integerValue];
    }
    else{
        return -1;
    }
}

+(BOOL)userExists{
    NSUserDefaults* defaults = [NSUserDefaults standardUserDefaults];
    if([defaults boolForKey:@"registered"]){
        return [defaults boolForKey:@"registered"];
    }
    else{
        return FALSE;
    }
}

@end
