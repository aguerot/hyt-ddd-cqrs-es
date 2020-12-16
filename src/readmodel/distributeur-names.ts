import { DistributionEvents } from '../events/events';
import { IEventHandler } from './event-handler';

export class DistributorNames implements IEventHandler {

    private _names: { [id: string]: string[] } = {
    };

    getNames(id: string) {
        return this._names[id] || [];
    }

    handle(event: DistributionEvents) {
        switch (event.__typename) {
            case 'DistributionRegisteredEvent':
                this._names[event.id.value] = [
                    ...this.getNames(event.id.value),
                    event.email
                ];
                break;
            case 'DistributionUnregisteredEvent':
                this._names[event.id.value] = this._names[event.id.value].filter(e => e !== event.email);
                break;
        }
    }
}
