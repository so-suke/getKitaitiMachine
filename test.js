let processingCnt = 0;

const processing = () => {
  if (processingCnt === 2) {
    console.log("succeeded");
    return;
  }
  processingCnt++;
  throw "failed";
};

// // エラーが出ても3回まで実行する。3回実行しても駄目なら諦める。
for (let idx = 0; idx < 3; idx++) {
  try {
    processing();
    break;
  } catch (error) {
    console.log(error);
  }
}
