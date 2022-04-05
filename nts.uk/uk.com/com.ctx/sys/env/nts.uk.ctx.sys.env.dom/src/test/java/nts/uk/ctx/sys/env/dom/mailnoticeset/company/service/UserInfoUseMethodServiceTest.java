package nts.uk.ctx.sys.env.dom.mailnoticeset.company.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.integration.junit4.JMockit;
import nts.uk.ctx.sys.env.dom.mailnoticeset.company.service.UserInformationUseMethodService.Require;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactImport;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactImport;

@RunWith(JMockit.class)
public class UserInfoUseMethodServiceTest {

	@Injectable
	private Require require;

	/**
	 * $社員連絡先　NOT　Empty
	 * $個人連絡先　NOT　Empty
	 * 連絡先の表示設定 ALL true
	 */
	@Test
	public void userInfoUseMethodServiceTest1() {
		
		PersonContactImport personContactImport = UserInfoUseMethodServiceTestHelper.initPersonContactImport(false);
		EmployeeInfoContactImport employeeInfoContactImport = UserInfoUseMethodServiceTestHelper.initEmployeeInfoContactImport();
		ContactDisplaySetting setting = UserInfoUseMethodServiceTestHelper.initContactDisplaySetting(true, false);
		
		new Expectations() {
			{
				require.getByPersonalId("mock-personalId");
				result = Optional.of(personContactImport);
			}
			{
				require.getByContactInformation("mock-employeeId");
				result = Optional.of(employeeInfoContactImport);
			}
		};
		
		ContactInformation res = UserInformationUseMethodService.get(require, "mock-companyId", "mock-employeeId", "mock-personalId", setting);
		
		assertThat(res.getCompanyMobilePhoneNumber().get()).isEqualTo(employeeInfoContactImport.getCellPhoneNo());
		assertThat(res.getSeatDialIn().v()).isEqualTo(employeeInfoContactImport.getSeatDialIn());
		assertThat(res.getSeatExtensionNumber().v()).isEqualTo(employeeInfoContactImport.getSeatExtensionNumber());
		assertThat(res.getCompanyEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMailAddress());
		assertThat(res.getCompanyMobileEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMobileMailAddress());
		
		assertThat(res.getPersonalMobilePhoneNumber().get()).isEqualTo(personContactImport.getCellPhoneNo());
		assertThat(res.getPersonalEmailAddress().get()).isEqualTo(personContactImport.getMailAddress());
		assertThat(res.getPersonalMobileEmailAddress().get()).isEqualTo(personContactImport.getMobileMailAddress());
		assertThat(res.getEmergencyNumber1().get()).isEqualTo(personContactImport.getEmergencyNumber1());
		assertThat(res.getEmergencyNumber2().get()).isEqualTo(personContactImport.getEmergencyNumber2());
		assertThat(res.getOtherContactsInfomation().size()).isEqualTo(5);
	}
	
	/**
	 * $社員連絡先　Empty
	 * $個人連絡先　NOT　Empty
	 * 連絡先の表示設定 ALL true
	 */
	@Test
	public void userInfoUseMethodServiceTest2() {
		
		PersonContactImport personContactImport = UserInfoUseMethodServiceTestHelper.initPersonContactImport(false);
		ContactDisplaySetting setting = UserInfoUseMethodServiceTestHelper.initContactDisplaySetting(true, false);
		
		new Expectations() {
			{
				require.getByPersonalId("mock-personalId");
				result = Optional.of(personContactImport);
			}
		};
		
		ContactInformation res = UserInformationUseMethodService.get(require, "mock-companyId", "mock-employeeId", "mock-personalId", setting);
		
		assertThat(res.getCompanyMobilePhoneNumber()).isNull();
		assertThat(res.getSeatDialIn()).isNull();
		assertThat(res.getSeatExtensionNumber()).isNull();
		assertThat(res.getCompanyEmailAddress()).isNull();
		assertThat(res.getCompanyMobileEmailAddress()).isNull();
		
		assertThat(res.getPersonalMobilePhoneNumber().get()).isEqualTo(personContactImport.getCellPhoneNo());
		assertThat(res.getPersonalEmailAddress().get()).isEqualTo(personContactImport.getMailAddress());
		assertThat(res.getPersonalMobileEmailAddress().get()).isEqualTo(personContactImport.getMobileMailAddress());
		assertThat(res.getEmergencyNumber1().get()).isEqualTo(personContactImport.getEmergencyNumber1());
		assertThat(res.getEmergencyNumber2().get()).isEqualTo(personContactImport.getEmergencyNumber2());
		assertThat(res.getOtherContactsInfomation().size()).isEqualTo(5);
	}
	
	/**
	 * $社員連絡先 NOT　Empty
	 * $個人連絡先　Empty
	 * 連絡先の表示設定 ALL true
	 */
	@Test
	public void userInfoUseMethodServiceTest3() {
		
		EmployeeInfoContactImport employeeInfoContactImport = UserInfoUseMethodServiceTestHelper.initEmployeeInfoContactImport();
		ContactDisplaySetting setting = UserInfoUseMethodServiceTestHelper.initContactDisplaySetting(true, false);
		
		new Expectations() {
			{
				require.getByContactInformation("mock-employeeId");
				result = Optional.of(employeeInfoContactImport);
			}
		};
		
		ContactInformation res = UserInformationUseMethodService.get(require, "mock-companyId", "mock-employeeId", "mock-personalId", setting);
		
		assertThat(res.getCompanyMobilePhoneNumber().get()).isEqualTo(employeeInfoContactImport.getCellPhoneNo());
		assertThat(res.getSeatDialIn().v()).isEqualTo(employeeInfoContactImport.getSeatDialIn());
		assertThat(res.getSeatExtensionNumber().v()).isEqualTo(employeeInfoContactImport.getSeatExtensionNumber());
		assertThat(res.getCompanyEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMailAddress());
		assertThat(res.getCompanyMobileEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMobileMailAddress());
		
		assertThat(res.getPersonalMobilePhoneNumber()).isNull();
		assertThat(res.getPersonalEmailAddress()).isNull();
		assertThat(res.getPersonalMobileEmailAddress()).isNull();
		assertThat(res.getEmergencyNumber1()).isNull();
		assertThat(res.getEmergencyNumber2()).isNull();
		assertThat(res.getOtherContactsInfomation()).isNull();
	}

	/**
	 * $社員連絡先　NOT　Empty
	 * $個人連絡先　NOT　Empty
	 * 連絡先の表示設定 ALL false
	 */
	@Test
	public void userInfoUseMethodServiceTest4() {
		
		PersonContactImport personContactImport = UserInfoUseMethodServiceTestHelper.initPersonContactImport(false);
		EmployeeInfoContactImport employeeInfoContactImport = UserInfoUseMethodServiceTestHelper.initEmployeeInfoContactImport();
		ContactDisplaySetting setting = UserInfoUseMethodServiceTestHelper.initContactDisplaySetting(false, false);
		
		new Expectations() {
			{
				require.getByPersonalId("mock-personalId");
				result = Optional.of(personContactImport);
			}
			{
				require.getByContactInformation("mock-employeeId");
				result = Optional.of(employeeInfoContactImport);
			}
		};
		
		ContactInformation res = UserInformationUseMethodService.get(require, "mock-companyId", "mock-employeeId", "mock-personalId", setting);
		
		assertThat(res.getCompanyMobilePhoneNumber().get()).isEqualTo("");
		assertThat(res.getSeatDialIn().v()).isEqualTo("");
		assertThat(res.getSeatExtensionNumber().v()).isEqualTo("");
		assertThat(res.getCompanyEmailAddress().get()).isEqualTo("");
		assertThat(res.getCompanyMobileEmailAddress().get()).isEqualTo("");
		
		assertThat(res.getPersonalMobilePhoneNumber().get()).isEqualTo("");
		assertThat(res.getPersonalEmailAddress().get()).isEqualTo("");
		assertThat(res.getPersonalMobileEmailAddress().get()).isEqualTo("");
		assertThat(res.getEmergencyNumber1().get()).isEqualTo("");
		assertThat(res.getEmergencyNumber2().get()).isEqualTo("");
		assertThat(res.getOtherContactsInfomation().size()).isEqualTo(5);
	}
	
	/**
	 * $社員連絡先　NOT　Empty
	 * $個人連絡先　NOT　Empty
	 * 連絡先の表示設定 ALL true
	 * 連絡先の表示設定.他の連絡先 NULL
	 */
	@Test
	public void userInfoUseMethodServiceTest5() {
		
		PersonContactImport personContactImport = UserInfoUseMethodServiceTestHelper.initPersonContactImport(false);
		EmployeeInfoContactImport employeeInfoContactImport = UserInfoUseMethodServiceTestHelper.initEmployeeInfoContactImport();
		ContactDisplaySetting setting = UserInfoUseMethodServiceTestHelper.initContactDisplaySetting(true, true);
		
		new Expectations() {
			{
				require.getByPersonalId("mock-personalId");
				result = Optional.of(personContactImport);
			}
			{
				require.getByContactInformation("mock-employeeId");
				result = Optional.of(employeeInfoContactImport);
			}
		};
		
		ContactInformation res = UserInformationUseMethodService.get(require, "mock-companyId", "mock-employeeId", "mock-personalId", setting);
		
		assertThat(res.getCompanyMobilePhoneNumber().get()).isEqualTo(employeeInfoContactImport.getCellPhoneNo());
		assertThat(res.getSeatDialIn().v()).isEqualTo(employeeInfoContactImport.getSeatDialIn());
		assertThat(res.getSeatExtensionNumber().v()).isEqualTo(employeeInfoContactImport.getSeatExtensionNumber());
		assertThat(res.getCompanyEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMailAddress());
		assertThat(res.getCompanyMobileEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMobileMailAddress());
		
		assertThat(res.getPersonalMobilePhoneNumber().get()).isEqualTo(personContactImport.getCellPhoneNo());
		assertThat(res.getPersonalEmailAddress().get()).isEqualTo(personContactImport.getMailAddress());
		assertThat(res.getPersonalMobileEmailAddress().get()).isEqualTo(personContactImport.getMobileMailAddress());
		assertThat(res.getEmergencyNumber1().get()).isEqualTo(personContactImport.getEmergencyNumber1());
		assertThat(res.getEmergencyNumber2().get()).isEqualTo(personContactImport.getEmergencyNumber2());
		assertThat(res.getOtherContactsInfomation().size()).isEqualTo(5);
	}
	
	/**
	 * $社員連絡先　NOT　Empty
	 * $個人連絡先　NOT　Empty
	 * 連絡先の表示設定 ALL true
	 * $個人連絡先.他の連絡先 NULL
	 */
	@Test
	public void userInfoUseMethodServiceTest6() {
		
		PersonContactImport personContactImport = UserInfoUseMethodServiceTestHelper.initPersonContactImport(true);
		EmployeeInfoContactImport employeeInfoContactImport = UserInfoUseMethodServiceTestHelper.initEmployeeInfoContactImport();
		ContactDisplaySetting setting = UserInfoUseMethodServiceTestHelper.initContactDisplaySetting(true, false);
		
		new Expectations() {
			{
				require.getByPersonalId("mock-personalId");
				result = Optional.of(personContactImport);
			}
			{
				require.getByContactInformation("mock-employeeId");
				result = Optional.of(employeeInfoContactImport);
			}
		};
		
		ContactInformation res = UserInformationUseMethodService.get(require, "mock-companyId", "mock-employeeId", "mock-personalId", setting);
		
		assertThat(res.getCompanyMobilePhoneNumber().get()).isEqualTo(employeeInfoContactImport.getCellPhoneNo());
		assertThat(res.getSeatDialIn().v()).isEqualTo(employeeInfoContactImport.getSeatDialIn());
		assertThat(res.getSeatExtensionNumber().v()).isEqualTo(employeeInfoContactImport.getSeatExtensionNumber());
		assertThat(res.getCompanyEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMailAddress());
		assertThat(res.getCompanyMobileEmailAddress().get()).isEqualTo(employeeInfoContactImport.getMobileMailAddress());
		
		assertThat(res.getPersonalMobilePhoneNumber().get()).isEqualTo(personContactImport.getCellPhoneNo());
		assertThat(res.getPersonalEmailAddress().get()).isEqualTo(personContactImport.getMailAddress());
		assertThat(res.getPersonalMobileEmailAddress().get()).isEqualTo(personContactImport.getMobileMailAddress());
		assertThat(res.getEmergencyNumber1().get()).isEqualTo(personContactImport.getEmergencyNumber1());
		assertThat(res.getEmergencyNumber2().get()).isEqualTo(personContactImport.getEmergencyNumber2());
		assertThat(res.getOtherContactsInfomation().size()).isEqualTo(0);
	}
}
