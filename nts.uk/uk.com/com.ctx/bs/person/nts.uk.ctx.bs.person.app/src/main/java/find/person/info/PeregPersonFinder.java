package find.person.info;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;
import nts.uk.shr.pereg.app.ComboBoxObject;
import nts.uk.shr.pereg.app.find.PeregFinder;
import nts.uk.shr.pereg.app.find.PeregQuery;
import nts.uk.shr.pereg.app.find.PeregQueryByListEmp;
import nts.uk.shr.pereg.app.find.dto.DataClassification;
import nts.uk.shr.pereg.app.find.dto.GridPeregDomainBySidDto;
import nts.uk.shr.pereg.app.find.dto.GridPeregDomainDto;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

@Stateless
public class PeregPersonFinder implements PeregFinder<PersonDto>{

	@Inject
	private PersonRepository personRepository;
	
	@Override
	public String targetCategoryCode() {
		return "CS00002";
	}

	@Override
	public Class<PersonDto> dtoClass() {
		return PersonDto.class;
	}

	@Override
	public DataClassification dataType() {
		return DataClassification.PERSON;
	}

	@Override
	public PeregDomainDto getSingleData(PeregQuery query) {
		
		Optional<Person> person = personRepository.getByPersonId(query.getPersonId());
		if(person.isPresent())
			return PersonDto.createFromDomain(person.get());
		return null;
	}

	@Override
	public List<PeregDomainDto> getListData(PeregQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ComboBoxObject> getListFirstItems(PeregQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<GridPeregDomainDto> getAllData(PeregQueryByListEmp query) {
		List<GridPeregDomainDto> result = new ArrayList<>();

		List<String> pids = query.getEmpInfos().stream().map(c -> c.getPersonId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainDto(c.getEmployeeId(), c.getPersonId(), null));
		});
		
		List<Person> domains = personRepository.getFullPersonByPersonIds(pids);
		
		result.stream().forEach(c ->{
			Optional<Person> domainOpt = domains.stream().filter(p -> p.getPersonId().equals(c.getPersonId())).findFirst();
			c.setPeregDomainDto(domainOpt.isPresent() == true ? PersonDto.createFromDomain(domainOpt.get()): null);
			
		});
		
		return result;
	}

	// get data for cps013
	@Override
	public List<GridPeregDomainBySidDto> getListData(PeregQueryByListEmp query) {
		List<GridPeregDomainBySidDto> result = new ArrayList<>();

		List<String> pids = query.getEmpInfos().stream().map(c -> c.getPersonId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainBySidDto(c.getEmployeeId(), c.getPersonId(), new ArrayList<>()));
		});
		
		List<Object[]> domains = personRepository.getPersonsByPersonIds(pids);
		
		result.stream().forEach(c ->{
			Optional<Object[]> domainOpt = domains.stream().filter(p -> p[0].toString().equals(c.getPersonId())).findFirst();
			c.setPeregDomainDto(domainOpt.isPresent() == true ? Arrays.asList(PersonDto.createFromDomain(domainOpt.get())): new ArrayList<>());
		});
			
		return result;
	}
}
