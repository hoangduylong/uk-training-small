package nts.uk.ctx.bs.person.dom.person.personal.anniversary.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNoticeDto;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;
import org.junit.Test;
import org.junit.runner.RunWith;

import lombok.val;
import mockit.Expectations;
import mockit.Injectable;
import mockit.Mocked;
import mockit.integration.junit4.JMockit;
import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.GeneralDate;


/**
 * Test Domain service 新記念日があるか
 */
@RunWith(JMockit.class)
public class IsTodayHaveNewAnniversaryTest {

	@Injectable
	private AnniversaryDomainService.Require require;

	@Mocked
	private static AnniversaryNoticeDto mockDto = AnniversaryNoticeDto.builder()
		.personalId("personalId")
		.noticeDay(0)
		.seenDate(GeneralDate.ymd(1999,10,07))
		.anniversary("1007")
		.anniversaryTitle("anniversaryTitle")
		.notificationMessage("notificationMessage")
		.build();

	@Test
	public void testListNotEmpty() {

		//Mocking
		AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);
		List<AnniversaryNotice> list = new ArrayList<>();
		list.add(domain);
		new Expectations() {
			{
				require.getTodayAnniversary( (GeneralDate)any );
				result = list;
			}
		};
		
		//Execute
		val instance = new AnniversaryDomainService();
		val res = (boolean)NtsAssert.Invoke.privateMethod
				(
				instance, 
				"isTodayHaveNewAnniversary", 
				require
				);
		
		//Assertion
		assertThat(res).isTrue();
	}
	
	@Test
	public void testListEmpty() {
		//Mocking
		List<AnniversaryNotice> list = new ArrayList<>();
		new Expectations() {
			{
				require.getTodayAnniversary( (GeneralDate)any );
				result = list;
			}
		};
		
		//Execute
		val instance = new AnniversaryDomainService();
		val res = (boolean)NtsAssert.Invoke.privateMethod
				(
				instance, 
				"isTodayHaveNewAnniversary", 
				require
				);
		
		//Assertion
		assertThat(res).isFalse();
	}

}