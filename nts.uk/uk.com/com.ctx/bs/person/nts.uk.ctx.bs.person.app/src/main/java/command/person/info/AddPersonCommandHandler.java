package command.person.info;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddPersonCommandHandler extends CommandHandlerWithResult<AddPersonCommand,PeregAddCommandResult>
	implements PeregAddCommandHandler<AddPersonCommand>{

	@Inject
	private PersonRepository personRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00002";
	}

	@Override
	public Class<?> commandClass() {
		return AddPersonCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddPersonCommand> context) {
		
		val command = context.getCommand();
		
		Person newPerson = Person.createFromJavaType(command.getBirthDate(),command.getBloodType()!= null? command.getBloodType().intValue(): null,command.getGender()!= null?command.getGender().intValue():1,command.getPersonId() ,
				command.getBusinessName(),command.getBusinessNameKana(),command.getPersonName(),command.getPersonNameKana(),command.getBusinessOtherName(),command.getBusinessEnglishName(),
				command.getPersonRomanji(),command.getPersonRomanjiKana(),command.getTodokedeFullName(),command.getTodokedeFullNameKana(),command.getOldName(),command.getOldNameKana(),
				command.getPersonalNameMultilingual(),command.getPersonalNameMultilingualKana());
		
		personRepository.addNewPerson(newPerson);
		
		return new PeregAddCommandResult(command.getPersonId());
	}

}
