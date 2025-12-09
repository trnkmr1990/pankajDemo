const { test } = require("@playwright/test");
const fs = require("fs");
const pdf = require("pdf-parse");

test("Read PDF content", async ({ page }) => {
  const dataBuffer = fs.readFileSync(
    "downloads/Playwright_Coding_Questions.pdf"
  );
  await pdf(dataBuffer).then(function (data) {
    fs.writeFileSync("downloads/output.txt", data.text);
  });
  let expected_export_values = fs.readFileSync(
    "./ExportData/expected.txt",
    "utf-8"
  );
  //const pdfData = await pdf(dataBuffer);
  console.log(expected_export_values);
});
