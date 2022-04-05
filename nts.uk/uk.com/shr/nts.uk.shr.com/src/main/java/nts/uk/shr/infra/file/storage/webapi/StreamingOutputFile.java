package nts.uk.shr.infra.file.storage.webapi;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.function.Supplier;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.StreamingOutput;

import org.apache.log4j.lf5.util.StreamUtils;

import lombok.RequiredArgsConstructor;
import lombok.val;

@RequiredArgsConstructor
public class StreamingOutputFile implements StreamingOutput {
	
	private final Supplier<InputStream> inputStream;

	@Override
	public void write(OutputStream output) throws IOException, WebApplicationException {
		try (val is = this.inputStream.get()) {
			StreamUtils.copy(is, output);
		}
	}

}
