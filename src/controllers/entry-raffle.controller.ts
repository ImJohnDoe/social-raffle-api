import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Entry,
  Raffle,
} from '../models';
import {EntryRepository} from '../repositories';

export class EntryRaffleController {
  constructor(
    @repository(EntryRepository)
    public entryRepository: EntryRepository,
  ) { }

  @get('/entries/{id}/raffle', {
    responses: {
      '200': {
        description: 'Raffle belonging to Entry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Raffle)},
          },
        },
      },
    },
  })
  async getRaffle(
    @param.path.number('id') id: typeof Entry.prototype.entryId,
  ): Promise<Raffle> {
    return this.entryRepository.raffle(id);
  }
}
