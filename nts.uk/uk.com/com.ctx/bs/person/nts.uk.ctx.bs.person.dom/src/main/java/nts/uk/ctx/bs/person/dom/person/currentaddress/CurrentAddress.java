package nts.uk.ctx.bs.person.dom.person.currentaddress;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.info.PersonMailAddress;
import nts.uk.ctx.bs.person.dom.person.info.PersonMobile;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CurrentAddress extends AggregateRoot {

	/**
	 * domain : 現住所
	 */
	/** 現住所ID */
	private String currentAddressId;
	/** 個人ID */
	private String pid;
	/** 国 */
	private String countryId;
	/** 郵便番号*/
	private PostalCode postalCode;
	/** 電話番号 */
	private PersonMobile phoneNumber;
	/** 都道府県 */
	private Prefectures prefectures;
	/** 社宅家賃 */
	private HouseRent houseRent;
	/** 期間 */
	private DatePeriod period;
	/** 住所１*/
	private AddressSet1 address1;
	/** 住所2*/
	private AddressSet2 address2;
	/** 住宅状況種別*/
	private HomeSituationType homeSituationType;
	/** メールアドレス */
	private PersonMailAddress personMailAddress;
	/** 住居区分 */
	private HouseType houseType;
	/** 最寄り駅 */
	private NearestStation nearestStation;
	
	public CurrentAddress(String currentAddressId, String pid, GeneralDate StartDate,
			GeneralDate endDate, String address1, String addresskana1){
		this.currentAddressId = currentAddressId;
		this.pid = pid;
		this.period = new DatePeriod(StartDate, endDate);
		this.address1 = new AddressSet1(new PersonAddress1(address1), new PersonAddressKana1(addresskana1));
	}

	public static CurrentAddress createFromJavaType(String currentAddressId, String pid, String countryId,
			String postalCode, String phoneNumber, String prefectures, String houseRent, GeneralDate StartDate,
			GeneralDate endDate, String address1, String addresskana1, String address2, String addresskana2,
			String homeSituationType, String personMailAddress, String houseType, String nearestStation) {
		return new CurrentAddress(currentAddressId, pid, countryId, new PostalCode(postalCode),
				new PersonMobile(phoneNumber), new Prefectures(prefectures), new HouseRent(houseRent),
				new DatePeriod(StartDate, endDate),
				new AddressSet1(new PersonAddress1(address1), new PersonAddressKana1(addresskana1)),
				new AddressSet2(new PersonAddress2(address2), new PersonAddressKana2(addresskana2)),
				new HomeSituationType(homeSituationType), new PersonMailAddress(personMailAddress),
				new HouseType(houseType), new NearestStation(nearestStation));
	}

	//for required fields
	public static CurrentAddress createFromJavaType(String currentAddressId, String pid, GeneralDate StartDate,
			GeneralDate endDate, String address1, String addresskana1){
		return new CurrentAddress(currentAddressId, pid, StartDate, endDate, address1, addresskana1);
	}

}
