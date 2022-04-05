/**
 * 
 */
package nts.uk.shr.pereg.app.find;

import java.util.List;

import lombok.Getter;
import nts.arc.time.GeneralDate;

/**
 * @author hieult
 *
 */

@Getter
public class PeregQueryByListEmp {

	private String categoryId;

	private String categoryCode;

	private GeneralDate standardDate;

	private List<PeregEmpInfoQuery> empInfos;

	/**
	 * Create query for multi user in layout mode
	 * 
	 * @param categoryCode
	 * @param listEmpId
	 * @param listPersonId
	 * @param standardDate
	 */
	public static PeregQueryByListEmp createQueryLayout(String categoryId, String categoryCode, GeneralDate standardDate,
			List<PeregEmpInfoQuery> empInfos) {
		return new PeregQueryByListEmp(categoryId, categoryCode, standardDate, empInfos);
	}

	private PeregQueryByListEmp(String categoryId, String categoryCode, GeneralDate standardDate, List<PeregEmpInfoQuery> empInfos) {
		this.categoryId = categoryId;
		this.categoryCode = categoryCode;
		this.standardDate = standardDate;

		this.empInfos = empInfos;
	}
}
