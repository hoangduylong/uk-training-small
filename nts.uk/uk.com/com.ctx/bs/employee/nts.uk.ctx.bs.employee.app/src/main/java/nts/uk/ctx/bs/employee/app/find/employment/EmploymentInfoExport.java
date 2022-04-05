/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * EmploymentInfoExport dùng cho RequestList639
 */
// 雇用
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class EmploymentInfoExport   {

	/** The company id. */
	// 会社ID.
	private String companyId;

	/** The employment code. */
	// 雇用コード.
	private String employmentCode;

	/** The employment name. */
	// 雇用名称.
	private String employmentName;

	/** The emp external code. */
	// 雇用外部コード.
	private String empExternalCode;

	/** The memo. */
	// メモ.
	private String memo;
	//グループ会社共通マスタID
	public  String  empCommonMasterId;
	// グループ会社共通マスタ項目ID
	public  String  empCommonMasterItemId;

}
