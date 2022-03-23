import {Client} from '@loopback/testlab';
import {SocialRaffleApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('Raffle CUJ', () => {
  let app: SocialRaffleApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('creates raffle', async () => {
    // const controller = new RaffleController(new RaffleRepository(testdb));

    // const res = await client.post('/raffles',).expect(200);
    // expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
