// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Leaderboard } = initSchema(schema);

export {
  Leaderboard
};