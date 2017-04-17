import { LookupCategory } from './lookup-category';

export class LookupValue{
    id: number;
    category: LookupCategory;
    lookupCode: string;
    lookupValue: string;

    /*toString(){
        return this.lookupValue;
    }*/

}
