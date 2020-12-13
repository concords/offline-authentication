const { GoogleSpreadsheet } = require('google-spreadsheet');

async function writeEmailToSheet(email) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({ email });
};



module.exports = async (req, res) => {
  if (req.query.email) {
    await writeEmailToSheet(req.query.email);
  }

  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  })
}
