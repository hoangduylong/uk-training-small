package nts.uk.ctx.bs.company.pub.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyExport {
	
	/** 会社コード*/
	private String companyCode;
	
	/** 会社名*/
	private String companyName;
	
	/** 会社ID*/
	private String companyId;
	
	/** 廃止区分*/
	private int isAbolition;

}
