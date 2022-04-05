package nts.uk.ctx.bs.employee.app.command.jobtitle.main;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.jobtitle.main.JobTitleMain;
import nts.uk.ctx.bs.employee.dom.jobtitle.main.JobTitleMainRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;
@Stateless
public class UpdateJobTitleMainCommandHandler extends CommandHandler<UpdateJobTitleMainCommand>
	implements PeregUpdateCommandHandler<UpdateJobTitleMainCommand>{

	@Inject
	private JobTitleMainRepository jobTitleMainRepository;
	@Override
	public String targetCategoryCd() {
		return "CS00009";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateJobTitleMainCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateJobTitleMainCommand> context) {
		val command = context.getCommand();
		
		JobTitleMain newJobTitleMain = JobTitleMain.creatFromJavaType(command.getJobTitleId(), command.getSid(), command.getHistoryId(), command.getStartDate(), command.getEndDate());
		
		jobTitleMainRepository.updateJobTitleMain(newJobTitleMain);
	}

}
