import * as z from "zod";

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .trim()
  .toLowerCase()
  .email({ message: "Must be a valid email." });

// zod parsed obj { success: true, data: 'XXXXXXXXXXX' }
// console.log("passwordParsed: ", passwordParsed);
// if error message is passwordParsed.error.issues[0].message
