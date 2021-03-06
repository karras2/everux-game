/*jslint esversion: 6*/
/*global require, module, exports, console*/
/*jshint -W097*/

const n = {
  openshift: (id, container) =>
    `n-${id}-${container}.7e14.starter-us-west-2.openshiftapps.com`,
  glitch: id => `arras-io-${id}.glitch.me`,
  heroku: id => `arras-${id}.herokuapp.com`,
  wedeploy: (id, container) => `${id}-moxncet.wedeploy.io`,
  arras: (id, port = 5000) => `ip-${id}.arras.io:${port}`
};

let dayOfMonth = new Date().getDate();

const H = dayOfMonth >= 25 ? 3 : 0;
const G = dayOfMonth >= 25 ? 0 : 3;

const global = {
  help: {
  },
  // Main Customizable Keys
  KEY_AUTO_FIRE: 69,
  KEY_AUTO_SPIN: 67,
  KEY_OVER_RIDE: 82,
  KEY_LEVEL_UP: 78,
  KEY_SCREENSHOT: 81,
  KEY_UPGRADE_MAX: 77,
  KEY_CLASS_TREE: 89,
  // More Customizable Keys
  KEY_RECORD: 90,
  KEY_UP: 87,
  KEY_PING: 76,
  KEY_LEFT: 65,
  KEY_DOWN: 83,
  KEY_RIGHT: 68,
  // Keys
  KEY_ENTER: 13,
  KEY_CHAT: 13,
  KEY_SPAWN: 13,
  KEY_LEFT_ARROW: 37,
  KEY_UP_ARROW: 38,
  KEY_RIGHT_ARROW: 39,
  KEY_DOWN_ARROW: 40,
  KEY_UPGRADE_ATK: 49,
  KEY_UPGRADE_HTL: 50,
  KEY_UPGRADE_SPD: 51,
  KEY_UPGRADE_STR: 52,
  KEY_UPGRADE_PEN: 53,
  KEY_UPGRADE_DAM: 54,
  KEY_UPGRADE_RLD: 55,
  KEY_UPGRADE_MOB: 56,
  KEY_UPGRADE_RGN: 57,
  KEY_UPGRADE_SHI: 48,
  KEY_MOUSE_0: 32,
  KEY_MOUSE_1: 9,
  KEY_MOUSE_2: 16,
  KEY_FUCK_YOU: 192,
  KEY_TELEPORT: 84,
  KEY_RAINBOW: 86,
  KEY_MAZEWALL: 80,
  KEY_PASSIVE: 74,
  KEY_RESET: 70,
  KEY_CONTROL_ENTITY: 88,
  KEY_SUICIDE: 73,
  KEY_KILL_WITH_MOUSE: 66,
  KEY_CLASS_TREE: 89,
  KEY_UPGRADE_COLOR: 220,
  // Canvas
  screenWidth: window.innerWidth * window.devicePixelRatio,
  screenHeight: window.innerHeight * window.devicePixelRatio,
  gameWidth: 0,
  gameHeight: 0,
  xoffset: -0,
  yoffset: -0,
  gameStart: false,
  disconnected: false,
  died: false,
  kicked: false,
  continuity: false,
  startPingTime: 0,
  toggleMassState: 0,
  backgroundColor: "#f2fbff",
  lineColor: "#000000",
  showTree: false,
  scrollX: 0,
  smoothTree: 0,
  server: null,
  tankMenuColor: 100 + Math.round(Math.random() * 70),
  codeTable: [
    {
      z: "Private",
      xyz: "Local",
      glitch: "Glitch", /* glitch.me */
      aws: "AWS", /* c9users.io */
      heroku: "Heroku", /* heroku.com */
    },
    {
      unknown: ["Unknown", null],
      local: ["Localhost", null],
      dev: ["Developer", null],
      virginia: ["US East", -4],
      oregon: ["US West", -7],
      frankfurt: ["Europe", 2],
      la: ["US West", -7],
      germany: ["Europe", 2],
      london: ["Europe", 1],
      singapore: ["Asia", 8],
    }
  ],
  timezone: new Date().getTimezoneOffset() / -60,
  servers: [
    {
      id: "z",
      type: "0unk",
      name: "Private Server",
      code: "z-unknown",
      at: "private",
      untrusted: true
    },
    {
      visible: 1,
      id: "wa",
      type: "0unk",
      name: "Loading...",
      code: "heroku-virginia",
      at: "domatrix-server-a.herokuapp.com",
      secure: 1,
      prefer: true
    },
    {
      visible: 1,
      id: "ba",
      type: "0unk",
      name: "Loading...",
      code: "heroku-oregon",
      at: "zarplex-server-2.onrender.com",
      secure: 1,
      prefer: false
    },
    {
      visible: 1,
      id: "la",
      type: "0unk",
      name: "Loading...",
      code: "heroku-germany",
      at: "cohplex-server-2.onrender.com",
      secure: 1,
      prefer: false
    },
    {
      visible: 1,
      id: "va",
      type: "0unk",
      name: "Loading...",
      code: "heroku-germany",
      at: "zarplex-server-3.onrender.com",
      secure: 1,
      prefer: false
    }, 
  ]
    .map((data, i) => ({ data, i }))
    .sort((a, b) =>
      a.data.type < b.data.type ? -1 : b.data.type > a.data.type ? 1 : a.i - b.i
    )
    .map(({ data }) => data),
  partyLink: 0,
  mobile: /android|mobi/i.test(navigator.userAgent),
  showInvisible: false
};

window["Arras"] = (data = true) => data || global;
export { global };
