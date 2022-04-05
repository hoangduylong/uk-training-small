package nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.care;

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
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="BSYMT_FAMILY_CARE")
public class BsymtFamilyCare extends ContractUkJpaEntity implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private BsymtFamilyCarePK bsymtFamilyCarePK;
	
	/** The sid. */
	@Column(name = "SID")
	private String sId;
	
	/** The FAMILY_MEMBER_ID. */
	@Column(name = "FAMILY_MEMBER_ID")
	private String familyMemberId;
	
	/** The str D. */
	@Column(name = "STR_D")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate strD;

	/** The SUPPORT_DISTINCTION. */
	@Column(name = "SUPPORT_DISTINCTION")
	private int supportDistinction;
	
	/** The end D. */
	@Column(name = "END_D")
	@Convert(converter = GeneralDateToDBConverter.class)
	private GeneralDate endD;
	
	@Override
	protected Object getKey() {
		return this.bsymtFamilyCarePK;
	}

}
