
import { DistributionRegisteredEvent } from '../events/distributor-registered';
import { InscriptionStartedEvent } from '../events/inscription-started-event';
import { DistributionUnregisteredEvent } from '../events/distributor-unregistered';
import { DistributionInscriptionProjection } from './distribution-inscription-projection';
import { DistributionEvents } from '../events/events';

export class DistributionInscription {

    private _projection: DistributionInscriptionProjection;

    private constructor(events: DistributionEvents[]) {
        this._projection = DistributionInscriptionProjection.fromEvents(events);
    }

    registerDistribution(email: string) {
        if (!this._projection.started) {
            return;
        }

        if (this._projection.registeredNames.includes(email)) {
            return;
        }

        return new DistributionRegisteredEvent(email);
    }

    unregisterDistribution(email: string) {
        if (this._projection.registeredNames.every(e => e !== email)) {
            return;
        }

        return new DistributionUnregisteredEvent(email);
    }

    static fromEvents(events: DistributionEvents[]) {
        return new DistributionInscription(events);
    }

    static startInscription(date: Date) {
        return new InscriptionStartedEvent(date);
    }
}