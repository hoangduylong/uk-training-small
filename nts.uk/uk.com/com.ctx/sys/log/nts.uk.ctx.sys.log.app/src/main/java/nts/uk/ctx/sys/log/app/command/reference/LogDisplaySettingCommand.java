package nts.uk.ctx.sys.log.app.command.reference;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.log.dom.enums.SystemTypeEnum;
import nts.uk.ctx.sys.log.dom.reference.DataTypeEnum;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySetting;
import nts.uk.ctx.sys.log.dom.reference.LogSettingCode;
import nts.uk.ctx.sys.log.dom.reference.LogSettingName;
import nts.uk.ctx.sys.log.dom.reference.RecordTypeEnum;

@Setter
@Getter
public class LogDisplaySettingCommand {
	
	/** the log display setting id */
	private String logSetId;
	
	/** the log display setting code */
	private String code;

	/** the log display setting name */
	private String name;

	/** the data type */
	private Integer dataType;

	/** the record type */
	private int recordType;
	
	/**
	 * システム種類
	 */
	private int systemType;
	
	/** the list of log setting output item */
	private List<LogSetOutputItemCommand> logSetOutputItems;
	
	public LogDisplaySetting toDomain (String logSetId, String cid) {
		return new LogDisplaySetting(logSetId, cid
				, new LogSettingCode(code)
				, new LogSettingName(name)
				, DataTypeEnum.valueOf(dataType)
				, RecordTypeEnum.valueOf(recordType)
				, SystemTypeEnum.valueOf(systemType)
				, logSetOutputItems.stream()
					.map(item -> item.toDomain(logSetId,cid))
					.collect(Collectors.toList()));
	}
}
