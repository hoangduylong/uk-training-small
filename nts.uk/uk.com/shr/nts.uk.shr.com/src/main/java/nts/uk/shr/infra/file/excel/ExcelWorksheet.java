package nts.uk.shr.infra.file.excel;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.aspose.cells.Cells;
import com.aspose.cells.Worksheet;

import lombok.Getter;
import lombok.Setter;
import nts.gul.reflection.ReflectionUtil;

/**
 * Worksheet
 */
@Setter @Getter
public class ExcelWorksheet {
	
	/**
	 * Name
	 */
	private String name;
	
	/**
	 * Index
	 */
	private int index;
	
	/**
	 * Records 
	 */
	private final List<Object> records = new ArrayList<>();
	
	/**
	 * Data type 
	 */
	private Class<? extends DataRecord> type;
	
	/**
	 * Order map 
	 */
	private Map<Integer, Object> ordersMap = new HashMap<>();
	
	/**
	 * Field map 
	 */
	private Map<String, Optional<Field>> fieldsMap = new HashMap<>();

	public ExcelWorksheet(String name, int index) {
		this.name = name;
		this.index = index;
	}
	public ExcelWorksheet(Worksheet sheet, Class<? extends DataRecord> type) {
		this(sheet.getName(), sheet.getIndex());
		this.type = type;
		importData(sheet);
	}
	
	/**
	 * Add record.
	 * @param data data
	 */
	public void addRecord(Object data) {
		records.add(data);
	}
	
	/**
	 * Remove record.
	 * @param index index
	 */
	public void removeRecord(int index) {
		records.remove(index);
	}
	
	/**
	 * Get records.
	 * @return records data
	 */
	public List<Object> getRecords() {
		return records;
	}
	
	/**
	 * Get field.
	 * @param name name
	 * @return optional field
	 */
	public Optional<Field> getField(String name) {
		Optional<Field> field = this.fieldsMap.get(name);
		if (field == null) {
			return Optional.empty();
		}
		return field;
	}
	
	/**
	 * Get column data.
	 * @param fName fName
	 * @return column data
	 */
	public List<Object> getColumnData(String fName) {
		List<Object> result = new ArrayList<>();
		getField(fName).ifPresent(f -> {
			result.addAll(records.stream().map(d -> {
				return ReflectionUtil.getFieldValue(f, d);
			}).collect(Collectors.toList()));
		});
		return result;
	}
	
	/**
	 * Get row data.
	 * @param index index
	 * @return row data
	 */
	public Object getRowData(int index) {
		return records.get(index);
	}
	
	/**
	 * Get cell data.
	 * @param index index
	 * @param fName fName
	 * @return cell data
	 */
	public Object getCellData(int index, String fName) {
		Field field = getField(fName).orElseThrow(() -> new RuntimeException("Field not found."));
		return ReflectionUtil.getFieldValue(field, records.get(index));
	}
	
	/**
	 * Import data.
	 * @param sheet worksheet
	 */
	public void importData(Worksheet sheet) {
		if (type == null) return;
		Cells cells = sheet.getCells();
		int rowCount = cells.getMaxDataRow();
		int columnCount = cells.getMaxDataColumn();
		Object[][] data = cells.exportArray(0, 0, rowCount + 1, columnCount + 1);
		List<Field> fields = null;
		for (int i = 0; i < data.length; i++) {
			try {
				DataRecord obj = type.newInstance();
				if (i == 0) {
					ordersMap = obj.sym(data[i]);
					fields = obj.arrange();
					fieldsMap = obj.createTitles(ordersMap, fields);
					continue;
				}
				Object r = obj.create(data[i], fields);
				records.add(r);
			} catch (InstantiationException | IllegalAccessException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
