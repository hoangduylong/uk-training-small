module.exports = function (css) {
    return css
    .replace(/\r?\n/g, '')
    .replace(/\s+/, ' ')
    .replace(/\s*{\s*/, '{')
    .replace(/\s*}\s*/, '}');
}