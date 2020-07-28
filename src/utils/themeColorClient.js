import client from "webpack-theme-color-replacer/client";
import forElementUI from "webpack-theme-color-replacer/forElementUI";

let curColor = "#ffffff";
// 動態切換主題色
export function changeThemeColor(newColor) {
  const options = {
    newColors: [...forElementUI.getElementUISeries(newColor), "#ff0000", "#ffff00"],
  };
  return client.changer.changeColor(options, Promise)
    .then(() => {
      curColor = newColor;
      localStorage.setItem("theme_color", curColor);
    });
}

export function initThemeColor() {
  const savedColor = localStorage.getItem("theme_color");
  if (savedColor) {
    curColor = savedColor;
    changeThemeColor(savedColor);
  }
}
