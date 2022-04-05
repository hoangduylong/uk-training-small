package entity.employeeinfo.setting.code;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BSYMT_SYAINCD_EDIT")
public class BsymtEmployeeCESetting extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private BsymtEmployeeCESettingPk bsymtEmployeeCESettingPk;

	@Basic(optional = false)
	@Column(name = "CODE_EDIT_METHOD_ATR")
	private int ceMethodAtr;

	@Basic(optional = false)
	@Column(name = "DIGIT_NUM")
	private int digitNumb;

	@Override
	protected Object getKey() {
		return this.bsymtEmployeeCESettingPk;
	}
}
