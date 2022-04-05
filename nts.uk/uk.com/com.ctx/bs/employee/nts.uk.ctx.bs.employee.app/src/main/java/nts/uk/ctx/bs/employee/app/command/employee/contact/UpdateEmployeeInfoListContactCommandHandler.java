package nts.uk.ctx.bs.employee.app.command.employee.contact;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.employee.app.command.employee.data.management.EmployeeContactDto;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContactRepository;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregUpdateListCommandHandler;
@Stateless
public class UpdateEmployeeInfoListContactCommandHandler  extends CommandHandlerWithResult<List<UpdateEmployeeInfoContactCommand>, List<MyCustomizeException>>
implements PeregUpdateListCommandHandler<UpdateEmployeeInfoContactCommand>{
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
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<UpdateEmployeeInfoContactCommand>> context) {
		List<UpdateEmployeeInfoContactCommand> cmd = context.getCommand();
		List<MyCustomizeException> result = new ArrayList<>();
		
		cmd.stream().forEach(c -> {
			try {
				EmployeeContactDto dto = EmployeeContactDto.builder()
						.employeeId(c.getSid())
						.mailAddress(c.getMailAddress())
						.seatDialIn(c.getSeatDialIn())
						.seatExtensionNumber(c.getSeatExtensionNo())
						.mobileMailAddress(c.getPhoneMailAddress())
						.cellPhoneNumber(c.getCellPhoneNo())
						.build();
				EmployeeContact domain = EmployeeContact.createFromMemento(dto);
				employeeInfoContactRepository.update(domain);
			} catch(BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getSid()));
				result.add(ex);
			}
		});

		return result;
	}

}