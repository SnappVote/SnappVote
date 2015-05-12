//
//  Utils.m
//  Snappvote
//
//  Created by Martin Dzhonov on 4/24/15.
//  Copyright (c) 2015 Creative2Thoughts. All rights reserved.
//

#import "Utils.h"

@implementation Utils

+(NSString*)getBaseUrl{
    return @"http://localhost/api/v1";
}

+ (NSString *)encodeToBase64String:(UIImage *)image {
    return [UIImagePNGRepresentation(image) base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
}

+ (UIImage *)decodeFromBase64:(NSString *)strEncodeData {
    NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
    return [UIImage imageWithData:data];
}
+(NSString*)getFriendlyDateString:(NSDate *)date{
    
    NSDate *now = [NSDate date];
    NSDate *expireDate = date;
    // profit
    NSTimeInterval ti = [now timeIntervalSinceDate:expireDate];
    NSInteger minutes = (NSInteger)(ti / 60) % 60;
    NSInteger hours = (ti / 3600);
    NSInteger days = (ti / (3600*24));
    NSInteger years = (ti / (3600*24*365));
    if(years == 0){
        if(days == 0){
            if(hours == 0){
                return [NSString stringWithFormat:@"%tu%@", minutes, @"m"];
                
            }
            else{
                return [NSString stringWithFormat:@"%tu%@", hours, @"h"];
            }
        }
        else {
            return [NSString stringWithFormat:@"%tu%@", days, @"d"];
        }
    }
    else{
        return [NSString stringWithFormat:@"%tu%@", years, @"yr"];
        
    }
    NSDateFormatter *dateformate=[[NSDateFormatter alloc]init];
    [dateformate setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    NSString *dateStr = [dateformate stringFromDate:[NSDate date]];
    return dateStr;
}

+ (void) showAlert: (NSString *) title withMessage: (NSString*) message{
    UIAlertView *myAlertView = [[UIAlertView alloc] initWithTitle:title
                                                          message:message
                                                         delegate:nil
                                                cancelButtonTitle:@"OK"
                                                otherButtonTitles: nil];
    [myAlertView show];
    
}

+ (UIView*) getTitleViewWithSubtitle:(NSString*)subtitle{
    UILabel *titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
    titleLabel.backgroundColor = [UIColor clearColor];
    titleLabel.textColor = [UIColor whiteColor];
    titleLabel.font = [UIFont boldSystemFontOfSize:18];
    titleLabel.text = @"Snappvote";
    [titleLabel sizeToFit];
    
    UILabel *subTitleLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 22, 0, 0)];
    subTitleLabel.backgroundColor = [UIColor clearColor];
    subTitleLabel.textColor = [UIColor whiteColor];
    subTitleLabel.font = [UIFont systemFontOfSize:12];
    subTitleLabel.text = subtitle;
    [subTitleLabel sizeToFit];
    
    UIView* twoLineTitleView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, MAX(subTitleLabel.frame.size.width, titleLabel.frame.size.width), 30)];
    [twoLineTitleView addSubview:titleLabel];
    [twoLineTitleView addSubview:subTitleLabel];
    
    float widthDiff = subTitleLabel.frame.size.width - titleLabel.frame.size.width;
    
    if (widthDiff > 0) {
        CGRect frame = titleLabel.frame;
        frame.origin.x = widthDiff / 2;
        titleLabel.frame = CGRectIntegral(frame);
    }else{
        CGRect frame = subTitleLabel.frame;
        frame.origin.x = abs(widthDiff) / 2;
        subTitleLabel.frame = CGRectIntegral(frame);
    }
    
    return twoLineTitleView;
}

@end
