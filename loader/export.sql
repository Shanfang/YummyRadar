SELECT id,name,neighborhood,address,city,state,postal_code,latitude,longitude,stars,review_count,is_open 
FROM yelp_db.business;

SELECT id,business_id,category FROM yelp_db.category 

SELECT id,business_id,date,count FROM yelp_db.checkin;

SELECT id,business_id,name,value
FROM yelp_db.attribute;

HOURS;
-- the following tables have not been exported --
SELECT id,business_id,user_id,stars,date,text,useful,funny,cool 
FROM yelp_db.review;

-- SELECT id,name,review_count,yelping_since,useful,funny,cool,fans,average_stars,compliment_hot,compliment_more,compliment_profile,compliment_cute,compliment_list,compliment_note,compliment_plain,compliment_cool,compliment_funny,compliment_writer,compliment_photos 
-- FROM yelp_db.user;
SELECT id,name,review_count,yelping_since,useful,funny,cool,fans,average_stars
FROM yelp_db.user;