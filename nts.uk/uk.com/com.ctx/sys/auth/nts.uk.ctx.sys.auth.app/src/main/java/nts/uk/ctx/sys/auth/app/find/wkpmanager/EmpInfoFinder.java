package nts.uk.ctx.sys.auth.app.find.wkpmanager;

import java.util.Collections;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.auth.dom.wkpmanager.EmpInfoAdapter;
import nts.uk.ctx.sys.auth.dom.wkpmanager.dom.EmpBasicInfoImport;

@Stateless
public class EmpInfoFinder {

	// Adapter
	@Inject
	private EmpInfoAdapter adapter;

	public List<EmpBasicInfoImport> getEmployeeInfoList(List<String> sidList) {
		List<EmpBasicInfoImport> empList = this.adapter.getListPersonInfo(sidList);
		if(CollectionUtil.isEmpty(empList))
			return Collections.emptyList();
		return empList;
	}
}
