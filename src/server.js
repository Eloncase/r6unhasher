const http = require('http');
const url = require('url');
const log = require('log4js').getLogger("http");

const store = require('./store');
const consts = require('./consts');

function sendCode(res, code) {
    res.writeHead(code);
    res.end();
}

function sendJson(res, json) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(json);
    res.end();
}

function sendRedirect(res, url) {
    res.writeHead(302, {"Location": url});
    res.end();
}

function tryRedirect(res, group, endpoint, locale) {
    log.debug(`Trying redirect (${group} ${endpoint} ${locale})`);

    var obj = locale ? store.get().localized : store.get().unlocalized;

    if (obj && obj[group] && obj[group][endpoint]) {
        if (locale) {
            sendRedirect(res, (obj[group][endpoint][locale] || obj[group][endpoint]["en-us"]).url);
        } else {
            sendRedirect(res, obj[group][endpoint].url);
        }
        return;
    }

    log.debug(`Couldn't redirect: (${group} ${endpoint} ${locale}), sending 404`);
    sendCode(res, 404);
}

function handleRequest(req, res) {
    try {
        var urlInfo = url.parse(req.url, true);
        var path = urlInfo.pathname.toLowerCase().substring(1);

        log.debug(`Handling path: ${path}`);

        if (path == "" || path == "hash") {
            log.debug(`Sending JSON`);
            sendJson(res, JSON.stringify(store.get(urlInfo.query.merged)));
            return;
        }

        if (path.startsWith("assets/")) {
            var [ group, endpoint, locale ] = path.substring("assets/".length).split("/");
            tryRedirect(res, group, endpoint, locale);
            return;
        }

        if (consts.jsonFiles[path]) {
            var json = consts.jsonFiles[path];
            tryRedirect(res, json.path, path, json.localizible ? urlInfo.query.l || "en-us" : null);
            return;
        }

        log.debug(`Couldn't handle: ${path}, sending 404`);
        sendCode(res, 404);
    } catch (e) {
        log.error(`Error handling ${req.url}: ${e.message}`)
        sendCode(res, 500);
    }
}

function getIp(req) {
    return req.headers["x-forwarded-for"] ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;
}

function logRequest(req) {
    log.info(`${req.method} ${req.url} request from ${getIp(req)}`);
}

function logResponse(req, res) {
    log.info(`${req.method} ${req.url} request from ${getIp(req)} - StatusCode ${res.statusCode}`);
}

function mainHandler(req, res) {
    logRequest(req);
    handleRequest(req, res);
    logResponse(req, res);
}

function startServer() {
    var server = http.createServer(mainHandler);

    var port = process.argv[2] || 9850;
    log.info(`Server is listening on ${port}`)
    server.listen(port);
}

module.exports = startServer;