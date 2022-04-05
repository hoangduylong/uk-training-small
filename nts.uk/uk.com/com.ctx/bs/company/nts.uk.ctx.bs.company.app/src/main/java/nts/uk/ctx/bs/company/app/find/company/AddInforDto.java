package nts.uk.ctx.bs.company.app.find.company;

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
public class AddInforDto {
	/**会社ID**/
	private String companyId;
	
	// 会社コード
	private String companyCode;
	
	/** 契約コード */
	private String contractCd;
	
	/** FAX番号 **/
	private String faxNum;
	/** 住所１ **/
	private String add_1;
	/** 住所２ **/
	private String add_2;
	/** 住所カナ１ **/
	private String addKana_1;
	/** 住所カナ２ **/
	private String addKana_2;
	/** 郵便番号 **/
	private String postCd;
	/** 電話番号 **/
	private String phoneNum;
}
