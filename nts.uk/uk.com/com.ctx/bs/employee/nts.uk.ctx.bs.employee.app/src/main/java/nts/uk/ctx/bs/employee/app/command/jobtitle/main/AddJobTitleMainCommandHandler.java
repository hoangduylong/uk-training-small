package nts.uk.ctx.bs.employee.app.command.jobtitle.main;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.employee.dom.jobtitle.main.JobTitleMain;
import nts.uk.ctx.bs.employee.dom.jobtitle.main.JobTitleMainRepository;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;
@Stateless
public class AddJobTitleMainCommandHandler extends CommandHandlerWithResult<AddJobTitleMainCommand, PeregAddCommandResult>
	implements PeregAddCommandHandler<AddJobTitleMainCommand>{

	@Inject
	private JobTitleMainRepository jobTitleMainRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00009";
	}

	@Override
	public Class<?> commandClass() {
		return AddJobTitleMainCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddJobTitleMainCommand> context) {
		val command = context.getCommand();
		
		String jobTitleId = IdentifierUtil.randomUniqueId();
		String jobtitleHst = IdentifierUtil.randomUniqueId();
		
		JobTitleMain newJobTitleMain = JobTitleMain.creatFromJavaType(jobTitleId, command.getSid(), jobtitleHst, command.getStartDate(), command.getEndDate());
		
		jobTitleMainRepository.addJobTitleMain(newJobTitleMain);
		
		return new PeregAddCommandResult(jobTitleId);
	}

}
