/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.infra.entity.mailserver;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class SevmtMailServer.
 */
@Getter
@Setter
@Entity
@Table(name = "SEVMT_MAIL_SERVER")
public class SevmtMailServer extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The cid. */
	@Id
	@Column(name = "CID")
	private String cid;

	/** The use auth. */
	@Column(name = "USE_AUTH")
	private short useAuth;

	/** The encrypt method. */
	@Column(name = "ENCRYPT_METHOD")
	private short encryptMethod;

	/** The auth method. */
	@Column(name = "AUTH_METHOD")
	private short authMethod;

	/** The email auth. */
	@Column(name = "EMAIL_AUTH")
	private String emailAuth;

	/** The password. */
	@Column(name = "PASSWORD")
	private String password;

	/** The smtp server. */
	@Column(name = "SMTP_SERVER")
	private String smtpServer;

	/** The smtp port. */
	@Column(name = "SMTP_PORT")
	private int smtpPort;

	/** The pop use. */
	@Column(name = "POP_USE")
	private short popUse;

	/** The pop server. */
	@Column(name = "POP_SERVER")
	private String popServer;

	/** The pop port. */
	@Column(name = "POP_PORT")
	private Integer popPort;

	/** The imap use. */
	@Column(name = "IMAP_USE")
	private short imapUse;

	/** The imap server. */
	@Column(name = "IMAP_SERVER")
	private String imapServer;

	/** The imap port. */
	@Column(name = "IMAP_PORT")
	private Integer imapPort;

	/**
	 * Instantiates a new sevst mail server.
	 */
	public SevmtMailServer() {
		super();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
	 */
	@Override
	public int hashCode() {
		int hash = 0;
		hash += (cid != null ? cid.hashCode() : 0);
		return hash;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object object) {
		if (!(object instanceof SevmtMailServer)) {
			return false;
		}
		SevmtMailServer other = (SevmtMailServer) object;
		if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
			return false;
		}
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.cid;
	}

}
