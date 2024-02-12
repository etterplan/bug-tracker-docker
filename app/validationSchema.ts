import { z } from "zod";

export const issuseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535)
});

export const patchIssuseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  assignedToUserId: z.string().min(1, 'AssignedToUserId is required').max(255).optional().nullable(),
});

export const commentSchema = z.object({
  text: z.string().min(1, 'Comment text is required.').max(255)
});


export const projectSchema = z.object({
  name: z.string().min(1, 'Projetc is required').max(255),
  description: z.string().min(1, 'Description is required').max(255)
});