import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Vote} from './vote.model';
import {Raffle} from './raffle.model';
import {Participant} from './participant.model';

@model()
export class Entry extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  entryId?: number;

  @property({
    type: 'string',
    required: true,
  })
  cost: string;

  @hasMany(() => Vote)
  votes: Vote[];

  @belongsTo(() => Raffle)
  raffleId: number;

  @belongsTo(() => Participant)
  participantId: number;

  constructor(data?: Partial<Entry>) {
    super(data);
  }
}

export interface EntryRelations {
  // describe navigational properties here
}

export type EntryWithRelations = Entry & EntryRelations;
