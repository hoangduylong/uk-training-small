package nts.uk.shr.infra.file.storage.webapi;

import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.gul.web.URLEncode;

class Helper {

	static String contentDisposition(StoredFileInfo fileInfo) {
		String originalName = fileInfo.getOriginalName();
		int indexOfLastSlash = fileInfo.getOriginalName().lastIndexOf("/");
		if (indexOfLastSlash != -1) {
			 originalName = originalName.substring(indexOfLastSlash + 1);
		}
		String encodedName = URLEncode.encodeAsUtf8(originalName);
		return String.format("attachment; filename=\"%s\"", encodedName);
	}
}
