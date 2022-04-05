package nts.uk.shr.infra.i18n.resource.data;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class CisdtI18NResourceVerPK {

	@Column(name = "CID")
	public String companyId;
	
	@Column(name = "LANGUAGE_ID")
	public String languageId;
	
}
