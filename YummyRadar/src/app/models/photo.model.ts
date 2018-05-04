export class Photo {
  constructor(// string, 22 character unique string business id
              public photo_id?: string,
              // string, the business's name
              public business_id?: string,
              // string, the neighborhood's name
              public caption?: string,
              // string, the full address of the business
              public label?: string) {
  }
}
