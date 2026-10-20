// Type Check
export function checkType(type: string) {
  if (type === "VERIFY") {
    return "Verify Your Email";
  } else if (type === "RESET_PASSWORD") {
    return "Reset your password";
  }
}

export function checkTypeAndReturnComponent(
  type: string,
  verification_link: string,
) {
  if (type === "VERIFY") {
    const veryfcationComponent = `<div style="text-center; padding: 20px 0;">
<a href=${verification_link} style="background-color: #007bff; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-family: sans-serif;">Verify Your Email Address</a>
</div>
<p style="color: #777; font-size: 12px; text-align: center;">
If the button above doesn't work, copy and paste this link into your web browser:<br>
<a href=${verification_link} style="color: #007bff;">{{verification_link}}</a>
<p> ${verification_link} </p>
</p>
Thanks again,
The Testing Team`;
    return veryfcationComponent;
  } else if (type === "RESET_PASSWORD") {
    const resetPasswordComponent = `<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width:600px) {
        h1 { font-size: 24px !important; line-height: 24px !important; }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Helvetica', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Trouble signing in? Reset your password easily.
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#f4f4f4" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 10px 10px;">
                        <a href="#" target="_blank" style="color: #111111; font-family: 'Helvetica', Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 700; text-decoration: none;">
                            Testing
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 40px 30px 20px 30px; color: #111111; font-family: 'Helvetica', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 400; line-height: 30px;">
                      <h1 style="font-size: 28px; font-weight: 700; margin: 0;">Forgot your password?</h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                        <p style="margin: 0;">We received a request to reset the password for your account associated with this email address. Don't worry, it happens to the best of us!</p>
                    </td>
                </tr>
                <!-- BULLETPROOF BUTTON -->
                <tr>
                    <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td align="center" style="padding: 20px 30px 30px 30px;">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="border-radius: 3px;" bgcolor="#28a745">
                                              <a href=${verification_link} target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 3px; border: 1px solid #28a745; display: inline-block; font-weight: bold;">Reset Password</a>
                                              ${verification_link}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- COPY -->
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                        <p style="margin: 0;">This link is valid for the next 60 minutes. If you did not request this password reset, please disregard this email and your account will remain secure.</p>
                    </td>
                </tr>
                <!-- COPY -->
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Helvetica', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                        <p style="margin: 0;">Cheers,<br>The [Company Name] Team</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <!-- ADDRESS -->
                <tr>
                    <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #aaaaaa; font-family: 'Helvetica', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;">
                        <p style="margin: 0;">You received this email because of a recent password reset request for your account.<br>[Company Address/Info, e.g., 123 Main St, San Francisco, CA 94105]</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>`;
    return resetPasswordComponent;
  }
}
