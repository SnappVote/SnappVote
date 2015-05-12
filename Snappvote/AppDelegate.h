//
//  AppDelegate.h
//  Snappvote
//
//  Created by Martin Dzhonov on 4/23/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>
#import "SWRevealViewController.h"
@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

@property (readonly, strong, nonatomic) NSManagedObjectContext *managedObjectContext;
@property (readonly, strong, nonatomic) NSManagedObjectModel *managedObjectModel;
@property (readonly, strong, nonatomic) NSPersistentStoreCoordinator *persistentStoreCoordinator;
@property (strong, nonatomic) SWRevealViewController *viewController;

- (void)saveContext;
- (NSURL *)applicationDocumentsDirectory;


@end

