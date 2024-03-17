import { z } from "zod";

export const LoginFormDataSchema = z.object({
  email: z.string().email("Email Not Valid").min(3, "Email not Valid"),
  password: z.string().min(8, "Invalid Password"),
});

export const FirstTimeLoginSchema = z
  .object({
    currentPassword: z.string().nonempty("Current Password cannot be empty").min(8, "Password Length must be greater than 8"),
    password: z
      .string()
      .nonempty("Password cannot be empty")
      .min(8, "Password Length must be greater than 8")
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      ),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password cannot be empty")
      .min(8, "Password Length must be greater than 8")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
  });