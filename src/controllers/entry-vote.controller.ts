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
  Entry,
  Vote
} from '../models';
import {EntryRepository} from '../repositories';

export class EntryVoteController {
  constructor(
    @repository(EntryRepository) protected entryRepository: EntryRepository,
  ) { }

  @get('/entries/{id}/votes', {
    responses: {
      '200': {
        description: 'Array of Entry has many Vote',
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
    return this.entryRepository.votes(id).find(filter);
  }

  @post('/entries/{id}/votes', {
    responses: {
      '200': {
        description: 'Entry model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vote)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Entry.prototype.entryId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vote, {
            title: 'NewVoteInEntry',
            exclude: ['voteId'],
          }),
        },
      },
    }) vote: Omit<Vote, 'voteId'>,
  ): Promise<Vote> {
    return this.entryRepository.votes(id).create(vote);
  }

  @patch('/entries/{id}/votes', {
    responses: {
      '200': {
        description: 'Entry.Vote PATCH success count',
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
    return this.entryRepository.votes(id).patch(vote, where);
  }

  @del('/entries/{id}/votes', {
    responses: {
      '200': {
        description: 'Entry.Vote DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vote)) where?: Where<Vote>,
  ): Promise<Count> {
    return this.entryRepository.votes(id).delete(where);
  }
}
