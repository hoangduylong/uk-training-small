var cps001;
(function (cps001) {
    var d;
    (function (d) {
        var vm;
        (function (vm) {
            var alertError = nts.uk.ui.dialog.alertError;
            var confirm = nts.uk.ui.dialog.confirm;
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var permision = d.service.getCurrentEmpPermision;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.empFileMn = ko.observable({});
                    this.oldEmpFileMn = {};
                    this.isChange = ko.observable(false);
                    this.enaBtnSave = ko.observable(true);
                    this.isInit = true;
                    var self = this;
                }
                ViewModel.prototype.start = function () {
                    var self = this, params = getShared("CPS001D_PARAMS");
                    $('input[type=checkbox]').prop('checked', false);
                    $(".comfirm-checkbox").hide();
                    self.empFileMn().employeeId = params.employeeId;
                    //get employee file management domain by employeeId
                    block();
                    d.service.getFullAvatar(self.empFileMn().employeeId).done(function (data) {
                        if (data.fileId != null) {
                            self.fileIdOld = data.fileId;
                            nts.uk.request.ajax("/shr/infra/file/storage/infor/" + data.fileId).done(function (res) {
                                self.fileNameOld = res.originalName;
                            });
                            self.empFileMn().fileId = data.fileId;
                            self.empFileMn().fileType = 0;
                            if (self.empFileMn().fileId != "" && self.empFileMn().fileId != undefined)
                                self.getImage();
                            else
                                self.isChange(true);
                            self.oldEmpFileMn = { employeeId: self.empFileMn().employeeId, fileId: self.empFileMn().fileId, fileType: self.empFileMn().fileType };
                        }
                        else {
                            unblock();
                            self.isChange(true);
                            $(".checkbox-holder").hide();
                        }
                        $("#test").bind("imgloaded", function (evt, query) {
                            // update height 
                            var currentDialog = nts.uk.ui.windows.getSelf();
                            //currentDialog.setHeight(840);
                            $(".checkbox-holder").show();
                            $('input[type=checkbox]').prop('checked', true);
                            if (!self.isInit) {
                                self.isChange(true);
                                unblock();
                                return;
                            }
                            self.isInit = false;
                            unblock();
                            $('.upload-btn').focus();
                        });
                        $('.upload-btn').focus();
                    }).fail(function (mes) {
                        unblock();
                    });
                    permision().done(function (data) {
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].functionNo == FunctionNo.No2_Allow_UploadAva) {
                                    if (data[i].available == false) {
                                        self.enaBtnSave(false);
                                        $(".upload-btn").attr('disabled', 'disabled');
                                        $('input[type=checkbox]').prop('disabled', true);
                                        $('.upload-btn').focus();
                                    }
                                }
                            }
                        }
                        $('.upload-btn').focus();
                    });
                    $('.upload-btn').focus();
                };
                ViewModel.prototype.upload = function () {
                    var self = this;
                    nts.uk.ui.block.grayout();
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    var isImageLoaded = $("#test").ntsImageEditor("getImgStatus");
                    if (isImageLoaded.imgOnView) {
                        if ($("#test").data("cropper") == undefined) {
                            self.close();
                            return;
                        }
                        if ($("#test").data("cropper").cropped)
                            self.isChange(true);
                        if (self.isChange()) {
                            $("#test").ntsImageEditor("upload", { stereoType: "avatarfile" }).done(function (data1) {
                                self.empFileMn().fileId = data1.id;
                                $("#test").ntsImageEditor("uploadOriginal", { stereoType: "avatarfile" }).done(function (data2) {
                                    debugger;
                                    var emp = {
                                        employeeId: self.empFileMn().employeeId,
                                        fileId: data1.id,
                                        fileType: 0,
                                        fileName: data2.originalName,
                                        fileIdnew: data2.id, isAvatar: true,
                                        categoryName: nts.uk.resource.getText("CPS001_152"),
                                        itemName: nts.uk.resource.getText("CPS001_150"),
                                        fileIdOld: self.fileIdOld,
                                        fileNameOld: self.fileNameOld
                                    };
                                    self.updateImage(emp);
                                });
                            });
                        }
                        else
                            self.close();
                    }
                    else {
                        alertError({ messageId: "Msg_617" });
                        nts.uk.ui.block.clear();
                    }
                };
                ViewModel.prototype.updateImage = function (emp) {
                    var self = this;
                    d.service.checkEmpFileMnExist(emp.employeeId).done(function (isExist) {
                        if (isExist) {
                            confirm({ messageId: "Msg_386", messageParams: [nts.uk.resource.getText("CPS001_68")] }).ifYes(function () {
                                //insert employee file management
                                block();
                                d.service.removeAvaOrMap(emp).done(function () {
                                    d.service.updateAvaOrMap(emp).done(function () {
                                        setShared("CPS001D_VALUES", ko.unwrap(self.empFileMn));
                                        unblock();
                                        self.close();
                                    }).always(function () { nts.uk.ui.block.clear(); });
                                }).fail(function (mes) {
                                    unblock();
                                });
                            }).ifNo(function () {
                                nts.uk.ui.block.clear();
                            });
                        }
                        else {
                            //insert employee file management
                            block();
                            d.service.insertAvaOrMap(emp).done(function () {
                                setShared("CPS001D_VALUES", ko.unwrap(self.empFileMn));
                                unblock();
                                self.close();
                            }).fail(function (mes) {
                                unblock();
                            }).always(function () {
                                nts.uk.ui.block.clear();
                            });
                        }
                    });
                };
                ViewModel.prototype.getImage = function () {
                    var self = this;
                    var id = self.empFileMn().fileId;
                    var sid = self.empFileMn().employeeId;
                    try {
                        $("#test").ntsImageEditor("selectByFileId", { fileId: id, actionOnClose: function () {
                                unblock();
                                self.isChange(true);
                                $(".checkbox-holder").hide();
                                $('.upload-btn').focus();
                            } });
                    }
                    catch (Error) {
                        self.isChange(true);
                        $('.upload-btn').focus();
                    }
                };
                ViewModel.prototype.close = function () {
                    nts.uk.ui.block.clear();
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var FunctionNo;
            (function (FunctionNo) {
                FunctionNo[FunctionNo["No1_Allow_DelEmp"] = 1] = "No1_Allow_DelEmp";
                FunctionNo[FunctionNo["No2_Allow_UploadAva"] = 2] = "No2_Allow_UploadAva";
                FunctionNo[FunctionNo["No3_Allow_RefAva"] = 3] = "No3_Allow_RefAva";
                FunctionNo[FunctionNo["No4_Allow_UploadMap"] = 4] = "No4_Allow_UploadMap";
                FunctionNo[FunctionNo["No5_Allow_RefMap"] = 5] = "No5_Allow_RefMap";
                FunctionNo[FunctionNo["No6_Allow_UploadDoc"] = 6] = "No6_Allow_UploadDoc";
                FunctionNo[FunctionNo["No7_Allow_RefDoc"] = 7] = "No7_Allow_RefDoc";
                FunctionNo[FunctionNo["No8_Allow_Print"] = 8] = "No8_Allow_Print";
                FunctionNo[FunctionNo["No9_Allow_SetCoppy"] = 9] = "No9_Allow_SetCoppy";
                FunctionNo[FunctionNo["No10_Allow_SetInit"] = 10] = "No10_Allow_SetInit";
                FunctionNo[FunctionNo["No11_Allow_SwitchWpl"] = 11] = "No11_Allow_SwitchWpl"; // Lọc chọn lựa phòng ban trực thuộc/workplace trực tiếp theo bộ phận liên kết cấp dưới tại đăng ký thông tin cá nhân
            })(FunctionNo || (FunctionNo = {}));
        })(vm = d.vm || (d.vm = {}));
    })(d = cps001.d || (cps001.d = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.d.vm.js.map