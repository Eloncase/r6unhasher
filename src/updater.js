const fetch = require('node-fetch');
const log = require('log4js').getLogger("updater");

const consts = require('./consts');
const store = require('./store');

const jsRegex = /<script src="assets\/scripts\/([a-z]+?)\.([a-z0-9]+?)\.js"><\/script>/g;
const unlocalizedJsonRegex = /assets\/([a-z]+?)\/([a-z]+?)\.([a-z0-9]+?)\.json/g;
const localizedJsonRegex = /assets\/([a-z]+?)\/([a-z]+?)\.([a-z\-]+?)\.([a-z0-9]+?)\.json/g;

const updatePeriod = 1000 * 60 * 60; // 1 hour

async function getAsText(url) {
    var resp = await fetch(url);
    return await resp.text();
}

async function findScripts() {
    var scripts = [];

    try {
        log.info("Getting html");
        var html = await getAsText(consts.baseUrl);

        do {
            var match = jsRegex.exec(html);
            if (!match) break;
            
            log.debug(`Found ${match}`)
            scripts.push({ name: match[1], hash: match[2] });
        } while(match)
    } catch (e) {
        log.error(`Error while trying to find scripts: ${e.message}`)
    }

    return scripts;
}

async function parseScripts(scripts) {
    var unloc = {};
    var loc = {};

    try {
        for (var i in scripts) {
            var scriptUrl = `${consts.baseUrl}assets/scripts/${scripts[i].name}.${scripts[i].hash}.js`;
            log.info(`Getting script from ${scriptUrl}`);
            var js = await getAsText(scriptUrl);

            do {
                var match = unlocalizedJsonRegex.exec(js);
                if (!match) break;
                
                log.debug(`Found ${match}`)
                if (!unloc[match[1]]) unloc[match[1]] = {};
                if (!unloc[match[1]][match[2]]) unloc[match[1]][match[2]] = {
                    hash: match[3],
                    url: consts.baseUrl + match[0]
                };
            } while(match)

            do {
                var match = localizedJsonRegex.exec(js);
                if (!match) break;

                log.debug(`Found ${match}`)
                if (!loc[match[1]]) loc[match[1]] = {};
                if (!loc[match[1]][match[2]]) loc[match[1]][match[2]] = {};
                if (!loc[match[1]][match[2]][match[3]]) loc[match[1]][match[2]][match[3]] = {
                    hash: match[4],
                    url: consts.baseUrl + match[0]
                };
            } while(match)
        }
    } catch (e) {
        log.error(`Error while trying to parse scripts: ${e.message}`)
        return null;
    }

    return { unlocalized: unloc, localized: loc };
}

async function update() {
    log.info("Clearing timeout");
    clearTimeout(t);
    var scripts = await findScripts();
    if (scripts.length < 2) {
        log.warn(`Found ${scripts.length} scripts, skipping parse`);
    } else {
        var res = await parseScripts(scripts);
        if (res) {
            log.info("Updating store");
            log.debug(JSON.stringify(res));
            store.update(res);
        }
    }

    log.info("Setting timeout");
    setTimeout(update, updatePeriod);
}

var t;

module.exports = update;