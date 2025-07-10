import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

export const loginUserSchema = z
  .object({
    email: z.string().email("Invalid email").optional(),
    phoneNumber: z
      .number()
      .min(1000000000, "Phone number too short")
      .max(999999999999999, "Phone number too long")
      .optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number is required",
    path: ["email"],
  });

export type RegisterUserBody = z.infer<typeof registerUserSchema>;
export type LoginUserBody = z.infer<typeof loginUserSchema>;
