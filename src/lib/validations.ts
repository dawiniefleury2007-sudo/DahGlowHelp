import { z } from 'zod';
export const contactSchema=z.object({name:z.string().trim().min(2,'Please enter your full name.').max(100),email:z.string().email('Enter a valid email address.'),order:z.string().max(80).optional(),category:z.string().min(1,'Select a topic.'),subject:z.string().trim().min(4,'Add a short subject.').max(160),message:z.string().trim().min(15,'Please include a little more detail.').max(5000),website:z.string().max(0)});
export type ContactValues=z.infer<typeof contactSchema>;
export const loginSchema=z.object({email:z.string().email('Enter your authorized email.'),password:z.string().optional(),code:z.string().optional()});
export const contentSchema=z.object({title:z.string().trim().min(3,'At least three characters are required.'),body:z.string().trim().min(10,'Please add your content.'),categoryId:z.string(),excerpt:z.string(),published:z.boolean(),featured:z.boolean(),tags:z.string(),seoTitle:z.string(),seoDescription:z.string()});
