package nts.uk.shr.com.context.loginuser;

import java.io.Serializable;

import nts.uk.shr.com.i18n.LanguageConsts;

public class SelectedLanguage implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	
	private String basic = LanguageConsts.DEFAULT_LANGUAGE_ID;
	private String personName = LanguageConsts.DEFAULT_LANGUAGE_ID;
	
	public String basicLanguageId() {
		return this.basic;
	}
	
	public void changeBasicLanguage(String languageId) {
		this.basic = languageId;
	}
	
	public String personNameLanguageId() {
		return this.personName;
	}
	
	public void changePersonNameLanguage(String languageId) {
		this.personName = languageId;
	}
	
	public void restore(SelectedLanguage source) {
		this.basic = source.basic;
		this.personName = source.personName;
	}
}
