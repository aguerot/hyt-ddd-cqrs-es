import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { Event } from  './event';

export class InscriptionStartedEvent extends Event {
    readonly __typename = 'InscriptionStartedEvent';

    constructor(
        public readonly id: DistributionInscriptionId,
        public readonly date: Date) {
        super()
    }
}