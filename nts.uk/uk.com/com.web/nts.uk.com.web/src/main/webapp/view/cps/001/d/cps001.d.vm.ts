module cps001.d.vm {
    import text = nts.uk.resource.getText;
    import alert = nts.uk.ui.dialog.alert;
    import alertError = nts.uk.ui.dialog.alertError;
    import confirm = nts.uk.ui.dialog.confirm;
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import permision = service.getCurrentEmpPermision;

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];

    export class ViewModel {
        empFileMn: KnockoutObservable<IEmpFileMn> = ko.observable(<IEmpFileMn>{});
        oldEmpFileMn = {};
        isChange: KnockoutObservable<boolean> = ko.observable(false);
        enaBtnSave: KnockoutObservable<boolean> = ko.observable(true);
        isInit = true;
        fileIdOld : string;
        fileNameOld: string;

        constructor() {
            let self = this;
        }
        start() {
            let self = this,
                params: IEmpFileMn = getShared("CPS001D_PARAMS");
            $('input[type=checkbox]').prop('checked', false);
            $(".comfirm-checkbox").hide();

            self.empFileMn().employeeId = params.employeeId;
            //get employee file management domain by employeeId
            block();
            service.getFullAvatar(self.empFileMn().employeeId).done(function(data) {
                if (data.fileId != null) {
                    self.fileIdOld = data.fileId;
                    nts.uk.request.ajax("/shr/infra/file/storage/infor/" + data.fileId).done(function(res) {
                        self.fileNameOld = res.originalName;
                    });
                    self.empFileMn().fileId = data.fileId;
                    self.empFileMn().fileType = 0;
                    if (self.empFileMn().fileId != "" && self.empFileMn().fileId != undefined)
                        self.getImage();
                    else self.isChange(true);
                    self.oldEmpFileMn = { employeeId: self.empFileMn().employeeId, fileId: self.empFileMn().fileId, fileType: self.empFileMn().fileType };
                } else {
                    unblock();
                    self.isChange(true);
                    $(".checkbox-holder").hide();
                }
                $("#test").bind("imgloaded", function(evt, query?: SrcChangeQuery) {
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
            }).fail((mes) => {
                unblock();
            });

            permision().done((data: Array<IPersonAuth>) => {
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
        }

        upload() {
            let self = this;
            nts.uk.ui.block.grayout();

            if (nts.uk.ui.errors.hasError()) {
                return;
            }

            let isImageLoaded = $("#test").ntsImageEditor("getImgStatus");

            if (isImageLoaded.imgOnView) {

                if ($("#test").data("cropper") == undefined) {
                    self.close();
                    return;
                }
                if ($("#test").data("cropper").cropped)
                    self.isChange(true);

                if (self.isChange()) {
                    $("#test").ntsImageEditor("upload", { stereoType: "avatarfile" }).done(function(data1) {

                        self.empFileMn().fileId = data1.id;

                        $("#test").ntsImageEditor("uploadOriginal", { stereoType: "avatarfile" }).done(function(data2) {
                        debugger;
                            let emp = {
                            employeeId: self.empFileMn().employeeId, 
                            fileId: data1.id,
                            fileType: 0,
                            fileName : data2.originalName, 
                            fileIdnew: data2.id, isAvatar: true , 
                            categoryName : nts.uk.resource.getText("CPS001_152"), 
                            itemName : nts.uk.resource.getText("CPS001_150"), 
                            fileIdOld:self.fileIdOld , 
                            fileNameOld : self.fileNameOld};
                            self.updateImage(emp);
                        });

                    });
                } else self.close();
            } else {
                alertError({ messageId: "Msg_617" });
                nts.uk.ui.block.clear();
            }
        }

        updateImage(emp) {
            let self = this;
            service.checkEmpFileMnExist(emp.employeeId).done(function(isExist) {
                if (isExist) {
                    confirm({ messageId: "Msg_386", messageParams: [nts.uk.resource.getText("CPS001_68")] }).ifYes(() => {
                        //insert employee file management
                        block();
                        service.removeAvaOrMap(emp).done(function() {
                            service.updateAvaOrMap(emp).done(function() {
                                setShared("CPS001D_VALUES", ko.unwrap(self.empFileMn));
                                unblock();
                                self.close();
                            }).always(function() { nts.uk.ui.block.clear(); });
                        }).fail((mes) => {
                            unblock();
                        });
                    }).ifNo(() => {
                        nts.uk.ui.block.clear();
                    });

                } else {
                    //insert employee file management
                    block();
                    service.insertAvaOrMap(emp).done(function() {
                        setShared("CPS001D_VALUES", ko.unwrap(self.empFileMn));
                        unblock();
                        self.close();
                    }).fail((mes) => {
                        unblock();
                    }).always(function() {
                        nts.uk.ui.block.clear();
                    });
                }
            });
        }

        getImage() {
            let self = this;
            let id = self.empFileMn().fileId;
            let sid = self.empFileMn().employeeId; 
            try {
                 $("#test").ntsImageEditor("selectByFileId", {fileId: id, actionOnClose: function(){
                    unblock();
                    self.isChange(true);
                    $(".checkbox-holder").hide();
                    $('.upload-btn').focus();
                     
                }});
            } catch (Error) {
                self.isChange(true);
                $('.upload-btn').focus();
            }
        }

        close() {
            nts.uk.ui.block.clear();
            close();
        }
    }

    interface IPersonAuth {
        functionNo: number;
        functionName: string;
        available: boolean;
        description: string;
        orderNumber: number;
    }


    interface IEmpFileMn {
        employeeId: string;
        fileId?: string;
        fileType?: number;
        isAvatar: boolean;
    }
    
    enum FunctionNo {
        No1_Allow_DelEmp = 1, // có thể delete employee ở đăng ký thông tin cá nhân
        No2_Allow_UploadAva = 2, // có thể upload ảnh chân dung employee ở đăng ký thông tin cá nhân
        No3_Allow_RefAva = 3,// có thể xem ảnh chân dung employee ở đăng ký thông tin cá nhân
        No4_Allow_UploadMap = 4, // có thể upload file bản đồ ở đăng ký thông tin cá nhân
        No5_Allow_RefMap = 5, // có thể xem file bản đồ ở đăng ký thông tin cá nhân
        No6_Allow_UploadDoc = 6,// có thể upload file điện tử employee ở đăng ký thông tin cá nhân
        No7_Allow_RefDoc = 7,// có thể xem file điện tử employee ở đăng ký thông tin cá nhân
        No8_Allow_Print = 8,  // có thể in biểu mẫu của employee ở đăng ký thông tin cá nhân
        No9_Allow_SetCoppy = 9,// có thể setting copy target item khi tạo nhân viên mới ở đăng ký mới thông tin cá nhân
        No10_Allow_SetInit = 10, // có thể setting giá trị ban đầu nhập vào khi tạo nhân viên mới ở đăng ký mới thông tin cá nhân
        No11_Allow_SwitchWpl = 11  // Lọc chọn lựa phòng ban trực thuộc/workplace trực tiếp theo bộ phận liên kết cấp dưới tại đăng ký thông tin cá nhân
    }
}