package nts.uk.shr.infra.i18n.resource.container;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import lombok.val;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.i18n.resource.I18NResourceType;

public class CustomizedI18NResourceContainers<T extends I18NResourceItem> {
	
	private static final CustomizedI18NResourceContainers<?> EMPTY = new CustomizedI18NResourceContainers<>();

	private final Map<String, I18NResourceContainer<T>> itemsEachCompany = new HashMap<>();
	
	public void add(String companyId, T item) {
		if (!this.itemsEachCompany.containsKey(companyId)) {
			this.itemsEachCompany.put(companyId, new I18NResourceContainer<T>(GeneralDateTime.now()));
		}
		
		this.itemsEachCompany.get(companyId).add(item);
	}
	
	public void addAll(String companyId, Collection<T> items) {
		items.forEach(item -> this.add(companyId, item));
	}
	
	public boolean existsContainerOf(String companyId) {
		return this.itemsEachCompany.containsKey(companyId);
	}
	
	public I18NResourceContainer<T> containerOf(String companyId) {
		return this.itemsEachCompany.getOrDefault(companyId, I18NResourceContainer.empty());
	}
	
	@SuppressWarnings("unchecked")
	public void update(String companyId, Object newContainer) {
		this.itemsEachCompany.put(companyId, (I18NResourceContainer<T>) newContainer);
	}
	
	public Map<String, String> createContentsMapByClassId(String classId, String companyId) {
		val container = this.itemsEachCompany.getOrDefault(companyId, I18NResourceContainer.empty());
		return container.createContentsMapByClassId(classId);
	}
	
	public Map<String, String> createContentsMapByResourceType(I18NResourceType resourceType, String companyId) {
		val container = this.itemsEachCompany.getOrDefault(companyId, I18NResourceContainer.empty());
		return container.createContentsMapByResourceType(resourceType);
	}
	
	@SuppressWarnings("unchecked")
	public static <T1 extends I18NResourceItem, T2 extends I18NResourceItem> CustomizedI18NResourceContainers<?> merge(
			CustomizedI18NResourceContainers<T1> source1,
			CustomizedI18NResourceContainers<T2> source2) {
		
		val merged = new CustomizedI18NResourceContainers<I18NResourceItem>();
		
		Arrays.asList(source1, source2).forEach(source -> {
			source.itemsEachCompany.entrySet().forEach(itemsInCompany -> {
				String companyId = itemsInCompany.getKey();
				val items = ((I18NResourceContainer<I18NResourceItem>)itemsInCompany.getValue());
				merged.addAll(companyId, items.getItems().values());
			});
		});
		
		return merged;
	}
	
	public static CustomizedI18NResourceContainers<?> empty() {
		return EMPTY;
	}
}
