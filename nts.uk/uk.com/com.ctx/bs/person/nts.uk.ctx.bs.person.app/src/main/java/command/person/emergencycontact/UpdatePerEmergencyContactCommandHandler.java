package command.person.emergencycontact;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.person.dom.person.emergencycontact.PersonEmergencyContact;
import nts.uk.ctx.bs.person.dom.person.emergencycontact.PersonEmergencyCtRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdatePerEmergencyContactCommandHandler extends CommandHandler<UpdatePerEmergencyContactCommand>
 	implements PeregUpdateCommandHandler<UpdatePerEmergencyContactCommand>{

	@Inject
	private PersonEmergencyCtRepository perEmergencyContact;
	
	@Override
	public String targetCategoryCd() {
		return null;
	}

	@Override
	public Class<?> commandClass() {
		return UpdatePerEmergencyContactCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdatePerEmergencyContactCommand> context) {
		val command = context.getCommand();
		
		PersonEmergencyContact emergencyContact = PersonEmergencyContact.createFromJavaType(command.getEmgencyContactId(), command.getPid(), command.getPersonName(),
				command.getPersonMailAddress(), command.getStreetAddressPerson(), command.getPhone(), command.getPriorityEmegencyContact(), command.getRelationShip());
		
		// Update person emergency contact
		
		perEmergencyContact.updatePersonEmergencyContact(emergencyContact);
	}

}
