package nts.uk.shr.infra.diagnose;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.layer.infra.data.log.RepositoryLogger;
import nts.arc.layer.ws.preprocess.filters.RequestPerformanceDiagnose;

@RequiredArgsConstructor
@Getter
public class DiagnosisSetting {

	private final Performance performance;
	
	public static DiagnosisSetting currentSetting() {
		return new DiagnosisSetting(Performance.currentSetting());
	}
	
	public void apply() {
		this.performance.apply();
	}

	@RequiredArgsConstructor
	@Getter
	public static class Performance {
		
		private final int thresholdMillisSlowRequest;
		private final int thresholdMillisSlowQuery;
		
		void apply() {
			RequestPerformanceDiagnose.THRESHOLD_MILLISEC_TO_WARN = this.thresholdMillisSlowRequest;
			RepositoryLogger.THRESHOLD_MILLISECS_TO_WARN = this.thresholdMillisSlowQuery;
		}
		
		static Performance currentSetting() {
			return new Performance(
					RequestPerformanceDiagnose.THRESHOLD_MILLISEC_TO_WARN,
					RepositoryLogger.THRESHOLD_MILLISECS_TO_WARN);
		}
	}
}
