package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.loginlog;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateTimeToDBConverter;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


/**
 * The persistent class for the SGWDT_LOGIN_LOG database table.
 * 
 */
@Entity
@Table(name="SGWDT_LOGIN_LOG")
@Getter
@Setter
public class SgwdtLoginLog extends ContractUkJpaEntity implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The user id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_NUMBER")
	private long idNumber;
	
	/** The user id. */
	@Column(name="USER_ID")
	private String userId;

	/** The program id. */
	@Column(name="PROGRAM_ID")
	private String programId;
	
	/** The process date time. */
	@Column(name="PROCESS_DATE_TIME")
	@Convert(converter = GeneralDateTimeToDBConverter.class)
	private GeneralDateTime processDateTime;

	/** The operation section. */
	@Column(name="OPERATION_SECTION")
	private Integer operationSection;

	/** The success or failure. */
	@Column(name="SUCCESS_OR_FAILURE")
	private Integer successOrFailure;

	/**
	 * Instantiates a new sgwmt login log.
	 */
	public SgwdtLoginLog() {
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.idNumber;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + (int) (idNumber ^ (idNumber >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		SgwdtLoginLog other = (SgwdtLoginLog) obj;
		if (idNumber != other.idNumber)
			return false;
		return true;
	}
}