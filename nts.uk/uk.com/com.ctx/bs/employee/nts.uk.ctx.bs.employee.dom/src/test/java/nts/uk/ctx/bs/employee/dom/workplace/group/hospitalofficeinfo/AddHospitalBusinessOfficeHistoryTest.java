package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import lombok.val;
import mockit.Mock;
import mockit.MockUp;
import mockit.integration.junit4.JMockit;
import nts.arc.task.tran.AtomTask;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.gul.util.value.MutableValue;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.AddHospitalBusinessOfficeHistory.Require;
import nts.uk.shr.com.history.DateHistoryItem;;

@RunWith(JMockit.class)
public class AddHospitalBusinessOfficeHistoryTest {
	
	/**
	 * 職場グループの履歴がない場合
	 */
	@Test
	public void add_no_history_Success(){
		val workplaceGroupId = "wkpGroupId";
		val datePeriod = new DatePeriod(GeneralDate.ymd(2000, 1, 1), GeneralDate.ymd(9999, 12, 31));
		val nightShiftRule = NightShiftOperationRule.createByNightShiftNotUse();
		
		val actual = new MutableValue<HospitalBusinessOfficeInfoHistory>();
		
		Require require = new MockUp<Require>() {
			
			@Mock
			void insertHospitalBusinessOfficeHistory(HospitalBusinessOfficeInfo hospitalInfo, HospitalBusinessOfficeInfoHistory hospitalHist) {
				actual.set(hospitalHist);
			}
			
			@Mock
			Optional<HospitalBusinessOfficeInfoHistory> getHospitalBusinessOfficeInfoHistory(String workplaceGroupId) {
				return Optional.empty();
			}
			
		}.getMockInstance();
		
		AtomTask atomTask = AddHospitalBusinessOfficeHistory.addHospitalBusinessOfficeHistory(
				require
				, workplaceGroupId
				, datePeriod
				, nightShiftRule
				, Optional.empty());
		
		assertThat(actual.optional().isPresent()).isFalse();
		
		atomTask.run();
		
		assertThat(actual.get().items().size()).isEqualTo(1);
		
	}


	/**
	 * 職場グループの履歴がある場合
	 */
	@Test
	public void add_have_history_Success(){
		val workplaceGroupId = "wkpGroupId";
		val oldDate = new DatePeriod(GeneralDate.ymd(1990, 1, 1), GeneralDate.ymd(9999, 12, 31));
		val newdatePeriod = new DatePeriod(GeneralDate.ymd(2000, 1, 1), GeneralDate.ymd(9999, 12, 31));
		val nightShiftRule = NightShiftOperationRule.createByNightShiftNotUse();
		val oldDateHistItem = DateHistoryItem.createNewHistory(oldDate);
		val hospitalHist = new HospitalBusinessOfficeInfoHistory(workplaceGroupId
				, new ArrayList<> (Arrays.asList(oldDateHistItem)) );
		
		val actual = new MutableValue<HospitalBusinessOfficeInfoHistory>(hospitalHist);
		
		Require require = new MockUp<Require>() {
			@Mock
			void insertHospitalBusinessOfficeHistory(HospitalBusinessOfficeInfo hospitalInfo, HospitalBusinessOfficeInfoHistory hospitalHist) {
				assertThat(hospitalHist.items().size()).isEqualTo(2);
			}
			
			@Mock
			Optional<HospitalBusinessOfficeInfoHistory> getHospitalBusinessOfficeInfoHistory(String workplaceGroupId) {
				return Optional.of(hospitalHist);
			}
			
		}.getMockInstance();
		
		AtomTask atomTask = AddHospitalBusinessOfficeHistory.addHospitalBusinessOfficeHistory(
				require
				, workplaceGroupId
				, newdatePeriod
				, nightShiftRule
				, Optional.empty());
		
		assertThat(actual.optional().isPresent()).isTrue();
		
		atomTask.run();
		
		assertThat(actual.get().items().size()).isEqualTo(2);
	}	
	
}
