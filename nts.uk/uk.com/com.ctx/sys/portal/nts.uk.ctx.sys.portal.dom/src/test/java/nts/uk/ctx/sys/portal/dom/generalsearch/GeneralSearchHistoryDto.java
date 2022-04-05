package nts.uk.ctx.sys.portal.dom.generalsearch;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDateTime;

/**
 * The Class GeneralSearchHistoryDto.
 * Test Domain 汎用検索の履歴
 */
@Data
@Builder
public class GeneralSearchHistoryDto implements GeneralSearchHistory.MementoSetter, GeneralSearchHistory.MementoGetter {

	/** The user ID.
	 * ユーザID
	 **/
	private String userID;
	
	/** The company ID. 
	 * 会社ID
	 **/
	private String companyID;
	
	/** The search category. 
	 * 検索区分
	 **/
	private int searchCategory;
	
	/** The date. 
	 * 日時
	 **/
	private GeneralDateTime searchDate;
	
	/** The contents. 
	 * 内容
	 * 検索の内容
	 **/
	private String contents;

}
