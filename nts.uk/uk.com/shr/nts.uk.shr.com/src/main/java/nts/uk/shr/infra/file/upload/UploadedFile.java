package nts.uk.shr.infra.file.upload;

import java.nio.file.Path;

public interface UploadedFile {

	Path path();
	String name();
	String stereoType();
}
