package nts.uk.ctx.bs.person.dom.person.personal.contact;

import static org.assertj.core.api.Assertions.assertThat;
import java.util.ArrayList;
import nts.arc.testing.assertion.NtsAssert;
import nts.uk.ctx.bs.person.dom.person.personal.PersonInformationHelper.PersonalContactHelper;

import org.junit.Test;

public class PersonalContactTest {

	private final PersonalContactDto mockPsDto = PersonalContactHelper.getMockDto();

	@Test
	public void getters() {
		// when
		PersonalContact domain = PersonalContact.createFromMemento(mockPsDto);
		// then
		NtsAssert.invokeGetters(domain); 
	}
	
	@Test
	public void gettersNull() {
		// given
		PersonalContactDto mockDtoNull = PersonalContactDto.builder().personalId("personalId")
				.emergencyContact1(EmergencyContactDto.builder().build())
				.emergencyContact2(EmergencyContactDto.builder().build())
				.otherContacts(new ArrayList<OtherContactDto>()).build();
		// when
		PersonalContact domain = new PersonalContact();
		domain.getMemento(mockDtoNull);
		// then
		NtsAssert.invokeGetters(domain); 
	}
	
	/**
	 * Vì team chúng tôi thiết kế domain theo cơ chế get/set memento, thế nên trong domain sẽ có 3 hàm phát sinh 
	 * (createFromMemento, getMemento, setMemento)
	 * Chính vì thế, để đảm bảo coverage, chúng tôi phải test cả 3 hàm này.
	 * get / set mementoメカニズムに従ってドメインを設計しているため、ドメインには3つの生成関数（createFromMemento、getMemento、setMemento）があります。 
	 * 0カバレッジのために、3つの機能すべてをテストする必要があります。
	 */
	@Test
	public void setMemento() {
		// given
		PersonalContactDto nullDto = PersonalContactDto.builder().build();
		PersonalContact domain = PersonalContact.createFromMemento(mockPsDto);

		// when
		domain.setMemento(nullDto);

		// then
		NtsAssert.invokeGetters(domain); 
	}
	

	@Test
	public void emergencyContactBuilderToString() {
		String contact = EmergencyContact.builder()
				.remark(new Remark("remark"))
				.contactName(new ContactName("contactName"))
				.phoneNumber(new PhoneNumber("phoneNumber"))
				.toString();
		assertThat(contact.isEmpty()).isFalse();
	}

	@Test
	public void otherContactBuilderToString() {
		String contact = OtherContact.builder()
				.otherContactNo(1)
				.address(new OtherContactAddress("address"))
				.toString();
		assertThat(contact.isEmpty()).isFalse();
	}
}
