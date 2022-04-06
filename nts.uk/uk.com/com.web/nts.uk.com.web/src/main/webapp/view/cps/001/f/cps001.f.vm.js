var cps001;
(function (cps001) {
    var f;
    (function (f) {
        var vm;
        (function (vm) {
            var alert = nts.uk.ui.dialog.alert;
            var close = nts.uk.ui.windows.close;
            var getShared = nts.uk.ui.windows.getShared;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.items = [];
                    this.comboColumns = [{ prop: 'name', length: 12 }];
                    var self = this, dto = getShared('CPS001F_PARAMS') || {};
                    self.fileId = ko.observable("");
                    self.filename = ko.observable("");
                    self.fileInfo = ko.observable(null);
                    self.accept = ko.observableArray([]);
                    self.textId = ko.observable("CPS001_71");
                    self.asLink = ko.observable(true);
                    self.enable = ko.observable(true);
                    self.allowDowloadFile = ko.observable(true);
                    self.fileSize = ko.observable("");
                    self.stereoType = ko.observable("documentfile");
                    self.uploadFinished = function (fileInfo) {
                        console.log("change");
                        console.log(fileInfo);
                        self.pushData(fileInfo);
                    };
                    self.onfilenameclick = function (fileId) {
                        alert(fileId);
                    };
                    f.service.getCurrentEmpPermision().done(function (data) {
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].functionNo == FunctionNo.No6_Allow_UploadDoc) {
                                    if (data[i].available == false) {
                                        self.allowDowloadFile(false);
                                    }
                                }
                            }
                        }
                    });
                }
                ViewModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred();
                    self.items = [];
                    var dataShare = getShared('CPS001F_PARAMS') || null;
                    var dfdGetData = f.service.getData(dataShare.pid);
                    block();
                    $.when(dfdGetData).done(function (datafile) {
                        var totalSize = 0;
                        _.forEach(datafile, function (item) {
                            totalSize = totalSize + item.originalSize;
                            self.items.push(new GridItem(item));
                        });
                        var sum = (totalSize / 1024).toFixed(2);
                        self.fileSize(nts.uk.resource.getText("CPS001_85", [sum]));
                        unblock();
                        dfd.resolve();
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.pushData = function (fileInfo) {
                    var self = this, dataShare = getShared('CPS001F_PARAMS') || null;
                    if (dataShare.pid != null) {
                        var dfdGetData = f.service.getData(dataShare.pid);
                        block();
                        var fileSize = ((fileInfo.originalSize) / 1024).toFixed(2);
                        self.fileSize(nts.uk.resource.getText("CPS001_85", [fileSize]));
                        //self.filename(fileInfo.originalName + Math.random());
                        $("#file-upload").ntsFileUpload("clear");
                        // save file to domain EmployeeFileManagement
                        var dfd = $.Deferred();
                        f.service.savedata({
                            pid: dataShare.pid,
                            sid: dataShare.sid,
                            fileid: fileInfo.id,
                            personInfoCtgId: "",
                            uploadOrder: 1,
                            itemName: nts.uk.resource.getText("CPS001_151"),
                            fileName: fileInfo.originalName,
                            categoryName: nts.uk.resource.getText("CPS001_152")
                        }).done(function () {
                            __viewContext['viewModel'].start().done(function () {
                                init();
                                $('.filenamelabel').hide();
                                setTimeout(function () {
                                    $('.browser-button').focus();
                                    $('.browser-button').attr("tabindex", 2);
                                    $(".link-button").attr("tabindex", 2);
                                    $(".delete-button").attr("tabindex", 2);
                                }, 500);
                                unblock();
                                dfd.resolve();
                            });
                        });
                        return dfd.promise();
                    }
                };
                ViewModel.prototype.checkSize = function () {
                    var self = this;
                    nts.uk.request.ajax("/shr/infra/file/storage/infor/" + self.fileId()).done(function (res) {
                        self.fileInfo(res);
                    });
                };
                ViewModel.prototype.deleteItem = function (rowItem) {
                    var self = this, dataShare = getShared('CPS001F_PARAMS') || null;
                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                        nts.uk.request.ajax("/shr/infra/file/storage/infor/" + rowItem.fileId)
                            .done(function (res) {
                            self.fileInfo(res);
                            block();
                            var command = {
                                sid: dataShare.sid,
                                fileid: rowItem.fileId,
                                itemName: nts.uk.resource.getText("CPS001_151"),
                                fileName: self.fileInfo() == null ? "File does not exist on server" : self.fileInfo().originalName,
                                categoryName: nts.uk.resource.getText("CPS001_152")
                            };
                            f.service.deletedata(command).done(function () {
                                self.restart();
                                unblock();
                            }).fail(function (mes) {
                                unblock();
                            });
                        })
                            .fail(function (res) {
                            console.log(res);
                        });
                    }).ifNo(function () {
                        unblock();
                    });
                };
                ViewModel.prototype.updateCtgItem = function (rowItem, comboBoxIdNew) {
                    var self = this;
                    if (rowItem.personInfoCategoryId != comboBoxIdNew) {
                        f.service.updateCtgdata({ fileId: rowItem.fileId, personInfoCategoryIdNew: comboBoxIdNew }).done(function () {
                            self.restart();
                        });
                    }
                };
                ViewModel.prototype.restart = function () {
                    var self = this;
                    __viewContext['viewModel'].start().done(function () {
                        init();
                        self.filename("");
                        $('.browser-button').focus();
                    });
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var GridItem = /** @class */ (function () {
                function GridItem(param) {
                    this.id = nts.uk.util.randomId();
                    this.fileName = param.fileName;
                    this.fileId = param.fileId;
                    this.employeeId = param.employeeId;
                    this.categoryName = param.categoryName;
                    this.personInfoCategoryId = param.personInfoCategoryId;
                    this.open = param.fileId;
                    this.uploadOrder = param.uploadOrder;
                    this.combo = param.personInfoCategoryId;
                }
                return GridItem;
            }());
            var EmpFileMana = /** @class */ (function () {
                function EmpFileMana(param) {
                    this.employeeId = param.employeeId;
                    this.fileId = param.fileId;
                    this.categoryName = param.categoryName;
                    this.personInfoCategoryId = param.personInfoCategoryId;
                    this.uploadOrder = param.uploadOrder;
                }
                return EmpFileMana;
            }());
            var PersonCtg = /** @class */ (function () {
                function PersonCtg(param) {
                    this.name = param.categoryName;
                    this.id = param.id;
                }
                return PersonCtg;
            }());
        })(vm = f.vm || (f.vm = {}));
    })(f = cps001.f || (cps001.f = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.f.vm.js.map