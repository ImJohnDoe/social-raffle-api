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
import {WinningEntry} from '../models';
import {WinningEntryRepository} from '../repositories';

export class WinningEntryController {
  constructor(
    @repository(WinningEntryRepository)
    public winningEntryRepository : WinningEntryRepository,
  ) {}

  @post('/winning-entries')
  @response(200, {
    description: 'WinningEntry model instance',
    content: {'application/json': {schema: getModelSchemaRef(WinningEntry)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WinningEntry, {
            title: 'NewWinningEntry',
            exclude: ['winningEntryId'],
          }),
        },
      },
    })
    winningEntry: Omit<WinningEntry, 'winningEntryId'>,
  ): Promise<WinningEntry> {
    return this.winningEntryRepository.create(winningEntry);
  }

  @get('/winning-entries/count')
  @response(200, {
    description: 'WinningEntry model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WinningEntry) where?: Where<WinningEntry>,
  ): Promise<Count> {
    return this.winningEntryRepository.count(where);
  }

  @get('/winning-entries')
  @response(200, {
    description: 'Array of WinningEntry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WinningEntry, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WinningEntry) filter?: Filter<WinningEntry>,
  ): Promise<WinningEntry[]> {
    return this.winningEntryRepository.find(filter);
  }

  @patch('/winning-entries')
  @response(200, {
    description: 'WinningEntry PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WinningEntry, {partial: true}),
        },
      },
    })
    winningEntry: WinningEntry,
    @param.where(WinningEntry) where?: Where<WinningEntry>,
  ): Promise<Count> {
    return this.winningEntryRepository.updateAll(winningEntry, where);
  }

  @get('/winning-entries/{id}')
  @response(200, {
    description: 'WinningEntry model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WinningEntry, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WinningEntry, {exclude: 'where'}) filter?: FilterExcludingWhere<WinningEntry>
  ): Promise<WinningEntry> {
    return this.winningEntryRepository.findById(id, filter);
  }

  @patch('/winning-entries/{id}')
  @response(204, {
    description: 'WinningEntry PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WinningEntry, {partial: true}),
        },
      },
    })
    winningEntry: WinningEntry,
  ): Promise<void> {
    await this.winningEntryRepository.updateById(id, winningEntry);
  }

  @put('/winning-entries/{id}')
  @response(204, {
    description: 'WinningEntry PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() winningEntry: WinningEntry,
  ): Promise<void> {
    await this.winningEntryRepository.replaceById(id, winningEntry);
  }

  @del('/winning-entries/{id}')
  @response(204, {
    description: 'WinningEntry DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.winningEntryRepository.deleteById(id);
  }
}
