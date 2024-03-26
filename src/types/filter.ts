import { z } from 'zod';

export const z_node_filter = z.object({
    id: z.string(),
    attr: z.string(),
    op: z.string(),
    val: z.any(),
    meta: z.any()
});

export const z_node_filters = z.array(z_node_filter);
export const z_node_filters_group = z.object({
	id: z.string(),
	name: z.string(),
	filters: z_node_filters,
	data: z.array(z.record(z.string())).optional(), // it's the Model data [], all filter based on this are of type key === value
	enabled: z.boolean().optional(),
	static: z.boolean().optional(),
	live: z.boolean().optional(),
	realtime: z.boolean().optional(),
});
export const z_node_filters_groups = z.array(z_node_filters_group);
export const z_node_filters_groups_map = z.record(z_node_filters_groups);

export type T_NODE_FILTER = z.infer<typeof z_node_filter>;
export type T_NODE_FILTERS = z.infer<typeof z_node_filters>;
export type T_NODE_FILTERS_GROUP = z.infer<typeof z_node_filters_group>;
export type T_NODE_FILTERS_GROUPS = z.infer<typeof z_node_filters_groups>;
export type T_NODE_FILTERS_GROUPS_MAP = z.infer<typeof z_node_filters_groups_map>;