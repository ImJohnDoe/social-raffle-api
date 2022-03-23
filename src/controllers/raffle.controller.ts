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
import {Raffle} from '../models';
import {RaffleRepository} from '../repositories';

export class RaffleController {
  constructor(
    @repository(RaffleRepository)
    public raffleRepository : RaffleRepository,
  ) {}

  @post('/raffles')
  @response(200, {
    description: 'Raffle model instance',
    content: {'application/json': {schema: getModelSchemaRef(Raffle)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raffle, {
            title: 'NewRaffle',
            exclude: ['raffleId'],
          }),
        },
      },
    })
    raffle: Omit<Raffle, 'raffleId'>,
  ): Promise<Raffle> {
    return this.raffleRepository.create(raffle);
  }

  @get('/raffles/count')
  @response(200, {
    description: 'Raffle model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Raffle) where?: Where<Raffle>,
  ): Promise<Count> {
    return this.raffleRepository.count(where);
  }

  @get('/raffles')
  @response(200, {
    description: 'Array of Raffle model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Raffle, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Raffle) filter?: Filter<Raffle>,
  ): Promise<Raffle[]> {
    return this.raffleRepository.find(filter);
  }

  @patch('/raffles')
  @response(200, {
    description: 'Raffle PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raffle, {partial: true}),
        },
      },
    })
    raffle: Raffle,
    @param.where(Raffle) where?: Where<Raffle>,
  ): Promise<Count> {
    return this.raffleRepository.updateAll(raffle, where);
  }

  @get('/raffles/{id}')
  @response(200, {
    description: 'Raffle model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Raffle, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Raffle, {exclude: 'where'}) filter?: FilterExcludingWhere<Raffle>
  ): Promise<Raffle> {
    return this.raffleRepository.findById(id, filter);
  }

  @patch('/raffles/{id}')
  @response(204, {
    description: 'Raffle PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raffle, {partial: true}),
        },
      },
    })
    raffle: Raffle,
  ): Promise<void> {
    await this.raffleRepository.updateById(id, raffle);
  }

  @put('/raffles/{id}')
  @response(204, {
    description: 'Raffle PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() raffle: Raffle,
  ): Promise<void> {
    await this.raffleRepository.replaceById(id, raffle);
  }

  @del('/raffles/{id}')
  @response(204, {
    description: 'Raffle DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.raffleRepository.deleteById(id);
  }
}
