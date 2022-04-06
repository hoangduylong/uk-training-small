const hljs = require('highlight.js'),
    MarkdownIt = require('markdown-it');

var parser = new MarkdownIt({
    html: true,
    highlight: function (str, lang) {
        return lang && hljs.getLanguage(lang) ? hljs.highlight(lang, str, true).value : '';
    }
});

module.exports = function (source) {
    this.cacheable();

    return parser.render(source);
};