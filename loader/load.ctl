 load data
  infile 'test.csv' 
  into table Test
  fields terminated by ',' optionally
  enclosed by '"'
  (ID,city,state,zip_code,review_count,is_open,rest_category,star_count)