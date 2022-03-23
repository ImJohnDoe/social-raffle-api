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
import {Entry} from '../models';
import {EntryRepository} from '../repositories';

export class EntryController {
  constructor(
    @repository(EntryRepository)
    public entryRepository : EntryRepository,
  ) {}

  @post('/entries')
  @response(200, {
    description: 'Entry model instance',
    content: {'application/json': {schema: getModelSchemaRef(Entry)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {
            title: 'NewEntry',
            exclude: ['entryId'],
          }),
        },
      },
    })
    entry: Omit<Entry, 'entryId'>,
  ): Promise<Entry> {
    return this.entryRepository.create(entry);
  }

  @get('/entries/count')
  @response(200, {
    description: 'Entry model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Entry) where?: Where<Entry>,
  ): Promise<Count> {
    return this.entryRepository.count(where);
  }

  @get('/entries')
  @response(200, {
    description: 'Array of Entry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Entry, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Entry) filter?: Filter<Entry>,
  ): Promise<Entry[]> {
    return this.entryRepository.find(filter);
  }

  @patch('/entries')
  @response(200, {
    description: 'Entry PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {partial: true}),
        },
      },
    })
    entry: Entry,
    @param.where(Entry) where?: Where<Entry>,
  ): Promise<Count> {
    return this.entryRepository.updateAll(entry, where);
  }

  @get('/entries/{id}')
  @response(200, {
    description: 'Entry model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Entry, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Entry, {exclude: 'where'}) filter?: FilterExcludingWhere<Entry>
  ): Promise<Entry> {
    return this.entryRepository.findById(id, filter);
  }

  @patch('/entries/{id}')
  @response(204, {
    description: 'Entry PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {partial: true}),
        },
      },
    })
    entry: Entry,
  ): Promise<void> {
    await this.entryRepository.updateById(id, entry);
  }

  @put('/entries/{id}')
  @response(204, {
    description: 'Entry PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() entry: Entry,
  ): Promise<void> {
    await this.entryRepository.replaceById(id, entry);
  }

  @del('/entries/{id}')
  @response(204, {
    description: 'Entry DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entryRepository.deleteById(id);
  }
}
