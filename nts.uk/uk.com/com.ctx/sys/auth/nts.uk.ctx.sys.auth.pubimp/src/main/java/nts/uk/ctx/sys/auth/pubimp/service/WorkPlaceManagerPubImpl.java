/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pubimp.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManager;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManagerRepository;
import nts.uk.ctx.sys.auth.pub.service.WorkPlaceManagerPub;

/**
 * The Class WorkPlaceManagerPubImpl.
 */
@Stateless
public class WorkPlaceManagerPubImpl implements WorkPlaceManagerPub {

	/** The workplace manager repository. */
	@Inject
	private WorkplaceManagerRepository workplaceManagerRepository;
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.auth.pub.service.WorkPlaceManagerPub#getWkpManagerByEmpIdAndBaseDate(java.lang.String, nts.arc.time.GeneralDate)
	 */
	@Override
	public List<String> getWkpManagerByEmpIdAndBaseDate(String sid, GeneralDate baseDate) {
		List<WorkplaceManager> lstWkpMng = workplaceManagerRepository.findListWkpManagerByEmpIdAndBaseDate(sid,
				baseDate);
		return lstWkpMng.stream().map(item -> item.getWorkplaceId()).collect(Collectors.toList());
	}
}
