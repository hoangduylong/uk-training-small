package nts.uk.ctx.sys.portal.dom.notice;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;

import org.junit.Test;

import mockit.Mocked;
import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * Test doamin UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.お知らせメッセージ
 * 
 * @author DungDV
 *
 */
public class MessageNoticeTest {

	@Mocked
	private static MessageNoticeDto mockDto = MessageNoticeHelper.mockDto;

	@Mocked
	private static MessageNoticeDto mockDtoNullDest = MessageNoticeHelper.mockDtoNullDest;

	@Mocked
	private static MessageNoticeDto mockDtoNotIncludeDest = MessageNoticeHelper.mockDtoNotIncludeDest;

	@Test
	public void getters() {
		// when
		MessageNotice domain = MessageNotice.createFromMemento(mockDto);
		MessageNotice domainNullDest = MessageNotice.createFromMemento(mockDtoNullDest);
		MessageNotice domainNotIncludeDest = MessageNotice.createFromMemento(mockDtoNotIncludeDest);

		// then
		NtsAssert.invokeGetters(domain);
		NtsAssert.invokeGetters(domainNullDest);
		NtsAssert.invokeGetters(domainNotIncludeDest);
	}

	@Test
	public void gettersNull() {
		// given
		MessageNoticeDto dtoNull = MessageNoticeDto.builder().creatorID("31559a03-1f9a-47ea-8ae5-85364ff7e3fc")
				.inputDate(GeneralDateTime.now()).build();

		// when
		MessageNotice domain = new MessageNotice();
		domain.getMemento(dtoNull);

		// then
		NtsAssert.invokeGetters(domain);
	}

	/**
	 * Check constructor
	 */
	@Test
	public void constructorC1() {
		// given
		String creatorID = "creatorID";
		GeneralDateTime modifiedDate = GeneralDateTime.now();
		TargetInformation targetInformation = new TargetInformation();
		DatePeriod datePeriod = new DatePeriod(GeneralDate.ymd(2020, 11, 10), GeneralDate.ymd(2020, 11, 20));

		// when
		MessageNotice domain = new MessageNotice(creatorID, modifiedDate, targetInformation, datePeriod);

		// then
		assertThat(domain.getEmployeeIdSeen()).isEqualTo(new ArrayList<>());
		assertThat(domain.getInputDate().toString("yyyy-MM-dd hh:mm")).isEqualTo(GeneralDateTime.now().toString("yyyy-MM-dd hh:mm"));
	}

	/**
	 * Check createFromMemento and getMemento
	 */
	@Test
	public void createFromMementoTest() {
		// when
		MessageNotice domain = MessageNotice.createFromMemento(mockDto);
		MessageNotice domainNullDest = MessageNotice.createFromMemento(mockDtoNullDest);
		MessageNotice domainNotIncludeDest = MessageNotice.createFromMemento(mockDtoNotIncludeDest);

		// then
		assertThat(domain.getCreatorID()).isEqualTo(mockDto.getCreatorID());
		assertThat(domain.getInputDate()).isEqualTo(mockDto.getInputDate());
		assertThat(domain.getModifiedDate()).isEqualTo(mockDto.getModifiedDate());
		assertThat(domain.getNotificationMessage().v()).isEqualTo(mockDto.getNotificationMessage());
		assertThat(domain.getTargetInformation().getDestination())
				.isEqualTo(mockDto.getTargetInformation().getDestination());
		assertThat(domainNotIncludeDest.getTargetInformation().getDestination()).isNull();
		assertThat(domainNullDest.getTargetInformation().getDestination()).isNull();
		assertThat(domain.getTargetInformation().getTargetSIDs())
				.isEqualTo(mockDto.getTargetInformation().getTargetSIDs());
		assertThat(domainNotIncludeDest.getTargetInformation().getDestination()).isNull();
		assertThat(domainNullDest.getTargetInformation().getDestination()).isNull();
		assertThat(domain.getTargetInformation().getTargetWpids())
				.isEqualTo(mockDto.getTargetInformation().getTargetWpids());
		assertThat(domainNotIncludeDest.getTargetInformation().getDestination())
				.isEqualTo(mockDtoNullDest.getTargetInformation().getDestination());
		assertThat(domainNullDest.getTargetInformation().getDestination())
				.isEqualTo(mockDtoNotIncludeDest.getTargetInformation().getDestination());
		assertThat(domain.getDatePeriod().start()).isEqualTo(mockDto.getStartDate());
		assertThat(domain.getDatePeriod().end()).isEqualTo(mockDto.getEndDate());
		assertThat(domain.getEmployeeIdSeen()).isNotEmpty();
		assertThat(domain.getEmployeeIdSeen()).isEqualTo(mockDto.getEmployeeIdSeen());
	}

	/**
	 * Check setMemento
	 */
	@Test
	public void setMementoTest() {
		// given
		MessageNoticeDto nullDto = MessageNoticeDto.builder().build();

		// when
		MessageNotice domain = MessageNotice.createFromMemento(mockDto);
		domain.setMemento(nullDto);

		// then
		assertThat(nullDto.getCreatorID()).isEqualTo(domain.getCreatorID());
		assertThat(nullDto.getInputDate()).isEqualTo(domain.getInputDate());
		assertThat(nullDto.getModifiedDate()).isEqualTo(domain.getModifiedDate());
		assertThat(nullDto.getStartDate()).isEqualTo(domain.getDatePeriod().start());
		assertThat(nullDto.getEndDate()).isEqualTo(domain.getDatePeriod().end());
		assertThat(nullDto.getEmployeeIdSeen()).isEqualTo(domain.getEmployeeIdSeen());
		assertThat(nullDto.getNotificationMessage()).isEqualTo(domain.getNotificationMessage().v());
		assertThat(nullDto.getTargetInformation().getDestination())
				.isEqualTo(domain.getTargetInformation().getDestination());
		assertThat(nullDto.getTargetInformation().getTargetSIDs())
				.isEqualTo(domain.getTargetInformation().getTargetSIDs());
		assertThat(nullDto.getTargetInformation().getTargetWpids())
				.isEqualTo(domain.getTargetInformation().getTargetWpids());
	}

	/**
	 * Check setMemento
	 */
	@Test
	public void setMementoTestWithNull() {
		// given
		MessageNoticeDto nullDto = MessageNoticeDto.builder().build();

		// when
		MessageNotice domain = MessageNotice.createFromMemento(MessageNoticeHelper.mockDtoNull);
		domain.setMemento(nullDto);

		// then
		assertThat(nullDto.getCreatorID()).isEqualTo(domain.getCreatorID());
		assertThat(nullDto.getInputDate()).isEqualTo(domain.getInputDate());
		assertThat(nullDto.getModifiedDate()).isEqualTo(domain.getModifiedDate());
		assertThat(nullDto.getStartDate()).isNull();
		assertThat(nullDto.getEndDate()).isNull();
		assertThat(nullDto.getEmployeeIdSeen()).isEqualTo(domain.getEmployeeIdSeen());
		assertThat(nullDto.getNotificationMessage()).isEqualTo(domain.getNotificationMessage().v());
		assertThat(nullDto.getTargetInformation()).isNull();
	}
}
