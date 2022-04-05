package nts.uk.shr.infra.logcollector.app;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.util.Deque;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.Getter;
import nts.arc.layer.infra.file.temp.ApplicationTemporaryFile;
import nts.uk.shr.infra.logcollector.dom.AuditBufferedReader;
import nts.uk.shr.infra.logcollector.dom.BigHeadCursor;
import nts.uk.shr.infra.logcollector.dom.StackTraceInTime;
import nts.uk.shr.infra.logcollector.dom.StackTraceSegment;

@Getter
public class FileEntryFilter {

	public static final String DATE_TIME = "^(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2},\\d{3}) (\\w+)";
	
	public static final String LOG_TIME = "yyyy-MM-dd HH:mm:ss,SSS";
	
	private LocalDateTime start;
	
	private LocalDateTime end;
	
	public FileEntryFilter(LocalDateTime start, LocalDateTime end) {
		this.start = start;
		this.end = end;
	}
	
	/**
	 * Head included.
	 * @param line
	 * @return optional of BigHeadCursor
	 */
	public Optional<BigHeadCursor> headIncluded(String line) {
		Pattern pattern = Pattern.compile(DATE_TIME);
		Matcher matcher = pattern.matcher(line);
		
		if (matcher.lookingAt()) {
			String text = matcher.group(1);
			String level = matcher.group(2);
			LocalDateTime recordTime = LocalDateTime.parse(text, DateTimeFormatter.ofPattern(LOG_TIME)).with(ChronoField.MILLI_OF_SECOND, 0);
			if (start.compareTo(recordTime) <= 0 && end.compareTo(recordTime) >= 0) {
				return Optional.of(new BigHeadCursor(recordTime, level, Action.LETTHROUGH));
			} else if (end.compareTo(recordTime) < 0) {
				return Optional.of(new BigHeadCursor(recordTime, level, Action.CONTINUE));
			}
			
			return Optional.of(new BigHeadCursor(recordTime, level));
		}
		
		return Optional.empty();
	}
	
	/**
	 * Scan file.
	 * @param audit audit file
	 * @return StackTraceInTime
	 */
	public StackTraceInTime scan(ApplicationTemporaryFile audit) {
		StackTraceInTime stackInTime = new StackTraceInTime();
		Deque<StackTraceSegment> stack = stackInTime.getStack();
		try (AuditBufferedReader br = new AuditBufferedReader(audit.getPath().toFile(), LogReaderServiceCommandHandler.DEFAULT_ENCODE)) {
			String line;
			StackTraceSegment segment = new StackTraceSegment();
			while ((line = br.readLine()) != null) {
				Optional<BigHeadCursor> cursorOpt = headIncluded(line);
				if (cursorOpt.isPresent()) {
					BigHeadCursor cursor = cursorOpt.get();
					Action action = cursor.getLetThrough();
					if (action == Action.LETTHROUGH) {
						segment = segment.next(stack, cursor, line);
					} else if (action == Action.STOP) {
						segment.end(stack);
						break;
					} else if (action == Action.CONTINUE) {
						segment.end(stack);
						continue;
					}
				} else segment.getTrace().push(line);
			}
			return stackInTime;
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		} finally {
			audit.dispose();
		}
	}
	
	public enum Action {
		
		LETTHROUGH,
		STOP,
		CONTINUE
	}
	
	public enum LogLevel {

		INFO("INFO"),
		WARN("WARN"),
		ERROR("ERROR");
		
		public String value;
		private LogLevel(String value) {
			this.value = value;
		}
	}
}