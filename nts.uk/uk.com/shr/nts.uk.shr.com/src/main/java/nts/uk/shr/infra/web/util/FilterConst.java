package nts.uk.shr.infra.web.util;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import nts.uk.shr.com.program.WebAppId;

public class FilterConst {

	/** Program path header. */
	public static final String PG_PATH = "PG-Path";

	/** DEFAULT_CHARSET_PROPERTY */
	public static final String DEFAULT_CHARSET_PROPERTY = "ISO-8859-1";
	
	/** Char for separate path and parameter of query */
	public static final String QUERY_STRING_SEPARATOR = Pattern.quote("?");
	
	/** Char for separate parameters of query */
	public static final String QUERY_PARAM_SEPARATOR = "&";
	
	/** Char for separate key and value of query */
	public static final String PARAM_SET_SEPARATOR = "=";
	
	/** EMPTY_STRING */
	public static final String EMPTY_STRING = "";
	
	/** REFERED_REQUEST */
	public static final String REFERED_REQUEST = "referer";
	
	public static final String JUMP_FROM_MENU = "startfrommenu";
	
	public static final String CONTENT_LANG = "Content-Language";

	/** Web app map. */
	public static final Map<WebAppId, String> webApps = new HashMap<>();
	static {
		webApps.put(WebAppId.COM, "nts.uk.com.web");
		webApps.put(WebAppId.PR, "nts.uk.pr.web");
		webApps.put(WebAppId.AT, "nts.uk.at.web");
		webApps.put(WebAppId.MOBI, "nts.uk.mobile.web");
	};
}
