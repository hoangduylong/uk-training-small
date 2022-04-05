package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

import org.junit.Test;

import nts.arc.testing.assertion.NtsAssert;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeInformationHelper.EmployeeContactHelper;

public class EmployeeContactTest {

	private final EmployeeContactDto mockDto = EmployeeContactHelper.getMockDto();

	@Test
	public void getters() {
		// when
		EmployeeContact domain = EmployeeContact.createFromMemento(mockDto);
		// then
		NtsAssert.invokeGetters(domain); 
	}
	
	@Test
	public void gettersNull() {
		// given
		EmployeeContactDto mockDtoNull = EmployeeContactDto.builder().employeeId("employeeId").build();
		
		// when
		EmployeeContact domain = new EmployeeContact();
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
		EmployeeContactDto avtarDto = EmployeeContactDto.builder().build();
		EmployeeContact domain = EmployeeContact.createFromMemento(mockDto);

		// when
		domain.setMemento(avtarDto);

		// then
		NtsAssert.invokeGetters(domain);
	}
}
