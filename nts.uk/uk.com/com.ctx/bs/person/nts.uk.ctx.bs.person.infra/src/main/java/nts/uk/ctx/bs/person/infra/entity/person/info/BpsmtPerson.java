package nts.uk.ctx.bs.person.infra.entity.person.info;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BPSMT_PERSON")
public class BpsmtPerson extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	@EmbeddedId
	public BpsmtPersonPk bpsmtPersonPk;

	@Basic(optional = false)
	@Column(name = "BIRTHDAY")
	public GeneralDate birthday;

	@Basic(optional = true)
	@Column(name = "BLOOD_TYPE")
	public Integer bloodType;

	@Basic(optional = false)
	@Column(name = "GENDER")
	public int gender;
	
	@Basic(optional = false)
	@Column(name = "PERSON_NAME")
	public String personName;

	@Basic(optional = false)
	@Column(name = "PERSON_NAME_KANA")
	public String personNameKana;

	@Basic(optional = false)
	@Column(name = "BUSINESS_NAME")
	public String businessName;
	
	@Basic(optional = true)
	@Column(name = "BUSINESS_NAME_KANA")
	public String businessNameKana;

	@Basic(optional = true)
	@Column(name = "BUSINESS_ENGLISH_NAME")
	public String businessEnglishName;

	@Basic(optional = true)
	@Column(name = "BUSINESS_OTHER_NAME")
	public String businessOtherName;

	@Basic(optional = true)
	@Column(name = "P_ROMANJI_FNAME")
	public String personRomanji;
	
	@Basic(optional = true)
	@Column(name = "P_ROMANJI_FNAME_KANA")
	public String personRomanjiKana;

	@Basic(optional = true)
	@Column(name = "TODOKEDE_FNAME")
	public String todokedeFullName;

	@Basic(optional = true)
	@Column(name = "TODOKEDE_FNAME_KANA")
	public String todokedeFullNameKana;
	
	@Basic(optional = true)
	@Column(name = "OLDNAME_FNAME")
	public String oldName;
	
	@Basic(optional = true)
	@Column(name = "OLDNAME_FNAME_KANA")
	public String oldNameKana;

	@Basic(optional = true)
	@Column(name = "PERSON_NAME_MULTIL_LANG")
	public String perNameMultilLang;

	@Basic(optional = true)
	@Column(name = "PERSON_NAME_MULTIL_LANG_KANA")
	public String perNameMultilLangKana;
	@Override
	protected Object getKey() {
		return this.bpsmtPersonPk;
	}

}
