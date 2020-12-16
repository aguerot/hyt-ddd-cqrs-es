import { DistributionEvents } from '../events/events';
import { DistributionInscriptionId } from './distribution-inscription-id';

export class DistributionInscriptionProjection {
    private _registeredNames: string[] = []
    
    private _id: DistributionInscriptionId;
    get id()  {
        return this._id;
    }
    get registeredNames(): ReadonlyArray<string> {
        return this._registeredNames;
    };
    private _started = false;
    get started() {
        return this._started;
    }

    static fromEvents(events: DistributionEvents[] = []) {
        const projection = new DistributionInscriptionProjection();
        events.forEach(e => projection.process(e));
        return projection;
    }

    private process(event: DistributionEvents) {
        switch (event.__typename) {
            case 'DistributionRegisteredEvent': {
                this._registeredNames.push(event.email);
                break;
            }
            case 'DistributionUnregisteredEvent': {
                this._registeredNames = this._registeredNames.filter(e => e !== event.email);
                break;
            }
            case 'InscriptionStartedEvent': {
                this._id = DistributionInscriptionId.create(event.id.value);
                this._started = true;
                break;
            }
            default:
                assertNever(event);
        }
    }
}

function assertNever(arg: never) {}