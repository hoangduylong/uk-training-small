/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.entity.singlesignon;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


/**
 * The Class SgwmtSsoWinAcc.
 */
@Setter
@Getter
@Entity
@Table(name="SGWMT_SSO_WIN_ACC")
public class SgwmtSsoWinAcc extends ContractUkJpaEntity implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The sgwmt window acc PK. */
	@EmbeddedId
	private SgwmtWindowAccPK sgwmtWindowAccPK;
		
	/** The host name. */
	@Column(name="HOST_NAME")
	private String hostName;

	/** The user name. */
	@Column(name="USER_NAME")
	private String userName;

	/** The use atr. */
	@Column(name="USE_ATR")
	private Integer useAtr;
	

	/**
	 * Instantiates a new sgwmt window acc.
	 */
	public SgwmtSsoWinAcc() {
		super();
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.sgwmtWindowAccPK;
	}
	
}