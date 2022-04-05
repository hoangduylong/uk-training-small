package nts.uk.ctx.sys.portal.dom.generalsearch;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;

/**
 * The Class GeneralSearchHistory.
 * Domain 汎用検索の履歴
 */

@Getter
public class GeneralSearchHistory extends AggregateRoot {
	
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
	private SearchCategory searchCategory;
	
	/** The date. 
	 * 日時
	 **/
	private GeneralDateTime searchDate;
	
	/** The contents. 
	 * 内容
	 * 検索の内容
	 **/
	private SearchContent contents;
	
	private GeneralSearchHistory() {}
	
	public static GeneralSearchHistory createFromMemento(MementoGetter memento) {
		GeneralSearchHistory domain = new GeneralSearchHistory();
		domain.getMemento(memento);
		return domain;
	}
	
	public void getMemento(MementoGetter memento) {
		this.companyID = memento.getCompanyID();
		this.contents = new SearchContent(memento.getContents());
		this.searchDate = memento.getSearchDate();
		this.searchCategory = EnumAdaptor.valueOf(memento.getSearchCategory(), SearchCategory.class);
		this.userID = memento.getUserID();
	}
	
	public void setMemento(MementoSetter memento) {
		memento.setCompanyID(companyID);
		memento.setUserID(userID);
		memento.setContents(contents.v());
		memento.setSearchDate(searchDate);
		memento.setSearchCategory(searchCategory.value);
	}
	
	public static interface MementoSetter {
		void setCompanyID(String companyID);
		void setUserID(String userID);
		void setSearchCategory(int value);
		void setSearchDate(GeneralDateTime date);
		void setContents(String contents);
	}
	
	public static interface MementoGetter {
		String getCompanyID();
		String getUserID();
		int getSearchCategory();
		GeneralDateTime getSearchDate();
		String getContents();
	}
	
} 
