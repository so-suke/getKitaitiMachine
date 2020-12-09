const request = require("request");
const cheerio = require("cheerio");

const machines = [
  {
    name: "Pぱちんこ仮面ﾗｲﾀﾞｰ轟音M6",
    numbers: [21, 22, 23, 24, 25],
  },
  {
    name: "呪いの7日間2",
    numbers: [41, 42, 43],
  },
  {
    name: "劇場版まどか☆ﾏｷﾞｶ",
    numbers: [91, 92, 93, 94],
  },
  {
    name: "新必殺仕置人TURBO",
    numbers: [98, 99, 100],
  },
  {
    name: "真･牙狼",
    numbers: [101, 102, 103, 104],
  },
  {
    name: "ｴｳﾞｧﾝｹﾞﾘｵﾝｼﾄ､新生決戦",
    numbers: [105, 106, 107],
  },
  {
    name: "Pﾊｲｽｸｰﾙｵﾌﾞｻﾞﾃﾞｯﾄﾞ2",
    numbers: [111, 112, 113],
  },
  {
    name: "Pｳﾙﾄﾗｾﾌﾞﾝ超乱舞",
    numbers: [126, 127, 128, 129, 130],
  },
  {
    name: "ｺﾞﾙｺﾞ",
    numbers: [141, 142],
  },
  {
    name: "結城友奈は勇者である",
    numbers: [143, 144],
  },
  {
    name: "PﾓﾓｷｭﾝｿｰﾄﾞMC",
    numbers: [147, 148],
  },
  {
    name: "ﾄﾞﾗﾑ海物語INｼﾞｬﾊﾟﾝ",
    numbers: [198],
  },
];

const machineNumbers = machines.reduce((prev, curr) => {
  return prev.concat(curr.numbers);
}, []);

// 今日の大当たり回数が0なら・前日の回転数も足したものを表示、対象とする。

const getData = (machineNumber) => {
  const url = `https://daidata.goraggio.com/100428/detail?unit=${machineNumber}`;
  return new Promise((resolve, reject) => {
    request(url, (e, response, body) => {
      if (e) {
        console.error(e);
      }
      try {
        const $ = cheerio.load(body); //bodyの読み込み
        const machineTitle = $("#pachinkoTi>strong").text();
        let kaitenNumber = 0;
        const atariNumberToday = parseInt($(".Text-Big25.Text-Red").text()); // 本日の大当たり回数
        const $textGreens = $(".Text-Green");
        kaitenNumber += parseInt($($textGreens["0"]).text()); // 本日の回転数を足す

        if (atariNumberToday === 0) {
          // const lastKaitenNumberYesterday = parseInt($("span:contains('前日最終スタート')").parent().next().text().slice(0, -7));
          const lastKaitenNumberYesterday = parseInt($($(".Text-Green")["1"]).text());
          // console.log(lastKaitenNumberYesterday);
          kaitenNumber += lastKaitenNumberYesterday;
        }

        console.log(`${machineTitle} ${kaitenNumber}回転`);
        resolve();
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  });
};

(async () => {
  for (let machineNumber of machineNumbers) {
    await getData(machineNumber);
  }
})();
