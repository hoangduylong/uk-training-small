package nts.uk.shr.com.system.config;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * SystemConfigurationValue
 */
@RequiredArgsConstructor
public class SystemConfigurationValue {

	private final String value;
	
	public static SystemConfigurationValue none() {
		return new SystemConfigurationValue(null);
	}
	
	public Optional<String> asString() {
		return Optional.ofNullable(this.value);
	}
	
	public Optional<Integer> asInt() {
		return this.asString().map(v -> Integer.parseInt(v));
	}
	
	public Optional<Boolean> asBoolean() {
		return this.asString().map(v -> v.equals("1"));
	}
	
	public <E extends Enum<E>> Optional<E> asEnum(Class<E> enumClass) {
		return this.asInt().map(e -> EnumAdaptor.valueOf(e, enumClass));
	}
}
