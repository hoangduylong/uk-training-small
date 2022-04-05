/**
 * @author hieult
 */
package nts.uk.ctx.sys.portal.app.find.titlemenu;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.uk.ctx.sys.portal.dom.titlemenu.TitleMenuRepository;
import nts.uk.shr.com.context.AppContexts;
@Stateless
public class TitleMenuFinder {
	@Inject
	private TitleMenuRepository repository;
	
	/**
	 * find all TitleMenu by companyID
	 * @param conpanyID
	 * @return List
	 */
	public List<TitleMenuDto> getAllTitleMenu() {
		String companyID = AppContexts.user().companyId();
		return this.repository.findAll(companyID).stream().map(title -> TitleMenuDto.fromDomain(title))
				.collect(Collectors.toList());
	}

	/**
	 * find TitleMenu by CompanyId and titleMenuCD
	 * @param titleMenuCD
	 * @param companyID
	 * @return
	 */
	public Optional<TitleMenuDto> getTitleMenu(String titleMenuCD) {
		String companyID = AppContexts.user().companyId();
		return this.repository.findByCode(companyID, titleMenuCD).map(title -> TitleMenuDto.fromDomain(title));
	}
	
	
}
