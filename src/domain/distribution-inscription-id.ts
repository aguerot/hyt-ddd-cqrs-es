
import { v4 } from 'uuid';

export class DistributionInscriptionId {
    
    private constructor(public readonly value: string) {
    }

    public equals(obj: DistributionInscriptionId) {
        return this.value === obj.value;
    }
   
    static create(id? : string) {
        return new DistributionInscriptionId(id || v4());
    }
}