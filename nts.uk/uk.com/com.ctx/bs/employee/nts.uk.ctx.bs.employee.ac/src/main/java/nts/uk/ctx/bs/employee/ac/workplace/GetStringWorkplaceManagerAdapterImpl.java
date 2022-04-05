package nts.uk.ctx.bs.employee.ac.workplace;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.adapter.GetStringWorkplaceManagerAdapter;
import nts.uk.ctx.sys.auth.pub.wkpmanager.GetStringWorkplaceManagerPub;


/**
 * 
 * @author HieuLt
 *
 */
@Stateless
public class GetStringWorkplaceManagerAdapterImpl implements GetStringWorkplaceManagerAdapter{
	

	@Inject
	private GetStringWorkplaceManagerPub pub;

	@Override
	public List<String> getAllWorkplaceID(String empID, GeneralDate baseDate) {
		 List<String> data = pub.getAllWorkplaceID(empID, baseDate);
		return data;
	}
	
}
