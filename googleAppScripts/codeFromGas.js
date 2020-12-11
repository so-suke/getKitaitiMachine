function sendLine(message) {
  // LINEから取得したトークン
  let tokenLine = "3yWTz4kNtQF4uZtmCrJBOszK0KocwezS8yPbpKabtv7";
  let options = {
    method: "post",
    headers: {
      Authorization: "Bearer " + tokenLine,
    },
    payload: {
      message: message,
    },
  };

  let url = "https://notify-api.line.me/api/notify";
  UrlFetchApp.fetch(url, options);
}

let sendCnt = 0;

function sendLineCore(message) {
  try {
    sendLine(message);

    sendCnt++;
    if (sendCnt === 3) return;
  } catch (err) {
    console.log(err);
    sendLineCore(message);
  }
}

let totalMessage = "\n";

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

function getData(machineNumber) {
  const url = "https://daidata.goraggio.com/100428/detail?unit=" + machineNumber;
  return new Promise((resolve, reject) => {
    const html = UrlFetchApp.fetch(url).getContentText("UTF-8");

    const $ = Cheerio.load(html);

    const machineTitle = $("#pachinkoTi>strong").text();

    const $jackpotNumbers = $(".Text-Red");
    const $rotationNumbers = $(".Text-Green");

    let rotationNumber = 0;

    for (let idx = 0; idx < 3; idx++) {
      rotationNumber += parseInt($($rotationNumbers[String(idx)]).text());
      const jackpotNumber = parseInt($($jackpotNumbers[String(idx)]).text());
      if (jackpotNumber !== 0) break;
    }

    totalMessage += `${machineTitle} ${rotationNumber}回転\n`;

    resolve();
  });
}

function scrape() {
  (async () => {
    for (let machineNumber of machineNumbers) {
      await getData(machineNumber);
    }
    console.log(totalMessage);
    sendLineCore(totalMessage);
  })();
}
