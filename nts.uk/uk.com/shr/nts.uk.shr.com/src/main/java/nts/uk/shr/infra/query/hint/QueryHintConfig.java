package nts.uk.shr.infra.query.hint;

import org.eclipse.persistence.annotations.BatchFetchType;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.layer.infra.data.query.QueryHint;

@RequiredArgsConstructor
@Getter
public class QueryHintConfig {

	private final Configuration setting;
	
	public static QueryHintConfig currentSetting() {
		return new QueryHintConfig(Configuration.currentSetting());
	}
	
	public void apply() {
		this.setting.apply();
	}

	@RequiredArgsConstructor
	@Getter
	public static class Configuration {
		
		private final boolean autoSetHint;
		private final int fetchSize;
		private final boolean cacheStatement;
		private final int cacheStatementSize;
		private final int cacheQueryResultSize;
		private final String cacheUsage;
		private final int batchSize;
		private final String batchType;
		private final String batchWriteType;
		private final int batchWriteSize;
		private final boolean flushMode;
		
		void apply() {
			QueryHint.DEFAULT_AUTO_SET_HINT =autoSetHint;
			QueryHint.DEFAULT_FETCH_SIZE = fetchSize;
			QueryHint.DEFAULT_CACHE_STATEMENT = cacheStatement;
			QueryHint.DEFAULT_CACHE_STATEMENT_SIZE = cacheStatementSize;
			QueryHint.DEFAULT_CACHE_QUERY_RESULT_SIZE = cacheQueryResultSize;
			QueryHint.DEFAULT_CACHE_USAGE = cacheUsage;
			QueryHint.DEFAULT_BATCH_SIZE = batchSize;
			QueryHint.DEFAULT_BATCH_TYPE = getBatchFetchType();
			QueryHint.DEFAULT_BATCH_WRITE_TYPE = batchWriteType;
			QueryHint.DEFAULT_BATCH_WRITE_SIZE = batchWriteSize;
			QueryHint.DEFAULT_FLUSH_MODE = flushMode;
		}
		
		static Configuration currentSetting() {
			return new Configuration(
					QueryHint.DEFAULT_AUTO_SET_HINT,
					QueryHint.DEFAULT_FETCH_SIZE,
					QueryHint.DEFAULT_CACHE_STATEMENT,
					QueryHint.DEFAULT_CACHE_STATEMENT_SIZE,
					QueryHint.DEFAULT_CACHE_QUERY_RESULT_SIZE,
					QueryHint.DEFAULT_CACHE_USAGE,
					QueryHint.DEFAULT_BATCH_SIZE,
					QueryHint.DEFAULT_BATCH_TYPE.toString(),
					QueryHint.DEFAULT_BATCH_WRITE_TYPE,
					QueryHint.DEFAULT_BATCH_WRITE_SIZE,
					QueryHint.DEFAULT_FLUSH_MODE);
		}
		
		BatchFetchType getBatchFetchType(){
			switch (batchType) {
			case "JOIN":
				return BatchFetchType.JOIN;
			case "EXISTS":
				return BatchFetchType.EXISTS;
			default:
				return BatchFetchType.IN;
			}
		}
	}
}
