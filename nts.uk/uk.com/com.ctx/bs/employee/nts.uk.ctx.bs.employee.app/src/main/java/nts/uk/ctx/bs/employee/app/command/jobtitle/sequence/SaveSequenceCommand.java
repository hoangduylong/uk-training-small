/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.jobtitle.sequence;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMaster;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceName;

/**
 * The Class SaveSequenceCommand.
 */
@Getter
@Setter
public class SaveSequenceCommand {

	/** The is create mode. */
	private Boolean isCreateMode;

	/** The order. */
	private int order;

	/** The sequence code. */
	private String sequenceCode;

	/** The sequence name. */
	private String sequenceName;

	/**
	 * To domain.
	 *
	 * @param companyId the company id
	 * @return the sequence master
	 */
	public SequenceMaster toDomain(String companyId) {
		return new SequenceMaster(new SequenceMasterGetMementoImpl(companyId, this));
	}

	/**
	 * The Class SequenceMasterGetMementoImpl.
	 */
	class SequenceMasterGetMementoImpl implements SequenceMasterGetMemento {

		/** The company id. */
		private String companyId;

		/** The command. */
		private SaveSequenceCommand command;

		/**
		 * Instantiates a new sequence master get memento impl.
		 *
		 * @param companyId the company id
		 * @param command the command
		 */
		public SequenceMasterGetMementoImpl(String companyId, SaveSequenceCommand command) {
			this.companyId = companyId;
			this.command = command;
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see
		 * nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceMasterGetMemento#
		 * getCompanyId()
		 */
		@Override
		public CompanyId getCompanyId() {
			return new CompanyId(this.companyId);
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see
		 * nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceMasterGetMemento#
		 * getSequenceCode()
		 */
		@Override
		public SequenceCode getSequenceCode() {
			return new SequenceCode(this.command.getSequenceCode());
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see
		 * nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceMasterGetMemento#
		 * getSequenceName()
		 */
		@Override
		public SequenceName getSequenceName() {
			return new SequenceName(this.command.getSequenceName());
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see
		 * nts.uk.ctx.bs.employee.dom.jobtitle.info.SequenceMasterGetMemento#
		 * getOrder()
		 */
		@Override
		public int getOrder() {
			return this.command.getOrder();
		}
	}
}
