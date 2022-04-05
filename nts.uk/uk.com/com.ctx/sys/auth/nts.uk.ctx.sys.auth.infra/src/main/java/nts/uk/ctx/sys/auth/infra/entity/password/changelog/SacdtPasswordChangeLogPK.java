package nts.uk.ctx.sys.auth.infra.entity.password.changelog;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateTimeToDBConverter;
import nts.arc.time.GeneralDateTime;

@Embeddable
@Getter
@Setter
public class SacdtPasswordChangeLogPK implements Serializable {
	
	/** The Constant serialVersionUID. */
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	/** The user id. */
	@Column(name="USER_ID")
	private String userId;

	/** The login id. */
	@Column(name="LOG_ID")
	private String logId;

	/** The modified datetime. */
	@Column(name="MODIFIED_DATETIME")
	@Convert(converter = GeneralDateTimeToDBConverter.class)
	private GeneralDateTime modifiedDatetime;

	/**
	 * Instantiates a new sacdt password change log PK.
	 */
	public SacdtPasswordChangeLogPK() {
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof SacdtPasswordChangeLogPK)) {
			return false;
		}
		SacdtPasswordChangeLogPK castOther = (SacdtPasswordChangeLogPK)other;
		return 
			this.userId.equals(castOther.userId)
			&& this.logId.equals(castOther.logId)
			&& this.modifiedDatetime.equals(castOther.modifiedDatetime);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userId.hashCode();
		hash = hash * prime + this.logId.hashCode();
		hash = hash * prime + this.modifiedDatetime.hashCode();
		
		return hash;
	}
}