package nts.uk.ctx.bs.employee.dom.employee.history;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/** 所属会社履歴 */
public class AffCompanyHist extends AggregateRoot {
	/** 個人ID */
	private String pId;

	/** 社員別履歴 */
	private List<AffCompanyHistByEmployee> lstAffCompanyHistByEmployee;
	
	public static AffCompanyHist createNewEmployeeHist(String personId, String employeeId, String comHistId,
			GeneralDate hireDate, GeneralDate entryDate) {
		List<AffCompanyHistItem> comHistItemList = Arrays
				.asList(new AffCompanyHistItem(comHistId, false, new DatePeriod(hireDate, entryDate != null? entryDate: GeneralDate.max())));
		
		List<AffCompanyHistByEmployee> comHistList = Arrays
				.asList(new AffCompanyHistByEmployee(employeeId, comHistItemList));
		
		return new AffCompanyHist(personId, comHistList);
	}

	public AffCompanyHistByEmployee getAffCompanyHistByEmployee(String sid) {
		if (lstAffCompanyHistByEmployee == null) {
			lstAffCompanyHistByEmployee = new ArrayList<AffCompanyHistByEmployee>();
		}

		List<AffCompanyHistByEmployee> filter = lstAffCompanyHistByEmployee.stream().filter(m -> m.getSId().equals(sid))
				.collect(Collectors.toList());
		if (filter != null && !filter.isEmpty()) {
			return filter.get(0);
		}

		return null;
	}

	public void addAffCompanyHistByEmployee(AffCompanyHistByEmployee domain) {
		this.addAffCompanyHistByEmployeeWithoutEvent(domain);
		domain.toBePublished();
	}

	public void addAffCompanyHistByEmployeeWithoutEvent(AffCompanyHistByEmployee domain) {
		if (lstAffCompanyHistByEmployee == null) {
			lstAffCompanyHistByEmployee = new ArrayList<AffCompanyHistByEmployee>();
		}

		lstAffCompanyHistByEmployee.add(domain);
	}
}