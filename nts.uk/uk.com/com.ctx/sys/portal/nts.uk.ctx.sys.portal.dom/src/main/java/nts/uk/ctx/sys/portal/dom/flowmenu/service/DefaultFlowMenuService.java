package nts.uk.ctx.sys.portal.dom.flowmenu.service;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenu;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenuRepository;

/**
 * @author HieuLT
 */
@Stateless
public class DefaultFlowMenuService implements FlowMenuService {

	@Inject
	private FlowMenuRepository flowMenuRepository;
	
	@Override
	public boolean isExist(String companyID, String toppagePartID) {
		Optional<FlowMenu> flowMenu = flowMenuRepository.findByCode(companyID, toppagePartID);
		return flowMenu.isPresent();
	}

	@Override
	public void createFlowMenu(FlowMenu flowMenu) {
		Optional<FlowMenu> optFlowMenu = flowMenuRepository.findByToppagePartCodeAndType(
				flowMenu.getCompanyID(),
				flowMenu.getCode().v(),
				0);
		if (optFlowMenu.isPresent()) {
			throw new BusinessException("Msg_3");
		}
		flowMenuRepository.add(flowMenu);
	}
	

	@Override
	public void updateFlowMenu(FlowMenu flowMenu) {
		flowMenuRepository.update(flowMenu);
	}

	@Override
	public void deleteFlowMenu(String companyID, String toppagePartID ) {
		if (isExist(companyID, toppagePartID)) {
			flowMenuRepository.remove(companyID, toppagePartID);
		}
	}

}