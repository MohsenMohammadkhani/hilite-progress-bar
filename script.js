const progressBar = document.querySelector("#hilite-progress-bar-budget div");
const hiliteProgressBarBudget = document.querySelector(
  "#hilite-progress-bar-budget"
);
const hiliteProgressBarBudgetWidth = hiliteProgressBarBudget.offsetWidth;
const hiliteProgressBarBudgetGreenBar = document.querySelector(
  "#hilite-progress-bar-budget div.progress-bar"
);
const hiliteProgressBarBudgetMarkerImgContainer = document.querySelector(
  "#hilite-progress-bar-budget-marker"
);
const hiliteProgressBarBudgetMarkerImg = document.querySelector(
  "#hilite-progress-bar-budget-marker img "
);
const hiliteProgressBarBudgetMarkerGreenRightCircle = document.querySelector(
  ".hilite-progress-bar-budget-marker-green-circle.right-circle"
);

const budgeDailyElement = document.querySelector("#budge-daily");
const budgeMonthlyElement = document.querySelector("#budge-monthly");
const countShowElement = document.querySelector("#count-show");
const timeShowElement = document.querySelector("#time-show");

const minBudgeDaily = 50 * 1000;
const maxBudgeDaily = 1 * 1000 * 1000;
const coefficientConvertMinBudgeMonthlyToCountShow = 0.029;
const coefficientConvertMinBudgeMonthlyToTimeShow = 0.004;

let currentWidthPercentHiliteProgressBarBudgetGreenBar;
let offsetHiliteProgressBarBudgetMarkerImg = [0];
let hiliteProgressBarBudgetMarkerImgLeft;
let isMouseDownHiliteProgressBarBudgetMarker = false;
let activeInMobileInMobile = false;
let currentXMobile;
let initialXMobile;
let xOffsetMobile = 0;

function setValueInProgressBar(newValue) {
  progressBar.style.width = newValue + "%";
}

const toFormatFinanceNumber = (number) => {
  return new Intl.NumberFormat().format(number).replace(".", ",");
};

function toPersianNum(num, dontTrim) {
  if (num == null) {
    return;
  }

  var i = 0,
    dontTrim = dontTrim || false,
    num = dontTrim ? num.toString() : num.toString().trim(),
    len = num.length,
    res = "",
    pos,
    persianNumbers =
      typeof persianNumber == "undefined"
        ? ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
        : persianNumbers;

  for (; i < len; i++)
    if ((pos = persianNumbers[num.charAt(i)])) res += pos;
    else res += num.charAt(i);

  return res;
}

//==============================
// start darg market on desktop

hiliteProgressBarBudgetMarkerImg.addEventListener(
  "mousedown",
  function (e) {
    e.preventDefault();
    isMouseDownHiliteProgressBarBudgetMarker = true;
    offsetHiliteProgressBarBudgetMarkerImg = [
      hiliteProgressBarBudgetMarkerImg.offsetLeft - e.clientX,
    ];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isMouseDownHiliteProgressBarBudgetMarker = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (e) {
    e.preventDefault();
    if (!isMouseDownHiliteProgressBarBudgetMarker) {
      return;
    }

    const hiliteProgressBarBudgetMarkerImgStyleLeft =
      e.clientX + offsetHiliteProgressBarBudgetMarkerImg[0];
    if (
      checkMarketWantsMoveFromBorderDesktop(
        hiliteProgressBarBudgetMarkerImgStyleLeft
      )
    ) {
      isMouseDownHiliteProgressBarBudgetMarker = false;
      return;
    }

    changeProgressBarValue(hiliteProgressBarBudgetMarkerImgStyleLeft);
    changeBudgeDaily(hiliteProgressBarBudgetMarkerImgStyleLeft);
    hiliteProgressBarBudgetMarkerImg.style.left =
      hiliteProgressBarBudgetMarkerImgStyleLeft + "px";
  },
  true
);

const checkMarketWantsMoveFromBorderDesktop = (
  hiliteProgressBarBudgetMarkerImgStyleLeft
) => {
  if (hiliteProgressBarBudgetMarkerImgStyleLeft <= -10) {
    return true;
  }
  if (
    hiliteProgressBarBudgetMarkerImgStyleLeft >=
    hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + 5
  ) {
    return true;
  }
  return false;
};
// end darg market on desktop
//==============================

//==============================
// start darg market on mobile

hiliteProgressBarBudgetMarkerImgContainer.addEventListener(
  "touchstart",
  dragMobileStart,
  false
);
hiliteProgressBarBudgetMarkerImgContainer.addEventListener(
  "touchend",
  dragMobileEnd,
  false
);
hiliteProgressBarBudgetMarkerImgContainer.addEventListener(
  "touchmove",
  dragMobile,
  false
);

function dragMobileStart(e) {
  initialXMobile = e.touches[0].clientX - xOffsetMobile;
  if (e.target === hiliteProgressBarBudgetMarkerImg) {
    activeInMobile = true;
  }
}

function dragMobileEnd() {
  initialXMobile = currentXMobile;
  activeInMobile = false;
}

function dragMobile(e) {
  if (!activeInMobile) {
    return;
  }
  e.preventDefault();
  currentXMobile = e.touches[0].clientX - initialXMobile;

  xOffsetMobile = currentXMobile;

  if (checkMarketWantsMoveFromBorderMobile(currentXMobile)) {
    return;
  }

  changeProgressBarValue(currentXMobile);
  changeBudgeDaily(currentXMobile)
  hiliteProgressBarBudgetMarkerImg.style.left = currentXMobile + "px";
}

const checkMarketWantsMoveFromBorderMobile = (currentXMobile) => {
  if (currentXMobile < -5) {
    return true;
  }

  if (
    hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + 5 <
    currentXMobile
  ) {
    return true;
  }
  return false;
};

// end darg market on mobile
//==============================

const initMaxAndMinBudge = () => {
  document.querySelector("#min-budge-daily").textContent = toPersianNum(
    toFormatFinanceNumber(minBudgeDaily)
  );
  document.querySelector("#max-budge-daily").textContent = toPersianNum(
    toFormatFinanceNumber(maxBudgeDaily)
  );
  budgeDailyElement.textContent = toPersianNum(
    toFormatFinanceNumber(minBudgeDaily)
  );
  const minBudgeMonthly = minBudgeDaily * 30;

  budgeMonthlyElement.textContent = toPersianNum(
    toFormatFinanceNumber(minBudgeMonthly)
  );
  countShowElement.textContent = toPersianNum(
    toFormatFinanceNumber(
      minBudgeMonthly * coefficientConvertMinBudgeMonthlyToCountShow
    )
  );
  timeShowElement.textContent = toPersianNum(
    toFormatFinanceNumber(
      minBudgeMonthly * coefficientConvertMinBudgeMonthlyToTimeShow
    )
  );
};

initMaxAndMinBudge();

const changeBudgeDaily = (hiliteProgressBarBudgetMarkerImgStyleLeft) => {
  if (!checkValidValueProgressBar(hiliteProgressBarBudgetMarkerImgStyleLeft)) {
    return;
  }

  let budgeDaily = calculateBudgetDaily(
    hiliteProgressBarBudgetMarkerImgStyleLeft
  );

  if (budgeDaily < minBudgeDaily) {
    budgeDaily = minBudgeDaily;
  }
  setNumberToBudgeDailyElement(budgeDaily);
};

function calculateBudgetDaily(hiliteProgressBarBudgetMarkerImgStyleLeft) {
  const totalProgressBarBudgetStyleLeft =
    hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft;
  const percentProgressBarBudgetStyleLeft = Math.ceil(
    (hiliteProgressBarBudgetMarkerImgStyleLeft * 100) /
      totalProgressBarBudgetStyleLeft
  );
  return Math.ceil((percentProgressBarBudgetStyleLeft * maxBudgeDaily) / 100);
}

function setNumberToBudgeDailyElement(budgeDaily) {
  budgeDailyElement.textContent = toPersianNum(
    toFormatFinanceNumber(budgeDaily)
  );
  const budgeMonthly = budgeDaily * 30;
  setNumberToBudgeMonthlyElement(budgeMonthly);
  setNumberToCountShowElement(budgeMonthly);
  setNumberToTimeShowElement(budgeMonthly);
}

function setNumberToBudgeMonthlyElement(budgeMonthly) {
  budgeMonthlyElement.textContent = toPersianNum(
    toFormatFinanceNumber(budgeMonthly)
  );
}

function setNumberToCountShowElement(budgeMonthly) {
  countShowElement.textContent = toPersianNum(
    toFormatFinanceNumber(
      budgeMonthly * coefficientConvertMinBudgeMonthlyToCountShow
    )
  );
}

function setNumberToTimeShowElement(budgeMonthly) {
  timeShowElement.textContent = toPersianNum(
    toFormatFinanceNumber(
      Math.floor(
        (budgeMonthly * coefficientConvertMinBudgeMonthlyToTimeShow) / 60
      )
    )
  );
}

const checkValidValueProgressBar = (
  hiliteProgressBarBudgetMarkerImgStyleLeft
) => {
  if (hiliteProgressBarBudgetMarkerImgStyleLeft <= 0) {
    setNumberToBudgeDailyElement(minBudgeDaily);
    return false;
  }

  if (
    hiliteProgressBarBudgetMarkerImgStyleLeft >
    hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft
  ) {
    setNumberToBudgeDailyElement(maxBudgeDaily);
    return false;
  }
  return true;
};

const changeProgressBarValue = (newValue) => {
  const newValuePercent = (newValue * 100) / hiliteProgressBarBudgetWidth;
  currentWidthPercentHiliteProgressBarBudgetGreenBar =
    hiliteProgressBarBudgetGreenBar.style.width.replace("%", "");
  setValueInProgressBar(newValuePercent);
};
