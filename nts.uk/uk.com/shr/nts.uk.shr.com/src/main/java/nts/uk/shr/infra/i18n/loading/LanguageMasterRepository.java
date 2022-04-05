package nts.uk.shr.infra.i18n.loading;

import java.util.List;
import java.util.Optional;

import nts.uk.shr.infra.i18n.dto.LanguageMasterDto;

public interface LanguageMasterRepository {

	public List<LanguageMasterDto> getSystemLanguages();
	
	public Optional<LanguageMasterDto> getSystemLanguage(String languageId);
	
	public boolean isJapanese(String languageId);
}
