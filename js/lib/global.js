/*jslint esversion: 6*/
/*global require, module, exports, console*/
/*jshint -W097*/
const n = {
    openshift: (id, container) => `n-${ id }-${ container }.7e14.starter-us-west-2.openshiftapps.com`,
    glitch: id => `arras-io-${ id }.glitch.me`,
    heroku: id => `arras-${ id }.herokuapp.com`,
    wedeploy: (id, container) => `${ id }-moxncet.wedeploy.io`,
    arras: (id, port = 5000) => `ip-${ id }.arras.io:${ port }`
}

let dayOfMonth = new Date().getDate()

const H = dayOfMonth >= 25 ? 3 : 0
const G = dayOfMonth >= 25 ? 0 : 3

const global = {
    help: {
        /* KEY_CHOOSE_1: 'Y',
         KEY_CHOOSE_2: 'U',
         KEY_CHOOSE_3: 'I',
         KEY_CHOOSE_4: 'H',
         KEY_CHOOSE_5: 'J',
         KEY_CHOOSE_6: 'K',*/

    },
    // Main Customizable Keys
    KEY_AUTO_FIRE: 69,
    KEY_AUTO_SPIN: 67,
    KEY_OVER_RIDE: 82,
    KEY_LEVEL_UP: 78,
    //KEY_REVERSE_TANK: 86,
    //KEY_REVERSE_MOUSE: 66,
    KEY_SCREENSHOT: 81,
    KEY_UPGRADE_MAX: 77,
    KEY_CLASS_TREE: 220,
    // More Customizable Keys
    KEY_RECORD: 90,
    KEY_UP: 87,
    KEY_PING: 76,
    KEY_LEFT: 65,
    KEY_DOWN: 83,
    KEY_RIGHT: 68,
    /*KEY_CHOOSE_1: 89,
    KEY_CHOOSE_2: 85,
    KEY_CHOOSE_3: 73,
    KEY_CHOOSE_4: 72,
    KEY_CHOOSE_5: 74,
    KEY_CHOOSE_6: 75,
    KEY_CHOOSE_7: -1,
    KEY_CHOOSE_8: -1,
    KEY_CHOOSE_9: -1,*/
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
    KEY_FUCK_YOU: 222,
    KEY_BASIC: 221,
    KEY_CLOSE: 190,
    KEY_GOD: 186,
    KEY_TP: 84,
    KEY_RANDOM_BOSSES: 191,
    KEY_KILL_YOURSELF: 79,
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
    showTree: false,
    // =======================
    // Chat System.
    // =======================
    isChatMode: false,
    // =======================

    server: null,
    codeTable: [{
        z: 'Private',
        local: 'Local',
        dvi: 'DVI',
        glitch: 'Glitch',
        os: 'OpenShift',
        heroku: 'Heroku',
        linode: 'Linode',
        vultr: 'Vultr',
        buyvm: 'BuyVM',
        hetzner: 'Hetzner',
        ovh: 'OVH',
        c9: 'Cloud 9',
    }, {
        unknown: ['Unknown', null],
        local: ['Local', null],
        virginia: ['US East', -4],
        kkkkkk: ['In our galaxy', -4],
        ocean: ['In the ocean', -4],
        oregon: ['US West', -7],
        frankfurt: ['Europe', 2],
        sv: ['US West', -7],
        la: ['US West', -7],
        germany: ['Europe', 2],
        london: ['Europe', 1],
        singapore: ['Asia', 8],
        ct: ['US East', -4],
        us: ['US', -4],
        gbl: ['Global', -8],
    }],
    timezone: new Date().getTimezoneOffset() / -60,
    servers: [
            // Other
            {
                id: 'z',
                type: '0unk',
                name: 'Private Server',
                code: 'z-unknown',
                at: 'private',
                untrusted: true
            },
            {
                visible: 1,
                id: 'q',
                type: '0unk',
                name: 'Official Private Server',
                code: 'z-virginia',
                at: 'arraz-template.glitch.me',
                untrusted: true
            },
            {
                visible: 0,
                id: 'va',
                type: '0unk',
                name: 'Maze FFA',
                code: 'glitch-virginia',
                at: 'arrax-maze.glitch.me',
                secure: 1,
                prefer: true
            },
            {
                visible: 0,
                id: 'wa',
                type: '0unk',
                code: 'glitch-virginia',
                at: 'arras2.herokuapp.com',
                secure: 1,
                prefer: false
            },
            {
                visible: 0,
                id: 'ba',
                type: '0unk',
                code: 'glitch-virginia',
                at: 'arrax-mot2.glitch.me',
                secure: 1,
                prefer: false
            }

        ]

        .map((data, i) => ({
            data,
            i
        }))
        .sort((a, b) => a.data.type < b.data.type ? -1 : b.data.type > a.data.type ? 1 : a.i - b.i)
        .map(({
            data
        }) => data),
    partyLink: 0,
    mobile: /android|mobi/i.test(navigator.userAgent),
    showInvisible: false,
}

window['Arras'] = (data = true) => data || global
export {
    global as global
};
