package nts.uk.ctx.bs.employee.app.command.employee.data.management;

import lombok.Data;

/**
 * Command 社員連絡先を登録する
 */
@Data
public class ContactCommand {
    /**
     * 社員連絡先を登録する
     */
    private EmployeeContactDto employeeContact;
    
    //fix bug #113902
    private Boolean useOfProfile;
}
