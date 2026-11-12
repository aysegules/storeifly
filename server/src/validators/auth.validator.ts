import z from "zod";

const registerSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).max(100),
      email: z.email().min(6, "Email is required").max(100),
      password: z.string().min(6, "Password is required").max(20),
      confirmPassword: z
        .string()
        .min(6, "Password confirmation is required")
        .max(20),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.email().min(6, "Email is required").max(100),
    password: z.string().min(6, "Password is required").max(20),
  }),
});

type RegisterInput = z.infer<typeof registerSchema>["body"];
type Register = Omit<RegisterInput, "confirmPassword">;
type Login = z.infer<typeof loginSchema>["body"];

export type { Register, Login };
export { registerSchema, loginSchema };
