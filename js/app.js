/*global require, console*/
/*jshint -W097*/
/*jshint browser: true*/



const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

if (!Object.values) {
    Object.values = function values(O) {
        return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), [])
    }
}

if (!Object.entries) {
    Object.entries = function entries(O) {
        return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), [])
    }
}

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
    skills: [
        {
            amount: 0,
            color: 'purple',
            cap: 1,
            softcap: 1,
        }, {
            amount: 0,
            color: 'pink',
            cap: 1,
            softcap: 1,
        }, {
            amount: 0,
            color: 'blue',
            cap: 1,
            softcap: 1,
        }, {
            amount: 0,
            color: 'lgreen',
            cap: 1,
            softcap: 1,
        }, {
            amount: 0,
            color: 'red',
            cap: 1,
            softcap: 1,
        }, {
            amount: 0,
            color: 'yellow',
            cap: 1,
            softcap: 1,
        }, {
            amount: 0,
            color: 'green',
            cap: 1,
            softcap: 1,
        }, {
            amount: 0,
            color: 'teal',
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
        }
    ],
    points: 0,
    upgrades: [],
    playerid: -1,
    __s: (() => {
        let levelscore = 0;
        let deduction = 0;
        let level = 0;
        let score = Smoothbar(0, 10);
        let scoreForLevel = level => Math.ceil(1.8 * Math.pow(level + 1, 1.8) - 2 * level + 1)
        return {
            setScore: s => {
                if (s) {
                    score.set(s);
                    if (deduction > score.get()) { level = 0; deduction = 0; }
                } else {
                    score = Smoothbar(0, 10);
                    level = 0;
                }
            },
            update: () => {
                levelscore = scoreForLevel(level)
                if (score.get() >= deduction + levelscore) {
                    deduction += levelscore
                    level++
                } else if (score.get() < deduction) {
                    deduction -= scoreForLevel(level - 1);
                    level--
                }
            },
            getProgress: () => {
                return (levelscore) ? Math.min(1, Math.max(0, (score.get() - deduction) / levelscore)) : 0;
            },
            getScore: () => score.get(),
            getLevel: () => { return level; },
        };
    })(),
    type: 0,
    fps: 0,
    color: 0,
    accel: 0,
    party: 0,
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
/*<table><tbody><tr><td>Glitch</td><td>US East</td><td>FFA</td></tr>
<tr><td>OpenShift</td><td>US East</td><td>FFA</td></tr><tr><td>Glitch</td><td>US East</td><td>4TDM</td></tr>

<tr><td>OpenShift</td><td>US East</td><td>4TDM</td></tr>
<tr><td>WeDeploy</td><td>US East</td><td>4TDM</td></tr><tr><td>OpenShift</td><td>US East</td><td>Maze Mothership</td></tr>
<tr><td>BuyVM</td><td>US West</td><td>Maze Mothership</td></tr><tr><td>Heroku</td><td>US East</td><td>3 Team Maze Domination</td></tr>

<tr style="
  color: #8ABC3F;
"><td>Linode</td><td>Europe</td><td>3 Team Maze Domination</td></tr>
    </tbody></table>*/

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
        server.players = `${res.players}/${res.max_players}`;
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
            display = (timediff < speed) ? oldvalue + (value - oldvalue) * Math.pow(timediff / speed, 1 / sharpness) : value;
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
                let camtime = m[0],
                    camx = m[1],
                    camy = m[2],
                    camfov = m[3],
                    camvx = m[4],
                    camvy = m[5],
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
    // Sub-drawing functions
    function drawPoly(context, centerX, centerY, radius, sides, angle = 0, fill = true) {
        // Start drawing
        context.beginPath();
        if (!sides) { // Circle
            context.arc(centerX, centerY, radius, 0, 2*Math.PI);
        } else if (sides instanceof Array) {
            let cos = Math.cos(angle), sin = Math.sin(angle)
            for (let [x, y] of sides) {
                context.lineTo(
                    centerX + radius * (x * cos - y * sin),
                    centerY + radius * (y * cos + x * sin))
            }
        } else if (typeof sides === 'string') {
            let path = new Path2D(sides)
            context.save()
            context.translate(centerX, centerY)
            context.scale(radius, radius)
            context.lineWidth /= radius
            context.rotate(angle)
            context.stroke(path)
            if (fill) context.fill(path)
            context.restore()
            return;
        } else if (sides < 0) { // Star
            angle += (sides % 2) ? 0 : Math.PI / sides;
            if (config.graphical.pointy) context.lineJoin = 'miter';
            let dip = 1 - ( 6 / sides / sides);
            sides = -sides;
            context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
            for (let i=0; i<sides; i++) {
                var theta = (i+1) / sides * 2 * Math.PI;
                var htheta = (i+0.5) / sides * 2 * Math.PI;
                var c = {
                    x: centerX + radius * dip * Math.cos(htheta + angle),
                    y: centerY + radius * dip * Math.sin(htheta + angle),
                };
                var p = {
                    x: centerX + radius * Math.cos(theta + angle),
                    y: centerY + radius * Math.sin(theta + angle),
                };
                context.quadraticCurveTo(c.x, c.y, p.x, p.y);
            }
        } else if (sides > 0 && sides < 102) { // Polygon
            angle += (sides % 2) ? 0 : Math.PI / sides;
            for (let i=0; i < sides; i++) {
                let theta = (i / sides) * 2 * Math.PI;
                let x = centerX + radius * Math.cos(theta + angle);
                let y = centerY + radius * Math.sin(theta + angle);
                context.lineTo(x, y);
            }
        }else if (sides === 102) { // Semi-Crusher
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
                        } else if (sides === 103) { // Vanguard
                            for (let [scale, theta] of [
                 [-1, -0.9], 
                [1, 0], 
                 [-1, 0.9], 
                 [-0.5, 0],
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } 
       else if (sides === 104) { // Arrowhead
                            for (let [scale, theta] of [
                            [1,0],[-0.6,0.6],[0.46,0],[-0.6,-0.6]
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } else if (sides === 105) { // Dreadnought
                            for (let [scale, theta] of [
                    [-1, -1],
              [1, 0],
              [-1, 1],
              [-0.3, 1],
              [-1, 0],
              [-0.3, -1],
                            
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } 
      else if (sides === 106) { // TESTBED
                            for (let [scale, theta] of [
                  [-1, -0.8],
              [-0.8, -1],
              [0.8, -1],
              [1, -0.8],
              [0.2, 0],
              [1, 0.8],
              [0.8, 1],
              [-0.8, 1],
              [-1, 0.8],
                            
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        }  else if (sides === 107) { // Crusher
                        for (let [scale, theta] of [
                            [1, 0],
                            [1, .286 * Math.PI],
                            [1, .571 * Math.PI],
                            [0.36, Math.PI / 2],
                            [-0.75, 0],
                            [0.36, -(Math.PI / 2)],
                            [1, 1.429 * Math.PI],
                            [1, 1.714 * Math.PI]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + theta),
                            centerY + radius * scale * Math.sin(angle + theta)
                        );
      } 
        else if (sides === 108) { // k
                        for (let [scale, theta] of [
                          [-0.4,-0.4],
                          [0.2,-0.6],
                          [1,-0.2],
                          [1,0.2],
                          [0.2,0.6],
                          [-0.4,0.4],
                          [-0.6,0.8],
                          [-1,-0],
                          [-0.6,-0.8]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + theta),
                            centerY + radius * scale * Math.sin(angle + theta)
                        );
      }else if (sides === 109) { // Vis Ultima
                            for (let [scale, theta] of [
                            [0.25, .611],
                            [-1, -0.838],
                            [-0.5, -0.436],
                            [0, 0],
                            [-0.5, .436],
                            [-1, .838],
                            [0.25, -0.611]
                        ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } 
      else if (sides === 110) { // hexa
                            for (let [scale, theta] of [[1,0],[0.5,0.8],[-0.5,0.8],[-1,0],[-0.5,-0.8],[0.5,-0.8]]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } 
       else if (sides === 111) { // Gunship
                            for (let [scale, theta] of  [
                                 [1, 0],
                                [1, Math.PI / 2],
                                [-1.16, -1.047],
                                [-1.3, -0.3],
                                [-0.425, -1.047],
                                [-0.425, 1.047],
                                [-1.3, 0.3],
                                [-1.16, 1.047],
                                [-1, Math.PI / 2], // [1, (3 / 2) * Math.PI],
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } 
     else if (sides === 112) { // Diamond
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
                        } 
      else if (sides === 113) { // ;0
                            for (let [scale, theta] of [
                        [1,0],[0.6,0.2],[0.5,0.1],[0.35,0],[-0.6,0.5],[-0.2,0],[-0.6,-0.5],[0.34,0.007],[0.5,-0.1],[0.6,-0.2]
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } 
       else if (sides === 114) { // triblade
                           for (let i = 0; i < 12; i++) {
        let theta = (i / 12) * 2 * Math.PI,
            x = centerX + radius * Math.cos(theta + (angle - .025)),
            y = centerY + radius * Math.sin(theta + (angle - .025));
        if (i === 2 || i === 10 || i === 6) {
            x = centerX + (radius / 2) * Math.cos(theta + (angle - .025));
            y = centerY + (radius / 2) * Math.sin(theta + (angle - .025));
        }
        if (i === 0 || i === 4 || i === 8) {
            x = centerX + (radius * 1.25) * Math.cos(theta + (angle - .025));
            y = centerY + (radius * 1.25) * Math.sin(theta + (angle - .025));
        }
        context.lineTo(x, y);
    }
} else if (sides === 115) { //k
                            for (let [scale, theta] of [[0,1],[-1.4,1.4],[0,1.6],[1.4,1.4],[2,0],[1.4,-1.4],[0,-1.6],[-1.4,-1.4],[0,-1],[-1,-0]]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        }    else if (sides === 116) { // Binaris
                            for (let [scale, theta] of [
                      [1,0],[0.5,0.5],[-0.5,0.5],[-1,0],[-0.5,-0.5],[0.5,-0.5]
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        }    else if (sides === 117) { // Ternaris
                            for (let [scale, theta] of [
                      [1.5,0],[1,0.5],[-1,0.5],[-1.5,0],[-1,-0.5],[1,-0.5]
                            ]) context.lineTo(
                                centerX + radius * scale * Math.cos((angle - 0.025) + theta),
                                centerY + radius * scale * Math.sin((angle - 0.025) + theta)
                            );
                        } else if (sides === 118) { // Taelgator
                        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                        context.save();
                        context.translate(centerX, centerY);
                        context.rotate(angle);
                        let borderRadius = 1.2, // 0 = square, 1 = circle
                            centerAway = radius * (0.5 - borderRadius),
                            scaleRadius = radius * borderRadius;
                        context.arc(centerAway, centerAway, scaleRadius, 0, .5 * Math.PI, true);
                        context.arc(-centerAway, centerAway, scaleRadius, .5 * Math.PI, Math.PI, true);
                        context.arc(-centerAway, -centerAway, scaleRadius, Math.PI, 1.5 * Math.PI, true);
                        context.arc(centerAway, -centerAway, scaleRadius, -0.5 * Math.PI, 0, true);
                        context.restore();
                    
                    } else if (sides === 119) { // Mega Crusher
                        for (let [scale, theta] of [
                            [0.625, 0],
                            [1, .489],
                            [0.313, .576],
                            [0.5, 1.518],
                            [-0.875, -1.03],
                            [-0.375, -0.768],
                            [-0.938, 0],
                            [-0.375, .768],
                            [-0.875, 1.03],
                            [0.5, -1.518],
                            [0.313, -0.576],
                            [1, -0.489]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + (theta + .0261)),
                            centerY + radius * scale * Math.sin(angle + (theta + .0261))
                        );
                    } else if (sides === 120) { // Star
            if (config.graphical.pointy) context.lineJoin = 'miter';
            let dip = 1;
                    sides = 124;
            context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
            for (let i = 0; i < 4; i++) {
                var theta = (i + 1) / 3 * 2 * Math.PI;
                var htheta = (i + 0.5) / 4 * 2 * Math.PI;
                var c = {
                    x: centerX + radius * dip * Math.cos(htheta + angle),
                    y: centerY + radius * dip * Math.sin(htheta + angle),
                };
                var p = {
                    x: centerX + radius * Math.cos(theta + angle),
                    y: centerY + radius * Math.sin(theta + angle),
                };
                context.quadraticCurveTo(c.x, c.y, p.x, p.y);
            }
        }else if (sides === 121) { // nwe
                        for (let [scale, theta] of [
              [0.9, 0],
              [0.625, 0.698],
              [-0.35, -1.361],
              [-0.75, -1.204],
              [-1, 0.453],
              [-0.563, -0.559],
              [0.563, 0.559],
              [-1, 0.453],
              [-0.75, 1.204],
              [-0.35, 1.361],
              [-0.625, -0.698],
             ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + (theta + .0261)),
                            centerY + radius * scale * Math.sin(angle + (theta + .0261))
                        );
                    }else if (sides === 122) { // nwe
                        for (let [scale, theta] of [
            [0.6],[-0.4,-0.6],[0.2,-0.8],[1,0],[0.2,0.8]
             ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + (theta + .0261)),
                            centerY + radius * scale * Math.sin(angle + (theta + .0261))
                        );
                    } else if (sides === 123) { // Phaser
                        for (let i = 0; i < 4; i++) {
                            let theta = (i / 3) * 2 * Math.PI,
                                x = centerX + radius * Math.cos(theta + angle),
                                y = centerY + radius * Math.sin(theta + angle);
                            if (i === 2) {
                                x = centerX + (radius * -0.25) * Math.cos(angle);
                                y = centerY + (radius * -0.25) * Math.sin(angle);
                            } else if (i > 2) {
                                theta = (i - 1 / 3) * 2 * Math.PI;
                                x = centerX + radius * Math.cos(theta + angle);
                                y = centerY + radius * Math.sin(theta + angle);
                            }
                            context.lineTo(x, y);
                        }
                    } else if (sides === 124) { // Nautica shell shape
                        for (let i = 0; i < 16; i++) {
                            let theta = (i / 16) * 2 * Math.PI,
                                x = centerX + radius * Math.cos(theta + angle + .4),
                                y = centerY + radius * Math.sin(theta + angle + .4);
                            if (i === 1 || i === 5 || i === 9 || i === 13) {
                                x = centerX;
                                y = centerY;
                            }
                            context.lineTo(x, y);
                        }
                    } else if (sides === 125) { // Rodrigo's Destroyer Ship
                        for (let [scale, theta] of [
                            [1.5, .14],
                            [1.1, .335],
                            [0.75, .593],
                            [0.475, 1.047],
                            [0.517, 1.466],
                            [-0.55, -1.187],
                            [-0.55, -0.838],
                            [-1, -0.419],
                            [-1.2, -0.312],
                            [-1.375, -0.192],
                            [-1.45, -0.087],
                            [-1.45, .087],
                            [-1.375, .192],
                            [-1.2, .312],
                            [-1, .419],
                            [-0.55, .838],
                            [-0.55, 1.187],
                            [0.517, -1.466],
                            [0.475, -1.047],
                            [0.75, -0.593],
                            [1.1, -0.335],
                            [1.5, -0.14]
                        ]) context.lineTo(
                            centerX + radius * (scale * 1.5) * Math.cos(angle + (theta - .0261)),
                            centerY + radius * (scale * 1.5) * Math.sin(angle + (theta - .0261))
                        );
                    } else if (sides === 126) { // Frigate
                        for (let [scale, theta] of [
                            [1.95, 0],
                            [0.95, .578],
                            [-1, -0.82],
                            [-1.12, -0.715],
                            [-1.32, -0.873],
                            [-2.155, -0.489],
                            [-2.155, .489],
                            [-1.32, .873],
                            [-1.12, .715],
                            [-1, .82],
                            [0.95, -0.578]
                        ]) context.lineTo(
                            centerX + radius * (scale * .9) * Math.cos(angle + theta),
                            centerY + radius * (scale * .9) * Math.sin(angle + theta)
                        );
                    } else if (sides === 127) { // Blue Runner
                        for (let [scale, theta] of [
                            [0.9, 0],
                            [0.625, .698],
                            [-0.35, -1.361],
                            [-0.75, -1.204],
                            [-1, -0.453],
                            [-0.563, -0.559],
                            [-0.563, .559],
                            [-1, .453],
                            [-0.75, 1.204],
                            [-0.35, 1.361],
                            [0.625, -0.698]
                        ]) context.lineTo(
                            centerX + radius * scale  * Math.cos(angle + (theta - .0261)),
                            centerY + radius * scale * Math.sin(angle + (theta - .0261))
                        );
                    }else if (sides === 128) { //comb
                        for (let [scale, theta] of [
                            [1, 0],
                            [1.315, .331613],
                            [1.315, .715585],
                            [1, 1.0472],
                            [1.315, 1.37881],
                            [1.315, 1.76278],
                            [1, 2.0944],
                            [1.315, 2.42601],
                            [1.315, 2.80998],
                            [1, 3.14159],
                            [1.315, -2.80998],
                            [1.315, -2.42601],
                            [1, -2.0944],
                            [1.315, -1.76278],
                            [1.315, -1.37881],
                            [1, -1.0472],
                            [1.315, -0.715585],
                            [1.315, -0.331613],
                            [1, 0]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + theta + 1.5447),
                            centerY + radius * scale * Math.sin(angle + theta + 1.5447)
                        );
                    } else if (sides === 129) { // Caravan
                        context.save();
                        context.translate(centerX, centerY);
                        context.rotate(angle);
                        let borderRadius = 1.4, // 0 = square, 1 = circle
                            centerAway = radius * (1 - borderRadius),
                            scaleRadius = radius * borderRadius;
                        context.arc(centerAway, centerAway, scaleRadius, 0, .5 * Math.PI);
                        context.arc(-centerAway, centerAway, scaleRadius, .5 * Math.PI, Math.PI);
                        context.arc(-centerAway, -centerAway, scaleRadius, Math.PI, 1.5 * Math.PI);
                        context.arc(centerAway, -centerAway, scaleRadius, -0.5 * Math.PI, 0);
                        context.restore();
                    } else if (sides === 130) { // Cool When You Spin Shape
                        let borderRadius = .4,
                            centerAway = radius * (1 - borderRadius),
                            scaleRadius = radius * borderRadius;
                        context.arc(centerX + centerAway, centerY + centerAway, scaleRadius, angle, .5 * Math.PI + angle);
                        context.arc(centerX - centerAway, centerY + centerAway, scaleRadius, .5 * Math.PI + angle, Math.PI + angle);
                        context.arc(centerX - centerAway, centerY - centerAway, scaleRadius, Math.PI + angle, 1.5 * Math.PI + angle);
                        context.arc(centerX + centerAway, centerY - centerAway, scaleRadius, -0.5 * Math.PI + angle, angle);
                    } else if (sides === 131) { // Triangle With Round Edges
                        context.save();
                        context.translate(centerX, centerY);
                        context.rotate(angle);
                        let borderRadius = .4,
                            centerAway = radius * (1 - borderRadius),
                            scaleRadius = radius * borderRadius;
                        context.arc(centerAway, 0, scaleRadius, -0.272 * Math.PI, .272 * Math.PI);
                        context.arc(-centerAway, centerAway, scaleRadius, .272 * Math.PI, Math.PI);
                        context.arc(-centerAway, -centerAway, scaleRadius, Math.PI, 1.544 * Math.PI);
                        context.restore();
                    } else if (sides === 132) { // Boss Shape
                        for (let [scale, theta] of [
                            [1, 0],
                            [1, 72],
                            [1, 90],
                            [0.8, 120],
                            [0.6, 125],
                            [0.5, 144],
                            [1, 170],
                            [0.9, 180],
                            [1, 190],
                            [0.5, 216],
                            [0.6, 235],
                            [0.8, 240],
                            [1, 270],
                            [1, 288]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos((theta * Math.PI) / 180 + angle),
                            centerY + radius * scale * Math.sin((theta * Math.PI) / 180 + angle)
                        );
                    } else if (sides === 133) { // Boss Shape 2
                        for (let [scale, theta] of [
                            [1, 0],
                            [0.905, 5],
                            [0.915, 10],
                            [0.6, 35],
                            [1, 72],
                            [1, 153.5],
                            [0.45, 100],
                            [0.4, 110],
                            [0.1, 120],
                            [0.75, 180],
                            [0.1, 240],
                            [0.4, 250],
                            [0.45, 260],
                            [1, 206.5],
                            [1, 288],
                            [0.6, 325],
                            [0.915, 350],
                            [0.905, 355]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos((theta * Math.PI) / 180 + angle),
                            centerY + radius * scale * Math.sin((theta * Math.PI) / 180 + angle)
                        );
                    } else if (sides === 134) { // Boss Shape 3
                        for (let [scale, theta] of [
                            [0.95, 0],
                            [1, 25],
                            [1, 90],
                            [0.6, 146],
                            [0.5, 170],
                            [1, 180],
                            [0.5, 190],
                            [0.6, 214],
                            [1, 270],
                            [1, 335]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos((theta * Math.PI) / 180 + angle),
                            centerY + radius * scale * Math.sin((theta * Math.PI) / 180 + angle)
                        );
                    }else if (sides === 135) { // Hexagon (Rotated)
                        for (let i = 0; i < 6; i++) {
                            let theta = i / 6 * 2 * Math.PI,
                                x = centerX + radius * 1.1 * Math.cos((180 / 6) + theta + angle + 0.385),
                                y = centerY + radius * 1.1 * Math.sin((180 / 6) + theta + angle + 0.385);
                            context.lineTo(x, y);
                        }
                    }else if (sides === 136) { // exports.genericEntity
                        let realShape = -11,
                            dip = 1 - 6 / realShape / realShape;
                        realShape = -realShape;
                        context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                        for (let i = 0; i < realShape; i++) {
                            let theta = (i + 1) / realShape * Math.PI,
                                htheta = (i + .5) / realShape * Math.PI,
                                c = {
                                    x: centerX + radius * dip * Math.cos(htheta + angle),
                                    y: centerY + radius * dip * Math.sin(htheta + angle)
                                },
                                p = {
                                    x: centerX + radius * Math.cos(theta + angle),
                                    y: centerY + radius * Math.sin(theta + angle)
                                };
                            context.quadraticCurveTo(c.x, c.y, p.x, p.y);
                        }
                        context.lineJoin = 'miter';
                    } else if (sides === 137) { // Minesweeper Ring
                        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
                        context.arc(centerX, centerY, radius / 1.05, 0, 2 * Math.PI, false);
                    } else if (sides === 138) { // Glass Smasher Body
                        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
                        context.arc(centerX, centerY, radius / 1.5, 0, 2 * Math.PI, false);
                    } else if (sides === 139) { // Revolutionist
                        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
                        context.arc(centerX, centerY, radius * 0.999999, 0, 2 * Math.PI, false);
                    }  else if (sides === 140) { // Waller
                        for (let [scale, theta] of [
                            [1, .611],
                            [1, 1.571],
                            [-1.25, -0.698],
                            [-0.5, -0.698],
                            [-0.5, .698],
                            [-1.25, .698],
                            [1, -1.571],
                            [1, -0.611]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + theta),
                            centerY + radius * scale * Math.sin(angle + theta)
                        );
                    } else if (sides === 141) { // Star
                        let dip = .25;
                        context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                        for (let i = 0; i < 6; i++) {
                            let theta = (i + 1) / 6 * 2 * Math.PI,
                                htheta = (i + .5) / 6 * 2 * Math.PI,
                                c = {
                                    x: centerX + radius * dip * Math.cos(htheta + angle),
                                    y: centerY + radius * dip * Math.sin(htheta + angle)
                                },
                                p = {
                                    x: centerX + radius * Math.cos(theta + angle),
                                    y: centerY + radius * Math.sin(theta + angle)
                                };
                            context.quadraticCurveTo(c.x, c.y, p.x, p.y);
                        }
                    }  else if (sides === 142) { // Flash Crasher
                        for (let [scale, theta] of [
                            [1, 0],
                            [1, .4 * Math.PI],
                            [1, .8 * Math.PI],
                            [0.36, Math.PI / 2],
                            [0.36, -(Math.PI / 2)],
                            [1, 1.2 * Math.PI],
                            [1, 1.6 * Math.PI]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos((angle - .025) + theta),
                            centerY + radius * scale * Math.sin((angle - .025) + theta)
                        );
                    }  else if (sides === 143) { // Grouper
                        for (let [scale, theta] of [
                            [1, .489],
                            [-1, -1.257],
                            [-0.5, -0.96],
                            [-0.75, 0],
                            [-0.5, .96],
                            [-1, 1.257],
                            [1, -0.489]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + theta),
                            centerY + radius * scale * Math.sin(angle + theta)
                        );
                    } else if (sides === 144) { // Glass Smasher Shell
                         let realShape = 6,
                            dip = 1 - 3.272727 / realShape / realShape;
                        realShape = -realShape;
                        //context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                        for (let i = 0; i < realShape; i++) {
                            let centerX = (i + 1) / realShape * Math.PI,
                                centerY = (i + .5) / realShape * Math.PI;
                                 context.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
                        context.arc(centerX, centerY, radius / 1.5, 0, 2 * Math.PI, false);
                                c = {
                                    x: centerX + radius * dip * Math.cos(htheta + angle),
                                    y: centerY + radius * dip * Math.sin(htheta + angle)
                                },
                                p = {
                                    x: centerX + radius * Math.cos(theta + angle),
                                    y: centerY + radius * Math.sin(theta + angle)
                                };
                            context.quadraticCurveTo(c.x, c.y, p.x, p.y);
                    }
                    }   else if (sides === 145) { // Clutter
                        for (let [scale, theta] of [
                            [0.438, 0],
                            [1, .681],
                            [0.625, 1.047],
                            [0.438, 1.065],
                            [-0.5, -1.1],
                            [-0.34, -0.698],
                            [-0.75, 0],
                            [-0.34, .698],
                            [-0.5, 1.1],
                            [0.438, -1.065],
                            [0.625, -1.047],
                            [1, -0.681]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + (theta - .0261)),
                            centerY + radius * scale * Math.sin(angle + (theta - .0261))
                        );
                    }  else if (sides === 146) { // Golden Rectangle
                        for (let [scale, theta] of [
                            [1, .541],
                            [-1, -0.541],
                            [-1, .541],
                            [1, -0.541]
                        ]) context.lineTo(
                            centerX + radius * scale * Math.cos(angle + theta + 1.5447),
                            centerY + radius * scale * Math.sin(angle + theta + 1.5447)
                        );
                    }  else if (sides === 147) { // Hendecagon (Rotated)
                        for (let i = 0; i < 11; i++) {
                            let theta = i / 11 * 2 * Math.PI,
                                x = centerX + radius * 1.5 * Math.cos((180 / 11) + theta + angle + 1.635),
                                y = centerY + radius * 1.5 * Math.sin((180 / 11) + theta + angle + 1.635);
                            context.lineTo(x, y);
                        }
                    }
















      else if (sides > 200) {
    let path = 2 * Math.PI,
        radiusDiv = 1;
    switch (sides) {
        case 201: // 6 Pointed Star
            path = new Path2D('m -1.2745055,-0.73559036 .8496635,-1.54e-5 L -5.9657109e-7,-1.4711814 .42484199,-0.73560576 1.2745055,-0.73559036 .84968469,-1.7597132e-6 1.2745055,0.73558804 .42484199,0.73560224 -5.9657109e-7,1.4711779 -0.424842,0.73559964 -1.2745055,0.73558804 -0.8496847,-1.7597132e-6 Z');
         // radiusDiv= 2;    
        break;
        case 202: // idk
            path = new Path2D('m 1.9248076,-5.704592 c -1.611307,0.230016 -3.043746,0.725651 -4.024805,1.678906 0,0 -1.350047,1.503205 -2.140429,2.124219 -0.579511,0.455329 -1.884375,1.15625 -1.884375,1.15625 h -1.5 V 0.75458704 h 1.5 v 0.0002 c 0,0 1.306923,0.68367396 1.884375,1.13593696 0.795102,0.622728 2.140429,2.144531 2.140429,2.144531 1.067468,1.06887 2.515226,1.669345 4.024805,1.669336 1.88243,-1.866652 3.806861,-3.803622 5.7,-5.69980896 z');
          radiusDiv= 6;   
        break;
          case 203: // hmmmm
            path = new Path2D('m -6.8622396,-6.8999545 5.07205,1.417287 -2.815733,0.634051 2.890322,0.839184 -4.960166,0.727291 4.717751,1.118913 -2.741144,0.634049 2.181728,0.652698 L -6.7317086,-0.49999157e-6 -2.5174316,0.8764805 l -2.181728,0.652699 2.741144,0.634049 -4.717751,1.118912 4.960166,0.727292 -2.890322,0.839184 2.815733,0.63405 -5.07205,1.417288 7.10459905,-0.26108 2.61061295,-0.689995 1.846078,-1.156209 1.398542,-1.902149 L 6.8621294,-0.49999157e-6 6.0975924,-2.8905215 l -1.398542,-1.90215 -1.846078,-1.156209 -2.61061295,-0.689995 z');
            radiusDiv= 8;
        break;
         case 204: // Curved Square
            path = new Path2D('m -56.998045,-113.99805 a 56.999023,56.998993 0 0 0 -57.000005,57.000005 V 4.9999999e-6 57.000005 a 56.999023,56.998993 0 0 0 57.000005,56.998035 H 5e-6 h 57 A 56.999023,56.998993 0 0 0 113.99804,57.000005 V 4.9999999e-6 -56.998045 A 56.999023,56.998993 0 0 0 57.000005,-113.99805 h -57 z');
          radiusDiv= 115;   
        break;
         case 205: // NUKE
                                path = new Path2D('M -115825.0046 -51899.336599999995 L -115825.0046 -55148.8094 -89690.3429 -57122.0082 -76683.3125 -57122.0082 -76683.3125 -52944.1146 -53466.04400000001 -52944.1146 -39122.19410000001 -42035.17019999999 -8610.804499999998 -53524.073 23723.636799999993 -56889.903 27977.849499999997 -56889.903 65417.7289 -51551.4834 89972.455 -42035.17019999999 92282.377 -37160.960999999996 94044.8092 -37160.960999999996 95807.24139999998 -37876.77099999999 114121.98760000001 -21687.280999999995 120017.39349999999 769.0494000000035 113332.0198 23070.642999999996 97428.01539999999 35720.071800000005 95645.164 34327.4406 91390.9513 34327.4406 91593.229 39201.6498 65579.80629999998 54752.6982 27410.578599999993 58698.48659999999 -12703.577900000004 53824.27739999999 -40175.69720000001 43147.438200000004 -53060.8505 53360.066999999995 -75427.5317 53360.066999999995 -75427.5317 57770.0658 -88312.685 58060.65419999999 -114569.2238 54752.6982 -114569.2238 50574.8046 -88798.9172 50574.8046 -88798.9172 21329.549400000004 -120160.8941 21329.549400000004 -120404.0102 -22538.333399999996 -89042.03330000001 -23002.5438 -88555.80110000001 -49462.5366 Z M -64010.168399999995 16919.2431 L -78597.1344 16919.2431 -78597.1344 -15343.3797 -64496.40059999999 -15343.3797 Z');
                                radiusDiv = 51200;
                                break;
                            case 206: // Wisp
                                path = new Path2D('M -19169.9038 -18519.129 C -8794.682489678713 -28891.0366018223 8024.188598177694 -28888.350310321293 18396.0962 -18513.129000000008 24656.0962 -12251.129 30916.0962 -5989.129000000001 37176.0962 272.8709999999992 30914.0962 6532.870999999999 24652.0962 12792.871 18390.0962 19052.871 8014.874889678711 29424.778601822298 -8803.996198177698 29422.092310321284 -19175.903799999996 19046.871 -29547.8114018223 8671.649689678714 -29545.125110321285 -8147.221398177695 -19169.9038 -18519.128999999997 Z');
                                radiusDiv = 26500;
                                break;
                            case 207: // RPG Rocket
                                path = new Path2D('m-188.62112 -16.533947l8.0143585 0l12.969101 -24.251179l27.098267 9.488823l0 -2.001377l17.078102 0l0 6.2210903l10.228264 0l134.11871 -21.404089l38.26966 0l120.62271 31.946732l38.694733 0l4.3259735 4.321554l22.032852 0l0 26.571358l-22.245377 0l-3.9540558 3.9540453l-38.012848 0l-120.72455 29.892221l-38.274086 0l-134.53935 -20.877178l-11.596466 0l0 5.061001l-13.602264 0l0 -2.320179l-28.045822 11.388359l-12.335907 -22.56418l-78.34146 0l0 -35.427002z');
                                radiusDiv = 55;
                                break;
                            case 208: // Bullet
                                path = new Path2D('m-164.9029 -40.75328l0 79.07611l258.03412 0l58.267723 -15.262466l152.60104 -23.582678l-147.05249 -22.19685l-58.267723 -18.03412z');
                                radiusDiv= 80;
                                break;
      case 209://new
                                path = new Path2D('M100 100 h 80 v 800 h -80 Z');    //adiusDiv= 79;
                                break;  
      case 210://Trape-fighter
                                path = new Path2D('m -113.1059,-0.32146 61.674009,53.20654 v 74.40354 L 113.1059,66.58262 V -63.038321 L -51.431891,-127.28862 v 73.760624 z');   
        radiusDiv= 225;
                                break;
        case 211: // hmmm2
            path = new Path2D('m 1.9248076,-5.704592 c -1.611307,0.230016 -3.043746,0.725651 -4.024805,1.678906 0,0 -1.350047,1.503205 -2.140429,2.124219 -0.579511,0.455329 -1.884375,1.15625 -1.884375,1.15625 h -1.5 V 0.75458704 h 1.5 v 0.0002 c 0,0 1.306923,0.68367396 1.884375,1.13593696 0.795102,0.622728 2.140429,2.144531 2.140429,2.144531 1.067468,1.06887 2.515226,1.669345 4.024805,1.669336 1.88243,-1.866652 3.806861,-3.803622 5.7,-5.69980896 z');
          radiusDiv= 6;   
        break;
          case 212: // zeppelin
                       path = new Path2D('M -44242.0195 -238.2051999999967 C -44242.0195 -24627.099752527833 -24470.91405252785 -44398.2052 -82.0195000000167 -44398.205200000004 L -82.01950000000215 -44398.2052 C 11629.940691314267 -44398.2052 22862.209484932733 -39745.64712946315 31143.81595719794 -31464.040657197944 39425.422429463164 -23182.434184932736 44077.98050000001 -11950.165391314262 44077.98050000001 -238.2051999999967 L 44077.9805 -238.2051999999967 C 44077.9805 24150.689352527843 24306.875052527837 43921.7948 -82.01949999999488 43921.7948 L -82.01950000000215 43921.7948 C -24470.914052527838 43921.7948 -44242.0195 24150.689352527843 -44242.01950000001 -238.20519999998942 Z M 11090.991800000003 -43096 L 92122.68360976904 -28652.756941444954 92011.29999023097 28176.756941444968 10922.991800000003 42620 Z M 89846.7253 -20894.342 C 89846.7253 -24294.206919958364 87090.59021995837 -27050.342 83690.7253 -27050.342 82058.05258854777 -27050.342 80492.24990074172 -26401.76529071049 79337.77595501562 -25247.29134498439 78183.30200928952 -24092.81739925829 77534.7253 -22527.014711452233 77534.7253 -20894.342 77534.7253 -17494.477080041637 80290.86038004165 -14738.342 83690.7253 -14738.342 87090.59021995837 -14738.342 89846.7253 -17494.477080041637 89846.7253 -20894.342 Z M 89846.7253 -238.8077000000003 C 89846.7253 -3638.672619958364 87090.59021995837 -6394.8077 83690.7253 -6394.807700000001 82058.05258854777 -6394.807700000001 80492.24990074172 -5746.230990710489 79337.77595501562 -4591.757044984389 78183.30200928952 -3437.2830992582876 77534.7253 -1871.480411452234 77534.7253 -238.8077000000012 77534.7253 3161.057219958361 80290.86038004165 5917.1923 83690.7253 5917.1923 87090.59021995837 5917.1923 89846.7253 3161.057219958365 89846.7253 -238.8076999999994 Z M 74115.871 -10711.836299999999 C 74115.871 -14111.701219958362 71359.73591995836 -16867.8363 67959.871 -16867.8363 66327.19828854776 -16867.8363 64761.395600741715 -16219.259590710488 63606.92165501561 -15064.785644984388 62452.44770928951 -13910.311699258287 61803.871 -12344.509011452232 61803.871 -10711.836299999999 61803.871 -7311.9713800416375 64560.00608004163 -4555.836299999999 67959.871 -4555.836299999999 71359.73591995836 -4555.836299999999 74115.871 -7311.971380041634 74115.871 -10711.836299999999 Z M 74115.871 9943.698 C 74115.871 6543.833080041636 71359.73591995836 3787.698 67959.871 3787.697999999999 66327.19828854776 3787.697999999999 64761.395600741715 4436.274709289511 63606.92165501561 5590.748655015612 62452.44770928951 6745.222600741712 61803.871 8311.025288547766 61803.871 9943.697999999999 61803.871 13343.562919958362 64560.00608004163 16099.698 67959.871 16099.698 71359.73591995836 16099.698 74115.871 13343.562919958365 74115.871 9943.698 Z M 57216.8744 -20894.342 C 57216.8744 -24294.206919958364 54460.73931995837 -27050.342 51060.8744 -27050.342 49428.20168854777 -27050.342 47862.399000741716 -26401.76529071049 46707.925055015614 -25247.29134498439 45553.45110928951 -24092.81739925829 44904.8744 -22527.014711452233 44904.8744 -20894.342 44904.8744 -17494.477080041637 47661.009480041634 -14738.342 51060.8744 -14738.342 54460.73931995836 -14738.342 57216.8744 -17494.477080041637 57216.8744 -20894.342 Z M 89846.7253 20416.7266 C 89846.7253 17016.861680041635 87090.59021995837 14260.7266 83690.7253 14260.7266 82058.05258854777 14260.7266 80492.24990074172 14909.303309289511 79337.77595501562 16063.777255015611 78183.30200928952 17218.251200741714 77534.7253 18784.053888547765 77534.7253 20416.726599999998 77534.7253 23816.59151995836 80290.86038004165 26572.7266 83690.7253 26572.7266 87090.59021995837 26572.7266 89846.7253 23816.591519958365 89846.7253 20416.7266 Z M 57216.8744 -238.8077000000003 C 57216.8744 -3638.672619958364 54460.73931995837 -6394.8077 51060.8744 -6394.807700000001 49428.20168854777 -6394.807700000001 47862.399000741716 -5746.230990710489 46707.925055015614 -4591.757044984389 45553.45110928951 -3437.2830992582876 44904.8744 -1871.480411452234 44904.8744 -238.8077000000012 44904.8744 3161.057219958361 47661.009480041634 5917.1923 51060.8744 5917.1923 54460.73931995836 5917.1923 57216.8744 3161.057219958365 57216.8744 -238.8076999999994 Z M 57216.8744 -238.8077000000003 C 57216.8744 3161.0572199583635 54460.73931995837 5917.1923 51060.8744 5917.192300000001 49428.20168854777 5917.192300000001 47862.399000741716 5268.6155907104885 46707.925055015614 4114.141644984388 45553.45110928951 2959.667699258287 44904.8744 1393.8650114522334 44904.8744 -238.8076999999994 44904.8744 -3638.672619958362 47661.009480041634 -6394.8077 51060.8744 -6394.8077 54460.73931995836 -6394.8077 57216.8744 -3638.6726199583654 57216.8744 -238.8077000000012 Z M 44904.8744 20416.7266 C 44904.8744 23816.591519958365 47661.009480041634 26572.7266 51060.8744 26572.7266 52693.54711145223 26572.7266 54259.349799258285 25924.14989071049 55413.82374498439 24769.67594498439 56568.29769071049 23615.20199925829 57216.8744 22049.399311452235 57216.8744 20416.7266 57216.8744 17016.861680041642 54460.73931995837 14260.726600000002 51060.8744 14260.726600000002 47661.00948004164 14260.726600000002 44904.8744 17016.861680041635 44904.8744 20416.7266 Z M -16024.3479 15702.5792 C -7219.824418197492 24507.102681802506 7055.128618197488 24507.102681802513 15859.652099999998 15702.579200000006 22377.91078 9184.320520000001 30100.42814 3870.3205199999975 39027.20418 -239.4208000000035 30100.428139999996 -4349.162120000001 22377.91078 -9663.16212 15859.6521 -16181.4208 7055.128618197495 -24985.944281802505 -7219.824418197491 -24985.944281802505 -16024.347899999999 -16181.4208 -24828.871381802506 -7376.897318197494 -24828.871381802506 6898.055718197487 -16024.347900000002 15702.579199999998 Z');
                                radiusDiv = 40000;


        break;
            case 213: // AK-47
                                path = new Path2D('m 7.93294,0.3852 c -0.0125,-0.025 -0.01,-0.2325 -0.01,-0.2325 l -0.0025,-0.105 -0.1025,0.0025 -0.095,0.2025 -0.095,0.145 c 0,0 -0.37496,0.0082 -0.535,0.005 -0.25,-0.005 -0.3925,-0.1425 -0.3925,-0.1425 l -0.0075,-0.095 -0.815,-0.005 c 0,0 .005,-0.035 -0.015,-0.04 -0.02,-0.005 -0.99,-0.0025 -0.99,-0.0025 l -0.015,-0.0325 c 0,0 -0.1625,0 -0.2025,0.0025 -0.04,0.0025 -0.0875,0.055 -0.12,0.06 -0.0325,0.005 -0.1125,0.0025 -0.1125,0.0025 L 4.42044,0.0127 4.29794,0.0102 c 0,0 -0.005,0.05 0,0.115 -0.215,0 -1.80008,0.0032 -1.8775,0.0075 -0.045,0.0025 -0.09184,0.0296 -0.11302,0.05188 -0.02356,0.02476 -0.03814,0.06458 -0.03948,0.08562 -0.0675,0.005 -0.0825,0.0175 -0.12,0.055 -0.0375,0.0375 -0.03,0.125 -0.03,0.125 0,0 -0.57478,0.07816 -0.625,0.08 -0.16482,0.00598 -0.1125,-0.07 -0.3025,-0.05 -0.1014,0.01066 -1.09,0.125 -1.115,0.125 -0.025,0 -0.08438,0.01132 -0.0625,0.075 .08812,0.25652 .11084,0.58902 .1025,0.69 -0.01078,0.13054 .4025,-0.06 .9225,-0.215 .52,-0.155 1.095,-0.37 1.095,-0.37 0,0 .05824,0.03246 .0875,0.1025 .02988,0.07156 .0225,0.1575 .0225,0.1575 0,0 -0.19,0.445 -0.24,0.52 -0.05,0.075 .03,0.08 .03,0.08 l .34,0.0925 c .035,0.00836 .05582,-0.0025 .06582,-0.03832 .01532,-0.05488 .02336,-0.27168 .06336,-0.33168 .04,-0.06 .2175,-0.2675 .2175,-0.2675 h .75832 l -0.00082,-0.31168 c 0,0 .0025,0.01168 .04914,0.005 0,0.80296 .67824,1.48692 .89502,1.59918 .05768,0.02988 .075,-0.005 .09,-0.0325 .015,-0.0275 .18832,-0.30664 .215,-0.36 .02666,-0.05332 .05332,-0.07332 -0.02668,-0.12664 C 4.0857,1.46426 4.10294,0.7702 4.10294,0.7702 c 0,0 .285,-0.005 .3175,-0.0025 .0325,0.0025 .13982,0.09734 .1975,0.0975 .23206,0.00074 .2725,-0.1125 .4475,-0.115 .08006,-0.00114 .9275,0 .9275,0 v -0.1475 l 2.0025,0.0025 .0025,-0.1975 c 0,0 -0.0525,0.0025 -0.065,-0.0225 z m -5.17634,0.66116 .00134,-0.25164 .5175,0.0025 c -0.02058,0.00796 .0225,0.245 .0225,0.245 l -0.54134,0.00414 z');
                                break;
          case 214: // Ship-23/AWS Body
                                path = new Path2D('m-146.62466 -180.25066l74.75065 0l1.4356918 1.8136444l2.438324 2.9370117l2.7506561 2.9370117l3.312336 3.2493439l3.687664 3.18898l4.249344 3.3123322l4.874016 3.4986877l3.9396324 2.2519684l4.1233597 2.3123322l3.7506561 1.8110199l0.62467194 2.0l0.31233597 2.438324l0.12598419 2.1863556l0.24934387 1.9396362l71.68767 0l0.12598419 -3.0630035l0.24934387 -2.3123322l0.8110237 -3.0629883l4.375328 -2.2493439l4.125984 -2.2519684l4.375328 -2.6850433l4.687664 -3.2519684l5.56168 -4.687668l3.312336 -3.0603638l2.24934 -2.18898l1.876648 -2.3753204l2.186348 -2.3753357l1.8766403 -2.3753204l75.4357 0l3.6246643 .50131226l3.3753357 .8740082l3.5013123 1.3123322l3.123352 1.5643158l3.2519684 2.0l4.687668 3.81102l2.4986877 2.6246643l2.0 2.7506561l2.561676 3.9370117l1.3753357 3.6246796l1.1889801 3.2519684l0.6246643 2.561676l0.3753357 2.7506561l0.12335205 2.0629883l0 74.00001l-2.4986877 2.123352l-3.0 2.3123398l-2.7506561 2.624672l-3.3123322 3.312336l-3.8740234 4.43832l-2.6272888 3.4383202l-3.0603638 4.4986877l-2.6246796 4.062992l-1.6876678 3.375328l-1.5643005 3.062992l-0.7480316 1.7506561l-2.0 .56167984l-2.3753204 .24934387l-2.0630035 .062992096l-1.3123322 0l0 72.06299l1.9370117 0l2.1259766 .24934387l2.3123474 .50131226l1.8740082 .49868774l1.2493439 2.8740158l1.9370117 3.8136482l2.0 3.1259842l2.5643005 3.8740158l3.3753357 4.4986877l3.7480164 4.5013123l4.0630035 4.312336l2.6246643 2.624672l2.9396362 2.438324l3.0 2.3123322l0 75.49868l-0.68766785 4.3753357l-1.5643005 4.9370117l-1.8110199 3.9396362l-2.6876678 4.123352l-2.1259918 2.9370117l-2.4986725 2.5013123l-3.3123474 2.6246643l-4.5013123 2.8136597l-2.7506561 1.3753204l-3.6246643 1.4356995l-3.0630035 .8136444l-2.8740082 .49868774l-76.249344 0l-0.9370041 -1.4986877l-1.3753281 -1.8136444l-2.251976 -2.561676l-2.748024 -2.6876678l-3.501316 -3.438324l-2.5616798 -2.3753357l-2.2493439 -1.8740082l-3.062992 -2.1259918l-3.624672 -2.4356842l-3.624672 -2.2519684l-4.125984 -2.2493439l-2.687664 -1.3123474l-2.4986877 -1.0629883l-0.25196838 -2.123352l-0.24934387 -2.3123322l0 -1.8136597l0.062992096 -1.9369965l-72.37533 0l-0.062992096 1.8740082l-0.24934387 1.3753204l-0.37532806 2.1259918l-0.62467194 2.123352l-3.2493439 2.0630035l-4.125984 2.3123322l-5.750656 3.5643005l-3.624672 2.5616913l-4.062992 3.2493286l-3.0603676 2.6876678l-3.0 2.9370117l-2.8136444 2.9370117l-1.8740158 2.18898l-1.813652 2.4383087l-1.1259842 1.6876678l-75.81103 0l-3.8766327 -0.6273041l-3.3727112 -1.0l-3.9396362 -1.8740082l-4.123352 -2.1863556l-2.7506561 -1.5643005l-3.9370117 -3.6876678l-3.0 -3.81102l-2.2493439 -3.438324l-2.0629883 -4.249344l-1.3123322 -3.9369965l-0.50131226 -3.6246796l-0.49868774 -3.627304l-0.12599182 -1.561676l0 -72.81102l1.561676 -1.3149643l2.627304 -2.186348l2.3123322 -2.1259842l3.1863556 -3.0603676l3.561676 -3.6272964l3.1259918 -4.0603676l2.561676 -3.5013123l3.2519684 -4.937008l1.7480316 -3.062992l1.8136444 -3.5616798l1.6246796 -3.5616798l2.6876678 -0.56430435l2.561676 -0.24934387l3.2493439 0l0 -71.93701l-2.2493439 0l-2.4356995 -0.12598419l-2.2519684 -0.37532806l-1.1863556 -0.31233597l-1.2493439 -2.687664l-1.3123322 -2.5616798l-1.7506561 -3.1259842l-2.3753204 -4.0603676l-1.5616913 -2.375328l-2.4383087 -3.312336l-2.438324 -3.1259842l-3.4986877 -4.0l-3.1259918 -3.1863518l-3.0629883 -2.6272964l-3.123352 -2.5616837l-1.9396362 -1.561676l0 -72.50131l0.31495667 -3.7480316l1.0 -4.8136444l1.0 -3.3123322l1.7480316 -4.125992l2.0629883 -3.2493439l2.6246796 -3.2493439l3.2493439 -3.3123322l4.750656 -3.6876678l4.0629883 -2.18898l4.312332 -1.6876678l3.8740234 -0.93699646l2.3753204 -0.62467957zm74.7 143.3l0 71.68767l3.186348 .062992096l4.186348 .68766403l4.000004 1.1259842l1.4383202 2.624672l3.375328 4.312336l4.375328 4.687664l3.4986877 3.312336l4.2519684 3.4356956l3.8110237 2.687664l2.2493439 1.2519684l1.3149605 3.5616798l0.43569565 3.6876678l0.24934387 2.6876602l-0.060367584 1.7506561l71.49869 0l0.18897629 -3.7506561l0.8110237 -3.7506561l0.8766403 -3.312336l0.43569565 -1.2493439l3.8766403 -2.5643044l2.8740158 -2.4356956l4.0 -3.7506561l3.312336 -3.5616798l3.1863518 -3.5013123l2.4383202 -3.062992l1.5013123 -2.687664l2.8740158 -0.8740158l2.8740158 -0.62467194l3.6272964 -0.50131226l3.1233597 -0.18635178l0 -71.813644l-2.624672 -0.12335968l-3.375328 -0.43832016l-3.2493439 -0.68766403l-2.1889763 -0.68766403l-2.312336 -3.375328l-2.0603676 -3.0603676l-2.2519684 -2.5643044l-2.687664 -3.1233597l-2.687664 -2.5013123l-2.2493439 -1.9370079l-2.312336 -1.8740158l-2.687664 -2.1259842l-3.312336 -2.375328l-0.7506561 -2.4383202l-0.68766403 -3.0603676l-0.31233597 -2.4383163l0 -3.1259918l-72.12336 0l-0.062992096 2.624672l-0.37532806 2.813652l-0.43832016 1.9370041l-0.24934387 1.6876678l-0.18635178 1.1863518l-1.8766403 1.3753281l-2.0603676 1.312336l-1.9396324 1.3753281l-1.9370079 1.3753281l-1.7506561 1.5013123l-2.5616798 2.312336l-2.4986877 2.687664l-1.687664 2.0l-2.624672 2.8740158l-2.0 2.4383202l-1.5013123 2.1233597l-1.4383202 2.687664l-2.1233597 .62467194l-2.8136482 .50131226l-1.9370041 .31233597l-2.0 .062992096z');
                                radiusDiv = 100;
                                break;
           case 215: // 24 Pointed Star
                                path = new Path2D('m-3.1884842 -0.007504462l0.84110737 -0.46545094l-0.59896183 -0.75189334l0.9552134 -0.10814953l-0.26564586 -0.92389536l0.92389536 .26564574l0.10814953 -0.9552133l0.7518934 .5989616l0.46545094 -0.84110713l0.46545094 .84110713l0.7518933 -0.5989616l0.10814953 .9552133l0.9238956 -0.26564574l-0.26564598 .92389536l0.95521355 .10814953l-0.59896183 .75189334l0.84110713 .46545094l-0.84110713 .46545094l0.59896183 .75189334l-0.95521355 .10814953l0.26564598 .9238956l-0.9238956 -0.26564598l-0.10814953 .9552133l-0.7518933 -0.5989616l-0.46545094 .84110713l-0.46545094 -0.84110713l-0.7518934 .5989616l-0.10814953 -0.9552133l-0.92389536 .26564598l0.26564586 -0.9238956l-0.9552134 -0.10814953l0.59896183 -0.75189334z');
                                radiusDiv = 2.2;
                                break;
                              case 216: // Pistol
                                path = new Path2D('m0 -210l0.0866127 -4.3359575l1.2152252 -1.2152233l1.9921265 -0.08661413l1.3018341 1.0419946l1.1259842 2.1679792l1.1286125 2.6010494l9.2782135 0l1.2125969 1.994751l30.519684 0l0.9553833 -1.6482935l0.8661423 -0.34645748l1.3884506 0l0.77952576 .8661423l5.2021027 9.538057l80.72178 0l1.6483002 2.0813656l26.356949 0l23.498688 0l1.994751 -1.994751l114.88452 0l0 -8.149607l3.6404114 0l0 2.0813646l9.451447 0l0 -1.99475l4.6824036 0l3.8136597 7.110235l8.32547 5.635172l0.25982666 5.808399l1.8189087 0l0 1.6482925l2.0813599 0l0 2.2545948l-2.2545776 0l0 10.577427l1.6036682 .43044662l0 4.4251976l-2.2966003 0l0 6.2414703l-2.2545776 14.3937l-2.427826 9.884514l-3.9868774 8.409447l-28.614166 0l-6.590576 7.6325455l-1.8188782 2.1653595l-19.509186 0l-2.3385925 -2.338585l-48.38321 0l-3.8162537 3.2073517l-0.8661499 3.727028l-0.7821655 5.288719l-0.7795105 5.2887115l-1.2992249 5.8110275l-1.0419922 5.375328l-1.2992096 4.5958023l-1.0419922 3.9868774l-0.51968384 3.0367432l0.25984192 1.9921265l1.561676 1.6482849l1.7322998 1.994751l0.34906006 2.341217l-0.52230835 2.5144348l-1.6456604 1.4724426l-3.296585 1.6482849l-8.669296 .9527588l-14.047241 1.1286163l-23.84253 3.2073364l-14.566925 1.9081421l-8.582672 .6062927l-7.805771 -0.6929016l-6.4147034 -1.6483002l-9.797897 -3.0341187l-5.9816284 -1.1259918l-6.417328 .17323303l-5.4619446 2.8609009l-6.070862 6.154846l-4.6797943 5.724411l-2.5170593 5.8950195l-2.1653519 6.414688l-1.3884506 6.244095l1.4750671 2.601059l0.086616516 2.1679688l-0.60892487 1.734909l-1.9055176 .9527588l-3.2099686 .9527588l-4.5065613 15.173233l-3.902893 12.05249l2.3412094 2.5144348l1.1259842 1.9081268l-0.51968384 2.6876678l-2.1679764 1.2152252l-2.9475098 .77952576l-3.640419 9.451447l-1.5616837 6.328079l0 9.2782135l1.1286087 6.4147186l2.1653595 9.278198l3.0367432 5.7218018l3.2939606 4.5957947l1.6483002 1.994751l0.3464508 1.994751l-0.9553757 2.1679688l-3.640419 1.8189087l-8.496063 1.9081421l-11.965881 -0.34646606l-7.5433044 -0.779541l-5.375328 -1.0419922l-14.480316 -1.6456604l-17.081367 -1.6482849l-10.577427 -1.3884583l-9.624672 -0.43307495l-5.808399 -0.51968384l-5.984252 -0.43307495l-2.3412075 -1.3884583l-1.2992125 -2.9475098l-0.69553757 -2.7742615l0.26246738 -2.687683l1.3858261 -1.2125854l3.2073498 -1.3018494l4.7690287 .086639404l1.3018379 -1.212616l0.34645653 -1.1286011l-0.9527569 -1.1259766l-7.110236 -0.086639404l-5.811023 -2.4277954l-2.7742784 -3.556427l-1.6456692 -4.59581l0.4330709 -8.755905l1.5590551 -5.8950195l2.7742782 -15.349075l3.4698167 -15.346466l6.328083 -20.115479l9.36483 -21.501312l16.12861 -26.61943l7.4566917 -9.711288l2.6010475 -5.461937l1.0393715 -5.2887115l-0.17322922 -5.8110275l-1.6482925 -6.587921l-4.2467194 -5.8110275l-5.3779526 -5.115486l-5.808399 -3.207344l-6.4146976 -1.6483002l-7.4566936 -0.6062927l-7.979002 -0.25984192l-3.64042 -1.1259842l-2.1679792 -2.3412094l-1.2992125 -3.0341187l-0.34908152 -4.422577l0.69553804 -4.076111l2.947507 -3.2073517l6.2414703 -2.0813675l6.0708656 -4.3359528l4.682415 -5.8950157l7.9763775 -10.4042015l4.422573 -4.509186l1.2992096 -3.989502l-0.60629654 -5.0288696l-2.1679802 -3.1207352l-5.0288696 -2.0813637l-1.9081383 -3.380579l0.08661461 -3.8162727l3.296587 -3.8136482l2.947506 -0.60629845l4.3359604 1.1259842l2.947506 3.4671917l1.994751 2.4278202l2.687664 .52231026l2.1653519 -1.3884506l-0.43306732 -2.5144367l-2.687664 -0.17322731l-5.9816284 -6.068243zm135.14494 95.92331l-5.0288696 3.469818l-5.0288696 6.2414703l-3.643036 5.7244034l-1.5590668 5.375328l-0.17321777 7.1102448l1.7322845 6.761154l3.4698029 6.070862l5.028885 3.9868774l6.414688 3.296585l6.417328 .8661499l8.32283 -0.17323303l5.8950195 -1.0393677l11.099731 -1.3884583l10.230972 -1.561676l16.301834 -1.9055176l5.2021027 -2.7742767l3.9868774 -5.551178l2.0813599 -7.1102295l1.0393829 -6.241478l0 -7.8031464l-1.7322845 -6.244095l-4.162735 -4.855644l-5.3753357 -3.9868774l-4.6824036 0l0 -3.469818l-15.086624 -0.1732254l-17.860886 1.3884506l-0.8661499 1.9081345l0 11.443573l1.7322845 6.244095l2.9475098 5.721779l5.551178 4.5091934l5.8950195 3.293953l4.509186 .8661499l1.7322845 .9553833l0.60891724 1.561676l-0.08660889 .9527588l-1.821518 .9527588l-5.2887115 .4330597l-6.850403 -0.08660889l-9.10498 -2.8608856l-7.194229 -6.9370117l-6.7637787 -9.708664l-0.69291687 -4.682419l0.606308 -3.3832016l-1.2152252 -2.8608856l-3.2073517 -2.8608932z');
                                radiusDiv = 80;
                                break;
            case 217: // Ship-23/AWS Minion Body 1
                                path = new Path2D('m-70.18826 15.310836l0 -30.68504l2.6876678 -1.3149614l3.5616798 -1.4356956l3.7506561 -1.4383202l4.4356956 -1.7506561l3.9396324 -1.6246719l6.0603676 -2.0l4.0 -0.7506561l2.5013123 -0.43569565l1.6246719 -0.12598419l3.8136482 .18897629l5.0 .24934387l6.4356956 .18635178l6.375328 .37532806l7.687663 .062992096l7.750656 .37532806l7.43832 .62467194l7.5616794 .43832016l5.312337 .56167984l5.0 .81365013l5.937008 .62467l4.874016 .9370079l3.687664 .7506561l4.062992 1.0l5.1889763 1.4986877l3.8110237 1.1889782l3.624672 .93700695l5.0 1.9370079l4.8766365 2.2493439l2.5616837 1.2493439l2.0629883 1.1889763l2.375328 1.5616798l2.2493439 1.5013123l1.9370117 1.687664l3.7506561 4.0l-5.375328 5.937008l-2.6876678 1.8110237l-3.624672 1.9396324l-3.375328 1.7480316l-2.498684 1.3753281l-3.4383202 1.5013123l-2.375328 1.0l-2.8740158 .81102276l-3.0 .9370079l-4.375328 1.1889763l-2.937008 .68766403l-2.687664 .56167984l-2.687664 .62467194l-3.624672 .7506561l-4.125984 .7506561l-4.125984 .49868774l-3.375328 .43832016l-4.1233597 .68766403l-4.375329 .49868774l-3.687664 .37532806l-6.687664 .31233597l-7.937008 .31233597l-6.624672 .43832016l-7.438319 .18635178l-8.186352 .25196838l-5.125984 .062994l-5.874016 .43569374l-2.8766403 -0.062992096l-1.1863518 .062992096l-2.2493439 -0.49868774l-4.0 -1.1889763l-3.8136482 -1.1863518l-4.312336 -1.5013123l-3.7506561 -1.4986877l-3.8110237 -1.5616779l-3.6876678 -1.5013142z');
                                radiusDiv = 30;
                                break;
                            case 218: // Ship-23/AWS Minion Body 2
                                path = new Path2D('m-150.87172 -0.31737927l45.091873 -26.03412l46.22047 0l1.0629921 -0.09186363l-2.4986877 -2.1233597l-1.8766403 -2.375328l-2.3123398 -3.062992l-2.561676 -3.4383202l-2.624672 -4.7480316l-2.0 -3.8136482l-2.3123398 -5.249344l-1.8136444 -4.43832l-1.7506561 -5.874016l-1.1863556 -5.062992l-0.9370041 -5.813652l-0.43832397 -5.874016l-0.06298828 -4.8136444l0.25196838 -5.6850433l0.6850357 -6.0629883l1.2519684 -5.813652l1.3753281 -4.4383163l1.7480316 -4.9370117l1.5643082 -4.312332l2.0 -4.1233597l2.0603638 -3.5643082l2.18898 -3.7480316l2.8740158 -4.2519684l2.937008 -3.7480316l3.062992 -3.2519684l3.1889763 -3.2493439l4.375328 -3.7506561l4.4986877 -3.6876678l4.937008 -3.0603638l4.375328 -2.2519684l7.56168 -3.3753204l8.0 -2.5616913l3.8766403 -1.3123322l3.999999 -0.9370117l4.624672 -0.6876526l2.4383206 -0.24934387l2.5616798 -0.12599182l4.249344 -0.12597656l3.4383202 0l4.0 .25196838l3.4383197 .37532043l2.5616798 .37271118l7.312337 1.7506561l4.062992 1.2493439l4.4986877 1.7506561l4.2519684 1.7506561l3.7480316 1.8740082l4.750656 2.5643005l3.312336 2.060379l1.8136482 1.2519684l2.7480316 2.1863403l2.687664 2.18898l2.9396324 3.1233673l3.0603676 2.9369965l3.9396324 4.3123474l3.4986877 4.8766327l1.8740158 2.4356995l2.7506561 4.8136444l2.624672 5.375328l2.2519684 5.5616837l2.186348 6.1889725l1.1259842 5.624672l0.8740158 5.062996l0.37532806 4.312332l0.31233978 4.9370117l-0.06299591 5.0l-0.37532806 5.0l-0.561676 3.4383163l-1.2493439 8.000004l-1.6246719 5.624672l-2.1259842 5.56168l-2.624672 5.062992l-2.375328 4.4986877l-2.438324 3.8136482l-2.186348 3.1863518l-2.2493439 3.0l-2.062992 2.2519684l-2.0 2.0603676l46.498684 0l45.874023 26.485563l-45.745415 26.412075l-46.503933 0l5.2519684 6.041994l2.3726997 3.7480316l3.438324 5.813648l2.3123322 3.624672l2.438324 5.624672l1.6876602 4.937008l2.1863556 7.125984l0.8136444 4.186352l0.68766785 5.0l0.49868774 4.312332l0.18897247 3.3123398l-0.18897247 3.2519684l-0.24934387 4.435692l-0.37532806 5.939636l-1.0 4.7480316l-0.8740158 3.2519684l-2.18898 6.68766l-2.0603638 5.1863556l-3.2519684 6.624672l-2.0 3.8136444l-3.8740158 5.7480392l-3.375328 3.7506561l-3.2493439 3.5013123l-2.7506561 2.8740082l-4.062992 3.5013123l-5.249344 3.9370117l-5.56168 3.9370117l-4.750656 2.6876526l-4.813648 2.2493439l-3.375328 1.1259918l-4.624672 1.3753204l-4.56168 1.4356995l-3.624673 .7506561l-3.937008 .561676l-2.9999995 .3753357l-3.937008 .31233215l-4.43832 0l-4.8766403 -0.18635559l-5.8740163 -0.8766327l-4.186352 -0.561676l-6.1889753 -1.4986877l-3.4356956 -0.93963623l-7.5643044 -2.6246796l-4.56168 -2.4986877l-4.624672 -2.5013123l-4.5643044 -2.9369965l-6.3727036 -5.1863556l-5.1889763 -4.876648l-4.43832 -5.249344l-3.8110237 -5.0629883l-4.18898 -6.561676l-2.8740158 -6.31234l-2.8740158 -6.624672l-2.0 -7.249344l-1.5643005 -6.9396286l-0.49868774 -4.0603714l-0.24934387 -4.375328l-0.12598419 -4.1889725l0.31233215 -5.1233597l0.50131226 -4.750656l1.1233597 -6.5013123l1.1259842 -4.0603676l1.3123398 -4.2519684l1.3753281 -3.8110237l2.81102 -6.2519684l1.9396362 -4.0l2.6850357 -4.1233597l2.7506561 -3.7506561l2.813652 -3.7506561l2.2493439 -2.687664l1.8136482 -1.8740158l-47.564304 0z');
                                radiusDiv = 65;
                                break;
                            case 219: // 3,3-diethyl-2,2-dimethylheptane
                                path = new Path2D('m13.501312 -304.00067l-28.501312 0l-19.251968 19.24936l0 29.002625l19.375328 19.375336l0 68.12335l-18.937008 18.937012l0 28.813644l19.532808 19.532806l0 67.21785l-19.858267 19.860893l-67.61155 0l-19.80577 -19.805775l0 -67.055115l19.779526 -19.779526l0 -27.97113l-20.110237 -20.11023l-27.61155 0l-19.682419 19.67978l0 27.181107l19.181107 20.249344l0 67.49869l-19.624664 19.627296l-66.62468 0l-20.249344 -18.627296l-28.75064 0l-19.375336 19.375328l0 28.375328l19.687653 19.687664l27.438324 0l19.842514 -19.84252l68.157486 0l20.078735 20.078741l0 66.57742l-20.039368 20.039368l0 27.45932l19.45932 20.249344l28.249344 0l19.375328 -19.375336l0 -27.874008l-18.624672 -19.249344l-0.49868774 -67.750656l19.748032 -20.750656l67.0 0l19.87664 19.87664l0 68.12336l-19.186352 19.18898l0 27.81102l19.309711 20.0l0 67.750656l-19.372704 19.375336l0 28.125977l19.687664 19.687653l27.937008 0l19.343834 -19.343811l0 -27.845154l-19.047245 -19.047241l0 -68.45145l19.976376 -19.97638l0 -28.774277l-20.02362 -18.249344l0 -69.0l19.125984 -19.125984l67.874016 0l19.564308 19.56168l27.685036 0l20.094482 -20.091864l68.15486 0l19.999985 20.656168l27.251984 0l19.876648 -19.874016l68.87137 0l19.564331 19.564304l27.18634 0l19.97113 -19.968504l68.02887 0l19.388428 19.388453l27.362244 0l19.43042 -19.430447l0 -28.181103l-18.713928 -18.71391l-28.716492 0l-19.356964 19.356953l-67.14438 0l-19.821503 -19.821522l-29.178497 0l-19.338562 19.338583l-66.91077 0l-19.750671 -19.160105l-29.249329 0l-19.375336 19.375328l-66.87401 0l-19.937012 -19.937008l-29.062988 0l-19.656166 19.656168l-66.845146 0l-19.04462 -19.044619l0 -68.54855l19.398952 -19.396324l0 -28.104988l-20.102364 -19.249344l0 -68.249344l20.0 -20.0l0 -26.501312z');
                                radiusDiv = 60;
                                break;
           case 220: // Magnum Rifle
                                path = new Path2D('m200 45l48.99997 -5.81102l5.0629883 0l0 -1.1889801l3.758545 -1.0078735l9.803162 0l1.4330444 -0.8267746l6.1916504 0l4.876587 -6.1023636l0.9370117 -0.561676l2.0629883 -0.43832397l8.561707 0l0 -18.68766l-0.9370117 -0.9370041l-15.375305 0l-20.81366 11.125984l-14.123352 0l-0.8451538 -0.8451462l-17.779541 0l0 -1.5931778l-59.251953 1.3753281l-1.561676 -0.31233215l-1.1863708 -1.1259918l-1.3123169 -0.7506561l-1.6273193 -0.37532806l-5.1863403 -1.0l-1.7506714 -0.6850357l-1.0 -1.3753281l-0.37530518 -0.93963623l-0.37271118 -2.4356918l-0.18896484 -2.438324l-0.43832397 -5.6246643l-0.6246948 -8.687668l0 -5.750656l0.18899536 -8.435696l0.49868774 -5.813648l0.56430054 -3.1259842l0.6850281 -1.312336l1.1260071 -1.2493439l2.5013123 -0.9370079l6.2493286 -1.5013123l0.9370117 -1.0l1.6246643 -0.68766403l58.126007 -0.49868774l2.435669 -2.5616798l17.062988 0l1.1889954 -1.1889763l13.811005 0l21.438354 10.624672l15.312317 0l0 -3.8740158l20.624695 0l0 3.8136482l40.8136 0l4.123413 -3.3149605l-0.24938965 -12.56168l-1.3753052 -1.5616798l-0.43566895 -0.8766403l0 -3.4356956l0.37268066 -1.0l0.93963623 -1.1889763l2.123352 -0.9370079l3.876648 -1.1233597l4.123352 -0.7506561l3.876648 -0.37532806l4.2493286 0l3.0 .24934387l4.2493286 .50131226l3.2493896 .7480316l2.876587 1.0l1.1864014 1.0l0.43829346 1.2519684l0 4.249344l-0.24932861 1.0629921l-0.87664795 1.2493439l-0.24932861 12.186352l3.6246338 2.687664l65.0 -0.7480316l1.9055176 -3.301838l18.15747 0l1.9527588 3.380577l71.04724 -1.3910751l1.6246948 1.8740158l0.7506714 2.375328l0.9370117 4.4356956l0.43829346 5.9396324l-0.12597656 7.4356956l-0.18634033 7.5643044l-0.25195312 2.6876678l-0.56170654 2.8740158l-0.6876831 2.0629883l-1.0 1.4356918l-71.06299 1.1889801l0 18.375328l6.0629883 0l3.6115723 2.083992l5.6378174 0l0.81359863 .8530197l0.6246948 1.186348l0.43829346 1.3753281l39.624695 0l6.4987183 .56430817l9.501282 1.0l9.624695 0l11.624634 1.6876602l43.189026 0l3.312317 -0.8136444l2.0603638 -1.0629959l1.56427 -1.186348l1.4987183 -1.1259918l4.312317 0l-1.2808228 -1.280838l0 -1.2178421l6.343811 -11.50132l6.501343 1.0l0 8.062996l2.0603638 -1.6876602l3.2519531 -2.0l3.4987183 -1.2493439l2.1259766 -0.37532806l1.2493286 .6876602l2.2493286 0l1.0 .561676l0.56433105 1.0629959l0 2.81102l2.1863403 -1.6246719l2.5617065 -1.3123322l2.8135986 -1.3123398l2.4383545 -0.7506561l2.312317 -0.18634796l1.3123169 .8740158l2.5617065 0l1.5617065 .62729645l0.8765869 1.3727036l0 6.68766l2.015747 1.162735l7.5459595 0l4.5459595 4.545929l511.70343 -3.582672l0 -1.6246719l5.687622 -1.876648l5.624634 -1.561676l5.624756 -1.561676l2.8135986 -0.37532806l0 -2.6876678l-1.1864014 -2.6876678l-1.3122559 -3.7506561l-1.1259766 -3.937004l-0.12597656 -2.6876678l0.25195312 -2.7506561l0.87402344 -1.4986801l1.5616455 -1.0629959l1.1259766 -0.31233978l3.4383545 -0.06298828l2.4986572 .6876602l1.4383545 .75066376l1.7480469 1.1259842l14.627197 0l1.8110352 -0.6273041l2.4383545 -0.62467194l2.687622 -0.24934387l5.7507324 0l1.6246338 .56168365l1.6246338 1.0l1.7507324 1.7506561l1.8110352 2.6876602l1.1889648 2.5616837l0.81103516 2.375328l0 8.18898l2.1259766 2.1259842l0 3.2493439l1.112793 .6430435l0 2.3569565l1.7612305 .8110199l1.5012207 2.3123322l1.1234131 2.7506638l0.24938965 3.186348l0.12597656 3.1259842l-0.5617676 3.2493439l-1.3752441 2.5013123l-1.9370117 2.186348l-2.1259766 1.1259918l-2.9370117 .561676l-27.125977 0l-1.4987793 -0.561676l1.3753662 -0.62467194l1.3753662 0l0 -1.251976l-3.3149414 0l-0.36486816 1.3622055l-405.63513 7.3884583l0.81359863 2.9369965l0.5013428 3.627304l0.24926758 4.4356995l-0.6246338 5.0629883l-2.0629883 4.8136444l-1.3123779 1.6246796l-2.8135986 2.6246643l-3.7506104 2.3123474l-4.435791 1.561676l-6.0 .7506561l-5.8135986 .561676l-36.561646 3.3753204l0 7.9370117l-0.87402344 1.5643158l-2.1259766 1.3123322l-2.4383545 .49868774l-2.3753662 -0.49868774l-1.4986572 -0.9370117l-0.81365967 -1.1259766l0 -7.8136597l-263.18634 20.939636l-12.0 .9370117l-15.876648 1.6876678l-14.874023 2.0l-14.125977 1.8740082l-1.8740234 .68766785l-3.5616455 2.0629883l-2.4383545 1.3753357l-2.687622 1.9369965l-3.8740234 1.4986877l-4.0629883 .81365967l-5.312378 .6246643l-8.375305 .8136444l-12.498657 1.0603638l-13.126038 .7506561l-45.75061 4.5013275l-10.375366 1.3123322l-5.811035 .37532043l-5.0629883 .06036377l-4.188965 -0.31233215l-3.8110352 -0.24934387l-4.5616455 -0.24934387l-2.312317 2.0630035l-1.8136597 1.0603638l-1.6246948 -0.18635559l-1.5012817 -0.8740082l-1.2493896 -0.5643158l-1.4382935 0l-0.6876831 .5643158l-0.37268066 1.7480164l0.06036377 3.9396362l-0.12335205 5.4356995l-1.1889648 5.18898l-1.43573 3.81102l-1.876648 3.3123322l-2.7479858 3.876648l-4.3150024 3.9370117l-4.748047 2.3753204l-3.6246338 1.6876678l-3.9396362 .68766785l-5.624695 .18634033l-9.0 -0.06298828l-5.7480164 -0.43569946l-5.5013123 -0.8136444l-5.4986877 -1.1259918l-4.188965 -1.4356842l-4.3123474 -2.1259918l-2.6246643 -1.6246643l-2.9370117 -2.5013123l-2.2519836 -3.0l-1.3123169 -2.4986877l-0.6876831 -2.6876678l-0.49868774 -2.8136444l-0.12597656 -4.249344l-0.49868774 -3.4356995l-1.1259766 -3.6876678l-2.0 -3.1259766l-3.0629883 -2.7506561l-2.9370117 -1.8740234l-2.8110352 -1.3753204l-3.2519531 -0.561676l-2.687683 -0.12599182l-3.6246643 .50131226l-19.123352 6.6850433l-8.876648 3.3149567l-4.1863403 2.1863556l-7.5013123 4.438324l-4.4356995 3.1863403l-5.438324 3.6876678l-4.8740234 4.438324l-4.5643005 4.687668l-3.8110046 4.249344l-4.1889954 5.2493286l-4.3123474 6.3753357l-3.2493286 5.438324l-2.4986877 3.9370117l-1.7506409 2.9370117l-1.3123474 1.5013123l-2.3753357 1.4986877l-2.1889648 .12597656l-3.2493591 .06298828l-3.3753357 -0.6272888l-5.0 -1.0l-9.624664 -1.1863708l-9.375336 -1.561676l-10.0 -2.0l-10.123352 -2.6246643l-7.6876526 -2.438324l-2.1259766 -1.0629883l-1.3123474 -1.3753357l-0.9370117 -1.9369965l-1.0 -1.3123322l-1.561676 -0.7506714l-2.0629883 -0.31233215l-2.3753357 .43832397l-38.501312 14.063004l-42.687668 15.312317l-41.87401 15.312347l-32.687668 11.624664l2.7506561 6.687683l0.24934387 2.6246643l-1.561676 2.1259766l-2.3123322 1.6850281l-3.18898 .62731934l-2.1863556 -0.12600708l-1.561676 -1.0629883l-1.2519684 -1.561676l-0.9370117 -2.2493286l-1.3123322 -2.876648l-0.6246643 -1.7506714l-42.687668 15.687683l-39.561684 13.501312l-16.125984 5.1259766l-4.312336 1.0l-2.312336 .12335205l-2.1259842 -0.6876526l-1.4356956 -2.0629883l-0.8766403 -3.7480469l-1.4356956 -6.6876526l-1.5013123 -9.251984l-0.7506561 -8.624664l-1.7480316 -16.624664l-0.8766403 -8.435699l-0.9370079 -10.939636l-0.56167984 -8.561676l-0.8766403 -9.125977l-0.68766403 -8.123367l-0.62467194 -8.813644l-1.312336 -14.561676l-0.8110237 -12.18898l-1.2519684 -15.372711l-0.9370079 -10.564301l-0.31233597 -9.062988l0.062992096 -5.8740234l0.37532806 -4.81102l0.8740158 -3.438324l1.2493439 -3.0l1.7506561 -1.6876526l3.0 -1.1259918l3.687664 -0.8740082l5.874016 -0.3123474l42.12598 -1.2493439l22.062996 -1.4383087l21.937004 0l33.93701 -3.2493439l139.99998 -8.125992l33.0 -1.0l12.0 -0.24934387l5.438324 .18635559l5.126007 1.0629883l3.561676 1.5013123l3.561676 2.372696l3.438324 2.7506561l4.1259766 3.0l4.1863403 2.3123474l4.063019 1.5013123l5.2493286 1.2493439l4.5013123 .18634033l9.874023 0l4.438324 -0.18634033l4.6876526 -0.87402344l4.7480164 -1.6876526l8.750671 -3.18898l28.249329 -10.81102l15.188995 -5.0630035l16.199463 -4.341202l0 -1.8477783l-5.3254395 0l-1.1260071 -1.561676l-0.74801636 -2.3123322l-0.18899536 -2.8740082l0 -2.3753357l0.18899536 -1.9370041l1.3123474 0l0 -3.3123398l-1.5013428 0l0 -2.18898l0.3123474 -1.6876602l1.0 -1.438324zm41 88l-10.750671 .31233215l-2.4986877 .6273041l-2.6876526 1.1863556l-2.3753357 2.0l-2.3123474 2.3753204l-1.5013123 2.7506561l-1.3123169 3.1233673l-0.81103516 3.0629883l-0.06298828 2.5013123l0.3123474 3.372696l0.6876526 3.3753357l1.6246643 3.8136444l1.8110352 2.3753357l2.3753052 2.0629883l2.5013428 1.6246796l2.2493286 .74801636l4.1259766 1.6876678l4.4356995 1.1889801l5.1889954 1.123352l3.9369812 .5643158l5.4986877 .49868774l6.188965 -0.43569946l4.8740234 -0.50131226l4.501343 -0.9370117l4.123352 -1.3123322l3.6273193 -1.8136444l3.3726807 -2.6876678l2.9396362 -3.6876678l2.1863403 -3.9370117l0.9370117 -3.3753204l0.12597656 -3.4356995l-0.3123169 -4.0629883l-0.6876831 -2.5643005l-1.4382935 -3.1863556l-1.4383545 -2.0629883l-2.0 -2.1233673l-1.4986572 -0.8766327l-2.5013428 -1.0630035l-5.2493286 -0.93699646l-4.8740234 -0.68766785l-3.5616455 -0.3753357l-3.876648 -0.18634033l-8.24939 0l-0.81359863 1.4986877l-0.7480469 1.7506561l-1.0629883 1.0l-1.9370117 2.5013123l-2.126007 2.2493439l-1.2493286 2.6876678l-1.2519836 3.2493286l-0.81100464 3.0630035l-0.12600708 3.7506561l0.56433105 2.6246643l1.2493286 2.3753357l1.6246643 2.123352l2.3123474 2.0629883l1.5013123 1.3123474l0.9369812 1.3753204l0 1.2493439l-0.9369812 .43832397l-2.314972 -0.49868774l-1.7480164 -1.6876678l-2.0 -2.18898l-1.7506714 -2.2493286l-1.6876526 -3.0l-1.1863403 -3.1259918l-0.50131226 -2.6876678l0 -2.81102l0.37530518 -3.0629883l1.0 -2.8136597l1.6246948 -2.81102l1.561676 -2.3123322l1.3123169 -1.8136444l0.50131226 -2.2493439z');
                                radiusDiv = 106;
                                break;
         case 221: // SMG
                                path = new Path2D('M 19.28125 -128.41406 L 16.330078 -117.41016 L -15.058594 -117.41016 L -32.226562 -97.466797 L -58.757812 -97.466797 L -58.757812 -85.503906 L -231.64844 -85.503906 L -231.64844 -90.533203 L -232.51367 -96.253906 L -234.25 -98.855469 L -237.36914 -100.41797 L -264.76953 -100.41797 L -270.31836 -98.162109 L -273.26562 -95.212891 L -275 -89.664062 L -276.21289 -77.351562 L -277.25391 -37.640625 L -280.375 -0.18359375 L -284.53711 35.191406 L -284.12695 38.126953 L -283.6875 40.9375 L -282.49805 43.375 L -280.6875 44.4375 L -278.4375 44.5625 L -275.4375 42.6875 L -273.12695 39.501953 L -271.375 32.126953 L -264.0625 2.8144531 L -258.75 -18.3125 L -254.49805 -36.0625 L -253.49805 -40.814453 L -251.81445 -44.498047 L -248.81445 -48.25 L -243.81445 -51.3125 L -233.18555 -56.375 L -233.18555 -65.498047 L -230.625 -68.0625 L -46 -68.0625 L -43.498047 -65.5625 L -43.498047 -55.375 L -6.75 -22.75 L 16.375 -22.75 L 16.375 -19.625 L 34.25 -19.625 L 40.75 -15.873047 L 47.125 -11.126953 L 51.501953 -7 L 54.375 1.5019531 L 56.25 10.375 L 56.25 17.625 L 53.625 26.501953 L 49 38.501953 L 44 41.75 L 42 46.75 L 5.5625 97.5625 L -0.75 107.0625 L -4.8144531 112.0625 L -9.0625 116.25 L -10.126953 118.625 L -10.3125 121.50195 L -8.375 123.75 L 4.4375 128.5625 L 35.4375 138.50195 L 52.6875 144.12695 L 61.625 147.25 L 66.75 149 L 69.501953 148.9375 L 72 145.87305 L 72.3125 144.375 L 70.814453 142.625 L 69.375 139 L 68.873047 135.81445 L 69.125 132.5625 L 72.5625 124.4375 L 92.375 85.75 L 109.4375 53.126953 L 114.4375 53.126953 L 117.0625 51.9375 L 120.50195 51.625 L 123.5625 52.375 L 131.3125 60.75 L 210.25 60.75 L 213.375 54.625 L 216.6875 49.625 L 218.87305 47.375 L 222.3125 46.0625 L 248.51367 43.513672 L 248.9375 41.9375 L 252.0625 41.9375 L 252.0625 45.4375 L 250.25 45.4375 L 250.25 51.75 L 257.9375 51.75 L 257.9375 50 L 267.75 50 L 272 70.75 L 277.25 88.75 L 285.50195 117.25 L 294.75 141.50195 L 304.4375 165.0625 L 307.375 165.87305 L 330.4375 154.375 L 347.9375 147 L 348.75 144.25 L 343.25 131.25 L 333.75 106.50195 L 325 80.501953 L 317.625 47 L 317.625 39.375 L 321.4375 37.9375 L 324.87305 37.9375 L 326.5625 37.185547 L 326.6875 35.4375 L 325.9375 33.126953 L 322.4375 27.375 L 319.25 25.375 L 317.0625 25.375 L 315.125 9.9375 L 311 -9.4375 L 311 -18.3125 L 308.9375 -18.3125 L 308.9375 -19.9375 L 312.25 -19.9375 L 312.25 -22 L 315.625 -22 L 315.625 -18.185547 L 320.50195 -13.375 L 536 -13.375 L 536 -27.873047 L 539.23828 -38.873047 L 539.23828 -46.765625 L 542.4375 -47.625 L 542.4375 -39.75 L 576.18555 -39.75 L 576.18555 -42.814453 L 596.75 -42.814453 L 601.625 -45.5625 L 632.87305 -45.5625 L 634.9375 -46.9375 L 634.9375 -70.779297 L 602.40625 -70.779297 L 598.9375 -74.25 L 577.0625 -74.25 L 574.5625 -77.9375 L 574.5625 -82.0625 L 577.0625 -85.75 L 577.0625 -106.3125 L 570.9375 -112.75 L 546.5625 -112.75 L 541.87305 -106.18555 L 541.87305 -101.87305 L 531.18555 -101.87305 L 527.50195 -107.375 L 526.33008 -105.27344 L 522.3418 -105.27344 L 518.61328 -110.64844 L 518.61328 -118.71094 L 516.61914 -120.70508 L 514.01758 -120.70508 L 510.54883 -125.9082 L 494.07617 -125.9082 L 491.99414 -122.61133 L 465.46289 -122.61133 L 459.39453 -118.625 L 459.39453 -109.60547 L 85 -109.60547 L 85 -121.05273 L 81.359375 -121.05273 L 75.289062 -125.03906 L 75.289062 -128.41406 L 19.28125 -128.41406 z M 532.6875 -85.0625 L 543.4375 -85.0625 L 544.625 -82.5625 L 544.875 -80.375 L 543.625 -76.185547 L 541.875 -71.6875 L 540.3125 -69.25 L 538.3125 -69.25 L 535.75 -72.4375 L 533.625 -77.5625 L 532.5625 -81.4375 L 532.6875 -85.0625 z M 156.375 6.0625 L 198.5625 6.0625 L 200.87305 8.375 L 200.87305 37 L 198.50195 37.75 L 196.25 39.625 L 194.25 42.25 L 193.12695 45.375 L 193.12695 50.126953 L 136.87305 50.126953 L 126 35.501953 L 126 11.126953 L 130 6.25 L 133.625 6.25 L 135.50195 8.625 L 135.50195 17.75 L 136.375 24.25 L 138.87305 30.873047 L 142.25 37.25 L 145.625 41.75 L 149.625 44.873047 L 153.50195 44.873047 L 153.50195 41.501953 L 151.375 39 L 149.75 32.625 L 149.25 26.375 L 150.75 19.625 L 152.50195 13.375 L 156.375 6.0625 z ');
                                radiusDiv = 74;
                                break;
          case 222: // Ship-22 Body
                                path = new Path2D('m-505.57953 -92.94494l288.576 0l43.68721 40.416405l333.46558 0l66.132 -102.95984l289.97937 0l-97.996155 153.35243l97.59534 153.48001l-289.97934 0l-66.33188 -102.70404l-332.86493 0l-42.484802 40.544632l-291.7824 0l98.195984 -91.0648z');
                                radiusDiv = 85;
                                break;
                            case 223: // Ninja Star
                                path = new Path2D('m-0.34747374 -329.82632l0 93.29396l-234.10236 0l66.24147 69.01837l-165.43309 166.8189l96.763794 0l0 235.83989l69.71129 -67.62991l166.47244 167.16798l0 -98.49869l234.10498 0l-65.89502 -70.057755l165.08662 -166.12598l-96.76378 0l0 -237.57217l-70.404205 70.40419z');
                                radiusDiv = 70;
                                break;
                case 224: // Missile
                                path = new Path2D('M -238.80859 -93.488281 L -238.80859 -23.257812 L -250.25586 -23.257812 L -262.21875 -20.65625 L -262.21875 21.132812 L -248.86719 23.560547 L -239.1543 23.560547 L -239.1543 93.099609 L -215.22656 93.099609 L -99.039062 23.388672 L .15234375 23.388672 L .15234375 46.626953 L 46.970703 46.626953 L 115.81641 23.214844 L 172.3457 23.214844 L 172.3457 58.416016 L 213.09961 23.388672 L 239.80273 23.388672 L 272.58008 21.828125 L 305.00391 16.800781 L 334.13867 9.8632812 L 347.31641 4.6601562 L 355.29688 -0.021484375 L 346.625 -5.3964844 L 332.75195 -10.945312 L 303.44531 -17.708984 L 270.67188 -22.21875 L 242.05664 -23.603516 L 213.27344 -23.603516 L 172.86914 -58.113281 L 172.86914 -23.779297 L 117.20117 -23.779297 L 47.490234 -46.84375 L .49804688 -46.84375 L .49804688 -23.431641 L -99.039062 -23.431641 L -214.70312 -93.488281 L -238.80859 -93.488281 z M -231.69922 -23.779297 L -201.35156 -23.779297 L -201.35156 -21.525391 L -232.21875 -21.525391 L -231.69922 -23.779297 z M -232.21875 22.267578 L -201.35156 22.267578 L -201.35156 24.521484 L -231.69922 24.521484 L -232.21875 22.267578 z');
                                radiusDiv = 75;
                                break;
                            case 225: // Missile Launcher
                                path = new Path2D('M -230.31445 -46.876953 L -251.27539 -44.052734 L -241.40234 -13.146484 L -247.12305 -12.277344 L -249.22852 -6.3066406 L -250.27734 -0.671875 L -249.20898 5.4960938 L -245.93359 15.111328 L -243.23047 16.056641 L -253.25781 37.097656 L -231.20117 36.740234 L -227.23242 48.664062 L -220.99023 50.78125 L -199.83789 47.941406 L -200.43164 52.632812 L -199.48242 55.96875 L -196.01367 58.787109 L -190.44141 61.205078 L -181.79297 63.595703 L -184.89844 71.689453 L -181.9043 72.837891 L -178.48633 63.933594 L -172.39258 64.509766 L -176.49414 75.193359 L -174.22656 76.0625 L -168.66602 61.574219 L -169.61719 53.408203 L -159.20898 53.875 L -118.70508 60.279297 L -109.95117 63.638672 L -71.542969 71.013672 L -43.630859 75.03125 L -18.464844 75.050781 L -4.8867188 74.90625 L 10.337891 68.03125 L 27.875 58.960938 L 37.685547 50.140625 L 42.193359 52.005859 L 72.388672 36.816406 L 77.220703 38.535156 L 74.683594 44.792969 L 50.230469 58.972656 L 44.572266 56.267578 L 25.378906 67.910156 L 34.826172 89.34375 L 47.511719 83.5 L 58.78125 79.255859 L 60.248047 74.734375 L 63.845703 73.033203 L 71.25 74.671875 L 105.08398 75.472656 L 137.54492 74.273438 L 204.96094 74.439453 L 224.96289 73.949219 L 233.16602 74.552734 L 249.05859 72.21875 L 276.08789 67.728516 L 274.56445 71.699219 L 279.46484 73.580078 L 283.94531 61.908203 L 359.06836 48.966797 L 403.94336 48.380859 L 402.19727 52.931641 L 408.38281 55.306641 L 411.0918 48.246094 L 431.58984 48.212891 L 436.37695 50.050781 L 439.55664 41.765625 L 442.17969 42.771484 L 444.57617 36.529297 L 439.26562 34.490234 L 441.50586 28.65625 L 437.59766 27.15625 L 361.4043 26.835938 L 248.74023 28.046875 L 224.86719 27.453125 L 199.4707 27.345703 L 165.80664 28.888672 L 165.45508 24.867188 L 187.44141 24.203125 L 213.92188 22.478516 L 251.75391 17.308594 L 296.60547 8.6132812 L 340.97266 -3.4296875 L 354.75977 -9.0976562 L 340.06445 -14.365234 L 287.81641 -24.386719 L 234.94727 -32.791016 L 179.89062 -36.458984 L 143.38672 -35.240234 L 103.5 -31.972656 L 60.712891 -26.478516 L 57.771484 -23.890625 L 49.011719 -23.816406 L 45.412109 -26.777344 L 26.986328 -27.162109 L -55.15625 -24.138672 L -114.19336 -22.277344 L -151.52539 -20.353516 L -153.61133 -22.173828 L -159.91211 -22.455078 L -169.98242 -21.865234 L -230.31445 -46.876953 z M 42.201172 18.8125 L 43.472656 26.664062 L -165.125 28.414062 L -165.99219 24.736328 L 42.201172 18.8125 z M 55.267578 20.361328 L 76.419922 20.712891 L 77.941406 26.519531 L 56.652344 26.515625 L 55.267578 20.361328 z M 86.373047 21.994141 L 154.92383 25.136719 L 86.681641 27.466797 L 86.373047 21.994141 z ');
                                radiusDiv = 70;
                                break;
        case 226: // Atlantis Body
                                path = new Path2D('M -14041.4766 2846.028300000001 L -14036.4254 -2751.7509 -10816.187 -4912.1557 8138.211400000002 -4912.1557 10869.270600000002 -3526.2245000000003 13885.689800000002 60.84910000000036 11562.269000000002 2954.9899000000005 10950.8114 3647.9227 8097.473800000002 5033.853900000001 -10816.187 5033.853900000001 Z');
                                radiusDiv = 8000;
                                break;
          case 227: // Grid
                                path = new Path2D('m -43.4995,-43.4995 v 4.91205 6.78703 4.91206 14.65022 4.91401 14.64826 4.91401 14.65022 4.91206 6.78703 4.91205 H 38.58745 43.4995 V 38.58745 31.80042 26.88836 12.23814 7.32413 -7.32413 v -4.91401 -14.65022 -4.91206 -6.78703 -4.91205 h -4.91205 z m 4.91205,4.91205 h 6.78703 v 6.78703 h -6.78703 z m 11.69713,0 h 14.65218 v 6.78703 h -14.65218 z m 19.56619,0 H 7.32413 v 6.78703 H -7.32413 Z m 19.56227,0 h 14.65022 v 6.78703 H 12.23814 Z m 19.56228,0 h 6.78703 v 6.78703 h -6.78703 z m -70.38787,11.69909 h 6.78703 v 14.65022 h -6.78703 z m 11.69713,0 h 14.65218 v 14.65022 h -14.65218 z m 19.56619,0 H 7.32413 v 14.65022 H -7.32413 Z m 19.56227,0 h 14.65022 v 14.65022 H 12.23814 Z m 19.56228,0 h 6.78703 v 14.65022 h -6.78703 z m -70.38787,19.56423 h 6.78703 V 7.32413 h -6.78703 z m 11.69713,0 h 14.65218 V 7.32413 h -14.65218 z m 19.56619,0 H 7.32413 V 7.32413 H -7.32413 Z m 19.56227,0 H 26.88836 V 7.32413 H 12.23814 Z m 19.56228,0 h 6.78703 V 7.32413 h -6.78703 z m -70.38787,19.56227 h 6.78703 v 14.65022 h -6.78703 z m 11.69713,0 h 14.65218 v 14.65022 h -14.65218 z m 19.56619,0 H 7.32413 V 26.88836 H -7.32413 Z m 19.56227,0 H 26.88836 V 26.88836 H 12.23814 Z m 19.56228,0 h 6.78703 v 14.65022 h -6.78703 z m -70.38787,19.56228 h 6.78703 v 6.78703 h -6.78703 z m 11.69713,0 h 14.65218 v 6.78703 h -14.65218 z m 19.56619,0 H 7.32413 v 6.78703 H -7.32413 Z m 19.56227,0 h 14.65022 v 6.78703 H 12.23814 Z m 19.56228,0 h 6.78703 v 6.78703 h -6.78703 z');
                                radiusDiv = 80;
                                break;
           case 228: // Bow Core
                                path = new Path2D('M 26263.09846 124848.78024 C 12462.331121401558 138649.54757859843 -9913.133721401553 138649.54757859843 -23713.901060000004 124848.78024000001 L -123664.90154 24897.77975999999 C -130292.26373270349 18270.417567296507 -134015.47704394883 9281.785495679942 -134015.47704394886 -90.72000000005937 -134015.47704394886 -9463.225495679973 -130292.26373270355 -18451.857567296567 -123664.90154000005 -25079.219760000065 L -23713.901059999993 -125030.22024000002 C -9913.133721401538 -138830.98757859846 12462.33112140154 -138830.98757859846 26263.09845999999 -125030.22024000002 L 126214.09894 -25079.219760000007 C 140014.86627859843 -11278.45242140157 140014.86627859846 11097.012421401538 126214.09894000001 24897.77975999999 Z');
                                radiusDiv = 100000;
                                break;
          case 229: // k
                                path = new Path2D('M -2505.8469999999993 -9786.8972 L -6211.4472 -9190.269199999999 -6211.4472 9504.074800000002 -2505.8469999999993 9504.074800000002 -2505.8469999999993 3786.389800000001 C -2083.0603999999994 4109.563300000002 -1685.1435999999994 4532.174800000001 -1262.356999999999 5004.505300000001 -839.5703999999996 5476.835800000001 -416.78379999999925 5998.885300000002 -43.736799999999675 6520.934800000001 329.3102000000008 7042.9843 702.3572000000004 7565.033800000001 1050.5344000000005 8087.083300000002 1373.841800000001 8609.1328 1672.2794000000013 9081.4633 1945.847200000001 9504.074800000002 L 6198.583000000001 9504.074800000002 C 5925.015200000001 8957.165800000002 5576.838000000001 8360.537800000002 5154.051400000001 7689.331300000002 4731.264800000002 7018.124800000001 4283.608400000002 6371.777800000002 3786.2124000000013 5700.571300000001 3288.8164000000006 5029.364800000001 2766.5506000000014 4407.8773 2244.2848000000004 3786.389800000001 1722.0190000000011 3164.9023000000016 1199.753200000001 2617.9933 702.3572000000004 2170.5223000000005 1697.1492000000007 1201.0018 2617.331800000001 256.34079999999994 3462.9050000000016 -663.4606999999996 4283.608400000002 -1583.2621999999992 5154.051400000001 -2552.782699999999 6024.4944000000005 -3572.0221999999994 L 1622.5398000000005 -3572.0221999999994 C 1398.7116000000005 -3298.5676999999996 1100.2740000000013 -2950.5346999999992 776.9666000000007 -2577.6421999999993 478.52900000000045 -2204.7496999999994 130.35180000000037 -1782.1381999999994 -242.6951999999992 -1359.5266999999985 -615.7421999999997 -936.9151999999995 -988.7891999999993 -514.3036999999986 -1386.7059999999992 -91.6921999999995 -1759.7529999999997 330.9193000000014 -2132.7999999999993 753.5308000000005 -2505.8469999999993 1151.2828000000009 L -2505.8469999999993 -9786.8972 Z');
                                radiusDiv = 3200;
                                break;
         case 230: // Terminator
                                path = new Path2D('M 1.1926452,8.2525e-4 .57453922,0.95420971 .04413176,0.78344108 -1.2866688,0.94915731 -0.64483857,0.28750215 v -0.57500783 l -0.64183023,-0.66165511 1.33080056,0.16571618 .53040746,-0.1707686 z');
                                break;
        
                            case 231: // Sun
                                path = new Path2D('M 8977.0478 1.0478000000002794 L 5311.276224072266 1304.682748730469 5311.276224072266 -1302.5871487304685 Z M 6315.772244444444 -6422.517755555555 L 4645.964064072268 -2908.274988730468 2802.3705887304714 -4751.868464072265 Z M -106.95219999999972 -9082.9522 L 1196.682748730469 -5417.180624072265 -1410.5871487304685 -5417.180624072265 Z M -6530.517755555555 -6422.517755555555 L -3016.274988730468 -4751.868464072265 -4859.868464072265 -2908.274988730468 Z M -9190.9522 1.0478000000002794 L -5525.180624072265 -1302.5871487304685 -5525.180624072265 1304.682748730469 Z M -6530.517755555555 6423.772244444444 L -4859.868464072265 2910.3705887304714 -3016.274988730468 4753.964064072268 Z M -106.95219999999972 9085.0478 L -1410.5871487304685 5419.276224072266 1196.682748730469 5419.276224072266 Z M 6315.772244444444 6423.772244444444 L 2802.3705887304714 4753.964064072268 4645.964064072268 2910.3705887304714 Z M -4648.9522 1.0478000000002794 C -4648.9522 -2507.4295337314643 -2615.4295337314643 -4540.9522 -106.95219999999972 -4540.952200000001 2401.525133731464 -4540.952200000001 4435.0478 -2507.429533731466 4435.0478 1.0477999999984604 4435.0478 2509.525133731464 2401.5251337314658 4543.0477999999985 -106.9521999999979 4543.0478 -2615.4295337314616 4543.0478 -4648.952199999999 2509.5251337314658 -4648.9522 1.0478000000020984 Z');
                                radiusDiv = 6400;
                                break;
                            case 232: // UwU
                                path = new Path2D('M -67599.8489 -24560 L -67599.8489 3172.4110000000037 C -67599.8489 8196.398500000003 -66996.97039999999 12215.588500000005 -65791.2134 15162.9945 -64518.4699 18110.400500000003 -62508.874899999995 20320.955 -59628.4554 21861.644500000002 -56815.022399999994 23402.334000000003 -53130.764899999995 24206.172000000006 -48642.6694 24206.172000000006 -44020.60089999999 24206.172000000006 -40269.3569 23335.347500000003 -37455.923899999994 21526.712000000007 -34575.50439999999 19785.063000000002 -32632.895899999996 17440.535500000005 -31494.125399999997 14627.1025 -30422.34139999999 11813.669500000004 -29886.44939999999 7995.439000000002 -29886.44939999999 3172.4110000000037 L -29886.44939999999 -24560 -36250.1669 -24560 -36250.1669 3105.424500000001 C -36250.1669 9134.209500000004 -37254.9644 13220.386000000006 -39197.5729 15296.967500000006 -41207.16789999999 17440.535500000005 -44489.5064 18512.319500000005 -49178.56139999999 18512.319500000005 -51925.0079 18512.319500000005 -54202.548899999994 17976.427500000005 -56078.1709 16904.643500000006 -58020.7794 15832.859500000006 -59293.522899999996 14292.170000000006 -60097.3609 12349.561500000003 -60901.198899999996 10339.966500000002 -61236.1314 7258.5875000000015 -61236.1314 3105.424500000001 L -61236.1314 -24560 Z M -24326.569899999995 -11363.659499999998 L -13675.71639999999 23402.334000000003 -7512.958399999989 23402.334000000003 -479.37589999998454 -3325.279499999997 860.3541000000114 2569.532500000001 6353.247100000008 23402.334000000003 12516.00510000001 23402.334000000003 23367.81810000002 -11363.659499999998 17606.97910000001 -11363.659499999998 11712.167100000006 8732.290500000003 9702.572100000005 15430.940500000004 7960.9231000000145 8799.277000000002 2735.9761000000144 -11363.659499999998 -3292.808899999989 -11363.659499999998 -8852.688399999992 9000.236500000006 C -9924.472399999991 13421.345500000003 -10527.35089999999 15765.873000000007 -10594.33739999999 16167.792000000001 L -12670.91889999999 8732.290500000003 -18230.798399999992 -11363.659499999998 Z M 29128.65710000001 -24560 L 29128.65710000001 3172.4110000000037 C 29128.65710000001 8196.398500000003 29731.535600000017 12215.588500000005 31004.279100000014 15162.9945 32210.036100000012 18110.400500000003 34219.63110000001 20320.955 37100.05060000002 21861.644500000002 39980.47010000002 23402.334000000003 43597.741100000014 24206.172000000006 48152.82310000001 24206.172000000006 52774.89160000002 24206.172000000006 56459.14910000001 23335.347500000003 59339.56860000001 21526.712000000007 62153.00160000002 19785.063000000002 64162.596600000004 17440.535500000005 65234.38060000002 14627.1025 66306.1646 11813.669500000004 66842.05660000003 7995.439000000002 66842.05660000003 3172.4110000000037 L 66842.05660000003 -24560 60545.32560000001 -24560 60545.32560000001 3105.424500000001 C 60545.32560000001 9134.209500000004 59540.52810000001 13220.386000000006 57530.93310000001 15296.967500000006 55588.32460000002 17440.535500000005 52238.99960000001 18512.319500000005 47549.94460000002 18512.319500000005 44870.48460000001 18512.319500000005 42525.957100000014 17976.427500000005 40650.33510000001 16904.643500000006 38774.71310000001 15832.859500000006 37434.98310000001 14292.170000000006 36631.14510000001 12349.561500000003 35894.29360000002 10339.966500000002 35492.37460000001 7258.5875000000015 35492.37460000001 3105.424500000001 L 35492.37460000001 -24560 Z');
                                radiusDiv = 25600;
                                break;
          case 233: // Supercarrier Body
                                path = new Path2D('m -370.59277,-101.62303 31.2756,-31.27821 h 239.25984 l 7.128613,4.5433 1.603676,11.22835 -5.88189,9.98162 -8.375329,3.56431 h -51.86352 l -18.20734,10.511808 17.36745,10.026245 H 3.3074972 56.41773 l 34.275593,9.183731 h 82.456697 l 19.24672,-9.228348 h 90.89238 l 99.979,8.556427 166.63257,73.4251996 -166.63257,73.6036764 -100.8714,8.732277 h -89.1076 l -19.60629,-9.089233 -87.106516,0 -35.688769,8.645668 H -157.9786 l -17.66929,10.202095 17.63254,10.181104 h 51.36221 l 9.267713,3.76378 6.060372,10.51444 -1.07087,11.5853 -6.771652,3.74278 H -338.87098 l -31.45407,-31.456693 z');
                                radiusDiv = 85;
                                break;
         case 234: // Bow Hollow Square
                                path = new Path2D('M 541.9918 -157367.0523 L 156793.9918 -1115.0523000000103 541.9918 155136.9477 -155710.0082 -1115.0523000000103 Z M 541.9918 -72734.71902 L -71077.67492 -1115.0523000000103 541.9918 70504.61442 72161.65852000001 -1115.0523000000103 Z');
                                radiusDiv = 150000;
                                break;
            case 235: // Overdrive Redesign
                                path = new Path2D('M -38155.2158 -196.9519999999975 C -38155.2158 -21189.295341068457 -21137.55914106847 -38206.952 -145.21580000001268 -38206.952000000005 9935.662978801054 -38206.952000000005 19603.655208090873 -34202.33849771047 26731.912952900668 -27074.08075290068 33860.17069771047 -19945.823008090887 37864.7842 -10277.830778801072 37864.7842 -196.95200000000477 37864.7842 20795.391341068454 20847.12754106846 37813.048 -145.21579999999813 37813.048 -21137.559141068454 37813.048 -38155.21579999999 20795.39134106846 -38155.2158 -196.9519999999975 Z M 20801 -14160.860359999999 C 20801 -18016.989604361064 17674.989604361068 -21143 13818.86036 -21143 L -14108.860360000006 -21143 C -15960.638926890344 -21143 -17736.573464731344 -20407.383828539463 -19045.978646635413 -19097.9786466354 -20355.383828539474 -17788.573464731337 -21091.000000000015 -16012.638926890337 -21091.000000000015 -14160.860359999999 L -21091 13766.860360000006 C -21091 17622.98960436107 -17964.98960436107 20749 -14108.860360000006 20749 L 13818.860359999999 20749 C 17674.989604361064 20749 20801 17622.98960436107 20801 13766.860360000006 Z');
                                radiusDiv = 38000;
                                break;






        












        
        
    }
    radius /= radiusDiv;
    context.save();
    context.translate(centerX, centerY);
    context.scale(radius, radius);
    context.lineWidth /= radius;
    context.rotate(angle);
    try {
        context.stroke(path);
    }
    catch (e) {
        console.error('It appears the following shape is broken: ' + sides + '.');
    }
    if (fill) context.fill(path);
    context.restore();
}
       
        context.closePath();
        context.stroke();
        if (fill) { context.fill(); }
        context.lineJoin = 'round';
    }
    function drawTrapezoid(context, x, y, length, height, aspect, angle) {
        let h = [];
        h = (aspect > 0) ?
            [ height * aspect, height ] :
            [ height, -height * aspect ];
        let r = [
            Math.atan2(h[0], length),
            Math.atan2(h[1], length)
        ];
        let l = [
            Math.sqrt(length * length + h[0] * h[0]),
            Math.sqrt(length * length + h[1] * h[1])
        ];

        context.beginPath();
            context.lineTo(x + l[0] * Math.cos(angle + r[0]),           y + l[0] * Math.sin(angle + r[0]));
            context.lineTo(x + l[1] * Math.cos(angle + Math.PI - r[1]), y + l[1] * Math.sin(angle + Math.PI - r[1]));
            context.lineTo(x + l[1] * Math.cos(angle + Math.PI + r[1]), y + l[1] * Math.sin(angle + Math.PI + r[1]));
            context.lineTo(x + l[0] * Math.cos(angle - r[0]),           y + l[0] * Math.sin(angle - r[0]));
        context.closePath();
        context.stroke();
        context.fill();
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
    const compensation = /*(() => {
        // Protected functions
        function interpolate(p1, p2, v1, v2, tt) {
            let k = Math.cos((1 + tt) * Math.PI);
            return 0.5 * (((1 + tt) * v1 + p1) * (k + 1) + (-tt * v2 + p2) * (1 - k));
        }
        function extrapolate(p1, p2, v1, v2, tt){
            return p2 + (p2 - p1) * tt; //v2 + 0.5 * tt * (v2 - v1) * ts
        }
        // Useful thing
        function angleDifference(targetA, sourceA) {
            let mod = (a, n) => (a % n + n) % n
            let a = targetA - sourceA;
            return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
        }
        // Constructor
        return (sinceLastUpdate = getRelative() - metrics.lastuplink, updateFreq = metrics.rendergap) => {
            // getNow() - player.time

            // Protected vars
            updateFreq = Math.max(updateFreq, 1000 / config.roomSpeed / 30)
            let frameProgress = sinceLastUpdate / updateFreq
            // Methods
            return {
                predict: (p1, p2, v1, v2) => {
                    if (global.predictionMode === 0) {
                        return p2
                    } else if (global.predictionMode === 2) {
                        return (frameProgress >= 1) ? extrapolate(p1, p2, v1, v2, frameProgress - 1) : interpolate(p1, p2, v1, v2, frameProgress - 1);
                    }
                    return frameProgress >= 1 ? p2 : p1 + (p2 - p1) * frameProgress
                },
                predictExtrapolate: (p1, p2, v1, v2) => {
                    return p1 + (p2 - p1) * frameProgress
                },
                predictFacing: (f1, f2) => {
                    return frameProgress >= 1 ? f2 : f1 + angleDifference(f2, f1) * frameProgress
                },
                getPrediction: () => frameProgress,
            };
        };
    })();/*/
    (() => {
        // Protected functions
        function interpolate(p1, p2, v1, v2, ts, tt) {
            let k = Math.cos((1 + tt) * Math.PI);
            return 0.5 * (((1 + tt) * v1 + p1) * (k + 1) + (-tt * v2 + p2) * (1 - k));
        }
        function extrapolate(p1, p2, v1, v2, ts, tt){
            return p2 + (p2 - p1) * tt; /*v2 + 0.5 * tt * (v2 - v1) * ts*/
        }
        // Useful thing
        function angleDifference(sourceA, targetA) {
            let mod = function(a, n) {
                return (a % n + n) % n;
            };
            let a = targetA - sourceA;
            return mod(a + Math.PI, 2*Math.PI) - Math.PI;
        }
        // Constructor
        return (time = player.time, interval = metrics.rendergap) => {
            // Protected vars
            let timediff = 0, t = 0, tt = 0, ts = 0;
            t = Math.max(getNow() - time - 80, -interval);
            if (t > 150 && t < 1000) { t = 150; }
            if (t > 1000) { t = 1000 * 1000 * Math.sin(t / 1000 - 1) / t + 1000; }
            tt = t / interval;
            ts = config.roomSpeed * 30 * t / 1000;
            // Methods
            return {
                predict: (p1, p2, v1, v2) => {
                    return (t >= 0) ? extrapolate(p1, p2, v1, v2, ts, tt) : interpolate(p1, p2, v1, v2, ts, tt);
                },
                predictExtrapolate: (p1, p2, v1, v2) => {
                    return (t >= 0) ? extrapolate(p1, p2, v1, v2, ts, tt) : interpolate(p1, p2, v1, v2, ts, tt);
                },
                predictFacing: (f1, f2) => {
                    return f1 + (1 + tt) * angleDifference(f1, f2);
                },
                getPrediction: () => { return t; },
            };
        };
    })();//*/
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
                drawGuiRect(x, y, len, height, true); // Border
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
                    'Arraz.io',
                    x + len, textY - 6*14 - 2,
                    15, color.blue, 'right'
                );
             
              text.debug[0].draw(
               // 'Players: ' + Math.floor(Math.random() * Math.floor(Math.random() * 9999) + 1),
                'Players: 2079',
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
                    'Arraz.io',
                    x + len, textY - 3*14 - 2,
                    15, color.blue, 'right'
                );
            }
            text.debug[3].draw(
                'Client Speed: ' + metrics.rendertime + ' FPS',
                x + len, textY - 2*14,
                10, metrics.rendertime > 10 ? color.pink : color.orange, 'right'
            );
            text.debug[2].draw(
                'Server Speed: ' + (100 * gui.fps).toFixed(2) + '%',
                x + len, textY - 1*14,
                10, gui.fps === 1 ? color.green : color.orange, 'right'
            );
            text.debug[1].draw(
                lag.toFixed(1) + ' ms  ' + global.server.code + ' :' + global.server.type + ':',
                x + len, textY,
                10, color.blue, 'right'
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
                    'Leaderboard (tryhards)', Math.round(x + len / 2) + 0.5,
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
                    ctx.fillStyle = getColor(colorIndex + 10);
                    drawGuiRect(x, y, width, height);
                    ctx.globalAlpha = 0.1;
                    ctx.fillStyle = getColor(colorIndex);
                    colorIndex++;
                    drawGuiRect(x, y, width, height*0.6);
                    ctx.fillStyle = color.black;
                    drawGuiRect(x, y+height*0.6, width, height*0.4);
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
                    drawGuiRect(x, y, width, height, true); // Border
                    if (++ticker % 9 === 0 && !global.mobile) {
                        x = xStart;
                        y += height + internalSpacing;
                    } else {
                        x += glide * (width + internalSpacing);
                    }
                });
                // Draw box
                let h = 14, msg = "Don't Upgrade", m = measureText(msg, h-3) + 10;
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
            'lol you died', x, y - 80, 8, color.guiwhite, 'center'
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
        tip: TextObj(),
    };
    let tipSets = [[
      'Tip: You can view and edit your keybinds in the options menu.',
      'Tip: You can play on mobile by just going to arraz-io.glitch.me on your phone!',
    ], [
      'Tip: You can have the shield and health bar be separated by going to the options menu.',
      'Tip: If arraz is having a low frame rate, you can try enabling low graphics in the options menu.',
      'Tip: You can make traps rounded with the classic trap setting in the options menu.',
      'Tip: You can create your own private server with the template in the link on the options menu.',
      'Tip: You can create your own theme with the custom theme makerin the link on the options menu.',
    ], [
      'Teaming in FFA or FFA Maze is frowned upon, but when taken to the extremes, you can be punished.',
      'Witch hunting is when you continuously target someone and follow them. This is frowned upon, but when taken to the extremes, you can be punished.',
      'Multiboxing is when you use a script to control multiple tanks at the same time. This is considered CHEATING and will result in a ban.'
    ], [
      'If you have a throat or mouth, you are at risk of throat cancer.',
      'My name jeff!!!',
      'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK'
    ]]
    let selectedSet = tipSets[Math.floor(Math.random() * tipSets.length)]
    let selectedTip = selectedSet[Math.floor(Math.random() * selectedSet.length)]
    return () => {
        clearScreen(color.white, 0.5);
        text.connecting.draw('Connecting...', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
        text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.lgreen, 'center');
        text.message.draw(selectedTip, global.screenWidth / 2, global.screenHeight / 2 + 75, 15, color.guiwhite, 'center');
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

 let snowAmount = 0
let aeff = 1;
    let cool = 0;
let counter = 0;
let counter2 = 0;
if (snowAmount) {
  let snowCanvas = document.createElement('canvas')
  snowCanvas.style.position = 'absolute'
  snowCanvas.style.top = '0'
  document.body.insertBefore(snowCanvas, document.body.firstChild)
 
  let ctx = snowCanvas.getContext('2d')
  let snow = []
  let updateSnow = () => {
    if (snowCanvas.width !== window.innerWidth) snowCanvas.width = window.innerWidth
    if (snowCanvas.height !== window.innerHeight) snowCanvas.height = window.innerHeight
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height)
    for (let p of snow) {
      p.vel2++
      p.x += p.vel*Math.cos(p.dir)
      p.y += p.vel*Math.sin(p.dir)
      let a = Math.min(1, 1 - (p.y / snowCanvas.height)) * 2
      if (a > 0) {
        ctx.globalAlpha = a
                for(let i = 0; i < 12; i++)
        {
        ctx.beginPath()
        ctx.arc(p.x+(-2+i)*p.vel*Math.cos(p.dir), p.y+(-2+i)*p.vel*Math.sin(p.dir), p.r, 0, 2 * Math.PI)
         if(i == 11) ctx.fillStyle = '#0000FF';
         if(i == 10) ctx.fillStyle = '#0000FF';
          if(i == 9) ctx.fillStyle = '#0000FF';
          if(i == 8) ctx.fillStyle = '#0000FF';
          if(i == 7) ctx.fillStyle = '#0000FF';
          if(i == 6) ctx.fillStyle = '#0000FF';
          if(i == 5) ctx.fillStyle = '#0000FF';
          if(i == 4) ctx.fillStyle = '#0000FF';
          if(i == 3) ctx.fillStyle = '#0000FF';
          if(i == 2) ctx.fillStyle = '#0000FF';
          if(i == 1) ctx.fillStyle = '#0000FF';
          if(i == 0) ctx.fillStyle = '#0000FF';
        ctx.fill()
                  }
      } else if(p.x < 20 || p.x > window.innerWidth+20 || p.y <-25 || a<0 || global.gameStart){
        p.gone = true
        //snow.splice(snow.indexOf(p), 1); 
      }
    }
    if (snowAmount > Math.random()) {
          if(!global.gameStart)
      {
                                    let aeef = -10
                                  let aee = (snowCanvas.width)*(1-2*Math.random())
                                  if(counter % 43) counter2++
            counter++;
      cool+=aeff;
      if(counter % 1440 == 0) aeff *= -1
      if(counter % 1 == 0)
      {
      for(let i = 0; i < 360; i+= 360/1)
      {
      let x = snowCanvas.width/2+aee;
      let r = 5
      let dir = Math.PI/2+10*(1-2*Math.random())*Math.PI/180+30*Math.sin(0.3*counter*Math.PI/180)*Math.PI/180;
        let vel = 5+7*Math.random();
        let color = '#0fa'
      snow.push({ x, y: aeef, r, dir, vel, color})
      }
      }
          
    }
    }
    if (global.gameStart)
      snowCanvas.remove()
    else
      requestAnimationFrame(updateSnow)
  }
  setInterval(() => {
    snow = snow.filter(r => !r.gone)
  }, 2000)
  updateSnow()
}
 let newsnow = 0
let aefff = 1;
    let cooll = 0;
let counter1 = 0;
let counter3 = 0;
if (newsnow) {
  let snowCanvas = document.createElement('canvas')
  snowCanvas.style.position = 'absolute'
  snowCanvas.style.top = '0'
  document.body.insertBefore(snowCanvas, document.body.firstChild)
 
  let ctx = snowCanvas.getContext('2d')
  let snow = []
  let updateSnow = () => {
    if (snowCanvas.width !== window.innerWidth) snowCanvas.width = window.innerWidth
    if (snowCanvas.height !== window.innerHeight) snowCanvas.height = window.innerHeight
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height)
    for (let p of snow) {
      p.vel2++
      p.x += p.vel*Math.cos(p.dir)
      p.y += p.vel*Math.sin(p.dir)
      let a = Math.min(1, 1 - (p.y / snowCanvas.height)) * 2
      if (a > 0) {
        ctx.globalAlpha = a
                for(let i = 0; i < 3; i++)
        {
        ctx.beginPath()
        ctx.arc(p.x+(-2+i)*p.vel*Math.cos(p.dir), p.y+(-2+i)*p.vel*Math.sin(p.dir), p.r, 0, 2 * Math.PI)
      
          if(i == 2) ctx.fillStyle = '#ffffff';
          if(i == 1) ctx.fillStyle = '#c5a8ff';
          if(i == 0) ctx.fillStyle = '#5f0fff';
        ctx.fill()
                  }
      } else if(p.x < 20 || p.x > window.innerWidth+20 || p.y <-25 || a<0 || global.gameStart){
        p.gone = true
        //snow.splice(snow.indexOf(p), 1); 
      }
    }
    if (newsnow > Math.random()) {
          if(!global.gameStart)
      {
                                    let aeeff = -10
                                  let aee = (snowCanvas.width)*(1-2*Math.random())
                                  if(counter1 % 43) counter3++
            counter++;
      cool+=aeff;
      if(counter1 % 1440 == 0) aeff *= -1
      if(counter1 % 1 == 0)
      {
      for(let i = 0; i < 360; i+= 360/1)
      {
      let x = snowCanvas.width/2+aee;
      let r = 5
      let dir = Math.PI/2+10*(1-2*Math.random())*Math.PI/180+30*Math.sin(0.3*counter*Math.PI/180)*Math.PI/180;
        let vel = 5+7*Math.random();
        let color = '#0fa'
      snow.push({ x, y: aeeff, r, dir, vel, color})
      }
      }
          
    }
    }
    if (global.gameStart)
      snowCanvas.remove()
    else
      requestAnimationFrame(updateSnow)
  }
  setInterval(() => {
    snow = snow.filter(r => !r.gone)
  }, 2000)
  updateSnow()
}

