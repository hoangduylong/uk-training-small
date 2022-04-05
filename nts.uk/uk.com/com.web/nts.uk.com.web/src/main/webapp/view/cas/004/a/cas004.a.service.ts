module nts.uk.com.view.cas004.a {
    export module service {

        var paths: any = {
            getCompanyImportList: "ctx/sys/auth/regis/user/getAllCom",
            getUserListByCid: "ctx/sys/auth/regis/user/getlistUser/",
            getAllUser: "ctx/sys/auth/regis/user/getAllUser",
            registerUser: "ctx/sys/auth/regis/user/register",
            updateUser: "ctx/sys/auth/regis/user/update",
            deleteUser: "ctx/sys/auth/regis/user/delete",
        };

        export function getCompanyImportList(): JQueryPromise<any> {
            return nts.uk.request.ajax(paths.getCompanyImportList);
        };

        export function getUserListByCid(cid: string): JQueryPromise<any> {
            return nts.uk.request.ajax(paths.getUserListByCid+cid);
        }
        
        export function getAllUser(): JQueryPromise<any> {
            return nts.uk.request.ajax(paths.getAllUser);
        }
        
        export function registerUser(userDto: model.UserDto): JQueryPromise<any> {
            return nts.uk.request.ajax(paths.registerUser, userDto);
        }
        
        export function updateUser(userDto: model.UserDto): JQueryPromise<void> {
            return nts.uk.request.ajax(paths.updateUser, userDto);
        }
        
        export function deleteUser(deleteCmd: model.DeleteCmd): JQueryPromise<void> {
            return nts.uk.request.ajax(paths.deleteUser, deleteCmd);
        }
    }

    export module model {
        export class CompanyImport {
            companyCode: string;
            companyName: string;
            companyId: string;
            

            constructor(companyCode: string, companyName: string, companyId: string) {
                this.companyCode = companyCode;
                this.companyName = companyName;
                this.companyId = companyId;
            };
        }

        export class UserDto {
            userID: string;
            loginID: string;
            userName: string;
            password: any;
            expirationDate: string;
            mailAddress: string;
            associatedPersonID: any;
            specialUser: boolean;
            multiCompanyConcurrent: boolean;
            cid: any;
            
            constructor(userID: string, loginID: string, userName: string, password: any, expirationDate: string, mailAddress: string, associatedPersonID: any, specialUser: boolean, multiCompanyConcurrent: boolean, cid: any) {
                this.userID = userID;
                this.loginID = loginID;
                this.userName = userName;
                this.password = password;
                this.expirationDate = expirationDate;
                this.mailAddress = mailAddress;
                this.associatedPersonID = associatedPersonID;
                this.specialUser = specialUser;
                this.multiCompanyConcurrent = multiCompanyConcurrent;
                this.cid = cid;
            }
        }
        
        export class DeleteCmd {
            userID: string;
            personalId: any;

            constructor(userID: string, personalId: any) {
                this.userID = userID;
                this.personalId = personalId;
            };
        }
    }
}