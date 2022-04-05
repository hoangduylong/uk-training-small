package nts.uk.ctx.sys.log.app.find.reference.record;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.Getter;
import lombok.Setter;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.log.app.find.reference.LogOuputItemFinder;
import nts.uk.ctx.sys.log.app.find.reference.LogOutputItemDto;
import nts.uk.ctx.sys.log.dom.datacorrectionlog.DataCorrectionLogRepository;
import nts.uk.ctx.sys.log.dom.logbasicinfo.LogBasicInfoRepository;
import nts.uk.ctx.sys.log.dom.loginrecord.LoginRecord;
import nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordRepository;
import nts.uk.ctx.sys.log.dom.pereg.IPersonInfoCorrectionLogRepository;
import nts.uk.ctx.sys.log.dom.reference.DataTypeEnum;
import nts.uk.ctx.sys.log.dom.reference.IPerInfoCtgOrderByComAdapter;
import nts.uk.ctx.sys.log.dom.reference.ItemNoEnum;
import nts.uk.ctx.sys.log.dom.reference.PersonEmpBasicInfoAdapter;
import nts.uk.ctx.sys.log.dom.reference.RecordTypeEnum;
import nts.uk.ctx.sys.log.dom.reference.WebMenuAdapter;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.i18n.TextResource;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.correction.content.DataCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.TargetDataType;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.CategoryCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;
import nts.uk.shr.com.security.audittrail.start.StartPageLog;
import nts.uk.shr.com.security.audittrail.start.StartPageLogRepository;
import nts.arc.time.calendar.period.DatePeriod;

/*
 * author : thuong.tv
 */

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class LogBasicInformationFinder {

	@Inject
	private LogBasicInfoRepository logBasicInfoRepository;

	@Inject
	private DataCorrectionLogRepository dataCorrectionLogRepository;

	@Inject
	private StartPageLogRepository startPageLogRepository;

	@Inject
	private LoginRecordRepository loginRecordRepository;

	@Inject
	private IPersonInfoCorrectionLogRepository iPersonInfoCorrectionLogRepository;

	@Inject
	private LogOuputItemFinder logOuputItemFinder;
	
	@Inject
	private WebMenuAdapter webMenuAdapter;
	
	/** The PersonEmpBasicInfoPub. */
	@Inject
	private PersonEmpBasicInfoAdapter personEmpBasicInfoAdapter;
	
	@Inject
	private IPerInfoCtgOrderByComAdapter iPerInfoCtgOrderByComAdapter;

	
	/**
	 * I：出力ボタン押下時処理
	 * @param logParams
	 * @return
	 */
	public List<LogBasicInfoDto> findByOperatorsAndDate(LogParams logParams) {
		
			//big step 記録を取得する
			//step システムからログ設定を取得 (in LogParams)
			List<String> logSettingEditProgramId = logParams.getListLogSettingDto().stream()
					.filter(x -> x.getUpdateHistoryRecord() == 0)
					.map(item -> item.getProgramId())
					.collect(Collectors.toList());
			
			List<String> logSettingStartProgramId = logParams.getListLogSettingDto().stream()
					.filter(x -> x.getStartHistoryRecord() == 0)
					.map(item -> item.getProgramId())
					.collect(Collectors.toList());
			
			List<LogBasicInfoDto> lstLogBacsicInfo = new ArrayList<>();
			// get login info
			LoginUserContext loginUserContext = AppContexts.user();
			RecordTypeEnum recordTypeEnum = RecordTypeEnum.valueOf(logParams.getRecordType());
			// get company id
			String cid = loginUserContext.companyId();
			/* DatePeriod datePeriodOperator = new DatePeriod(logParams.getStartDateOperator(),
			logParams.getEndDateOperator());*/
			DatePeriod datePeriodTaget = new DatePeriod(logParams.getStartDateTaget(), logParams.getEndDateTaget());
			List<LogBasicInformation> lstLogBasicInformation = new ArrayList<>();

			if(recordTypeEnum.code != RecordTypeEnum.START_UP.code){
			 lstLogBasicInformation = this.logBasicInfoRepository.findByOperatorsAndDate(cid,
						logParams.getListOperatorEmployeeId(), logParams.getStartDateOperator(),
						logParams.getEndDateOperator());
			}
			
			if (!CollectionUtil.isEmpty(lstLogBasicInformation)) {
				// Get list OperationId
				Map<String, LogBasicInformation> mapLogBasicInfo = new HashMap<>();
				List<String> employeeIds = new ArrayList<>();
				List<String> operationIds = lstLogBasicInformation.stream().map(x -> {
					mapLogBasicInfo.put(x.getOperationId(), x);
					if (x.getUserInfo() != null) {
						employeeIds.add(x.getUserInfo().getEmployeeId());
					}
					return x.getOperationId();
				}).collect(Collectors.toList());
				//step input「記録種類」をチェック
				switch (recordTypeEnum) {
				case LOGIN:
						//step ログイン記録を取得する
						// Set data of login record
						List<LoginRecord> loginRecords = this.loginRecordRepository.logRecordInforScreenF(operationIds);
						if(!CollectionUtil.isEmpty(loginRecords)){
							// Get list employeeCode operator by list information operator
							Map<String, String> mapEmployeeCodes = getEmployeeCodes(recordTypeEnum,mapLogBasicInfo, loginRecords, null, null, null);
							List<LogBasicInfoDto> logBasicLst = loginRecords.stream()
									.map(loginRecord ->{
								// Convert log basic info to DTO
								LogBasicInformation logBasicInformation = mapLogBasicInfo.get(loginRecord.getOperationId());
								LogBasicInfoDto logBasicInfoDto = LogBasicInfoDto.fromDomain(logBasicInformation);
								UserInfo userDto = logBasicInformation.getUserInfo();
								if (userDto != null) {
									logBasicInfoDto.setEmployeeCodeLogin(mapEmployeeCodes.get(userDto.getEmployeeId()) == null? "": mapEmployeeCodes.get(userDto.getEmployeeId()));
								}else {
									logBasicInfoDto.setEmployeeCodeLogin("");
								}
								// Set user login name
								logBasicInfoDto.setUserNameLogin(userDto.getUserName());
								logBasicInfoDto.setMethodName(loginRecord.getLoginMethod().description);
								logBasicInfoDto.setLoginStatus(loginRecord.getLoginStatus().description);
								logBasicInfoDto
										.setNote(loginRecord.getRemarks().isPresent() ? loginRecord.getRemarks().get() : "");
								return logBasicInfoDto;
									})
									.filter(log -> this.filterLogLogin(log, logParams.getListCondition()))
									.sorted(Comparator.comparing(LogBasicInfoDto::getModifyDateTime).reversed())
									.collect(Collectors.toList());
							if(logBasicLst.size() > 1000) {
								lstLogBacsicInfo.addAll(logBasicLst.subList(0, 1000));
							} else {
								lstLogBacsicInfo.addAll(logBasicLst);
							}
						}
					break;
				case START_UP:
					break;
				case UPDATE_PERSION_INFO:
				{
					String[] listSubHeaderText = { "23", "24", "29", "31", "33" };
					// Get persion info log
					//step 個人情報修正記録を取得する
					List<PersonInfoCorrectionLog> listPersonInfoCorrectionLog = this.iPersonInfoCorrectionLogRepository
							.findByTargetAndDateScreenF(operationIds, logParams.getListTagetEmployeeId());
					// Get list employeeCode operator by list information operator
					final Map<String, String> mapEmployeeCodes = getEmployeeCodes(recordTypeEnum,mapLogBasicInfo, null, listPersonInfoCorrectionLog, null, null);
					
					// Get Map Order list
					List<String> itemDefinitionIds = new ArrayList<>();
					List<PersonInfoCorrectionLog> listDataPersionInforReturn = new ArrayList<>();
					
					List<String> categoryIds = listPersonInfoCorrectionLog == null? new ArrayList<>(): listPersonInfoCorrectionLog.stream().filter(c -> !CollectionUtil.isEmpty(c.getCategoryCorrections()))
							.map(perCorrectLog ->{
								listDataPersionInforReturn.add(perCorrectLog);
								List<CategoryCorrectionLog> lstCate = perCorrectLog.getCategoryCorrections();
									  return  lstCate.stream().filter(c -> !CollectionUtil.isEmpty(c.getItemInfos())).map(c -> {
										List<String> itemIds = c.getItemInfos().stream().map(item -> item.getItemId()).collect(Collectors.toList());
										itemDefinitionIds.addAll(itemIds);
										return c.getCategoryId();
									}).collect(Collectors.toList());
									
							})
							.flatMap(c -> c.stream())
							.distinct()
							.collect(Collectors.toList());
					
					HashMap<Integer, HashMap<String, Integer>> mapCheckOrder = iPerInfoCtgOrderByComAdapter.getOrderList(categoryIds, itemDefinitionIds);
					
						Map<String, LogBasicInfoDto> mapCheck = new HashMap<>();
						// Get list subHeader
						List<LogOutputItemDto> lstHeaderTemp = new ArrayList<>();
						List<LogOutputItemDto> lstHeader = logOuputItemFinder.getLogOutputItemByItemNosAndRecordType(Arrays.asList(listSubHeaderText),logParams.getRecordType());
						listDataPersionInforReturn.stream().forEach(personInfoCorrectionLog ->{
							// Convert log basic info to DTO
							LogBasicInformation logBasicInformation = mapLogBasicInfo.get(personInfoCorrectionLog.getOperationId());
							LogBasicInfoDto logBasicInfoDto = LogBasicInfoDto.fromDomain(logBasicInformation);
							String keyCheck = personInfoCorrectionLog.getOperationId() + personInfoCorrectionLog.getTargetUser().getEmployeeId();
							logBasicInfoDto.setParentKey(keyCheck);
							List<LogPerCateCorrectRecordDto> logPerCateCorrectRecordDtos = LogPerCateCorrectRecordDto
									.fromDomain(personInfoCorrectionLog, logBasicInfoDto.getParentKey(),mapCheckOrder);
							if (mapCheck.containsKey(keyCheck)) {
								LogBasicInfoDto logBasicCheck = mapCheck.get(keyCheck);
								List<LogPerCateCorrectRecordDto> dataChildrent = logBasicCheck.getLstLogPerCateCorrectRecordDto();
								if (!CollectionUtil.isEmpty(logPerCateCorrectRecordDtos)) {
									for (LogPerCateCorrectRecordDto logPerCateCorrectRecordDto : logPerCateCorrectRecordDtos) {
										dataChildrent.add(logPerCateCorrectRecordDto);
									}
								}
								logBasicCheck.setLstLogPerCateCorrectRecordDto(dataChildrent);
								if(mapCheck.size() < 1000) {
									if(this.filterLogPersonInfoUpdate(logBasicCheck, logParams.getListCondition())) {
										// 使用しない個人情報修正記録を除く
										List<String> cps001 = logSettingEditProgramId.stream().filter(item -> item.equals("CPS001")).collect(Collectors.toList());
										List<String> cps002 = logSettingEditProgramId.stream().filter(item -> item.equals("CPS002")).collect(Collectors.toList());
										if(!cps001.isEmpty()) {
											if(!logBasicCheck.getProcessAttr().equals("新規")) {
												mapCheck.replace(keyCheck, logBasicCheck);
											}
										}
										if(!cps002.isEmpty()) {
											if(logBasicCheck.getProcessAttr().equals("新規")) {
												mapCheck.replace(keyCheck, logBasicCheck);
											}
										}
										if(cps001.isEmpty() && cps001.isEmpty()) {
											mapCheck.replace(keyCheck, logBasicCheck);
										}
									}
								}
							} else {

								LogBasicInfoDto logTemp = getEmpCodeByEmpId(logBasicInfoDto, mapEmployeeCodes.get(personInfoCorrectionLog.getTargetUser().getEmployeeId()),
										personInfoCorrectionLog.getTargetUser().getUserName());
								// Setting infor logBasicInfoDto
								UserInfo userDto = logBasicInformation.getUserInfo();
								// get employee code login
								//CLI003: fix bug #109166, 109165
								if (userDto != null) {
									logBasicInfoDto.setEmployeeCodeLogin(mapEmployeeCodes.get(userDto.getEmployeeId()) == null? "": mapEmployeeCodes.get(userDto.getEmployeeId()));
								}else {
									logBasicInfoDto.setEmployeeCodeLogin("");
								}
								// get user login name
								logBasicInfoDto.setUserNameLogin(userDto.getUserName());

								logTemp.setLstLogPerCateCorrectRecordDto(logPerCateCorrectRecordDtos);
								lstHeader.stream().forEach(logOutputItemDto ->{
									if (logOutputItemDto.getItemNo() == ItemNoEnum.ITEM_NO_23.code) {
										lstHeaderTemp.add(logOutputItemDto);
										lstHeaderTemp.add(new LogOutputItemDto(99, TextResource.localize("CLI003_61"),logParams.getRecordType()));
									} else {
										lstHeaderTemp.add(logOutputItemDto);
									}
								});
								logTemp.setLstLogOutputItemDto(lstHeaderTemp);
								logTemp.setNote(personInfoCorrectionLog.getRemark());
								logTemp.setProcessAttr(LogPerCateCorrectRecordDto.getPersonInfoProcessAttr(personInfoCorrectionLog.getProcessAttr().value));
								if(mapCheck.size() < 1000) {
									if(this.filterLogPersonInfoUpdate(logTemp, logParams.getListCondition())) {
										// 使用しない個人情報修正記録を除く
										List<String> cps001 = logSettingEditProgramId.stream().filter(item -> item.equals("CPS001")).collect(Collectors.toList());
										List<String> cps002 = logSettingEditProgramId.stream().filter(item -> item.equals("CPS002")).collect(Collectors.toList());
										if(!cps001.isEmpty()) {
											if(!logTemp.getProcessAttr().equals("新規")) {
												mapCheck.put(keyCheck, logTemp);
											}
										}
										if(!cps002.isEmpty()) {
											if(logTemp.getProcessAttr().equals("新規")) {
												mapCheck.put(keyCheck, logTemp);
											}
										}
										if(cps001.isEmpty() && cps001.isEmpty()) {
											mapCheck.put(keyCheck, logTemp);
										}
									}
								}
							}						
						});
						// Convert data to list
						lstLogBacsicInfo = new ArrayList<LogBasicInfoDto>(mapCheck.values());
						
					break;
				}
				case DATA_CORRECT:
					TargetDataType targetDataType= TargetDataType.of(logParams.getTargetDataType()) ;
					Map<String,LogBasicInfoDto> mapCheckLogBasic = new HashMap<>();
					
					CollectionUtil.split(operationIds, 1000, operationIdSubList -> {

						if(mapCheckLogBasic.size() > 1000) {
							return;
						}
						//step データ種類を記録使用するかないかをチェック
						//step データ修正記録を取得する
						// get data correct log
						List<DataCorrectionLog> lstDataCorectLog = this.dataCorrectionLogRepository.findByTargetAndDateScreenF(
								operationIdSubList, logParams.getListTagetEmployeeId(), datePeriodTaget,targetDataType);
						if (!CollectionUtil.isEmpty(lstDataCorectLog)) {
							// Get list employeeCode operator by list information operator
							Map<String, String> mapEmployeeCodes = getEmployeeCodes(recordTypeEnum,mapLogBasicInfo,null,null,lstDataCorectLog,null);
							// tối ưu lấy header
							Map<String, TargetDataCorrect> itemOutHeaders = lstDataCorectLog.stream()
									.filter(distinctByKey(DataCorrectionLog::getTargetDataType))
									.collect(Collectors.toMap(c -> String.valueOf(logParams.getRecordType()) + String.valueOf(c.getTargetDataType().value),
								     c -> new TargetDataCorrect(logParams.getRecordType(), c.getTargetDataType().value)));
							Map<String, List<LogOutputItemDto>>  headerMaps =  getSubHeaderDataCorrectList(itemOutHeaders, logParams.getRecordType());
							lstDataCorectLog.stream().forEach(dataCorrectionLog ->{
								// convert log basic info to DTO
								LogBasicInformation logBasicInformation = mapLogBasicInfo.get(dataCorrectionLog.getOperationId());
								LogBasicInfoDto logBasicInfoDto = LogBasicInfoDto.fromDomain(logBasicInformation);
								LogDataCorrectRecordRefeDto logDataCorrectRecordRefeDto = LogDataCorrectRecordRefeDto.fromDomain(dataCorrectionLog);
								String keyEmploy = dataCorrectionLog.getOperationId() + logDataCorrectRecordRefeDto.getEmployeeIdtaget();
								logBasicInfoDto.setParentKey(keyEmploy);
								// group employId
								if(mapCheckLogBasic.containsKey(keyEmploy)){
									LogBasicInfoDto logBasicCheck = mapCheckLogBasic.get(keyEmploy);
									List<LogDataCorrectRecordRefeDto> dataChildrent = logBasicCheck.getLstLogDataCorrectRecordRefeDto();
									dataChildrent.add(logDataCorrectRecordRefeDto);
									logBasicCheck.setLstLogDataCorrectRecordRefeDto(dataChildrent);
									if(mapCheckLogBasic.size() < 1000) {
										// データ種類を記録使用するかないかをチェック
										if(this.filterLogDataCorrection(logBasicCheck, logParams.getListCondition())) {
											List<String> kdw003 = logSettingEditProgramId.stream().filter(item -> item.equals("KDW003")).collect(Collectors.toList());
											List<String> ksu007 = logSettingEditProgramId.stream().filter(item -> item.equals("KSU007")).collect(Collectors.toList());
											List<String> kmw003 = logSettingEditProgramId.stream().filter(item -> item.equals("KMW003")).collect(Collectors.toList());
											List<String> ksu001 = logSettingEditProgramId.stream().filter(item -> item.equals("KSU001")).collect(Collectors.toList());
											if(!(logParams.getTargetDataType() == DataTypeEnum.DAILY_RESULTS.code && !kdw003.isEmpty() ||
												logParams.getTargetDataType() == DataTypeEnum.MONTHLY_RESULTS.code && !kmw003.isEmpty() ||
												logParams.getTargetDataType() == DataTypeEnum.SCHEDULE.code && ( !ksu001.isEmpty() || !ksu007.isEmpty()))
											) {
												mapCheckLogBasic.replace(keyEmploy, logBasicCheck);	
											}
										}
									}
								}else{
									UserInfo userDto = logBasicInformation.getUserInfo();
									//CLI003: fix bug #109166, 109165
									// get employee code login
									if (userDto != null) {
										logBasicInfoDto.setEmployeeCodeLogin(mapEmployeeCodes.get(userDto.getEmployeeId()) == null? "": mapEmployeeCodes.get(userDto.getEmployeeId()));
									}else {
										logBasicInfoDto.setEmployeeCodeLogin("");
									}
									// get user login name
									logBasicInfoDto.setUserNameLogin(userDto.getUserName());
									
									// convert list data corect log to DTO
									List<LogDataCorrectRecordRefeDto> lstLogDataCorecRecordRefeDto = new ArrayList<>();
									// set employeeCode của target name
									LogBasicInfoDto logTemp = getEmpCodeByEmpId(logBasicInfoDto, mapEmployeeCodes.get(logDataCorrectRecordRefeDto.getEmployeeIdtaget()),logDataCorrectRecordRefeDto.getUserNameTaget());
									logDataCorrectRecordRefeDto.setParentKey(keyEmploy);
									lstLogDataCorecRecordRefeDto.add(logDataCorrectRecordRefeDto);
									logTemp.setLstLogDataCorrectRecordRefeDto(lstLogDataCorecRecordRefeDto);
									// set header
									logTemp.setLstLogOutputItemDto(headerMaps.get(String.valueOf(logDataCorrectRecordRefeDto.getTargetDataType())));
									if(mapCheckLogBasic.size() < 1000) {
										// データ種類を記録使用するかないかをチェック
										if(this.filterLogDataCorrection(logTemp, logParams.getListCondition())) {
											List<String> kdw003 = logSettingEditProgramId.stream().filter(item -> item.equals("KDW003")).collect(Collectors.toList());
											List<String> ksu007 = logSettingEditProgramId.stream().filter(item -> item.equals("KSU007")).collect(Collectors.toList());
											List<String> kmw003 = logSettingEditProgramId.stream().filter(item -> item.equals("KMW003")).collect(Collectors.toList());
											List<String> ksu001 = logSettingEditProgramId.stream().filter(item -> item.equals("KSU001")).collect(Collectors.toList());
											if(!(logParams.getTargetDataType() == DataTypeEnum.DAILY_RESULTS.code && !kdw003.isEmpty() ||
												logParams.getTargetDataType() == DataTypeEnum.MONTHLY_RESULTS.code && !kmw003.isEmpty() ||
												logParams.getTargetDataType() == DataTypeEnum.SCHEDULE.code && ( !ksu001.isEmpty() || !ksu007.isEmpty()))
											) {
												mapCheckLogBasic.put(keyEmploy, logTemp);
											}
										}
									}
								}
							});
						}
					});
					// xử lý input map to lists
					lstLogBacsicInfo = new ArrayList<LogBasicInfoDto>(mapCheckLogBasic.values());
					break;
				default:
					break;
				}
			}else{
				if(recordTypeEnum.code == RecordTypeEnum.START_UP.code){
					Map<String, String> mapProgramNames = webMenuAdapter.getWebMenuByCId(cid);
					//step 起動記録を取得する
					// get start page log
					List<StartPageLog> startPageLogs = this.startPageLogRepository.findByScreenF(cid,
							logParams.getListOperatorEmployeeId(), logParams.getStartDateOperator(),
							logParams.getEndDateOperator());
					if (!CollectionUtil.isEmpty(startPageLogs)) {
						// Get list employee code
						Map<String, String> mapEmployeeCodes = getEmployeeCodes(recordTypeEnum,null,null,null,null,startPageLogs);
						List<LogBasicInfoDto> logBasicInfoDtoInter = startPageLogs.stream()
								.map(startPageLog -> {
									// Convert log basic info to DTO
									LogBasicInformation logBasicInformation = startPageLog.getBasicInfo();
									LogBasicInfoDto logBasicInfoDto = LogBasicInfoDto.fromDomain(logBasicInformation);
									// Set user login name
									UserInfo userDto = logBasicInformation.getUserInfo();
		
									String key = logBasicInformation.getTargetProgram().getProgramId()
											+ logBasicInformation.getTargetProgram().getScreenId()
											+ logBasicInformation.getTargetProgram().getQueryString();
									logBasicInfoDto.setMenuName(mapProgramNames.get(key));
									//CLI003: fix bug #109166, 109165
									// Get employee code user login
									if (userDto != null) {
										logBasicInfoDto.setEmployeeCodeLogin(mapEmployeeCodes.get(userDto.getEmployeeId()) == null?"": mapEmployeeCodes.get(userDto.getEmployeeId()));
									}else {
										logBasicInfoDto.setEmployeeCodeLogin("");
									}
									// get user login name
									logBasicInfoDto.setUserNameLogin(userDto.getUserName());
									// logBasicInfoDto.setMenuName(programName);
									logBasicInfoDto.setNote(
											logBasicInformation.getNote().isPresent() ? logBasicInformation.getNote().get() : "");
									return logBasicInfoDto;
								})
								.filter(log -> this.filterLogStartUp(log, logParams.getListCondition()))
								//使用しないPGの起動記録を除く
								.filter(item -> !logSettingStartProgramId.stream().anyMatch(a -> a.equals(item.getProgramId())))
								.collect(Collectors.toList());
						if(logBasicInfoDtoInter.size() > 1000) {
							lstLogBacsicInfo.addAll(logBasicInfoDtoInter.subList(0, 1000));
						} else {
							lstLogBacsicInfo.addAll(logBasicInfoDtoInter);
						}
					}
				}
			}
			return lstLogBacsicInfo;
	}
	
	public LogBasicInfoDto getEmpCodeByEmpId(LogBasicInfoDto logBasicInfoDto, String employeeCode, String userNameTaget) {
		// get employee code taget
		logBasicInfoDto.setEmployeeCodeTaget(employeeCode);
		logBasicInfoDto.setUserNameTaget(userNameTaget);	
		
		return logBasicInfoDto;
	}
	
	public Map<String, List<LogOutputItemDto>> getSubHeaderDataCorrectList(Map<String, TargetDataCorrect> targetDataCorrect, int recordType) {
		List<String> listHeaderDateTimeText = Arrays.asList("22", "26", "27", "30", "31");
		List<String> listHeaderMothText =  Arrays.asList("23", "26", "27", "30", "31");
		List<String> listHeaderYearText = Arrays.asList( "24", "26", "27", "30", "31");
		// tổng những itemNo ở các header trên
		String[] listItemNoAll = {"22","23","24","26","27","30","31"};
		Map<String, List<LogOutputItemDto>> result = new HashMap<>();
		List<LogOutputItemDto> lstHeader = logOuputItemFinder.getLogOutputItemByItemNosAndRecordType(
				Arrays.asList(listItemNoAll), recordType);
		targetDataCorrect.entrySet().forEach(c ->{
			if (c.getValue().getTargetKey() == TargetDataType.SCHEDULE.value
					|| c.getValue().getTargetKey() == TargetDataType.DAILY_RECORD.value) {
				List<LogOutputItemDto> lstHeader1 = lstHeader.stream()
						.filter(h -> listHeaderDateTimeText.contains(String.valueOf(h.getItemNo())))
						.collect(Collectors.toList());
				result.put(String.valueOf(c.getValue().getTargetKey()), lstHeader1);
			}
			
			if (c.getValue().getTargetKey() == TargetDataType.MONTHLY_RECORD.value
					|| c.getValue().getTargetKey() == TargetDataType.ANY_PERIOD_SUMMARY.value
					|| c.getValue().getTargetKey() == TargetDataType.SALARY_DETAIL.value
					|| c.getValue().getTargetKey() == TargetDataType.BONUS_DETAIL.value) {
				List<LogOutputItemDto> lstHeader1 = lstHeader.stream()
						.filter(h -> listHeaderMothText.contains(String.valueOf(h.getItemNo())))
						.collect(Collectors.toList());
				result.put(String.valueOf(c.getValue().getTargetKey()), lstHeader1);
			}
			
			if (c.getValue().getTargetKey() == TargetDataType.YEAR_END_ADJUSTMENT.value
					|| c.getValue().getTargetKey() == TargetDataType.MONTHLY_CALCULATION.value
					|| c.getValue().getTargetKey() == TargetDataType.RISING_SALARY_BACK.value) {
				List<LogOutputItemDto> lstHeader1 = lstHeader.stream()
						.filter(h -> listHeaderYearText.contains(String.valueOf(h.getItemNo())))
						.collect(Collectors.toList());
				result.put(String.valueOf(c.getValue().getTargetKey()), lstHeader1);
			}
		});		
		return result;
	}
	
	public Map<String, String> getEmployeeCodes(RecordTypeEnum recordTypeEnum,Map<String, LogBasicInformation> mapLogBasicInfo,
			List<LoginRecord> loginRecords, List<PersonInfoCorrectionLog> persionLogs, List<DataCorrectionLog> dataCorectLogs,
			List<StartPageLog> startPageLogs){
		List<String> employeeIds = new ArrayList<>();
		switch (recordTypeEnum) {
		case LOGIN:
			employeeIds.addAll(loginRecords.stream()
					.filter(loginRecord -> mapLogBasicInfo.containsKey(loginRecord.getOperationId()))
					.map(loginRecord -> {
						return mapLogBasicInfo.get(loginRecord.getOperationId()).getUserInfo().getEmployeeId();
					}).collect(Collectors.toList()));
			break;
		case START_UP:
			employeeIds.addAll(startPageLogs.stream().filter(startPageLog -> startPageLog.getBasicInfo() != null)
					.map(startPageLog -> startPageLog.getBasicInfo().getUserInfo().getEmployeeId())
					.collect(Collectors.toList()));
			break;
		case UPDATE_PERSION_INFO:
			persionLogs.stream().forEach(persionlog ->{
				employeeIds.add(persionlog.getTargetUser().getEmployeeId()) ;
				if(mapLogBasicInfo.containsKey(persionlog.getOperationId())){
					employeeIds.add(mapLogBasicInfo.get(persionlog.getOperationId()).getUserInfo().getEmployeeId()) ;
				}
			});
			break;
		case DATA_CORRECT:
			dataCorectLogs.stream().forEach(dataCorrectionLog ->{
				employeeIds.add(dataCorrectionLog.getTargetUser().getEmployeeId()) ;
				if(mapLogBasicInfo.containsKey(dataCorrectionLog.getOperationId())){
					employeeIds.add(mapLogBasicInfo.get(dataCorrectionLog.getOperationId()).getUserInfo().getEmployeeId()) ;
				}
			});
			break;
		default:
			break;
		}
		// Get list employee code by list id employeeIds.stream().distinct().collect(Collectors.toList()) - request list 228
		return personEmpBasicInfoAdapter
				.getEmployeeCodesByEmpIds(employeeIds.stream().distinct().collect(Collectors.toList()));
	}
	
	private boolean filterLogLogin(LogBasicInfoDto log, List<ConditionDto> listCondition) {
		 if (!this.filterLogByItemNo(log.getUserIdTaget(), 1, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getUserNameLogin(), 2, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getEmployeeCodeLogin(), 3, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getIpAdress(), 4, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getModifyDateTime(), 7, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getMenuName(), 18, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getLoginStatus(), 19, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getMethodName(), 20, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getNote(), 22, listCondition)) {
            return false;
        }
        return true;
	}

	private boolean filterLogStartUp(LogBasicInfoDto log, List<ConditionDto> listCondition) {
        if (!this.filterLogByItemNo(log.getUserIdTaget(), 1, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getUserNameLogin(), 2, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getEmployeeCodeLogin(), 3, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getIpAdress(), 4, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getModifyDateTime(), 7, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getNote(), 18, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getMenuName(), 19, listCondition)) {
            return false;
        }
        return true;
    }
	
	private boolean filterLogPersonInfoUpdate(LogBasicInfoDto log, List<ConditionDto> listCondition) {
        if (!this.filterLogByItemNo(log.getUserIdTaget(), 1, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getUserNameLogin(), 2, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getEmployeeCodeLogin(), 3, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getIpAdress(), 4, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getModifyDateTime(), 7, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getMenuName(), 18, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getUserNameTaget(), 20, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getEmployeeCodeTaget(), 21, listCondition)) {
            return false;
        }
        if (!this.filterLogByItemNo(log.getProcessAttr(), 22, listCondition)) {
            return false;
        }
        if(!log.getLstLogPerCateCorrectRecordDto().isEmpty()) {
        	for (LogPerCateCorrectRecordDto item : log.getLstLogPerCateCorrectRecordDto()) {
                if (!this.filterLogByItemNo(item.getCategoryName(), 23, listCondition)) {
                    return false;
                }
                if (!this.filterLogByItemNo(item.getInfoOperateAttr(), 24, listCondition)) {
                    return false;
                }
                if (!this.filterLogByItemNo(item.getItemName(), 24, listCondition)) {
                    return false;
                }
                if (!this.filterLogByItemNo(item.getValueBefore(), 31, listCondition)) {
                    return false;
                }
                if (!this.filterLogByItemNo(item.getValueAfter(), 32, listCondition)) {
                    return false;
                }
            }
        }
        if (!this.filterLogByItemNo(log.getNote(), 36, listCondition)) {
            return false;
        }
        return true;
    }
	
	 private boolean filterLogDataCorrection(LogBasicInfoDto log, List<ConditionDto> listCondition) {
         if (!this.filterLogByItemNo(log.getUserIdTaget(), 1, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getUserNameLogin(), 2, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getEmployeeCodeLogin(), 3, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getIpAdress(), 4, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getModifyDateTime(), 7, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getMenuName(), 18, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getUserNameTaget(), 20, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getEmployeeCodeTaget(), 21, listCondition)) {
             return false;
         }
         if (!this.filterLogByItemNo(log.getProcessAttr(), 22, listCondition)) {
             return false;
         }
         if(!log.getLstLogDataCorrectRecordRefeDto().isEmpty()) {
        	 for (LogDataCorrectRecordRefeDto item : log.getLstLogDataCorrectRecordRefeDto()) {
                 if (!this.filterLogByItemNo(item.getCorrectionAttr(), 26, listCondition)) {
                     return false;
                 }
                 if (!this.filterLogByItemNo(item.getItemName(), 27, listCondition)) {
                     return false;
                 }
                 if (!this.filterLogByItemNo(item.getValueBefore(), 30, listCondition)) {
                     return false;
                 }
                 if (!this.filterLogByItemNo(item.getValueAfter(), 31, listCondition)) {
                     return false;
                 }
             }
         }
         if (!this.filterLogByItemNo(log.getNote(), 36, listCondition)) {
             return false;
         }
         return true;
     }
	
	private boolean filterLogByItemNo(String content, int itemNo, List<ConditionDto> listCondition) {
		List<ConditionDto> conditionArray = listCondition.stream().filter(condition -> condition.getItemNo() == itemNo)
				.collect(Collectors.toList());
		if (conditionArray.size() == 0) {
			return true;
		}
		if (content == null || content.equals("")) {
			return false;
		}
		List<Boolean> rs = new ArrayList<>();
		for (ConditionDto condition : conditionArray) {
			// EQUAL
			 if (condition.getSymbol() == 0) {
					rs.add(content.contains(condition.getCondition()));
			// INCLUDE
			} else if (condition.getSymbol() == 1) {
				rs.add(content.equals(condition.getCondition()));
			// DIFFERENT
			} else if (condition.getSymbol() == 2) {
				rs.add(!content.equals(condition.getCondition()));
			} else {
				rs.add(false);
			}
		}
		return rs.stream().anyMatch(item -> item);
	}

	public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
	    Set<Object> seen = ConcurrentHashMap.newKeySet();
	    return t -> seen.add(keyExtractor.apply(t));
	}
	
	@Getter
	public class TargetDataCorrect{
		private int recordType;
		private int targetKey;
		public TargetDataCorrect(int recordType, int targetKey) {
			this.recordType = recordType;
			this.targetKey = targetKey;
		}
	}
	
	@Getter
	@Setter
	public class DataCorrectLogModel{
		private String parentKey;
		private String childrentKey;
		private String operationId;
		private String targetDate;
        private int targetDataType;
        private String itemName;
        private String valueBefore;
        private String valueAfter;
        private String remarks;
        private String correctionAttr;
        private int showOrder;
		public DataCorrectLogModel(String operationId, String targetDate, int targetDataType, String itemName,
				String valueBefore, String valueAfter, String remarks,  String correctionAttr) {
			super();
			this.operationId = operationId;
			this.targetDate = targetDate;
			this.targetDataType = targetDataType;
			this.itemName = itemName;
			this.valueBefore = valueBefore;
			this.valueAfter = valueAfter;
			this.remarks = remarks;
			this.correctionAttr = correctionAttr;
		}
	}
	
	@Setter
	@Getter
	public class PerCateCorrectRecordModel {
        private String parentKey;
        private String childrentKey;
        private String operationId;
        private String targetDate;
        private String categoryName;
        private String itemName;
        private String valueBefore;
        private String valueAfter;
        private String infoOperateAttr;
		public PerCateCorrectRecordModel(String operationId, String targetDate, String categoryName, String itemName,
				String valueBefore, String valueAfter, String infoOperateAttr) {
			super();
			this.operationId = operationId;
			this.targetDate = targetDate;
			this.categoryName = categoryName;
			this.itemName = itemName;
			this.valueBefore = valueBefore;
			this.valueAfter = valueAfter;
			this.infoOperateAttr = infoOperateAttr;
		}
        
	}
	
	/**
	 * The enum of RECORD_TYPE
	 */
    public  enum ITEM_NO {
        ITEM_NO1(1),
        ITEM_NO2(2),
        ITEM_NO3(3),
        ITEM_NO4(4),
        ITEM_NO5(5),
        ITEM_NO6(6),
        ITEM_NO7(7),
        ITEM_NO8(8),
        ITEM_NO9(9),
        ITEM_NO10(10),
        ITEM_NO11(11),
        ITEM_NO12(12),
        ITEM_NO13(13),
        ITEM_NO14(14),
        ITEM_NO15(15),
        ITEM_NO16(16),
        ITEM_NO17(17),
        ITEM_NO18(18),
        ITEM_NO19(19),
        ITEM_NO20(20),
        ITEM_NO21(21),
        ITEM_NO22(22),
        ITEM_NO23(23),
        ITEM_NO24(24),
        ITEM_NO25(25),
        ITEM_NO26(26),
        ITEM_NO27(27),
        ITEM_NO28(28),
        ITEM_NO29(29),
        ITEM_NO30(30),
        ITEM_NO31(31),
        ITEM_NO32(32),
        ITEM_NO33(33),
        ITEM_NO34(34),
        ITEM_NO35(35),
        ITEM_NO36(36),
        ITEM_NO99(99);
    	
    	public int value;
    	
    	ITEM_NO(int value) {
    		this.value = value;
    	}
    }	

    /**
    * The enum of property setting data
    */
    public enum ITEM_PROPERTY {
        ITEM_SRT(0, "string"),
        ITEM_USER_NAME_LOGIN(1, "userNameLogin"),
        ITEM_EMP_CODE_LOGIN(2, "employeeCodeLogin"),
        ITEM_MODIFY_DATE(3, "modifyDateTime"),
        ITEM_LOGIN_STATUS(4, "loginStatus"),
        ITEM_METHOD_NAME(5, "methodName"),
        ITEM_NOTE(6, "note"),
        ITEM_MENU_NAME(7, "menuName"),
        ITEM_USER_NAME_TAGET (8, "userNameTaget"),
        ITEM_EMP_CODE_TAGET (9, "employeeCodeTaget"),
        ITEM_PROCESS_ATTR (10, "processAttr"),
        ITEM_CATEGORY_NAME (11, "categoryName"),
        ITEM_TAGET_DATE (12, "targetDate"),
        ITEM_INFO_OPERATE_ATTR (13, "infoOperateAttr"),
        ITEM_NAME (14, "itemName"),
        ITEM_VALUE_BEFOR (15, "valueBefore"),
        ITEM_VALUE_AFTER (16, "valueAfter"),
        ITEM_CORRECT_ATTR (17, "correctionAttr"),
        ITEM_OPERATION_ID (18, "operationId"),
        ITEM_PARRENT_KEY (19, "parentKey");
        
    	/** The code. */
    	public  int code;

    	/** The name id. */
    	public  String name;

    	private ITEM_PROPERTY(int code, String name) {
    		this.code = code;
    		this.name = name;
    	}
    }
	@Setter
	@Getter
	public class LogBasicInfoModel{
        private String parentKey;
        private String operationId;
        private String userNameLogin;
        private String employeeCodeLogin;
        private String userIdTaget;
        private String userNameTaget;
        private String employeeCodeTaget;
        private String modifyDateTime;
        private String menuName;
        private String note;
        private String methodName;
        private String loginStatus;
        private String processAttr;
        private String programId;
        private List<DataCorrectLogModel> lstLogDataCorrectRecordRefeDto = new ArrayList<>();
        private List<LogOutputItemDto> lstLogOutputItemDto = new ArrayList<>();
        private List<PerCateCorrectRecordModel> lstLogPerCateCorrectRecordDto = new ArrayList<>();
		public LogBasicInfoModel(String userNameLogin, String employeeCodeLogin, String userIdTaget, String userNameTaget,
				String employeeCodeTaget, String modifyDateTime, String processAttr, List<LogOutputItemDto> lstLogOutputItemDto,
				String menuName, String note, String methodName, String loginStatus, 
				List<DataCorrectLogModel> lstLogDataCorrectRecordRefeDto, 
				List<PerCateCorrectRecordModel> lstLogPerCateCorrectRecordDto) {
			super();
			this.userNameLogin = userNameLogin;
			this.employeeCodeLogin = employeeCodeLogin;
			this.userIdTaget = userIdTaget;
			this.userNameTaget = userNameTaget;
			this.employeeCodeTaget = employeeCodeTaget;
			this.modifyDateTime = modifyDateTime;
			this.processAttr = processAttr;
			
			this.lstLogOutputItemDto.addAll(lstLogOutputItemDto);
			this.menuName = menuName;
			this.note = note;
			this.methodName = methodName;
			this.loginStatus = loginStatus;
		}
		
		public LogBasicInfoModel(LogBasicInfoDto logBaseInfo, List<DataCorrectLogModel> lstLogDataCorrectRecordRefeDto,  List<PerCateCorrectRecordModel> lstLogPerCateCorrectRecordDto) {
			this.userNameLogin = logBaseInfo.getUserNameLogin();
			this.employeeCodeLogin = logBaseInfo.getEmployeeCodeLogin();
			this.userIdTaget = logBaseInfo.getUserIdTaget();
			this.userNameTaget = logBaseInfo.getUserNameTaget();
			this.employeeCodeTaget = logBaseInfo.getEmployeeCodeTaget();
			this.modifyDateTime = logBaseInfo.getModifyDateTime();
			this.processAttr = logBaseInfo.getProcessAttr();
			if(!CollectionUtil.isEmpty(logBaseInfo.getLstLogOutputItemDto())) {
				this.lstLogOutputItemDto.addAll(logBaseInfo.getLstLogOutputItemDto());
			}
			this.menuName = logBaseInfo.getMenuName();
			this.note = logBaseInfo.getNote();
			this.methodName = logBaseInfo.getMethodName();
			this.loginStatus = logBaseInfo.getLoginStatus();
			this.lstLogDataCorrectRecordRefeDto
					.addAll(lstLogDataCorrectRecordRefeDto);
			this.lstLogPerCateCorrectRecordDto.addAll(lstLogPerCateCorrectRecordDto);
		}
	}
}


