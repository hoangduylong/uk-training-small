package command.person.contact;

import java.util.ArrayList;
import javax.ejb.Stateless;
import javax.inject.Inject;

import command.person.personal.contact.EmergencyContactDto;
import command.person.personal.contact.OtherContactDto;
import command.person.personal.contact.PersonalContactDto;
import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContactRepository;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddPerContactCommandHandler extends CommandHandlerWithResult<AddPerContactCommand, PeregAddCommandResult>
		implements PeregAddCommandHandler<AddPerContactCommand> {

	@Inject
	private PersonalContactRepository personalContactRepository;

	@Override
	public String targetCategoryCd() {
		return "CS00022";
	}

	@Override
	public Class<?> commandClass() {
		return AddPerContactCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddPerContactCommand> context) {
		val command = context.getCommand();
		PersonalContactDto dto = PersonalContactDto.builder()
				.personalId(command.getPersonId())
				.mailAddress(command.getMailAdress())
				.mobileEmailAddress(command.getMobileMailAdress())
				.phoneNumber(command.getCellPhoneNumber())
				.emergencyContact1(EmergencyContactDto.builder()
						.contactName(command.getContactName1())
						.remark(command.getMemo1())
						.phoneNumber(command.getPhoneNumber1())
						.build())
				.emergencyContact2(EmergencyContactDto.builder()
						.contactName(command.getContactName2())
						.remark(command.getMemo2())
						.phoneNumber(command.getPhoneNumber2())
						.build())
				.otherContacts(new ArrayList<OtherContactDto>())
				.build();
		PersonalContact perContact = PersonalContact.createFromMemento(dto);
		personalContactRepository.insert(perContact);

		return new PeregAddCommandResult(command.getPersonId());
	}

}
