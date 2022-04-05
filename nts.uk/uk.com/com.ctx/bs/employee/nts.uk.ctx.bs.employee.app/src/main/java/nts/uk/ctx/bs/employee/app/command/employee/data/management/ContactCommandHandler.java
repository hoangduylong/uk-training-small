package nts.uk.ctx.bs.employee.app.command.employee.data.management;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContactRepository;
import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.util.Optional;

/**
 * アカウント情報を登録する
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ContactCommandHandler extends CommandHandler<ContactCommand> {

    @Inject
    private EmployeeContactRepository employeeContactRepository;

    @Override
    protected void handle(CommandHandlerContext<ContactCommand> commandHandlerContext) {
        ContactCommand command = commandHandlerContext.getCommand();
        //#113902
        Boolean isUseOfProfile = command.getUseOfProfile();
        String employeeId = AppContexts.user().employeeId();

		// cmd 6 : 個人連絡先を登録する
		if (isUseOfProfile) {
			this.updateEmployeeContact(command.getEmployeeContact(), employeeId);
		}
    }

    // 個人連絡先を登録する
    private void updateEmployeeContact(EmployeeContactDto employeeContactDto, String employeeId) {
        Optional<EmployeeContact> employeeContact = employeeContactRepository.getByEmployeeId(employeeId);
        if (employeeContact.isPresent()) {
            EmployeeContact updateEmployeeContact = new EmployeeContact();
            updateEmployeeContact.getMemento(employeeContactDto);
            employeeContactRepository.update(updateEmployeeContact);
        } else {
            EmployeeContact newEmployeeContact = new EmployeeContact();
            newEmployeeContact.getMemento(employeeContactDto);
            employeeContactRepository.insert(newEmployeeContact);
        }
    }
}
