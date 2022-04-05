package nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.socialinsurance;

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
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="BSYMT_FAMILY_SOCIAL_IN")
public class BsymtFamilySocialInsurance extends ContractUkJpaEntity implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	private BsymtFamilySocialInsurancePK bsymtFamilySocialInsurancePK;
	
	/** The sid. */
	@Column(name = "SID")
	private String sId;
	
	/** The FAMILY_MEMBER_ID. */
	@Column(name = "FAMILY_MEMBER_ID")
	private String familyMemberId;
	
	/** The BASIC_PENSION_NUMBER. */
	@Column(name = "BASIC_PENSION_NUMBER")
	private String basicPerNumber;
	
	/** The str D. */
	@Column(name = "STR_D")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate strD;

	/** The end D. */
	@Column(name = "END_D")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate endD;
	
	/** The NURSING_CARE. */
	@Column(name = "NURSING_CARE")
	private int nursingCare;
	
	/** The NATIONAL_PEN_NO3. */
	@Column(name = "NATIONAL_PEN_NO3")
	private int nationalPenNo3;
	
	/** The HEALTH_INS_DEP. */
	@Column(name = "HEALTH_INS_DEP")
	private int healthInsDep;

	@Override
	protected Object getKey() {
		return this.bsymtFamilySocialInsurancePK;
	}

}
