package nts.uk.shr.infra.file.image;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

import javax.imageio.ImageIO;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.app.file.storage.FileStorage;
import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.arc.layer.infra.file.temp.ApplicationTemporaryFile;
import nts.arc.layer.infra.file.temp.ApplicationTemporaryFileFactory;
import nts.arc.layer.ws.WebService;

@Path("image/editor")
@Produces("application/json")
public class ImageEditorWebService extends WebService{
	
	@Inject
	private FileStorage fileStorage;
	
	@Inject 
	private ApplicationTemporaryFileFactory tempFileFactory;

	@POST
	@Path("/cropimage")
	public StoredFileInfo cropImage(ImageCropQuery query) {
		try {
			
			return storeFile(query, getImageBuffer(query));
			
		} catch (IOException e) {
			throw new RuntimeException("File is not a image.");
		}
	}

	private StoredFileInfo storeFile(ImageCropQuery query, BufferedImage bfi) throws IOException {
		ApplicationTemporaryFile tempFile = tempFileFactory.createTempFile();

		ImageIO.write(bfi, "png", tempFile.getPath().toFile());

		StoredFileInfo fileInfo = this.fileStorage.store(tempFile.getPath(), query.getFileName(), query.getStereoType());
		
		tempFile.getPath().toFile().delete();
		
		return fileInfo;
	}

	private BufferedImage getImageBuffer(ImageCropQuery query) throws IOException {
		BufferedImage bfi = ImageIO.read(toImageInputStream(query.getFile()));
		
		int width = getMin(query.getWidth(), bfi.getWidth() - query.getX()), 
			height = getMin(query.getHeight(), bfi.getHeight() - query.getY());
		
		if(query.isCrop() && isCroppable(width, height)){
			bfi = bfi.getSubimage(query.getX(), query.getY(), width, height);
		}
		
		return bfi;
	}

	private InputStream toImageInputStream(StringBuffer dataBase64) {
		String string64 = dataBase64.substring(dataBase64.indexOf(",") + 1);
		
		return new ByteArrayInputStream(Base64.getDecoder().decode(string64));
	} 
	
	private boolean isCroppable(int width, int height){
		return width > 0 && height > 0;
	}
	
	private int getMin(int base, int target){
		return Math.min(base, target);
	}
}
