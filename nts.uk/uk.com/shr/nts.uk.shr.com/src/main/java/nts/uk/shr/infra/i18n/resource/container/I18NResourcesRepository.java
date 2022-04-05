package nts.uk.shr.infra.i18n.resource.container;

import java.util.Optional;

import nts.arc.time.GeneralDateTime;

public interface I18NResourcesRepository {
	
	<T extends I18NResourceItem> I18NResourceContainer<T> loadResourcesDefault(String languageId);
	
	<T extends I18NResourceItem> CustomizedI18NResourceContainers<T> loadResourcesEachCompanies(String languageId);
	
	<T extends I18NResourceItem> I18NResourceContainer<T> loadResourcesOfCompany(String companyId, String languageId);
	
	Optional<GeneralDateTime> getLastUpdatedDateTime(String companyId, String languageId);
	
	void refreshResource(String companyId, String languageId, GeneralDateTime datetime);
	
	void replaceSystemClass(String companyId, String languageId, String systemId, String resourceId, String newContent);
}
