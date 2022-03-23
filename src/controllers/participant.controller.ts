import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Participant} from '../models';
import {ParticipantRepository} from '../repositories';

export class ParticipantController {
  constructor(
    @repository(ParticipantRepository)
    public participantRepository : ParticipantRepository,
  ) {}

  @post('/participants')
  @response(200, {
    description: 'Participant model instance',
    content: {'application/json': {schema: getModelSchemaRef(Participant)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participant, {
            title: 'NewParticipant',
            exclude: ['participantId'],
          }),
        },
      },
    })
    participant: Omit<Participant, 'participantId'>,
  ): Promise<Participant> {
    return this.participantRepository.create(participant);
  }

  @get('/participants/count')
  @response(200, {
    description: 'Participant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Participant) where?: Where<Participant>,
  ): Promise<Count> {
    return this.participantRepository.count(where);
  }

  @get('/participants')
  @response(200, {
    description: 'Array of Participant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Participant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Participant) filter?: Filter<Participant>,
  ): Promise<Participant[]> {
    return this.participantRepository.find(filter);
  }

  @patch('/participants')
  @response(200, {
    description: 'Participant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participant, {partial: true}),
        },
      },
    })
    participant: Participant,
    @param.where(Participant) where?: Where<Participant>,
  ): Promise<Count> {
    return this.participantRepository.updateAll(participant, where);
  }

  @get('/participants/{id}')
  @response(200, {
    description: 'Participant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Participant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Participant, {exclude: 'where'}) filter?: FilterExcludingWhere<Participant>
  ): Promise<Participant> {
    return this.participantRepository.findById(id, filter);
  }

  @patch('/participants/{id}')
  @response(204, {
    description: 'Participant PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Participant, {partial: true}),
        },
      },
    })
    participant: Participant,
  ): Promise<void> {
    await this.participantRepository.updateById(id, participant);
  }

  @put('/participants/{id}')
  @response(204, {
    description: 'Participant PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() participant: Participant,
  ): Promise<void> {
    await this.participantRepository.replaceById(id, participant);
  }

  @del('/participants/{id}')
  @response(204, {
    description: 'Participant DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.participantRepository.deleteById(id);
  }
}
