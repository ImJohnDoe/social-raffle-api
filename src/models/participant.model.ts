import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vote} from './vote.model';

@model()
export class Participant extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  participantId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Vote)
  votes: Vote[];

  constructor(data?: Partial<Participant>) {
    super(data);
  }
}

export interface ParticipantRelations {
  // describe navigational properties here
}

export type ParticipantWithRelations = Participant & ParticipantRelations;
