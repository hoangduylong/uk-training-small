package nts.uk.shr.infra.web.util;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public class QueryStringAnalyzer {

	private Map<String, String> queryParts;
	
	private String originalQuery;
	
	public QueryStringAnalyzer(String query){
		queryParts = new HashMap<>();
		originalQuery = query;
		
		externalAnalysis();
	}
	
	public boolean haveKey(String key){
		return queryParts.containsKey(key);
	}
	
	public String buildQueryExclude(String... keys){
		List<String> excludes = Arrays.asList(keys);
		Object[] toBuilds =queryParts.entrySet().stream().filter(p -> !excludes.contains(p.getKey()))
												.map(p -> StringUtils.join(p.getKey(), FilterConst.PARAM_SET_SEPARATOR, p.getValue()))
												.toArray();
		if(toBuilds.length > 0){
			return StringUtils.join(toBuilds, FilterConst.QUERY_PARAM_SEPARATOR);
		}
		return "";
	}
	
	private void externalAnalysis(){
		if(this.originalQuery.isEmpty()){
			return;
		}
		String[] pairSet = this.originalQuery.replace(FilterConst.QUERY_STRING_SEPARATOR, "")
				.split(FilterConst.QUERY_PARAM_SEPARATOR);
		for(String pair: pairSet){
			String[] kv = pair.split(FilterConst.PARAM_SET_SEPARATOR);
			queryParts.put(kv[0], kv[1]);
		}
	}
}
