package nts.uk.ctx.sys.env.app.command.sysusagesetfinder;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.env.dom.useatr.SysUsageRepository;
import nts.uk.ctx.sys.env.dom.useatr.SysUsageSet;

/**
 * update a company infor item
 * @author yennth
 */
@Stateless
public class UpdateSysUsageSetCommandHandler extends CommandHandler<UpdateSysUsageSetCommand>{
	@Inject
	private SysUsageRepository sysRep;

	@Override
	protected void handle(CommandHandlerContext<UpdateSysUsageSetCommand> context) {
		UpdateSysUsageSetCommand data = context.getCommand();
		
		SysUsageSet sysDom = SysUsageSet.createFromJavaType(data.getCompanyId(), data.getJinji(), 
															data.getShugyo(), data.getKyuyo());
		sysRep.updateUsageSet(sysDom);
	}
}
