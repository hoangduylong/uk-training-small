package nts.uk.shr.sample.aspose;

import java.util.Arrays;
import java.util.List;

import javax.ejb.Stateless;

import com.aspose.cells.BackgroundType;
import com.aspose.cells.BorderType;
import com.aspose.cells.Cell;
import com.aspose.cells.CellBorderType;
import com.aspose.cells.Cells;
import com.aspose.cells.Color;
import com.aspose.cells.PageSetup;
import com.aspose.cells.PdfSaveOptions;
import com.aspose.cells.Style;
import com.aspose.cells.StyleFlag;
import com.aspose.cells.TextAlignmentType;
import com.aspose.cells.Workbook;
import com.aspose.cells.Worksheet;

import nts.arc.layer.infra.file.export.FileGeneratorContext;
import nts.uk.shr.infra.file.report.aspose.cells.AsposeCellsReportContext;
import nts.uk.shr.infra.file.report.aspose.cells.AsposeCellsReportGenerator;

@Stateless
public class SampleAsposeGeneratorImpl extends AsposeCellsReportGenerator implements SampleAsposeGenerator {

	private static final String REPORT_ID = "AsposeSampleReportTest";
	
	@Override
	public void generate(FileGeneratorContext context, List<SampleDepartment> depts) {
//		FontConfigs.setFontFolder("C:\\Works\\Fonts", true);
//		FontConfigs.setDefaultFontName("Arial");
		try (AsposeCellsReportContext ctx = this.createEmptyContext(REPORT_ID)) {
			Workbook workbook = ctx.getWorkbook(); 
			Worksheet sheet = workbook.getWorksheets().get(0);
			Cells cells = sheet.getCells();
			workbook.getSettings().setNumberGroupSeparator(',');
			PageSetup pageSetup = sheet.getPageSetup();
//			Style defaultStyle = workbook.getDefaultStyle();
//			Font font = defaultStyle.getFont();
//			font.setName("Arial");
			ctx.setHeader(0, "#{COM_NAME}");
			ctx.setHeader(1, "&\"Arial,Bold\"&20#{REPORT_NAME}");
			ctx.setHeader(2, "&D　&T\n&P#{PAGE}");
			
			createHeader(workbook);
			Style style1 = workbook.createStyle();
			style1.setForegroundColor(Color.getLightBlue());
			style1.setPattern(BackgroundType.SOLID);
			style1.setShrinkToFit(true);
			style1.setHorizontalAlignment(TextAlignmentType.RIGHT);
			style1.setVerticalAlignment(TextAlignmentType.CENTER);
			style1.setBorder(BorderType.TOP_BORDER, CellBorderType.THIN, Color.getBlack());
			Style style2 = workbook.createStyle();
			style2.setForegroundColor(Color.getWhiteSmoke());
			style2.setPattern(BackgroundType.SOLID);
			style2.setTextWrapped(true);
			style2.setHorizontalAlignment(TextAlignmentType.RIGHT);
			style2.setVerticalAlignment(TextAlignmentType.CENTER);
			style2.setBorder(BorderType.TOP_BORDER, CellBorderType.THIN, Color.getBlack());
			StyleFlag flag = new StyleFlag();
			flag.setCellShading(true);
			flag.setBorders(true);
			flag.setWrapText(true);
			flag.setShrinkToFit(true);
			flag.setHorizontalAlignment(true);
			flag.setVerticalAlignment(true);
			flag.setNumberFormat(true);
			
			int row = 2;
			for (SampleDepartment d : depts) {
				int column = 1;
				cells.merge(row, column, 1, 8);
				Cell department = cells.get(row++, column);
				department.putValue(d.getName());
				Style deptStyle = workbook.createStyle();
				deptStyle.setForegroundColor(Color.getCadetBlue());
				deptStyle.setPattern(BackgroundType.SOLID);
				deptStyle.setBorder(BorderType.TOP_BORDER, CellBorderType.THIN, Color.getBlack());
				department.getMergedRange().applyStyle(deptStyle, new StyleFlag() {
					{
						setCellShading(true);
						setBorders(true);
					}
				});
				
				int firstRow = -1;
				int[] sums = new int[6];
				for (SampleEmployee emp : d.getEmployees()) {
					column = 1;
					if (firstRow == -1) firstRow = row;
					Style style = (row - firstRow) % 2 == 0 ? style2 : style1;
					style.setBorder(BorderType.RIGHT_BORDER, CellBorderType.DOTTED, Color.getBlack());
					Cell code = cells.get(row, column++);
					code.setStyle(style, flag);
					code.putValue(emp.getEmpCode());
					Style codeStyle = code.getStyle();
					codeStyle.setHorizontalAlignment(TextAlignmentType.LEFT);
					code.setStyle(codeStyle, flag);
					Cell name = cells.get(row, column++);
					name.setStyle(style, flag);
					name.putValue(emp.getEmpName());
					Style nameStyle = name.getStyle();
					nameStyle.setHorizontalAlignment(TextAlignmentType.LEFT);
					name.setStyle(nameStyle, flag);
					Cell man1 = cells.get(row, column++);
					style.setCustom("#,##0枚");
					man1.setStyle(style, flag);
					man1.putValue(emp.getMan1());
					sums[0] += emp.getMan1();
					Cell sen5 = cells.get(row, column++);
					sen5.setStyle(style, flag);
					sen5.putValue(emp.getSen5());
					sums[1] += emp.getSen5();
					Cell sen2 = cells.get(row, column++);
					sen2.setStyle(style, flag);
					sen2.putValue(emp.getSen2());
					sums[2] += emp.getSen2();
					Cell sen1 = cells.get(row, column++);
					sen1.setStyle(style, flag);
					sen1.putValue(emp.getSen1());
					sums[3] += emp.getSen1();
					Cell hyaku5 = cells.get(row, column++);
					hyaku5.setStyle(style, flag);
					hyaku5.putValue(emp.getHyaku5());
					sums[4] += emp.getHyaku5();
					Cell moneyCell = cells.get(row++, column);
					style.setCustom("#,##0円");
					style.setBorder(BorderType.RIGHT_BORDER, CellBorderType.NONE, Color.getBlack());
					moneyCell.setStyle(style, flag);
					long money = emp.toMoney();
					moneyCell.putValue(money);
					sums[5] += money;
				}
				
				Style sumStyle = workbook.createStyle();
				sumStyle.setForegroundColor(Color.getCadetBlue());
				sumStyle.setPattern(BackgroundType.SOLID);
				sumStyle.setBorder(BorderType.TOP_BORDER, CellBorderType.DOUBLE, Color.getBlack());
				sumStyle.setBorder(BorderType.RIGHT_BORDER, CellBorderType.DOTTED, Color.getBlack());
				sumStyle.setHorizontalAlignment(TextAlignmentType.RIGHT);
				StyleFlag sumFlag = new StyleFlag();
				sumFlag.setCellShading(true);
				sumFlag.setBorders(true);
				sumFlag.setHorizontalAlignment(true);
				sumFlag.setNumberFormat(true);
				
				column = 1;
				Cell sumText = cells.get(row, column++);
				sumText.setStyle(sumStyle, sumFlag);
				sumText.putValue("部門計");
				Style sumTextStyle = sumText.getStyle();
				sumTextStyle.setHorizontalAlignment(TextAlignmentType.LEFT);
				sumText.setStyle(sumTextStyle, sumFlag);
				
				Cell sumPers = cells.get(row, column++);
				sumPers.setStyle(sumStyle, sumFlag);
				sumPers.putValue(d.getEmployees().size() + "人");
				for (int i = 0; i < sums.length; i++) {
					Cell sumQtt = cells.get(row, column++);
					if (i == sums.length - 1) sumStyle.setCustom("#,##0円");
					else sumStyle.setCustom("#,##0枚");
					sumStyle.setBorder(BorderType.RIGHT_BORDER, i == (sums.length - 1) ? CellBorderType.NONE : CellBorderType.DASHED, Color.getBlack());
					sumQtt.setStyle(sumStyle, sumFlag);
					sumQtt.putValue(sums[i]);
				}
				row++;
			}
			for (int i = 1; i < cells.getMaxDataColumn() + 1; i++) {
				if (i == 1 || i == 2) cells.setColumnWidth(i, 22);
				else cells.setColumnWidth(i, 19);
			}

			String lastCell = "J" + (cells.getMaxDataRow() + 2);
			pageSetup.setPrintArea("A1:" + lastCell);
			pageSetup.setFitToPagesTall(0);
			pageSetup.setFitToPagesWide(1);
			sheet.autoFitRows(true);
//			VerticalPageBreakCollection verticalBreaks = sheet.getVerticalPageBreaks();
//			verticalBreaks.clear();
//			HorizontalPageBreakCollection horizontalBreaks = sheet.getHorizontalPageBreaks();
//			horizontalBreaks.clear();
//			verticalBreaks.add(lastCell);
//			horizontalBreaks.add(lastCell);
			
			workbook.save(this.createNewFile(context, "test.pdf"), new PdfSaveOptions() {
				{
//					setDefaultFont("Arial");
//					setCheckFontCompatibility(false);
				}
			});
//			ctx.saveAsExcel(this.createNewFile(context, "test.xlsx"));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private void createHeader(Workbook workbook) {
		Cells cells = workbook.getWorksheets().get(0).getCells();
		int column = 1;
		Style style = workbook.createStyle();
		style.setForegroundColor(Color.getCadetBlue());
		style.setPattern(BackgroundType.SOLID);
		style.setBorder(BorderType.TOP_BORDER, CellBorderType.MEDIUM, Color.getBlack());
		style.setBorder(BorderType.RIGHT_BORDER, CellBorderType.DOTTED, Color.getBlack());
		style.setBorder(BorderType.BOTTOM_BORDER, CellBorderType.MEDIUM, Color.getBlack());
		style.setHorizontalAlignment(TextAlignmentType.CENTER);
		style.setVerticalAlignment(TextAlignmentType.BOTTOM);
		StyleFlag flag = new StyleFlag();
		flag.setCellShading(true);
		flag.setBorders(true);
		flag.setHorizontalAlignment(true);
		
		cells.merge(1, column, 1, 2);
		Cell emp = cells.get(1, column);
		emp.putValue("社員");
		emp.getMergedRange().applyStyle(style, flag);
		column += 2;
		List<String> names = Arrays.asList("一万円札", "五千円札", "二千円札", "千円札", "五百円", "金額");
		for (int i = 0; i < names.size(); i++) {
			Cell tCell = cells.get(1, column++);
			tCell.putValue(names.get(i));
			if (i == names.size() - 1) {
				style.setBorder(BorderType.RIGHT_BORDER, CellBorderType.NONE, Color.getBlack());
			}
			tCell.setStyle(style, flag);
		}
	}

	@Override
	public void generateWithTemplate(FileGeneratorContext context, List<SampleDepartment> depts) {
		try (AsposeCellsReportContext ctx = this.createContext("report/SampleReport1.xlsx", REPORT_ID)) {
			ctx.setDataSource("Department", depts);
			ctx.processDesigner();
			ctx.saveAsExcel(this.createNewFile(context, "templateTest.xlsx"));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
