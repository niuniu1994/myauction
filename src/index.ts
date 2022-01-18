import { setupAuctionsUpdateSys } from './controllers/biddingController';
import {startFastify} from './lib/fastify'
import {mongodbConnect} from './lib/mongodb'

async function run() {
  await mongodbConnect()
  await startFastify()
  await setupAuctionsUpdateSys();
}

run().catch(console.error)