import twilio from 'twilio';
import 'dotenv/config';

export const SendSMS = async (to, body) => {
    const accountSid = process.env.TWILIO_Account_SID;
    const authToken = process.env.TWILIO_Auth_Token;
    const fromNumber = process.env.TWILIO_Phone_Number;

    const client = twilio(accountSid, authToken);

    try {
        const message = await client.messages.create({
            body,
            from: fromNumber,
            to
        });

        console.log("Message sent: ", message.sid);
        return true;
    } catch (err) {
        console.log("Error sending SMS: ", err);
        return false;
    }
}