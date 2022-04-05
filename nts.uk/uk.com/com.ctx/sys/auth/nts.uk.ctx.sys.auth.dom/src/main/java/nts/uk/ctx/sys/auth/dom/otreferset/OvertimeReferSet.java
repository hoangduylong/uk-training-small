/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.otreferset;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class OvertimeHourReferSet.
 * @author NWS_HoangDD
 */
// 時間外労働時間参照設定
@Getter
public class OvertimeReferSet extends AggregateRoot{
	
	// 会社ID
	private String companyId;
	
	// 職場管理者参照
	private boolean referWkpAdmin;

	/**
	 * Instantiates a new overtime hour refer set.
	 *
	 * @param memento the memento
	 */
	public OvertimeReferSet(OvertimeReferSetGetMemento memento) {
		if (memento.getCompanyId() == null) {
			this.companyId = AppContexts.user().companyId();
		} else {
			this.companyId = memento.getCompanyId();
		}
		
		this.referWkpAdmin = memento.getReferWkpAdmin();
	}
	
	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(OvertimeReferSetSetMemento memento) {
		memento.setCompanyId(this.companyId);
		memento.setReferWkpAdmin(this.referWkpAdmin);
	}
	
	/* (non-Javadoc)
	 * @see nts.arc.layer.dom.DomainObject#validate()
	 */
	@Override
	public void validate() {
		super.validate();
	}
}

