import {Entity, model, property} from '@loopback/repository';

@model()
export class WinningEntry extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  winningEntryId?: number;

  @property({
    type: 'number',
  })
  raffleId?: number;

  @property({
    type: 'number',
  })
  entryId?: number;

  constructor(data?: Partial<WinningEntry>) {
    super(data);
  }
}

export interface WinningEntryRelations {
  // describe navigational properties here
}

export type WinningEntryWithRelations = WinningEntry & WinningEntryRelations;
