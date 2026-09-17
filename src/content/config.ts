import { defineCollection, z } from "astro:content";

const diary = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		draft: z.boolean().default(false),
		thumbnail: z.string().optional(),
	}),
});

const tech = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).optional(),
		thumbnail: z.string().optional(),
	}),
});

const life = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).optional(),
		thumbnail: z.string().optional(),
	}),
});

const journey = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).optional(),
		thumbnail: z.string().optional(),
	}),
});

export const collections = { diary, tech, life, journey };
