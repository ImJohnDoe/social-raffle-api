import {inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory} from '@loopback/repository';
import {InmemDataSource} from '../datasources';
import {Entry, Participant, Vote, VoteRelations} from '../models';

export class VoteRepository extends DefaultCrudRepository<
  Vote,
  typeof Vote.prototype.voteId,
  VoteRelations
> {

  public readonly entry: HasOneRepositoryFactory<Entry, typeof Vote.prototype.voteId>;

  public readonly participant: HasOneRepositoryFactory<Participant, typeof Vote.prototype.voteId>;

  constructor(
    @inject('datasources.inmem') dataSource: InmemDataSource,
  ) {
    super(Vote, dataSource);
  }
}
