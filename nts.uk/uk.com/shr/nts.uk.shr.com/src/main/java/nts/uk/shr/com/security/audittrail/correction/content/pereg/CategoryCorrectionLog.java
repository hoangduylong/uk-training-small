package nts.uk.shr.com.security.audittrail.correction.content.pereg;

import java.util.List;
import java.util.Optional;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.TargetDataKey;

/**
 * カテゴリ修正記録
 */
@RequiredArgsConstructor
@Getter
public class CategoryCorrectionLog {
	
	/** カテゴリID */
	private final String categoryId;	
	
	/** カテゴリ名 */
	private final String categoryName;
	
	/** 情報操作区分 */
	private final InfoOperateAttr infoOperateAttr;
	
	/** 対象KEY情報 */
	private final TargetDataKey targetKey;
	
	/** 項目情報 */
	private final List<ItemInfo> itemInfos;
	
	/** 補正情報 */
	private final Optional<ReviseInfo> reviseInfo;
	
}
