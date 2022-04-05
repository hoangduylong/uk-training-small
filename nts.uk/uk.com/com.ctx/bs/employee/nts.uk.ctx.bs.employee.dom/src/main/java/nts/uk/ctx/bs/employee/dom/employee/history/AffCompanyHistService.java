package nts.uk.ctx.bs.employee.dom.employee.history;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class AffCompanyHistService {
	@Inject
	private AffCompanyHistRepository affCompanyHistRepository;
	
	/** Add new affiliation history */
	public void add(AffCompanyHistByEmployee domain, String pId){
		// Insert last item
		AffCompanyHistItem itemToBeAdded = domain.getLstAffCompanyHistoryItem().get(domain.getLstAffCompanyHistoryItem().size() -1);
		affCompanyHistRepository.add(domain.getSId(), pId, itemToBeAdded);
	}
	/** Update one affiliation history */
	public void update(AffCompanyHistByEmployee domain, AffCompanyHistItem itemToBeUpdated){

		affCompanyHistRepository.update(itemToBeUpdated);
	}
	
	/** Delete one affiliation history */
	public void delete(AffCompanyHistByEmployee domain, AffCompanyHistItem itemToBeDelted, String pId){
		affCompanyHistRepository.remove(pId,domain.getSId(),itemToBeDelted.getHistoryId());
	}
	
	/**
	 * @author lanlt
	 * Add All new affiliation history 
	 * @param domainMaps - Map<String, AffCompanyHistByEmployee>  pid - AffCompanyHistByEmployee
	 */
	public void addAll(Map<String, AffCompanyHistByEmployee> domainMaps){
		List<AffCompanyHistCustom> affComHistCustom = new ArrayList<>();
		// Insert last item
		domainMaps.entrySet().stream().forEach(c ->{
			// Insert last item
			AffCompanyHistItem itemToBeAdded = c.getValue().getLstAffCompanyHistoryItem().get(c.getValue().getLstAffCompanyHistoryItem().size() -1);
			affComHistCustom.add(new AffCompanyHistCustom(c.getKey(), c.getValue().getSId(), itemToBeAdded));
		});
		if(affComHistCustom.isEmpty()) return;
		affCompanyHistRepository.addAll(affComHistCustom);
	}
	
	
	/**
	 * Update all affiliation history
	 * @param itemToBeUpdated
	 */
	public void updateAll(List<AffCompanyHistItem> itemToBeUpdated){
		if(itemToBeUpdated.isEmpty()) return;
		affCompanyHistRepository.updateAll(itemToBeUpdated);
	}
}
