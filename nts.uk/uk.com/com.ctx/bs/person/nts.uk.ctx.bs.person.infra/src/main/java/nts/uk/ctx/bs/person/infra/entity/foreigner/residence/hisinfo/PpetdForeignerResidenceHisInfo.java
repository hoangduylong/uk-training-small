/**
 * 
 */
package nts.uk.ctx.bs.person.infra.entity.foreigner.residence.hisinfo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.entity.type.GeneralDateTimeToDBConverter;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 *
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PPEDT_ZAIRYU_HIST_HIST")
public class PpetdForeignerResidenceHisInfo extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public PpetdForeignerResidenceHisInfoPk key;

	@Column(name = "PID")
	public String pId;

	@Column(name = "START_DATE")
	@Convert(converter = GeneralDateTimeToDBConverter.class)
	public GeneralDateTime startDate;

	@Column(name = "END_DATE")
	@Convert(converter = GeneralDateTimeToDBConverter.class)
	public GeneralDateTime endDate;

	@Override
	protected Object getKey() {
		return key;
	}
}

