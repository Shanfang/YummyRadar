export class Location {
    public state: string;
    public city: string;
    public zipCode: string;

    constructor(state: string, city: string, zipCode: string) {
        this.state = state;
        this.city = city;
        this.zipCode = zipCode;
    }
}