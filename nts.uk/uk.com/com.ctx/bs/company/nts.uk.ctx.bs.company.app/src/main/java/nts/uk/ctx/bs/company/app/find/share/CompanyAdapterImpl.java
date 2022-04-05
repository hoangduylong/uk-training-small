package nts.uk.ctx.bs.company.app.find.share;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.shr.com.company.CompanyAdapter;
import nts.uk.shr.com.company.CompanyInfor;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class CompanyAdapterImpl implements CompanyAdapter{
	
	@Inject 
	private CompanyRepository companyRepo;

	@Override
	public Optional<CompanyInfor> getCurrentCompany() {
		return companyRepo.find(AppContexts.user().companyId())
				.map(x -> new CompanyInfor(x.getCompanyCode().v(), x.getCompanyName().v()));
	}

}
