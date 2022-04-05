package nts.uk.shr.infra.i18n.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "CISCT_I18N_LANGUAGE")
public class LanguageMaster {
	
	@Id
	@Column(name = "LANGUAGE_ID")
	private String languageId;

	@Column(name = "LANGUAGE_CODE")
	private String languageCode;
	
	@Column(name = "LANGUAGE_NAME")
	private String languageName;
}
