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
    name: "海SP",
    numbers: [61, 62, 63, 64, 65, 66, 67, 68],
  },
  {
    name: "ｴｳﾞｧ甘",
    numbers: [91, 92],
  },
  {
    name: "まどまぎ甘",
    numbers: [93, 94],
  },
  {
    name: "冬ソナ",
    numbers: [97, 98, 99, 100],
  },
  {
    name: "物語2nd",
    numbers: [101, 102, 103, 104, 105],
  },
  {
    name: "モンキー",
    numbers: [106, 107, 108],
  },
  {
    name: "笑う",
    numbers: [109, 110],
  },
  {
    name: "無双3",
    numbers: [121, 122, 123, 124, 125],
  },
  {
    name: "乙女6",
    numbers: [128, 129],
  },
  {
    name: "牙狼",
    numbers: [41, 42, 43],
  },
  {
    name: "AKB甘",
    numbers: [141, 142],
  },
  {
    name: "わんﾊﾟﾗ",
    numbers: [145, 146],
  },
  {
    name: "ﾓﾓｷｭﾝ199",
    numbers: [186],
  },
  {
    name: "金さん",
    numbers: [188],
  },
  {
    name: "hotd",
    numbers: [192],
  },
  {
    name: "超乱舞",
    numbers: [197],
  },
  {
    name: "ﾄﾞﾗﾑ海",
    numbers: [198],
  },
  {
    name: "ﾓﾓｷｭﾝ甘",
    numbers: [206],
  },
  {
    name: "貞 伽椰 甘",
    numbers: [218],
  },
  {
    name: "ガンツ",
    numbers: [134, 135, 136, 137, 138],
  },
];

const getData = (machineName, machineNumber) => {
  const url = `https://daidata.goraggio.com/100428/detail?unit=${machineNumber}`;
  return new Promise((resolve, reject) => {
    request(url, (e, response, body) => {
      if (e) {
        console.error(e);
      }
      try {
        const $ = cheerio.load(body);

        const $jackpotNumbers = $(".Text-Red");
        const $rotationNumbers = $(".Text-Green");

        let rotationNumber = 0;

        // 当日の回転数を足す、当日の当たり数が0なら、前日のものに対して同様の処理をする。（これを3回繰り返す）
        for (let idx = 0; idx < 3; idx++) {
          rotationNumber += parseInt($($rotationNumbers[String(idx)]).text());
          const jackpotNumber = parseInt($($jackpotNumbers[String(idx)]).text());
          if (jackpotNumber !== 0) break;
        }

        console.log(`${machineNumber}番台 ${machineName} ${rotationNumber}回転`);
        resolve();
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  });
};

(async () => {
  for (const machine of machines) {
    for (const machineNumber of machine.numbers) {
      await getData(machine.name, machineNumber);
    }
  }
})();
