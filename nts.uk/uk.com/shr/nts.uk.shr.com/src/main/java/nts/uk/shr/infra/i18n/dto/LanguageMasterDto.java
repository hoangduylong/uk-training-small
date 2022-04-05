package nts.uk.shr.infra.i18n.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LanguageMasterDto {
	private String languageId;

	private String languageCode;
	
	private String languageName;
}
