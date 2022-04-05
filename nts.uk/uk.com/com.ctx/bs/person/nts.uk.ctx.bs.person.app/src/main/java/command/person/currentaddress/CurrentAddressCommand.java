package command.person.currentaddress;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class CurrentAddressCommand {
	/**
	 *  現住所
	 */
	/** 現住所ID */
	@PeregRecordId
	private String currentAddressId;
	
	/** 個人ID */
	@PeregPersonId
	private String pid;
	
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
	@PeregItem("IS00039")
	private String houseRent;
	
	/** 期間 */
	@PeregItem("IS00029")
	private GeneralDate startDate;
	
	@PeregItem("IS00001")
	private GeneralDate endDate;
	
	/** 住所１*/
	@PeregItem("IS00033")
	private String address1;
	
	/** 住所カナ１	 */
	@PeregItem("IS00034")
	private String addressKana1;
	
	/** 住所2*/
	@PeregItem("IS00035")
	private String address2;
	
	/** 住所カナ2 */
	@PeregItem("IS00036")
	private String addressKana2;
	
	/** 住宅状況種別*/
	@PeregItem("IS00038")
	private String homeSituationType;
	
	/** メールアドレス */
	@PeregItem("IS00037")
	private String personMailAddress;
	
	/** 住居区分 */
	@PeregItem("IS00001")
	private String houseType;
	
	/** 最寄り駅 */
	@PeregItem("IS00001")
	private String nearestStation;
}
