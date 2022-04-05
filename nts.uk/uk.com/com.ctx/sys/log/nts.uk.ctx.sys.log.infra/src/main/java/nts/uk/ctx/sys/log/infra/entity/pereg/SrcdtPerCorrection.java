package nts.uk.ctx.sys.log.infra.entity.pereg;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SRCDT_PER_CORRECTION")
public class SrcdtPerCorrection extends ContractUkJpaEntity {

	@Column(name = "CID")
	@Basic(optional = false)
	public String companyId;

	@Id
	@Column(name = "PER_CORRECTION_LOG_ID")
	@Basic(optional = false)
	public String perCorrectionLogID;

	@Column(name = "OPERATION_ID")
	@Basic(optional = false)
	public String operationID;

	@Column(name = "PROCESSING_ATTR")
	@Basic(optional = false)
	public Integer processingAttr;

	@Column(name = "USER_ID")
	@Basic(optional = false)
	public String userID;

	@Column(name = "SID")
	@Basic(optional = true)
	public String employeeID;

	@Column(name = "USER_NAME")
	@Basic(optional = false)
	public String userName;

	@Column(name = "REMARK")
	@Basic(optional = true)
	public String remark;

	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return perCorrectionLogID;
	}

}
