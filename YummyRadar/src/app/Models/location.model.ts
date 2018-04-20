export class Location {
    public state: string;
    public city: string;
    public zipCode: string;
    public reviewCount: number;
    public stars: number;

    constructor(state: string, city: string, zipCode: string, stars: number, reviewCount: number) {
        this.state = state;
        this.city = city;
        this.zipCode = zipCode;
        this.reviewCount = reviewCount;
        this.stars = stars;
    }
}