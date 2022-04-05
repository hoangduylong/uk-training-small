package nts.uk.ctx.sys.portal.app.command.standardmenu;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.shr.com.context.AppContexts;
@Stateless
@Transactional
/**
 * 
 * @author yennth
 * The class UpdateStandardMenuCommandHandler 
 */
public class UpdateStandardMenuCommandHandler extends CommandHandler<UpdateStandardMenuCommand> {

	@Inject
	private StandardMenuRepository standardMenuRepository;

	@Override
	protected void handle(CommandHandlerContext<UpdateStandardMenuCommand> context) {
		List<StandardMenu> lstStandardMenu = new ArrayList<>();
		UpdateStandardMenuCommand update = context.getCommand();
		String companyId = AppContexts.user().companyId();
		List<StandardMenuCommand> standardMenus = update.getStandardMenus();
		for(StandardMenuCommand obj : standardMenus){
			StandardMenu o = StandardMenu.updateName(companyId, obj.getClassification(), obj.getCode(), 
					obj.getDisplayName(), obj.getSystem());
			if(o.getDisplayName() == null || o.getDisplayName().v().equals(""))
			{
				throw new BusinessException("");
			}
			else
				lstStandardMenu.add(o);
		}		
		standardMenuRepository.changeName(lstStandardMenu);
	}
}
