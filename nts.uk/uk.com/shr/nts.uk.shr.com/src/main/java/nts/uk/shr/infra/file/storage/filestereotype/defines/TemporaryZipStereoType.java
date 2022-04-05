package nts.uk.shr.infra.file.storage.filestereotype.defines;

import java.util.Arrays;
import java.util.List;

import lombok.Getter;
import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

@Getter
public class TemporaryZipStereoType implements FileStereoTypeDescription {

	@Override
	public String name() {
		return "temporaryzip";
	}
	
	@Override
	public List<String> acceptableExtensions() {
		return Arrays.asList("zip");
	}
	
	@Override
	public boolean isPack() {
		return false;
	}
	
	@Override
	public boolean  keepsPack(){
		return false;
	}
}
