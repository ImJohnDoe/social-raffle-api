import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {InmemDataSource} from '../datasources';
import {Entry, Participant, Vote, VoteRelations} from '../models';
import {EntryRepository} from './entry.repository';
import {ParticipantRepository} from './participant.repository';

export class VoteRepository extends DefaultCrudRepository<
  Vote,
  typeof Vote.prototype.voteId,
  VoteRelations
> {

  public readonly participant: BelongsToAccessor<Participant, typeof Vote.prototype.voteId>;

  public readonly entry: BelongsToAccessor<Entry, typeof Vote.prototype.voteId>;

  constructor(
    @inject('datasources.inmem') dataSource: InmemDataSource, @repository.getter('ParticipantRepository') protected participantRepositoryGetter: Getter<ParticipantRepository>, @repository.getter('EntryRepository') protected entryRepositoryGetter: Getter<EntryRepository>,
  ) {
    super(Vote, dataSource);
    this.entry = this.createBelongsToAccessorFor('entry', entryRepositoryGetter,);
    this.registerInclusionResolver('entry', this.entry.inclusionResolver);
    this.participant = this.createBelongsToAccessorFor('participant', participantRepositoryGetter,);
    this.registerInclusionResolver('participant', this.participant.inclusionResolver);
  }
}
