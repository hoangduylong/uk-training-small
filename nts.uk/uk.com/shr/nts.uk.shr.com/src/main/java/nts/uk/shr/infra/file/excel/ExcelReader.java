package nts.uk.shr.infra.file.excel;

import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.aspose.cells.Workbook;
import com.aspose.cells.WorksheetCollection;

import nts.gul.reflection.ReflectionUtil;

/**
 * Excel Reader
 */
public class ExcelReader {
	
	/**
	 * Workbook
	 */
	private ExcelWorkbook workbook;
	
	/**
	 * Input stream
	 */
	private InputStream is;
	
	public ExcelReader(InputStream is) {
		this.is = is;
	}
	
	/**
	 * Read from input stream.
	 * @param is input stream
	 * @param types data types
	 */
	public void read(Map<Integer, Class<? extends DataRecord>> types) {
		try {
			 WorksheetCollection sheets = new Workbook(is).getWorksheets();
			 ExcelWorkbook.transform(sheets, types).ifPresent(c -> {
				 workbook = c;
			 });
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * Get sheet.
	 * @param index index
	 * @return optional of worksheet
	 */
	public Optional<ExcelWorksheet> getSheet(int index) {
		if (workbook == null) {
			throw new RuntimeException("Workbook not existed.");
		}
		return workbook.getSheet(index);
	}
	
	/**
	 * Get all sheets.
	 * @return all sheets
	 */
	public List<ExcelWorksheet> getAllSheets() {
		if (workbook == null) {
			throw new RuntimeException("Workbook not existed.");
		}
		return workbook.getAllSheets();
	}
	
	/**
	 * Get column data.
	 * @param obj sheet
	 * @param fName fName
	 * @return column data
	 */
	public List<Object> getColumnData(Object obj, String fName) {
		ExcelWorksheet sheet = orThrow(obj);
		List<Object> result = new ArrayList<>();
		sheet.getField(fName).ifPresent(f -> {
			result.addAll(sheet.getRecords().stream().map(d -> {
				return ReflectionUtil.getFieldValue(f, d);
			}).collect(Collectors.toList()));
		});
		return result;
	}
	
	/**
	 * Get row data.
	 * @param obj sheet
	 * @param index index
	 * @return row data
	 */
	public Object getRowData(Object obj, int index) {
		ExcelWorksheet sheet = orThrow(obj);
		return sheet.getRecords().get(index);
	}
	
	/**
	 * Get cell data.
	 * @param obj sheet 
	 * @param index index
	 * @param fName fName
	 * @return cell data
	 */
	public Object getCellData(Object obj, int index, String fName) {
		ExcelWorksheet sheet = orThrow(obj);
		Field field = sheet.getField(fName).orElseThrow(() -> new RuntimeException("Field not found."));
		return ReflectionUtil.getFieldValue(field, sheet.getRecords().get(index));
	}
	
	/**
	 * Get sheet or throw exception.
	 * @param obj sheet
	 * @return worksheet
	 */
	private ExcelWorksheet orThrow(Object obj) {
		Optional<ExcelWorksheet> box;
		if (workbook == null) {
			throw new RuntimeException("Workbook not existed.");
		}
		if (obj instanceof String) {
			box = workbook.getSheet(obj.toString());
		} else {
			box = workbook.getSheet((int) obj);
		}
		return box.orElseThrow(() -> new RuntimeException("Sheet not found."));
	}
}
