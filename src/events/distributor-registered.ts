import { Event } from  './event';

export class DistributionRegisteredEvent extends Event {
    readonly __typename = 'DistributionRegisteredEvent';

    constructor(
        public readonly email: string) {
        super()
    }
}