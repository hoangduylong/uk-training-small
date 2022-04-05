package nts.uk.ctx.sys.log.dom.reference;

import java.util.List;

/*
 * author: hiep.th
 */

/**
 * ログ出力項目
 */
public interface LogOutputItemRepository {
	List<LogOutputItem> getByRecordType(int recordType);
	List<LogOutputItem> getByItemNoAndRecordType(int itemNo, int recordType);
	List<LogOutputItem> getByItemNosAndRecordType(List<String> itemNos, int recordType);
}
