import {z} from 'zod';
import { z_query_params } from './query';

export const z_info_obj = z.object({
    // react useState function
    set_M: z.any(), // it's not z.function()
    model_name: z.string(),
    op: z.string(),
    model_id: z.string(),
    comp_id: z.string(),
    comp_idx: z.number(),   // props.IDX

    idx: z.number().optional(),
    query: z_query_params.optional(),

    on_created: z.function().optional(),
    on_selected: z.function().optional(),
});
export type T_INFO = z.infer<typeof z_info_obj>;