package nts.uk.ctx.bs.employee.app.command.employee.contact;
import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.app.command.employee.data.management.EmployeeContactDto;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContactRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateEmployeeInfoContactCommandHandler extends CommandHandler<UpdateEmployeeInfoContactCommand>
	implements PeregUpdateCommandHandler<UpdateEmployeeInfoContactCommand>{

	@Inject
	private EmployeeContactRepository employeeInfoContactRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00023";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateEmployeeInfoContactCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateEmployeeInfoContactCommand> context) {
		
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
		employeeInfoContactRepository.update(domain);
		
	}


}