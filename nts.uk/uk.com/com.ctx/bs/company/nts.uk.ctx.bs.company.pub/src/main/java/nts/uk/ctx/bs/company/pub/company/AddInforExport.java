package nts.uk.ctx.bs.company.pub.company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** 住所情報 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddInforExport {
	
	/**会社ID**/
	private String companyId;
	
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
