package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import java.io.BufferedWriter;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

import javax.ejb.Stateless;

import lombok.SneakyThrows;
import nts.arc.layer.infra.file.export.FileGenerator;
import nts.arc.layer.infra.file.export.FileGeneratorContext;

@Stateless
public class HtmlFileGenerator extends FileGenerator {

	@SneakyThrows
	public void generate(FileGeneratorContext context, String content, String fileName) {
		try (OutputStream os = createNewFile(context, fileName);
			 BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"))) {
			writer.write(content);
		}
	}
}
