package nts.uk.ctx.sys.log.app.find.reference.record;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.gul.text.IdentifierUtil;
import nts.uk.shr.com.i18n.TextResource;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.CategoryCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.InfoOperateAttr;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.ItemInfo;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoProcessAttr;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.TargetDataKey.CalendarKeyType;

/**
 * 
 * @author Thuongtv
 *
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LogPerCateCorrectRecordDto {
	private String parentKey;
	private String childrentKey;
	private String operationId;
	private String categoryName; //23
	private String targetDate; //25/26/27/28
	private String itemName;//29
	private String valueBefore;//31
	private String valueAfter;//33
	private String infoOperateAttr;//24
	
	public static List<LogPerCateCorrectRecordDto> fromDomain(PersonInfoCorrectionLog domain,String parentKey,HashMap<Integer, HashMap<String, Integer>> mapCheckOrder) {
		HashMap<String, Integer> mapCateOder = new HashMap<>();
		HashMap<String, Integer> mapItemOder = new HashMap<>();
		int numberOrder = 10001;
		if (mapCheckOrder != null) {
			mapCateOder = mapCheckOrder.get(0);
			mapItemOder = mapCheckOrder.get(1);
		}
		List<LogPerCateCorrectRecordDto> listReturn = new ArrayList<>();
		List<CategoryCorrectionLogDto> listCategory = new ArrayList<>();
		
		List<CategoryCorrectionLog> rsListCategoryCorrectionLog = domain.getCategoryCorrections();
		
		for (CategoryCorrectionLog categoryCorrectionLog : rsListCategoryCorrectionLog) {
			List<ItemInfoDto> lstItemInfoDto= new ArrayList<>();
			List<ItemInfo> lstItemInfo= categoryCorrectionLog.getItemInfos();
			String categoryId = categoryCorrectionLog.getCategoryId();
			if(!CollectionUtil.isEmpty(lstItemInfo)){
				// Convert domain to DTO
				for (ItemInfo itemInfo : lstItemInfo) {
					String itemInfroId = itemInfo.getItemId();
					if (mapItemOder.containsKey(itemInfroId)) {
						numberOrder = mapItemOder.get(itemInfroId);
					}
					lstItemInfoDto.add(new ItemInfoDto(itemInfo.getId(), itemInfo.getItemId(), itemInfo.getName(), itemInfo.getValueBefore().getViewValue(),
							itemInfo.getValueAfter().getViewValue(), numberOrder));
				}
				// Sort list by number order
				lstItemInfoDto = lstItemInfoDto.stream().sorted(Comparator.comparing(ItemInfoDto::getNumberOrder))
						.collect(Collectors.toList());
			}
			if (mapCateOder.containsKey(categoryId)) {
				numberOrder = mapCateOder.get(categoryId);
			}
			// Convert and add Dto to list
			listCategory.add(new CategoryCorrectionLogDto(categoryCorrectionLog.getCategoryId(),
					categoryCorrectionLog.getCategoryName(),
					categoryCorrectionLog.getInfoOperateAttr(),
					categoryCorrectionLog.getTargetKey(),
					lstItemInfoDto,
					categoryCorrectionLog.getReviseInfo(),
					numberOrder));
		}
		// Sort list by catefory number order
		listCategory = listCategory.stream().sorted(Comparator.comparing(CategoryCorrectionLogDto::getNumberOrder))
				.collect(Collectors.toList());
		// Setting list to list return
		for(CategoryCorrectionLogDto categoryCorrectionLog:listCategory){
			List<ItemInfoDto> rsItemInfo=categoryCorrectionLog.getItemInfos();
			// Setting tagetDate
			String tagetDateStr = "";
			if (categoryCorrectionLog.getTargetKey().getDateKey().isPresent()) {
				GeneralDate tagetDate = categoryCorrectionLog.getTargetKey().getDateKey().get();
				CalendarKeyType calendarKeyType = categoryCorrectionLog.getTargetKey().getCalendarKeyType();
				if (tagetDate != null) {
					if (calendarKeyType.value == CalendarKeyType.DATE.value) {
						tagetDateStr = tagetDate.toString("yyyy/MM/dd");
					}
					if (calendarKeyType.value == CalendarKeyType.YEARMONTH.value) {
						tagetDateStr = tagetDate.toString("yyyy/MM");
					}
					if (calendarKeyType.value == CalendarKeyType.YEAR.value) {
						tagetDateStr = tagetDate.toString("yyyy");

					}
				}
			}
			if(!CollectionUtil.isEmpty(rsItemInfo)){
				for (ItemInfoDto itemInfo : rsItemInfo) {
					LogPerCateCorrectRecordDto perObject = new LogPerCateCorrectRecordDto();
					String childrentKey = IdentifierUtil.randomUniqueId();
					perObject.setParentKey(parentKey);
					perObject.setChildrentKey(childrentKey);
					// Fist record
					perObject.setOperationId(domain.getOperationId());
					// item 23
					perObject.setCategoryName(categoryCorrectionLog.getCategoryName());
					// item 24
					perObject.setInfoOperateAttr(LogPerCateCorrectRecordDto.getinfoOperateAttr(categoryCorrectionLog.getInfoOperateAttr().value));
					// item 25,26,27,28
					perObject.setTargetDate(tagetDateStr);

					// item 29,31,33
					perObject.setItemName(itemInfo.getName());
					perObject.setValueBefore(itemInfo.getValueBefore());
					perObject.setValueAfter(itemInfo.getValueAfter());
					listReturn.add(perObject);
				}
				
			}else{
				LogPerCateCorrectRecordDto perObject = new LogPerCateCorrectRecordDto();
				perObject.setParentKey(parentKey);
				String childrentKey = IdentifierUtil.randomUniqueId();
				perObject.setChildrentKey(childrentKey);
				perObject.setOperationId(domain.getOperationId());
				// item 23
				perObject.setCategoryName(categoryCorrectionLog.getCategoryName());
				// item 24
				perObject.setInfoOperateAttr(LogPerCateCorrectRecordDto.getinfoOperateAttr(categoryCorrectionLog.getInfoOperateAttr().value));
				// item 25,26,27,28
				perObject.setTargetDate(tagetDateStr);
				listReturn.add(perObject);
			}
		}
		return listReturn;
	}
	
	public static String getPersonInfoProcessAttr(int attr) {
		PersonInfoProcessAttr personInfoProcessAttr = PersonInfoProcessAttr.valueOf(attr);
		switch (personInfoProcessAttr) {
		case ADD:
			return TextResource.localize("Enum_PersonInfoProcess_ADD");
		case UPDATE:
			return TextResource.localize("Enum_PersonInfoProcess_UPDATE");
		case LOGICAL_DELETE:
			return TextResource.localize("Enum_PersonInfoProcess_LOGICAL_DELETE");
		case COMPLETE_DELETE:
			return TextResource.localize("Enum_PersonInfoProcess_COMPLETE_DELETE");
		case RESTORE_LOGICAL_DELETE:
			return TextResource.localize("Enum_PersonInfoProcess_RESTORE_LOGICAL_DELETE");
		case TRANSFER:
			return TextResource.localize("Enum_PersonInfoProcess_TRANSFER");
		case RETURN:
			return TextResource.localize("Enum_PersonInfoProcess_RETURN");
		default:
			return "";
		}
	}

	public static String getinfoOperateAttr(int attr) {
		InfoOperateAttr infoOperateAttr = InfoOperateAttr.valueOf(attr);
		switch (infoOperateAttr) {
		case ADD:
			return TextResource.localize("Enum_InfoOperate_ADD");
		case UPDATE:
			return TextResource.localize("Enum_InfoOperate_UPDATE");
		case DELETE:
			return TextResource.localize("Enum_InfoOperate_DELETE");
		case ADD_HISTORY:
			return TextResource.localize("Enum_InfoOperate_ADD_HISTORY");
		case DELETE_HISTORY:
			return TextResource.localize("Enum_InfoOperate_DELETE_HISTORY");
		default:
			return "";
		}
	}
}
