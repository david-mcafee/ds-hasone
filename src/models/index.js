// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Project13, Team13 } = initSchema(schema);

export {
  Project13,
  Team13
};