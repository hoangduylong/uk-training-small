package nts.uk.ctx.sys.log.infra.repository.reference;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.log.dom.reference.LogSetOutputItem;
import nts.uk.ctx.sys.log.dom.reference.LogSetOutputItemRepository;

/*
 * author: hiep.th
 */

@Stateless
public class JpaLogSetOutputItemRepository extends JpaRepository implements LogSetOutputItemRepository  {

	@Override
	public void add(LogSetOutputItem domain) {
		
	}
	
}
