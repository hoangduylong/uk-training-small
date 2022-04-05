package command.person.family;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMember;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMemberRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateFamilyCommandHandler extends CommandHandler<UpdateFamilyCommand> 
implements PeregUpdateCommandHandler<UpdateFamilyCommand>{
	@Inject 
	private FamilyMemberRepository familyRepository;

	@Override
	public String targetCategoryCd() {
		return "CS00004";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateFamilyCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateFamilyCommand> context) {
		
		val command = context.getCommand();
		
		FamilyMember family= FamilyMember.createFromJavaType(command.getFamilyId(), command.getPersonId(),
				command.getFullName(), command.getFullNameKana(), 
				command.getNameRomajiFull(), command.getNameRomajiFullKana(),
				command.getNameMultiLangFull(), command.getNameMultiLangFullKana(), 
				command.getTokodekeName(),"",
				command.getBirthday(), 
				command.getDeadDay(), 
				command.getEntryDate(),
				command.getExpelledDate(),
				command.getRelationship());
		
		// Update family
		familyRepository.updateFamily(family);
	}
}
