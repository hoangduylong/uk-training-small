package nts.uk.ctx.sys.log.app.find.reference.record;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LogPersonalUpdateChildrenDto {
	/**
	 * Help us generate table in screen F
	 */
	private String childrenKey;
	
    /**
     * 対象者 ユーザID
     */
    private String targetUserId;

    /**
     * 対象者 ユーザ名
     */
    private String targetUserName;

    /**
     * 対象者 社員コード
     */
    private String targetEmployeeCode;

    /**
     * 修正前の値
     */
    private String itemValueBefore;

    /**
     * 修正後の値
     */
    private String itemValueAfter;

    /**
     * 修正前の内容
     */
    private String itemContentBefore;

    /**
     * 修正後の内容
     */
    private String itemContentAfter;

    /**
     * 年月日 / 対象年月日
     */
    private String targetYmd;

    /**
     * 年月 / 対象年月
     */
    private String targetYm;

    /**
     * 年 / 対象年
     */
    private String targetY;

    /**
     * 対象
     */
    private String target;

    /**
     * 処理区分
     */
    private String categoryProcess;

    /**
     * カテゴリ名
     */
    private String categoryName;

    /**
     * 修正方法
     */
    private String methodCorrection;

    /**
     * 項目名
     */
    private String itemName;

    /**
     * 補正項目
     */
    private String correctionItem;

    /**
     * 補正後年月日
     */
    private String correctionYmd;
}
