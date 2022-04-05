/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.infra.entity.password.changelog;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


@Entity
@Table(name="SACDT_PASSWORD_CHANGE_LOG")
@Getter
@Setter
public class SacdtPasswordChangeLog extends ContractUkJpaEntity implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The sacdt password change log PK. */
	@EmbeddedId
	private SacdtPasswordChangeLogPK sacdtPasswordChangeLogPK;


	/** The password. */
	@Column(name="PASSWORD")
	private String password;

	/**
	 * Instantiates a new sacdt password change log.
	 */
	public SacdtPasswordChangeLog() {
		
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.sacdtPasswordChangeLogPK;
	}

	/**
	 * Instantiates a new sacdt password change log.
	 *
	 * @param sacdtPasswordChangeLogPK the sacdt password change log PK
	 */
	public SacdtPasswordChangeLog(SacdtPasswordChangeLogPK sacdtPasswordChangeLogPK) {
		super();
		this.sacdtPasswordChangeLogPK = sacdtPasswordChangeLogPK;
	}

}