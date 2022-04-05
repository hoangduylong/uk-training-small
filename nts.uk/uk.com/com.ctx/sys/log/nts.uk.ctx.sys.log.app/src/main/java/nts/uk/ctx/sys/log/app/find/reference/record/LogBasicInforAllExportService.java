package nts.uk.ctx.sys.log.app.find.reference.record;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.arc.layer.app.file.export.ExportService;
import nts.arc.layer.app.file.export.ExportServiceContext;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.log.dom.reference.RecordTypeEnum;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.infra.file.csv.CSVFileData;
import nts.uk.shr.infra.file.csv.CSVReportGenerator;

@Stateless
public class LogBasicInforAllExportService extends ExportService<LogDataExportCsv> {
	
	@Inject
	private CSVReportGenerator generator;

	@Inject
	private LogBasicInformationAllFinder logBasicFinder;

	private static final String FILE_EXTENSION = ".csv";
	private static final String PGID = "CLI003";

	private List<Map<String, Object>> getLoginRecordData(List<String> listHeader, List<String> listHeaderSelected, List<LogBasicInfoAllDto> params) {
		List<Map<String, Object>> dataSource = new ArrayList<>();
		for (LogBasicInfoAllDto data : params) {
					Map<String, Object> row = new HashMap<>();
					row.put(listHeader.get(0), data.getUserId());
					row.put(listHeader.get(1), data.getUserName());
					row.put(listHeader.get(2), data.getEmployeeCode());
					row.put(listHeader.get(3), data.getIpAddress());
					row.put(listHeader.get(4), data.getPcName());
					row.put(listHeader.get(5), data.getAccount());
					row.put(listHeader.get(6), data.getModifyDateTime());
					row.put(listHeader.get(7), data.getEmploymentAuthorityName());
					row.put(listHeader.get(8), data.getSalarytAuthorityName());
					row.put(listHeader.get(9), data.getPersonalAuthorityName());
	                row.put(listHeader.get(10), data.getOfficeHelperAuthorityName());
					row.put(listHeader.get(11), data.getAccountAuthorityName());
					row.put(listHeader.get(12), data.getMyNumberAuthorityName());
					row.put(listHeader.get(13), data.getGroupCompanyAdminAuthorityName());
					row.put(listHeader.get(14), data.getCompanyAdminAuthorityName());
					row.put(listHeader.get(15), data.getSystemAdminAuthorityName());
					row.put(listHeader.get(16), data.getPersonalInfoAuthorityName());
					row.put(listHeader.get(17), data.getMenuName());
					row.put(listHeader.get(18), data.getLoginStatus());
					row.put(listHeader.get(19), data.getLoginMethod());
					row.put(listHeader.get(20), data.getAccessResourceUrl());
					row.put(listHeader.get(21), data.getNote());
					dataSource.add(this.filterMap(row, listHeaderSelected));
		}
		return dataSource;
	}
	
	private List<Map<String, Object>> getStartUpData(List<String> listHeader, List<String> listHeaderSelected, List<LogBasicInfoAllDto> params) {
		List<Map<String, Object>> dataSource = new ArrayList<>();
		for (LogBasicInfoAllDto data : params) {
			Map<String, Object> row = new HashMap<>();
			row.put(listHeader.get(0), data.getUserId());
			row.put(listHeader.get(1), data.getUserName());
			row.put(listHeader.get(2), data.getEmployeeCode());
			row.put(listHeader.get(3), data.getIpAddress());
			row.put(listHeader.get(4), data.getPcName());
			row.put(listHeader.get(5), data.getAccount());
			row.put(listHeader.get(6), data.getModifyDateTime());
			row.put(listHeader.get(7), data.getEmploymentAuthorityName());
			row.put(listHeader.get(8), data.getSalarytAuthorityName());
			row.put(listHeader.get(9), data.getPersonalAuthorityName());
			row.put(listHeader.get(10), data.getOfficeHelperAuthorityName());
			row.put(listHeader.get(11), data.getAccountAuthorityName());
			row.put(listHeader.get(12), data.getMyNumberAuthorityName());
			row.put(listHeader.get(13), data.getGroupCompanyAdminAuthorityName());
			row.put(listHeader.get(14), data.getCompanyAdminAuthorityName());
			row.put(listHeader.get(15), data.getSystemAdminAuthorityName());
			row.put(listHeader.get(16), data.getPersonalInfoAuthorityName());
			row.put(listHeader.get(17), data.getNote());
			row.put(listHeader.get(18), data.getMenuName());
			row.put(listHeader.get(19), data.getStartUpMenuName());
			dataSource.add(this.filterMap(row, listHeaderSelected));
		}
		return dataSource;
	}
	
	private List<Map<String, Object>> getDataCorrectLog(List<String> listHeader, List<String> listHeaderSelected, List<LogBasicInfoAllDto> params) {
		List<Map<String, Object>> dataSource = new ArrayList<>();
		for (LogBasicInfoAllDto data: params) {
			if(data.getLogDataCorrectChildrenDtos().isEmpty()) {
				Map<String, Object> row = new HashMap<>();
				row.put(listHeader.get(0), data.getUserId());
				row.put(listHeader.get(1), data.getUserName());
				row.put(listHeader.get(2), data.getEmployeeCode());
				row.put(listHeader.get(3), data.getIpAddress());
				row.put(listHeader.get(4), data.getPcName());
				row.put(listHeader.get(5), data.getAccount());
				row.put(listHeader.get(6), data.getModifyDateTime());
				row.put(listHeader.get(7), data.getEmploymentAuthorityName());
				row.put(listHeader.get(8), data.getSalarytAuthorityName());
				row.put(listHeader.get(9), data.getPersonalAuthorityName());
				row.put(listHeader.get(10), data.getOfficeHelperAuthorityName());
				row.put(listHeader.get(11), data.getAccountAuthorityName());
				row.put(listHeader.get(12), data.getMyNumberAuthorityName());
				row.put(listHeader.get(13), data.getGroupCompanyAdminAuthorityName());
				row.put(listHeader.get(14), data.getCompanyAdminAuthorityName());
				row.put(listHeader.get(15), data.getSystemAdminAuthorityName());
				row.put(listHeader.get(16), data.getPersonalInfoAuthorityName());
				row.put(listHeader.get(17), data.getMenuName());
				for(int i = 18; i < 32; i++) {
					row.put(listHeader.get(i), "");
				}
				dataSource.add(this.filterMap(row, listHeaderSelected));
			} else {
				for(LogDataCorrectChildrenDto child : data.getLogDataCorrectChildrenDtos()) {
					Map<String, Object> row = new HashMap<>();
					row.put(listHeader.get(0), data.getUserId());
					row.put(listHeader.get(1), data.getUserName());
					row.put(listHeader.get(2), data.getEmployeeCode());
					row.put(listHeader.get(3), data.getIpAddress());
					row.put(listHeader.get(4), data.getPcName());
					row.put(listHeader.get(5), data.getAccount());
					row.put(listHeader.get(6), data.getModifyDateTime());
					row.put(listHeader.get(7), data.getEmploymentAuthorityName());
					row.put(listHeader.get(8), data.getSalarytAuthorityName());
					row.put(listHeader.get(9), data.getPersonalAuthorityName());
					row.put(listHeader.get(10), data.getOfficeHelperAuthorityName());
					row.put(listHeader.get(11), data.getAccountAuthorityName());
					row.put(listHeader.get(12), data.getMyNumberAuthorityName());
					row.put(listHeader.get(13), data.getGroupCompanyAdminAuthorityName());
					row.put(listHeader.get(14), data.getCompanyAdminAuthorityName());
					row.put(listHeader.get(15), data.getSystemAdminAuthorityName());
					row.put(listHeader.get(16), data.getPersonalInfoAuthorityName());
					row.put(listHeader.get(17), data.getMenuName());
					row.put(listHeader.get(18), child.getTargetUserId());
					row.put(listHeader.get(19), child.getTargetUserName());
					row.put(listHeader.get(20), child.getTargetEmployeeCode());
					row.put(listHeader.get(21), child.getTargetYmd());
					row.put(listHeader.get(22), child.getTargetYm());
					row.put(listHeader.get(23), child.getTargetY());
					row.put(listHeader.get(24), child.getTarget());
					row.put(listHeader.get(25), child.getCategoryCorrection());
					row.put(listHeader.get(26), child.getTargetItem());
					row.put(listHeader.get(27), child.getItemValueBefore());
					row.put(listHeader.get(28), child.getItemValueAfter());
					row.put(listHeader.get(29), child.getItemContentBefore());
					row.put(listHeader.get(30), child.getItemContentAfter());
					row.put(listHeader.get(31), child.getRemark());
					dataSource.add(this.filterMap(row, listHeaderSelected));
				}
			}
			
		}
		return dataSource;
	}
	
	private List<Map<String, Object>> getPersonInfoUpdate(List<String> listHeader, List<String> listHeaderSelected, List<LogBasicInfoAllDto> params) {
		List<Map<String, Object>> dataSource = new ArrayList<>();
		for (LogBasicInfoAllDto data : params) {
			if (data.getLogPersonalUpdateChildrenDtos().isEmpty()) {
				Map<String, Object> row = new HashMap<>();
				row.put(listHeader.get(0), data.getUserId());
				row.put(listHeader.get(1), data.getUserName());
				row.put(listHeader.get(2), data.getEmployeeCode());
				row.put(listHeader.get(3), data.getIpAddress());
				row.put(listHeader.get(4), data.getPcName());
				row.put(listHeader.get(5), data.getAccount());
				row.put(listHeader.get(6), data.getModifyDateTime());
				row.put(listHeader.get(7), data.getEmploymentAuthorityName());
				row.put(listHeader.get(8), data.getSalarytAuthorityName());
				row.put(listHeader.get(9), data.getPersonalAuthorityName());
				row.put(listHeader.get(10), data.getOfficeHelperAuthorityName());
				row.put(listHeader.get(11), data.getAccountAuthorityName());
				row.put(listHeader.get(12), data.getMyNumberAuthorityName());
				row.put(listHeader.get(13), data.getGroupCompanyAdminAuthorityName());
				row.put(listHeader.get(14), data.getCompanyAdminAuthorityName());
				row.put(listHeader.get(15), data.getSystemAdminAuthorityName());
				row.put(listHeader.get(16), data.getPersonalInfoAuthorityName());
				row.put(listHeader.get(17), data.getMenuName());
				for (int i = 18; i < 35; i++) {
					row.put(listHeader.get(i), "");
				}
				row.put(listHeader.get(35), data.getNote());
				dataSource.add(this.filterMap(row, listHeaderSelected));
			} else {
				for (LogPersonalUpdateChildrenDto child : data.getLogPersonalUpdateChildrenDtos()) {
					Map<String, Object> row = new HashMap<>();
					row.put(listHeader.get(0), data.getUserId());
					row.put(listHeader.get(1), data.getUserName());
					row.put(listHeader.get(2), data.getEmployeeCode());
					row.put(listHeader.get(3), data.getIpAddress());
					row.put(listHeader.get(4), data.getPcName());
					row.put(listHeader.get(5), data.getAccount());
					row.put(listHeader.get(6), data.getModifyDateTime());
					row.put(listHeader.get(7), data.getEmploymentAuthorityName());
					row.put(listHeader.get(8), data.getSalarytAuthorityName());
					row.put(listHeader.get(9), data.getPersonalAuthorityName());
					row.put(listHeader.get(10), data.getOfficeHelperAuthorityName());
					row.put(listHeader.get(11), data.getAccountAuthorityName());
					row.put(listHeader.get(12), data.getMyNumberAuthorityName());
					row.put(listHeader.get(13), data.getGroupCompanyAdminAuthorityName());
					row.put(listHeader.get(14), data.getCompanyAdminAuthorityName());
					row.put(listHeader.get(15), data.getSystemAdminAuthorityName());
					row.put(listHeader.get(16), data.getPersonalInfoAuthorityName());
					row.put(listHeader.get(17), data.getMenuName());
					row.put(listHeader.get(18), child.getTargetUserId());
					row.put(listHeader.get(19), child.getTargetUserName());
					row.put(listHeader.get(20), child.getTargetEmployeeCode());
					row.put(listHeader.get(21), child.getCategoryProcess());
					row.put(listHeader.get(22), child.getCategoryName());
					row.put(listHeader.get(23), child.getMethodCorrection());
					row.put(listHeader.get(24), child.getTargetYmd());
					row.put(listHeader.get(25), child.getTargetYm());
					row.put(listHeader.get(26), child.getTargetY());
					row.put(listHeader.get(27), child.getTarget());
					row.put(listHeader.get(28), child.getItemName());
					row.put(listHeader.get(29), child.getItemValueBefore());
					row.put(listHeader.get(30), child.getItemContentBefore());
					row.put(listHeader.get(31), child.getItemValueAfter());
					row.put(listHeader.get(32), child.getItemContentAfter());
					row.put(listHeader.get(33), child.getCorrectionItem());
					row.put(listHeader.get(34), child.getCorrectionYmd());
					row.put(listHeader.get(35), data.getNote());
					dataSource.add(this.filterMap(row, listHeaderSelected));
				}
			}
		}
		return dataSource;
	}

	private Map<String, Object> filterMap(Map<String, Object> map, List<String> selectedHeader) {
		return map.entrySet().stream() 
			          .filter(m -> selectedHeader.stream().anyMatch(item -> item.equals(m.getKey())) ) 
			          .collect(Collectors.toMap(m -> m.getKey(), m -> m.getValue() == null ? "" : m.getValue()));
	}

	@Override
	protected void handle(ExportServiceContext<LogDataExportCsv> context) {
		LogDataExportCsv params = context.getQuery();
		List<String> listHeader = new ArrayList<>();
		List<String> listHeaderAll = params.getLstSelectedItemHeader();
		listHeader.addAll(params.getLstHeaderDto());
		listHeader.addAll(params.getLstSubHeaderDto());
		List<LogBasicInfoAllDto> logs = this.logBasicFinder.findByOperatorsAndDate(params.getLogParams());
		List<Map<String, Object>> dataSource = new ArrayList<>();
		RecordTypeEnum recordTypeEnum = RecordTypeEnum.valueOf(params.getLogParams().getRecordType());
		switch (recordTypeEnum) {
		case LOGIN:
			dataSource = getLoginRecordData(listHeaderAll, listHeader, logs);
			break;
		case START_UP:
			dataSource = getStartUpData(listHeaderAll, listHeader, logs);
			break;
		case UPDATE_PERSION_INFO:
			dataSource = getPersonInfoUpdate(listHeaderAll, listHeader, logs);
			break;
		case DATA_CORRECT:
			dataSource = getDataCorrectLog(listHeaderAll, listHeader, logs);
			break;
		default:
			break;
		}
		String employeeCode = AppContexts.user().employeeCode();
		CSVFileData fileData = new CSVFileData(
				PGID + "_" + GeneralDateTime.now().toString("yyyyMMddHHmmss") + "_" + employeeCode + FILE_EXTENSION, listHeader, dataSource);
		generator.generate(context.getGeneratorContext(), fileData);
	}
}
