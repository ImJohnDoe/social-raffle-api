import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InmemDataSource} from '../datasources';
import {WinningEntry, WinningEntryRelations} from '../models';

export class WinningEntryRepository extends DefaultCrudRepository<
  WinningEntry,
  typeof WinningEntry.prototype.winningEntryId,
  WinningEntryRelations
> {
  constructor(
    @inject('datasources.inmem') dataSource: InmemDataSource,
  ) {
    super(WinningEntry, dataSource);
  }
}
