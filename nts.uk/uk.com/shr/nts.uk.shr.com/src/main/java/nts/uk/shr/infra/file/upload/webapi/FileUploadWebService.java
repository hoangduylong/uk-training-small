package nts.uk.shr.infra.file.upload.webapi;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.uk.shr.infra.file.upload.UploadedFileStorage;

@Path("/ntscommons/arc/filegate")
public class FileUploadWebService {

	@Inject
	private UploadedFileStorage storage;
	

	@POST
	@Path("upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public List<StoredFileInfo> upload(@MultipartForm MultipartFormDataInput input) {
		return this.storage.store(new PostedFormData(input));
	}

}
