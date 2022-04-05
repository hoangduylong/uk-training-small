package nts.uk.ctx.sys.auth.app.find.registration.user;

import lombok.Value;
import nts.uk.ctx.sys.auth.dom.adapter.company.CompanyImport;

/**
 * Instantiates a new company import dto.
 *
 * @param companyCode the company code
 * @param companyName the company name
 * @param companyId the company id
 */
@Value
public class CompanyImportDto {
	
	/** The company code. */
	private String companyCode;
	
	/** The company name. */
	private String companyName;
	
	/** The company id. */
	private String companyId;
	
	 /**
 	 * From domain.
 	 *
 	 * @param domain the domain
 	 * @return the company import dto
 	 */
 	public static CompanyImportDto fromDomain(CompanyImport domain){
		 return new  CompanyImportDto (
				 domain.getCompanyCode(),
				 domain.getCompanyName(),
				 domain.getCompanyId());
	 }

}
