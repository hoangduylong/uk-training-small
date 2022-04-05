package nts.uk.ctx.bs.employee.app.find.employee.mngdata;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.pereg.app.ComboBoxObject;
import nts.uk.shr.pereg.app.find.PeregFinder;
import nts.uk.shr.pereg.app.find.PeregQuery;
import nts.uk.shr.pereg.app.find.PeregQueryByListEmp;
import nts.uk.shr.pereg.app.find.dto.DataClassification;
import nts.uk.shr.pereg.app.find.dto.GridPeregDomainBySidDto;
import nts.uk.shr.pereg.app.find.dto.GridPeregDomainDto;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

@Stateless
public class EmployeeDataMngInfoFinder implements PeregFinder<EmployeeDataMngInfoDto> {
	@Inject
	EmployeeDataMngInfoRepository edMngRepo;

	@Override
	public String targetCategoryCode() {
		return "CS00001";
	}

	@Override
	public Class<EmployeeDataMngInfoDto> dtoClass() {
		return EmployeeDataMngInfoDto.class;
	}

	@Override
	public DataClassification dataType() {
		return DataClassification.EMPLOYEE;
	}

	@Override
	public EmployeeDataMngInfoDto getSingleData(PeregQuery query) {
		List<EmployeeDataMngInfo> domain = edMngRepo.findByEmployeeId(query.getEmployeeId());
		if (domain.isEmpty()) {
			return null;
		}
		return EmployeeDataMngInfoDto.fromDomain(domain.get(0));
	}

	@Override
	public List<PeregDomainDto> getListData(PeregQuery query) {
		return new ArrayList<>();
	}

	@Override
	public List<ComboBoxObject> getListFirstItems(PeregQuery query) {
		return new ArrayList<>();
	}

	@Override
	public List<GridPeregDomainDto> getAllData(PeregQueryByListEmp query) {
		String cid = AppContexts.user().companyId();
		
		List<GridPeregDomainDto> result = new ArrayList<>();
		
		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
		
		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainDto(c.getEmployeeId(), c.getPersonId(), null));
		});

		List<EmployeeDataMngInfo> domains = edMngRepo.findByListEmployeeId(cid, sids);
		
		result.stream().forEach(c ->{
			Optional<EmployeeDataMngInfo> empOpt = domains.stream().filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).findFirst();
			c.setPeregDomainDto(empOpt.isPresent() == true ? EmployeeDataMngInfoDto.fromDomain(empOpt.get()) : null);
		});
		
		return result;
	}

	// get data to check cps013
	@Override
	public List<GridPeregDomainBySidDto> getListData(PeregQueryByListEmp query) {
		String cid = AppContexts.user().companyId();
		
		List<GridPeregDomainBySidDto> result = new ArrayList<>();
		
		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
		
		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainBySidDto(c.getEmployeeId(), c.getPersonId(), new ArrayList<>()));
		});

		List<EmployeeDataMngInfo> domains = edMngRepo.findByListEmployeeId(cid, sids);
		
		result.stream().forEach(c ->{
			Optional<EmployeeDataMngInfo> empOpt = domains.stream().filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).findFirst();
			c.setPeregDomainDto(empOpt.isPresent() == true ? Arrays.asList(EmployeeDataMngInfoDto.fromDomain(empOpt.get())) : null);
		});
		
		return result;
	}
}
