package nts.uk.shr.infra.i18n.resource;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import lombok.val;
import nts.uk.shr.com.i18n.LanguageConsts;
import nts.uk.shr.infra.i18n.resource.container.I18NResourceContainer;

public class I18NResourcesDefault {
	
	/** LanguageId -> container */
	private final Map<String, I18NResourceContainer<?>> resources = new HashMap<>();
	
	public Optional<String> getContent(String languageId, String resourceId) {
		
		if (this.resources.containsKey(languageId)) {
			val container = this.resources.get(languageId);
			if (container.contains(resourceId)) {
				return Optional.of(container.getContent(resourceId));
			}
		}
		
		return this.defaultContainer().getContentOptional(resourceId);
	}
	
	public void put(String languageId, I18NResourceContainer<?> container) {
		this.resources.put(languageId, container);
	}
	
	public Map<String, String> createContentsMapByResourceType(String languageId, I18NResourceType resourceType) {
		val container = this.resources.getOrDefault(languageId, this.defaultContainer());
		return container.createContentsMapByResourceType(resourceType);
	}
	
	public Map<String, String> createContentsMapByClassId(String languageId, String classId) {
		val container = this.resources.getOrDefault(languageId, this.defaultContainer());
		return container.createContentsMapByClassId(classId);
	}
	
	private I18NResourceContainer<?> defaultContainer() {
		return this.resources.get(LanguageConsts.DEFAULT_LANGUAGE_ID);
	}
}
