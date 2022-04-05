package nts.uk.ctx.bs.person.infra.entity.person.family;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.entity.JpaEntity;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BPSMT_FAMILY")
public class BpsmtFamily extends JpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public BpsmtFamilyPk ppsmtFamilyPk;

	@Basic(optional = false)
	@Column(name = "PID")
	public String pid;
	
	@Basic(optional = false)
	@Column(name = "BIRTHDAY")
	public GeneralDate birthday;
	
	@Basic(optional = false)
	@Column(name = "RELATION_CD")
	public String relationCode;
	
	@Basic(optional = false)
	@Column(name = "FNAME")
	public String fName;

	@Basic(optional = false)
	@Column(name = "FNAME_KANA")
	public String fNameKana;

	@Basic(optional = true)
	@Column(name = "FNAME_ROMAJI")
	public String fNameRomaji;

	@Basic(optional = false)
	@Column(name = "FNAME_ROMAJI_KANA")
	public String fNameRomajiKana;

	@Basic(optional = true)
	@Column(name = "FNAME_MULTI_LANG")
	public String fNameMultiLang;

	@Basic(optional = false)
	@Column(name = "FNAME_MULTI_LANG_KANA")
	public String fNameMultiLangKana;
	
	@Basic(optional = true)
	@Column(name = "TODUKEDE_FNAME")
	public String todukedeName;

	@Basic(optional = false)
	@Column(name = "TODUKEDE_FNAME_KANA")
	public String todukedeNameKana;

	@Basic(optional = false)
	@Column(name = "DATE_OF_DEATH")
	public GeneralDate deathDate;
	
	@Basic(optional = false)
	@Column(name = "ENTRY_DATE")
	public GeneralDate entryDate;
	
	@Basic(optional = false)
	@Column(name = "EXP_DATE")
	public GeneralDate expDate;
	
	@Override
	protected Object getKey() {
		return ppsmtFamilyPk;
	}

}
