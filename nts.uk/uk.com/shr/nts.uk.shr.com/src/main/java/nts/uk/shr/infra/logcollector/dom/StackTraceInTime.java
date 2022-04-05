package nts.uk.shr.infra.logcollector.dom;

import java.io.BufferedWriter;
import java.io.IOException;
import java.util.Deque;
import java.util.concurrent.LinkedBlockingDeque;

import lombok.Getter;
import lombok.Setter;

/**
 * Stack trace in time.
 * 
 * @author manhnd
 */
@Getter
public class StackTraceInTime {
	
	@Setter
	private String node;

	private final Deque<StackTraceSegment> stack = new LinkedBlockingDeque<>();
	
	/**
	 * Write output stream.
	 * @param os output stream
	 */
	public void write(BufferedWriter bw) {

		try {
			writeAny(bw);
			while (!stack.isEmpty()) {
				StackTraceSegment segment = stack.pop();
				segment.write(bw);
			}
		} catch (IOException e) {
			throw new RuntimeException("Failed to print stack trace.");
		}
	}
	
	/**
	 * Write any.
	 * @param bw
	 * @throws IOException
	 */
	private void writeAny(BufferedWriter bw) throws IOException {
		if (!stack.isEmpty()) {
			bw.write("--------------------------------------------------------------------------------");
			bw.newLine();
			bw.write(String.format("|%-78s|", "Server Log at: " + node));
			bw.newLine();
			bw.write("--------------------------------------------------------------------------------");
			bw.newLine();
		}
	}
}