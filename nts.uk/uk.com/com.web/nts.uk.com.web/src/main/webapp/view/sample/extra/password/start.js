__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.password = ko.observable('');
            this.salt = ko.observable('');
            this.hash = ko.observable('');
            this.bulkSource = ko.observable('');
            this.bulkTotalSize = ko.observable(0);
            this.bulkProgress = ko.observable(0);
            this.bulkSource("PASSWORD1,SALT1\r\nPASSWORD2,SALT2\r\nPASSWORD3,SALT3");
        }
        ScreenModel.prototype.generate = function () {
            var _this = this;
            this.hash('');
            nts.uk.request.ajax('/sample/passwordhash/generate', {
                passwordPlainText: this.password(),
                salt: this.salt()
            }).done(function (res) {
                _this.hash(res);
            });
        };
        ScreenModel.prototype.bulkGenerate = function () {
            var _this = this;
            nts.uk.ui.block.grayout();
            var lines = this.bulkSource().replace(/\r\n/g, "\n").split("\n");
            var procs = [];
            var results = [];
            this.bulkTotalSize(lines.length);
            this.bulkProgress(0);
            var defer = $.Deferred().resolve();
            var SIZE = 20;
            for (var i = 0; i < lines.length; i += SIZE) {
                var proc = (function (index, subLines) {
                    return function () {
                        _this.bulkProgress(index);
                        var dfd = $.Deferred();
                        var sources = subLines
                            .map(function (line) { return line.split(","); })
                            .filter(function (parts) { return parts.length >= 2; })
                            .map(function (parts) {
                            return { passwordPlainText: parts[0], salt: parts[1] };
                        });
                        nts.uk.request.ajax('/sample/passwordhash/generatelist', sources).done(function (res) {
                            res.map(function (r) { return r.plainText + "," + r.salt + "," + r.hash; })
                                .forEach(function (r) {
                                results.push(r);
                            });
                            dfd.resolve();
                        });
                        return dfd.promise();
                    };
                })(i, lines.slice(i, i + SIZE));
                defer = defer.then(proc);
            }
            defer.done(function () {
                _this.bulkProgress(lines.length);
                var resultString = results.join("\r\n");
                _this.bulkSource(resultString);
                nts.uk.ui.block.clear();
            }).fail(function (error) { return alert(error); });
            //            let sources = this.bulkSource().split("\r\n").map(line => {
            //                let parts = line.split(",");
            //                return {
            //                    passwordPlainText: parts[0],
            //                    salt: parts[1]
            //                };
            //            });
            //        
            //            nts.uk.request.ajax('/sample/passwordhash/generatelist', sources).done(res => {
            //                let resultString = res.map(r => {
            //                    return r.plainText + "," + r.salt + "," + r.hash;
            //                }).join("\r\n");
            //                this.bulkSource(resultString);
            //                
            //                nts.uk.ui.block.clear();
            //            });
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map