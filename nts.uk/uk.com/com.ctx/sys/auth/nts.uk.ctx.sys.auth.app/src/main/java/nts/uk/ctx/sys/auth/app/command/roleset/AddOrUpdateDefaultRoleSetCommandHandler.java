/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.app.command.roleset;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.sys.auth.dom.roleset.DefaultRoleSet;
import nts.uk.ctx.sys.auth.dom.roleset.DefaultRoleSetRepository;
import nts.uk.shr.com.context.AppContexts;

/**
* The Class AddOrUpdateDefaultRoleSetCommandHandler.
* @author HieuNV
*/

@Stateless
@javax.transaction.Transactional
public class AddOrUpdateDefaultRoleSetCommandHandler extends CommandHandlerWithResult<DefaultRoleSetCommand, String> {

    @Inject
    private DefaultRoleSetRepository defaultRoleSetRepository;

    @Override
    protected String handle(CommandHandlerContext<DefaultRoleSetCommand> context) {
        DefaultRoleSetCommand command = context.getCommand();
        String companyId = AppContexts.user().companyId();
        DefaultRoleSet defaultRoleSetDom = new DefaultRoleSet(companyId, command.getRoleSetCd());
        this.defaultRoleSetRepository.addOrUpdate(defaultRoleSetDom);
        return command.getRoleSetCd();
    }
}
