module cps001.f {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(function() {
        __viewContext['viewModel'] = new vm.ViewModel();

        __viewContext['viewModel'].start().done(() => {
            init();
            __viewContext.bind(__viewContext['viewModel']);

            $("#button").click(function() {
                $("#custom-upload").ntsFileUpload({ stereoType: "avatarfile" }).done(function(res) {
                    nts.uk.ui.dialog.info("Upload successfully!");
                }).fail(function(err) {
                    nts.uk.ui.dialog.alertError(err);
                });
            });

            service.getCurrentEmpPermision().done((data: Array<IPersonAuth>) => {
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

            
            setTimeout(() => {
                $('.browser-button').focus();
                $('.browser-button').attr("tabindex", 2);
                $(".link-button").attr("tabindex", 2);
                $(".delete-button").attr("tabindex", 2);
            }, 500);
        });


        // focus to first input textbox
        $('input:first').focus();

    });

}


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
            { name: 'Link1', click: function() { LinkButtonClick.call(this); }, controlType: 'LinkLabel' }
        ]
    });

}

// x??? l?? click v??o file
function LinkButtonClick() {
    var rowId: string = String($(this).closest("tr").data("id"));
    var rowItem = _.find(__viewContext['viewModel'].items, function(x: any) { return x.id == rowId; });
    nts.uk.request.ajax("/shr/infra/file/storage/infor/" + rowItem.fileId).done(function(res) {
        $('.filenamelabel').show();
        __viewContext['viewModel'].filename(res.originalName);
        nts.uk.request.specials.donwloadFile(rowItem.fileId);
    });
}
// x??? l?? x??a file
function ButtonClick() {
    var id = $(this).data("id");
    var rowItem = _.find(__viewContext['viewModel'].items, function(x: any) { return x.id == id; });
    __viewContext['viewModel'].deleteItem(rowItem);
    //__viewContext['viewModel'].filename('');
    $("#file-upload").ntsFileUpload("clear");
}

interface IPersonAuth {
    functionNo: number;
    functionName: string;
    available: boolean;
    description: string;
    orderNumber: number;
}

enum FunctionNo {
    No1_Allow_DelEmp = 1, // c?? th??? delete employee ??? ????ng k?? th??ng tin c?? nh??n
    No2_Allow_UploadAva = 2, // c?? th??? upload ???nh ch??n dung employee ??? ????ng k?? th??ng tin c?? nh??n
    No3_Allow_RefAva = 3,// c?? th??? xem ???nh ch??n dung employee ??? ????ng k?? th??ng tin c?? nh??n
    No4_Allow_UploadMap = 4, // c?? th??? upload file b???n ????? ??? ????ng k?? th??ng tin c?? nh??n
    No5_Allow_RefMap = 5, // c?? th??? xem file b???n ????? ??? ????ng k?? th??ng tin c?? nh??n
    No6_Allow_UploadDoc = 6,// c?? th??? upload file ??i???n t??? employee ??? ????ng k?? th??ng tin c?? nh??n
    No7_Allow_RefDoc = 7,// c?? th??? xem file ??i???n t??? employee ??? ????ng k?? th??ng tin c?? nh??n
    No8_Allow_Print = 8,  // c?? th??? in bi???u m???u c???a employee ??? ????ng k?? th??ng tin c?? nh??n
    No9_Allow_SetCoppy = 9,// c?? th??? setting copy target item khi t???o nh??n vi??n m???i ??? ????ng k?? m???i th??ng tin c?? nh??n
    No10_Allow_SetInit = 10, // c?? th??? setting gi?? tr??? ban ?????u nh???p v??o khi t???o nh??n vi??n m???i ??? ????ng k?? m???i th??ng tin c?? nh??n
    No11_Allow_SwitchWpl = 11  // L???c ch???n l???a ph??ng ban tr???c thu???c/workplace tr???c ti???p theo b??? ph???n li??n k???t c???p d?????i t???i ????ng k?? th??ng tin c?? nh??n
}
