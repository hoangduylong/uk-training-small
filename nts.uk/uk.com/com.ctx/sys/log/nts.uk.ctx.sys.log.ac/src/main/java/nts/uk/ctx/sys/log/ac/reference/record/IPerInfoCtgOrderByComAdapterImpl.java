package nts.uk.ctx.sys.log.ac.reference.record;

import java.util.HashMap;
import java.util.List;

/**
 *  author: thuongtv
 */

import javax.ejb.Stateless;
import javax.inject.Inject;
//import nts.uk.ctx.pereg.pub.person.info.ctg.IPerInfoCtgOrderByCompanyPub;
import nts.uk.ctx.sys.log.dom.reference.IPerInfoCtgOrderByComAdapter;

@Stateless
public class IPerInfoCtgOrderByComAdapterImpl implements IPerInfoCtgOrderByComAdapter {

//	@Inject
//	private IPerInfoCtgOrderByCompanyPub iPerInfoCtgOrderByCompanyPub;

	@Override
	public HashMap<Integer, HashMap<String, Integer>> getOrderList(List<String> categoryIds, List<String> itemDefinitionIds) {
		return null;//iPerInfoCtgOrderByCompanyPub.getOrderList(categoryIds, itemDefinitionIds);
	}

}
