package nts.uk.ctx.sys.auth.pubimp.grant;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.auth.dom.roleset.service.RoleSetService;
import nts.uk.ctx.sys.auth.pub.grant.RoleFromUserIdPub;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class RoleFromUserIdPubImpl implements RoleFromUserIdPub{

	@Inject
	private RoleIndividualGrantRepository roleIndRepo;
	
	@Inject
    private RoleSetService roleSetService;
    
    public String getRoleFromUserId(String userId, int roleType, GeneralDate baseDate){		
    	return getRoleFromUserId(userId, roleType, baseDate, AppContexts.user().companyId());
	}
    
    public String getRoleFromUserId(String userId, int roleType, GeneralDate baseDate, String companyId){
        val roleId = getRoleInfoFromUserId(userId, roleType, baseDate, companyId)
                .map(roleInfo -> roleInfo.getRoleId())
                .orElse("");
        return roleId;
    }
    
    public Optional <RoleInfoExport> getRoleInfoFromUserId(String userId, int roleType, GeneralDate baseDate, String companyId) {
		if (roleType == RoleType.SYSTEM_MANAGER.value || roleType == RoleType.GROUP_COMAPNY_MANAGER.value)
			companyId = "000000000000-0000";
		
    // 個人付与ロールを取得
    val roleIndOpt = roleIndRepo.findByUserCompanyRoleTypeDate(userId, companyId, roleType, baseDate);
    
    // 取得できれば、担当ロールとして取得できたロールIDを返す
    if (roleIndOpt.isPresent()) {
        return Optional.of(RoleInfoExport.asInCharge(roleIndOpt.get().getRoleId()));
        }
    // 付与されたロールセットを取得        
    val roleOpt = roleSetService.getRoleSetFromUserId(userId, baseDate, companyId);
    val roleId = roleOpt.map(roleSet -> roleSet.getRoleIDByRoleType(RoleType.valueOf(roleType)))
            .orElse("");

    //取得できれば、一般ロールとして取得できたロールIDを返す
    if(!roleId.isEmpty()) {
        return Optional.of(RoleInfoExport.asGeneral(roleId));
    }
    	return Optional.empty();
    }
    
}
