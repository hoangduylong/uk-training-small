package command.person.family;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMember;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMemberRepository;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddFamilyCommandHandler extends CommandHandlerWithResult<AddFamilyCommand,PeregAddCommandResult> 
implements PeregAddCommandHandler<AddFamilyCommand>{
	@Inject 
	private FamilyMemberRepository familyRepository;

	@Override
	public String targetCategoryCd() {
		return "CS00004";
	}

	@Override
	public Class<?> commandClass() {
		return AddFamilyCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddFamilyCommand> context) {
		
		val command = context.getCommand();
		// Create new Id
		String newId = IdentifierUtil.randomUniqueId();
		
		FamilyMember family = FamilyMember.createFromJavaType(newId, command.getPersonId(),
				command.getFullName(), command.getFullNameKana(), 
				command.getNameRomajiFull(), command.getNameRomajiFullKana(),
				command.getNameMultiLangFull(), command.getNameMultiLangFullKana(), 
				command.getTokodekeName(),"",
				command.getBirthday(), 
				command.getDeadDay(), 
				command.getEntryDate(),
				command.getExpelledDate(),
				command.getRelationship());
		
		// Add family
		familyRepository.addFamily(family);
		
		return new PeregAddCommandResult(newId);
	}
}
