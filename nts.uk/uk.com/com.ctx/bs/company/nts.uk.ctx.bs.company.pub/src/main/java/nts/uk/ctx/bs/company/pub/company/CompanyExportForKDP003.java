package nts.uk.ctx.bs.company.pub.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyExportForKDP003 {
	
	private String companyCode;      // 会社コード
	private String companyName;      // 会社名
	private String companyId;        // 会社ID
	private String contractCd;       // 契約コード

}
