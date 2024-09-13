"use server";
import { emailSchema } from "@app/_schemas/userInput";

// create a http post request to sendfox api to add a subscriber with first name and email address . It is a oath request with Bearer token which can be found in .env.local for the constant SENDFOX_KEY
export const addSubscriber = async (email, firstName) => {
  const emailParsed = emailSchema.safeParse(email);

  if (!emailParsed.success) {
    return { error: emailParsed.error.issues[0].message };
  }

  if (firstName === "" || firstName === null || firstName === undefined) {
    return { error: "First name is required" };
  }

  const response = await fetch("https://api.sendfox.com/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.SENDFOX_KEY}`,
    },
    body: JSON.stringify({
      email,
      first_name: firstName,
      lists: 256009,
    }),
  });
  return response.json();
};

// a successful return response
// Response:  {
//     id: 68374866,
//     email: 'warrenseah@flagforex.com',
//     first_name: 'Warren',
//     last_name: 'Seah',
//     ip_address: null,
//     unsubscribed_at: null,
//     bounced_at: null,
//     created_at: '2023-01-05T10:02:37.000000Z',
//     updated_at: '2024-08-29T10:48:57.000000Z',
//     form_id: null,
//     contact_import_id: null,
//     via_api: true,
//     last_opened_at: null,
//     last_clicked_at: null,
//     first_sent_at: null,
//     last_sent_at: null,
//     invalid_at: null,
//     inactive_at: null,
//     confirmed_at: null,
//     social_platform_id: null,
//     confirmation_sent_at: null,
//     confirmation_sent_count: 0,
//     created_ago: '1 year ago'
//   }

// A failed return response
// { email: [ 'The email must be a valid email address.' ] }
