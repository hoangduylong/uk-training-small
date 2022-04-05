module nts.uk.com.view.cmf005.share.model {

    export enum SAVE_BEFOR_DELETE_ATR {
        YES = 1,
        NO = 0
    }

    export enum SYSTEM_TYPE {
        PERSON_SYS = 0,
        ATTENDANCE_SYS = 1,
        PAYROLL_SYS = 2,
        OFFICE_HELPER = 3
    }

    export enum TIME_STORE {
        FULL_TIME = 0,
        DAILY = 1,
        MONTHLY = 2,
        ANNUAL = 3
    }

    export enum STORAGE_RANGE_SAVE {
        EARCH_EMP = 0,
        ALL_EMP = 1
    }

    export enum OPERATING_CONDITION {
        INPREPARATION = 0,
        SAVING = 1,
        INPROGRESS = 2,
        DELETING = 3,
        DONE = 4,
        INTERRUPTION_END = 5,
        ABNORMAL_TERMINATION = 6
    }

    export class ItemModel {
        code: number;
        name: string;

        constructor(code: number, name: string) {
            this.code = code;
            this.name = name;
        }
    }


    export class ItemCategory {

        schelperSystem: number;
        categoryId: string;
        categoryName: string;
        possibilitySystem: number;
        storedProcedureSpecified: number;
        timeStore: number;
        otherCompanyCls: number;
        attendanceSystem: number;
        recoveryStorageRange: number;
        paymentAvailability: number;
        storageRangeSaved: number;
        constructor(schelperSystem: number, categoryId: string, categoryName: string, possibilitySystem: number,
            storedProcedureSpecified: number, timeStore: number, otherCompanyCls: number, attendanceSystem: number,
            recoveryStorageRange: number, paymentAvailability: number, storageRangeSaved: number) {
            this.schelperSystem = schelperSystem;
            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.possibilitySystem = possibilitySystem;
            this.storedProcedureSpecified = storedProcedureSpecified;
            this.timeStore = timeStore;
            this.otherCompanyCls = otherCompanyCls;
            this.attendanceSystem = attendanceSystem;
            this.recoveryStorageRange = recoveryStorageRange;
            this.paymentAvailability = paymentAvailability;
            this.storageRangeSaved = storageRangeSaved;
        }

        constructor(categoryId: string, categoryName: string, timeStore: number, storageRangeSaved: number) {

            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.timeStore = timeStore;
            this.storageRangeSaved = storageRangeSaved;
        }
    }

    export class ItemDate {
        startDate: string;
        endDate: string;
        startYear: string;
        endYear: string;

        constructor(startDate: string, endDate: string, startYear: string, endYear: string) {
            this.startDate = startDate;
            this.endDate = endDate;
            this.startYear = startYear;
            this.endYear = endYear;
        }
    }
}