export class Business {
  constructor(
  // string, 22 character unique string business id
  public business_id?: string,

  // string, the business's name
  public name?: string,

  // string, the neighborhood's name
  public neighborhood?: string,

  // string, the full address of the business
  public address?: string,

  // string, the city
  public city?: string,

  // string, 2 character state code, if applicable
  public state?: string,

  // string, the postal code
  public postal_code?: string,

  // float, latitude
  public latitude?: number,
  // float, longitude
  public longitude?: number,

  // float, star rating, rounded to half-stars
  public stars?: number,

  // interger, number of reviews
  public review_count?: number,

  // integer, 0 or 1 for closed or open, respectively
  public is_open?: number,

  // object, business attributes to values. note: some attribute values might be objects
  public attributes?: {

  },

  // an array of strings of business categories
  public categories?: string[],

  // an object of key day to value hours, hours are using a 24hr clock
  public hours?: {
  }
) {}
}
