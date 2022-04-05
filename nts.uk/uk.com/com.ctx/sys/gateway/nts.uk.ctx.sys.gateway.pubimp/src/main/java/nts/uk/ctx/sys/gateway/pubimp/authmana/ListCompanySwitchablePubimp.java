package nts.uk.ctx.sys.gateway.pubimp.authmana;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.gateway.dom.company.CollectCompanyList;
import nts.uk.ctx.sys.gateway.pub.authmana.ListCompanySwitchablePub;
@Stateless
public class ListCompanySwitchablePubimp implements ListCompanySwitchablePub{

	@Inject
	private CollectCompanyList collectComList;
	
	@Override
	public List<String> getCompanyList(String userID, String contractCd) {
		return collectComList.getCompanyList(userID, contractCd);
	}

}
