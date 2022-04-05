package command.person.info;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregUpdateListCommandHandler;

@Stateless
public class UpdatePersonListCommandHandler extends CommandHandlerWithResult<List<UpdatePersonCommand>, List<MyCustomizeException>>
implements PeregUpdateListCommandHandler<UpdatePersonCommand>{
	@Inject
	private PersonRepository personRepository;
	@Override
	public String targetCategoryCd() {
		return "CS00002";
	}

	@Override
	public Class<?> commandClass() {
		return UpdatePersonCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<UpdatePersonCommand>> context) {
		List<UpdatePersonCommand> commandLst = context.getCommand();
		List<Person> domains = commandLst.stream().map(command -> {return Person.createFromJavaType(command.getBirthDate(),command.getBloodType()!= null?command.getBloodType().intValue(): null,command.getGender()!=null?command.getGender().intValue():ConstantUtils.ENUM_UNDEFINE_VALUE,command.getPersonId(),
				command.getBusinessName(),command.getBusinessNameKana(),command.getPersonName(),command.getPersonNameKana(),command.getBusinessOtherName(),command.getBusinessEnglishName(),
				command.getPersonRomanji(),command.getPersonRomanjiKana(),command.getTodokedeFullName(),command.getTodokedeFullNameKana(),command.getOldName(),command.getOldNameKana(),
				command.getPersonalNameMultilingual(),command.getPersonalNameMultilingualKana());}).collect(Collectors.toList());
		personRepository.updateAll(domains);
		return new ArrayList<MyCustomizeException>();
	}

	
}