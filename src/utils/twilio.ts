const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

require('dotenv').config()
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken)
const client = twilio(accountSid, authToken);

export const messageService = async (message: string | object, phone: string) =>{
    console.log(phone)
    await client.messages.create({
        body: message,
        from: "+15415075852",
        to: `+258${phone}`,
    });
}