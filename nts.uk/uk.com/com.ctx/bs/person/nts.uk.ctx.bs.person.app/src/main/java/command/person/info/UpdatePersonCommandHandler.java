package command.person.info;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;


@Stateless
public class UpdatePersonCommandHandler extends CommandHandler<UpdatePersonCommand>
	implements PeregUpdateCommandHandler<UpdatePersonCommand>{

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
	protected void handle(CommandHandlerContext<UpdatePersonCommand> context) {
		
		val command = context.getCommand();

		Person newPerson = Person.createFromJavaType(command.getBirthDate(),command.getBloodType()!= null?command.getBloodType().intValue(): null,command.getGender()!=null?command.getGender().intValue():ConstantUtils.ENUM_UNDEFINE_VALUE,command.getPersonId(),
				command.getBusinessName(),command.getBusinessNameKana(),command.getPersonName(),command.getPersonNameKana(),command.getBusinessOtherName(),command.getBusinessEnglishName(),
				command.getPersonRomanji(),command.getPersonRomanjiKana(),command.getTodokedeFullName(),command.getTodokedeFullNameKana(),command.getOldName(),command.getOldNameKana(),
				command.getPersonalNameMultilingual(),command.getPersonalNameMultilingualKana());
		
		personRepository.update(newPerson);
	}

}
