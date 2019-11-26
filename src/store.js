var scripts = {};
var merged = {};

function update(obj) {
    scripts = obj;
    merged = Object.assign({}, obj.localized, obj.unlocalized);
}

function get(merge = false) {
    return Object.assign({}, merge ? merged : scripts);
}

module.exports = {
    update: update,
    get: get
}