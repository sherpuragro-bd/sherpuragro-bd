export const emailTemplate = (body) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Order Confirmation</title>
        <style>
            body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            }
            .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            }
            .header {
            background-color: #0ebb7e;
            color: #ffffff;
            padding: 20px 40px;
            text-align: start;
            font-size: 24px;
            font-weight: bold;
            }
            .body {
            padding: 80px 40px;
            text-align: start;
            }
            .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #0ebb7e;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            }
            .footer {
            background-color: #253d4e;
            color: #ffffff;
            text-align: start;
            padding: 15px 40px;
            font-size: 14px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <img width="200" height="38" src="https://res.cloudinary.com/dogyg2j0h/image/upload/v1739214097/logo_2_hnzws6.png" alt="logo"/>
            </div>
            <div class="body">
                ${body}
            </div>
            <div class="footer">
            &copy; 2025 Sherpur Agro | All Rights Reserved
            </div>
        </div>
        </body>
        </html>
    `;
};
