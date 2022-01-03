//let global = __webpack_require__(/*! ./lib/global */ "./src/lib/global.js");
//let global = require('./lib/global.js')
import { global } from "./lib/global.js";

class Canvas {
  constructor() {
    this.target = global.target;
    this.socket = null;
    this.statMaxing = false;

    let cv = document.getElementById("gameCanvas");
    cv.width = global.screenWidth;
    cv.height = global.screenHeight;
    this.cv = cv;
  }
  init(control, socket) {
    this.control = control;
    this.socket = socket;
    let cv = this.cv;
    if (control === "joysticks") {
      this.controlTouch = null;
      this.movementTouch = null;
      this.movementTop = false;
      this.movementBottom = false;
      this.movementLeft = false;
      this.movementRight = false;
      cv.addEventListener("touchstart", e => this.touchStart(e), false);
      cv.addEventListener("touchmove", e => this.touchMove(e), false);
      cv.addEventListener("touchend", e => this.touchEnd(e), false);
      cv.addEventListener("touchcancel", e => this.touchEnd(e), false);
      this.autoUpgrade();
    } else {
      cv.addEventListener("mousedown", e => this.mouseDown(e), false);
      cv.addEventListener("mousemove", e => this.mouseMove(e), false);
      cv.addEventListener("mouseup", e => this.mouseUp(e), false);
    }
    cv.addEventListener("keydown", e => this.keyboardDown(e), false);
    cv.addEventListener("keyup", e => this.keyboardUp(e), false);
  }
  autoUpgrade() {
    let times = 60;
    let i = setInterval(() => {
      this.socket.talk("L");
      if (--times <= 0) clearInterval(i);
    }, 100);
  }
  emit(what) {
    this.socket.talk(what);
  }
  talk(why, what) {
    this.socket.talk(why, what);
  }
  spawn(as) {
    this.socket.talk("s", as, -1);
  }
  set(what, to) {
    this.socket.cmd.set(what, to);
  }
  keyboardDown(event) {
    switch (event.keyCode) {
      case global.KEY_SPAWN:
        if (global.died && (global.respawnOn <= Date.now() || event.shiftKey)) {
          this.spawn(global.playerName);
          global.died = false;
          if (!global.mobile) {
            aiptag.cmd.display.push(function() {
              aipDisplayTag.clear("arras-io_728x90");
            });
            let ad = document.getElementById("respawn-banner");
            if (ad) ad.style.display = "none";
          }
        }
        break; // Enter to respawn

      case global.KEY_UP_ARROW:
        if (!global.died && global.showTree) return global.scrollX = 0;
      case global.KEY_UP:
        this.set(0, true);
        break;
      case global.KEY_DOWN_ARROW:
        if (!global.died && global.showTree) return global.scrollX = 1;
      case global.KEY_DOWN:
        this.set(1, true);
        break;
      case global.KEY_LEFT_ARROW:
        if (!global.died && global.showTree) return global.scrollX -= global.scrollX <= 0 ? 0 : .0045;
      case global.KEY_LEFT:
        this.set(2, true);
        break;
      case global.KEY_RIGHT_ARROW:
        if (!global.died && global.showTree) return global.scrollX += global.scrollX >= 1 ? 0 : .0045;
      case global.KEY_RIGHT:
        this.set(3, true);
        break;
      case global.KEY_MOUSE_0:
        this.set(4, true);
        break;
      case global.KEY_MOUSE_1:
        this.set(5, true);
        break;
      case global.KEY_MOUSE_2:
        this.set(6, true);
        break;
      case global.KEY_UPGRADE_COLOR:
        if (global.died) return;
        if (global.tankMenuColor >= 186) global.tankMenuColor = 99;
        global.tankMenuColor += 1;
        break;
      case global.KEY_LEVEL_UP:
        this.emit("L");
        break;
    }
    if (event.ctrlKey || event.altKey) return;
    if (global.canSkill) {
      let i = this.statMaxing ? 12 : 1;
      do {
        switch (event.keyCode) {
          case global.KEY_UPGRADE_ATK:
            this.talk("x", 0);
            break;
          case global.KEY_UPGRADE_HTL:
            this.talk("x", 1);
            break;
          case global.KEY_UPGRADE_SPD:
            this.talk("x", 2);
            break;
          case global.KEY_UPGRADE_STR:
            this.talk("x", 3);
            break;
          case global.KEY_UPGRADE_PEN:
            this.talk("x", 4);
            break;
          case global.KEY_UPGRADE_DAM:
            this.talk("x", 5);
            break;
          case global.KEY_UPGRADE_RLD:
            this.talk("x", 6);
            break;
          case global.KEY_UPGRADE_MOB:
            this.talk("x", 7);
            break;
          case global.KEY_UPGRADE_RGN:
            this.talk("x", 8);
            break;
          case global.KEY_UPGRADE_SHI:
            this.talk("x", 9);
            break;
        }
      } while (--i);
    }
    if (!event.repeat) {
      switch (event.keyCode) {
        case global.KEY_AUTO_SPIN:
          this.talk("t", 0);
          break;
        case global.KEY_AUTO_FIRE:
          this.talk("t", 1);
          break;
        case global.KEY_OVER_RIDE:
          this.talk("t", 2);
          break;
        case global.KEY_REVERSE_MOUSE:
          this.talk("t", 3);
          break;
        case global.KEY_REVERSE_TANK:
          this.talk("t", 4);
          break;
        case global.KEY_UPGRADE_MAX:
          this.statMaxing = true;
          break;
        case global.KEY_FUCK_YOU:
          this.emit("0");
          break;
        case global.KEY_TELEPORT:
          this.emit("T");
          break;
        case global.KEY_SUICIDE:
          this.emit("K");
          break;
        case global.KEY_RESET:
          this.emit("X");
          break;
        case global.KEY_KILL_WITH_MOUSE:
          this.emit("Q");
          break;
        case global.KEY_MAZEWALL:
          this.emit("M");
          break;
        case global.KEY_PASSIVE:
          this.emit("J");
          break;
        case global.KEY_PING:
          global.showDebug = true;
          break;
        case global.KEY_CLASS_TREE:
          global.showTree = !global.showTree;
          break;
        case global.KEY_RECORD:
          if (this.cv.captureStream && window.MediaRecorder) {
            if (!this.videoRecorder) {
              let videoChunks = [];
              this.videoRecorder = new MediaRecorder(this.cv.captureStream(60));
              this.videoRecorder.ondataavailable = e =>
                videoChunks.push(e.data);
              this.videoRecorder.onstop = e => {
                let file = new Blob(videoChunks, {
                  type: this.videoRecorder.mimeType
                });
                videoChunks.length = 0;
                let objectURL = URL.createObjectURL(file);
                let element = document.createElement("a");
                element.style.display = "none";
                element.setAttribute("download", "video.webm");
                element.setAttribute("href", objectURL);
                document.body.appendChild(element);
                setTimeout(() => {
                  URL.revokeObjectURL(objectURL);
                  document.body.removeChild(element);
                }, 100);
                element.click();
              };
              global.messages.push({
                text: "Recorder initiated and started!",
                status: 2,
                alpha: 0,
                time: Date.now()
              });
              this.videoRecorder.start();
              break;
            } else
              switch (this.videoRecorder.state) {
                case "inactive":
                  global.messages.push({
                    text: "Recorder started!",
                    status: 2,
                    alpha: 0,
                    time: Date.now()
                  });
                  this.videoRecorder.start();
                  break;
                case "recording":
                  global.messages.push({
                    text: "Recorder stopped! Saving file...",
                    status: 2,
                    alpha: 0,
                    time: Date.now()
                  });
                  this.videoRecorder.stop();
                  break;
              }
          } else {
            global.messages.push({
              text: "Media recorder not supported in this browser!",
              status: 2,
              alpha: 0,
              time: Date.now()
            });
          }
          break;
        case global.KEY_SCREENSHOT:
          let data = this.cv.toDataURL();
          let byteString = atob(data.split(",")[1]);
          let type = data
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];

          let u8 = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++)
            u8[i] = byteString.charCodeAt(i);
          let objectURL = URL.createObjectURL(new Blob([u8], { type }));

          let element = document.createElement("a");
          element.style.display = "none";
          element.setAttribute("download", "screenshot.png");
          element.setAttribute("href", objectURL);
          document.body.appendChild(element);
          setTimeout(() => {
            URL.revokeObjectURL(objectURL);
            document.body.removeChild(element);
          }, 100);
          element.click();
          break;
      }
      if (global.canUpgrade) {
        switch (
          event.keyCode
          /*  case global.KEY_CHOOSE_1:  this.talk('U', 0); break;
          case global.KEY_CHOOSE_2:  this.talk('U', 1); break;
          case global.KEY_CHOOSE_3:  this.talk('U', 2); break;
          case global.KEY_CHOOSE_4:  this.talk('U', 3); break;
          case global.KEY_CHOOSE_5:  this.talk('U', 4); break;
          case global.KEY_CHOOSE_6:  this.talk('U', 5); break;
          case global.KEY_CHOOSE_7:  this.talk('U', 6); break;
          case global.KEY_CHOOSE_8:  this.talk('U', 7); break;
          case global.KEY_CHOOSE_9:  this.talk('U', 8); break;*/
        ) {
        }
      }
    }
  }
  keyboardUp(event) {
    switch (event.keyCode) {
      case global.KEY_UP_ARROW:
      case global.KEY_UP:
        this.set(0, false);
        break;
      case global.KEY_DOWN_ARROW:
      case global.KEY_DOWN:
        this.set(1, false);
        break;
      case global.KEY_LEFT_ARROW:
      case global.KEY_LEFT:
        this.set(2, false);
        break;
      case global.KEY_RIGHT_ARROW:
      case global.KEY_RIGHT:
        this.set(3, false);
        break;
      case global.KEY_MOUSE_0:
        this.set(4, false);
        break;
      case global.KEY_MOUSE_1:
        this.set(5, false);
        break;
      case global.KEY_MOUSE_2:
        this.set(6, false);
        break;
      case global.KEY_UPGRADE_MAX:
        this.statMaxing = false;
        break;
      case global.KEY_PING:
        global.showDebug = false;
        break;
    }
  }
  mouseDown(mouse) {
    switch (mouse.button) {
      case 0:
        let mpos = { x: mouse.clientX, y: mouse.clientY };
        let statIndex = global.clickables.stat.check(mpos);
        if (statIndex !== -1) this.talk("x", statIndex);
        else if (global.clickables.skipUpgrades.check(mpos) !== -1)
          global.clearUpgrades();
        else {
          let upgradeIndex = global.clickables.upgrade.check(mpos);
          if (upgradeIndex !== -1) this.talk("U", upgradeIndex);
          else this.set(4, true);
        }
        break;
      case 1:
        this.set(5, true);
        break;
      case 2:
        this.set(6, true);
        break;
    }
  }
  mouseMove(mouse) {
    if (global.player.x !== null) {
      this.target.x = mouse.clientX - global.player.x;
      this.target.y = mouse.clientY - global.player.y;
    }
    global.target = this.target;
    global.statHover =
      global.clickables.hover.check({ x: mouse.clientX, y: mouse.clientY }) ===
      0;
  }
  mouseUp(mouse) {
    switch (mouse.button) {
      case 0:
        this.set(4, false);
        break;
      case 1:
        this.set(5, false);
        break;
      case 2:
        this.set(6, false);
        break;
    }
  }
  touchStart(e) {
    e.preventDefault();
    if (global.died && global.respawnOn <= Date.now()) {
      this.spawn(global.playerName);
      this.autoUpgrade();
      global.died = false;
      return;
    }
    for (let touch of e.changedTouches) {
      let mpos = { x: touch.clientX, y: touch.clientY };
      let id = touch.identifier;

      let statIndex = global.clickables.stat.check(mpos);
      if (statIndex !== -1) this.talk("x", statIndex);
      else if (global.clickables.skipUpgrades.check(mpos) !== -1)
        global.clearUpgrades();
      else {
        let upgradeIndex = global.clickables.upgrade.check(mpos);
        if (upgradeIndex !== -1) this.talk("U", upgradeIndex);
        else {
          let onLeft = mpos.x < this.cv.width / 2;
          if (this.movementTouch === null && onLeft) {
            this.movementTouch = id;
          } else if (this.controlTouch === null && !onLeft) {
            this.controlTouch = id;
            this.set(4, true);
          }
        }
      }
    }
    this.touchMove(e);
  }
  touchMove(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
      let mpos = { x: touch.clientX, y: touch.clientY };
      let id = touch.identifier;

      if (this.movementTouch === id) {
        let x = mpos.x - (this.cv.width * 1) / 6;
        let y = mpos.y - (this.cv.height * 2) / 3;
        let norm = Math.sqrt(x * x + y * y);
        x /= norm;
        y /= norm;
        let amount = 0.3826834323650898; // Math.sin(Math.PI / 8)
        if (y < -amount !== this.movementTop)
          this.set(0, (this.movementTop = y < -amount));
        if (y > amount !== this.movementBottom)
          this.set(1, (this.movementBottom = y > amount));
        if (x < -amount !== this.movementLeft)
          this.set(2, (this.movementLeft = x < -amount));
        if (x > amount !== this.movementRight)
          this.set(3, (this.movementRight = x > amount));
      } else if (this.controlTouch === id) {
        this.target.x = (mpos.x - (this.cv.width * 5) / 6) * 4;
        this.target.y = (mpos.y - (this.cv.height * 2) / 3) * 4;
      }
    }
    global.target = this.target;
  }
  touchEnd(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
      let mpos = { x: touch.clientX, y: touch.clientY };
      let id = touch.identifier;

      if (this.movementTouch === id) {
        this.movementTouch = null;
        if (this.movementTop) this.set(0, (this.movementTop = false));
        if (this.movementBottom) this.set(1, (this.movementBottom = false));
        if (this.movementLeft) this.set(2, (this.movementLeft = false));
        if (this.movementRight) this.set(3, (this.movementRight = false));
      } else if (this.controlTouch === id) {
        this.controlTouch = null;
        this.set(4, false);
      }
    }
  }
}

export { Canvas };
