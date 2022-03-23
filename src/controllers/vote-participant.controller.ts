import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Participant, Vote
} from '../models';
import {VoteRepository} from '../repositories';

export class VoteParticipantController {
  constructor(
    @repository(VoteRepository)
    public voteRepository: VoteRepository,
  ) { }

  @get('/votes/{id}/participant', {
    responses: {
      '200': {
        description: 'Participant belonging to Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participant)},
          },
        },
      },
    },
  })
  async getParticipant(
    @param.path.number('id') id: typeof Vote.prototype.voteId,
  ): Promise<Participant> {
    return this.voteRepository.participant(id);
  }
}
