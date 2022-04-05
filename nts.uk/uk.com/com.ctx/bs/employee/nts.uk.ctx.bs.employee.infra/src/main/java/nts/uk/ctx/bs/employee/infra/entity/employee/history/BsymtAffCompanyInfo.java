package nts.uk.ctx.bs.employee.infra.entity.employee.history;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumns;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BSYMT_AFF_COM_HIST_ITEM")
public class BsymtAffCompanyInfo extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public BsymtAffCompanyInfoPk bsymtAffCompanyInfoPk;
	
	/** SID */
	@Column(name = "SID")
	public String sid;

	@Column(name = "RECRUIMENT_CATEGORY_CD")
	public String recruitmentCategoryCode;

	@Column(name = "ADOPTION_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	public GeneralDate adoptionDate;

	@Column(name = "RETIREMENT_CALC_STR_D")
	@Convert(converter = GeneralDateToDBConverter.class)
	public GeneralDate retirementAllowanceCalcStartDate;

    @OneToOne(optional = false)
    @PrimaryKeyJoinColumns({ @PrimaryKeyJoinColumn(name = "HIST_ID", referencedColumnName = "HIST_ID") })
	public BsymtAffCompanyHist bpsdtAffCompanyHist;

	@Override
	protected Object getKey() {
		return bsymtAffCompanyInfoPk;
	}
}
