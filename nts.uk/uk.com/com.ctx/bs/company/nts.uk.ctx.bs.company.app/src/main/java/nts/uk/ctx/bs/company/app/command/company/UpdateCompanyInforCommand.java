package nts.uk.ctx.bs.company.app.command.company;

//import java.math.BigDecimal;
//import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
//import nts.uk.ctx.bs.company.dom.company.AddInfor;
//import nts.uk.ctx.bs.company.dom.company.Company;

/**
 * update company command
 * @author yennth
 */
@Data
@AllArgsConstructor
public class UpdateCompanyInforCommand {
	
	// 会社コード
		private String ccd;

		/** The company code. */
		// 会社名
		private String name;

		/** The start month. */
		// 期首月
		private int month;

		/** The Abolition */
		// 廃止区分
		private int abolition;

		/** 代表者名 */
		private String repname;
		
		/** 代表者職位 */
		private String repJob;
		
		/** 会社名カナ */
		private String comNameKana;
		
		/** 会社略名 */
		private String shortComName;
		
		/** 契約コード */
		private String contractCd;
		
		/** 法人マイナンバー */
		private String taxNo;
		
		private AddInforCommand addinfor;
		
//		private Company toDomain(String contractCode) {
//			AddInfor add = null; 
//			if(this.getAddinfor() != null){
//				add = this.getAddinfor().toDomainAdd(Company.createCompanyId(ccd, contractCode));
//			}
//			Company company =  Company.createFromJavaType(this.getCcd(), this.getName(), 
//					this.getMonth(), 
//					this.getAbolition(), this.getRepname(),
//					this.getRepJob(), this.getComNameKana(), 
//					this.getShortComName(), contractCd, 
//					this.getTaxNo(), add);
//			
//			return company;
//		}
}
