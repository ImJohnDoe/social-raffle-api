import {Entity, hasMany, model, property} from '@loopback/repository';
import {Entry} from './entry.model';
import {WinningEntry} from './winning-entry.model';

@model()
export class Raffle extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  raffleId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  cost: string;

  @property({
    type: 'string',
    default: 'A raffle',
  })
  description?: string;

  @hasMany(() => Entry)
  entries: Entry[];

  @hasMany(() => Entry, {through: {model: () => WinningEntry}})
  winningEntries: Entry[];

  constructor(data?: Partial<Raffle>) {
    super(data);
  }
}

export interface RaffleRelations {
  // describe navigational properties here
}

export type RaffleWithRelations = Raffle & RaffleRelations;
