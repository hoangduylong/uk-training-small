/**
 * 
 */
package find.currentaddress;

import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

/**
 * @author danpv
 *
 */
public class CurrentAddressDto extends PeregDomainDto{

	/** 国 */
	@PeregItem("IS00032")
	private String countryId;
	
	/** 郵便番号*/
	@PeregItem("IS00030")
	private String postalCode;
	
	/** 電話番号 */
	@PeregItem("IS00037")
	private String phoneNumber;
	
	/** 都道府県 */
	@PeregItem("IS00031")
	private String prefectures;
	
	/** 社宅家賃 */
	@PeregItem("")
	private String houseRent;
	
	/** 開始日 */
	@PeregItem("IS00029")
	private GeneralDate startDate;
	
	/** 終了日 */
	@PeregItem("")
	private GeneralDate endDate;
	
	/** 住所１*/
	@PeregItem("IS00033")
	private String address1;
	
	/** 住所カナ１ */
	@PeregItem("IS00034")
	private String addressKana1;
	
	/** 住所２*/
	@PeregItem("IS00035")
	private String address2;
	
	/** 住所カナ２ */
	@PeregItem("IS00036")
	private String addressKana2;
	
	/** 住宅状況種別*/
	@PeregItem("IS00038")
	private String homeSituationType;
	
	/** メールアドレス */
	@PeregItem("")
	private String personMailAddress;
	
	/** 住居区分 */
	@PeregItem("")
	private String houseType;
	
	/** 最寄り駅 */
	@PeregItem("")
	private String nearestStation;

}
