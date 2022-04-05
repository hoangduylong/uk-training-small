package nts.uk.ctx.sys.log.infra.entity.datacorrectionlog;

import java.math.BigDecimal;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


/**
 * 
 * @author HungTT
 *
 */

@Entity
@Table(name = "SRCDT_RAW_DECIMALVALUE")
@NoArgsConstructor
@AllArgsConstructor
public class SrcdtRawDecimalvalue extends ContractUkJpaEntity {

	@Id
	@Column(name = "ID")
	public String id;
	
	@Column(name = "VALUE")
	@Basic(optional = false)
	public BigDecimal value;

	@OneToOne(mappedBy = "rawDecimalValueBefore")
	public SrcdtDataCorrection beforeLog;

	@OneToOne(mappedBy = "rawDecimalValueAfter")
	public SrcdtDataCorrection afterLog;

	@Override
	protected Object getKey() {
		return this.id;
	}

}
