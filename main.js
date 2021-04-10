const request = require("request");
const cheerio = require("cheerio");

var machines = [
  {
    name: "南国育ち",
    numbers: [461, 462, 463, 464, 465, 466],
  },
  {
    name: "アリア",
    numbers: [24, 25],
  },
  {
    name: "大海物語4SP",
    numbers: [61, 62, 63, 64, 65, 66, 67, 68],
  },
  {
    name: "ｴｳﾞｧｼﾄ、新生 決戦",
    numbers: [91, 92],
  },
  {
    name: "劇場版まどか☆ﾏｷﾞｶ",
    numbers: [93, 94],
  },
  {
    name: "冬のｿﾅﾀ",
    numbers: [97, 98, 99, 100],
  },
  {
    name: "物語ｾｶﾝﾄﾞｼｰｽﾞﾝ",
    numbers: [101, 102, 103, 104, 105],
  },
  {
    name: "ﾓﾝｷｰﾀｰﾝV",
    numbers: [106, 107, 108],
  },
  {
    name: "笑ｩせぇるすまん",
    numbers: [109, 110],
  },
  {
    name: "無双3",
    numbers: [121, 122, 123, 124, 125],
  },
  {
    name: "Pｳﾙﾄﾗｾﾌﾞﾝ超乱舞",
    numbers: [128, 129, 130],
  },
  {
    name: "真･牙狼",
    numbers: [41, 42, 43],
  },
  {
    name: "AKB48 桜LIGHT",
    numbers: [141, 142],
  },
  {
    name: "わんわんﾊﾟﾗﾀﾞｲｽ",
    numbers: [145, 146],
  },
  {
    name: "戦国乙女6",
    numbers: [128, 129],
  },
  {
    name: "ﾓﾓｷｭﾝｿｰﾄﾞMC",
    numbers: [186],
  },
  {
    name: "P遠山の金さん2",
    numbers: [188],
  },
  {
    name: "ﾊｲｽｸｰﾙｵﾌﾞｻﾞﾃﾞｯﾄﾞ2",
    numbers: [192],
  },
  {
    name: "ﾄﾞﾗﾑ海物語INｼﾞｬﾊﾟﾝ",
    numbers: [198],
  },
  {
    name: "ﾓﾓｷｭﾝｿｰﾄﾞ甘",
    numbers: [206],
  },
  {
    name: "貞子 伽椰子 甘",
    numbers: [218],
  },
];

const machineNumbers = machines.reduce((prev, curr) => {
  return prev.concat(curr.numbers);
}, []);

const getData = (machineNumber) => {
  const url = `https://daidata.goraggio.com/100428/detail?unit=${machineNumber}`;
  return new Promise((resolve, reject) => {
    request(url, (e, response, body) => {
      if (e) {
        console.error(e);
      }
      try {
        const $ = cheerio.load(body);

        const machineTitle = $("#pachinkoTi>strong").text();

        const $jackpotNumbers = $(".Text-Red");
        const $rotationNumbers = $(".Text-Green");

        let rotationNumber = 0;

        // 当日の回転数を足す、当日の当たり数が0なら、前日のものに対して同様の処理をする。（これを3回繰り返す）
        for (let idx = 0; idx < 3; idx++) {
          rotationNumber += parseInt($($rotationNumbers[String(idx)]).text());
          const jackpotNumber = parseInt($($jackpotNumbers[String(idx)]).text());
          if (jackpotNumber !== 0) break;
        }

        console.log(`${machineTitle} ${rotationNumber}回転`);
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
