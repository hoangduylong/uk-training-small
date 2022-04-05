package nts.uk.ctx.bs.employee.infra.entity.workplace.assigned;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;

@Getter
@Setter
@Entity
@Table(name = "BSYMT_AFFI_WORKPLACE_HIST")
public class BsymtAssiWorkplaceHist {
	
	@Id
	/** The end D. */
	@Basic(optional = false)
	@Column(name = "HIST_ID")
	public String historyId;
	
	/** The end D. */
	@Basic(optional = false)
	@Column(name = "START_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	public GeneralDate strD;
	
	/** The end D. */
	@Basic(optional = false)
	@Column(name = "END_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	public GeneralDate endD;
	
}
