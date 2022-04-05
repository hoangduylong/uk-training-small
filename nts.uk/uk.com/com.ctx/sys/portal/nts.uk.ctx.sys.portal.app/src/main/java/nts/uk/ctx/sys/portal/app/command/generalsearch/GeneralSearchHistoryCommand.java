package nts.uk.ctx.sys.portal.app.command.generalsearch;

import lombok.Setter;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.generalsearch.GeneralSearchHistory;
import nts.uk.shr.com.context.AppContexts;

@Setter
public class GeneralSearchHistoryCommand implements GeneralSearchHistory.MementoGetter {

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

	public String getUserID() {
		return AppContexts.user().userId();
	}

	public String getCompanyID() {
		return AppContexts.user().companyId();
	}

	public int getSearchCategory() {
		return this.searchCategory;
	}

	public GeneralDateTime getSearchDate() {
		return this.searchDate;
	}

	public String getContents() {
		return this.contents;
	}
	
	
}
