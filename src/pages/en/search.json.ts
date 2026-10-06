import { searchIndex } from '../../lib/search-index';

export const GET = async () => Response.json(await searchIndex('en'));
