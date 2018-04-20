SELECT id,name,neighborhood,address,city,state,postal_code,latitude,longitude,stars,review_count,is_open 
INTO OUTFILE '/Users/shanfang/desktop/result.csv'
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM yelp_db.business 