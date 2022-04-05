package nts.uk.ctx.bs.employee.app.command.employee.contact;
import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.employee.app.command.employee.data.management.EmployeeContactDto;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContactRepository;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddEmployeeInfoContactCommandHandler extends CommandHandlerWithResult<AddEmployeeInfoContactCommand, PeregAddCommandResult>
	implements PeregAddCommandHandler<AddEmployeeInfoContactCommand>{
	
	@Inject
	private EmployeeContactRepository employeeInfoContactRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00023";
	}
	
	@Override
	public Class<?> commandClass() {
		return AddEmployeeInfoContactCommand.class;
	}
	
	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddEmployeeInfoContactCommand> context) {
		val command = context.getCommand();
		EmployeeContactDto dto = EmployeeContactDto.builder()
				.employeeId(command.getSid())
				.mailAddress(command.getMailAddress())
				.seatDialIn(command.getSeatDialIn())
				.seatExtensionNumber(command.getSeatExtensionNo())
				.mobileMailAddress(command.getPhoneMailAddress())
				.cellPhoneNumber(command.getCellPhoneNo())
				.build();
		EmployeeContact domain = EmployeeContact.createFromMemento(dto);
		employeeInfoContactRepository.insert(domain);
		
		return new PeregAddCommandResult(command.getSid());
	}
}