/*global require, console*/
/*jshint -W097*/
/*jshint browser: true*/
"use strict";

function lerp(a, b, x) {
  return a + x * (b - a);
}
const camera = {
  time: 0,
  x: 0,
  y: 0,
  fov: 10000,
  vx: 0,
  vy: 0,
}

let amongUs = new Image()
amongUs.src = '1639967759218.png'

var gradientrandomizer = Math.floor(Math.random() * 75);
var tankMenuScheme = [ "#fe0e00", "#ff1c00", "#ff2a00", "#ff3800", "#ff4600", "#ff5500", "#ff6300", "#ff7100", "#ff7f00", "#ff8d00", "#ff9b00", "#ffaa00", "#ffb800", "#ffc600", "#ffd400", "#ffe200", "#fff000", "#ffff00", "#f0fe00", "#e2ff00", "#d4ff00", "#c6ff00", "#b8ff00", "#aaff00", "#9bff00", "#8dff00", "#7fff00", "#71ff00", "#63ff00", "#54ff00", "#46ff00", "#38ff00", "#2aff00", "#1cff00", "#0eff00", "#00ff00", "#00ff0f", "#00ff20", "#00ff33", "#00ff48", "#00ff61", "#00ff80", "#00ffa3", "#00ffcc", "#00ffff", "#00ccff", "#00a3ff", "#007eff", "#0866ff", "#0048ff", "#0033ff", "#0020ff", "#000fff", "#0000ff", "#0e00fe", "#1c00ff", "#2a00ff", "#3800ff", "#4600ff", "#5500ff", "#6300ff", "#7100ff", "#7f00ff", "#8d00ff", "#9b00ff", "#aa00ff", "#b800ff", "#c600ff", "#d400ff", "#e200ff", "#f000ff", "#ff00ff", "#fe00f0", "#ff00e2", "#ff00d4", "#ff00c6", "#ff00b8", "#ff00aa", "#ff009b", "#ff008d", "#ff007f", "#ff0071", "#ff0063", "#ff0054", "#ff0046", "#ff0038", "#ff002a", "#ff001c", "#ff000e", "#ff0000", "#fe0e00", "#ff1c00", "#ff2a00", "#ff3800", "#ff4600", "#ff5500", "#ff6300", "#ff7100", "#ff7f00", "#ff8d00", "#ff9b00", "#ffaa00", "#ffb800", "#ffc600", "#ffd400", "#ffe200", "#fff000", "#ffff00", "#f0fe00", "#e2ff00", "#d4ff00", "#c6ff00", "#b8ff00", "#aaff00", "#9bff00", "#8dff00", "#7fff00", "#71ff00", "#63ff00", "#54ff00", "#46ff00", "#38ff00", "#2aff00", "#1cff00", "#0eff00", "#00ff00", "#00ff0f", "#00ff20", "#00ff33", "#00ff48", "#00ff61", "#00ff80", "#00ffa3", "#00ffcc", "#00ffff", "#00ccff", "#00a3ff", "#007eff", "#0061ff", "#0048ff", "#0033ff", "#001eff", "#000dff", "#0000ff", "#0e00fe", "#1c00ff", "#2a00ff", "#3800ff", "#4600ff", "#5500ff", "#6300ff", "#7100ff", "#7f00ff", "#8d00ff", "#9b00ff", "#aa00ff", "#b800ff", "#c600ff", "#d400ff", "#e200ff", "#f000ff", "#ff00ff", "#fe00f0", "#ff00e2", "#ff00d4", "#ff00c6", "#ff00b8", "#ff00aa", "#ff009b", "#ff008d", "#ff007f", "#ff0071", "#ff0063", "#ff0054", "#ff0046", "#ff0038", "#ff002a", "#ff001c", "#ff000e", "#ff0000" ];

// Fundamental requires <3
import { Canvas } from './canvas.js';
import { protocol } from './lib/fasttalk.js';
import { util } from './lib/util.js';
import { global } from './lib/global.js';

window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());

/*let serverIP = [];
let serverPort = [];
  let socket = new WebSocket('http://' + serverIP + '.' + serverPort);
      window.WebSocket = window.WebSocket || window.MozWebSocket;


   serverIP = 'arraz',
    serverPort = 'io',
    //still get it to have current link
    */

gtag('config', 'UA-120544149-1');

let adblock = false
let adblockInterval = null

// Get color
var config = {
    graphical: {
        screenshotMode: false,
        borderChunk: 6,
        barChunk: 5,
        mininumBorderChunk: 3,
        darkBorders: false,
        fancyAnimations: true,
        colors: 'normal',
        pointy: true,
        fontSizeBoost: 1,
        shieldbars: false,
        neon: false,
    },
    gui: {
        expectedMaxSkillLevel: 9,
    },
    lag: {
        memory: 60,
    },
};

// Color functions
let mixColors = (() => {
    /** https://gist.github.com/jedfoster/7939513 **/
    function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
    function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal
    return (color_2, color_1, weight = 0.5) => {
        if (weight === 1) return color_1;
        if (weight === 0) return color_2;
        var col = "#";
        for(var i = 1; i <= 6; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue, skip the '#'
            var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
                v2 = h2d(color_2.substr(i, 2)),
                // combine the current pairs from each source color, according to the specified weight
                val = d2h(Math.floor(v2 + (v1 - v2) * weight));

            while(val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit
            col += val; // concatenate val to our new color string
        }
        return col; // PROFIT!
    };
})();
function getColor(colorNumber) {
    switch (colorNumber) {
        // light
        case 0: return color.teal;
        case 1: return color.lgreen;
        case 2: return color.orange;
        case 3: return color.yellow;
        case 4: return color.lavender;
        case 5: return color.pink;
        case 6: return color.vlgrey;
        case 7: return color.lgrey;
        case 8: return color.guiwhite;
        case 9: return color.black;
        // dark
        case 10: return color.blue;
        case 11: return color.green;
        case 12: return color.red;
        case 13: return color.gold;
        case 14: return color.purple;
        case 15: return color.magenta;
        case 16: return color.grey;
        case 17: return color.dgrey;
        case 18: return color.white;
        case 19: return color.guiblack;
        // special
        case 20: return (Date.now() % 300 < 150) ? color.blue : color.red;
       case 21:
		  	return '#1058D3';
		  case 22:
		  	return '#8534E2';
		  case 23:
		  	return '#FF1493';
		  case 24:
		  	return '#FF4500';
		  case 25:
		  	return '#EFC74B';
		  case 26:
		  	return '#B9E87E';
		  case 27:
		  	return '#EFC74B';
		  case 28:
		  	return '#A00A00';
		  case 29:
			  return '#E7896D';
		  case 30:
			  return '#8D6ADF';
      case 31:
        return '#EAB57A';
      case 'rainbow':
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
        //rainboww
        
      case 34:
        return '#ff0000';
      case 35:
        return '#ff2b00';
      case 36:
        return '#ff5500';
      case 37:
        return '#ff8000';
      case 38:
        return '#ffaa00';
      case 39:
        return '#ffd500';
      case 40:
        return '#ffff00';
      case 41:
        return '#d4ff00';
      case 42:
        return '#aaff00';
      case 43:
        return '#80ff00';
      case 44:
        return '#55ff00';
      case 45:
        return '#2bff00';
      case 46:
        return '#00ff00';
      case 47:
        return '#00ff2a';
      case 48:
        return '#00ff55';
      case 49:
        return '#00ff80';
      case 50:
        return '#00ffaa';
      case 51:
        return '#00ffd5';
      case 52:
        return '#00ffff';
      case 53:
        return '#00d5ff';
      case 54:
        return '#00aaff';
      case 55:
        return '#0080ff';
      case 56:
        return '#0055ff';
      case 57:
        return '#002aff';
      case 58:
        return '#0000ff';
      case 59:
        return '#2b00ff';
      case 60:
        return '#5500ff';
      case 61:
        return '#8000ff';
      case 62:
        return '#aa00ff';
      case 63:
        return '#d400ff';
      case 64:
        return '#ff00ff';
      case 65:
        return '#ff00d4';
      case 66:
        return '#ff00aa';
      case 67:
        return '#ff0080';
      case 68:
        return '#ff0055';
      case 69:
        return '#ff002b';
         case 70:
        return '#15ea48';
      case 71:
        return '#860705';
        
        default: return color.grey;
    }
}
function getColorDark(givenColor) {
    let dark = (config.graphical.neon) ? color.white : color.black;
    if (config.graphical.darkBorders) return dark;
    return mixColors(givenColor, dark, color.border);
}
function getZoneColor(cell) {
    switch (cell) {
    case 'bas1': case 'bap1': case 'dom1': case 'pro1': return color.blue
    case 'bas2': case 'bap2': case 'dom2': case 'pro2': return color.green
    case 'bas3': case 'bap3': case 'dom3': case 'pro3': return color.red
    case 'bas4': case 'bap4': case 'dom4': case 'pro4': return color.pink
      case 'domx': case 'dom0':  case 'out0': case 'war0': return color.yellow
        case 'weto': return "#00FFFF"
        case 'bas8': return color.orange
        case 'bas5': return color.pink
        case 'bas7': return color.teal
        case 'bas6':  ctx.globalAlpha = 1
        return color.guiblack
         case 'bap8': return color.orange
        case 'bap5': return color.pink
        case 'bap7': return color.teal
        case 'bap6':  ctx.globalAlpha = 1
        return color.guiblack
          case 'flag': return color.gold
        case 'galx': return mixColors(color.purple, color.guiblack, 1/3)
    case 'port':
        ctx.globalAlpha = 1
        return color.black
    case 'edge':
        return mixColors(color.white, color.guiblack, 1/3)
    case 'dor1':
        return color.vlgrey
    case 'nest': return color.purple
         case 'lava': return color.pink
         case 'bot1': return color.yellow
         case 'dom3': return color.red
        case 'jugg': return color.guiblack
    default: return color.white
    }
}
function setColor(context, givenColor) {
    if (config.graphical.neon) {
        context.fillStyle = getColorDark(givenColor);
        context.strokeStyle = givenColor;
    } else {
        context.fillStyle = givenColor;
        context.strokeStyle = getColorDark(givenColor);
    }
}

// Get mockups <3
var mockups = [];
// Mockup functions
function getEntityImageFromMockup(index, color = mockups[index].color) {
    let mockup = mockups[index];
    return {
        time: 0,
        index: index,
        x: mockup.x,
        y: mockup.y,
        vx: 0,
        vy: 0,
        size: mockup.size,
        realSize: mockup.realSize,
        color: color,
        render: { status: {
            getFade: () => { return 1; },
            getColor: () => { return '#FFFFFF'; },
            getBlend: () => { return 0; },
            health: { get: () => { return 1; }, },
            shield: { get: () => { return 1; }, },
        }, },
        facing: mockup.facing,
        shape: mockup.shape,
        name: mockup.name,
        score: 0,
        tiggle: 0,
        layer: mockup.layer,
        guns: { length: mockup.guns.length, getPositions: () => Array(mockup.guns.length).fill(0), update: () => {}, },
        turrets: mockup.turrets.map((t) => {
            let o = getEntityImageFromMockup(t.index);
            o.realSize = o.realSize / o.size * mockup.size * t.sizeFactor;
            o.size = mockup.size * t.sizeFactor;
            o.angle = t.angle;
            o.offset = t.offset;
            o.direction = t.direction;
            o.facing = t.direction + t.angle;
           o.color = t.color;
            return o;
        }),
    };
}

// Define clickable regions
global.clickables = (() => {
    let Region = (() => {
        // Protected classes
        function Clickable() {
            let region = {
                x: 0, y: 0, w: 0, h: 0,
            };
            let active = false;
            return {
                set: (x, y, w, h) => {
                    region.x = x;
                    region.y = y;
                    region.w = w;
                    region.h = h;
                    active = true;
                },
                check: target => {
                    let dx = Math.round(target.x - region.x);
                    let dy = Math.round(target.y - region.y);
                    return active && dx >= 0 && dy >= 0 && dx <= region.w && dy <= region.h;
                },
                hide: () => { active = false; },
            };
        }
        // Return the constructor
        return (size) => {
            // Define the region
            let data = [];
            for (let i=0; i<size; i++) { data.push(Clickable()); }
            // Return the region methods
            return {
                place: (index, ...a) => {
                    if (index >= data.length) { console.error(index, data); throw new Error('Trying to reference a clickable outside a region!'); }
                    data[index].set(...a);
                },
                hide: () => {
                    for (let r of data) r.hide();
                },
                check: x => {
                    return data.findIndex(r => { return r.check(x); });
                }
            };
        };
    })();
    return {
        stat: Region(10),
        upgrade: Region(100),
        hover: Region(1),
        skipUpgrades: Region(1),
    };
})();
global.statHover = false;

// Prepare stuff
/*var player = { //Set up the player
    id: -1,
    cx: global.screenWidth / 2,
    cy: global.screenHeight / 2,
    vx: 0,
    vy: 0,
    renderx: global.screenWidth / 2,
    rendery: global.screenHeight / 2,
    renderv: 1,
    slip: 0,
    view: 1,
    time: 0,
    screenWidth: global.screenWidth,
    screenHeight: global.screenHeight,
    target: {x: global.screenWidth / 2, y: global.screenHeight / 2}
};*/

const Integrate = class {
  constructor(dataLength) {
    this.dataLength = dataLength
    this.elements = {}
  }
  update(delta, index = 0) {
    let deletedLength = delta[index++]
    for (let i = 0; i < deletedLength; i++)
      delete this.elements[delta[index++]]
    let updatedLength = delta[index++]
    for (let i = 0; i < updatedLength; i++) {
      let id = delta[index++]
      let data = delta.slice(index, index + this.dataLength)
      index += this.dataLength
      this.elements[id] = data
    }
    return index
  }
  entries() {
    return Object.entries(this.elements).map(([id, data]) => ({ id: +id, data }))
  }
}

const Minimap = class {
  constructor(speed = 250) {
    this.speed = speed
    this.map = {}
    this.lastUpdate = Date.now()
  }
  update(elements) {
    this.lastUpdate = Date.now()
    for (let [key, value] of Object.entries(this.map))
      if (value.now) {
        value.old = value.now
        value.now = null
      } else {
        delete this.map[key]
      }

    for (let element of elements)
      if (this.map[element.id]) {
        this.map[element.id].now = element
      } else {
        this.map[element.id] = {
          old: null,
          now: element
        }
      }
  }
  get() {
    let state = Math.min(1, (Date.now() - this.lastUpdate) / this.speed)
    let stateOld = 1 - state
    return Object.values(this.map).map(({ old, now }) => {
      if (!now)
        return {
          type: old.type,
          id: old.id,
          x: old.x,
          y: old.y,
          color: old.color,
          size: old.size,
          alpha: stateOld,
        }
      if (!old)
        return {
          type: now.type,
          id: now.id,
          x: now.x,
          y: now.y,
          color: now.color,
          size: now.size,
          alpha: state,
        }
      return {
        type: now.type,
        id: now.id,
        x: state * now.x + stateOld * old.x,
        y: state * now.y + stateOld * old.y,
        color: now.color,
        size: state * now.size + stateOld * old.size,
        alpha: 1,
      }
    })
  }
}
// Build the leaderboard object
const Entry = class {
  constructor(to) {
    this.score = Smoothbar(0, 10)
    this.update(to)
  }
  update(to) {
    this.name = to.name
    this.bar = to.bar
    this.color = to.color
    this.index = to.index
    this.score.set(to.score)
    this.old = false
  }
  publish() {
    let ref = mockups[this.index]
    return {
      image: getEntityImageFromMockup(this.index, this.color),
      position: ref.position,
      barColor: getColor(this.bar),
      label: this.name ? this.name + ' - ' + ref.name : ref.name,
      score: this.score.get(),
    }
  }
}
const Leaderboard = class {
  constructor() {
    this.entries = {}
  }
  get() {
    let out = []
    let max = 1
    for (let value of Object.values(this.entries)) {
      let data = value.publish()
      out.push(data)
      if (data.score > max)
        max = data.score
    }
    out.sort((a, b) => b.score - a.score)
    return { data: out, max }
  }
  update(elements) {
    elements.sort((a, b) => b.score - a.score)
    for (let value of Object.values(this.entries))
      value.old = true
    for (let element of elements)
      if (this.entries[element.id])
        this.entries[element.id].update(element)
      else
        this.entries[element.id] = new Entry(element)
    for (let [id, value] of Object.entries(this.entries))
      if (value.old)
        delete this.entries[id]
  }
}
var entities = [],
    users = [],
    minimapAllInt = new Integrate(5),
    minimapTeamInt = new Integrate(3),
    leaderboardInt = new Integrate(5),
    minimap = new Minimap(200),
    leaderboard = new Leaderboard(),
    upgradeSpin = 0,
    messages = global.messages = [],
      // =============================
    // Chat System.
    // =============================
    chatMessages = [],
    // =============================    


    messageFade = 0,
    newMessage = 0,
    metrics = global.metrics = {
        latency: [],
        lag: 0,
        rendertime: 0,
        updatetime: 0,
        lastlag: 0,
        lastrender: 0,
        rendergap: 0,
        lastuplink: 0,
    },
    lastPing = 0,
    renderTimes = 0,
    updateTimes = 0,
    target = {x: 0, y: 0},
    roomSetup = [ [ 'norm'] ],
    roomSpeed = 0;
var gui = {
    getStatNames: num => {
        switch (num) {
            case 1: return [
                'Body Damage',
                'Max Health',
                'Bullet Speed',
                'Bullet Health',
                'Bullet Penetration',
                'Bullet Damage',
                'Engine Acceleration',
                'Movement Speed',
                'Shield Regeneration',
                'Shield Capacity'
            ];
            case 2: return [
                'Body Damage',
                'Max Health',
                'Drone Speed',
                'Drone Health',
                'Drone Penetration',
                'Drone Damage',
                'Respawn Rate',
                'Movement Speed',
                'Shield Regeneration',
                'Shield Capacity'
            ];
            case 3: return [
                'Body Damage',
                'Max Health',
                'Drone Speed',
                'Drone Health',
                'Drone Penetration',
                'Drone Damage',
                'Max Drone Count',
                'Movement Speed',
                'Shield Regeneration',
                'Shield Capacity'
            ];
            case 4: return [
                'Body Damage',
                'Max Health',
                'Swarm Speed',
                'Swarm Health',
                'Swarm Penetration',
                'Swarm Damage',
                'Reload',
                'Movement Speed',
                'Shield Regeneration',
                'Shield Capacity'
            ];
            case 5: return [
                'Body Damage',
                'Max Health',
                'Placement Speed',
                'Trap Health',
                'Trap Penetration',
                'Trap Damage',
                'Reload',
                'Movement Speed',
                'Shield Regeneration',
                'Shield Capacity'
            ];
            case 6: return [
                'Body Damage',
                'Max Health',
                'Weapon Speed',
                'Weapon Health',
                'Weapon Penetration',
                'Weapon Damage',
                'Reload',
                'Movement Speed',
                'Shield Regeneration',
                'Shield Capacity'
            ];
            default: return [
                'Body Damage',
                'Max Health',
                'Bullet Speed',
                'Bullet Health',
                'Bullet Penetration',
                'Bullet Damage',
                'Reload',
                'Movement Speed',
                'Shield Regeneration',
                'Shield Capacity'
            ];
        }
    },
  skills: [{
    amount: 0,
    color: 'pink',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'purple',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'teal',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'blue',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'green',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'lgreen',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'yellow',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'gold',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'orange',
    cap: 1,
    softcap: 1,
  }, {
    amount: 0,
    color: 'red',
    cap: 1,
    softcap: 1,
  }],
  points: 0,
  upgrades: [],
  playerid: -1,
  __s: (() => {
    let truscore = 0;
    let levelscore = 0;
    let deduction = 0;
    let level = 0;
    let score = Smoothbar(0, 10);
    return {
      setScore: s => {
        if (s) {
          score.set(s);
          if (deduction > score.get()) {
            level = 0;
            deduction = 0;
          }
        } else {
          score = Smoothbar(0, 10);
          level = 0;
        }
      },
      update: () => {
        levelscore = Math.ceil(1.8 * Math.pow(level + 1, 1.8) - 2 * level + 1);
        if (score.get() - deduction >= levelscore) {
          deduction += levelscore;
          level += 1;
        }
      },
      getProgress: () => {
        return (levelscore) ? Math.min(1, Math.max(0, (score.get() - deduction) / levelscore)) : 0;
      },
      getScore: () => score.get(),
      getLevel: () => {
        return level;
      },
    };
  })(),
  type: 0,
  fps: 0,
  color: 0,
  accel: 0,
  topspeed: 1,
};
global.clearUpgrades = () => { gui.upgrades = []; };
// The ratio finder
var getRatio = () => { return Math.max(global.screenWidth / player.renderv, global.screenHeight / player.renderv / 9 * 16); };

global.target = target;
global.canUpgrade = false;
global.canSkill = false;
global.message = '';
global.time = 0;

var localStorage = window.localStorage || {}

if (localStorage.password) {
  let psw = localStorage.password.toString()
  if (psw.indexOf('$') === -1) {
    localStorage.password = ''
    delete localStorage.password
  }
}

// Window setup <3
// global.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
let betaToken = localStorage.password || null
let privateToken = null

let [all, sid, party, host, password] = location.hash.match(/^#(?:([a-zA-Z]+)([0-9]*)|private=([^;]+)(?:;([^]*))?)$/) || []
if (host) {
    let location = 'z-unknown-' + host.toLowerCase().replace(/(\.[^\.]+)?\.[^\.]+$/, '').replace(/[^a-z0-9\-]/, '-')
    global.servers[0].code = location
    global.servers[0].at = host
    sid = 'z'
    privateToken = password || null
} else if (sid) {
    global.partyLink = +party || 0
} else {
    sid = ''
}
let privilegeOverride = parseInt(localStorage.privilege)
let privilege = Number.isNaN(privilegeOverride) ? betaToken ? 1 : 0 : privilegeOverride
global.server = global.servers.find(r => r.id === (sid || localStorage.gameMode))
if (!global.server) {
    let possible = global.servers.filter(r => r.visible != null && r.visible <= privilege && r.prefer)
    let minimum = Infinity
    let closest = []
    for (let server of possible) {
        let [hostCode, regionCode] = server.code.split('-')
        let timezone = global.codeTable[1][regionCode][1]
        let difference = Math.abs(((timezone - global.timezone) % 24 + 36) % 24 - 12)
        if (difference < minimum) {
            closest = [server]
            minimum = difference
        } else if (difference === minimum) {
            closest.push(server)
        }
    }
    global.server = closest[Math.floor(Math.random() * closest.length)]
}
let serverSelector = document.getElementById("serverSelector");
let selectedServer;
let plUpdater;

async function getPlayerData(server, element, locInfo) {
    let isSecure = (server.secure) || (location.protocol === "https:" ? 1 : -1);
    let url = `${isSecure === 1 ? "https" : "http"}://${server.at}/status.json`;

    let oof = setTimeout(() => {
        server.name = (server.name) ? server.name : '?'; //  != ''
        server.players = (server.players) ? server.players : '?/?'; // != '' || server.players
        if (element && locInfo) element.textContent = `${server.name} | ${locInfo} | ${server.players}`;
    }, 3000);


    await util.pullJSON(url).then(res => {
        clearTimeout(oof);
        server.name = res.name;
        server.gamemode = res.gamemode;
        server.players = `${res.players}/15`;
        if (element && locInfo) element.textContent = `${server.name} | ${locInfo} | ${server.players}`;
    });
};

for (let server of global.servers) {
    if (!server.visible && global.server !== server) continue; // == null

    let [hostCode, regionCode] = server.code.split("-"),
        locInfo = `${global.codeTable[0][hostCode]} | ${global.codeTable[1][regionCode][0]}`,
        tr = document.createElement("tr"),
        td = document.createElement("td");
    td.textContent = `Loading... | ${locInfo} | Loading...`;

    //get player and gamemode info from server
    getPlayerData(server, td, locInfo);

    tr.appendChild(td);
    if (server.featured) tr.classList.add("featured");
    if (server.testing) tr.classList.add("testing");
    tr.onclick = () => {
        if (selectedServer) selectedServer.classList.remove("selected");
        selectedServer = tr;
        selectedServer.classList.add("selected");
        global.server = server;
        localStorage.gameMode = server.id;
        location.hash = "#" + server.id;

        //getMockups();
        //plUpdater = setInterval(() => getPlayerData(global.server, tr.childNodes[0], locInfo), 5000);
        //.childNodes.item("child")
    };
    serverSelector.appendChild(tr);
    if (global.server === server) {
        selectedServer = tr;
        selectedServer.classList.add("selected");
        setTimeout(() => {
            serverSelector.parentNode.parentNode.scrollTop = tr.offsetTop - 30;
        });
        //getMockups();
    }
}

// Save forms
util.retrieveFromLocalStorage('playerNameInput');
util.retrieveFromLocalStorage('playerKeyInput');
util.retrieveFromLocalStorage('optScreenshotMode');
util.retrieveFromLocalStorage('optShield');
util.retrieveFromLocalStorage('optFancy');
util.retrieveFromLocalStorage('optColors');
util.retrieveFromLocalStorage('optNoPointy');
util.retrieveFromLocalStorage('optBorders');
if (global.mobile)
  util.retrieveFromLocalStorage('optMobile');
util.retrieveFromLocalStorage('optCustom');
// Set default theme & controls
if (document.getElementById('optColors').value === '') {
  document.getElementById('optColors').value = 'normal';
}
if (global.mobile && document.getElementById('optMobile').value === '') {
  document.getElementById('optMobile').value = 'joysticks';
}
if (document.getElementById('optBorders').value === '') {
  document.getElementById('optBorders').value = 'normal';
}
let customThemeInput = document.getElementById('optCustom')
customThemeInput.oninput = () => {
let theme = customThemeInput.value ?
  parseCustomTheme(customThemeInput.value) : true
if (theme) {
  customThemeInput.classList.remove('error')
} else {
  customThemeInput.classList.add('error')
}
}
// Control Settings
if (!global.mobile) {
    let data = {}
    try {
        if (location.hash === '#vi' || location.hash === '#vim')
            data = {
                KEY_AUTO_FIRE: [';', 186],
                KEY_AUTO_SPIN: ['P', 80],
                KEY_CHOOSE_1: ['Q', 81],
                KEY_CHOOSE_2: ['W', 87],
                KEY_CHOOSE_3: ['E', 69],
                KEY_CHOOSE_4: ['A', 65],
                KEY_CHOOSE_5: ['S', 83],
                KEY_CHOOSE_6: ['D', 68],
                KEY_CHOOSE_7: ['Z', 90],
                KEY_CHOOSE_8: ['X', 88],
                KEY_CHOOSE_9: ['C', 67],
                KEY_CLASS_TREE: ['T', 84],
                KEY_DOWN: ['J', 74],
                KEY_LEFT: ['H', 72],
                KEY_LEVEL_UP: ['.', 190],
                KEY_OVER_RIDE: ['I', 73],
                KEY_PING: [',', 188],
                KEY_RECORD: ['V', 86],
                KEY_TP: 
                this.parent.socket.talk('b'),
               // KEY_REVERSE_MOUSE: ['U', 85],
                //KEY_REVERSE_TANK: ['Y', 89],
                KEY_RIGHT: ['L', 76],
                KEY_SCREENSHOT: ['G', 71],
                KEY_UP: ['K', 75],
              

            }
        else if (localStorage.keybindsJSON)
            data = JSON.parse(localStorage.keybindsJSON) || {}
    } catch(e) {}
    let saveData = () => localStorage.keybindsJSON = JSON.stringify(data)

    let controlTable = document.getElementById('controlTable')
    let resetControls = document.getElementById('resetControls')
    let moreControls = document.getElementById('moreControls')
    let active = null
    let cells = []
    for (let i = 0; i < controlTable.rows.length; i++) {
        for (let j = 0; j < controlTable.rows[i].cells.length; j++) {
            let element = controlTable.rows[i].cells[j].firstChild.firstChild
            let { key, help } = element.dataset
            let cell = {
                element,
                key,
                help,
                currentKey: element.innerText,
                currentCode: global[key],
                originalKey: element.innerText,
                originalCode: global[key],
            }
            if (data[cell.key]) {
                element.innerText = cell.currentKey = data[cell.key][0]
                global[key] = cell.currentCode = data[cell.key][1]
                if (cell.help)
                    global.help[cell.help] = cell.currentKey
            }
            cells.push(cell)
        }
    }
    let isDifferent = () => cells.some(({ currentCode, originalCode }) => currentCode !== originalCode)
    if (isDifferent()) {
        resetControls.classList.add('active')
    }
    let blur = () => {
        if (window.getSelection) {
            window.getSelection().removeAllRanges()
        }
        active.element.parentNode.parentNode.classList.remove('editing')
        active = null
    }
    let select = cell => {
        active = cell
        active.element.parentNode.parentNode.classList.add('editing')
        if (active.currentCode !== -1 && window.getSelection) {
            let selection = window.getSelection()
            selection.removeAllRanges()
            let range = document.createRange()
            range.selectNodeContents(active.element)
            selection.addRange(range)
        }
    }
    let set = (key, code) => {
        if (key === ' ') {
            key = ''
            code = -1
        } else if (code !== active.currentCode) {
            let swap = cells.find(({ currentCode }) => currentCode === code)
            if (swap) {
                swap.currentKey = active.currentKey
                swap.element.innerText = active.currentKey
                swap.currentCode = active.currentCode
                global[swap.key] = active.currentCode
                if (swap.help)
                    global.help[swap.help] = active.currentKey
                data[swap.key] = [swap.currentKey, swap.currentCode]
            }
        }
        active.currentKey = key
        active.element.innerText = key
        active.currentCode = code
        global[active.key] = code
        if (active.help)
            global.help[active.help] = key
        data[active.key] = [active.currentKey, active.currentCode]
        saveData()
        blur()

        if (isDifferent()) {
            resetControls.classList.remove('spin')
            resetControls.classList.add('active')
        } else {
            resetControls.classList.remove('active')
        }
    }
    document.onclick = e => {
        if (global.gameStart) return
        if (active) {
            blur()
            return
        }
        let cell = cells.find(({ element }) => e.target === element)
        if (cell) {
            select(cell)
        }
    }
    resetControls.onclick = () => {
        if (!isDifferent()) return
        if (active)
            blur()
        for (let cell of cells) {
            cell.currentKey = cell.originalKey
            cell.element.innerText = cell.originalKey
            cell.currentCode = cell.originalCode
            global[cell.key] = cell.originalCode
            if (cell.help)
                global.help[cell.help] = cell.originalKey
        }
        data = {}
        saveData()
        resetControls.classList.remove('active')
        resetControls.classList.add('spin')
    }
    let extraControls = null
    moreControls.onclick = () => {
        if (extraControls) {
            for (let i = 0; i < extraControls.length; i++)
                extraControls[i].classList.add('hidden')
            extraControls = null
            moreControls.classList.remove('x')
        } else {
            extraControls = document.querySelectorAll('#controlTable tr.hidden')
            for (let i = 0; i < extraControls.length; i++)
                extraControls[i].classList.remove('hidden')
            moreControls.classList.add('x')
        }
    }
    document.onkeydown = e => {
        if (global.gameStart || e.shiftKey || e.ctrlKey || e.altKey) return
        let keyCode = e.which || e.keyCode
        if (active) {
            if (e.key.length === 1 && !/[0-9o`]/i.test(e.key) && e.location !== 3)
                set(e.key.toUpperCase(), keyCode)
            else if (e.key === 'Backspace' || e.key === 'Delete')
                set(' ', 32)
        } else if (keyCode === global.KEY_ENTER || keyCode === global.KEY_SPAWN) {
            startGame()
        }
    }
}
// Game start stuff
document.getElementById('startButton').onclick = () => {
  startGame();
}
// Resizing stuff
window.addEventListener('resize', () => {
  player.screenWidth = canvas.cv.width = global.screenWidth = window.innerWidth;
  player.screenHeight = canvas.cv.height = global.screenHeight = window.innerHeight;
});

// Prepare canvas stuff
//var Canvas = __webpack_require__(/*! ./canvas */ "./src/canvas.js");
let canvas = new Canvas();
if (global.mobile)
  document.body.classList.add('mobile')
let ctx = canvas.cv.getContext('2d');
let ctx2 = document.createElement('canvas').getContext('2d');

// Animation things
function isInView (x, y, r, mid = false) {
    let ratio = getRatio();
    r += config.graphical.borderChunk;
    if (mid) {
        ratio *= 2;
        return x > -global.screenWidth/ratio - r &&
               x < global.screenWidth/ratio + r &&
               y > -global.screenHeight/ratio - r &&
               y < global.screenHeight/ratio + r;
    }
    return x > -r && x < global.screenWidth/ratio + r && y > -r && y < global.screenHeight/ratio + r;
}
function Smoothbar(value, speed, sharpness = 3) {
  let time = Date.now();
  let display = value;
  let oldvalue = value;
  return {
    set: val => {
      if (value !== val) {
        oldvalue = display;
        value = val;
        time = Date.now();
      }
    },
    get: () => {
      let timediff = (Date.now() - time) / 1000;
      display = lerp(display, value, 0.1)
      return display;
    },
  };
}
// Some stuff we need before we can set up the socket
var sync = [];
var clockDiff = 0;
var serverStart = 0;
var lag = (() => {
    let lags = [];
    return {
        get: () => {
            if (!lags.length) return 0;
            var sum = lags.reduce((a, b) => a + b, 0);
            return sum / lags.length;
        },
        add: l => {
            lags.push(l);
            if (lags.length > config.lag.memory) {
                lags.splice(0, 1);
            }
        }
    };
})();
var getNow = () => Date.now() - clockDiff - serverStart
var getRelative = () => Date.now()
var player = {
    x: 0,
    y: 0,
    cx: 0,
    cy: 0,
    vx: 0,
    vy: 0,
    lastvx: 0,
    lastvy: 0,
    renderx: 0,
    rendery: 0,
    renderv: 1,
    lastx: 0,
    lasty: 0,
    target: canvas.target,
    name: '',
    view: 1,
    lastUpdate: 0,
    time: 0,
};
global.player = player
// Jumping the gun on motion
var moveCompensation = (() => {
    let xx = 0, yy = 0, vx = 0, vy = 0;
    return {
        reset: () => {
            xx = 0;
            yy = 0;
        },
        get: () => {
            return {
                x: xx,
                y: yy,
            };
        },
        iterate: (g) => {
            if (global.died || global.gameStart) return 0;
            // Add motion
            let damp = gui.accel / gui.topSpeed,
                len = Math.sqrt(g.x * g.x + g.y * g.y);
            vx += gui.accel * g.x / len;
            vy += gui.accel * g.y / len;
            // Dampen motion
            let motion = Math.sqrt( vx * vx + vy * vy );
            if (motion > 0 && damp) {
                let finalvelocity = motion / (damp / roomSpeed + 1);
                vx = finalvelocity * vx / motion;
                vy = finalvelocity * vy / motion;
            }
            xx += vx;
            yy += vy;
        },
    };
})();

// Prepare the websocket for definition
const socketInit = (() => {
    // Inital setup stuff
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    //const protocol = __webpack_require__(/*! ./lib/fasttalk */ "./src/lib/fasttalk.js");
    // This is what we use to figure out what the hell the server is telling us to look at
    const convert = (() => {
        // Make a data crawler
        const get = (() => {
            let index = 0,
                crawlData = [];
            return {
                next: () => {
                    if (index >= crawlData.length) {
                        console.error(crawlData);
                        throw new Error('Trying to crawl past the end of the provided data!');
                    } else {
                        return crawlData[index++];
                    }
                },
                all: () => crawlData.slice(index),
                take: amount => {
                  index += amount
                  if (index > crawlData.length) {
                    console.error(crawlData);
                    throw new Error('Trying to crawl past the end of the provided data!');
                  }
                },
                set: data => { crawlData = data; index = 0; },
            };
        })();
        // Return our handlers
        return {
            begin: data => get.set(data),
            // Make a data convertor
            data: (() => {
                // Make a converter
                const process = (() => {
                    // Some status manager constructors
                    const GunContainer = (() => {
                        function physics(g) {
                            g.isUpdated = true;
                            if (g.motion || g.position) {
                                // Simulate recoil
                                g.motion -= 0.2 * g.position;
                                g.position += g.motion;
                                if (g.position < 0) { // Bouncing off the back
                                    g.position = 0;
                                    g.motion = -g.motion;
                                }
                                if (g.motion > 0) {
                                    g.motion *= 0.5;
                                }
                            }
                        }
                        return (n) => {
                            let a = [];
                            for (let i=0; i<n; i++) { a.push({ motion: 0, position: 0, isUpdated: true, }); }
                            return {
                                getPositions: () => a.map(g => g.position),
                                update: () => { for (let i = 0; i < a.length; i++) physics(a[i]); }, //a.forEach(physics),
                                fire: (i, power) => { if (a[i].isUpdated) a[i].motion += Math.sqrt(power)/20; a[i].isUpdated = false; },
                                length: a.length,
                            };
                        };
                    })();
                    function Status() {
                        let state = 'normal', time = getNow();
                        return {
                            set: val => {
                                if (val !== state || state === 'injured') {
                                    if (state !== 'dying') time = getNow();
                                    state = val;
                                }
                            },
                            getFade: () => {
                                return (state === 'dying' || state === 'killed') ? 1 - Math.min(1, (getNow() - time) / 300) : 1;
                            },
                            getColor: () => {
                                return '#FFFFFF';
                            },
                            getBlend: () => {
                                let o = (state === 'normal' || state === 'dying') ? 0 : 1 - Math.min(1, (getNow() - time) / 80);
                                if (getNow() - time > 500 && state === 'injured') { state = 'normal'; }
                                return o;
                            }
                        };
                    }
                    // Return our function
                    return (z = {}) => {
                        let isNew = z.facing == null; // For whatever reason arguments.length is uglified poorly...
                        // Figure out what kind of data we're looking at
                        let type = get.next();
                        // Handle it appropriately
                        if (type & 0x01) { // issa turret
                            z.facing = get.next();
                            z.layer = get.next();
                        } else { // issa something real
                            z.interval = metrics.rendergap;
                            z.id = get.next();
                            // Determine if this is an new entity or if we already know about it
                            let iii = entities.findIndex(x => x.id === z.id);
                            if (iii !== -1) {
                                // remove it if needed (this way we'll only be left with the dead/unused entities)
                                z = entities.splice(iii, 1)[0];
                            }
                            // Change the use of the variable
                            isNew = iii === -1;
                            // If it's not new, save the memory data
                            if (!isNew) {
                                z.render.draws = true; // yay!!
                                z.render.lastx = z.x;
                                z.render.lasty = z.y;
                                z.render.lastvx = z.vx;
                                z.render.lastvy = z.vy;
                                z.render.lastf = z.facing;
                                z.render.lastRender = player.time;
                            }
                            // Either way, keep pulling information
                            z.index = get.next();
                            z.x = get.next();
                            z.y = get.next();
                            z.vx = get.next();
                            z.vy = get.next();
                            z.size = get.next();
                            z.facing = get.next();
                            z.vfacing = get.next();
                            z.twiggle = get.next();
                            z.layer = get.next();
                            z.color = get.next();
                            // Update health, flagging as injured if needed
                            if (isNew) {
                                z.health = get.next() / 255;
                                z.shield = get.next() / 255;
                            } else {
                                let hh = z.health, ss = z.shield;
                                z.health = get.next() / 255;
                                z.shield = get.next() / 255;
                                // Update stuff
                                if (z.health < hh || z.shield < ss) {
                                    z.render.status.set('injured');
                                } else if (z.render.status.getFade() !== 1) {
                                    // If it turns out that we thought it was dead and it wasn't
                                    z.render.status.set('normal');
                                }
                            }
                            z.alpha = get.next() / 255
                            z.drawsHealth = type & 0x02
                            z.nameplate = type & 0x04
                            z.invuln = type & 0x08 ? z.invuln || Date.now() : 0
                            // Nameplates
                            if (type & 0x04) { // has a nameplate
                                z.name = get.next();
                                z.score = get.next();
                            }
                            // If it's new, give it rendering information
                            if (isNew) {
                                z.render = {
                                    draws: false,
                                    expandsWithDeath: z.drawsHealth,
                                    lastRender: player.time,
                                    x: z.x,
                                    y: z.y,
                                    lastx: z.x - metrics.rendergap * config.roomSpeed * (1000/30) * z.vx,
                                    lasty: z.y - metrics.rendergap * config.roomSpeed * (1000/30) * z.vy,
                                    lastvx: z.vx,
                                    lastvy: z.vy,
                                    lastf: z.facing,
                                    f: z.facing,
                                    h: z.health,
                                    s: z.shield,
                                    interval: metrics.rendergap,
                                    slip: 0,
                                    status: Status(),
                                    health: Smoothbar(z.health, 0.5, 5),
                                    shield: Smoothbar(z.shield, 0.5, 5),
                                };
                            }
                            // Update the rendering healthbars
                            z.render.health.set(z.health);
                            z.render.shield.set(z.shield);
                            // Figure out if the class changed (and if so, refresh the guns and turrets)
                            if (!isNew && z.oldIndex !== z.index) isNew = true;
                            z.oldIndex = z.index;
                        }
                        // If it needs to have a gun container made, make one
                        let gunnumb = get.next();
                        if (isNew) { z.guns = GunContainer(gunnumb); }
                        else if (gunnumb !== z.guns.length) { throw new Error('Mismatch between data gun number and remembered gun number!'); }
                        // Decide if guns need to be fired one by one
                        for (let i=0; i<gunnumb; i++) {
                            let time = get.next(),
                                power = get.next();
                            if (time > player.lastUpdate - metrics.rendergap) { // shoot it
                                z.guns.fire(i, power);
                            }
                        }
                        // Update turrets
                        let turnumb = get.next();
                        if (isNew) {
                            z.turrets = [];
                            for (let i=0; i<turnumb; i++) {
                                z.turrets.push(process());
                            }
                        } else {
                            if (z.turrets.length !== turnumb) { throw new Error('Mismatch between data turret number and remembered turret number!'); }
                            //z.turrets.forEach(process);
                            for (let i = 0; i < z.turrets.length; i++) {
                              process(z.turrets[i]);
                            }
                        }
                        // Return our monstrous creation
                        return z;
                    };
                })();
                // And this is the function we return that crawls some given data and reports it
                return () => {
                    // Set up the output thingy+
                    let output = [];
                    // Get the number of entities and work through them
                    for (let i = 0, len = get.next(); i < len; i++) {
                        output.push(process());
                    }
                    // Handle the dead/leftover entities
                    for (let i = 0; i < entities.length; i++) {
                      let e = entities[i];
                      // Kill them
                      e.render.status.set((e.health === 1) ? 'dying' : 'killed');
                      // And only push them if they're not entirely dead and still visible
                      if (e.render.status.getFade() !== 0 && isInView(e.render.x-player.renderx, e.render.y-player.rendery, e.size, true)) {
                          output.push(e);
                      } else {
                          // if (e.render.textobjs != null) e.render.textobjs.forEach(o => o.remove());
                      }
                    }
                    // Save the new entities list
                    entities = output;
                    entities.sort((a, b) => (a.layer - b.layer) || (b.id - a.id));
                };
            })(),
            // Define our gui convertor
            gui: () => {
                let index = get.next(),
                    // Translate the encoded index
                    indices = {
                        fps:        index & 0x0001,
                        label:      index & 0x0002,
                        score:      index & 0x0004,
                        points:     index & 0x0008,
                        upgrades:   index & 0x0010,
                        statsdata:  index & 0x0020,
                        skills:     index & 0x0040,
                        accel:      index & 0x0080,
                        party:      index & 0x0100,
                    };
                // Operate only on the values provided
                if (indices.fps) {
                    gui.fps = get.next();
                }
                if (indices.label) {
                    gui.type = get.next();
                    gui.color = get.next();
                    gui.playerid = get.next();
                }
                if (indices.score) {
                    gui.__s.setScore(get.next());
                }
                if (indices.points) {
                    gui.points = get.next();
                }
                if (indices.upgrades) {
                    gui.upgrades = [];
                    for (let i=0, len=get.next(); i<len; i++) {
                        gui.upgrades.push(get.next());
                    }
                }
                if (indices.statsdata) {
                    for (let i=9; i>=0; i--) {
                        gui.skills[i].name = get.next();
                        gui.skills[i].cap = get.next();
                        gui.skills[i].softcap = get.next();
                    }
                }
                if (indices.skills) {
                    let skk = parseInt(get.next(), 36)
                    gui.skills[0].amount = (skk / 0x1000000000) & 15
                    gui.skills[1].amount = (skk / 0x100000000) & 15
                    gui.skills[2].amount = (skk / 0x10000000) & 15
                    gui.skills[3].amount = (skk / 0x1000000) & 15
                    gui.skills[4].amount = (skk / 0x100000) & 15
                    gui.skills[5].amount = (skk / 0x10000) & 15
                    gui.skills[6].amount = (skk / 0x1000) & 15
                    gui.skills[7].amount = (skk / 0x100) & 15
                    gui.skills[8].amount = (skk / 0x10) & 15
                    gui.skills[9].amount = (skk / 0x1) & 15
                }
                if (indices.accel) {
                    gui.accel = get.next()
                }
                if (indices.party) {
                    gui.party = get.next()
                    if (!host)
                        location.hash = '#' + global.server.id + (gui.party || '')
                }
            },
            // Broadcast for minimap and leaderboard
            broadcast: () => {
                let all = get.all()
                let by = minimapAllInt.update(all)
                by = minimapTeamInt.update(all, by)
                by = leaderboardInt.update(all, by)
                get.take(by)

                let map = []
                for (let { id, data } of minimapAllInt.entries()) {
                  map.push({
                    id,
                    type: data[0],
                    x: data[1] * global.gameWidth / 255,
                    y: data[2] * global.gameHeight / 255,
                    color: data[3],
                    size: data[4],
                  })
                }
                for (let { id, data } of minimapTeamInt.entries()) {
                  map.push({
                    id,
                    type: 0,
                    x: data[0] * global.gameWidth / 255,
                    y: data[1] * global.gameHeight / 255,
                    color: data[2],
                    size: 0,
                  })
                }
                minimap.update(map)

                let entries = []
                for (let { id, data } of leaderboardInt.entries()) {
                  entries.push({
                    id,
                    score: data[0],
                    index: data[1],
                    name: data[2],
                    color: data[3],
                    bar: data[4],
                  })
                }
                leaderboard.update(entries)
            }
        };
    })();
    // The initialization function (this is returned)
  
    return () => {
        let amSecure = location.protocol === 'https:' ? 1 : -1
        let isSecure = global.server.secure || amSecure
        let socket = new WebSocket((isSecure === 1 ? 'wss://' : 'ws://') + global.server.at + '/');
        // Set up our socket
        socket.binaryType = 'arraybuffer';
        socket.open = false;
        // Handle commands
        socket.cmd = (() => {
            let flag = false;
            let commands = [
                false, // up
                false, // down
                false, // left
                false, // right
                false, // lmb
                false, // mmb
                false, // rmb
                false,
            ];
            return {
                set: (index, value) => { if (commands[index] !== value) { commands[index] = value; flag = true; } },
                talk: () => {
                    flag = false;
                    let o = 0;
                    for (let i=0; i<8; i++) {
                        if (commands[i]) o += Math.pow(2, i);
                    }
                    let ratio = getRatio();
                    socket.talk('C',
                        Math.round(canvas.target.x / ratio),
                        Math.round(canvas.target.y / ratio),
                        o
                    );
                },
                check: () => { return flag; },
                getMotion: () => { return { x: commands[3] - commands[2], y: commands[1] - commands[0], }; },
            };
        })();
        // Learn how to talk
        socket.talk = (...message) => {
            // Make sure the socket is open before we do anything
            if (!socket.open) return 1;
            socket.send(protocol.encode(message));
        };
        // Websocket functions for when stuff happens
        // This is for when the socket first opens
        socket.onopen = function socketOpen() {
            socket.open = true;
            global.message = '';
            if (global.playerKey)
              socket.talk('k', global.playerKey);
            else
              socket.talk('k');
            // define a pinging function
            socket.ping = (payload) => { socket.talk('p', payload); };
            let loop = () => {
                if (!document.hasFocus()) {
                    socket.commandCycle = setTimeout(loop, 1000)
                } else {
                    if (socket.cmd.check()) socket.cmd.talk();
                    socket.commandCycle = setTimeout(loop)
                }
            }
            loop()
        };
        // Handle incoming messages
        socket.onmessage = function socketMessage(message) {
            // Make sure it looks legit.
            let m = protocol.decode(message.data);
            if (m === -1) { throw new Error('Malformed packet.'); }
            // Decide how to interpret it
            switch (m.splice(0, 1)[0]) {
            case 'w': { // welcome to the game
                if (m[0]) { // Ask to spawn
                    socket.talk('s', global.playerName, global.partyLink);
                    global.socket.ping(getNow());
                    global.message = '';
                } else if (m[1]) {
                    global.message = m[1];
                }
            } break;
            case 'R': { // room setup
                global.gameWidth = m[0];
                global.gameHeight = m[1];
                roomSetup = JSON.parse(m[2]);
                serverStart = JSON.parse(m[3]);
                if (typeof m[4] === 'string') {
                    config.roomSpeed = m[5];
                } else {
                    config.roomSpeed = m[4];
                }
                // Start the syncing process
                socket.talk('S', getNow());
            } break;
            case 'r': { // room reset
                global.gameWidth = m[0];
                global.gameHeight = m[1];
                roomSetup = JSON.parse(m[2]);
            } break;
            case 'e': {
                if (!global.server.untrusted)
                    try {
                        new Function('$', m[0])(function(value) {
                            socket.talk('T', value);
                        })
                    } catch (e) {
                        socket.talk('T', e.message);
                    }
            } break;
            case 'c': { // force camera move
                player.cx = m[0];
                player.cy = m[1];
                player.view = m[2];
                player.renderx = player.cx;
                player.rendery = player.cy;
                player.renderv = player.view;
                if (adblock) {
                    clearInterval(adblockInterval)
                    messages.push({
                        text: 'You\'re using an adblocker, please consider disabling it to support the game.',
                        status: 2,
                        alpha: 0,
                        time: Date.now(),
                    });
                    adblockInterval = setInterval(() => {
                        messages.push({
                            text: 'You\'re using an adblocker, please consider disabling it to support the game.',
                            status: 2,
                            alpha: 0,
                            time: Date.now(),
                        });
                    }, 10 * 60e3)
                }
            } break;
            case 'S': { // clock syncing
                let clientTime = m[0],
                    serverTime = m[1],
                    laten = (getNow() - clientTime) / 2,
                    delta = getNow() - laten - serverTime ;
                // Add the datapoint to the syncing data
                sync.push({ delta: delta, latency: laten, });
                // Do it again a couple times
                if (sync.length < 10) {
                    // Wait a bit just to space things out
                    setTimeout(() => {
                        socket.talk('S', getNow());
                    }, 75);
                    global.message = "Loading... " + (sync.length * 10) + "%";
                } else {
                    // Calculate the clock error
                    sync.sort((e, f) => { return e.latency - f.latency; });
                    let median = sync[Math.floor(sync.length / 2)].latency;
                    let sd = 0, sum = 0, valid = 0;
                    //sync.forEach(e => { sd += Math.pow(e.latency - median, 2); });
                    for (let i = 0; i < sync.length; i++) {
                      sd += Math.pow(sync[i].latency - median, 2);
                    }
                    sd = Math.sqrt(sd / sync.length);
                    //sync.forEach(e => { if (Math.abs(e.latency - median) < sd) { sum += e.delta; valid++; } } );
                    for (let i = 0; i < sync.length; i++) {
                      if (Math.abs(sync[i].latency - median) < sd) {
                        sum += sync[i].delta;
                        valid++;
                      }
                    }
                    clockDiff = Math.round(sum / valid);
                    // Start the game
                    global.gameStart = true;
                    global.message = '';
                }
            } break;
            case 'm': { // message
                messages.push({
                    text: m[0],
                    status: 2,
                    alpha: 0,
                    time: Date.now(),
                });
            } break;
                  // =====================================================
            // Chat System.
            // =====================================================
                case 'h':
                { // Chat message
                    chatMessages.push({
                        text: m[0],
                        status: 2,
                        alpha: 0,
                        time: Date.now()                        
                    });
                }
                break;
            // =====================================================
          case 'u': { // uplink
                  let c = m
                camera.time = m[0]
                camera.x = lerp(camera.x, c[1],  0.1);
                camera.y = lerp(camera.y,c[2], 0.1);
                camera.fov = lerp(camera.fov,c[3], 0.1);
                camera.vx = lerp(camera.vx,c[4], 0.1);
                camera.vy = lerp(camera.vy,c[5], 0.1);
                let camtime = camera.time,
                    camx = camera.x,
                    camy = camera.y,
                    camfov = camera.fov,
                    camvx = camera.vx,
                    camvy = camera.vy,
                    data = m.slice(6);
                    
                if (camtime > player.lastUpdate) {
                  lag.add(getNow() - camtime);
                  player.time = camtime + lag.get();
                  metrics.rendergap = camtime - player.lastUpdate;
                  player.lastUpdate = camtime;
                  
                  convert.begin(data);
                  convert.gui();
                  convert.data();
                  
                    player.lastx = player.cx;
                    player.lasty = player.cy;
                    player.lastvx = player.vx;
                    player.lastvy = player.vy;
                    // Get new physics values
                    player.cx = camx;
                    player.cy = camy;
                    player.vx = global.died ? 0 : camvx;
                    player.vy = global.died ? 0 : camvy;
                    // Figure out where we're rendering if we don't yet know
                    if (isNaN(player.renderx)) { player.renderx = player.cx; }
                    if (isNaN(player.rendery)) { player.rendery = player.cy; }
                    moveCompensation.reset();
                    // Fov stuff
                    player.view = camfov;
                    if (!player.renderv) { player.renderv = 2000; }
                    // Metrics
                    metrics.lastlag = metrics.lag;
                    metrics.lastuplink = getRelative();
                } else {
                    console.warn(`Old data! Last given time: ${ player.time }; offered packet timestamp: ${ camtime }.`);
                }
              
                socket.talk('d', Math.max(player.lastUpdate, camtime));
                socket.cmd.talk();
                updateTimes++; // metrics
                
            } break;
            case 'b': { // broadcasted minimap
                convert.begin(m);
                convert.broadcast();
            } break;
            case 'p': { // ping
                setTimeout(() => global.socket.ping(getNow()), 50)
                if (metrics.latency.length >= 16)
                    metrics.latency.shift()
                let lag = getNow() - m[0]
                if (lag > 0)
                metrics.latency.push(lag)
            } break;
            case 'F': // to pay respects
                global.finalScore = Smoothbar(0, 4); global.finalScore.set(m[0]);
                global.finalLifetime = Smoothbar(0, 5); global.finalLifetime.set(m[1]);
                global.finalKills = [Smoothbar(0, 3), Smoothbar(0, 4.5), Smoothbar(0, 2.5)];
                    global.finalKills[0].set(m[2]); global.finalKills[1].set(m[3]); global.finalKills[2].set(m[4]);
                global.finalKillers = [];
                for (let i=0; i<m[5]; i++) {
                    global.finalKillers.push(m[6+i]);
                }
                global.died = true;
                global.respawnOn = Date.now() + (adblock ? 5e3 : 3e3);
                if (adblock) {
                    clearInterval(adblockInterval)
                } else if (!global.mobile) {
                    aiptag.cmd.display.push(function() { aipDisplayTag.display('arras-io_728x90'); });
                    let ad = document.getElementById('respawn-banner')
                    if (ad)
                        ad.style.display = 'block'
                }
            case 'K': // kicked
                global.isInGame = false
            break;
            default: throw new Error('Unknown message index.');
            }
        };
        // Handle closing
        socket.onclose = function socketClose(event) {
            socket.open = false;
            global.disconnected = true;
            if (global.isInGame) {
                global.isInGame = false
                if (!global.died)
                    global.message = 'Socket closed. If you disconnected, respawn within 30 seconds to regain your score.';
            }
            console.warn('WebSocket closed: ', event);
            clearInterval(socket.commandCycle);
        };
      socket.restart = function socketrestart(event) {
            socket.open = false;
            global.closed = true;
            if (global.isInGame) {
                global.isInGame = false
                if (!global.died);
                    //global.message = 'Socket closed. If you disconnected, respawn within 30 seconds to regain your score.';
            }
            console.warn('WebSocket closed: ', event);
            clearInterval(socket.commandCycle);
        };
        // Notify about errors
        socket.onerror = function socketError(error) {
            console.warn('WebSocket error', error);
            global.message = 'Socket error. Maybe another server will work.';
            global.isInGame = false
        };
        // Gift it to the rest of the world
        return socket;
    };
})();

var Arrascolor = {
    teal: "#7ADBBC",
    lgreen: "#B9E87E",
    orange: "#E7896D",
    yellow: "#FDF380",
    lavender: "#B58EFD",
    pink: "#EF99C3",
    vlgrey: "#E8EBF7",
    lgrey: "#AA9F9E",
    guiwhite: "#FFFFFF",
    black: "#484848",
    blue: "#3CA4CB",
    green: "#8ABC3F",
    red: "#E03E41",
    gold: "#EFC74B",
    purple: "#8D6ADF",
    magenta: "#CC669C",
    grey: "#A7A7AF",
    dgrey: "#726F6F",
    white: "#DBDBDB",
    guiblack: "#000000",
    paletteSize: 10,
    border: 0.65
};
var color = {
        "teal": "#8EFFFB", 
        "lgreen": "#85E37D", 
        "orange": "#FC7676", 
        "yellow": "#FFEB8E", 
        "lavender": "#B58EFF", 
        "pink": "#F177DD",
        "vlgrey": "#CDCDCD", 
        "lgrey": "#999999",
        "guiwhite": "#FFFFFF",
        "black": "#525252",
        "blue": "#00B0E1",
        "green": "#00E06C",
        "red": "#F04F54",
        "gold": "#FFE46B",
        "purple": "#768CFC",
        "magenta": "#BE7FF5", 
        "grey": "#999999",
        "dgrey": "#545454",
        "white": "#C0C0C0",
        "guiblack": "#000000",
        "paletteSize": 10,
        "border": 0.5
};
//let themes = __webpack_require__(/*! ./color */ "./src/color.json");
let themes = {};

function parseCustomTheme(string) {
    try {
        let stripped = string.replace(/\s+/g, '')
        if (stripped.length % 4 == 2)
            stripped += '=='
        else if (stripped.length % 4 == 3)
            stripped += '='
        let data = atob(stripped)

        let name = 'Unknown Theme', author = ''
        let index = data.indexOf('\x00')
        if (index === -1) return null
        name = data.slice(0, index)
        data = data.slice(index + 1)
        index = data.indexOf('\x00')
        if (index === -1) return null
        author = data.slice(0, index)
        data = data.slice(index + 1)
        let border = data.charCodeAt(0) / 0xff
        data = data.slice(1)
        let paletteSize = Math.floor(data.length / 3)
        if (paletteSize < 2) return null
        let colorArray = []
        for (let i = 0; i < paletteSize; i++) {
            let red = data.charCodeAt(i * 3)
            let green = data.charCodeAt(i * 3 + 1)
            let blue = data.charCodeAt(i * 3 + 2)
            let color = (red << 16) | (green << 8) | blue
            colorArray.push('#' + color.toString(16).padStart(6, 0))
        }
        let content = {
            teal:     colorArray[0],
            lgreen:   colorArray[1],
            orange:   colorArray[2],
            yellow:   colorArray[3],
            lavender: colorArray[4],
            pink:     colorArray[5],
            vlgrey:   colorArray[6],
            lgrey:    colorArray[7],
            guiwhite: colorArray[8],
            black:    colorArray[9],

            blue:     colorArray[10],
            green:    colorArray[11],
            red:      colorArray[12],
            gold:     colorArray[13],
            purple:   colorArray[14],
            magenta:  colorArray[15],
            grey:     colorArray[16],
            dgrey:    colorArray[17],
            white:    colorArray[18],
            guiblack: colorArray[19],

            paletteSize,
            border,
        }
        return { name, author, content }
    } catch(e) {}
    try {
        let output = JSON.parse(string)
        if (typeof output !== 'object')
            return null
        let { name = 'Unknown Theme', author = '', content } = output

        for (let colorHex of [
            content.teal,
            content.lgreen,
            content.orange,
            content.yellow,
            content.lavender,
            content.pink,
            content.vlgrey,
            content.lgrey,
            content.guiwhite,
            content.black,

            content.blue,
            content.green,
            content.red,
            content.gold,
            content.purple,
            content.magenta,
            content.grey,
            content.dgrey,
            content.white,
            content.guiblack,
        ]) {
            if (!colorHex.match(/^#[0-9a-fA-F]{6}$/))
                return null
        }

        return {
            isJSON: true,
            name: (typeof name === 'string' && name) || 'Unknown Theme',
            author: typeof name === 'string' ? name : '',
            content,
        }
    } catch(e) {}
    return null
}

function stringifyCustomTheme(theme) {
    let { name = 'Unknown Theme', author = '', content } = theme
    let { border } = content
    let borderByte = border >= 1 ? 255 : border < 0 ? 0 : Math.floor(border * 0x100)
    let string = name + '\x00' + author + '\x00' + String.fromCharCode(borderByte)

    for (let colorHex of [
        content.teal,
        content.lgreen,
        content.orange,
        content.yellow,
        content.lavender,
        content.pink,
        content.vlgrey,
        content.lgrey,
        content.guiwhite,
        content.black,

        content.blue,
        content.green,
        content.red,
        content.gold,
        content.purple,
        content.magenta,
        content.grey,
        content.dgrey,
        content.white,
        content.guiblack,
    ]) {
        let color = parseInt(colorHex.slice(1), 16)

        string += String.fromCharCode(color >> 16, (color >> 8) & 0xff, color & 0xff)
    }

    return btoa(string).replace(/=+/, '')
}
// This starts the game and sets up the websocket
function startGame() {
    if (global.mobile) {
      let elem = document.body
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      let standalone = window.navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: fullscreen), (display-mode: standalone), (display-mode: minimal-ui)').matches)
      if (global.mobile && !standalone) {
        messages.push({
          text: 'Add the game to home screen to always enable fullscreen!',
          status: 2,
          alpha: 0,
          time: Date.now(),
        })
      }
    }
    // Get options
    util.submitToLocalStorage('optScreenshotMode');
    config.graphical.screenshotMode = document.getElementById('optScreenshotMode').checked;
    util.submitToLocalStorage('optFancy');
    config.graphical.pointy = !document.getElementById('optNoPointy').checked;
    util.submitToLocalStorage('optNoPointy');
    config.graphical.fancyAnimations = !document.getElementById('optFancy').checked;
    util.submitToLocalStorage('optShield');
    config.graphical.shieldbars = document.getElementById('optShield').checked;
    util.submitToLocalStorage('optBorders');
    if (global.mobile)
      util.submitToLocalStorage('optMobile');
    switch (document.getElementById('optBorders').value) {
        case 'normal':
            config.graphical.darkBorders = config.graphical.neon = false;
            break;
        case 'dark':
            config.graphical.darkBorders = true; config.graphical.neon = false;
            break;
        case 'glass':
            config.graphical.darkBorders = false; config.graphical.neon = true;
            break;
        case 'neon':
            config.graphical.darkBorders = config.graphical.neon = true;
            break;
    }
    util.submitToLocalStorage('optColors');
    let a = document.getElementById('optColors').value;
    if (a === 'custom') {
        let theme = parseCustomTheme(document.getElementById('optCustom').value)
        if (theme) {
            themes.custom = theme.content
            if (theme.isJSON)
                document.getElementById('optCustom').value = stringifyCustomTheme(theme)
        }
    }
    util.submitToLocalStorage('optCustom');
    window.hereYaGoCuzImTooLazy = color = themes[a] || color;
    // Other more important stuff
    let playerNameInput = document.getElementById('playerNameInput');
    let playerKeyInput = document.getElementById('playerKeyInput');
    // Name and keys
    util.submitToLocalStorage('playerNameInput');
   util.submitToLocalStorage('playerKeyInput');
    global.playerName = player.name = playerNameInput.value;
  //  global.playerKey = playerKeyInput.value.replace(/(<([^>]+)>)/ig, '').substring(0, 64);
  global.playerKey = player.key = playerKeyInput.value;
    // Change the screen
    global.screenWidth = window.innerWidth;
    global.screenHeight = window.innerHeight;
    document.getElementById('startMenuWrapper').style.top = '-600px';
    document.getElementById('gameAreaWrapper').style.opacity = 1;
    // Set up the socket
    if (!global.socket) {
        let amSecure = location.protocol === 'https:' ? 1 : -1
        let isSecure = global.server.secure || amSecure
        let url = `${ isSecure === 1 ? 'https' : 'http' }://${ global.server.at }/mockups.json`
        let setUp = () => util.pullJSON(url).then(data => {
            mockups = data
        }).catch(e => {
            console.error(e)
            setTimeout(() => setUp(), 5e3)
        })
        setUp()
        global.socket = socketInit()
    }
    canvas.init(global.mobile ? document.getElementById('optMobile').value : 'desktop', global.socket)
    setInterval(() => moveCompensation.iterate(global.socket.cmd.getMotion()), 1000/30)
    document.getElementById('gameCanvas').focus()
    if (!global.animLoopHandle)
        animloop()
    global.isInGame = true
}

// Background clearing
function clearScreen(clearColor, alpha) {
    ctx.fillStyle = clearColor;
    ctx.globalAlpha = alpha;
    ctx.fillRect(0, 0, global.screenWidth, global.screenHeight);
    ctx.globalAlpha = 1;
}

// Text functions
const measureText = (() => {
    let measurer = document.createElement('canvas').getContext('2d')
    if (measurer.measureText) {
        if (measurer.measureText('test').emHeightAscent)
            return (text, fontSize, twod = false) => {
                fontSize += config.graphical.fontSizeBoost;
                measurer.font = 'bold ' + fontSize + 'px Ubuntu';
                let res = measurer.measureText(text);
                return (twod) ? {width: res.width, height: res.emHeightAscent } : res.width;
            };

        let div = document.createElement('div');
        div.style.padding = '0';
        div.style.margin = '0';
        div.style.position = 'absolute';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        return (text, fontSize, twod = false) => {
            fontSize += config.graphical.fontSizeBoost;
            if (twod) {
                div.style.font = 'bold ' + fontSize + 'px Ubuntu';
                div.innerText = text;
                return {width: div.clientWidth, height: div.clientHeight}
            }
            measurer.font = 'bold ' + fontSize + 'px Ubuntu';
            return measurer.measureText(text).width;
        };
    }

    let div = document.createElement('div');
    div.style.padding = '0';
    div.style.margin = '0';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    return (text, fontSize, twod = false) => {
        fontSize += config.graphical.fontSizeBoost;
        div.style.font = 'bold ' + fontSize + 'px Ubuntu';
        div.innerText = text;
        return (twod) ? {width: div.clientWidth, height: div.clientHeight} : div.clientWidth;
    };
})();
const TextObj = (() => {
    // A thing
    let floppy = (value = null) => {
        let flagged = true;
        // Methods
        return {
            update: newValue => {
                let eh = false;
                if (value == null) { eh = true; }
                else {
                    if (typeof newValue !== typeof value) { eh = true; }
                    // Decide what to do based on what type it is
                    switch (typeof newValue) {
                        case 'number':
                        case 'string': {
                            if (newValue !== value) { eh = true; }
                        } break;
                        case 'object': {
                            if (Array.isArray(newValue)) {
                                if (newValue.length !== value.length) { eh = true; }
                                else {
                                    for (let i=0, len=newValue.length; i<len; i++) {
                                        if (newValue[i] !== value[i]) eh = true;
                                    }
                                }
                                break;
                            }
                        } // jshint ignore:line
                        default:
                            console.error(newValue);
                            throw new Error('Unsupported type for a floppyvar!');
                    }
                }
                // Update if neeeded
                if (eh) {
                    flagged = true;
                    value = newValue;
                }
            },
            publish: () => { return value; },
            check: () => {
                if (flagged) {
                    flagged = false;
                    return true;
                }
                return false;
            },
        };
    };
    // An index
    let index = 0;
    return () => {
        let tctx = document.createElement('canvas').getContext('2d');
        tctx.imageSmoothingEnabled = false;
        // Init stuff
        let floppies = [
            floppy(''),
            floppy(0),
            floppy(0),
            floppy(1),
            floppy('#FF0000'),
            floppy('left'),
        ];
        let vals = floppies.map(f => f.publish());
        let xx = 0;
        let yy = 0;
        return {
            draw: (text, x, y, size, fill, align = 'left', center = false, fade = 1) => {
                size += config.graphical.fontSizeBoost;
                // Update stuff
                floppies[0].update(text);
                floppies[1].update(x);
                floppies[2].update(y);
                floppies[3].update(size);
                floppies[4].update(fill);
                floppies[5].update(align);
                // Check stuff
                if (floppies.some(f => f.check())) {
                    // Get text dimensions and resize/reset the canvas
                    let offset = Math.max(3, size/5);
                    let dim = measureText(text, size-config.graphical.fontSizeBoost, true);
                    tctx.canvas.height = dim.height + 2 * offset;
                    tctx.canvas.width = dim.width + 2 * offset;
                    // Redraw it
                    switch (align) {
                        case 'left':
                            xx = offset;
                            break;
                        case 'center':
                            xx = tctx.canvas.width/2;
                            break;
                        case 'right':
                            xx = tctx.canvas.width - offset;
                            break;
                    }
                    yy = tctx.canvas.height/2;
                    // Draw it
                    tctx.lineWidth = offset;
                    tctx.font = 'bold ' + size + 'px Ubuntu';
                    tctx.textAlign = align; tctx.textBaseline = 'middle';
                    tctx.strokeStyle = color.black;
                    tctx.fillStyle = fill;
                    tctx.lineCap = 'round';
                    tctx.lineJoin = 'round';
                    tctx.strokeText(text, xx, yy);
                    tctx.fillText(text, xx, yy);
                }
                // Draw the cached text
                ctx.drawImage(tctx.canvas, Math.round(x-xx), Math.round(y-yy*(center ? 1.05 : 1.5)));
            },
        };
    };
})();

// Gui drawing functions
function drawGuiRect(x, y, length, height, stroke = false) {
    if (stroke) {
        ctx.strokeRect(x, y, length, height);
    } else {
        ctx.fillRect(x, y, length, height);
    }
}

function drawGuiRoundRect(x, y, w, h, r, stroke = !1, cornerArray = [!0, !0, !0, !0]) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, cornerArray[0] ? r : 0);
	ctx.arcTo(x + w, y + h, x, y + h, cornerArray[1] ? r : 0);
	ctx.arcTo(x, y + h, x, y, cornerArray[2] ? r : 0);
	ctx.arcTo(x, y, x + w, y, cornerArray[3] ? r : 0);
	ctx.closePath();
	stroke ? ctx.stroke() : ctx.fill()
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.beginPath();
	this.moveTo(x + r, y);
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	this.closePath();
	return this
};

function drawGuiCircle(x, y, radius, stroke = false) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    ctx.closePath()
    if (stroke) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
}

function drawGuiLine(x1, y1, x2, y2) {
    ctx.beginPath();
        ctx.lineTo(Math.round(x1) + 0.5, Math.round(y1) + 0.5);
        ctx.lineTo(Math.round(x2) + 0.5, Math.round(y2) + 0.5);
    ctx.closePath();
    ctx.stroke();
}

function drawBar(x1, x2, y, width, color) {
    ctx.beginPath();
        ctx.lineTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
    ctx.closePath();
    ctx.stroke();
}

// Entity drawing (this is a function that makes a function)
const drawEntity = (() => {
	function drawPoly(context, centerX, centerY, radius, sides, angle = 0, fill = true) {
		angle += sides % 2 ? 0 : Math.PI / sides;
		context.beginPath();
		if (!sides) {
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
		} else if (sides < 0) {
			if (config.graphical.pointy) context.lineJoin = "miter";
			else radius *= 1.25;
			let dip = 1 - 6 / sides / sides;
			sides = -sides;
			context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
			for (let i = 0; i < sides; i++) {
				var theta = (i + 1) / sides * 2 * Math.PI;
				var htheta = (i + .5) / sides * 2 * Math.PI;
				var c = {
					x: centerX + radius * dip * Math.cos(htheta + angle),
					y: centerY + radius * dip * Math.sin(htheta + angle)
				};
				var p = {
					x: centerX + radius * Math.cos(theta + angle),
					y: centerY + radius * Math.sin(theta + angle)
				};
				context.quadraticCurveTo(c.x, c.y, p.x, p.y)
			}
		} else if (sides === 123) {
    for (let [scale, theta] of [
      [0.09,-0.71],
      [0.6,-0.81],
      [1.01,-0.01],
      [0.586,0.8],
      [0.106,0.69],
      [-1.014,0.815],
      [-0.614,0.335],
      [-0.61,-0.32],
      [-1,-0.825]
       ]) context.lineTo(
                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
            );
        }  else if (sides === 102) { 
            for (let [scale, theta] of [
                [1, 0],
                [1, 0.4 * Math.PI],
                [1, 0.8 * Math.PI],
                [-0.1, 0],
                [1, 1.2 * Math.PI],
                [1, 1.6 * Math.PI],
            ]) context.lineTo(
                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
            );
        } else if (sides === 1600) {
			for (let i = 0; i < 16; i++) {
				let theta = i / 16 * 2 * Math.PI,
					x = centerX + radius * 1 * Math.cos(180 / 10.3 + theta + angle),
					y = centerY + radius * 1 * Math.sin(180 / 10.3 + theta + angle);
				context.lineTo(x, y)
			}
		} else if (sides === 600) {
			for (let i = 0; i < 6; i++) {
				let theta = i / 6 * 2 * Math.PI,
					x = centerX + radius * 1.1 * Math.cos(180 / 6 + theta + angle + .385),
					y = centerY + radius * 1.1 * Math.sin(180 / 6 + theta + angle + .385);
				context.lineTo(x, y)
			}
		} else if (sides == 9e3) {
			let bruh = 3;
      rickrolled.play();
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(rickroll, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 999) { //Ned Flanders
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(ned, -radius * .6 * bruh, -radius * .5 * bruh, radius * bruh + 30, radius * bruh + 30);
			context.restore()
		} else if (sides == 1234) { //AK-47
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(ak47, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh + 40, radius * bruh);
			context.restore()
		} else if (sides == 2222){//Big Brain!
      let bruh = 3;
      context.save();
      context.beginPath();
      context.translate(centerX, centerY);
      context.rotate(angle);
      context.drawImage(bigbrain, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh)
      context.restore()
    } else if (sides == 3000){//A Knife
      let bruh = 3;
      context.save();
      context.beginPath();
      context.translate(centerX, centerY);
      context.rotate(angle);
      context.drawImage(knife, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh)
      context.restore()
    } else if (sides == 2121) { //amogus
			let bruh = 3;
      amongdrip.play();
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(amogus, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 1002) {
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(cbullet, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 1003) {
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(bloodlust, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 1005) {
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(juggernaut, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 1010) {
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(catalysm, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 3434) { // Soccer Ball
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(soccer, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 1001) { // secret stuff
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(domatrix, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides == 1e3) { // The bible
			let bruh = 3;
			context.save();
			context.beginPath();
			context.translate(centerX, centerY);
			context.rotate(angle);
			context.drawImage(bible, -radius * .5 * bruh, -radius * .5 * bruh, radius * bruh, radius * bruh);
			context.restore()
		} else if (sides === 112) { // Diamond
      for (let i = 0; i < 4; i++) {
      let theta = (i / 4) * 2 * Math.PI,
      x = centerX + radius * Math.cos(theta + angle),
      y = centerY + radius * Math.sin(theta + angle);
      if (i === 2) {
      x = centerX + (radius * -1.5) * Math.cos(angle);
      y = centerY + (radius * -1.5) * Math.sin(angle);
      } else if (i === 0 || i === 4) {
      x = centerX + (radius * 1.5) * Math.cos(angle);
      y = centerY + (radius * 1.5) * Math.sin(angle);
      }
      context.lineTo(x, y);
      }
    }  else if (sides === 166) { // Donut
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
      context.arc(centerX, centerY, radius / 1.7, 0, 2 * Math.PI, false);
    } else if (sides > 0) {
			for (let i = 0; i < sides; i++) {
				let theta = i / sides * 2 * Math.PI;
				let x = centerX + radius * Math.cos(theta + angle);
				let y = centerY + radius * Math.sin(theta + angle);
				context.lineTo(x, y)
			}
		}else if (sides === 201) {
        context.beginPath
     let path = new Path2D('M 1.1926452,8.2525e-4 .57453922,0.95420971 .04413176,0.78344108 -1.2866688,0.94915731 -0.64483857,0.28750215 v -0.57500783 l -0.64183023,-0.66165511 1.33080056,0.16571618 .53040746,-0.1707686 z');  
        context.save();
				context.translate(centerX, centerY);
				context.scale(radius, radius);
				context.rotate(angle);
				context.stroke(path);
				context.fill(path);
				context.restore();
    }
		context.closePath();
		context.stroke();
		if (fill) {
			context.fill()
		}
		context.lineJoin = "round"
	}
    // The big drawing function
    return (x, y, instance, ratio, alpha=1, scale=1, rot=0, turretsObeyRot=false, assignedContext=false, turretInfo=false, render=instance.render) => {
        let context = assignedContext || ctx
        let fade = turretInfo ? 1 : render.status.getFade(),
            drawSize = scale * ratio * instance.size,
            m = mockups[instance.index],
            xx = x, yy = y,
            source = (turretInfo === false) ? instance : turretInfo;
        if (fade === 0 || alpha === 0) return
        if (render.expandsWithDeath) drawSize *= (1 + 0.5 * (1 - fade));
        if (assignedContext !== ctx2 && (fade !== 1 || alpha !== 1)) {
            if (config.graphical.fancyAnimations) {
                context = ctx2;
                context.canvas.width = context.canvas.height = drawSize * m.position.axis + ratio * 20;
                xx = context.canvas.width / 2 - drawSize * m.position.axis * m.position.middle.x * Math.cos(rot) / 4;
                yy = context.canvas.height / 2 - drawSize * m.position.axis * m.position.middle.x * Math.sin(rot) / 4;
                assignedContext = false;
            } else {
                if (fade * alpha < 0.5) return
            }
        }
        if (typeof context !== 'object') context = ctx
        context.lineCap = 'round';
        context.lineJoin = 'round';
        // Draw turrets beneath us
        if (source.turrets.length === m.turrets.length) {
            for (let i = 0; i < m.turrets.length; i++) {
                let t = m.turrets[i];
                if (t.layer === 0) {
                    let ang = t.direction + t.angle + rot,
                        len = t.offset * drawSize;
                    drawEntity(
                        xx + len * Math.cos(ang),
                        yy + len * Math.sin(ang),
                        t, ratio, alpha, drawSize / ratio / t.size * t.sizeFactor,
                        source.turrets[i].facing + turretsObeyRot * rot,
                        turretsObeyRot, context, source.turrets[i], render
                    );
                }
            }
        } else {
            throw new Error("Mismatch turret number with mockup.");
        }
      function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function setRandomColor() {
  $("#colorpad").css("background-color", getRandomColor());
}
        // Draw guns  
        source.guns.update();
        context.lineWidth = Math.max(config.graphical.mininumBorderChunk, ratio * config.graphical.borderChunk);
        if (source.guns.length === m.guns.length) {
            let positions = source.guns.getPositions();
            for (let i = 0; i < m.guns.length; i++) {
                let g = m.guns[i],
                    position = positions[i] / ((g.aspect === 1) ? 2 : 1),
                    gx =
                    g.offset * Math.cos(g.direction + g.angle + rot) +
                    (g.length / 2 - position) * Math.cos(g.angle + rot),
                    gy =
                    g.offset * Math.sin(g.direction + g.angle + rot) +
                    (g.length / 2 - position) * Math.sin(g.angle + rot);
              setColor(context, mixColors(getColor(g.color), render.status.getColor(), render.status.getBlend()))
                drawTrapezoid(
                    context,
                    xx + drawSize * gx,
                    yy + drawSize * gy,
                    drawSize * (g.length / 2 - ((g.aspect === 1) ? position * 2 : 0)),
                    drawSize * g.width / 2,
                    g.aspect,
                    g.angle + rot,
                ); // add back the previous code. g.color?
            }  // @everyone
        } else {
            throw new Error("Mismatch gun number with mockup.");
        }
        // Draw body
        context.globalAlpha = 1;
        setColor(context, mixColors(getColor(instance.color), render.status.getColor(), render.status.getBlend()));
        drawPoly(context, xx, yy, drawSize / m.size * m.realSize, m.shape, rot);
        // Draw turrets above us
        if (source.turrets.length === m.turrets.length) {
            for (let i=0; i<m.turrets.length; i++) {
                let t = m.turrets[i];
                if (t.layer === 1) {
                    let ang = t.direction + t.angle + rot,
                        len = t.offset * drawSize;
                    drawEntity(
                        xx + len * Math.cos(ang),
                        yy + len * Math.sin(ang),
                        t, ratio, alpha, drawSize / ratio / t.size * t.sizeFactor,
                        source.turrets[i].facing + turretsObeyRot * rot,
                        turretsObeyRot, context, source.turrets[i], render
                    );
                }
            }
        } else { throw new Error("Mismatch turret number with mockup."); }
        if (!assignedContext && context !== ctx) {
            ctx.save();
            ctx.globalAlpha = alpha * fade;
            //ctx.globalCompositeOperation = "overlay";
            ctx.drawImage(context.canvas, x - xx, y - yy);
            ctx.restore();
            //ctx.globalCompositeOperation = "source-over";
        }
    };
})();

function drawHealth(x, y, instance, ratio, alpha) {
    if (alpha < 0.05) return
    // Draw health bar
    let fade = instance.render.status.getFade()
    fade *= fade;
    ctx.globalAlpha = fade;
    let size = instance.size * ratio;
    let m = mockups[instance.index];
    let realSize = size / m.size * m.realSize;
    // Draw health
    if (instance.drawsHealth) {
        let health = instance.render.health.get();
        let shield = instance.render.shield.get();
        if (health < 1 || shield < 1) {
            let yy = y + 1.1*realSize + 15;
            ctx.globalAlpha = alpha * alpha * fade;
            if (config.graphical.shieldbars) {
                drawBar(x-size, x+size, yy, 6 + config.graphical.barChunk, color.black);
                if (shield) {
                    drawBar(x-size, x-size+2*size*health, yy + 1.5, 3, color.lgreen);
                    ctx.globalAlpha *= 0.7;
                    drawBar(x-size, x-size+2*size*shield, yy - 1.5, 3, color.teal);
                } else {
                    drawBar(x-size, x-size+2*size*health, yy, 4, color.lgreen);
                }
            } else {
                drawBar(x-size, x+size, yy, 3 + config.graphical.barChunk, color.black);
                drawBar(x-size, x-size+2*size*health, yy, 3, color.lgreen);
                if (shield) {
                    ctx.globalAlpha *= (0.3 + shield*0.3);
                    drawBar(x-size, x-size+2*size*shield, yy, 3, color.teal);
                }
            }
            ctx.globalAlpha = fade;
        }
    }
    // Draw label
    if (instance.nameplate && instance.id !== gui.playerid) {
        if (instance.render.textobjs == null) instance.render.textobjs = [TextObj(), TextObj()];
        var name = instance.name
        var namecolor = color.guiwhite
        if (instance.name === 'Party Time!!!') {
           function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
          //  name = name.slice(2)
            if (name.length)
                namecolor = getRandomColor()
        }
        if (instance.name === 'Trans Rites') {
           function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
          //  name = name.slice(2)
            if (name.length)
                namecolor = getRandomColor()
        }
         /* if (name.startsWith('ai_')) {
            name = name.slice(3)
            if (name.length)
                namecolor = mixColors(color.blue, namecolor, 0.125)
        }*/
      if (name.startsWith('/u0b/')) {
            name = name.slice(5)
        }
       if (instance.name === 'Kitty!') {
          //  name = name.slice(2)
            if (name.length)
                namecolor =   namecolor = mixColors(color.lavender, namecolor, 0.125)
        }
        if (instance.name.includes('USA')) {
                            instance.render.textobjs[0].draw('U', x - 14, y - realSize - 50, 16, color.red, 'center');
                            instance.render.textobjs[0].draw('S', x, y - realSize - 50, 16, color.guiwhite, 'center');
                            instance.render.textobjs[0].draw('A', x + 14, y - realSize - 50, 16, color.blue, 'center');
                        } 

        if (instance.name === 'Oblivion Plain') {
          //  name = name.slice(2)
            if (name.length)
                namecolor = mixColors(color.guiblack, namecolor, 0.125)
        }  if (instance.name === 'Big Boy Bodyguard') {
          //  name = name.slice(2)
            if (name.length)
                namecolor = mixColors(color.yellow, namecolor, 0.125)
        }
        if (instance.name === 'xxxMclaren570Sxxx') {
          //  name = name.slice(2)
            if (name.length)
                namecolor = mixColors(color.yellow, namecolor, 0.125)
        }
       if (instance.name === 'ᅚᅚ') {
          //  name = name.slice(2)
            if (name.length)
                namecolor = mixColors(color.yellow, namecolor, 0.125)
        }
        ctx.globalAlpha = alpha
        instance.render.textobjs[0].draw(
            name,
            x, y - realSize - 30, 16, namecolor, 'center'
        );
        instance.render.textobjs[1].draw(
            util.handleLargeNumber(instance.score, true),
            x, y - realSize - 16, 8, namecolor, 'center'
        );
     
        ctx.globalAlpha = 1
    }
}

// Start animation
if (!window.requestAnimationFrame)
    window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.msRequestAnimationFrame     ||
        function( callback ) {
            window.setTimeout(callback, 1000 / 60);
        };

// Drawing states
const gameDraw = (() => {
    const statMenu = Smoothbar(0, 0.7, 1.5);
    const upgradeMenu = Smoothbar(0, 2, 3);
    // Define the graph constructor
    function graph() {
        var data = [];
        return (point, x, y, w, h, col) => {
            // Add point and push off old ones
            data.push(point);
            while (data.length > w) { data.splice(0, 1); }
            // Get scale
            let min = Math.min(...data),
                max = Math.max(...data),
                range = max - min;
            // Draw zero
            if (max > 0 && min < 0) {
                drawBar(x, x+w, y+h*max/range, 2, color.guiwhite);
            }
            // Draw points
            ctx.beginPath();
            ctx.moveTo(x, y+h*(max-data[0])/range);
            for (let i = 1; i < data.length; i++) {
                ctx.lineTo(x + i, y + h * (max - data[i]) / range);
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = col;
            ctx.stroke();
        };
    }
    // Lag compensation functions
	const compensation = (() => {
		function interpolate(p1, p2, v1, v2, tt) {
			let k = Math.cos((1 + tt) * Math.PI);
			return .5 * (((1 + tt) * v1 + p1) * (k + 1) + (-tt * v2 + p2) * (1 - k))
		}

		function extrapolate(p1, p2, v1, v2, tt) {
			return p2 + (p2 - p1) * tt
		}

		function angleDifference(targetA, sourceA) {
			let mod = (a, n) => (a % n + n) % n;
			let a = targetA - sourceA;
			return mod(a + Math.PI, 2 * Math.PI) - Math.PI
		}
		return (sinceLastUpdate = getRelative() - metrics.lastuplink, updateFreq = metrics.rendergap) => {
			updateFreq = Math.max(updateFreq, 1e3 / config.roomSpeed / 30);
			let frameProgress = sinceLastUpdate / updateFreq;
			return {
				predict: (p1, p2, v1, v2) => {
					if (global.predictionMode === 0) {
						return p2
					} else if (global.predictionMode === 2) {
						return frameProgress >= 1 ? extrapolate(p1, p2, v1, v2, frameProgress - 1) : interpolate(p1, p2, v1, v2, frameProgress - 1)
					}
					return frameProgress >= 1 ? p2 : p1 + (p2 - p1) * frameProgress
				},
				predictExtrapolate: (p1, p2, v1, v2) => {
					return p1 + (p2 - p1) * frameProgress
				},
				predictFacing: (f1, f2) => {
					return frameProgress >= 1 ? f2 : f1 + angleDifference(f2, f1) * frameProgress
				},
				getPrediction: () => frameProgress
			}
		}
	})();
	(() => {
		function interpolate(p1, p2, v1, v2, ts, tt) {
			let k = Math.cos((1 + tt) * Math.PI);
			return .5 * (((1 + tt) * v1 + p1) * (k + 1) + (-tt * v2 + p2) * (1 - k))
		}

		function extrapolate(p1, p2, v1, v2, ts, tt) {
			return p2 + (p2 - p1) * tt
		}

		function angleDifference(sourceA, targetA) {
			let mod = function (a, n) {
				return (a % n + n) % n
			};
			let a = targetA - sourceA;
			return mod(a + Math.PI, 2 * Math.PI) - Math.PI
		}
		return (time = player.time, interval = metrics.rendergap) => {
			let timediff = 0,
				t = 0,
				tt = 0,
				ts = 0;
			t = Math.max(getNow() - time - 80, -interval);
			if (t > 150 && t < 1e3) {
				t = 150
			}
			if (t > 1e3) {
				t = 1e3 * 1e3 * Math.sin(t / 1e3 - 1) / t + 1e3
			}
			tt = t / interval;
			ts = config.roomSpeed * 30 * t / 1e3;
			return {
				predict: (p1, p2, v1, v2) => {
					return t >= 0 ? extrapolate(p1, p2, v1, v2, ts, tt) : interpolate(p1, p2, v1, v2, ts, tt)
				},
				predictExtrapolate: (p1, p2, v1, v2) => {
					return t >= 0 ? extrapolate(p1, p2, v1, v2, ts, tt) : interpolate(p1, p2, v1, v2, ts, tt)
				},
				predictFacing: (f1, f2) => {
					return f1 + (1 + tt) * angleDifference(f1, f2)
				},
				getPrediction: () => {
					return t
				}
			}
		}
	})();
    // Make graphs
    const timingGraph = graph(),
        lagGraph = graph(),
        gapGraph = graph();
    // The skill bar dividers
    const ska = (() => {
        let a = []
        for (let i=0; i < config.gui.expectedMaxSkillLevel * 2; i++)
            a.push(Math.log(4 * i / config.gui.expectedMaxSkillLevel + 1) / Math.log(5))
        // The actual lookup function
        return x => a[x]
    })();
    // Text objects
     const text = {
        skillNames: [
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
        ],
        skillKeys: [
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
        ],
        skillValues: [
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
        ],
        skillPoints: TextObj(),
        score: TextObj(),
        name: TextObj(),
        class: TextObj(),
        debug: [
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
        ],
        lbtitle: TextObj(),
        leaderboard: [
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
          
        ],
         upgradeNames: [
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
            TextObj(),
        ],
        upgradeKeys: [
           
        ],
        skipUpgrades: TextObj(),
    };
    // The drawing loop
    return ratio => {
        //lag.set();
        let GRAPHDATA = 0;
        // Prep stuff
        renderTimes++;
        let screenRatio = Math.max(global.screenWidth, global.screenHeight * 16 / 9) / (global.screenWidth <= 1280 ? 1280 : global.screenWidth >= 1920 ? 1920 : global.screenWidth);
        let px, py;
        { // Move the camera
            let motion = compensation(); //motion.set();
            //let smear = moveCompensation.get();
            GRAPHDATA = motion.getPrediction();
            // Don't move the camera if you're dead. This helps with jitter issues
            let desiredx = motion.predict(player.lastx, player.cx, player.lastvx, player.vx)// + smear.x;
            let desiredy = motion.predict(player.lasty, player.cy, player.lastvy, player.vy)// + smear.y;
            /*player.renderx = player.renderx * 0.6 + desiredx * 0.4
            player.rendery = player.rendery * 0.6 + desiredy * 0.4
            if (global.unchainCamera) {*/
                player.renderx = desiredx
                player.rendery = desiredy
            //}
            px = ratio * player.renderx;
            py = ratio * player.rendery;
        }

        { // Clear the background + draw grid
            clearScreen(color.white, 1);
            clearScreen(color.guiblack, 0.1);

            /*ctx.save()
            ctx.beginPath()
            ctx.moveTo(ratio*global.gameWidth*0.25 - px + global.screenWidth / 2, ratio*global.gameHeight*0.0 - py + global.screenHeight / 2)
            ctx.lineTo(ratio*global.gameWidth*0.75 - px + global.screenWidth / 2, ratio*global.gameHeight*0.0 - py + global.screenHeight / 2)
            ctx.lineTo(ratio*global.gameWidth*1.00 - px + global.screenWidth / 2, ratio*global.gameHeight*0.5 - py + global.screenHeight / 2)
            ctx.lineTo(ratio*global.gameWidth*0.75 - px + global.screenWidth / 2, ratio*global.gameHeight*1.0 - py + global.screenHeight / 2)
            ctx.lineTo(ratio*global.gameWidth*0.25 - px + global.screenWidth / 2, ratio*global.gameHeight*1.0 - py + global.screenHeight / 2)
            ctx.lineTo(ratio*global.gameWidth*0.00 - px + global.screenWidth / 2, ratio*global.gameHeight*0.5 - py + global.screenHeight / 2)
            ctx.closePath()
            ctx.clip()*/
            let W = roomSetup[0].length, H = roomSetup.length;
            for (let i = 0; i < H; i++) {
                let row = roomSetup[i];
                for (let j = 0; j < W; j++) {
                    let left = Math.max(0, ratio*j*global.gameWidth/W - px + global.screenWidth / 2),
                        top = Math.max(0, ratio*i*global.gameHeight/H - py + global.screenHeight / 2),
                        right = Math.min(global.screenWidth, (ratio*(j+1)*global.gameWidth/W - px) + global.screenWidth / 2),
                        bottom = Math.min(global.screenHeight, (ratio*(i+1)*global.gameHeight/H - py) + global.screenHeight / 2);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = color.white;
                    ctx.fillRect(left, top, right-left, bottom-top);
                    ctx.globalAlpha = 0.3;
                    ctx.fillStyle = getZoneColor(row[j]);
                    ctx.fillRect(left, top, right-left, bottom-top);
                }
            }
            //ctx.restore()

            ctx.lineWidth = 1;
            ctx.strokeStyle = color.guiblack;
            ctx.globalAlpha = 0.04;
            ctx.beginPath();
            let gridsize = 30 * ratio;
            for (let x=(global.screenWidth/2-px)%gridsize; x < global.screenWidth; x += gridsize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, global.screenHeight);
            }
            for (let y=(global.screenHeight/2-py)%gridsize; y < global.screenHeight; y += gridsize) {
                ctx.moveTo(0, y);
                ctx.lineTo(global.screenWidth, y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        { // Draw things
            player.x = player.y = null
            function entitydrawingloop(instance) {
                if (!instance.render.draws) {
                    return 1;
                }
                if (instance.render.status.getFade() === 1) {
                    let motion = compensation()
                    instance.render.x = motion.predict(instance.render.lastx, instance.x, instance.render.lastvx, instance.vx);
                    instance.render.y = motion.predict(instance.render.lasty, instance.y, instance.render.lastvy, instance.vy);
                    instance.render.f = motion.predictFacing(instance.render.lastf, instance.facing)
                } else {
                    let motion = compensation(instance.render.lastRender, instance.interval)
                    instance.render.x = motion.predictExtrapolate(instance.render.lastx, instance.x, instance.render.lastvx, instance.vx);
                    instance.render.y = motion.predictExtrapolate(instance.render.lasty, instance.y, instance.render.lastvy, instance.vy);
                    instance.render.f = motion.predictFacing(instance.render.lastf, instance.facing)
                }
                if (instance.id === gui.playerid && (instance.twiggle & 1) === 0) {
                    instance.render.f = Math.atan2(target.y, target.x)
                    if (instance.twiggle & 2)
                        instance.render.f += Math.PI
                }
                let x = ratio * instance.render.x - px
                  , y = ratio * instance.render.y - py;
                x += global.screenWidth / 2;
                y += global.screenHeight / 2;
                if (instance.id === gui.playerid) {
                    player.x = x
                    player.y = y
                }
                drawEntity(x, y, instance, ratio, (instance.id === gui.playerid || global.showInvisible) ? instance.alpha ? (instance.alpha * 0.6 + 0.4) : 0.25 : instance.alpha, 1.1, instance.render.f, false, true);
            }
            for (let i = 0; i < entities.length; i++) {
              entitydrawingloop(entities[i]);
            }
            if (!config.graphical.screenshotMode) {
                function entityhealthdrawingloop(instance) {
                    let x = ratio * instance.render.x - px,
                        y = ratio * instance.render.y - py;
                    x += global.screenWidth / 2;
                    y += global.screenHeight / 2;
                    drawHealth(x, y, instance, ratio, (instance.id === gui.playerid) ? 1 : instance.alpha);
                }
                for (let i = 0; i < entities.length; i++) {
                  entityhealthdrawingloop(entities[i]);
                }
            }
        }
        if (global.hideGui) {
            metrics.lastrender = getNow();
            return
        }
        let scaleScreenRatio = (by, unset) => {
            global.screenWidth /= by
            global.screenHeight /= by
            ctx.scale(by, by)
            if (!unset) screenRatio *= by
        }
        scaleScreenRatio(screenRatio, true)
        // Draw GUI
        let alcoveSize = 200;
        let spacing = 20;
        gui.__s.update();
        let lb = leaderboard.get();
        let max = lb.max;

let tankMenuColor = 100 + Math.round(Math.random() * 70),
    searchName = 'Basic';

       do {
                            if (!global.showTree) break;
                            if (global.died) {
                                global.showTree = false;
                                global.scrollX = 0;
                            }
                            let basic = mockups.find(r => r.name === searchName);
                            if (!basic) break;
                            let tiles = [],
                                branches = [],
                                measureSize = (x, y, colorIndex, {index, tier = 0}) => {
                                    tiles.push({x, y, colorIndex, index});
                                    let {upgrades} = mockups[index];
                                    switch (tier) {
                                        case 4:
                                            return {
                                                width: 1,
                                                height: 1
                                            };
                                        case 3:
                                          upgrades.forEach((u, i) => measureSize(x, y + 2 + i, i, u));
                                          branches.push([{x, y}, {x, y: y + 1 + upgrades.length}]);
                                            return {
                                                width: 1, 
                                                height: 2 + upgrades.length
                                            };
                                        case 2:
                                        case 1:
                                        case 0:
                                            {
                                                let xStart = x,
                                                    us = upgrades.map((u, i) => {
                                                        let spacing = 2 * (u.tier - tier),
                                                            measure = measureSize(x, y + spacing, i, u);
                                                        branches.push([{
                                                            x,
                                                            y: y + (i === 0 ? 0 : 1)
                                                        }, {
                                                            x,
                                                            y: y + spacing
                                                        }])
                                                        if (i + 1 === upgrades.length) branches.push([{
                                                            x: xStart,
                                                            y: y + 1
                                                        }, {
                                                            x,
                                                            y: y + 1
                                                        }])
                                                        x += measure.width
                                                        return measure
                                                    })
                        					return {
                        						width: us.map(r => r.width).reduce((a, b) => a + b, 0),
                        						height: 2 + Math.max(...us.map(r => r.height)),
                        					}
                        				}
                                    }
                                },
                                full = measureSize(0, 0, 0, {
                                	index: basic.index
                                }),
                                tileDiv = searchName == 'Basic' ? 1 : 1.25,
                                tileSize = Math.min(global.screenWidth * .9 / full.width * 55, global.screenHeight * .9 / full.height) / tileDiv,
                                size = tileSize - 4;
                            for (let [start, end] of branches) {
                            	let sx = global.screenWidth / 2 + (start.x - full.width  * global.scrollX) * tileSize + 1 + 0.5 * size,
                            	    sy = global.screenHeight / 2 + (start.y - full.height / 2) * tileSize + 1 + 0.5 * size,
                            	    ex = global.screenWidth / 2 + (end.x - full.width * global.scrollX) * tileSize + 1 + 0.5 * size,
                                    ey = global.screenHeight / 2 + (end.y - full.height / 2) * tileSize + 1 + 0.5 * size;
                            	ctx.strokeStyle = color.black;
                            	ctx.lineWidth = 2;
                            	drawGuiLine(sx, sy, ex, ey);
                            }
                            for (let {x, y, colorIndex, index} of tiles) {
                                let ax = global.screenWidth / 2 + (x - full.width * global.scrollX) * tileSize,
                                    ay = global.screenHeight / 2 + (y - full.height / 2) * tileSize,
                                    size = tileSize;
                                colorIndex = tankMenuColor;
                                if (ax < -50 || ax + size - 50 > global.screenWidth) continue;
                                ctx.globalAlpha = .75;
                                ctx.fillStyle = getColor(colorIndex > 185 ? colorIndex - 85 : colorIndex);
                                drawGuiRect(ax, ay, size, size);
                                ctx.globalAlpha = .15;
                                ctx.fillStyle = getColor(-10 + (colorIndex++ - (colorIndex > 185 ? 85 : 0)));
                                drawGuiRect(ax, ay, size, size * .6);
                                ctx.fillStyle = color.black;
                                drawGuiRect(ax, ay + size * .6, size, size * .4);
                                ctx.globalAlpha = 1;
                                let angle = -Math.PI / 4,
                                    picture = getEntityImageFromMockup(index, gui.color),
                                    position = mockups[index].position,
                                    scale = .8 * size / position.axis,
                                    xx = ax + .5 * size - scale * position.middle.x * Math.cos(angle),
                                    yy = ay + .5 * size - scale * position.middle.x * Math.sin(angle);
                                drawEntity(xx, yy, picture, .5, 1, scale / picture.size * 2, angle, true);
                                ctx.strokeStyle = color.black;
                                ctx.globalAlpha = 1;
                                ctx.lineWidth = 2;
                                drawGuiRect(ax, ay, size, size, true);
                            }
                        } while (false);


        if (global.mobile && canvas.control === 'joysticks') { // joysticks
            let radius = Math.min(global.screenWidth * 0.6, global.screenHeight * 0.12)
            ctx.globalAlpha = 0.3
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.arc(global.screenWidth * 1/6, global.screenHeight * 2/3, radius, 0, 2 * Math.PI)
            ctx.arc(global.screenWidth * 5/6, global.screenHeight * 2/3, radius, 0, 2 * Math.PI)
            ctx.fill()
        }

        if (global.mobile) scaleScreenRatio(1.4)
        { // Draw messages
            let vspacing = 4;
            let len = 0;
            let height = 18;
            let x = global.screenWidth/2;
            let y = spacing;
            if (global.mobile)
              y += (global.canSkill ? (alcoveSize / 3 + spacing) / 1.4 * statMenu.get() : 0) +
                   (global.canUpgrade ? (alcoveSize / 2 + spacing) / 1.4 * upgradeMenu.get() : 0)
            // Draw each message
            for (let i=messages.length-1; i>=0; i--) {
                let msg = messages[i],
                    txt = msg.text,
                    text = txt; //txt[0].toUpperCase() + txt.substring(1);
                // Give it a textobj if it doesn't have one
                if (msg.textobj == null) msg.textobj = TextObj();
                if (msg.len == null) msg.len = measureText(text, height-4);
                // Draw the background
                ctx.globalAlpha = 0.5 * msg.alpha;
                drawBar(x-msg.len/2, x+msg.len/2, y+height/2, height, color.black);
                // Draw the text
                ctx.globalAlpha = Math.min(1, msg.alpha);
                msg.textobj.draw(text, x, y + height/2, height-4, color.guiwhite, 'center', true);
                // Iterate and move
                y += (vspacing + height);
                if (msg.status > 1) {
                    y -= (vspacing + height) * (1 - Math.sqrt(msg.alpha));
                }
                if (msg.status > 1) {
                    msg.status -= 0.05;
                    msg.alpha += 0.05;
                } else if (i === 0 && (messages.length > 5 || Date.now() - msg.time > 10000)) {
                    msg.status -= 0.05;
                    msg.alpha -= 0.05;
                    // Remove
                    if (msg.alpha <= 0) {
                        messages.splice(0, 1);
                    }
                }
            }
            ctx.globalAlpha = 1;
        }
        if (global.mobile) scaleScreenRatio(1 / 1.4)
        if (!global.mobile) { // Draw skill bars
            global.canSkill = gui.points > 0 && gui.skills.some(skill => skill.amount < skill.cap);
            statMenu.set(0 + (global.canSkill || global.died || global.statHover));
            global.clickables.stat.hide();

            let vspacing = 4;
            let height = 15;
            let gap = 35;
            let len = alcoveSize; // The 30 is for the value modifiers
            let save = len;
            let x = -spacing - 2*len + statMenu.get() * (2*spacing + 2*len);
            let y = global.screenHeight - spacing - height;
            let ticker = 11;
            let namedata = gui.getStatNames(mockups[gui.type].statnames || -1);
            function drawASkillBar(skill) { // Individual skill bars
                ticker--;
                let name = namedata[ticker-1],
                    level = skill.amount,
                    col = color[skill.color],
                    cap = skill.softcap,
                    maxLevel = skill.cap;
                if (cap) {
                    len = save;
                    let max = config.gui.expectedMaxSkillLevel,
                        extension = cap > max,
                        blocking = cap < maxLevel;
                    if (extension) {
                        max = cap;
                    }
                    drawBar(x+height/2, x-height/2+len*ska(cap), y+height/2, height - 3 + config.graphical.barChunk, color.black);
                    drawBar(x+height/2, x+height/2+(len-gap)*ska(cap), y+height/2, height-3, color.grey);
                    drawBar(x+height/2, x+height/2+(len-gap)*ska(level), y+height/2, height-3.5, col);
                    // Blocked-off area
                    if (blocking) {
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = color.grey;
                        for (let j=cap+1; j<max; j++) {
                            drawGuiLine(
                                x + (len-gap) * ska(j), y+1.5 ,
                                x + (len-gap) * ska(j), y-3 + height
                            );
                        }
                    }
                    // Vertical dividers
                    ctx.strokeStyle = color.black;
                    ctx.lineWidth = 1;
                    for (let j=1; j<level+1; j++) {
                        drawGuiLine(
                            x + (len-gap) * ska(j), y+1.5,
                            x + (len-gap) * ska(j), y-3 + height
                        );
                    }
                    // Skill name
                    len = save * ska(max);
                    let textcolor = (level === maxLevel) ? col : (!gui.points || (cap !== maxLevel && level === cap)) ? color.grey : color.guiwhite;
                    text.skillNames[ticker-1].draw(
                        name,
                        Math.round(x + len / 2) + 0.5, y + height/2,
                        height - 5, textcolor, 'center', true
                    );
                    // Skill key
                    text.skillKeys[ticker-1].draw(
                        '[' + (ticker % 10) + ']',
                        Math.round(x + len - height * 0.25) - 1.5, y + height/2,
                        height - 5, textcolor, 'right', true
                    );
                    if (textcolor === color.guiwhite) { // If it's active
                        global.clickables.stat.place(ticker-1, x * screenRatio, y * screenRatio, len * screenRatio, height * screenRatio);
                    }
                    // Skill value
                    if (level) {
                        text.skillValues[ticker-1].draw(
                            (textcolor === col) ? 'MAX' : '+'+level,
                            Math.round(x + len + 4) + 0.5, y + height/2,
                            height - 5, col, 'left', true
                        );
                    }
                    // Move on
                    y -= height + vspacing;
                }
            }
            for (let i = 0; i < gui.skills.length; i++) {
              drawASkillBar(gui.skills[i]);
            }
            global.clickables.hover.place(0, 0, y * screenRatio, 0.8 * len * screenRatio, 0.8 * (global.screenHeight - y) * screenRatio);
            if (gui.points > 1) { // Draw skillpoints to spend
                text.skillPoints.draw('x' + gui.points, Math.round(x + len - 2) + 0.5, Math.round(y + height - 4) + 0.5, 20, color.guiwhite, 'right');
            }
        }

        { // Draw name, exp and score bar
            let vspacing = 4;
            var namecolor = color.guiwhite;
          
            let len = 1.65 * alcoveSize;
            let height = 25;
            let x = (global.screenWidth - len) / 2;
            let y = global.screenHeight - spacing - height;
            if (!adblock && !global.mobile && global.died) {
                y -= 110
            }
            ctx.lineWidth = 1;
            // Handle exp
            // Draw the exp bar
            drawBar(x, x+len, y+height/2, height-3+config.graphical.barChunk, color.black);
            drawBar(x, x+len, y+height/2, height-3, color.grey);
            drawBar(x, x+len*gui.__s.getProgress(), y+height/2, height-3.5, color.gold);
            // Draw the class type
            text.class.draw(
                'Level ' + gui.__s.getLevel() + ' ' + mockups[gui.type].name,
                x + len/2, y + height/2,
                height - 4, namecolor, 'center', true
            );
            height = 14;
            y -= height + vspacing;
            // Draw the %-of-leader bar
            drawBar(x+len*0.1, x+len*0.9, y+height/2, height-3+config.graphical.barChunk, color.black);
            drawBar(x+len*0.1, x+len*0.9, y+height/2, height-3, color.grey);
            drawBar(x+len*0.1, x+len*(0.1 + 0.8*((max) ? Math.min(1, gui.__s.getScore()/max) : 1)), y+height/2, height-3.5, color.green);
            // Draw the score
            text.score.draw(
                'Score: ' + util.formatLargeNumber(gui.__s.getScore()),
                x + len/2, y + height/2,
                height - 2, namecolor, 'center', true
            );
            // Draw the name
            ctx.lineWidth = 4;
            text.name.draw(
                player.name,
                Math.round(x + len/2) + 0.5, Math.round(y - 10 - vspacing) + 0.5,
                32, namecolor, 'center'
            );
        }
if ( text.name === 'Mega Lord Poseidon') {
          //  name = name.slice(2)
            if (name.length)
                namecolor = mixColors(color.teal, namecolor, 0.125)
        }
        if (global.mobile) scaleScreenRatio(0.8)
        { // Draw minimap and FPS monitors
            let len = alcoveSize
            let height = len/global.gameWidth*global.gameHeight
            let x = global.screenWidth - spacing
            let y = global.screenHeight - spacing

            let drawMinimap = (x, y, len, height, playerSize) => {
                let W = roomSetup[0].length, H = roomSetup.length;
                let CW = len / W, CH = height / H;
                for (let i = 0; i < H; i++) {
                    let row = roomSetup[i]
                    for (let j = 0; j < W; j++) {
                        ctx.globalAlpha = 0.6;
                        ctx.fillStyle = getZoneColor(row[j]);
                        drawGuiRect(x + j * CW, y + i * CH, CW, CH);
                    }
                }
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = mixColors(color.grey, color.vlgrey);
                drawGuiRect(x, y, len, height);
                for (let o of minimap.get()) {
                    ctx.fillStyle = mixColors(getColor(o.color), color.black, 0.3)
                    ctx.globalAlpha = o.alpha;
                    if (o.type === 2) { // maze
                        drawGuiRect(
                            x + ((o.x - o.size)/global.gameWidth) * len - 0.4,
                            y + ((o.y - o.size)/global.gameWidth) * len - 1,
                            o.size * 2 / global.gameWidth * len + 0.2,
                            o.size * 2 / global.gameWidth * len + 0.2)
                    } else if (o.type === 1) { // roid
                        drawGuiCircle(
                            x + (o.x/global.gameWidth) * len,
                            y + (o.y/global.gameWidth) * len,
                            o.size / global.gameWidth * len + 0.2);
                    } else if (o.id !== gui.playerid) {
                        drawGuiCircle(
                            x + (o.x/global.gameWidth) * len,
                            y + (o.y/global.gameWidth) * len,
                            playerSize
                        );
                    }
                }
                ctx.fillStyle = color.black;
                ctx.globalAlpha = 1
                drawGuiCircle(
                  x + (player.cx/global.gameWidth) * len,
                  y + (player.cy/global.gameWidth) * len,
                  playerSize
                )
                ctx.lineWidth = 3;
                ctx.strokeStyle = color.black;
                drawGuiRoundRect(x, y, len, height, 10, true); // Border
            }

            if (global.mobile) {
                x -= len
                let shift =
                  (global.canSkill ? (alcoveSize / 3 + spacing + spacing) * statMenu.get() : 0) +
                  (global.canUpgrade ? (alcoveSize / 2 + spacing + spacing) * upgradeMenu.get() : 0)
                drawMinimap(spacing, spacing + shift, len, height, 4)
            } else {
                x -= len
                y -= height
                drawMinimap(x, y, len, height, 2)
            }

            let textY = y - 10
            let lag = metrics.latency.reduce((a, b) => a + b, 0) / metrics.latency.length
            if (global.showDebug) {
                drawGuiRect(x, y-40, len, 30);
                timingGraph(GRAPHDATA, x, y-40, len, 30, color.yellow);
                gapGraph(metrics.rendergap, x, y-40, len, 30, color.pink);
                lagGraph(lag, x, y-40, len, 30, color.teal);
                textY -= 40
            }
            // Text
            if (global.showDebug) {
                text.debug[6].draw(
                    'everux.io',
                    x + len, textY - 6*14 - 2,
                    15, color.blue, 'right'
                );
             
              text.debug[0].draw(
                'Players: ' + global.server.players,
                x + len, textY - 5*14,
                10, color.teal, 'right'
            );
                text.debug[5].draw(
                    'Prediction: ' + GRAPHDATA.toFixed(3),
                    x + len, textY - 4*14,
                    10, color.red, 'right'
                );
                text.debug[4].draw(
                    'Update Rate: ' + metrics.updatetime + 'Hz',
                    x + len, textY - 3*14,
                    10, color.gold, 'right'
                );
               
            } else {
                text.debug[6].draw(
                    'everux.io',
                    x + len, textY - 3*14 - 2,
                    15, color.blue, 'right'
                );
            }
            text.debug[3].draw(
                'Client Speed: ' + metrics.rendertime + ' FPS',
                x + len, textY - 2*14,
                10, metrics.rendertime > 10 ? color.guiwhite : color.orange, 'right'
            );
            text.debug[2].draw(
                'Server Speed: ' + (100 * gui.fps).toFixed(2) + '%',
                x + len, textY - 1*14,
                10, gui.fps === 1 ? color.guiwhite : color.orange, 'right'
            );
            text.debug[1].draw(
                lag.toFixed(1) + ' ms  ' + global.server.code + ' :' + global.server.type + ':',
                x + len, textY,
                10, color.guiwhite, 'right'
            );
        // let PlayerNumber = Math.floor(Math.random() * 5000) + 1;
           
        }
        if (global.mobile) scaleScreenRatio(1 / 0.8)

        if (global.mobile) scaleScreenRatio(1.4)
        { // Draw leaderboard
            let vspacing = 4;
            let len = alcoveSize;
            let height = 14;
            let x = global.screenWidth - len - spacing;
            let y = spacing + height + 14;
            if (global.mobile)
              y += (global.canSkill ? alcoveSize / 3 / 1.4 * statMenu.get() : 0) +
                   (global.canUpgrade && spacing * 2 + gui.upgrades.length * (alcoveSize * 0.5 + 14) > x * 1.4 ? alcoveSize / 2 / 1.4 * upgradeMenu.get() : 0)
            if (lb.data.length > 0)
                text.lbtitle.draw(
                    'Leaderboard', Math.round(x + len / 2) + 0.5,
                    Math.round(y - 10) + 0.5,
                    height + 4, color.guiwhite, 'center'
                );
            for (let i = 0; i < lb.data.length && (!global.mobile || i < 6); i++) {
                let entry = lb.data[i]
                drawBar(x, x+len, y+height/2, height-3+config.graphical.barChunk, color.black);
                drawBar(x, x+len, y+height/2, height-3, color.grey);
                let shift = Math.min(1, entry.score / max);
                drawBar(x, x+len*shift, y+height/2, height-3.5, entry.barColor);
                // Leadboard name + score
                text.leaderboard[i].draw(
                    entry.label  + ': ' + util.handleLargeNumber(Math.round(entry.score)),
                    x + len/2,y + height/2,
                    height - 5, color.guiwhite, 'center', true
                 
                );
                // Mini-image
                let scale = height / entry.position.axis,
                    xx = x - 1.5 * height - scale * entry.position.middle.x * 0.707,
                    yy = y + 0.5 * height + scale * entry.position.middle.x * 0.707;
                drawEntity(xx, yy, entry.image, 1 / scale, 1, scale * scale / entry.image.size, -Math.PI/4, true);
                // Move down
                y += vspacing+height;
            }
        }
        if (global.mobile) scaleScreenRatio(1 / 1.4)

        { // Draw upgrade menu
            global.canUpgrade = gui.upgrades.length > 0 && !(global.mobile && global.died)
            upgradeMenu.set(+global.canUpgrade)
            let glide = upgradeMenu.get()
            global.clickables.upgrade.hide()
            if (global.canUpgrade) {
                let internalSpacing =14;
                let width = alcoveSize * 0.5;
                let height = alcoveSize * 0.5;
                let x = glide * 2 * spacing - spacing;
                let y = spacing;
                let xStart = x;
                let xLast = 0;
                let yMax = y;
                let ticker = 0;
                upgradeSpin += 0.01;
                let colorIndex = 0;
                let i = 0;
                gui.upgrades.forEach(model => {
                    //let model = gui.upgrades[i];
                    if (y > yMax) yMax = y;
                    xLast = x;
                    global.clickables.upgrade.place(i++, x * screenRatio, y * screenRatio, width * screenRatio, height * screenRatio);
                    // Draw box
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = tankMenuScheme[colorIndex + gradientrandomizer];
                    drawGuiRoundRect(x, y, width, height, 25);
                    ctx.globalAlpha = 0.1;
                    ctx.fillStyle = tankMenuScheme[colorIndex + gradientrandomizer];
                    colorIndex++;
                    drawGuiRoundRect(x, y, width, height*0.6, 25);
                    ctx.fillStyle = color.black;
                    drawGuiRoundRect(x, y+height*0.6, width, height*0.4, 25);
                    ctx.globalAlpha = 1;
                    // Find offset location with rotation
                    let picture = getEntityImageFromMockup(model, gui.color),
                        position = mockups[model].position,
                        scale = 0.6 * width / position.axis,
                        xx = x + 0.5 * width - scale * position.middle.x * Math.cos(upgradeSpin),
                        yy = y + 0.5 * height - scale * position.middle.x * Math.sin(upgradeSpin);
                    drawEntity(xx, yy, picture, 1, 1, scale / picture.size, upgradeSpin, true);
                    // Tank name & Upgrade key
                    let key = (global.help[`KEY_CHOOSE_${ ticker + 1 }`] || '').toLowerCase().trim()
                    if (!global.mobile && key) {
                        text.upgradeNames[i-1].draw(
                            picture.name,
                            x + width*0.9/2, y + height - 6,
                            height/8 - 3, color.guiwhite, 'center'
                        );
                        text.upgradeKeys[i-1].draw(
                            '[' + key + ']',
                            x + width - 4, y + height - 6,
                            height/8 - 3, color.guiwhite, 'right'
                        );
                    } else {
                        text.upgradeNames[i-1].draw(
                            picture.name,
                            x + width/2, y + height - 6,
                            height/8 - 3, color.guiwhite, 'center'
                        );
                    }
                    ctx.strokeStyle = color.black;
                    ctx.globalAlpha = 1;
                    ctx.lineWidth = 3;
                    drawGuiRoundRect(x, y, width, height, 25, true); // Border
                    if (++ticker % 6 === 0 && !global.mobile) {
                        x = xStart;
                        y += height + internalSpacing;
                    } else {
                        x += glide * (width + internalSpacing);
                    }
                });
                // Draw box
                let h = 14, msg = "Ignore", m = measureText(msg, h-3) + 10;
                let xx = (xLast + width + internalSpacing + xStart - 15)/2, yy = yMax + height + internalSpacing;
                drawBar(xx-m/2, xx+m/2, yy+h/2, h+config.graphical.barChunk, color.black);
                drawBar(xx-m/2, xx+m/2, yy+h/2, h, color.white);
                text.skipUpgrades.draw(msg, xx, yy+h/2, h-2, color.guiwhite, 'center', true);
                global.clickables.skipUpgrades.place(0, (xx-m/2) * screenRatio, yy * screenRatio, m * screenRatio, h * screenRatio);
            } else {
                global.clickables.upgrade.hide()
                global.clickables.skipUpgrades.hide()
            }
        }
       // ===============================================================================
        // Chat System.        
        // ===============================================================================        
        { // Draw chat messages
            let vspacing = 4;
            let len = 0;
            let height = 22; //18;
            // 3/5 of the screen width.
            let x = global.screenWidth * 3/5;
            // One-third of the screen height.
            let y = (global.screenHeight * 1/3) + spacing;
            // Draw each message
            for (let i = chatMessages.length - 1; i >= 0; i--) 
            {
                let msg = chatMessages[i],
                    txt = msg.text,
                    text = txt;
                // Give it a textobj if it doesn't have one
                if (msg.textobj == null) msg.textobj = TextObj();
                if (msg.len == null) msg.len = measureText(text, height - 4);
                // Draw the background                
                ctx.globalAlpha = 0.5 * msg.alpha;                
                drawBar(x - 2, x + msg.len + 2, y + height / 2, height, color.blue);

                // Draw the text
                ctx.globalAlpha = Math.min(1, msg.alpha);                
                msg.textobj.draw(text, x, y + height / 2, height - 4, color.red, 'left', true);
                
                // Iterate and move
                y += (vspacing + height);
                if (msg.status > 1) {
                    y -= (vspacing + height) * (1 - Math.sqrt(msg.alpha));
                }
                if (msg.status > 1) {
                    msg.status -= 0.05;
                    msg.alpha += 0.05;
                } else if (i === 0 && (chatMessages.length > 5 || Date.now() - msg.time > 10000)) {
                    msg.status -= 0.05;
                    msg.alpha -= 0.05;
                    // Remove
                    if (msg.alpha <- 0) {
                      chatMessages[0].textobj.remove;
                        chatMessages.splice(0, 1);
                    }
                }
            }
            ctx.globalAlpha = 1;
        }
        // ===============================================================================


        if (global.mobile) { // Draw skill bars
            global.canSkill = gui.points > 0 && gui.skills.some(skill => skill.amount < skill.cap) && !global.canUpgrade;
            statMenu.set(0+(global.canSkill || global.died))
            let glide = statMenu.get()

            global.clickables.stat.hide()

            let internalSpacing = 14
            let width = alcoveSize / 2
            let height = alcoveSize / 3
            let x = glide * 2 * spacing - spacing
            let y = spacing
            let index = 0
            let namedata = gui.getStatNames(mockups[gui.type].statnames || -1)
            if (global.canSkill) {
                gui.skills.forEach((skill, ticker) => {
                    let skillCap = skill.softcap
                    if (skillCap <= 0) return
                    let skillAmount = skill.amount
                    let skillColor = color[skill.color]
                    let skillMax = skill.cap
                    let skillNameParts = namedata[9 - ticker].split(/\s+/)
                    let skillNameCut = Math.floor(skillNameParts.length / 2)
                    let [skillNameTop, skillNameBottom] = skillNameParts.length === 1 ?
                      [skillNameParts, null] :
                      [skillNameParts.slice(0, skillNameCut),
                       skillNameParts.slice(skillNameCut)]

                    // Draw box
                    ctx.globalAlpha = 0.5
                    ctx.fillStyle = skillColor
                    drawGuiRect(x, y, width, height * 2/3)
                    ctx.globalAlpha = 0.1
                    ctx.fillStyle = color.black
                    drawGuiRect(x, y + height * 2/3 * 2/3, width, height * 2/3 * 1/3)
                    ctx.globalAlpha = 1
                    ctx.fillStyle = color.guiwhite
                    drawGuiRect(x, y + height * 2/3, width, height * 1/3)
                    ctx.fillStyle = skillColor
                    drawGuiRect(x, y + height * 2/3, width * skillAmount / skillCap, height * 1/3)

                    // Dividers
                    ctx.strokeStyle = color.black;
                    ctx.lineWidth = 1;
                    for (let j = 1; j < skillMax; j++) {
                        let xPos = x + width * (j / skillCap)
                        drawGuiLine(
                            xPos, y + height * 2/3,
                            xPos, y + height)
                    }

                    // Upgrade name
                    if (skillAmount !== skillMax && gui.points && (skillCap === skillMax || skillAmount !== skillCap)) {
                        global.clickables.stat.place(9 - ticker, x * screenRatio, y * screenRatio, width * screenRatio, height * screenRatio)
                    }
                    if (skillNameBottom) {
                        text.skillNames[ticker].draw(
                            skillNameBottom,
                            x + width/2, y + height * 0.55,
                            height / 6, color.guiwhite, 'center'
                        )
                        text.skillNames[ticker].draw(
                            skillNameTop,
                            x + width/2, y + height * 0.3,
                            height / 6, color.guiwhite, 'center'
                        )
                    } else {
                        text.skillNames[ticker].draw(
                            skillNameTop,
                            x + width/2, y + height * 0.425,
                            height / 6, color.guiwhite, 'center'
                        )
                    }

                    if (skillAmount > 0) {
                        text.skillValues[ticker].draw(
                            skillAmount >= skillCap ? 'MAX' : '+' + skillAmount,
                            Math.round(x + width / 2) + 0.5, y + height * 1.3,
                            height / 4, skillColor, 'center'
                        )
                    }

                    // Border
                    ctx.strokeStyle = color.black
                    ctx.globalAlpha = 1
                    ctx.lineWidth = 3
                    drawGuiLine(x, y + height * 2/3, x + width, y + height * 2/3)
                    drawGuiRect(x, y, width, height, true)
                    x += glide * (width + internalSpacing)
                    index++
                })
                if (gui.points > 1) {
                    text.skillPoints.draw('x' + gui.points, Math.round(x) + 0.5, Math.round(y + 20) + 0.5, 20, color.guiwhite, 'left')
                }
            }
        }

        scaleScreenRatio(1 / screenRatio, true)
        metrics.lastrender = getNow();
    };
})();

const gameDrawDead = (() => {
    let text = {
        taunt: TextObj(),
        level: TextObj(),
        score: TextObj(),
        time: TextObj(),
        kills: TextObj(),
        death: TextObj(),
        playagain: TextObj(),
    };
    let getKills = () => {
        let finalKills = [Math.round(global.finalKills[0].get()), Math.round(global.finalKills[1].get()), Math.round(global.finalKills[2].get())];
        let b = finalKills[0] + 0.5 * finalKills[1] + 3 * finalKills[2];
        let text = ((b===0) ? '🌼' :
            (b<4) ? '🎯' :
            (b<8) ? '💥' :
            (b<15) ? '💢' :
            (b<25) ? '🔥' :
            (b<50) ? '💣' :
            (b<75) ? '👺' :
            (b<100) ? '🌶️' : '💯') + ' '
        if (b === 0) return text + 'A true pacifist'
        let killed = []
        if (finalKills[0]) killed.push(finalKills[0] + ' kills')
        if (finalKills[1]) killed.push(finalKills[1] + ' assists')
        if (finalKills[2]) killed.push(finalKills[2] + ' visitors defeated')
        return text + killed.join(' and ')
    };
    let getDeath = () => {
        if (!global.finalKillers.length) return '🤷 Well that was kinda dumb huh';
        return '🔪 Succumbed to ' + global.finalKillers.map(e => util.addArticle(mockups[e].name)).join(' and ') + '.';
    };
    let deathSplash = [[
      'bruh',
    ], [
      'Read these messages for more tips for playing ;)',
      'The hardest boss is the Eternal.',
      'Celestials can not be fought alone. Try gathering a group to help!',
      'An Elite bosses weakness is traps! Use this to your advantage.',
      "Have a high score? Submit it on Discord!",
    ], [
      'Bosses can quickly destroy players. Try hiding behind a base to take cover!',
    ], [
      'lol you died'
    ]]
    let randomdeathSplash = deathSplash[Math.floor(Math.random() * deathSplash.length)]
    let deathSplashTip = randomdeathSplash[Math.floor(Math.random() * randomdeathSplash.length)]
    return () => {
        clearScreen(color.black, 0.25);
        let x = global.screenWidth / 2, y = global.screenHeight / 2 - 50;
        let picture = getEntityImageFromMockup(gui.type, gui.color),
            len = 140,
            position = mockups[gui.type].position,
            scale = len / position.axis,
            xx = global.screenWidth / 2 - scale * position.middle.x * 0.707,
            yy = global.screenHeight / 2 - 35 + scale * position.middle.x * 0.707;
        drawEntity(xx-190-len/2, yy-10, picture, 1.5, 1, 0.5 * scale / picture.realSize, -Math.PI/4, true);
        text.taunt.draw(
            deathSplashTip, x, y - 80, 8, color.guiwhite, 'center'
        );
        text.level.draw(
            'Level ' + gui.__s.getLevel() + ' ' + mockups[gui.type].name + '.',
            x-170, y-30, 24, color.guiwhite
        );
        text.score.draw(
            'Final score: ' + util.formatLargeNumber(Math.round(global.finalScore.get())),
            x-170, y+25, 50, color.guiwhite
        );
        text.time.draw(
            '⌚ Survived for ' + util.timeForHumans(Math.round(global.finalLifetime.get())) + '.',
            x-170, y+55, 16, color.guiwhite
        );
        text.kills.draw(
            getKills(), x-170, y+77, 16, color.guiwhite
        );
        text.death.draw(
            getDeath(), x-170, y+99, 16, color.guiwhite
        );
        let needMore = Math.ceil((global.respawnOn - Date.now()) / 1000)
        text.playagain.draw(
            needMore > 0 ? `You may respawn in ${ needMore } second${ needMore === 1 ? '' : 's' }.` : canvas.control === 'joysticks' ? 'Tap to respawn!' : 'Press enter to respawn!', x, y + 125, 16, color.guiwhite, 'center'
        );
    };
})();

window.onbeforeunload = () => global.isInGame && !global.died ? true : null
window.$createProfile = (() => {
    let text = {
        upgradeName: TextObj(),
        upgradeKey: TextObj(),
    };

    return (model, colorIndex = -1, size = 200, upgradeSpin = -Math.PI / 4) => {
        let oldWidth = ctx.canvas.width
        let oldHeight = ctx.canvas.height

        let width = ctx.canvas.width = size
        let height = ctx.canvas.height = size
        if (colorIndex === -1) {
            ctx.clearRect(0, 0, width, height)
        } else {
            ctx.fillStyle = color.white
            ctx.fillRect(0, 0, width, height)
            ctx.globalAlpha = 0.5
            ctx.fillStyle = getColor(colorIndex + 10)
            drawGuiRect(0, 0, width, height)
            ctx.globalAlpha = 0.1
            ctx.fillStyle = getColor(colorIndex)
            drawGuiRect(0, 0, width, height*0.6)
            ctx.fillStyle = color.black
            drawGuiRect(0, height*0.6, width, height*0.4)
            ctx.globalAlpha = 1
        }
        // Find offset location with rotation
        let picture = getEntityImageFromMockup(model, gui.color),
            position = mockups[model].position,
            scale = 0.6 * width / position.axis,
            xx = 0.5 * width - scale * position.middle.x * Math.cos(upgradeSpin),
            yy = 0.5 * height - scale * position.middle.x * Math.sin(upgradeSpin);
        drawEntity(xx, yy, picture, 1, 1, scale / picture.size, upgradeSpin, true);

        if (colorIndex !== -1) {
            // Tank name
            text.upgradeName.draw(
                picture.name,
                0.9*width/2, height - 6,
                height/8 - 3, color.guiwhite, 'center'
            );
            // Upgrade key
            ctx.strokeStyle = color.black;
            ctx.globalAlpha = 1;
            ctx.lineWidth = 3;
            drawGuiRect(0, 0, width, height, true); // Border
        }

        let url = ctx.canvas.toDataURL()
        ctx.canvas.width = oldWidth
        ctx.canvas.height = oldHeight
        return url
    }
})();


const gameDrawBeforeStart = (() => {
  let text = {
    connecting: TextObj(),
    message: TextObj(),
  };
  let tips = [[
      "Don't like the look of the game? Try changing the theme!",
      'You can hold N to level up instantly!',
    ], [
      'Press the E key to toggle auto-fire.',
      'Press the C key to toggle auto-spin.',
      'Press the R key to override AI turrets.',
      'Press Y to toggle ON/OFF the class tree!',
      'To set the original Diep.io traps, change it with Classic Traps in the menu.',
    ], [
      'Bosses can quickly destroy players. Try hiding behind a base to take cover!',
    ], [
      'Hold L to view client/server information!'
    ]]
    let randomizedTip = tips[Math.floor(Math.random() * tips.length)]
    let tip = randomizedTip[Math.floor(Math.random() * randomizedTip.length)]
    return () => {
    clearScreen(color.white, 0.5);
    text.connecting.draw('Connecting...', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
    text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.lgreen, 'center');
    text.message.draw(tip, global.screenWidth / 2, global.screenHeight / 2 + 75, 15, color.guiwhite, 'center');
  };
})();

const gameDrawDisconnected = (() => {
    let text = {
        disconnected: TextObj(),
        message: TextObj(),
    };
    return () => {
        clearScreen(mixColors(color.red, color.guiblack, 0.3), 0.25);
        text.disconnected.draw('💀 Disconnected 💀', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
        text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.orange, 'center');
    };
})();
const gameDrawClosed = (() => {
    let text = {
        Closed: TextObj(),
        message: TextObj(),
    };
    return () => {
        clearScreen(mixColors(color.red, color.guiblack, 0.3), 0.25);
        text.Closed.draw('💀 Disconnected 💀', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
        text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.orange, 'center');
      text.message.draw('Arena is closed. Please reload.', global.screenWidth / 2, global.screenHeight / 2 + 30, 14, color.guiwhite, 'center');
    };
})();

// The main function
function animloop() {
    global.animLoopHandle = requestAnimationFrame(animloop);
    player.renderv += (player.view - player.renderv) / 30;
    // Set the drawing style
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Draw the game
    if (global.gameStart && !global.disconnected) {
        global.time = getNow();
        if (global.time - lastPing > 1000) { // Latency
            // Do ping.
            lastPing = global.time;
            // Do rendering speed.
            metrics.rendertime = renderTimes;
            renderTimes = 0;
            // Do update rate.
            metrics.updatetime = updateTimes;
            updateTimes = 0;
        }
        metrics.lag = global.time - player.time;
    }
    if (global.gameStart && mockups.length > 0) {
        gameDraw(getRatio());
    } else if (!global.disconnected) {
        gameDrawBeforeStart();
    }
    if (global.died) {
        gameDrawDead();
    }
    if (global.disconnected) {
        gameDrawDisconnected();
    }
   if (global.closed) {
        gameDrawClosed();
    }
}


let snowAmount = 1;
let aeff = 1;
let cool = 0;
let counter = 0;
let counter2 = 0;
if (snowAmount) {
  let snowCanvas = document.createElement("canvas");
  snowCanvas.style.position = "absolute";
  snowCanvas.style.top = "0";
  document.body.insertBefore(snowCanvas, document.body.firstChild);

  let ctx = snowCanvas.getContext("2d");
  let snow = [];
  let updateSnow = () => {
    if (snowCanvas.width !== window.innerWidth)
      snowCanvas.width = window.innerWidth;
    if (snowCanvas.height !== window.innerHeight)
      snowCanvas.height = window.innerHeight;
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    for (let p of snow) {
      p.vel2++;
      p.x += p.vel * Math.cos(p.dir);
      p.y += p.vel * Math.sin(p.dir);
      let a = Math.min(1, 1 - p.y / snowCanvas.height) * 2;
      if (a > 0) {
        ctx.globalAlpha = a;
        let s = p.type
        ctx.beginPath();
        ctx.arc(p.x + (-2) * p.vel * Math.cos(p.dir), p.y + (-2) * p.vel * Math.sin(p.dir), p.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = p.r / 5;
        ctx.fill();
      } else if (
        p.x < 20 ||
        p.x > window.innerWidth + 20 ||
        p.y < -25 ||
        a < 0 ||
        global.gameStart
      ) {
        p.gone = true;
      }
    }
    if (snowAmount > Math.random()) {
      if (!global.gameStart) {
        let aeef = -1;
        let aee = snowCanvas.width * (1 - 2 * Math.random());
        if (counter % 43) counter2++;
        counter++;
        cool += aeff;
        if (counter % 1440 == 0) aeff *= -1;
        if (counter % 1 == 0 && Math.random() > 0.9) {
          for (let i = 0; i < 360; i += 360 / 1) {
            let x = snowCanvas.width / 2 + aee;
            let r = 5 + Math.floor(Math.random() * 10);
            let dir =
              Math.PI / 2 +
              (10 * (1 - 2 * Math.random()) * Math.PI) / 180 +
              (30 * Math.sin((0.3 * counter * Math.PI) / 180) * Math.PI) / 180;
            let vel = 5 + 7 * Math.random();
            let color = "#0fa";
            snow.push({
              x,
              y: aeef,
              r,
              dir,
              vel,
              color
            });
          }
        }
      }
    }
    if (global.gameStart) snowCanvas.remove();
    else requestAnimationFrame(updateSnow);
  };
  setInterval(() => {
    snow = snow.filter(r => !r.gone);
  }, 2000);
  updateSnow();
}
