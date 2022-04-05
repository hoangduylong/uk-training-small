package nts.uk.ctx.sys.portal.dom.notice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.notice.adapter.TargetInformationDto;

public class MessageNoticeHelper {
	
	private static final String CREATOR_ID = "31559a03-1f9a-47ea-8ae5-85364ff7e3fc";
	private static final GeneralDateTime INPUT_DATE = GeneralDateTime.ymdhms(2020, 10, 10, 10, 10, 10);
	private static final GeneralDateTime MODIFIED_DATE = GeneralDateTime.ymdhms(2020, 10, 10, 10, 10, 10);
	private static final TargetInformationDto TARGET_INFOR = TargetInformationDto.builder().destination(2)
			.targetSIDs(Arrays.asList("dbbf9205-9052-4dd0-b0c7-649261372fe0")).targetWpids(new ArrayList<String>())
			.build();
	private static final TargetInformationDto TARGET_INFOR_NULL_DEST = TargetInformationDto.builder().destination(null)
			.targetSIDs(new ArrayList<String>()).targetWpids(new ArrayList<String>()).build();
	private static final TargetInformationDto TARGET_INFOR_NOT_INCLUDE = TargetInformationDto.builder().destination(10)
			.targetSIDs(new ArrayList<String>()).targetWpids(new ArrayList<String>()).build();
	private static final GeneralDate START_DATE = GeneralDate.ymd(2020, 11, 11);
	private static final GeneralDate END_DATE = GeneralDate.ymd(2020, 11, 20);
	private static final List<String> EMPLOYEE_SEEN = Arrays.asList("dbbf9205-9052-4dd0-b0c7-649261372fe0");
	private static final String NOTICE_MESSAGE = "This is mock test notification";

	public static MessageNoticeDto mockDto = MessageNoticeDto.builder().creatorID(CREATOR_ID).inputDate(INPUT_DATE)
			.modifiedDate(MODIFIED_DATE).targetInformation(TARGET_INFOR).startDate(START_DATE).endDate(END_DATE)
			.employeeIdSeen(EMPLOYEE_SEEN).notificationMessage(NOTICE_MESSAGE).build();

	public static MessageNoticeDto mockDtoNullDest = MessageNoticeDto.builder().creatorID(CREATOR_ID)
			.inputDate(INPUT_DATE).modifiedDate(MODIFIED_DATE).targetInformation(TARGET_INFOR_NULL_DEST)
			.startDate(START_DATE).endDate(END_DATE).employeeIdSeen(EMPLOYEE_SEEN).notificationMessage(NOTICE_MESSAGE)
			.build();

	public static MessageNoticeDto mockDtoNotIncludeDest = MessageNoticeDto.builder().creatorID(CREATOR_ID)
			.inputDate(INPUT_DATE).modifiedDate(MODIFIED_DATE).targetInformation(TARGET_INFOR_NOT_INCLUDE)
			.startDate(START_DATE).endDate(END_DATE).employeeIdSeen(EMPLOYEE_SEEN).notificationMessage(NOTICE_MESSAGE)
			.build();
	
	public static MessageNoticeDto mockDtoNull = MessageNoticeDto.builder().creatorID(CREATOR_ID).inputDate(INPUT_DATE)
			.modifiedDate(MODIFIED_DATE).targetInformation(null).startDate(null).endDate(null)
			.employeeIdSeen(EMPLOYEE_SEEN).notificationMessage(null).build();
}
