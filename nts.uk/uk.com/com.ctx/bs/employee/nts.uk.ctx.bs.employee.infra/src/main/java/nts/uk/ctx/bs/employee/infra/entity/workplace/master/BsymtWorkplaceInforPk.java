package nts.uk.ctx.bs.employee.infra.entity.workplace.master;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 
 * @author HungTT
 *
 */
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BsymtWorkplaceInforPk {

	@Column(name = "CID")
	public String companyId;

	@Column(name = "WKP_HIST_ID")
	public String workplaceHistoryId;

	@Column(name = "WKP_ID")
	public String workplaceId;

}
