package nts.uk.shr.infra.i18n.resource;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import lombok.val;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.com.i18n.LanguageConsts;
import nts.uk.shr.infra.i18n.resource.container.CustomizedI18NResourceContainers;
import nts.uk.shr.infra.i18n.resource.container.I18NResourceContainer;

public class I18NResourcesCustomized {

	/** LanguageId -> containers */
	private Map<String, CustomizedI18NResourceContainers<?>> resources = new HashMap<>();
	
	public Optional<String> getContent(String companyId, String language, String resourceId) {
		
		val containers = this.resources.getOrDefault(
				language, CustomizedI18NResourceContainers.empty());
		
		val container = containers.containerOf(companyId);
		
		return container.getContentOptional(resourceId);
	}
	
	public void put(String languageId, CustomizedI18NResourceContainers<?> containers) {
		this.resources.put(languageId, containers);
	}
	
	public void update(String languageId, String companyId, I18NResourceContainer<?> newContainer) {
		if (!this.resources.containsKey(languageId)) {
			this.resources.put(languageId, new CustomizedI18NResourceContainers<>());
		}
		
		val containers = this.resources.get(languageId);
		containers.update(companyId, newContainer);
	}
	
	public Map<String, String> createContentsMapByClassId(String languageId, String classId, String companyId) {
		val containers = this.resources.getOrDefault(languageId, this.forDefaultLanguage());
		return containers.createContentsMapByClassId(classId, companyId);
	}
	
	public Map<String, String> createContentsMapByResourceType(String languageId, String companyId, I18NResourceType resourceType) {
		val containers = this.resources.getOrDefault(languageId, this.forDefaultLanguage());
		return containers.createContentsMapByResourceType(resourceType, companyId);
	}
	
	public CustomizedI18NResourceContainers<?> forDefaultLanguage() {
		return this.resources.get(LanguageConsts.DEFAULT_LANGUAGE_ID);
	}
	
	public boolean requiresToUpdate(String companyId, String languageId, GeneralDateTime datetimeOfDataSource) {
		if (!this.resources.containsKey(languageId)) {
			return true;
		}
		
		val containers = this.resources.get(languageId);
		
		if (!containers.existsContainerOf(companyId)) {
			return true;
		}
		
		val container = containers.containerOf(companyId);
		
		return container.getLastUpdatedAt().before(datetimeOfDataSource);
	}
}
