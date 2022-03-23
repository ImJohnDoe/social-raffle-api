import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Participant} from './participant.model';
import {Entry} from './entry.model';

@model()
export class Vote extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  voteId?: number;

  @property({
    type: 'boolean',
  })
  isPositive: boolean;

  @belongsTo(() => Participant)
  participantId: number;

  @belongsTo(() => Entry)
  entryId: number;

  constructor(data?: Partial<Vote>) {
    super(data);
  }
}

export interface VoteRelations {
  // describe navigational properties here
}

export type VoteWithRelations = Vote & VoteRelations;
