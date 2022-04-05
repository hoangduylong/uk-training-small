package nts.uk.ctx.sys.gateway.dom.outage.company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import nts.arc.layer.dom.objecttype.DomainAggregate;
import nts.uk.ctx.sys.gateway.dom.outage.PlannedOutage;
import nts.uk.ctx.sys.gateway.dom.outage.PlannedOutageState;

/**
 * 会社単位の利用停止の設定
 */
@AllArgsConstructor
@Getter
public class PlannedOutageByCompany implements PlannedOutage, DomainAggregate {

	private final String companyId;
	
	private PlannedOutageState state;
	
	public void setState(@NonNull PlannedOutageState newState) {
		state = newState;
	}
}
