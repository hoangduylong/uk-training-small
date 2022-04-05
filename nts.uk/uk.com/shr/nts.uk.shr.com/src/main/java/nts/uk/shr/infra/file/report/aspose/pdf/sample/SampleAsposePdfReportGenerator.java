package nts.uk.shr.infra.file.report.aspose.pdf.sample;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import com.aspose.pdf.BorderInfo;
import com.aspose.pdf.BorderSide;
import com.aspose.pdf.Cell;
import com.aspose.pdf.Color;
import com.aspose.pdf.Document;
import com.aspose.pdf.HorizontalAlignment;
import com.aspose.pdf.MarginInfo;
import com.aspose.pdf.Page;
import com.aspose.pdf.PageInfo;
import com.aspose.pdf.Paragraphs;
import com.aspose.pdf.Row;
import com.aspose.pdf.Table;
import com.aspose.pdf.TextFragment;
import com.aspose.pdf.VerticalAlignment;

import nts.arc.layer.infra.file.export.FileGeneratorContext;
import nts.uk.shr.infra.file.report.aspose.pdf.AsposePdfReportContext;
import nts.uk.shr.infra.file.report.aspose.pdf.AsposePdfReportGenerator;

@Stateless
public class SampleAsposePdfReportGenerator extends AsposePdfReportGenerator {
	
	public void generate(FileGeneratorContext context) { 
		
		try (AsposePdfReportContext report = this.createEmptyContext()) {
		
			Document doc = report.getDocument();
			
			stylePage(doc);
			
			Page curPage = doc.getPages().add();
			Paragraphs paragraphs = curPage.getParagraphs();
			
			/********************************************/
			
			paragraphs.add(createTableWith(Arrays.asList(200, 300), 
											Arrays.asList("Title", "Character"), 
											Arrays.asList("Railgun", "Misaka")));
			
			/********************************************/
			paragraphs.add(createTableWith(Arrays.asList(100, 200), 
											Arrays.asList("Header", "Value"), 
											Arrays.asList("H*****", "xxx")));
			
			/********************************************/
			paragraphs.add(createTableWith(Arrays.asList(100, 200), 
											Arrays.asList("Header", "Value"), 
											Arrays.asList("X*****", "yyy")));
			
			/********************************************/
			paragraphs.add(createTableWith(Arrays.asList(100, 200), 
											Arrays.asList("Header", "Value"), 
											Arrays.asList("K*****", "zzz")));
			
			/********************************************/
			paragraphs.add(createTableWith(Arrays.asList(100, 200), 
											Arrays.asList("Header", "Value"), 
											Arrays.asList("A*****", "aaa")));
			
			report.saveAsPdf(this.createNewFile(context, "outFile.pdf"));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private Table createTableWith(List<Integer> widths, List<String> headers, List<String> defaultVal) {
		Table table = new Table();

		table.setColumnWidths(widths.stream().map(c -> String.valueOf(c)).collect(Collectors.joining(" ")));

		Row header = table.getRows().add();
		header.setFixedRowHeight(20);
		header.setDefaultCellBorder(new BorderInfo(BorderSide.Left | BorderSide.Top| BorderSide.Bottom | BorderSide.Right, 
													1.25F, Color.getBlack()));
//		header.setVerticalAlignment(VerticalAlignment.Center);

		headers.stream().forEach(h -> {
			Cell c = header.getCells().add();
			c.getParagraphs().add(new TextFragment(h));
			c.setAlignment(HorizontalAlignment.Center);
			c.setVerticalAlignment(HorizontalAlignment.Center);
		});
		
		for (int i = 1; i <= 10; i++) {
			Row row = table.getRows().add();
			row.setFixedRowHeight(15);
			row.setDefaultCellBorder(new BorderInfo(BorderSide.Left | BorderSide.Top| BorderSide.Bottom | BorderSide.Right, 
					1.25F, Color.getBlack()));
//			row.setVerticalAlignment(VerticalAlignment.Center);

			for (int j = 0; j < headers.size(); j++) {
				String text = defaultVal.size() > j ? defaultVal.get(j) : headers.get(j);
				Cell cell = row.getCells().add();
				cell.getParagraphs().add(new TextFragment(text + " - " + i));
				cell.setAlignment(HorizontalAlignment.Center);
				cell.setVerticalAlignment(VerticalAlignment.Center);
			}
		}
		
		table.setInNewPage(true);
		
		return table;
	}

	private void stylePage(Document doc) {
		PageInfo pageInfo = doc.getPageInfo();
		MarginInfo marginInfo = pageInfo.getMargin();
		marginInfo.setLeft(37);
		marginInfo.setRight(37);
		marginInfo.setTop(37);
		marginInfo.setBottom(37);
		pageInfo.setLandscape(true);
	}
}
