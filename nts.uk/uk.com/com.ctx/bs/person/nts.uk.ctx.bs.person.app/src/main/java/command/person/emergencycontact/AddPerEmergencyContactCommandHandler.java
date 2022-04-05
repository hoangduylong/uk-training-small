package command.person.emergencycontact;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.person.dom.person.emergencycontact.PersonEmergencyContact;
import nts.uk.ctx.bs.person.dom.person.emergencycontact.PersonEmergencyCtRepository;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddPerEmergencyContactCommandHandler extends CommandHandlerWithResult<AddPerEmergencyContactCommand,PeregAddCommandResult>
 	implements PeregAddCommandHandler<AddPerEmergencyContactCommand>{

	@Inject
	private PersonEmergencyCtRepository perEmergencyContact;
	
	@Override
	public String targetCategoryCd() {
		return null;
	}

	@Override
	public Class<?> commandClass() {
		return AddPerEmergencyContactCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddPerEmergencyContactCommand> context) {
		val command = context.getCommand();
		// Create new id
		String newId = IdentifierUtil.randomUniqueId();
		
		PersonEmergencyContact emergencyContact = PersonEmergencyContact.createFromJavaType(newId, command.getPid(), command.getPersonName(),
				command.getPersonMailAddress(), command.getStreetAddressPerson(), command.getPhone(), command.getPriorityEmegencyContact(), command.getRelationShip());
		
		// Add person emergency contact
		
		perEmergencyContact.addPersonEmergencyContact(emergencyContact);
		
		return new PeregAddCommandResult(newId);
	}

}
