package nts.uk.shr.infra.file.storage.filestereotype.defines;

import java.util.Arrays;
import java.util.List;

import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

public class ZipFileStereoType implements FileStereoTypeDescription {

	@Override
	public String name() {
		return "zipfile";
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
		return true;
	}
}