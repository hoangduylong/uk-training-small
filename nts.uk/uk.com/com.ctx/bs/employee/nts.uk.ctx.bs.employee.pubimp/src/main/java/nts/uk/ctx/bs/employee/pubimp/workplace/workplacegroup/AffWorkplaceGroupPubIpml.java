package nts.uk.ctx.bs.employee.pubimp.workplace.workplacegroup;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.pub.workplace.workplacegroup.AffWorkplaceGroupExport;
import nts.uk.ctx.bs.employee.pub.workplace.workplacegroup.AffWorkplaceGroupPub;

/**
 * 勤務予定Publish
 */
@Stateless
public class AffWorkplaceGroupPubIpml implements AffWorkplaceGroupPub {

	@Inject
	private AffWorkplaceGroupRespository repo;

	@Override
	public List<AffWorkplaceGroupExport> getByListWkpIds(String cid, List<String> wkpIds) {

		List<AffWorkplaceGroup> data = repo.getByListWKPID(cid, wkpIds);

		return data.stream().map(x -> new AffWorkplaceGroupExport(x.getWorkplaceGroupId(), x.getWorkplaceId())).collect(Collectors.toList());
	}

}

