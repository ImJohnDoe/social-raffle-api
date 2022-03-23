import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
  })
  participantId?: number;

  @property({
    type: 'number',
  })
  entryId?: number;

  constructor(data?: Partial<Vote>) {
    super(data);
  }
}

export interface VoteRelations {
  // describe navigational properties here
}

export type VoteWithRelations = Vote & VoteRelations;
