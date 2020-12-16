import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { EventBase } from  './event';

export class DistributionUnregisteredEvent extends EventBase {
    readonly __typename = 'DistributionUnregisteredEvent';
    constructor(
        public readonly id: DistributionInscriptionId,
        public readonly email: string) {
        super()
    }
}