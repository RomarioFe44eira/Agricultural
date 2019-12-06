export class Person {
    public id?: number;
    public name?: string;
    public admin?: boolean;
    public mail?: string;
    public phone?: string;
    public createdAt?: Date;
    public expireAt?: Date;
    public birth?: string;

    public country?:{
        id?: number,
        abbreviation?: string,
        nameEn?: string,
        nameNative?: string,
        phoneCode?: string
    }
    public phoneCode?: {
        id?: number,
        abbreviation?: string,
        nameEn?: string,
        nameNative?: string,
        phoneCode?: string
    }
}