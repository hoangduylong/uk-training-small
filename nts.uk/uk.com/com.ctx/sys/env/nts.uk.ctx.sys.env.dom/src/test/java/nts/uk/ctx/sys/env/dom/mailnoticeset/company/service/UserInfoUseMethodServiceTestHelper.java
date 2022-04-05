package nts.uk.ctx.sys.env.dom.mailnoticeset.company.service;

import java.util.ArrayList;
import java.util.List;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactImport;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.OtherContactDTO;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactImport;

public class UserInfoUseMethodServiceTestHelper {

	/**
	 * Mocked 個人連絡先
	 * @param nullOtherContact Null他の連絡先 
	 * @return
	 */
	public static PersonContactImport initPersonContactImport(Boolean nullOtherContact) {
		List<OtherContactDTO> otherContactDtos = new ArrayList<>();
        otherContactDtos.add(OtherContactDTO.builder()
                .no(1)
                .address("")
                .build());
        otherContactDtos.add(OtherContactDTO.builder()
                .no(2)
                .address("")
                .build());
        otherContactDtos.add(OtherContactDTO.builder()
                .no(3)
                .address("")
                .build());
        otherContactDtos.add(OtherContactDTO.builder()
                .no(4)
                .address("")
                .build());
        otherContactDtos.add(OtherContactDTO.builder()
                .no(5)
                .address("")
                .build());
        if (nullOtherContact) {
        	otherContactDtos = null;
        }
		return new PersonContactImport(
				"mock-personalId",
				"test@gmail.com",
				"testMB@gmail.com",
				"012-345-6789",
				"0123",
				"4567",
				otherContactDtos
			);
	}

	public static EmployeeInfoContactImport initEmployeeInfoContactImport() {
		return new EmployeeInfoContactImport(
				"mock-employeeId",
				"test@gmail.com",
				"testMB@gmail.com",
				"032-456-789",
				"012",
				"12"
			);
	}
	
	public static ContactDisplaySetting initContactDisplaySetting(boolean bool, Boolean nullOtherContact) {
		
		List<OtherContactDisplaySetting> otherContacts = null;
		
		if (!nullOtherContact) {
			otherContacts = new ArrayList<>();
			for (int i = 1; i < 6; i++) {
				otherContacts.add(OtherContactDisplaySetting.builder()
						.no(i)
						.contactUsageSettingDisplay(bool)
						.contactName("contactName" + i)
						.build());
			}
		}

		return ContactDisplaySetting.builder()
				.dialInNumberDisplay(bool)
				.companyEmailAddressDisplay(bool)
				.companyMobileEmailAddressDisplay(bool)
				.personalEmailAddressDisplay(bool)
				.personalMobileEmailAddressDisplay(bool)
				.extensionNumberDisplay(bool)
				.companyMobilePhoneDisplay(bool)
				.personalMobilePhoneDisplay(bool)
				.emergencyNumber1Display(bool)
				.emergencyNumber2Display(bool)
				.otherContacts(otherContacts)
				.build();
	}
}
