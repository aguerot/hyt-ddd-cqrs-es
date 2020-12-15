import { Event } from  './event';

export class DistributionUnregistered extends Event {
    readonly __typename = 'DistributionUnregistered';
    constructor(
        public readonly email: string) {
        super()
    }
}