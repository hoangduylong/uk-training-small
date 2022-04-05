module nts.uk.com.view.csa005.b {
    export module service {
        var paths = {
            copyRoleCas005 :"screen/sys/auth/cas005/copyrolecas005"
        }
        //
        //copy role cas005
        export function copyRoleCas005(command : any) : JQueryPromise<any>{
            return nts.uk.request.ajax("com",paths.copyRoleCas005,command);
        }
        
    }
}
