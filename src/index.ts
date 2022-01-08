import {startFastify} from './lib/fastify'
import {mongodbConnect} from './lib/mongodb'

async function run() {
  await mongodbConnect()
  await startFastify()
}

run().catch(console.error)