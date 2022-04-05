package nts.uk.shr.infra.file.report.aspose.pdf;

import java.io.InputStream;
import java.io.OutputStream;

import com.aspose.pdf.Document;
import com.aspose.pdf.SaveFormat;
import com.aspose.pdf.SaveOptions;

import lombok.Getter;

public class AsposePdfReportContext implements AutoCloseable {
	
	@Getter
	private final InputStream templateFile;

	@Getter
	private final Document document;
	
	public AsposePdfReportContext(InputStream templateFile) {
		
		try {
			this.templateFile = templateFile;
			this.document = new Document(this.templateFile);
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
	
	public AsposePdfReportContext() {
		
		try {
			this.templateFile = null;
			this.document = new Document();
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
	
	public void saveAsPdf(OutputStream output) {
		try {
			this.document.save(output, SaveFormat.Pdf);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public void saveAsExcel(OutputStream outputStream) {
		try {
			this.document.save(outputStream, SaveFormat.Excel);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public void saveWithOtherOption(OutputStream outputStream, SaveOptions saveOptions) {
		try {
			this.document.save(outputStream, saveOptions);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void close() throws Exception {
		if (this.templateFile != null) {
			this.templateFile.close();
		}
	}

}
