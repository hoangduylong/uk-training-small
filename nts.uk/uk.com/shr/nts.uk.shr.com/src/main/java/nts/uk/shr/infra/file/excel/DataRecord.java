package nts.uk.shr.infra.file.excel;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import com.aspose.cells.DateTime;

import nts.gul.text.IdentifierUtil;

/**
 * Excel data record
 */
public abstract class DataRecord {
	
	/**
	 * Set data.
	 * @param objects objects
	 * @param fields fields
	 * @return object
	 */
	public Object create(Object[] objects, List<Field> fields) {
		try {
			if (fields == null) fields = arrange();
			for (int i = 0; i < fields.size(); i++) {
				Object attr = objects[i];
				Field field = fields.get(i);
				if (attr instanceof DateTime) {
					DateTime date = (DateTime) attr;
					attr = Date.from(LocalDateTime.of(date.getYear(), date.getMonth(), date.getDay(), date.getHour(), date.getMinute(), date.getSecond())
						.atZone(ZoneId.systemDefault()).toInstant());
				}
				boolean accessible = field.isAccessible();
				if (!accessible) {
					field.setAccessible(true);
					field.set(this, attr);
					field.setAccessible(accessible);
					continue;
				}
				field.set(this, attr);
			}
		} catch (IllegalArgumentException | IllegalAccessException e) {
			throw new RuntimeException(e);
		} 
		return this;
	}
	
	/**
	 * Arrange fields.
	 * @return fields
	 */
	public List<Field> arrange() {
		Field[] fields = this.getClass().getDeclaredFields();
		List<Field> fieldLst = new ArrayList<>(Arrays.asList(fields));
		fieldLst.removeIf(f -> !f.isAnnotationPresent(ExcelColumn.class));
		fieldLst.sort((f1, f2) -> {
			ExcelColumn o1 = f1.getAnnotation(ExcelColumn.class);
			ExcelColumn o2 = f2.getAnnotation(ExcelColumn.class);
			if (o1 != null && o2 != null) {
				return o1.order() - o2.order();
			}
			return -1;
		});
		return fieldLst;
	}
	
	/**
	 * Create titles.
	 * @param ords ords
	 * @param fields fields
	 * @return titles
	 */
	public Map<String, Optional<Field>> createTitles(Map<Integer, Object> ords, List<Field> fields) {
		return ords.keySet().stream().collect(Collectors.toMap(k -> ords.get(k).toString(), k -> {
			if (k > (fields.size() - 1)) return Optional.empty();
			return Optional.of(fields.get(k));
		}));
	}
	
	/**
	 * Sym.
	 * @param objects objects
	 * @return sym list
	 */
	public Map<Integer, Object> sym(Object[] objects) {
		AtomicReference<Integer> i = new AtomicReference<>(0);
		return Arrays.asList(objects).stream().collect(Collectors.toMap(o -> {
			return i.getAndSet(i.get() + 1);
		}, o -> {
			if ("".equals(o) || o == null) {
				return IdentifierUtil.randomUniqueId();
			}
			return o.toString().trim();
		}));
	}
}
