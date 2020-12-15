import { DistributionRegisteredEvent } from './distributor-registered';
import { DistributionUnregisteredEvent } from './distributor-unregistered';
import { Event } from './event';
import { InscriptionStartedEvent } from './inscription-started-event';

export type DistributionEvents = 
    | DistributionRegisteredEvent
    | DistributionUnregisteredEvent
    | InscriptionStartedEvent;