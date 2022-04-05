package nts.uk.ctx.bs.employee.infra.entity.department;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;

/**
 * 所属部門（兼務）
 * @author xuan vinh
 *
 */

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BSYMT_CURR_AFFI_DEPT_HIST")
public class BsymtCurrAffiDeptHist {

	
	@Id
	/** The end D. */
	@Column(name = "HIST_ID")
	private String historyId;
	
	/** The end D. */
	@Column(name = "START_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate strD;
	
	/** The end D. */
	@Column(name = "END_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate endD;
}
