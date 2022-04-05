package nts.uk.shr.com.context;

import lombok.Value;
import nts.gul.text.StringUtil;
import nts.uk.shr.infra.web.util.FilterConst;
import nts.uk.shr.infra.web.util.FilterHelper;
import nts.uk.shr.infra.web.util.QueryStringAnalyzer;

@Value
public class ScreenIdentifier {
	private final String programId;
	private final String screenId;
	private final String queryString;
	
	public static ScreenIdentifier create(String path) {
		
		String[] parts = path.split(FilterConst.QUERY_STRING_SEPARATOR);
		if (parts.length == 2) {
			return create(parts[0], parts[1]);
		}
		
		return create(parts[0], null);
	}
	
	public static ScreenIdentifier create(String path, String queryString) {
		String programId = FilterHelper.detectProgram(path).orElse("");
		String pId = StringUtil.isNullOrEmpty(programId, true) ? "" : programId.substring(0, 6);
		String sId = programId.replace(pId, "");
		return new ScreenIdentifier(pId, sId, 
				queryString == null ? getQueryStringFrom(path) : queryString);
	}
	
	private static String getQueryStringFrom(String query){
		String[] qs = query.split(FilterConst.QUERY_STRING_SEPARATOR);
		QueryStringAnalyzer analyzer = new QueryStringAnalyzer(qs.length == 2 ? qs[1] : "");
		return analyzer.buildQueryExclude();
	}
	
}
