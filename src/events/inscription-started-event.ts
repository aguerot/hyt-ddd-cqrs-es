import { Event } from  './event';

export class InscriptionStarted extends Event {
    readonly __typename = 'InscriptionStarted';

    constructor(public readonly date: Date) {
        super()
    }
}