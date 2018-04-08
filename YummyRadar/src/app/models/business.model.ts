export class Business {
  // string, 22 character unique string business id
  business_id: string;

  // string, the business's name
  name: string;

  // string, the neighborhood's name
  neighborhood: string;

  // string, the full address of the business
  address: string;

  // string, the city
  city: string;

  // string, 2 character state code, if applicable
  state: string;

  // string, the postal code
  postal_code: string;

  // float, latitude
  latitude: number;

  // float, longitude
  longitude: number;

  // float, star rating, rounded to half-stars
  stars: number;

  // interger, number of reviews
  review_count: number;

  // integer, 0 or 1 for closed or open, respectively
  is_open: number;

  // object, business attributes to values. note: some attribute values might be objects
  attributes: {
    RestaurantsTakeOut: boolean;
    BusinessParking: {
      garage: boolean;
      street: boolean;
      validated: boolean;
      lot: boolean;
      valet: boolean;
    },
  }

  // an array of strings of business categories
  categories: string[];

  // an object of key day to value hours, hours are using a 24hr clock
  hours: {
    Monday: string;
    Tuesday: string;
    Friday: string;
    Wednesday: string;
    Thursday: string;
    Sunday: string;
    Saturday: string;
}
}
