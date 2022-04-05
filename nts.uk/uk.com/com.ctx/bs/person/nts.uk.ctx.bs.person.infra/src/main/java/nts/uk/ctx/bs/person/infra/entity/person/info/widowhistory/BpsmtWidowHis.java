/**
 * 
 */
package nts.uk.ctx.bs.person.infra.entity.person.info.widowhistory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.entity.JpaEntity;
import nts.arc.time.GeneralDate;

/**
 * @author danpv
 *
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BPSMT_WIDOW_HIS")
public class BpsmtWidowHis extends JpaEntity {

	@Id
	@Column(name = "OLDER_WIDOW_ID")
	public String olderWidowId;

	@Column(name = "START_DATE")
	public GeneralDate startDate;

	@Column(name = "END_DATE")
	public GeneralDate endDate;

	@Column(name = "WIDOW_TYPE_ATR")
	public int widowTypeAtr;

	@Override
	protected Object getKey() {
		return olderWidowId;
	}

}
