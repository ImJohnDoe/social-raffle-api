import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vote,
  Entry,
} from '../models';
import {VoteRepository} from '../repositories';

export class VoteEntryController {
  constructor(
    @repository(VoteRepository)
    public voteRepository: VoteRepository,
  ) { }

  @get('/votes/{id}/entry', {
    responses: {
      '200': {
        description: 'Entry belonging to Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entry)},
          },
        },
      },
    },
  })
  async getEntry(
    @param.path.number('id') id: typeof Vote.prototype.voteId,
  ): Promise<Entry> {
    return this.voteRepository.entry(id);
  }
}
