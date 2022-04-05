module nts.uk.com.view.cdl027.demo {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import modal = nts.uk.ui.windows.sub.modal;

    __viewContext.ready(function() {
        var screenModel = new ScreenModel();
        __viewContext.bind(screenModel);
    });

    class ScreenModel {

        displayFormat: KnockoutObservable<number> = ko.observable(0);
        selectedEmployee: KnockoutObservableArray<string> = ko.observableArray([]);
        period: KnockoutObservable<any> = ko.observable({});
        yearMonth: KnockoutObservable<any> = ko.observable(null);
        date: KnockoutObservable<any> = ko.observable(null);
        periodType: KnockoutObservable<string>;
        functionId: KnockoutObservable<number> = ko.observable(1);
        displayFormats: KnockoutObservableArray<any> = ko.observableArray([{ code: 0, name: '日付別' }, { code: 1, name: '個人別' }]);
        functionIDs: KnockoutObservableArray<any> = ko.observableArray([
            { name: 'スケジュール', code: 1 },
            { name: '日次', code: 2 },
            { name: '月次', code: 3 },
            { name: '任意期間', code: 4 },
            { name: '給与', code: 5 },
            { name: '賞与', code: 6 },
            { name: '年末調整', code: 7 },
            { name: '月額算定', code: 8 },
            { name: '昇給遡り', code: 9 }
        ]);
        monthlyChecked: KnockoutObservable<boolean> = ko.observable(false);
        listEmployee: KnockoutObservableArray<any> = ko.observableArray([
            { employeeId: "ae7fe82e-a7bd-4ce3-adeb-5cd403a9d570", employeeCode: "000001", employeeName: "大塚　太郎ビ" },
            { employeeId: "8f9edce4-e135-4a1e-8dca-ad96abe405d6", employeeCode: "000002", employeeName: "大塚　次郎" },
            { employeeId: "9787c06b-3c71-4508-8e06-c70ad41f042a", employeeCode: "000003", employeeName: "大塚　花子" },
            { employeeId: "62785783-4213-4a05-942b-c32a5ffc1d63", employeeCode: "000004", employeeName: "２会社"  },
            { employeeId: "4859993b-8065-4789-90d6-735e3b65626b", employeeCode: "000005", employeeName: "ア" },
            { employeeId: "aeaa869d-fe62-4eb2-ac03-2dde53322cb5", employeeCode: "000006", employeeName: "あ" },
            { employeeId: "f15f8e79-54eb-4cf0-8843-b0c6ab269253", employeeCode: "000011", employeeName: "大橋　弘和" },
            { employeeId: "ad400b83-d7bd-4f65-bcbb-02e1e4950c9d", employeeCode: "000020180401", employeeName: "さくら　さく" },
            { employeeId: "fed415ff-151c-4336-bf04-4fd2122f16f1", employeeCode: "000020180402", employeeName: "アブアブ" },
            { employeeId: "9bfa82e2-32a6-497c-a404-b9e3fba32a53", employeeCode: "000020180404", employeeName: "槇原　省吾" },
            { employeeId: "403781dd-9430-4980-b3f3-dd5fe3f345d0", employeeCode: "000052", employeeName: "門戸　香平 ccv" },
            { employeeId: "47b437b6-5f63-4094-bb57-afecf7a2e405", employeeCode: "000053", employeeName: "稲葉　隆弘" },
            { employeeId: "753c4d07-efb7-4df4-846f-1fda2ec40e9e", employeeCode: "000076", employeeName: "ビジネスネーム" },
            { employeeId: "b93b0cd8-3eaa-491e-a418-d737ef33c9e9", employeeCode: "0000ri", employeeName: "日通　李です。" },
            { employeeId: "8152f80c-d939-409d-a1ac-947960d5b8e6", employeeCode: "000124", employeeName: "大塚　ブンヤ" },
            { employeeId: "ef8f5689-5753-4368-81d5-4121f17d35e2", employeeCode: "000125", employeeName: "大塚　慎吾" },
            { employeeId: "597fa678-00ba-47b3-ac4f-b535a7869aea", employeeCode: "000150", employeeName: "テスト　150" },
            { employeeId: "88f866e4-79fd-46d2-89d6-0ffc282e83c9", employeeCode: "000151", employeeName: "カナ" },
            { employeeId: "0011fcd1-06ca-4fd7-b009-9f1cab325fcb", employeeCode: "000152", employeeName: "村井　なつみ" },
            { employeeId: "f515d9a8-60fb-414e-af47-5462c565b64b", employeeCode: "000153", employeeName: "池内 達士" },
            { employeeId: "64e0d5d4-c197-442c-a96a-21a944983bf6", employeeCode: "000154", employeeName: "関口 倫子" },
            { employeeId: "89ea1474-d7d8-4694-9e9b-416ea1d6381c", employeeCode: "000158", employeeName: "000158" },
            { employeeId: "ea9748b7-3673-4a56-b46b-9b21068936c0", employeeCode: "000159", employeeName: "M33" },
            { employeeId: "da411b1c-ca06-4f97-b5ea-ce545316e2c1", employeeCode: "000161", employeeName: "ジャック　フロスト" },
            { employeeId: "1a3ac04f-ffff-42bf-b6a2-ff85c392b6b2", employeeCode: "000162", employeeName: "ジャック　ランタン" },
            { employeeId: "86256081-e991-4ac2-a5fc-a91a008fa4cb", employeeCode: "000163", employeeName: "薬師丸 さとみ" },
            { employeeId: "a1d49f12-5cd6-4411-800e-a800968a2127", employeeCode: "000164", employeeName: "佐久間 精児" },
            { employeeId: "3b6e4df8-ed77-433b-80fc-13f73c33c2cf", employeeCode: "000165", employeeName: "大原 サダヲ" },
            { employeeId: "1a7d0aab-e228-46ff-9117-33395c13420d", employeeCode: "000166", employeeName: "000166" },
            { employeeId: "5a8e848e-aa38-4d43-942b-ff2425b0cf67", employeeCode: "000167", employeeName: "江戸川　乱歩" },
            { employeeId: "3470128f-eb70-4f06-924f-00b10cfb3062", employeeCode: "000168", employeeName: "川端　やすなり" },
            { employeeId: "aa1b73bb-5d46-4dcd-b0a5-82d6764d0fc2", employeeCode: "000169", employeeName: "コードコード" },
            { employeeId: "191d762c-eba7-42d8-a494-f1e0d760e776", employeeCode: "000170", employeeName: "コードコードコード" },
            { employeeId: "007d103d-453b-480c-83c7-b09b48814c99", employeeCode: "000171", employeeName: "000171" },
            { employeeId: "d64f2657-5593-4bcf-8d47-4998c543aaea", employeeCode: "000172", employeeName: "太郎" },
            { employeeId: "2a6a9591-4895-4643-a026-c9fde3288769", employeeCode: "000176", employeeName: "李　です、よろしくお願いします。" },
            { employeeId: "72dfac7a-fa55-42e1-8829-38c8654d4c9d", employeeCode: "000181", employeeName: "テスト" },
            { employeeId: "2f201bbe-809c-4fbc-ba3e-8c8de66e97ff", employeeCode: "000182", employeeName: "日通　太郎B" },
            { employeeId: "7423b2de-0b0f-40ee-a611-58caaf05f258", employeeCode: "000184", employeeName: "ビジネ　日作　二介" },
            { employeeId: "ad92a33f-37b1-4d25-afcf-e8fb0770b29d", employeeCode: "000185", employeeName: "ビジネ　日作　三介" },
            { employeeId: "872583a8-d20a-4b08-8115-0b9d8b748596", employeeCode: "000186", employeeName: "ビジネ　日作　一花" },
            { employeeId: "b4f6f858-846a-41d8-bf9e-1a743ef47948", employeeCode: "000188", employeeName: "000188" },
            { employeeId: "81f2e851-df17-4d8f-b7e8-0ccd180bc31a", employeeCode: "000189", employeeName: "ビジネスタカノ" },
            { employeeId: "5f17ee68-00f8-4e6e-ace0-443c32f90acd", employeeCode: "000190", employeeName: "渡邉テスト" },
            { employeeId: "a89fc33e-54b2-4c9a-9ec3-77e155937fab", employeeCode: "000191", employeeName: "あ" },
            { employeeId: "6311c438-989e-4c78-b2cc-1d01005fa35b", employeeCode: "000193", employeeName: "タカハシテスト" },
            { employeeId: "455fa2a9-9774-4ced-be97-e0304acfd9ff", employeeCode: "000194", employeeName: "烏龍　ティー" },
            { employeeId: "ce7c1e5e-6e1a-4d9e-a5fa-f6a644fa32b1", employeeCode: "000195", employeeName: "エメラルド　マウンテン　ジョージ" },
            { employeeId: "ac3e1264-f660-4239-87b8-36b68b7cc2be", employeeCode: "000196", employeeName: "安井" },
            { employeeId: "745daa2a-b12b-4fb2-9b4f-14673b937e6e", employeeCode: "000197", employeeName: "渡邉テスト2" },
            { employeeId: "f206e0c0-07da-49f8-877e-1992c9d4741e", employeeCode: "000198", employeeName: "000198" },
            { employeeId: "c26ddc42-2f1f-4af9-bbcc-3a26e946464a", employeeCode: "000199", employeeName: "テスト　アラカワB" },
            { employeeId: "aee05667-67e1-4a6e-abc7-a73372bc01b2", employeeCode: "000200", employeeName: "ミナミ　アルプス　ビジネ" },
            { employeeId: "a25c79d8-0d4a-4828-9a38-2ff2f3f38004", employeeCode: "009901", employeeName: "アミ　太郎" },
            { employeeId: "c722bcaa-0bf8-43f6-a828-6150113c9445", employeeCode: "009902", employeeName: "アミ　次郎" },
            { employeeId: "06c4e59e-2f06-4838-a8e3-1dda935105fb", employeeCode: "009911", employeeName: "アミ　主任１" },
            { employeeId: "877fbaad-7e76-447e-82cd-c4bfe71a5d59", employeeCode: "009912", employeeName: "アミ　主任２" },
            { employeeId: "c7ea8a01-c601-439f-9140-d6717a86d982", employeeCode: "009913", employeeName: "アミ　主任３" },
            { employeeId: "49f2d71b-7129-4e7e-8304-af9a488b9dec", employeeCode: "009914", employeeName: "アミ　主任４" },
            { employeeId: "819dee31-b04c-4ac1-9d12-754918525906", employeeCode: "009915", employeeName: "アミ　主任５" },
            { employeeId: "bbfa1312-e7f5-4b28-aeab-1ee5a349c674", employeeCode: "009916", employeeName: "アミ　主任６" },
            { employeeId: "6009916f-8499-4fad-a9b2-20d93553feb1", employeeCode: "009917", employeeName: "アミ　主任７" },
            { employeeId: "18693837-ec33-47ae-a4d1-bdf2f3485e5f", employeeCode: "009918", employeeName: "アミ　主任８" },
            { employeeId: "02b2434f-7279-44ce-908e-f382654e9416", employeeCode: "009919", employeeName: "アミ　主任９" },
            { employeeId: "d60e4d5b-c0ba-491b-bcbd-900c56dccead", employeeCode: "009959", employeeName: "退職社員" },
            { employeeId: "88ebd913-c181-4554-95c7-5cc85d21ef2c", employeeCode: "0aiueo", employeeName: "タナカアカネ" },
            { employeeId: "950e8a3f-7469-43c6-a06e-5b502a8e292e", employeeCode: "0aiuep", employeeName: "テスト" },
            { employeeId: "247cb6b4-c34b-4402-87ce-0738dfb62061", employeeCode: "0aiueq", employeeName: "テスト" },
            { employeeId: "e4c11422-3fc3-4fa3-a0a8-14292aceb98e", employeeCode: "0aiues", employeeName: "テスト　カナ" },
            { employeeId: "5b9361e1-eacb-4b1a-ab93-7268cde22612", employeeCode: "0aiuet", employeeName: "カナ　カナ" },
            { employeeId: "bdc94704-56ef-452c-8fec-288eff301849", employeeCode: "0aiuez", employeeName: "稲熊　テスト１" },
            { employeeId: "93276cfa-55d1-4d1d-bf84-a253055e94c3", employeeCode: "0aiufa", employeeName: "稲熊　テスト２" },
            { employeeId: "fd08bedb-289a-4814-b744-b826680bb10b", employeeCode: "0aiufb", employeeName: "稲熊　テスト３" },
            { employeeId: "5b20e6b2-866e-4b2d-91d4-fc08715306ba", employeeCode: "0aiufc", employeeName: "稲熊　テスト４" },
            { employeeId: "3f1b51b6-f162-4974-adc7-23b27503f631", employeeCode: "0aiufd", employeeName: "稲熊　テスト６" },
            { employeeId: "3187cff8-15a1-49eb-9b21-458411a60861", employeeCode: "0aiufe", employeeName: "稲熊　テスト７" },
            { employeeId: "5a4cec18-db08-40ab-89c5-004df8f4c859", employeeCode: "0aiuff", employeeName: "0aiu　ff" },
            { employeeId: "68b74b41-527c-41c1-bc6d-80a5fe002b9d", employeeCode: "0aiufg", employeeName: "0ai　ufg" },
            { employeeId: "48900228-158f-415e-9be3-27258374d5ea", employeeCode: "0aiufh", employeeName: "0ai　ufh" },
            { employeeId: "71781103-755f-4cfc-886b-1861de6f2c72", employeeCode: "0aiufi", employeeName: "0ai　ufi" },
            { employeeId: "402897ba-8991-4e21-9799-b48534bff0a1", employeeCode: "0aiufj", employeeName: "0ai　ufj" },
            { employeeId: "e8b8f092-da47-4875-ab87-d6633f78beeb", employeeCode: "0aiufk", employeeName: "0aiu　fk" },
            { employeeId: "65a6a972-c480-41b4-8dd8-d7cbe24f3ff9", employeeCode: "0aiufl", employeeName: "0ai　ufl" },
            { employeeId: "d8344925-1522-41c4-89b0-48a798a73155", employeeCode: "0aiufm", employeeName: "0ai　ufm" },
            { employeeId: "f993b359-5a50-4d8b-a692-d2feaf364b95", employeeCode: "0aiufn", employeeName: "0aiu　fn" },
            { employeeId: "85c79a88-dfc6-4d63-a5a4-8ea324d99c8a", employeeCode: "0aiufo", employeeName: "0a　iufo" },
            { employeeId: "fa6ff537-a949-4557-8425-f3e03c7ac5d0", employeeCode: "0aiufp", employeeName: "0ai　ufp" },
            { employeeId: "1032b3ee-41e8-4848-a8f0-5b6c3be4cc19", employeeCode: "0aiufq", employeeName: "0ai　ufq" },
            { employeeId: "a7b57df9-4b5a-450c-bfc4-9df11711c2c0", employeeCode: "0aiufr", employeeName: "0aiu　fr" },
            { employeeId: "8aeb5f0d-d10a-4231-87a7-78d87f49e891", employeeCode: "0aiufs", employeeName: "0ai　ufs" },
            { employeeId: "68bbb588-7721-42d6-a830-853424b7bf34", employeeCode: "0aiuft", employeeName: "0ai　uft" },
            { employeeId: "fc7b3445-fd8f-44c6-9936-861115672fcb", employeeCode: "0aiufu", employeeName: "0ai　ufu" },
            { employeeId: "b09bfb4f-7564-4ad0-9b6f-41549b941a25", employeeCode: "100002", employeeName: "角松　洋介" },
            { employeeId: "d2de28c4-1ef7-4a72-adfb-8e2c87f12336", employeeCode: "100003", employeeName: "菊池 雅行" },
            { employeeId: "31e51159-f1d3-4c64-84b5-1c088b7edeca", employeeCode: "100004", employeeName: "尾栗　康平" },
            { employeeId: "46626f93-21b0-4ae4-80bf-f7b10e597d87", employeeCode: "100005", employeeName: "青梅　鷹志" },
            { employeeId: "111949a2-abed-4c4a-9197-02ad5b04a209", employeeCode: "100006", employeeName: "アスロック米倉" },
            { employeeId: "1916f473-3e07-49bc-b9fe-55c577e1bcac", employeeCode: "100007", employeeName: "ももい　ななこ" },
            { employeeId: "29dee89b-9f13-41e6-8492-a56f09df45bf", employeeCode: "100010", employeeName: "渡嘉敷　錠" },
            { employeeId: "f6ff397b-3d6d-4fa8-81d9-f5813a477cf8", employeeCode: "121212", employeeName: "ビジネス　タカノ" },
            { employeeId: "b285d03d-295b-40ae-90af-3a768070b5b9", employeeCode: "20180301", employeeName: "うめに　うぐいす" },
            { employeeId: "d1b1b9ca-278e-4520-b419-2e60da49c8c1", employeeCode: "3", employeeName: "カ　ナ" },
            { employeeId: "3212d150-cd7f-47f8-92d9-c9f9e6945faa", employeeCode: "500001", employeeName: "広瀬　テスト１b" },
            { employeeId: "502B472D-C77C-4DE2-8550-4ECB7C3A4159", employeeCode: "900000000001", employeeName: "テスト籔下2" },
            { employeeId: "A75A2329-3D92-4A8C-A3D0-337C80BE5E7A", employeeCode: "900000000001", employeeName: "テスト籔下1" },
            { employeeId: "3F847096-58FB-4200-90A2-9E2844F0179A", employeeCode: "900000000002", employeeName: "テスト籔下23" },
            { employeeId: "9A727014-99D7-4E55-BCE3-EBD8B372BAD4", employeeCode: "900000000003", employeeName: "テスト籔下234" },
            { employeeId: "7366a63f-a989-4bd1-816d-eedeab316ec5", employeeCode: "900005  ", employeeName: "休業者1" },
            { employeeId: "1de85ea6-63aa-4107-a8e9-4262357ee9df", employeeCode: "900006  ", employeeName: "李0331_01" },
            { employeeId: "eea36f38-5a84-4081-a920-9e17997f1268", employeeCode: "910001", employeeName: "MK01承認　管理BN" },
            { employeeId: "d9d334ca-85a0-4f90-b10e-1ccadacffdb0", employeeCode: "910005  ", employeeName: "休業者1" },
            { employeeId: "b861bc2c-4ff3-4f45-b58f-4b6c4803d639", employeeCode: "910006  ", employeeName: "９９９９９９" },
            { employeeId: "1b62972c-ae9e-4fa2-b832-1a85f5b80a32", employeeCode: "910010", employeeName: "MK10申請　一般BN" },
            { employeeId: "bb714461-6173-4e04-8e58-eb322e6547e2", employeeCode: "920001", employeeName: "MM01承認　管理BN" },
            { employeeId: "3abc1815-b814-4c75-8cbf-7c7c6d8b628b", employeeCode: "920010", employeeName: "MM10申請　テストBN" },
            { employeeId: "5338b123-2dfd-4487-a294-317443020d23", employeeCode: "920020", employeeName: "MM20依頼　代行" },
            { employeeId: "b094b8c6-4233-472d-b6af-16cc72425fef", employeeCode: "920021", employeeName: "MM21受託　代行" },
            { employeeId: "78761efd-57ea-44e1-93ac-6b995f7c967f", employeeCode: "990001", employeeName: "MK承認　管理者" },
            { employeeId: "7fc47a15-9ed4-4d27-b243-98170c6ae37f", employeeCode: "999990  ", employeeName: "李0331_02" },
            { employeeId: "60071c1c-adaf-4162-993d-cfc5f5449bc4", employeeCode: "999999  ", employeeName: "９９９９９９" },
            { employeeId: "d4256f22-436c-4528-b872-4683d75bb9f1", employeeCode: "H00002", employeeName: "表示氏名" },
            { employeeId: "eb787771-81e4-4e44-b2a7-786315195ea9", employeeCode: "H00007", employeeName: "表示氏名" },
            { employeeId: "b726ca2c-7a1c-4372-ada9-ee6bbb1075c9", employeeCode: "H00008", employeeName: "表示氏名" },
            { employeeId: "d4ddd4dc-9390-49dc-8c5f-ccdb79e9108b", employeeCode: "H00009", employeeName: "表示氏名" },
            { employeeId: "86804e4c-1518-40c9-a848-4988b2d11e80", employeeCode: "H00010", employeeName: "表示氏名" },
            { employeeId: "39a975d6-d9fe-4a59-96ed-b38ce0b978bf", employeeCode: "H00011", employeeName: "表示氏名" },
            { employeeId: "967de495-e2de-42ee-b76c-2dbc8a2dfa06", employeeCode: "H00012", employeeName: "表示氏名" },
            { employeeId: "fb68660a-2186-4579-bbd2-055d1b47df37", employeeCode: "H00013", employeeName: "表示氏名" },
            { employeeId: "d3e62058-d362-4bb3-8dce-18c36a6f9966", employeeCode: "H00014", employeeName: "表示氏名" },
            { employeeId: "b1b5a35b-282e-4ff3-873c-a70a09c68e17", employeeCode: "H00015", employeeName: "表示氏名" }, 
            { employeeId: "4a14ef53-436d-48a6-8e67-6d9568fb6dcf", employeeCode: "H00016", employeeName: "表示氏名" }, 
            { employeeId: "be306b91-44f1-4e7c-b7a1-a9bcf006633a", employeeCode: "H00017", employeeName: "表示氏名" }, 
            { employeeId: "b110e37b-2d55-47d3-b284-e372d4b55330", employeeCode: "H00018", employeeName: "表示氏名" },
            { employeeId: "14dc646e-79b4-4643-8bcd-d146320efc53", employeeCode: "H00019", employeeName: "表示氏名" },
            { employeeId: "fe9f3f82-aa33-4e5b-af29-146588fcd16e", employeeCode: "H00020", employeeName: "表示氏名" },
            { employeeId: "0dc31cc6-5213-4d7e-937d-6a269c97085a", employeeCode: "H00021", employeeName: "表示氏名" },
            { employeeId: "f41e1842-0ade-446b-9685-1d0020f3bbd9", employeeCode: "H00022", employeeName: "表示氏名" }, 
            { employeeId: "1d3448c3-685f-43e0-813f-af7e550cd470", employeeCode: "H00023", employeeName: "表示氏名" }, 
            { employeeId: "174fedad-dfa6-40ad-9b95-a996910b74a1", employeeCode: "H00024", employeeName: "表示氏名" }, 
            { employeeId: "a8c9b630-5cb3-41b5-b34d-50765568db6a", employeeCode: "H00025", employeeName: "表示氏名" }, 
            { employeeId: "a731f537-1aac-4cfb-a371-b0cd61cf4a4c", employeeCode: "H00026", employeeName: "表示氏名" }, 
            { employeeId: "39eb323a-d742-45d0-89ec-b230bab4f7ff", employeeCode: "H00027", employeeName: "表示氏名" }, 
            { employeeId: "a9c23518-34cf-4ce3-9220-571f1c817bc7", employeeCode: "H00028", employeeName: "表示氏名" }, 
            { employeeId: "da720350-ffde-4f99-96ea-abb796f58cfa", employeeCode: "H00029", employeeName: "表示氏名" }, 
            { employeeId: "6559594f-10b1-4c1e-af7e-8d7a1d334431", employeeCode: "H00030", employeeName: "表示氏名" }, 
            { employeeId: "bf753caf-a3f3-495f-a46b-44b891ee0ee4", employeeCode: "H00031", employeeName: "表示氏名" }, 
            { employeeId: "83d30b12-fe84-49ea-9938-432ced4aa247", employeeCode: "H00032", employeeName: "表示氏名" }, 
            { employeeId: "214c93a8-fcce-4049-b66a-7aec7962bb0b", employeeCode: "H00033", employeeName: "表示氏名" }, 
            { employeeId: "f50ba238-9136-49ec-a06a-6147b7e5f025", employeeCode: "H00034", employeeName: "いいい" }, 
            { employeeId: "c7e128dd-06d7-49de-a545-f4c3b6e6df3f", employeeCode: "H00035", employeeName: "ううう" }, 
            { employeeId: "43515929-ded7-4011-baf8-e17f93fc6ef1", employeeCode: "H00036", employeeName: "表示氏名" }, 
            { employeeId: "8c7079a8-3f47-4561-a709-56914a3eb9f6", employeeCode: "H00037", employeeName: "表示氏名" }, 
            { employeeId: "ee79cbc4-afea-415a-a28a-b6e72daef550", employeeCode: "H00038", employeeName: "表示氏名" }, 
            { employeeId: "b808d30a-ad2f-4335-918f-f81b13a52357", employeeCode: "H00039", employeeName: "表示氏名" }, 
            { employeeId: "a89d14b3-032d-44bb-9ae8-54535fa6486e", employeeCode: "H00040", employeeName: "表示氏名" }, 
            { employeeId: "e1e4c6fa-55c7-4025-b299-74c542803876", employeeCode: "H00041", employeeName: "表示氏名" }, 
            { employeeId: "b11b7dd4-9fa0-44fd-89b0-94c7eee71105", employeeCode: "H00042", employeeName: "表示氏名" }
        ]);

        constructor() {
            let self = this;
            self.periodType = ko.computed(() => {
                switch (self.functionId()) {
                    case 1:
                    case 2:
                        return "fullDate";
                    case 4:
                    case 5:
                    case 6:
                    case 8:
                    case 9:
                        return "yearmonth";
                    case 3:
                        return "ym-ymd";
                    default:
                        return "year";
                }
            });
            self.periodType.subscribe((value) => {
                if (value != "yearmonth") self.monthlyChecked(false);
            });
        }

        openCdl027Dialog() {
            let self = this,
                params: Params = { 
                    pgid: __viewContext.program.programId, 
                    functionId: self.functionId(), 
                    listEmployeeId: self.selectedEmployee(), 
                    period: self.period(), 
                    displayFormat: self.displayFormat(),
                };
            if (self.functionId() == 3)
                params.period = { startDate: self.yearMonth(), endDate: self.date() };
            setShared("CDL027Params", params);
            modal("com", "/view/cdl/027/a/index.xhtml");
        }
    }

    class Period {
        startDate: string;
        endDate: string;
    }
    
    interface Params {
        pgid: string; //__viewContext.program.programId
        functionId: number;
        listEmployeeId: Array<string>;
        period: any; // {startDate: string, endDate: string};  {startDate: string 'YYYYMM', endDate: string 'YYYYMMDD'} only from the monthly correction to calling
        displayFormat: number;
    }
}
