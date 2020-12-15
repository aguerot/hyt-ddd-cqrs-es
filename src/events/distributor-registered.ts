import { Event } from  './event';

export class DistributionRegistered extends Event {
    readonly __typename = 'DistributionRegistered';

    constructor(
        public readonly email: string) {
        super()
    }
}