package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

public class EmployeeInformationHelper {
	
	public static class EmployeeContactHelper {
		public static EmployeeContactDto getMockDto() {
			return EmployeeContactDto.builder()
					.employeeId("employeeId")
					.mailAddress("mailAddress")
					.isMailAddressDisplay(true)
					.seatDialIn("seatDialIn")
					.isSeatDialInDisplay(true)
					.seatExtensionNumber("seatExtensionNumber")
					.isSeatExtensionNumberDisplay(true)
					.mobileMailAddress("mobileMailAddress")
					.isMobileMailAddressDisplay(true)
					.cellPhoneNumber("cellPhoneNumber")
					.isCellPhoneNumberDisplay(true)
					.build();
		}
	}

}
