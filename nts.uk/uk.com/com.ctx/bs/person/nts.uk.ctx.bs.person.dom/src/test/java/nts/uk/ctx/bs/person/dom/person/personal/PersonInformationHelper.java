package nts.uk.ctx.bs.person.dom.person.personal;


import java.util.ArrayList;
import java.util.List;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNoticeDto;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.UserAvatarDto;
import nts.uk.ctx.bs.person.dom.person.personal.contact.EmergencyContactDto;
import nts.uk.ctx.bs.person.dom.person.personal.contact.OtherContactDto;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContactDto;

public class PersonInformationHelper {
	
	public static class AnniversaryNoticeHelper {
		public static AnniversaryNoticeDto getMockDto() {
			return AnniversaryNoticeDto.builder()
					.personalId("personalId")
					.noticeDay(1)
					.seenDate(GeneralDate.ymd(2020, 10, 07))
					.anniversary("1007")
					.anniversaryTitle("anniversaryTitle")
					.notificationMessage("notificationMessage").build();
		}
	}
	
	public static class UserAvatarHelper {
		public static UserAvatarDto getMockDto() {
			return UserAvatarDto.builder()
					.personalId("personalId")
					.fileId("fileId")
					.build();
		}
	}
	
	public static class PersonalContactHelper {
		public static PersonalContactDto getMockDto() {
			
			EmergencyContactDto mockEmergencyContact1 = EmergencyContactDto.builder().contactName("contactName1").phoneNumber("phoneNumber1")
					.remark("remark1").build();
			
			EmergencyContactDto mockEmergencyContact2 = EmergencyContactDto.builder().contactName("contactName2").phoneNumber("phoneNumber2")
					.remark("remark2").build();
			
			List<OtherContactDto> mockOtherContacts = new ArrayList<>();
			mockOtherContacts.add(OtherContactDto.builder().otherContactNo(1).isDisplay(true).address("address1").build());
			mockOtherContacts.add(OtherContactDto.builder().otherContactNo(2).isDisplay(true).address("address2").build());
			mockOtherContacts.add(OtherContactDto.builder().otherContactNo(3).isDisplay(true).address("address3").build());
			mockOtherContacts.add(OtherContactDto.builder().otherContactNo(4).isDisplay(true).address("address4").build());
			mockOtherContacts.add(OtherContactDto.builder().otherContactNo(5).isDisplay(true).address("address5").build());
			
			return PersonalContactDto.builder()
					.personalId("personalId")
					.mailAddress("mailAddress")
					.mobileEmailAddress("mobileEmailAddress")
					.phoneNumber("phoneNumber")
					.emergencyContact1(mockEmergencyContact1)
					.emergencyContact2(mockEmergencyContact2)
					.otherContacts(mockOtherContacts).build();
		}
	}

}
