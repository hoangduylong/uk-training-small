/**
 * 
 */
package nts.uk.ctx.bs.employee.ws.affiliatedcompanyhistory;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.find.affiliatedcompanyhistory.AffCompanyHistItemDto;
import nts.uk.ctx.bs.employee.app.find.affiliatedcompanyhistory.AffiliatedCompanyHistoryFinder;
import nts.uk.ctx.bs.employee.app.query.employee.QueryHistItem;

/**
 * @author hieult
 *
 */
@Path("bs/employee/affiliatedcompanyhistory")
@Produces(MediaType.APPLICATION_JSON)
public class AffiliatedCompanyHistoryWebService extends WebService {

	@Inject
	private AffiliatedCompanyHistoryFinder affiliatedCompanyHistoryFinder;
	
	@Path("getdata")
	@POST
	public List<AffCompanyHistItemDto> getByIDAndBasedate(QueryHistItem query) {
		//社員ID（List）と基準日から所属会社履歴項目を取得する
		return this.affiliatedCompanyHistoryFinder.getByIDAndBasedate(query.getBaseDate(), query.getListEmpID());
	}
}
