package nts.uk.ctx.sys.log.app.find.reference.record;

import java.util.List;
import java.util.Optional;

import lombok.Value;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.InfoOperateAttr;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.ReviseInfo;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.TargetDataKey;


@Value
public class CategoryCorrectionLogDto {
	
	/** カテゴリID */
	private final String categoryId;	
	
	/** カテゴリ名 */
	private final String categoryName;
	
	/** 情報操作区分 */
	private final InfoOperateAttr infoOperateAttr;
	
	/** 対象KEY情報 */
	private final TargetDataKey targetKey;
	
	/** 項目情報 */
	private final List<ItemInfoDto> itemInfos;
	
	/** 補正情報 */
	private final Optional<ReviseInfo> reviseInfo;
	
	/** number order */
	private int numberOrder;
}
