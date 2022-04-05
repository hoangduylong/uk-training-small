/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.workplace.info;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.workplace.info.OutsideWorkplaceCode;
import nts.uk.ctx.bs.employee.dom.workplace.info.WkpCode;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceDisplayName;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceGenericName;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfo;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceName;

@Getter
@Setter
public class RegisterWorkplaceInfoCommand {

	/** The company id. */
	// 会社ID
	private String companyId;

	/** The history id. */
	// 履歴ID
	private String historyId;

	/** The workplace id. */
	// 職場ID
	private String workplaceId;

	/** The workplace code. */
	// 職場コード
	private String workplaceCode;

	/** The workplace name. */
	// 職場名称
	private String workplaceName;

	/** The wkp generic name. */
	// 職場総称
	private String wkpGenericName;

	/** The wkp display name. */
	// 職場表示名
	private String wkpDisplayName;

	/** The outside wkp code. */
	// 職場外部コード
	private String outsideWkpCode;

	/**
	 * To domain.
	 *
	 * @return the workplace info
	 */
	public WorkplaceInfo toDomain() {
		return new WorkplaceInfo(new WorkplaceInfoGetMementoImpl(this));
	}

	/**
	 * The Class WorkplaceInfoGetMementoImpl.
	 */
	public class WorkplaceInfoGetMementoImpl implements WorkplaceInfoGetMemento {

		/** The workplace info command. */
		private RegisterWorkplaceInfoCommand workplaceInfoCommand;

		/**
		 * Instantiates a new workplace info get memento impl.
		 *
		 * @param workplaceInfoCommand the workplace info command
		 */
		public WorkplaceInfoGetMementoImpl(RegisterWorkplaceInfoCommand workplaceInfoCommand) {
			this.workplaceInfoCommand = workplaceInfoCommand;
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getCompanyId()
		 */
		@Override
		public String getCompanyId() {
			return this.workplaceInfoCommand.getCompanyId();
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getHistoryId()
		 */
		@Override
		public String getHistoryId() {
			return this.workplaceInfoCommand.getHistoryId();
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getWorkplaceId()
		 */
		@Override
		public String getWorkplaceId() {
			return this.workplaceInfoCommand.getWorkplaceId();
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getWorkplaceCode()
		 */
		@Override
		public WkpCode getWorkplaceCode() {
			return new WkpCode(this.workplaceInfoCommand.getWorkplaceCode());
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getWorkplaceName()
		 */
		@Override
		public WorkplaceName getWorkplaceName() {
			return new WorkplaceName(this.workplaceInfoCommand.getWorkplaceName());
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getWkpGenericName()
		 */
		@Override
		public WorkplaceGenericName getWkpGenericName() {
			return new WorkplaceGenericName(this.workplaceInfoCommand.getWkpGenericName());
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getWkpDisplayName()
		 */
		@Override
		public WorkplaceDisplayName getWkpDisplayName() {
			return new WorkplaceDisplayName(this.workplaceInfoCommand.getWkpDisplayName());
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#getOutsideWkpCode()
		 */
		@Override
		public OutsideWorkplaceCode getOutsideWkpCode() {
			if (this.workplaceInfoCommand.getOutsideWkpCode() == null
					|| this.workplaceInfoCommand.getOutsideWkpCode().isEmpty()) {
				return null;
			}
			return new OutsideWorkplaceCode(this.workplaceInfoCommand.getOutsideWkpCode());
		}

	}
}
