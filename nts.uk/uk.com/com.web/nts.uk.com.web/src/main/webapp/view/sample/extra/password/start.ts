__viewContext.ready(function () {
    class ScreenModel {
        
        password: KnockoutObservable<string>;
        salt: KnockoutObservable<string>;
        hash: KnockoutObservable<string>;
        bulkSource: KnockoutObservable<string>;
        bulkTotalSize: KnockoutObservable<number>;
        bulkProgress: KnockoutObservable<number>;

        constructor() {
            this.password = ko.observable('');
            this.salt = ko.observable('');
            this.hash = ko.observable('');
            this.bulkSource = ko.observable('');
            this.bulkTotalSize = ko.observable(0);
            this.bulkProgress = ko.observable(0);
            
            this.bulkSource("PASSWORD1,SALT1\r\nPASSWORD2,SALT2\r\nPASSWORD3,SALT3");
        }
        
        generate() {
            this.hash('');
            nts.uk.request.ajax('/sample/passwordhash/generate', {
                passwordPlainText: this.password(),
                salt: this.salt()
            }).done(res => {
                this.hash(res);
            });
        }
        
        bulkGenerate() {
            nts.uk.ui.block.grayout();
            
            let lines = this.bulkSource().replace(/\r\n/g, "\n").split("\n");
            let procs = [];
            let results = [];
            
            this.bulkTotalSize(lines.length);
            this.bulkProgress(0);
            
            let defer: any = $.Deferred().resolve();
            
            let SIZE = 20;
            for (let i = 0; i < lines.length; i += SIZE) {
                let proc = ((index, subLines) => {
                    
                    return () => {                            
                        this.bulkProgress(index);
                        
                        let dfd = $.Deferred();
                        
                        let sources = subLines
                            .map(line => line.split(","))
                            .filter(parts => parts.length >= 2)
                            .map(parts => {
                                return { passwordPlainText: parts[0], salt: parts[1] };
                            });
                        
                        nts.uk.request.ajax('/sample/passwordhash/generatelist', sources).done(res => {
                            res.map(r => r.plainText + "," + r.salt + "," + r.hash)
                                .forEach(r => {
                                    results.push(r);
                                });
                            
                            dfd.resolve();
                        });
                        
                        return dfd.promise();
                    };
                })(i, lines.slice(i, i + SIZE));
                
                defer = defer.then(proc);
            }
            
            defer.done(() => {
                this.bulkProgress(lines.length);
                
                let resultString = results.join("\r\n");
                this.bulkSource(resultString);
                
                nts.uk.ui.block.clear();
            }).fail(error => alert(error));
            
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
        }
    }
    
    this.bind(new ScreenModel());
    
});