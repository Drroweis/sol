import { z } from 'zod';

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3).max(30)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const validateRegistration = (data) => {
  return registrationSchema.parse(data);
};

export const validateLogin = (data) => {
  return loginSchema.parse(data);
};