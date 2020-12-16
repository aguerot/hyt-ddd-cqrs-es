import { DistributionInscriptionId } from '../domain/distribution-inscription-id';
import { EventBase } from  './event';

export class DistributionRegisteredEvent extends EventBase {
    readonly __typename = 'DistributionRegisteredEvent';

    constructor(
        public readonly id: DistributionInscriptionId,
        public readonly email: string) {
        super()
    }
}