const progressBar = document.querySelector("#hilite-progress-bar-budget div");
const hiliteProgressBarBudget = document.querySelector(
  "#hilite-progress-bar-budget"
);
const hiliteProgressBarBudgetWidth = hiliteProgressBarBudget.offsetWidth;

const hiliteProgressBarBudgetGreenBar = document.querySelector(
  "#hilite-progress-bar-budget div.progress-bar"
);
const hiliteProgressBarBudgetMarkerImg = document.querySelector(
  "#hilite-progress-bar-budget-marker img "
);
let hiliteProgressBarBudgetMarkerImgLeft;
let isMouseDownHiliteProgressBarBudgetMarker = false;

const hiliteProgressBarBudgetMarkerGreenRightCircle = document.querySelector(
  ".hilite-progress-bar-budget-marker-green-circle.right-circle"
);
const resetButton = document.querySelector("#reset");

let currentWidthPercentHiliteProgressBarBudgetGreenBar;
let offsetHiliteProgressBarBudgetMarkerImg = [0];


function setValueInProgressBar(newValue) {
  progressBar.style.width = newValue + "%";
}

resetButton.addEventListener("click", () => {
  hiliteProgressBarBudgetMarkerImg.style.left = "200px";
});

//==============================
// start darg market

hiliteProgressBarBudgetMarkerImg.addEventListener(
  "mousedown",
  function (e) {
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
    if (isMouseDownHiliteProgressBarBudgetMarker) {
      const hiliteProgressBarBudgetMarkerImgStyleLeft =
        e.clientX + offsetHiliteProgressBarBudgetMarkerImg[0];
      setText(
        "current-market",
        " = " + hiliteProgressBarBudgetMarkerImgStyleLeft + "px"
      );
      setText(
        "right-circle",
        " = " + hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + "px"
      );
      if (hiliteProgressBarBudgetMarkerImgStyleLeft <= -10) {
        isMouseDownHiliteProgressBarBudgetMarker = false;
        return;
      }
      if (
        hiliteProgressBarBudgetMarkerImgStyleLeft >=
        hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + 5
      ) {
        isMouseDownHiliteProgressBarBudgetMarker = false;
        return;
      }
      changeProgressBarValue(hiliteProgressBarBudgetMarkerImgStyleLeft);
      hiliteProgressBarBudgetMarkerImg.style.left =
        hiliteProgressBarBudgetMarkerImgStyleLeft + "px";
    }
  },
  true
);
// end darg market
//==============================

const changeProgressBarValue = (newValue) => {
  const newValuePercent = (newValue * 100) / hiliteProgressBarBudgetWidth;
  currentWidthPercentHiliteProgressBarBudgetGreenBar =
    hiliteProgressBarBudgetGreenBar.style.width.replace("%", "");
  console.log("===2==");
  console.log(newValuePercent);
  console.log(currentWidthPercentHiliteProgressBarBudgetGreenBar);
  console.log("===2==");
  setValueInProgressBar(newValuePercent);
};

const setText = (id, text) => {
  document.querySelector("#" + id).textContent = text;
};
