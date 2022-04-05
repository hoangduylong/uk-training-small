package cache.person.info;

import java.util.Optional;

import nts.arc.layer.app.cache.MapCache;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;

public class PersonCache {
	
	public static final String DOMAIN_NAME = Person.class.getName();
	
	private final MapCache<String, Person> cache;
	
	public PersonCache(PersonRepository repo) {
		super();
		this.cache = MapCache.incremental(sid -> repo.getByPersonId(sid));
	}
	
	public Optional<Person> get(String sid){
		return cache.get(sid);
	}
}
