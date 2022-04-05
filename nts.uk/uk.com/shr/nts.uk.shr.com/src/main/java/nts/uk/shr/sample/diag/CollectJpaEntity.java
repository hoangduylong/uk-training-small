package nts.uk.shr.sample.diag;

import static java.util.stream.Collectors.*;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.val;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.gul.reflection.AnnotationUtil;
import nts.gul.util.OptionalUtil;

/**
 * JPAエンティティのカラム定義をすべて拾うやつ
 */
public class CollectJpaEntity {

	public static List<TableInfo> collect() {
		
		val finder = new ClassFinder();
		
		val infras = Arrays.asList(
				"nts.uk.shr.com",
				"nts.uk.screen.com.infra",
				"nts.uk.file.com.infra",
				"nts.uk.ctx.workflow.infra",
				"nts.uk.ctx.bs.company.infra",
				"nts.uk.ctx.bs.employee.infra",
				"nts.uk.ctx.bs.person.infra",
				"nts.uk.ctx.sys.env.infra",
				"nts.uk.ctx.sys.log.infra",
				"nts.uk.ctx.sys.auth.infra",
				"nts.uk.ctx.sys.portal.infra",
				"nts.uk.ctx.sys.gateway.infra",
				"nts.uk.ctx.sys.shared.infra",
				"nts.uk.ctx.pereg.infra",
				"nts.uk.ctx.exio.infra",
				"nts.uk.ctx.at.auth.infra",
				"nts.uk.ctx.at.function.infra",
				"nts.uk.ctx.at.record.infra",
				"nts.uk.ctx.at.request.infra",
				"nts.uk.ctx.at.schedule.infra",
				"nts.uk.ctx.at.shared.infra",
				"nts.uk.ctx.at.schedulealarm.infra",
				"nts.uk.screen.at.infra",
				"nts.uk.query.infra");
		
		val tables = new ArrayList<TableInfo>();
		
		for (String infra : infras) {
			val t = finder.findClasses(infra).stream()
					.map(c -> table(c))
					.flatMap(OptionalUtil::stream)
					.collect(toList());
			
			tables.addAll(t);
		}
		
		return tables;
		
	}
	
	private static Optional<TableInfo> table(Class<?> clazz) {
		
		val tableAnno = clazz.getAnnotation(Table.class);
		if (tableAnno == null) {
			return Optional.empty();
		}
		
		val columns = columns(clazz);
		return Optional.of(new TableInfo(clazz.getName(), tableAnno.name(), columns));
	}
	
	private static List<ColumnInfo> columns(Class<?> clazz) {
		
		try {
			List<ColumnInfo> columns = new ArrayList<>();
			
			EntityEmbeddedId.fromEntity(clazz).ifPresent(id -> {
				id.attributes.list.stream()
						.map(a -> a.toInfo())
						.forEach(c -> columns.add(c));
			});
			EntityAttributes.of(clazz).list.stream()
					.map(a -> a.toInfo())
					.forEach(c -> columns.add(c));
			
			return columns;
		} catch (Exception ex) {
			throw new RuntimeException("parseに失敗：" + clazz.getName(), ex);
		}
	}

	@RequiredArgsConstructor
	public static class TableInfo {
		public final String entity;
		public final String name;
		public final List<ColumnInfo> columns;
	}
	
	@RequiredArgsConstructor
	public static class ColumnInfo {
		public final String name;
		public final String type;
	}
	
	
	@Value
	public static class EntityAttribute {
	
		private final String name;
		private final Field field;
		private final boolean isPublic;
		private final EntityAttributeType type;
		
		public static EntityAttribute of(Field field) {
			return new EntityAttribute(
					field.getAnnotation(Column.class).name(),
					field,
					field.isAccessible(),
					EntityAttributeType.of(field.getType()));
		}
		
		public ColumnInfo toInfo() {
			return new ColumnInfo(name, type.name);
		}
		

	}

	
	public static class EntityAttributes {

		private final List<EntityAttribute> list;
		
		private EntityAttributes(List<EntityAttribute> list) {
			this.list = list;
		}
		
		public static EntityAttributes of(Class<?> entityClass) {
			
			val attrs = new ArrayList<EntityAttribute>();
			
			Class<?> curClass = entityClass;
			while (curClass != null) {
				attrs.addAll(getAttributes(curClass));
				curClass = curClass.getSuperclass();
			}
			
			return new EntityAttributes(attrs);
		}

		private static List<EntityAttribute> getAttributes(Class<?> curClass) {
			return AnnotationUtil.getStreamOfFieldsAnnotated(curClass, Column.class)
					.map(f -> EntityAttribute.of(f))
					.collect(Collectors.toList());
		}
	}
	
	@Getter
	public static class EntityEmbeddedId {

		private final Field idField;
		private final boolean isPublic;
		private final Class<?> idClass;
		private final EntityAttributes attributes;
		
		private EntityEmbeddedId(Field idField, Class<?> idClass, EntityAttributes attributes) {
			this.idField = idField;
			this.isPublic = idField.isAccessible();
			this.idClass = idClass;
			this.attributes = attributes;
		}
		
		private static EntityEmbeddedId fromIdField(Field idField) {
			return new EntityEmbeddedId(
					idField,
					idField.getType(),
					EntityAttributes.of(idField.getType()));
		}
		
		public static Optional<EntityEmbeddedId> fromEntity(Class<?> entityClass) {
			return AnnotationUtil.getStreamOfFieldsAnnotated(entityClass, EmbeddedId.class)
					.map(f -> fromIdField(f))
					.findFirst();
		}
	}
	
	public enum EntityAttributeType {
		
		BOOLEAN("boolean", boolean.class, Boolean.class),
		SHORT("short", short.class, Short.class),
		INTEGER("int", int.class, Integer.class, short.class),
		LONG("long", long.class, Long.class),
		DOUBLE("double", double.class, Double.class),
		STRING("String", String.class),
		DATE("Date", java.util.Date.class),
		GENERAL_DATE("GeneralDate", GeneralDate.class),
		GENERAL_DATE_TIME("GeneralDateTime", GeneralDateTime.class),
		BIG_INTEGER("BigInteger", java.math.BigInteger.class),
		BIG_DECIMAL("BigDecimal", BigDecimal.class),
		;
		
		final String name;
		final Set<Class<?>> types;
		
		private EntityAttributeType(String name, Class<?>... types) {
			this.name = name;
			this.types = new HashSet<>(Arrays.asList(types));
		}
		
		public static EntityAttributeType of(Class<?> clazz) {
			
			for (EntityAttributeType type : EntityAttributeType.values()) {
				if (type.types.contains(clazz)) {
					return type;
				}
			}
			
			throw new RuntimeException("unknown class: " + clazz.getName());
		}
	}
}
