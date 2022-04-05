package nts.uk.ctx.sys.portal.app.screenquery.generalsearch;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDateTime;

/**
 * The Class GeneralSearchHistoryDto.
 * 汎用検索の履歴 DTO
 */
@Data
@Builder
public class GeneralSearchHistoryDto {

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
