package nts.uk.ctx.sys.portal.infra.entity.toppagesetting;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;
/**
 * 
 * @author hoatt
 *
 */
@Getter
@Setter
@Entity
@Table(name = "CJPMT_JOB_POSITION")
@AllArgsConstructor
@NoArgsConstructor
public class CjpmtJobPosition extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/** 主キー*/
	@EmbeddedId
	protected CjpmtJobPositionPK cjpmtJobPositionPK;
	
	/** 社員ID */
	@Column(name = "SID")
	private String employeeId;
	
	/** 職位ID */
	@Column(name = "JOBID")
	private String jobId;
	
	/** 開始日 */
	@Column(name = "START_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate startDate;

	/** 終了日 */
	@Column(name = "END_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate endDate;

	@Override
	protected Object getKey() {
		return cjpmtJobPositionPK;
	}
}
