import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { EventBase } from  './event';

export class InscriptionStartedEvent extends EventBase {
    readonly __typename = 'InscriptionStartedEvent';

    constructor(
        public readonly id: DistributionInscriptionId) {
        super()
    }
}