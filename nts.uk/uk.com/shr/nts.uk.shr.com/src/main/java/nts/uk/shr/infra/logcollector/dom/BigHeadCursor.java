package nts.uk.shr.infra.logcollector.dom;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import lombok.Getter;
import nts.uk.shr.infra.logcollector.app.FileEntryFilter.Action;
import nts.uk.shr.infra.logcollector.app.FileEntryFilter.LogLevel;

@Getter
public class BigHeadCursor {
	
	private LocalDateTime time;
	
	private LogLevel level;
	
	private Action letThrough = Action.STOP;
	
	public BigHeadCursor(LocalDateTime time, LogLevel level) {
		this.time = time;
		this.level = level;
	}
	
	public BigHeadCursor(LocalDateTime time, String levelText) {
		Optional<LogLevel> logLevel = Arrays.asList(LogLevel.values()).stream()
				.filter(e -> e.value.equals(levelText)).findFirst();
		if (logLevel.isPresent()) this.level = logLevel.get();
		this.time = time;
	}
	
	public BigHeadCursor(LocalDateTime time, String levelText, Action letThrough) {
		this(time, levelText);
		this.letThrough = letThrough;
	}
}
