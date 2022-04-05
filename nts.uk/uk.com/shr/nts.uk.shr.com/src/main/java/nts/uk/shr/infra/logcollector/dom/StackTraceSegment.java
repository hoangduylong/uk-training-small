package nts.uk.shr.infra.logcollector.dom;

import java.io.BufferedWriter;
import java.io.IOException;
import java.util.Deque;
import java.util.concurrent.LinkedBlockingDeque;

import lombok.Getter;

@Getter
public class StackTraceSegment {
	
	private BigHeadCursor cursor;
	
	private Deque<String> trace = new LinkedBlockingDeque<>();

	/**
	 * Next.
	 * @param stack stack
	 * @param cursor cursor
	 * @param line line
	 * @return stack trace segment
	 */
	public StackTraceSegment next(Deque<StackTraceSegment> stack, BigHeadCursor cursor, String line) {
		this.cursor = cursor;
		trace.push(line);
		stack.push(this);
		return new StackTraceSegment();
	}
	
	/**
	 * End.
	 * @param stack stack
	 */
	public void end(Deque<StackTraceSegment> stack) {
		StackTraceSegment segment = stack.peek();
		if (segment != null && segment.getCursor() == null) {
			stack.pop();
		}
	}
	
	/**
	 * Write.
	 * @param bw buffered writer
	 */
	public void write(BufferedWriter bw) {
		try {
			while (!trace.isEmpty()) {
				bw.write(trace.pop());
				bw.newLine();
			}
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}
}