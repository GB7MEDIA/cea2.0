import twilio from 'twilio';
import 'dotenv/config';

const accountSid = process.env.TWILIO_Account_SID;
const authToken = process.env.TWILIO_Auth_Token;
const fromNumber = process.env.TWILIO_Phone_Number;

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: fromNumber,
      to,
    });

    console.log(`SMS sent to ${to}: SID - ${message.sid}`);
    return true;
  } catch (err) {
    console.error(`Error sending SMS to ${to}: ${err.message}`);
    return false;
  }
};

export default sendSMS;
