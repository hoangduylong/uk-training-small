package nts.uk.shr.infra.file.upload.webapi;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.util.Strings;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import nts.uk.shr.infra.file.upload.UploadedFile;

public class PostedFormData implements UploadedFile {

	private final Map<String, List<InputPart>> uploadForm;
	
	public PostedFormData(MultipartFormDataInput input) {
		this.uploadForm = input.getFormDataMap();
	}

	@Override
	public Path path() {
		List<InputPart> inputParts = uploadForm.get("userfile");

		try {
			for (InputPart inputPart : inputParts) {
				File inputFile = inputPart.getBody(File.class, null);
				return inputFile.toPath();
			}
		} catch (IOException ex) {
			throw new RuntimeException(ex);
		}
		
		throw new RuntimeException("file not found");
	}

	@Override
	public String name() {
		List<InputPart> inputParts = uploadForm.get("filename");
		for (InputPart inputPart : inputParts) {
			String fileName;
			try {
				fileName = inputPart.getBodyAsString();
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
			
			if (!Strings.isEmpty(fileName)) {
				try {
					return new String(fileName.getBytes("ISO-8859-1"), "UTF-8");
				} catch (UnsupportedEncodingException e) {
					throw new RuntimeException(e);
				}
			}
		}
		
		throw new RuntimeException("filename not found");
	}

	@Override
	public String stereoType() {
		List<InputPart> inputParts = uploadForm.get("stereotype");

		for (InputPart inputPart : inputParts) {
			try {
				return inputPart.getBodyAsString();
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		
		return Strings.EMPTY;
	}
}
