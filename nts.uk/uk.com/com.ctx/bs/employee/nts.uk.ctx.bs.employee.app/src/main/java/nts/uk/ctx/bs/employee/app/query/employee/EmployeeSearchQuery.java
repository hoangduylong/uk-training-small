/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.query.employee;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Getter
@Setter
public class EmployeeSearchQuery implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The base date. */
	private GeneralDate baseDate; //基準日
	
	/** The search reference range. */
	private Integer referenceRange; //検索参照範囲
	
	/** The filter by employment. */
	private Boolean filterByEmployment; //雇用で絞り込む

	/** The employment codes. */
	private List<String> employmentCodes; //雇用コード一覧
	
	/** The filter by department. */
	private Boolean filterByDepartment; //部門で絞り込む
	
	/** The department codes. */
	private List<String> departmentCodes; //部門ID一覧
	
	/** The filter by work place. */
	private Boolean filterByWorkplace; //職場で絞り込む

	/** The workplace codes. */
	private List<String> workplaceCodes; //職場ID一覧
	
	/** The filter by classification. */
	private Boolean filterByClassification; //分類で絞り込む
	
	/** The classification codes. */
	private List<String> classificationCodes; //分類コード一覧
	
	/** The filter by job title. */
	private Boolean filterByJobTitle; //職位で絞り込む

	/** The job title codes. */
	private List<String> jobTitleCodes; //職位ID一覧
	
	/** The period date. */
	private GeneralDate periodStart; //在職・休職・休業のチェック期間
	
	/** The period date. */
	private GeneralDate periodEnd; //在職・休職・休業のチェック期間
	
	/** The incumbents. */
	private Boolean includeIncumbents; //在職者を含める
	
	/** The workers on leave. */
	private Boolean includeWorkersOnLeave; //休職者を含める
	
	/** The occupancy. */
	private Boolean includeOccupancy; //休業者を含める
	
	/** The include retirees. */
	private Boolean includeRetirees; //退職者を含める
	
	/** The period of retirees date. */
	private GeneralDate retireStart; //退職日のチェック期間
	
	private GeneralDate retireEnd; //退職日のチェック期間
	
	/** The sort oder no. */
	private Integer sortOrderNo; //並び順NO
	
	/** The type of name. */
	private String nameType; //氏名の種類
}
