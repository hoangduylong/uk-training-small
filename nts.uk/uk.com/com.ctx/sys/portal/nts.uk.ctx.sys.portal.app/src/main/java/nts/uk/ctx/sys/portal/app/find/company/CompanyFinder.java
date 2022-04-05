package nts.uk.ctx.sys.portal.app.find.company;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.adapter.company.CompanyAdapter;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

@Stateless
public class CompanyFinder {
	
	@Inject
	private CompanyAdapter companyAdapter;

	public List<ShortCompanyDto> findAll() {
		LoginUserContext context = AppContexts.user();
		//アルゴリズム「切替可能な会社一覧を取得する」を実行する
		List<String> idList = companyAdapter.getCompanyIdList(context.userId(), context.contractCode());
		if (idList == null || idList.isEmpty()) {
			return companyAdapter.getCompany(context.companyId())
					.map(c -> Arrays.asList(new ShortCompanyDto(c.getCompanyId(), c.getCompanyName())))
					.orElse(Collections.emptyList());
		}
		
		return idList.stream().map(id -> companyAdapter.getCompany(id)).filter(c -> c.isPresent())
				.map(c -> new ShortCompanyDto(c.get().getCompanyId(), c.get().getCompanyName()))
				.collect(Collectors.toList());
	}
}
