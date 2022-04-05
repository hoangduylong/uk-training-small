package nts.uk.ctx.sys.env.app.command.sysusagesetfinder;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.env.dom.useatr.SysUsageRepository;
import nts.uk.ctx.sys.env.dom.useatr.SysUsageSet;
import nts.uk.shr.com.context.AppContexts;
/**
 * 
 * @author yennth
 *  
 */
@Stateless
public class DeleteSysUsageSetCommandHandler extends CommandHandler<DeleteSysUsageSetCommand>{
	@Inject
	private SysUsageRepository sysRep;

	@Override
	protected void handle(CommandHandlerContext<DeleteSysUsageSetCommand> context) {
		DeleteSysUsageSetCommand data = context.getCommand();
		String contractCd = AppContexts.user().contractCode();
		Optional<SysUsageSet> sys = sysRep.findUsageSet(data.getCompanyId());
		
		if(!sys.isPresent()){
			throw new BusinessException("対象データがありません。");
		}
		sysRep.deleteUsageSet(data.getCompanyId(), data.getCompanyCode(), contractCd);
	}
}
