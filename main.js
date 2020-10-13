const request = require("request");
const cheerio = require("cheerio");
const machines = [
  {
    name: "Pぱちんこ仮面ﾗｲﾀﾞｰ轟音M6",
    numbers: [21, 22, 23, 24, 25, 26, 27, 28],
  },
  {
    name: "呪いの7日間2",
    numbers: [41, 42, 43],
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
    name: "PﾓﾓｷｭﾝｿｰﾄﾞMC",
    numbers: [147, 148],
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
        kaitenNumber += parseInt($(".Text-Big19.Text-Green").text()); // 本日の回転数を足す

        if (atariNumberToday === 0) {
          const lastKaitenNumberYesterday = parseInt(
            $("span:contains('前日最終スタート')")
              .parent()
              .next()
              .text()
              .slice(0, -6)
            // $("span:contains('前日最終スタート')")
            //   .parent()
            //   .next()
            //   .text()
            //   .slice(0, -7)
          );
          kaitenNumber += lastKaitenNumberYesterday;
        }

        console.log(`${machineTitle} ${kaitenNumber}回転`);

        // let neraimeKaitenNumber = 0;
        // if (21 <= machineNumber && machineNumber <= 28) {
        //   neraimeKaitenNumber = 400;
        // }
        // if (101 <= machineNumber && machineNumber <= 104) {
        //   neraimeKaitenNumber = 350;
        // }
        // if (147 <= machineNumber && machineNumber <= 148) {
        //   neraimeKaitenNumber = 200;
        // }
        // if (kaitenNumber > neraimeKaitenNumber) {
        //   console.log(
        //     `＊${machineTitle}の${machineNumber}番台は${kaitenNumber}回転のため打てます。＊`
        //   );
        // }
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
