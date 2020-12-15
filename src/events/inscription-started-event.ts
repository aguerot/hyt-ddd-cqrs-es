import { Event } from  './event';

export class InscriptionStartedEvent extends Event {
    readonly __typename = 'InscriptionStartedEvent';

    constructor(public readonly date: Date) {
        super()
    }
}