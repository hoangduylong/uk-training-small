package nts.uk.shr.com.url;
/**
 * 埋込URLパラメータ区分
 * @author Doan Duy Hung
 *
 */
public enum UrlParamAtr {
	/**
	 * 処理パラメータ
	 */
	PROCESS_PARAM(0, "処理パラメータ"),
	
	/**
	 * URLパラメータ
	 */
	URL_PARAM(1, "URLパラメータ");
	
	public final int value;
	
	public final String name;
	
	UrlParamAtr(int value, String name) {
		this.value = value;
		this.name = name;
	}
}
