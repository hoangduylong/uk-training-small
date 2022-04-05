package nts.uk.ctx.sys.auth.dom.adapter.company;

import lombok.Builder;
import lombok.Data;


//Imported Class for RequestList #58
@Data
@Builder
public class CompanyImport {
	/** 会社コード*/
	private String companyCode;
	
	/** 会社名*/
	private String companyName;
	
	/** 会社ID*/
	private String companyId;
	
	/** 廃止区分*/
	private int isAbolition;

	public CompanyImport(String companyCode, String companyName, String companyId, int isAbolition) {
		super();
		this.companyCode = companyCode;
		this.companyName = companyName;
		this.companyId = companyId;
		this.isAbolition = isAbolition;
	}
	
	
	
}
