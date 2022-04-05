package nts.uk.ctx.bs.person.dom.person.personal.anniversary.service;

import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNoticeDto;
import mockit.Expectations;
import mockit.Injectable;
import mockit.Mocked;
import mockit.integration.junit4.JMockit;
import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;
import org.junit.Test;
import org.junit.runner.RunWith;
import lombok.val;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test Domain service 期間で記念日情報を取得する
 */
@RunWith(JMockit.class)
public class SetFlagTest {
    
    @Injectable
    private AnniversaryDomainService.Require require;
    
    @Mocked
    private static AnniversaryNoticeDto mockDto = AnniversaryNoticeDto.builder()
            .personalId("personalId")
            .noticeDay(1)
            .seenDate(GeneralDate.ymd(2020,10,07))
            .anniversary("1007")
            .anniversaryTitle("anniversaryTitle")
            .notificationMessage("notificationMessage")
            .build();
   

    @Test
    public void testFirstIf() {
    	
    	//Mocking
        DatePeriod datePeriod = new DatePeriod(GeneralDate.today(), GeneralDate.today());
        new Expectations() {
            {
                require.getTodayAnniversary( (GeneralDate)any );
                result = new ArrayList<>();
            }
        };
        
        //Execute
        val instance = new AnniversaryDomainService();
		@SuppressWarnings("unchecked")
		val map = (Map<AnniversaryNotice, Boolean>)NtsAssert.Invoke.privateMethod
				(
				instance, 
				"setFlag", 
				require,
				datePeriod
				);
		
      //Assertion
      assertThat(map).isEqualTo(new HashMap<AnniversaryNotice, Boolean>());
    }

    @Test
    public void testIfOfSecondIf() {
    	
    	//Mocking
        DatePeriod datePeriod = new DatePeriod(GeneralDate.ymd(1999, 10, 7), GeneralDate.ymd(1999, 10, 7));
        List<AnniversaryNotice> list = new ArrayList<>();
        AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);
        list.add(domain);
        new Expectations() {
            {
                require.getByDatePeriod( (DatePeriod)any );
                result = list;
            }
        };
        
        //Execute
        val instance = new AnniversaryDomainService();  
		@SuppressWarnings("unchecked")
		val map = (Map<AnniversaryNotice, Boolean>)NtsAssert.Invoke.privateMethod
				(
				instance, 
				"setFlag", 
				require,
				datePeriod
				);
		
		//Assertion
        assertThat(map.containsKey(domain)).isTrue();
    }

    @Test
    public void testElseOfSecondIf() {

    	//Mocking
    	DatePeriod datePeriod = new DatePeriod(GeneralDate.today(), GeneralDate.ymd(1999, 10, 7));
        AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);
     
        //Execute
        val instance = new AnniversaryDomainService();
		@SuppressWarnings("unchecked")
		val map = (Map<AnniversaryNotice, Boolean>)NtsAssert.Invoke.privateMethod
				(
				instance, 
				"setFlag", 
				require,
				datePeriod
				);
		
		//Assertion
        assertThat(map.containsKey(domain)).isFalse();
    }

}
