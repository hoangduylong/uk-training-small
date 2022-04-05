/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.repository.singlesignon;

import nts.uk.ctx.sys.gateway.dom.singlesignon.HostName;
import nts.uk.ctx.sys.gateway.dom.singlesignon.UseAtr;
import nts.uk.ctx.sys.gateway.dom.singlesignon.UserName;
import nts.uk.ctx.sys.gateway.dom.singlesignon.WindowsAccountInfoGetMemento;
import nts.uk.ctx.sys.gateway.infra.entity.singlesignon.SgwmtSsoWinAcc;
import nts.uk.ctx.sys.gateway.infra.entity.singlesignon.SgwmtWindowAccPK;

/**
 * The Class JpaWindowAccountGetMemento.
 */
public class JpaWindowAccountInfoGetMemento implements WindowsAccountInfoGetMemento{
	
	/** The typed value. */
	private SgwmtSsoWinAcc typedValue;
	
	/**
	 * Instantiates a new jpa window account get memento.
	 *
	 * @param typedValue the typed value
	 */
	public JpaWindowAccountInfoGetMemento(SgwmtSsoWinAcc typedValue) {
		this.typedValue = typedValue;
		if (this.typedValue.getSgwmtWindowAccPK() == null) {
			this.typedValue.setSgwmtWindowAccPK(new SgwmtWindowAccPK());
		}
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.singlesignon.WindowAccountGetMemento#getHotName()
	 */
	@Override
	public HostName getHostName() {
		return new HostName(this.typedValue.getHostName());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.singlesignon.WindowAccountGetMemento#getUserName()
	 */
	@Override
	public UserName getUserName() {
		return new UserName(this.typedValue.getUserName());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.singlesignon.WindowAccountGetMemento#getUseAtr()
	 */
	@Override
	public UseAtr getUseAtr() {
		return UseAtr.valueOf(this.typedValue.getUseAtr());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.singlesignon.WindowAccountGetMemento#getNo()
	 */
	@Override
	public Integer getNo() {
		return this.typedValue.getSgwmtWindowAccPK().getNo();
	}

}
