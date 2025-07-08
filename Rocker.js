module.exports = {
  name: "MouseRocker",
  description: "Opera GX–style rocker gestures → simulate Alt+Left/Right in Discord desktop.",
  authors: [{ name: "EA", id: "742452943340699742" }],
  version: "1.0.0",

  start() {
    let leftDown = false, rightDown = false;

    this.mouseDown = (e) => {
      if (e.button === 0) leftDown = true;
      if (e.button === 2) rightDown = true;

      if (rightDown && e.button === 0) this.simulateAltArrow("ArrowLeft");
      if (leftDown && e.button === 2) this.simulateAltArrow("ArrowRight");
    };

    this.mouseUp = (e) => {
      if (e.button === 0) leftDown = false;
      if (e.button === 2) rightDown = false;
    };

    window.addEventListener("mousedown", this.mouseDown);
    window.addEventListener("mouseup", this.mouseUp);
  },

  stop() {
    window.removeEventListener("mousedown", this.mouseDown);
    window.removeEventListener("mouseup", this.mouseUp);
  },

  simulateAltArrow(key) {
    const opts = { key, code: key, keyCode: key === "ArrowLeft" ? 37 : 39, altKey: true, bubbles: true, cancelable: true };
    document.dispatchEvent(new KeyboardEvent("keydown", opts));
    document.dispatchEvent(new KeyboardEvent("keyup", opts));
    console.log(`MouseRocker: sent Alt+${key}`);
  }
};
