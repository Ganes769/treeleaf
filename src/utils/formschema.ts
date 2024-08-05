import { z } from "zod";
import { FormValueType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const schema: z.ZodType<FormValueType> = z.object({
  Name: z.string().min(1, { message: "Name is required" }),
  Email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Valid Email is required" }),
  PhoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .regex(
      /^\d{7}$/,
      "Phone number must contain only number with exactly 7 digits"
    ),
  City: z.string().optional(),
  District: z.string().optional(),
  Province: z.string().optional(),
  Country: z.string().min(1, { message: "Country is required" }),
  DOB: z
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "Date of Birth must be a valid date",
    })
    .optional(),
  image: z
    .instanceof(File, { message: "Profile picture is required" })
    .refine((file) => file?.size > 0, {
      message: "File cannot be empty",
    })
    .refine((file) => file.type === "image/png", {
      message: "Only PNG images are allowed",
    }),
  // id: z.number().int().positive().optional(),
});
