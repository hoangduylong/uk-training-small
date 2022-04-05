package nts.uk.ctx.bs.employee.pub.employment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShEmploymentExport {

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
}
