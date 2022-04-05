package command.person.contact;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;
import command.person.personal.contact.EmergencyContactDto;
import command.person.personal.contact.OtherContactDto;
import command.person.personal.contact.PersonalContactDto;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContactRepository;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregUpdateListCommandHandler;


@Stateless
public class UpdatePerContactListCommandHandler
		extends CommandHandlerWithResult<List<UpdatePerContactCommand>, List<MyCustomizeException>>
		implements PeregUpdateListCommandHandler<UpdatePerContactCommand> {
	@Inject
	private PersonalContactRepository personalContactRepository;

	@Override
	public String targetCategoryCd() {
		return "CS00022";
	}

	@Override
	public Class<?> commandClass() {
		return UpdatePerContactCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<UpdatePerContactCommand>> context) {
		List<UpdatePerContactCommand> cmd = context.getCommand();
		List<PersonalContact> domains = cmd.stream().map(c -> {
			PersonalContactDto dto = PersonalContactDto.builder()
					.personalId(c.getPersonId())
					.mailAddress(c.getMailAdress())
					.mobileEmailAddress(c.getMobileMailAdress())
					.phoneNumber(c.getCellPhoneNumber())
					.emergencyContact1(EmergencyContactDto.builder()
							.contactName(c.getContactName1())
							.remark(c.getMemo1())
							.phoneNumber(c.getPhoneNumber1())
							.build())
					.emergencyContact2(EmergencyContactDto.builder()
							.contactName(c.getContactName2())
							.remark(c.getMemo2())
							.phoneNumber(c.getPhoneNumber2())
							.build())
					.otherContacts(new ArrayList<OtherContactDto>())
					.build();
			return PersonalContact.createFromMemento(dto);
		}).collect(Collectors.toList());
		// Update person emergency contact
		personalContactRepository.updateAll(domains);
		return new ArrayList<MyCustomizeException>();
	}

}
