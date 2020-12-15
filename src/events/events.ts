import { DistributionRegistered } from './distributor-registered';
import { DistributionUnregistered } from './distributor-unregistered';
import { InscriptionStarted } from './inscription-started-event';

export type DistributionEvents = 
    | DistributionRegistered
    | DistributionUnregistered
    | InscriptionStarted;