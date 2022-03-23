import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {InmemDataSource} from '../datasources';
import {Entry, Raffle, RaffleRelations, WinningEntry} from '../models';
import {EntryRepository} from './entry.repository';
import {WinningEntryRepository} from './winning-entry.repository';

export class RaffleRepository extends DefaultCrudRepository<
  Raffle,
  typeof Raffle.prototype.raffleId,
  RaffleRelations
> {

  public readonly entries: HasManyRepositoryFactory<Entry, typeof Raffle.prototype.raffleId>;

  public readonly winningEntries: HasManyThroughRepositoryFactory<Entry, typeof Entry.prototype.entryId,
          WinningEntry,
          typeof Raffle.prototype.raffleId
        >;

  constructor(
    @inject('datasources.inmem') dataSource: InmemDataSource, @repository.getter('EntryRepository') protected entryRepositoryGetter: Getter<EntryRepository>, @repository.getter('WinningEntryRepository') protected winningEntryRepositoryGetter: Getter<WinningEntryRepository>,
  ) {
    super(Raffle, dataSource);
    this.winningEntries = this.createHasManyThroughRepositoryFactoryFor('winningEntries', entryRepositoryGetter, winningEntryRepositoryGetter,);
    this.registerInclusionResolver('winningEntries', this.winningEntries.inclusionResolver);
    this.entries = this.createHasManyRepositoryFactoryFor('entries', entryRepositoryGetter,);
    this.registerInclusionResolver('entries', this.entries.inclusionResolver);
  }
}
