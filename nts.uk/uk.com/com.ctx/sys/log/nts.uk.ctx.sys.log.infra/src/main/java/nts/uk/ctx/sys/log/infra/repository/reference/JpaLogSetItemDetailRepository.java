package nts.uk.ctx.sys.log.infra.repository.reference;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.log.dom.reference.LogSetItemDetail;
import nts.uk.ctx.sys.log.dom.reference.LogSetItemDetailRepository;

/*
 * author: hiep.th
 */

@Stateless
public class JpaLogSetItemDetailRepository extends JpaRepository implements LogSetItemDetailRepository  {

	@Override
	public void add(LogSetItemDetail domain) {
		
	}
}
