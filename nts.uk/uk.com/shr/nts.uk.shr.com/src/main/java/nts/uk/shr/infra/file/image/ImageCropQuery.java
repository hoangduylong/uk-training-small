package nts.uk.shr.infra.file.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageCropQuery {

	private String fileName;
	
	private String stereoType;
	
	private StringBuffer file;
	
	private String format;
	
	private boolean crop;
	
	private int x;
	
	private int y;
	
	private int width;
	
	private int height;
}
