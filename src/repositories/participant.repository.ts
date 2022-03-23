import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InmemDataSource} from '../datasources';
import {Participant, ParticipantRelations, Vote} from '../models';
import {VoteRepository} from './vote.repository';

export class ParticipantRepository extends DefaultCrudRepository<
  Participant,
  typeof Participant.prototype.participantId,
  ParticipantRelations
> {

  public readonly votes: HasManyRepositoryFactory<Vote, typeof Participant.prototype.participantId>;

  constructor(
    @inject('datasources.inmem') dataSource: InmemDataSource, @repository.getter('VoteRepository') protected voteRepositoryGetter: Getter<VoteRepository>,
  ) {
    super(Participant, dataSource);
    this.votes = this.createHasManyRepositoryFactoryFor('votes', voteRepositoryGetter,);
    this.registerInclusionResolver('votes', this.votes.inclusionResolver);
  }
}
