/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.sequence;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;

@Getter
//序列
public class SequenceMaster extends AggregateRoot {

	/** The company id. */
	//会社ID
	private CompanyId companyId;

	/** The order. */
	//並び順
	private int order;

	/** The sequence code. */
	//序列コード
	private SequenceCode sequenceCode;

	/** The sequence name. */
	//序列名称
	private SequenceName sequenceName;

	/**
	 * Instantiates a new sequence master.
	 *
	 * @param memento
	 *            the memento
	 */
	public SequenceMaster(SequenceMasterGetMemento memento) {
		this.order = memento.getOrder();
		this.companyId = memento.getCompanyId();
		this.sequenceCode = memento.getSequenceCode();
		this.sequenceName = memento.getSequenceName();
	}

	/**
	 * Save to memento.
	 *
	 * @param memento
	 *            the memento
	 */
	public void saveToMemento(SequenceMasterSetMemento memento) {
		memento.setCompanyId(this.companyId);
		memento.setOrder(this.order);
		memento.setSequenceCode(this.sequenceCode);
		memento.setSequenceName(this.sequenceName);
	}
}
