package nts.uk.ctx.bs.company.app.find.company;

//import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * 
 * @author yennth
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyInforDto {
	/** The company code. */
	// 会社コード
	private String companyCode;

	/** The company code. */
	// 会社名
	private String companyName;

	/** The company id. */
	// 会社ID
	private String companyId;

	/** The start month. */
	// 期首月
	private int startMonth;

	/** The Abolition */
	// 廃止区分
	private int isAbolition;

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
	private String taxNum;
	
	private AddInforDto addinfor;
}
