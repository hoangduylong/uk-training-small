var cps001;
(function (cps001) {
    var f;
    (function (f) {
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new f.vm.ViewModel();
            __viewContext['viewModel'].start().done(function () {
                init();
                __viewContext.bind(__viewContext['viewModel']);
                $("#button").click(function () {
                    $("#custom-upload").ntsFileUpload({ stereoType: "avatarfile" }).done(function (res) {
                        nts.uk.ui.dialog.info("Upload successfully!");
                    }).fail(function (err) {
                        nts.uk.ui.dialog.alertError(err);
                    });
                });
                f.service.getCurrentEmpPermision().done(function (data) {
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].functionNo == FunctionNo.No6_Allow_UploadDoc) {
                                if (data[i].available == false) {
                                    $(".browser-button").attr('disabled', 'disabled');
                                    $(".delete-button").attr('disabled', 'disabled');
                                }
                            }
                        }
                    }
                });
                setTimeout(function () {
                    $('.browser-button').focus();
                    $('.browser-button').attr("tabindex", 2);
                    $(".link-button").attr("tabindex", 2);
                    $(".delete-button").attr("tabindex", 2);
                }, 500);
            });
            // focus to first input textbox
            $('input:first').focus();
        });
    })(f = cps001.f || (cps001.f = {}));
})(cps001 || (cps001 = {}));
function init() {
    $("#grid2").ntsGrid({
        width: '850px',
        height: '400px',
        dataSource: __viewContext['viewModel'].items,
        primaryKey: 'id',
        virtualization: true,
        virtualizationMode: 'continuous',
        columns: [
            { headerText: 'ID', key: 'id', dataType: 'string', width: '50px', hidden: true },
            { headerText: nts.uk.resource.getText('CPS001_81'), key: 'fileName', dataType: 'string', width: '750px', ntsControl: 'Link1' },
            { headerText: nts.uk.resource.getText('CPS001_83'), key: 'open', dataType: 'string', width: '50px', unbound: true, template: "<button class='delete-button' style='width: 77px' onclick='ButtonClick.call(this)' data-id='${id}'>" + nts.uk.resource.getText("CPS001_83") + "</button>" }
        ],
        features: [{ name: 'Sorting', type: 'local' }],
        ntsControls: [
            { name: 'Button', text: nts.uk.resource.getText('CPS001_83'), click: ButtonClick, controlType: 'Button' },
            { name: 'Link1', click: function () { LinkButtonClick.call(this); }, controlType: 'LinkLabel' }
        ]
    });
}
// xử lý click vào file
function LinkButtonClick() {
    var rowId = String($(this).closest("tr").data("id"));
    var rowItem = _.find(__viewContext['viewModel'].items, function (x) { return x.id == rowId; });
    nts.uk.request.ajax("/shr/infra/file/storage/infor/" + rowItem.fileId).done(function (res) {
        $('.filenamelabel').show();
        __viewContext['viewModel'].filename(res.originalName);
        nts.uk.request.specials.donwloadFile(rowItem.fileId);
    });
}
// xử lý xóa file
function ButtonClick() {
    var id = $(this).data("id");
    var rowItem = _.find(__viewContext['viewModel'].items, function (x) { return x.id == id; });
    __viewContext['viewModel'].deleteItem(rowItem);
    //__viewContext['viewModel'].filename('');
    $("#file-upload").ntsFileUpload("clear");
}
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
//# sourceMappingURL=cps001.f.start.js.map