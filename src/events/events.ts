import { DistributionRegisteredEvent } from './distributor-registered';
import { DistributionUnregisteredEvent } from './distributor-unregistered';
import { EventBase } from './event';
import { InscriptionStartedEvent } from './inscription-started-event';

export type DistributionEvents = 
    | DistributionRegisteredEvent
    | DistributionUnregisteredEvent
    | InscriptionStartedEvent;