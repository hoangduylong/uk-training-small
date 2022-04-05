/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.workplace;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.workplace.master.WorkplacePub;
import nts.uk.ctx.sys.gateway.dom.adapter.syworkplace.GwSyWorkplaceAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.syworkplace.SWkpHistImport;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class SyWorkplaceAdapterImpl.
 */
@Stateless
public class GwSyWorkplaceAdapterImpl implements GwSyWorkplaceAdapter{
	
	/** The sy workplace pub. */
//	@Inject
//	private SyWorkplacePub syWorkplacePub;
	
	@Inject
	private WorkplacePub workplacePub;

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.syworkplace.SyWorkplaceAdapter#findBySid(java.lang.String, nts.arc.time.GeneralDate)
	 */
	@Override
	public Optional<SWkpHistImport> findBySid(String companyId, String employeeId, GeneralDate baseDate) {
		return this.workplacePub.findBySidNew(companyId, employeeId, baseDate)
				.map(c -> new SWkpHistImport(c.getWorkplaceId(), c.getWorkplaceName()));
	}
	
}
