let localStorage = window.localStorage || {}
const exports = {};
exports.submitToLocalStorage = name => {
    localStorage[name + 'Value'] = document.getElementById(name).value || ''
    localStorage[name + 'Checked'] = document.getElementById(name).checked || 'false'
    return false
}
exports.retrieveFromLocalStorage = name => {
    document.getElementById(name).value = localStorage[name + 'Value'] || ''
    document.getElementById(name).checked = localStorage[name + 'Checked'] === 'true'
    return false
}
exports.handleLargeNumber = (a, cullZeroes = false) => {
    if (cullZeroes && a <= 0)
        return '';

    if (a < 1e3)
        return a.toFixed(0) + '';

    if (a < 1e6)
        return (a / 1e3).toFixed(2) + 'k';

    if (a < 1e9)
        return (a / 1e6).toFixed(2) + 'm';

    if (a < 1e12)
        return (a / 1e9).toFixed(2) + 'b';

    if (a < 1e15)
        return (a / 1e12).toFixed(2) + 't';

    if (a < 1e18)
        return (a / 1e15).toFixed(2) + 'q';

    return '\u221E'
};
exports.timeForHumans = x => {
    // ought to be in seconds
    let seconds = x % 60;
    x /= 60; x = Math.floor(x);
    let minutes = x % 60;
    x /= 60; x = Math.floor(x);
    let hours = x % 24;
    x /= 24; x = Math.floor(x);
    let days = x;
    let y = '';
    function weh(z, text) {
        if (z) { y = y + ((y === '') ? '' : ', ') + z + ' ' + text + ((z > 1) ? 's' : ''); }
    }
    if (days > 300)
        return 'FOREVER'
    weh(days, 'day');
    weh(hours, 'hour');
    weh(minutes, 'minute');
    weh(seconds, 'second');
    if (y === '') { y = 'less than a second'; }
    return y;
};
exports.addArticle = string => {
    return /^\s*[aeiouAEIOU]/.test(string) ? 'an ' + string : 'a ' + string;
};
exports.formatLargeNumber = x => {
    if (x < 1e18)
        return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return '\u221E'
};
exports.pullJSON = url => {
    if (window.fetch)
        return fetch(url, { cache: 'no-cache' }).then(r => r.json())
    let request = new XMLHttpRequest();
    // Set up the request
    console.log("Loading JSON from " + url);
    request.responseType = 'json';
    // Return a promise
    return new Promise((resolve, reject) => {
        request.open('GET', url);
        request.onload = () => { resolve(request.response); console.log('JSON load complete.'); };
        request.onerror = () => { reject(request.statusText); console.log('JSON load failed.'); console.log(request.statusText); };
        request.send();
    });
};
export { exports as util };
