package nts.uk.ctx.sys.env.dom.mailnoticeset.company.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import nts.uk.ctx.sys.env.dom.mailnoticeset.company.ContactName;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactImport;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.OtherContactDTO;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactImport;

/**
 * DomainService 連絡先情報を取得
 *
 * @author Nws-DucNT
 *
 */
public class UserInformationUseMethodService {

	private UserInformationUseMethodService() {}

	public static ContactInformation get(Require require, String companyId, String employeeId, String personalId, ContactDisplaySetting settingContactInfo) {

		// $個人連絡先 = require. 個人連絡先を取得する(個人ID)
		Optional<PersonContactImport> personalContact = require.getByPersonalId(personalId);

		// $社員連絡先 = require. 社員連絡先を取得する(社員ID)
		Optional<EmployeeInfoContactImport> employeeInfoContact = require.getByContactInformation(employeeId);

		// create 連絡先情報DTO
		// $連絡先　＝　new　連絡先情報DTO()
		ContactInformation contactInfo = new ContactInformation();

		// if　$社員連絡先　NOT　Empty
		if (employeeInfoContact.isPresent()) {
			
			EmployeeInfoContactImport employeeContact = employeeInfoContact.get();
			
			//$連絡先.会社の携帯電話番号
			String companyMobilePhoneNumber = settingContactInfo.isCompanyMobilePhoneDisplay() ? employeeContact.getCellPhoneNo() : "";

			// $連絡先.座席ダイヤルイン
			String seatDialIn = settingContactInfo.isDialInNumberDisplay() ? employeeContact.getSeatDialIn() : "";

			// $連絡先.座席内線番号										
			String seatExtensionNumber = settingContactInfo.isExtensionNumberDisplay() ? employeeContact.getSeatExtensionNumber() : "";

			// $連絡先.会社のメールアドレス											
			String companyEmailAddress = settingContactInfo.isCompanyEmailAddressDisplay() ? employeeContact.getMailAddress() : "";
					
			// $連絡先.会社の携帯メールアドレス					
			String companyMobileEmailAddress = settingContactInfo.isCompanyMobileEmailAddressDisplay() ? employeeContact.getMobileMailAddress() : "";
			
			contactInfo.setCompanyMobilePhoneNumber(Optional.ofNullable(companyMobilePhoneNumber));
			contactInfo.setSeatDialIn(new ContactName(seatDialIn));
			contactInfo.setSeatExtensionNumber(new ContactName(seatExtensionNumber));
			contactInfo.setCompanyEmailAddress(Optional.ofNullable(companyEmailAddress));
			contactInfo.setCompanyMobileEmailAddress(Optional.ofNullable(companyMobileEmailAddress));
		}

		// if　$個人連絡先　NOT　Empty
		if (personalContact.isPresent()) {
			
			PersonContactImport personContact = personalContact.get();

			// $連絡先.個人の携帯電話番号												
			String personalMobilePhoneNumber = settingContactInfo.isPersonalMobilePhoneDisplay() ? personContact.getCellPhoneNo() : "";

			// $連絡先.個人のメールアドレス											
			String personalEmailAddress = settingContactInfo.isPersonalEmailAddressDisplay() ? personContact.getMailAddress() : "";

			// $連絡先.個人の携帯メールアドレス												
			String personalMobileEmailAddress = settingContactInfo.isPersonalMobileEmailAddressDisplay() ? personContact.getMobileMailAddress() : "";

			// $連絡先.緊急連絡先１														
			String emergencyNumber1 = settingContactInfo.isEmergencyNumber1Display() ? personContact.getEmergencyNumber1() : "";

			// $連絡先.緊急連絡先２
			String emergencyNumber2 = settingContactInfo.isEmergencyNumber2Display() ? personContact.getEmergencyNumber2() : "";
			
			// Map<No, $設定.連絡先情報の設定.他の連絡先.連絡先利用設定>
			Map<Integer, OtherContactDisplaySetting> otherContacts = settingContactInfo.getOtherContacts() == null
					? new HashMap<Integer, OtherContactDisplaySetting>()
					: settingContactInfo.getOtherContacts().stream()
						.collect(Collectors.toMap(OtherContactDisplaySetting::getNo, valueMapper -> valueMapper));
					
			// Map<No, $個人連絡先.他の連絡先.在席照会に表示するか>
			Map<Integer, OtherContactDTO> otherContactDtos = personContact.getOtherContacts() == null
					? new HashMap<Integer, OtherContactDTO>()
					: personContact.getOtherContacts().stream()
						.collect(Collectors.toMap(OtherContactDTO::getNo, valueMapper -> valueMapper));
					
			// $連絡先.他の連絡先
			List<OtherContactInfomation> otherContactInfors = personContact.getOtherContacts() == null
					? new ArrayList<>()
					: personContact.getOtherContacts().stream().map(mapper -> {
						if (otherContacts.get(mapper.getNo()) == null) {
							return null;
						}
						return otherContacts.get(mapper.getNo()).isContactUsageSettingDisplay() ?
							new OtherContactInfomation(
									mapper.getNo(),
									otherContactDtos.get(mapper.getNo()).getAddress(),
									otherContacts.get(mapper.getNo()).getContactName())
							: null;
			}).collect(Collectors.toList());
			
			contactInfo.setPersonalMobilePhoneNumber(Optional.ofNullable(personalMobilePhoneNumber));
			contactInfo.setPersonalEmailAddress(Optional.ofNullable(personalEmailAddress));
			contactInfo.setPersonalMobileEmailAddress(Optional.ofNullable(personalMobileEmailAddress));
			contactInfo.setEmergencyNumber1(Optional.ofNullable(emergencyNumber1));
			contactInfo.setEmergencyNumber2(Optional.ofNullable(emergencyNumber2));
			contactInfo.setOtherContactsInfomation(otherContactInfors);
		}
		return contactInfo;
	}

	public static interface Require {

		/**
		 * [R-2] 個人連絡先を取得する 個人連絡先Repository.取得する(個人ID)
		 * 
		 * @param personalId
		 * @return
		 */
		Optional<PersonContactImport> getByPersonalId(String personalId);

		/**
		 * [R-3] 社員連絡先を取得する 社員連絡先Repository.取得する(社員ID)
		 * 
		 * @param employeeId
		 * @return
		 */
		Optional<EmployeeInfoContactImport> getByContactInformation(String employeeId);
	}
}
