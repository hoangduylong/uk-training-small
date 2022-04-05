package nts.uk.ctx.sys.log.dom.reference;

import java.util.List;
import java.util.Optional;

/*
 * author: hiep.th
 */
public interface LogDisplaySettingRepository {

	Optional<LogDisplaySetting> getLogDisplaySettingByCodeAndCid(String code,String cid);
	Optional<LogDisplaySetting> getLogDisplaySettingByCodeAndCidAndIsUseFlg(String code,String cid);
	
	List<LogDisplaySetting> getAllLogDisplaySet(String cid);
	
	List<LogDisplaySetting> getLogDisplaySettingByRecordType(String logSetRecordType,String cid);
	List<LogDisplaySetting> getLogDisplaySettingByRecordType(String logSetRecordType,String targetDataType,String cid);
	
	void add(LogDisplaySetting domain);
	
	/**
	 * 
	 * @param LogDisplaySetting
	 */
	void update(LogDisplaySetting domain);
	
	/**
	 * @param logSetId
	 */
	void remove(String logSetId);
}
