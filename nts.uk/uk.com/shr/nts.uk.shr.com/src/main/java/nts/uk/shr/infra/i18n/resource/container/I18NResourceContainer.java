package nts.uk.shr.infra.i18n.resource.container;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.val;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.i18n.resource.I18NResourceType;

public class I18NResourceContainer<T extends I18NResourceItem> {
	
	private static final I18NResourceContainer<?> EMPTY = new I18NResourceContainer<>(GeneralDateTime.now());

	@Getter
	private GeneralDateTime lastUpdatedAt;
	
	@Getter
	private final Map<String, T> items = new HashMap<>();
	
	public I18NResourceContainer(GeneralDateTime lastUpdatedAt) {
		this.lastUpdatedAt = lastUpdatedAt;
	}
	
	public void addAll(List<T> items) {
		items.forEach(item -> this.add(item));
	}
	
	public void add(T item) {
		this.items.put(item.identifier(), item);
	}
	
	public boolean contains(String identifier) {
		return this.items.containsKey(identifier);
	}
	
	public String getContent(String identifier) {
		return this.items.get(identifier).content();
	}
	
	public Optional<String> getContentOptional(String identifier) {
		return this.contains(identifier) ? Optional.of(this.getContent(identifier)) : Optional.empty();
	}
	
	public Map<String, String> createContentsMap() {
		return this.items.entrySet().stream().collect(Collectors.toMap(
				es -> es.getKey(),
				es -> es.getValue().content()));
	}
	
	public Map<String, String> createContentsMapByClassId(String classId) {
		return this.items.entrySet().stream()
				.filter(es -> es.getValue().resourceType() == I18NResourceType.ITEM_NAME)
				.map(es -> (ProgramResourceItem)(es.getValue()))
				.filter(item -> item.getProgramId().equals(classId))
				.collect(Collectors.toMap(
						item -> item.identifier(),
						item -> item.content()));
	}
	
	public Map<String, String> createContentsMapByResourceType(I18NResourceType resourceType) {
		return this.items.entrySet().stream()
				.filter(es -> es.getValue().resourceType() == resourceType)
				.map(es -> (I18NResourceItem)(es.getValue()))
				.collect(Collectors.toMap(
						item -> item.identifier(),
						item -> item.content()));
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends I18NResourceItem> I18NResourceContainer<T> empty() {
		return (I18NResourceContainer<T>) EMPTY;
	}
	
	public static <T1 extends I18NResourceItem, T2 extends I18NResourceItem> I18NResourceContainer<?> merge(
			I18NResourceContainer<T1> source1,
			I18NResourceContainer<T2> source2) {
		
		val merged = new I18NResourceContainer<I18NResourceItem>(GeneralDateTime.now());
		source1.items.values().forEach(e -> merged.add(e));
		source2.items.values().forEach(e -> merged.add(e));
		return merged;
	}
}
