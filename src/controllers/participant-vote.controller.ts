import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Participant,
  Vote
} from '../models';
import {ParticipantRepository} from '../repositories';

export class ParticipantVoteController {
  constructor(
    @repository(ParticipantRepository) protected participantRepository: ParticipantRepository,
  ) { }

  @get('/participants/{id}/votes', {
    responses: {
      '200': {
        description: 'Array of Participant has many Vote',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vote)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vote>,
  ): Promise<Vote[]> {
    return this.participantRepository.votes(id).find(filter);
  }

  @post('/participants/{id}/votes', {
    responses: {
      '200': {
        description: 'Participant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vote)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Participant.prototype.participantId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {
            title: 'NewVoteInParticipant',
            exclude: ['voteId'],
          }),
        },
      },
    }) vote: Omit<Vote, 'voteId'>,
  ): Promise<Vote> {
    return this.participantRepository.votes(id).create(vote);
  }

  @patch('/participants/{id}/votes', {
    responses: {
      '200': {
        description: 'Participant.Vote PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {partial: true}),
        },
      },
    })
    vote: Partial<Vote>,
    @param.query.object('where', getWhereSchemaFor(Vote)) where?: Where<Vote>,
  ): Promise<Count> {
    return this.participantRepository.votes(id).patch(vote, where);
  }

  @del('/participants/{id}/votes', {
    responses: {
      '200': {
        description: 'Participant.Vote DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vote)) where?: Where<Vote>,
  ): Promise<Count> {
    return this.participantRepository.votes(id).delete(where);
  }
}
