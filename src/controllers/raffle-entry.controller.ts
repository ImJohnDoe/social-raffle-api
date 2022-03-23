import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Raffle,
  Entry,
} from '../models';
import {RaffleRepository} from '../repositories';

export class RaffleEntryController {
  constructor(
    @repository(RaffleRepository) protected raffleRepository: RaffleRepository,
  ) { }

  @get('/raffles/{id}/entries', {
    responses: {
      '200': {
        description: 'Array of Raffle has many Entry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entry)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Entry>,
  ): Promise<Entry[]> {
    return this.raffleRepository.entries(id).find(filter);
  }

  @post('/raffles/{id}/entries', {
    responses: {
      '200': {
        description: 'Raffle model instance',
        content: {'application/json': {schema: getModelSchemaRef(Entry)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Raffle.prototype.raffleId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {
            title: 'NewEntryInRaffle',
            exclude: ['entryId'],
            optional: ['raffleId']
          }),
        },
      },
    }) entry: Omit<Entry, 'entryId'>,
  ): Promise<Entry> {
    return this.raffleRepository.entries(id).create(entry);
  }

  @patch('/raffles/{id}/entries', {
    responses: {
      '200': {
        description: 'Raffle.Entry PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {partial: true}),
        },
      },
    })
    entry: Partial<Entry>,
    @param.query.object('where', getWhereSchemaFor(Entry)) where?: Where<Entry>,
  ): Promise<Count> {
    return this.raffleRepository.entries(id).patch(entry, where);
  }

  @del('/raffles/{id}/entries', {
    responses: {
      '200': {
        description: 'Raffle.Entry DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Entry)) where?: Where<Entry>,
  ): Promise<Count> {
    return this.raffleRepository.entries(id).delete(where);
  }
}
