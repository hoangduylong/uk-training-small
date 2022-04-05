package nts.uk.shr.infra.i18n.format;

import java.util.HashMap;
import java.util.Map;

import nts.uk.shr.com.i18n.LanguageConsts;

/**
 * Class provides date time formatter based on locale.
 *
 */
public class DateTimeFormatProvider {
	
	@SuppressWarnings("serial")
	public static final Map<String, DateTimeTranscoder> LocaleTranscoderMap = new HashMap<String, DateTimeTranscoder>() {
		{
			put(LanguageConsts.DEFAULT_LANGUAGE_ID, new DateTimeTranscoderJP());
			put("en", new DateTimeTranscoderUS());
		}
	};
}
