import { DistributionEvents } from '../events/events';
import { IEventHandler } from './event-handler';

export class DistributorCounter implements IEventHandler {

    private _counters: { [id: string]: number } = {
    };

    getCounter(id: string) {
        return this._counters[id] || 0;
    }

    handle(event: DistributionEvents) {
        switch (event.__typename) {
            case 'DistributionRegisteredEvent':
                this._counters[event.id.value] = this.getCounter(event.id.value) + 1;
                break;
            case 'DistributionUnregisteredEvent':
                this._counters[event.id.value]--;
                break;
        }
    }
}
