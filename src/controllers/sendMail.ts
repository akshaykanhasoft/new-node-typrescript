const nodemailer = require("nodemailer");
import config from '../config/config';
import { htmlTable } from '../html/htmlBodyTemplate/htmlTable'

const mailSendToUser = async (params: any) => {
    const hostname = config.mongo.email_host;
    const username = config.mongo.from_email;
    const password = config.mongo.email_password;
    const port = config.mongo.email_port;
    let image_url = config.mongo.image_url + params.profile_pics;
    const transporter = await nodemailer.createTransport({
        host: hostname,
        port: port,
        secure: false,
        auth: {
            user: username,
            pass: password
        }
    });

    //let getHtml = await returnHtml();
    let getHtml = await htmlTable(params);
    // send mail 
    var mailOptions = {
        from: '"Veer" <akshay.kanhasoft@gmail.com>',
        to: params.email,
        subject: 'Test Mail',        
        html: `${getHtml}`,
        // attachments: [{
        //     //'path': image_url,
        //     filename: params.profile_pics,
        //     path: image_url,
        //     cid: params.profile_pics,
        // }]
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log("get-error", error);
        } else {
            console.log("info", info.response);
        }
    })

    // console.log("Message sent: %s", info.response);
}

const returnHtml = async () => {
    let html =
        '<table style="width:100%">' +
        '<caption>registration details</caption>' +
        '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '</tr>' +
        '<tr>' +
        '<td>January</td>' +
        '<td>$100</td>' +
        '</tr>' +
        '<tr>' +
        '<td>February</td>' +
        '<td>$50</td>' +
        '</tr>' +
        '</table>';
    return html;
}

export { mailSendToUser };