//package nts.uk.ctx.sys.log.app.find.reference.record;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.ejb.Stateless;
//import javax.inject.Inject;
//
//import nts.arc.layer.app.file.export.ExportService;
//import nts.arc.layer.app.file.export.ExportServiceContext;
//import nts.arc.time.GeneralDateTime;
//import nts.gul.collection.CollectionUtil;
//import nts.uk.ctx.sys.log.app.find.reference.LogOutputItemDto;
//import nts.uk.ctx.sys.log.dom.reference.RecordTypeEnum;
//import nts.uk.shr.com.context.AppContexts;
//import nts.uk.shr.com.security.audittrail.correction.content.TargetDataType;
//import nts.uk.shr.infra.file.csv.CSVFileData;
//import nts.uk.shr.infra.file.csv.CSVReportGenerator;
//
//@Stateless
//public class LogBasicInforExportDataService extends ExportService<LogParams> {
//	@Inject
//	private CSVReportGenerator generator;
//
//	private static final String FILE_EXTENSION = ".csv";
//
//	private List<Map<String, Object>> getStartUpData(List<String> params,List<String> headers) {
//		List<Map<String, Object>> dataSource = new ArrayList<>();
//		
//		for (String d : params) {
//			Map<String, Object> row = new HashMap<>();
//			row.put(headers.get(0),d);
//			dataSource.add(row);
//		}
//		return dataSource;
//	}
//	
//
//
//	@Override
//	protected void handle(ExportServiceContext<LogParams> context) {
//
//		List<String> headers = new ArrayList<>();
//		headers.add("KEY");
//		List<Map<String, Object>> dataSource = new ArrayList<>();
//		List<String> dataExportParent = new ArrayList<>();
//		List<String> dataExportChild = new ArrayList<>();
//		List<String> dataStartUp = new ArrayList<>();
//		String strZero1= "00000000";// <10
//		String strZero2= "0000000";//10 <= a < 100
//		String strZero3= "000000";//100 <= b
//		
//		for (int i = 1; i < 501; i++) {
//			
//			String data1="INSERT [dbo].[SRCDT_LOG_BASIC_INFO] ([INS_DATE], [INS_CCD], [INS_SCD], [INS_PG], [UPD_DATE], [UPD_CCD], [UPD_SCD], [UPD_PG], [EXCLUS_VER], [OPERATION_ID], [CID], [USER_ID], [USER_NAME], [SID], [IP_ADDRESS], [PC_NAME], [ACCOUNT], [MODIFIED_DT], [PGID], [SCREEN_ID], [QUERY_STRING], [OFFICE_HELPER_ROLE], [GROUP_COM_ADMIN_ROLE], [SYS_ADMIN_ROLE], [MY_NUMBER_ROLE], [PERSONNEL_ROLE], [COM_ADMIN_ROLE], [ACCOUNTING_ROLE], [PERSON_INFO_ROLE], [ATTENDANCE_ROLE], [PAYROLL_ROLE], [NOTE]) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(0 AS Decimal(8, 0)),";
//			String data2=", N'000000000000-0001', N'04705ae6-b502-43d6-bed6-3e65448f8497',";
//			String data3=", N'0011fcd1-06ca-4fd7-b009-9f1cab325fcb', N'ip123456',";
//			String data4=",CAST(N'2018-06-20 11:48:26.0000000' AS DateTime2), N'CLI003', N'01', N'Select * from', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'ok')";
//			// tao operaId
//			String operaId ="";
//			if (i < 10) {
//				operaId = "N'"+strZero1+i+"'";
//			}
//			if (i>=10 && i < 100) {
//				operaId = "N'"+strZero2+i+"'";
//			}
//			if (i>=100 ) {
//				operaId = "N'"+strZero3+i+"'";
//			}
//			
//			String userName ="N'user test"+i+"'";
//			String dataAfter ="N'dataAfter"+i +"',";
//			String dataBefor ="N'dataBefor"+i+"'";
//			dataExportParent.add(data1 +operaId+data2+userName+data3+dataAfter+dataBefor+data4);
//			// tao bản ghi con data conrect
//			String subdata1 ="INSERT [dbo].[SRCDT_DATA_CORRECTION_LOG] ([INS_DATE], [INS_CCD], [INS_SCD], [INS_PG], [UPD_DATE], [UPD_CCD], [UPD_SCD], [UPD_PG], [EXCLUS_VER], [OPERATION_ID], [USER_ID], [TARGET_DATA_TYPE], [ITEM_ID], [USER_NAME], [SID], [YMD_KEY], [YM_KEY], [Y_KEY], [STRING_KEY], [CORRECTION_ATTR], [ITEM_NAME], [RAW_VALUE_BEFORE_ID], [VIEW_VALUE_BEFORE], [RAW_VALUE_AFTER_ID], [VIEW_VALUE_AFTER], [VALUE_DATA_TYPE], [SHOW_ORDER], [NOTE]) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(0 AS Decimal(8, 0)), ";
//			
//			for (int j = 0; j < 8; j++) {
//				String note ="N'note"+j+"')";
//				String subdata2 =", N'useridtaget"+j+"', CAST(2 AS Decimal(2, 0)), N'itemid0"+j+"', N'usernametaget"+j+"', N'0011fcd1-06ca-4fd7-b009-9f1cab325fcb', CAST(N'2018-06-23' AS Date), CAST(201806 AS Decimal(6, 0)), CAST(2018 AS Decimal(4, 0)), N'key003', CAST(1 AS Decimal(1, 0)), N'item name"+j+"', N'1', N'xyz"+j+"', N'2', N'abc"+j+"', CAST(1 AS Decimal(1, 0)), CAST(1 AS Decimal(4, 0)),";
//				dataExportChild.add(subdata1+operaId+subdata2+note);
//			}
//			// tạo bản ghi cho Start Page
//			String startUP ="INSERT INTO [dbo].[SRCDT_START_PAGE_LOG_INFO]([EXCLUS_VER],[OPERATION_ID],[START_BEFORE_PGID],[START_BEFORE_SCREEN_ID],[START_BEFORE_QUERY_STRING],[CID],[USER_ID],[USER_NAME],[SID],[START_DT],[PGID],[SCREEN_ID],[QUERY_STRING],[NOTE])VALUES(0,"+operaId+",'CLI"+i+"','01','Select * from ','000000000000-0001','04705ae6-b502-43d6-bed6-3e65448f8497','UserNameTest1','0011fcd1-06ca-4fd7-b009-9f1cab325fcb',CAST(N'2018-06-20 11:48:26.0000000' AS DateTime2),'CLI003','00A','ABCXYZ','NOTE')";
//			dataStartUp.add(startUP);
//		}
//
////		dataSource = getStartUpData(dataExportParent, headers);
////		dataSource = getStartUpData(dataExportChild, headers);
//		dataSource = getStartUpData(dataStartUp, headers);
//
//		String employeeCode = AppContexts.user().employeeCode();
//		CSVFileData fileData = new CSVFileData(
//				"DATATEST" + "_" + GeneralDateTime.now().toString("yyyyMMddHHmmss") + "_" + employeeCode + FILE_EXTENSION, headers, dataSource);
//		generator.generate(context.getGeneratorContext(), fileData);
//	}
//	
//	
//}
//
