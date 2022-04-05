package nts.uk.ctx.sys.auth.pubimp.wkpmanager;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManager;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManagerRepository;
import nts.uk.ctx.sys.auth.pub.wkpmanager.GetStringWorkplaceManagerPub;

/** 
 * @author HieuLt
 */

@Stateless
public class GetStringWorkplaceManagerPubImpl implements GetStringWorkplaceManagerPub{

	@Inject
	private WorkplaceManagerRepository repo;
	@Override
	public List<String> getAllWorkplaceID(String empId, GeneralDate baseDate) {	
		List<WorkplaceManager> data = repo.findListWkpManagerByEmpIdAndBaseDate(empId, baseDate);
		
		if(data.isEmpty()){
			return Collections.emptyList();
		}
		List<String> result = data.stream().map(c -> c.getWorkplaceId()).collect(Collectors.toList());
		return result;
	}

}
