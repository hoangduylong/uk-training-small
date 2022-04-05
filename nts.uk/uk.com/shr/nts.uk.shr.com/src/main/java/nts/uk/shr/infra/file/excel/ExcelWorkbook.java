package nts.uk.shr.infra.file.excel;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.IntStream;

import com.aspose.cells.Worksheet;
import com.aspose.cells.WorksheetCollection;

/**
 * Workbook
 */
public class ExcelWorkbook {
	
	/**
	 * Workbook importer
	 */
	private final WorkbookImporter b;
	private ExcelWorkbook(WorkbookImporter b) {
		this.b = b;
	}
	
	/**
	 * Transform data.
	 * @param sheets sheets
	 * @param types types
	 * @return workbook
	 */
	public static Optional<ExcelWorkbook> transform(WorksheetCollection sheets, Map<Integer, Class<? extends DataRecord>> types) {
		if (sheets == null || types == null) return Optional.empty();
		return Optional.of(new ExcelWorkbook(new WorkbookImporter(sheets, types)));
	}
	
	/**
	 * Get sheet.
	 * @param index index
	 * @return optional worksheet
	 */
	public Optional<ExcelWorksheet> getSheet(int index) {
		if (b == null) return Optional.empty();
		return this.b.getWorksheet(index);
	}
	
	/**
	 * Get sheet.
	 * @param name name
	 * @return optional worksheet
	 */
	public Optional<ExcelWorksheet> getSheet(String name) {
		if (b == null) return Optional.empty();
		return this.b.getWorksheet(name);
	}
	
	/**
	 * Get types map.
	 * @return map
	 */
	public Map<Integer, Class<? extends DataRecord>> getTypesMap() {
		if (b == null) 
			throw new RuntimeException("Import file.");
		return this.b.getSheetTypes();
	}
	
	/**
	 * Get all worksheets.
	 * @return all worksheets
	 */
	public List<ExcelWorksheet> getAllSheets() {
		if (b == null) 
			throw new RuntimeException("Import file.");
		return this.b.getAllSheets();
	}
	
	/**
	 * WorkbookImporter
	 */
	static class WorkbookImporter {
		
		/**
		 * worksheets
		 */
		private final List<ExcelWorksheet> worksheets = new ArrayList<>();
		
		/**
		 * noSheets 
		 */
		private int noSheets;
		
		/**
		 * sheets type 
		 */
		private Map<Integer, Class<? extends DataRecord>> sheetTypes;
		
		/**
		 * Get sheet types.
		 * @return sheet types
		 */
		public Map<Integer, Class<? extends DataRecord>> getSheetTypes() {
			return this.sheetTypes;
		}
		
		public WorkbookImporter(List<Worksheet> sheets, Map<Integer, Class<? extends DataRecord>> types) {
			this.noSheets = sheets.size();
			this.sheetTypes = types;
			IntStream.range(0, this.noSheets).forEach(i -> {
				worksheets.add(new ExcelWorksheet(sheets.get(i), sheetTypes.get(i)));
			});
		}
		
		public WorkbookImporter(WorksheetCollection sheets, Map<Integer, Class<? extends DataRecord>> types) {
			this.noSheets = sheets.getCount();
			this.sheetTypes = types;
			IntStream.range(0, this.noSheets).forEach(i -> {
				worksheets.add(new ExcelWorksheet(sheets.get(i), sheetTypes.get(i)));
			});
		}
		
		/**
		 * Add sheet.
		 * @param name name
		 * @param index index
		 */
		public void addSheet(String name, int index) {
			addSheet(new ExcelWorksheet(name, index));
		}
		
		/**
		 * Add sheet.
		 * @param sheet sheet
		 */
		public void addSheet(ExcelWorksheet sheet) {
			worksheets.add(sheet);
		}
		
		/**
		 * Remove sheet.
		 * @param index index
		 */
		public void removeSheet(int index) {
			worksheets.remove(index);
		}
		
		/**
		 * Get worksheet.
		 * @param index index
		 * @return optional worksheet
		 */
		public Optional<ExcelWorksheet> getWorksheet(int index) {
			try {
				return Optional.of(worksheets.get(index));
			} catch (IndexOutOfBoundsException ex) {
				return Optional.empty();
			}
		}
		
		/**
		 * Get worksheet.
		 * @param name name
		 * @return optional worksheet
		 */
		public Optional<ExcelWorksheet> getWorksheet(String name) {
			return worksheets.stream().filter(s -> name.equals(s.getName())).findFirst();
		}
		
		/**
		 * Get all worksheets.
		 * @return all worksheet
		 */
		public List<ExcelWorksheet> getAllSheets() {
			return worksheets;
		}
		
		/**
		 * Get sheet records.
		 * @param index index
		 * @return sheet records
		 */
		public List<Object> getSheetRecords(int index) {
			return getWorksheet(index).orElseThrow(() -> new RuntimeException("Sheet not found.")).getRecords();
		}
	}
}
