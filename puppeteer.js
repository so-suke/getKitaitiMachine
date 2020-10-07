// puppeteer のライブラリを使いますよ
const puppeteer = require("puppeteer");
const machineNumbers = [
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  101,
  102,
  103,
  104,
  147,
  148,
];

const getData = async (page, machineNumber) => {
  await page.goto(`https://daidata.goraggio.com/100428/detail?unit=${machineNumber}`);
  let kaitenNumber = 0;
  kaitenNumber += await page.$eval(".Text-Big19.Text-Green", (el) =>
    parseInt(el.innerText)
  );
  const lastKaitenNumberYesterday = await page.$eval(
    ".overviewTable3 tr:nth-child(2) td:nth-child(4)",
    (el) => {
      return parseInt(el.innerText);
    }
  );

  console.log(kaitenNumber);
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (let machineNumber of machineNumbers) {
    await getData(page, machineNumber);
  }
  await browser.close();
})();
