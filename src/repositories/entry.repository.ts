import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {InmemDataSource} from '../datasources';
import {Entry, EntryRelations, Vote, Raffle, Participant} from '../models';
import {VoteRepository} from './vote.repository';
import {RaffleRepository} from './raffle.repository';
import {ParticipantRepository} from './participant.repository';

export class EntryRepository extends DefaultCrudRepository<
  Entry,
  typeof Entry.prototype.entryId,
  EntryRelations
> {

  public readonly votes: HasManyRepositoryFactory<Vote, typeof Entry.prototype.entryId>;

  public readonly raffle: BelongsToAccessor<Raffle, typeof Entry.prototype.entryId>;

  public readonly participant: BelongsToAccessor<Participant, typeof Entry.prototype.entryId>;

  constructor(
    @inject('datasources.inmem') dataSource: InmemDataSource, @repository.getter('VoteRepository') protected voteRepositoryGetter: Getter<VoteRepository>, @repository.getter('RaffleRepository') protected raffleRepositoryGetter: Getter<RaffleRepository>, @repository.getter('ParticipantRepository') protected participantRepositoryGetter: Getter<ParticipantRepository>,
  ) {
    super(Entry, dataSource);
    this.participant = this.createBelongsToAccessorFor('participant', participantRepositoryGetter,);
    this.registerInclusionResolver('participant', this.participant.inclusionResolver);
    this.raffle = this.createBelongsToAccessorFor('raffle', raffleRepositoryGetter,);
    this.registerInclusionResolver('raffle', this.raffle.inclusionResolver);
    this.votes = this.createHasManyRepositoryFactoryFor('votes', voteRepositoryGetter,);
    this.registerInclusionResolver('votes', this.votes.inclusionResolver);
  }
}
