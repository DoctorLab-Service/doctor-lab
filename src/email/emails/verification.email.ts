import { EmailMessage } from './../dtos/message.dto'

export const VerificationEmailMessage = (
    to: string, // Change to your recipient
    fullname: string,
    code: string,
): EmailMessage => ({
    to,
    from: process.env.SENDGRID_EMAIL,
    subject: 'Verification Email',
    html: `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="utf-8"> <!-- utf-8 works for most cases -->
            <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
            <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
            <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

            <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">

            <!-- CSS Reset : BEGIN -->
            <style>

                /* What it does: Remove spaces around the email design added by some email clients. */
                /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
                html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            background: #f1f1f1;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors],  /* iOS */
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }

        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display: none !important;
        }

        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }
        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }
        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }

        </style>

            <!-- CSS Reset : END -->

            <!-- Progressive Enhancements : BEGIN -->
        <style>

        .bg_white{
            background-color: #ffffff;
        }

        /*BUTTON*/
        .btn{
            padding: 10px 15px;
            display: inline-block;
        }
        .btn.btn-primary{
            border-radius: 5px;
            background-color: #0D53FC;
            color: #ffffff;
            transition:  1s;
        }
        .btn.btn-primary:hover{
            background-color: #FFA500;
            color: #222222;
            transition:  1s;
        }

        h1,h2,h3,h4,h5,h6{
            font-family: 'Lato', sans-serif;
            color: #000000;
            margin-top: 0;
            font-weight: 400;
        }

        body{
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.8;
            color: rgba(0,0,0,.4);
        }

        a{
            color: #30e3ca;
        }

        table{
        }
        /*LOGO*/

        .logo h1{
            margin: 0;
        }
        .logo h1 a{
            color: #0D53FC;
            font-size: 24px;
            font-weight: 700;
            font-family: 'Lato', sans-serif;
        }

        /*HERO*/
        .hero{
            position: relative;
            z-index: 0;
            padding: 30px 15px !important;
        }

        .hero .text{
            color: rgba(0,0,0,.3);
        }
        .hero .text h2{
            color: #000;
            font-size: 40px;
            margin-bottom: 0;
            font-weight: 400;
            line-height: 1.4;
        }
        .hero .text h3{
            font-size: 24px;
            font-weight: 300;
        }
        .hero .text h2 span{
            font-weight: 600;
            color: #30e3ca;
        }

        </style>


        </head>

        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
            <div  style="max-width: 600px; margin: 0 auto; box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .1);" class="email-container">
                <!-- BEGIN BODY -->
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                    <tr>
                        <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="logo" style="text-align: center;">
                                        <h1>
                                            <a href="#">
                                                <img src="https://res.cloudinary.com/dki4lxdki/image/upload/v1654596955/doctorlab/app/full_logo_gmwj76.png" alt="Doctor Lab">
                                            </a>
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr><!-- end tr -->
                    <tr>
                        <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                            <table>
                                <tr>
                                    <td>
                                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                                            <h2  style="font-size: 32px; margin-bottom: 10px;;">Hi ${fullname}!</h2>
                                            <h2 style="font-size: 24px; line-height: 28px;">Thanks for getting started with our service!</h2>
                                            <h3 style="font-size: 18px; line-height: 24px; margin-top: 10px;">We need a little more information to complete your registration, including a confirmation of your email address.</h3>
                                            <h3 style="font-size: 18px; line-height: 24px; margin-top: 10px;">Click below to confirm your email address:</h3>
                                            <p><a href="${
                                                process.env.SERVER_HOST + process.env.SERVER_PORT
                                            }/confirm?${code}" class="btn btn-primary">Verification Email</a></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr><!-- end tr -->
                    <!-- 1 Column Text + Button : END -->
                    <tr>
                        <td class="bg_light" style="text-align: center;">
                            <p style="color: rgba(0,0,0,.8)">2022 &copy; <a href="#" style="color: rgba(0,0,0,.8);">DoctorLab</a></p>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
    `,
})
