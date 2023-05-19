import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import DatauriParser from "datauri/parser.js";
import path from "path";
import sharp from "sharp";
import cloudinary from "cloudinary";
cloudinary.config({
  secure: true,
  cloud_name: process.env.cloud_Name,
  api_key: process.env.API_key,
  api_secret: process.env.API_secret,
});

const router = express.Router();

function sendEmail(gmail, image, gcash) {
  return new Promise((resolve, reject) => {
    let html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
        background-color: #cccccc;
      }

      table {
        border-spacing: 0;
      }

      td {
        padding: 0;
      }

      img {
        border: 0;
      }

      .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #cccccc;
        padding-bottom: 60px;
      }

      .main {
        background-color: white;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-spacing: 0;
        font-family: sans-serif;
        color: #171a1b;
      }

      .two-columns {
        text-align: center;
        font-size: 0;
      }

      .two-columns .column {
        width: 100%;
        max-width: 300px;
        display: inline-block;
        vertical-align: top;
        text-align: center;
      }

      .two-columns.last {
        padding: 15px 0;
      }

      .two-columns .padding {
        padding: 20px;
      }

      .two-columns .content {
        font-size: 15px;
        line-height: 20px;
        text-align: left;
      }

      .two-columns img {
        border-radius: 10px;
      }
    </style>
  </head>
  <body>
    <center class="wrapper">
      <table class="main">
        <!-- TOP BORDER -->
        <tr>
          <td height="8" style="background-color: pink"></td>
        </tr>

        <!-- LOGO SECTION -->
        <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%">
              <th style="padding: 0 62px 10px; color: black">
                <h1>BAKED GOODIES BY H</h1>
              </th>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background-color: pink; color: black">
            <table width="100%">
              <tr>
                <td class="two-columns last">
                  <table class="column">
                    <tr>
                      <td class="padding">
                        <table class="content">
                          <tr>
                            <td>
                              <a href="#"
                                ><img
                                  src="cid:finishCake"
                                  alt="finish cake"
                                  width="260"
                                  style="max-width: 260px"
                              /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table class="column">
                    <tr>
                      <td class="padding">
                        <table class="content">
                          <tr>
                            <td>
                              <p style="font-weight: bold; font-size: 18px">
                                FINISHED CAKE
                              </p>
                              <p style="padding-bottom: 16px">
                                This is the proof of the finished product, you
                                can claim your cake now.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- TITLE, TEXT & BUTTON -->
        <tr>
          <td style="padding: 15px 0 15px; color: black">
            <table width="100%">
              <tr>
                <td style="text-align: center; padding: 15px">
                  <a href="#"
                    ><img
                      src="cid:payment"
                      alt="gcash"
                      width="260"
                      style="max-width: 260px"
                  /></a>
                  <p style="font-size: 20px; font-weight: bold">Scan to pay</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background-color: #26292b">
            <table width="100%">
              <tr>
                <td
                  style="text-align: center; padding: 45px 20px; color: #ffffff"
                >
                  <p style="padding: 10px">
                    If you are not satified, you can message us in our facebook
                    page.
                  </p>
                  <a href="https://www.facebook.com/BakedGoodiesbyH"
                    ><img
                      src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png"
                      alt="fb"
                      height="50em"
                  />Baked Goodies By H</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    let details = {
      from: process.env.email,
      to: gmail,
      subject: "Receipt",
      html: html,
      attachments: [
        {
          filename: "final cake",
          path: image,
          cid: "finishCake",
        },
        {
          filename: "Gcash",
          path: gcash,
          cid: "payment",
        },
      ],
    };

    mailTransporter.sendMail(details, function (err, info) {
      if (err) {
        console.log(err);
        return reject({ message: "An error has occured" });
      }
      return resolve({ message: "Email sucessfully sent" });
    });
  });
}

function sendEmail2(gmail, image, price) {
  return new Promise((resolve, reject) => {
    let html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
        background-color: #cccccc;
      }

      table {
        border-spacing: 0;
      }

      td {
        padding: 0;
      }

      img {
        border: 0;
      }

      .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #cccccc;
        padding-bottom: 60px;
      }

      .main {
        background-color: white;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-spacing: 0;
        font-family: sans-serif;
        color: #171a1b;
      }

      .two-columns {
        text-align: center;
        font-size: 0;
      }

      .two-columns .column {
        width: 100%;
        max-width: 300px;
        display: inline-block;
        vertical-align: top;
        text-align: center;
      }

      .two-columns.last {
        padding: 15px 0;
      }

      .two-columns .padding {
        padding: 20px;
      }

      .two-columns .content {
        font-size: 15px;
        line-height: 20px;
        text-align: left;
      }

      .two-columns img {
        border-radius: 10px;
      }
    </style>
  </head>
  <body>
    <center class="wrapper">
      <table class="main">
        <!-- TOP BORDER -->
        <tr>
          <td height="8" style="background-color: pink"></td>
        </tr>

        <!-- LOGO SECTION -->
        <tr>
          <td style="padding: 14px 0 4px">
            <table width="100%">
              <th style="padding: 0 62px 10px; color: black">
                <h1>BAKED GOODIES BY H</h1>
              </th>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background-color: pink; color: black">
            <table width="100%">
              <tr>
                <td class="two-columns last">
                  <table class="column">
                    <tr>
                      <td class="padding">
                        <table class="content">
                          <tr>
                            <td>
                              <a href="#"
                                ><img
                                  src="cid:finishCake"
                                  alt="finish cake"
                                  width="260"
                                  style="max-width: 260px"
                              /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table class="column">
                    <tr>
                      <td class="padding">
                        <table class="content">
                          <tr>
                            <td>
                              <p style="font-weight: bold; font-size: 18px">
                                FINISHED CAKE
                              </p>
                              <p style="padding-bottom: 16px">
                                This is the proof of the finished product, you
                                can claim your cake now.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>


        <tr>
          <td style="padding: 15px 0 50px">
            <table width="100%">
              <tr>
                <td style="text-align: center; padding: 15px">
                  <p style="font-size: 20px; font-weight: bold">Total Price: ${price}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background-color: #26292b">
            <table width="100%">
              <tr>
                <td
                  style="text-align: center; padding: 45px 20px; color: #ffffff"
                >
                  <p style="padding: 10px">
                    If you are not satified, you can message us in our facebook
                    page.
                  </p>
                  <a href="https://www.facebook.com/BakedGoodiesbyH"
                    ><img
                      src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png"
                      alt="fb"
                      height="50em"
                  />Baked Goodies By H</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    let details = {
      from: process.env.email,
      to: gmail,
      subject: "Receipt",
      html: html,
      attachments: [
        {
          filename: "final cake",
          path: image,
          cid: "finishCake",
        },
      ],
    };

    mailTransporter.sendMail(details, function (err, info) {
      if (err) {
        console.log(err);
        return reject({ message: "An error has occured" });
      }
      return resolve({ message: "Email sucessfully sent" });
    });
  });
}

const parser = new DatauriParser();

router.post("/", upload.array("image", 2), async (req, res) => {
  if (req.files === []) {
    return res.status(400).send("No file were uploaded");
  }
  const linkArray = [];

  for (let file of req.files) {
    const data = await sharp(file.buffer).webp({ quality: 30 }).toBuffer();
    const file64 = parser.format(
      path.extname(file.originalname).toString(),
      data
    );
    const result = await cloudinary.uploader.upload(file64.content);

    linkArray.push(result.url);
  }

  if (req.body.payment.toLowerCase() === "gcash") {
    const gmail = req.body.gmail;
    const image = linkArray[0];
    const gcash = linkArray[1];
    sendEmail(gmail, image, gcash)
      .then((response) => res.status(200).json(response.message))
      .catch((err) => res.status(500).json(err.message));
  } else if (req.body.payment.toLowerCase() === "cash on pickup") {
    const gmail = req.body.gmail;
    const price = req.body.price;
    const image = linkArray[0];

    sendEmail2(gmail, image, price)
      .then((response) => res.status(200).json(response.message))
      .catch((err) => res.status(500).json(err.message));
  }
});

export default router;
