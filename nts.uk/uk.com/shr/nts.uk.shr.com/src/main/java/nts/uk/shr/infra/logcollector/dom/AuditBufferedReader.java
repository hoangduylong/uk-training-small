package nts.uk.shr.infra.logcollector.dom;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;

public class AuditBufferedReader implements AutoCloseable {
	
	private static final int BUFFER_SIZE = 8192;
	private static final String DefaultCharset = "UTF-8";
	private RandomAccessFile accessFile;
	private FileChannel channel;
	private String charset;
	private ByteBuffer byteBuffer;
	private ByteArrayOutputStream bs = new ByteArrayOutputStream();
	private long markedPos;
	
	public AuditBufferedReader(File file) {
		try {
			this.accessFile = new RandomAccessFile(file, "r");
			this.channel = accessFile.getChannel();
			this.markedPos = accessFile.length();
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
	}
	
	public AuditBufferedReader(File file, String charset) {
		this(file);
		this.charset = charset;
	}
	
	/**
	 * Read line.
	 * @return line
	 * @throws IOException
	 */
	public String readLine() throws IOException {
		int buffPos;
		byte t;
		boolean bof = false;
		if (markedPos <= 0) return null;
		
		for (;;) {
			long start = Math.max(markedPos - BUFFER_SIZE, 0);
			if (start == 0) bof = true;
			long end = markedPos;
			long buffLen = end - start;
			buffPos = (int) buffLen;
			byteBuffer = channel.map(FileChannel.MapMode.READ_ONLY, start, buffLen);
			markedPos = start;
			boolean bol = false;
			t = byteBuffer.get(--buffPos);
			if (t == '\n') {
				if (byteBuffer.get(--buffPos) == '\r') {
					buffPos--;
				}
				bol = true;
			} else if (t == '\r') {
				buffPos--;
				bol = true;
			}
			
			if (!bol) {
				bs.write(t);
				int found = backTillBreak(--buffPos);
				if (found > -1) {
					markedPos = start + found + 1;
					return stringLine();
				}
				if (bof) return stringLine();
			} else if (bs.size() > 0) {
				markedPos = start + buffPos + 1;
				return stringLine();
			} else {
				markedPos = start + buffPos + 1;
			}
		}
	}
	
	/**
	 * Back till break.
	 * @param pos
	 * @return
	 */
	private int backTillBreak(int pos) {
		byte t;
		while (pos >= 0) {
			t = byteBuffer.get(pos--);
			if (t == '\n') {
				if (byteBuffer.get(pos) == '\r') {
					pos--;
				}
				return pos;
			} else if (t == '\r') return pos;
			bs.write(t);
		}
		return -1;
	}
	
	/**
	 * Get line.
	 * @return line
	 */
	public String stringLine() {
		if (bs.size() == 0) return "";
		byte[] byteArr = bs.toByteArray();
		int len = byteArr.length;
		for (int i = 0; i < len / 2; i++) {
			byte b = byteArr[i];
			byteArr[i] = byteArr[len - i - 1];
			byteArr[len - i - 1] = b;
		}
		bs.reset();
		if (charset != null) return new String(byteArr, Charset.forName(charset));
		return new String(byteArr, Charset.forName(DefaultCharset));
	}

	@Override
	public void close() throws Exception {
		accessFile.close();
	}
}