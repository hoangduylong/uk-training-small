package nts.uk.ctx.bs.person.dom.person.personal.anniversary;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.MonthDay;

import org.junit.Test;

import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.personal.PersonInformationHelper.AnniversaryNoticeHelper;

public class AnniversaryNoticeTest {
	
	public final AnniversaryNoticeDto mockDto = AnniversaryNoticeHelper.getMockDto();
	
	@Test
	public void getters() {
		// when
		AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);

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
		//given
		AnniversaryNoticeDto nullDto = AnniversaryNoticeDto.builder().build();
		AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);
		
		//when
		domain.setMemento(nullDto);
		
		//then
		NtsAssert.invokeGetters(domain);
		}
	
	@Test
	//todayAnniversary.addDays(-noticeDay).compareTo(GeneralDate.today()) < 0
	public void createFromContrucstorBeforeToday() {
		// when
		int todayDate = GeneralDate.today().day();
		int todayMonth = GeneralDate.today().month();
		AnniversaryNotice domainBeforeToday = new AnniversaryNotice("personalId",7,MonthDay.of(todayMonth, todayDate),"anniversaryTitle","notificationMessage");
		
		// then
		assertThat(domainBeforeToday.getSeenDate()).isEqualTo(GeneralDate.today());
	}
	
	@Test
	//todayAnniversary.addDays(-noticeDay).compareTo(GeneralDate.today()) = 0
	public void createFromContrucstorToday() {
		// when
		int todayDate = GeneralDate.today().day();
		int todayMonth = GeneralDate.today().month();
		AnniversaryNotice domainToday = new AnniversaryNotice("personalId",0,MonthDay.of(todayMonth, todayDate),"anniversaryTitle","notificationMessage");
		
		// then
		assertThat(domainToday.getSeenDate()).isEqualTo(GeneralDate.today());
	}
	
	@Test
	//todayAnniversary.addDays(-noticeDay).compareTo(GeneralDate.today()) > 0
	public void createFromContrucstorAfterToday() {
		// when
		GeneralDate tomorrow = GeneralDate.today().addDays(1);
		int tomorrowDate = tomorrow.day();
		int tomorrowMonth =tomorrow.month();
		AnniversaryNotice domainToday = new AnniversaryNotice("personalId",0,MonthDay.of(tomorrowMonth, tomorrowDate),"anniversaryTitle","notificationMessage");
		
		// then
		assertThat(domainToday.getSeenDate()).isEqualTo(tomorrow.addYears(-1));
	}
	
	@Test
	//checkDate.compareTo(date) < 0
	public void isNewAnniversaryTest1() { 
		//given
		int todayDate = GeneralDate.today().day();
		int todayMonth = GeneralDate.today().month();
		AnniversaryNotice domain = new AnniversaryNotice("personalId",0,MonthDay.of(todayMonth, todayDate),"anniversaryTitle","notificationMessage");
		
		//when
		boolean isNew = domain.isNewAnniversary(GeneralDate.today().addYears(1).addMonths(1).addDays(1));
		
		// then
		assertThat(isNew).isTrue();

	}
	
	@Test
	//checkDate.compareTo(date) = 0
	public void isNewAnniversaryTest2() { 
	//given
	int todayDate = GeneralDate.today().day();
	int todayMonth = GeneralDate.today().month();
	AnniversaryNotice domain = new AnniversaryNotice("personalId",0,MonthDay.of(todayMonth, todayDate),"anniversaryTitle","notificationMessage");
	
	//when
	boolean isNew = domain.isNewAnniversary(GeneralDate.today().addYears(1));
	
	// then
	assertThat(isNew).isTrue();
	}
	
	@Test
	//checkDate.compareTo(date) > 0
	public void isNotNewAnniversaryTest() { 
	//given
	int todayDate = GeneralDate.today().day();
	int todayMonth = GeneralDate.today().month();
	AnniversaryNotice domain = new AnniversaryNotice("personalId",0,MonthDay.of(todayMonth, todayDate),"anniversaryTitle","notificationMessage");
	
	//when
	boolean isNew = domain.isNewAnniversary(GeneralDate.today());
	
	//then
	assertThat(isNew).isFalse(); 
	}
	
	@Test
	//checkDate.compareTo(date) < 0
	public void updateSeenDateTest1( ) {
		//given
		AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);
		
		//when
		domain.updateSeenDate(GeneralDate.ymd(2020,10,7));
		
		//then
		assertThat(domain.getSeenDate()).isEqualTo(GeneralDate.ymd(2020,10,7)); 
	}
	
	@Test
	//checkDate.compareTo(date) = 0
	public void updateSeenDateTest2( ) {
		//given
		AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);

		//when
		//is 10/07
		domain.updateSeenDate(GeneralDate.ymd(2020,10,6));
		
		//then
		assertThat(domain.getSeenDate()).isEqualTo(GeneralDate.ymd(2020,10,7));
	}
	
	@Test
	//checkDate.compareTo(date) > 0
	public void updateSeenDateTest3( ) {
		//given
		AnniversaryNotice domain = AnniversaryNotice.createFromMemento(mockDto);
				
		//when
		//after 10/07
		domain.updateSeenDate(GeneralDate.ymd(2020,10,5));
		
		//then
		assertThat(domain.getSeenDate()).isEqualTo(GeneralDate.ymd(2019,10,7));
	}
}
