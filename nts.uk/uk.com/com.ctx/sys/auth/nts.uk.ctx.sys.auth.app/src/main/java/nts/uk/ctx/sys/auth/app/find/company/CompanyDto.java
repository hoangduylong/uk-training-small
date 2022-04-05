package nts.uk.ctx.sys.auth.app.find.company;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CompanyDto {
	/** 会社コード */
	private String companyCode;

	/** 会社名 */
	private String companyName;

	/** 会社ID */
	private String companyId;
	
	/**
	 * Instantiates a new company dto.
	 *
	 * @param companyCode the company code
	 * @param companyName the company name
	 * @param companyId the company id
	 */
	public CompanyDto (String companyCode, String companyName, String companyId) {
		this.companyCode = companyCode;
		this.companyName = companyName;
		this.companyId = companyId;
	}
}
