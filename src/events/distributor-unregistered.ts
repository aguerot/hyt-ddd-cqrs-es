import { Event } from  './event';

export class DistributionUnregisteredEvent extends Event {
    readonly __typename = 'DistributionUnregisteredEvent';
    constructor(
        public readonly email: string) {
        super()
    }
}