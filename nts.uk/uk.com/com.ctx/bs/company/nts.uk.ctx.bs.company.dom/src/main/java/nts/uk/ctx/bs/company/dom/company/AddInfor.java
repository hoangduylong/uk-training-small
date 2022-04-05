package nts.uk.ctx.bs.company.dom.company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.DomainObject;
import nts.gul.text.StringUtil;
import nts.uk.ctx.bs.company.dom.company.primitive.Add_1;
import nts.uk.ctx.bs.company.dom.company.primitive.Add_2;
import nts.uk.ctx.bs.company.dom.company.primitive.Add_Kana_1;
import nts.uk.ctx.bs.company.dom.company.primitive.Add_Kana_2;
import nts.uk.ctx.bs.company.dom.company.primitive.FaxNum;
import nts.uk.ctx.bs.company.dom.company.primitive.PhoneNum;
import nts.uk.shr.com.primitive.PostCode;
/**
 * 住所情報
 * @author yennth
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddInfor extends DomainObject{
	/**会社ID**/
	private String companyId;
	/** FAX番号 **/
	private FaxNum faxNum;
	/** 住所１ **/
	private Add_1 add_1;
	/** 住所２ **/
	private Add_2 add_2;
	/** 住所カナ１ **/
	private Add_Kana_1 addKana_1;
	/** 住所カナ２ **/
	private Add_Kana_2 addKana_2;
	/** 郵便番号 **/
	private PostCode postCd;
	/** 電話番号 **/
	private PhoneNum phoneNum;
	
	public static AddInfor createFromJavaType(String companyId, String faxNum, String add_1, 
												String add_2, String addKana_1, 
												String addKana_2, String postCd, 
												String phoneNum){
		return new AddInfor(companyId, !StringUtil.isNullOrEmpty(faxNum, true) ? new FaxNum(faxNum) : new FaxNum(""), 
							!StringUtil.isNullOrEmpty(add_1, true) ? new Add_1(add_1): new Add_1(""),
							!StringUtil.isNullOrEmpty(add_2, true) ? new Add_2(add_2) : new Add_2(""), 
							!StringUtil.isNullOrEmpty(addKana_1, true) ? new Add_Kana_1(addKana_1) : new Add_Kana_1(""),
							!StringUtil.isNullOrEmpty(addKana_2, true) ? new Add_Kana_2(addKana_2) : new Add_Kana_2(""), 
							!StringUtil.isNullOrEmpty(postCd, true) ? new PostCode(postCd) : null,
							!StringUtil.isNullOrEmpty(phoneNum, true) ? new PhoneNum(phoneNum) : new PhoneNum(""));
	}
}
