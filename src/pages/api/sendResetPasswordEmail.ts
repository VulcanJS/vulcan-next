import { NextApiRequest, NextApiResponse } from "next";
import { encryptSession } from "~/api/passport/iron";

export default async function sendResetPasswordEmail(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const email = req.body?.email;
        if (!email) {
            res.status(500).end("email not found");
        }
        // create the url
        const token = await encryptSession({ email });
        // TODO: put the app URL here, maybe imported from src/pages/vns/debug/about.tsx but it doesn't seems complete right now
        const url = `rootUrl/reset-password/${token}`        

        // send the mail
        console.log(`MAIL: reset password for the email ${email}\nwith the url ${url}`); //TODO: send the real email
        res.status(200).send({ done: true });
    } catch (error) {
        console.error(error);
        res.status(500).end(error.message);
    }
}
