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
  Participant,
} from '../models';
import {EntryRepository} from '../repositories';

export class EntryParticipantController {
  constructor(
    @repository(EntryRepository)
    public entryRepository: EntryRepository,
  ) { }

  @get('/entries/{id}/participant', {
    responses: {
      '200': {
        description: 'Participant belonging to Entry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participant)},
          },
        },
      },
    },
  })
  async getParticipant(
    @param.path.number('id') id: typeof Entry.prototype.entryId,
  ): Promise<Participant> {
    return this.entryRepository.participant(id);
  }
}
