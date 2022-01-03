/*jslint esversion: 6*/
/*global require, module, exports, console*/
/*jshint -W097*/

var serverName = 'US FFA: Heroku-East';
document.getElementById('serverName').innerHTML = '<h4 class="nopadding">' + serverName + '</h4>';
const global = {
  help: {},
  // Keys and other mathematical constants
  KEY_ESC: 27,
  KEY_ENTER: 13,
  KEY_SPAWN: 13,
  KEY_CHAT: 13,
  KEY_FIREFOOD: 119,
  KEY_SPLIT: 32,
  KEY_LEFT: 65,
  KEY_UP: 87,
  KEY_RIGHT: 68,
  KEY_DOWN: 83,
  KEY_LEFT_ARROW: 37,
  KEY_UPGRADE_MAX: 77,
  KEY_UP_ARROW: 38,
  KEY_RIGHT_ARROW: 39,
  KEY_DOWN_ARROW: 40,
  KEY_AUTO_SPIN: 67,
  KEY_AUTO_FIRE: 69,
  KEY_OVER_RIDE: 82,
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
  KEY_MOUSE_1: 86,
  KEY_MOUSE_2: 16,
  KEY_DEBUG: 76,
  KEY_LEVEL_UP: 78,
  KEY_UPGRADE_COLOR: 88,
  KEY_TESTBED: 192,
  KEY_RAINBOW: 79,
  KEY_SCREENSHOT: 81,
  KEY_RECORD: 90,
  KEY_TELEPORT: 84,
  KEY_BASIC: 66,
  KEY_MAZEWALL: 74,
  KEY_PASSIVE: 70,
  KEY_CLASS_TREE: 85,
  KEY_KILL: 80,
  KEY_MULTIBOX: 71,
  KEY_DRAG_ENTITY: 73,
  KEY_CONTROL_POINT: 72,
  KEY_GROW: 187,
  KEY_SHRINK: 189,
  showTree: false,
  scrollX: 0,
  smoothTree: 0,
  
  // Canvas
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
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
  backgroundColor: '#f2fbff',
  lineColor: '#000000',
  showDebug: false,
  tankMenuColor: 100 + Math.round(Math.random() * 70),

  server: null,
  codeTable: [
    {
      z: "Private",
      local: "Local",
      dvi: "DVI",
      glitch: "Glitch",
      os: "OpenShift",
      heroku: "Heroku",
      linode: "Linode",
      vultr: "Vultr",
      buyvm: "BuyVM",
      hetzner: "Hetzner",
      ovh: "OVH",
      c9: "Cloud 9"
    },
    {
      unknown: ["Unknown", null],
      local: ["Local", null],
      va: ["US East", -4],
      oregon: ["US West", -7],
      frankfurt: ["Europe", 2],
      sv: ["US West", -7],
      la: ["US West", -7],
      de: ["Europe", 2],
      london: ["Europe", 1],
      singapore: ["Asia", 8],
      ct: ["US East", -4],
      us: ["US West", -4],
    }
  ],
  timezone: new Date().getTimezoneOffset() / -60,
  servers: [
    // Other
    {
      visible: 0,
      id: "z",
      type: "1unk",
      name: "Private",
      code: "z-unknown",
      at: "",
      secure: 1,
    },
    {  
      visible: 0,
      id: "p",
      type: "1unk",
      name: "Testing",
      code: "heroku-va",
      at: "domatrix-beta-server.glitch.me",
      secure: 1,
      prefer: true,
      testing: true   
    },
    {  
      visible: 1,
      id: "a",
      type: "1unk",
      name: "Shuffle A",
      code: "heroku-va",
      at: "domatrix-beta-server.glitch.me",
      secure: 1,
      prefer: true,
      testing: true   
    },
    {  
      visible: 1,
      id: "b",
      type: "1unk",
      name: "Shuffle B",
      code: "heroku-ct",
      at: "domatrix-beta-server.glitch.me",
      secure: 1,
      prefer: true,
      testing: true   
    },
    {  
      visible: 1,
      id: "c",
      type: "1unk",
      name: "2 Team Maze Domination",
      code: "heroku-ct",
      at: "domatrix-beta-server.glitch.me",
      secure: 1,
      prefer: true,
      testing: true
    },
    {  
      visible: 1,
      id: "d",
      type: "1unk",
      name: "Tag",
      code: "heroku-ct",
      at: "breezy-cloud-henley.glitch.me",
      secure: 1,
      prefer: true,
      testing: true   
    }
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
