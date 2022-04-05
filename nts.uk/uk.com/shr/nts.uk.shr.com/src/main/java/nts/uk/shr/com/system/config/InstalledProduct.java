package nts.uk.shr.com.system.config;

import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.Value;
import nts.arc.layer.dom.DomainObject;

/**
 * インストール製品情報
 */
@Value
@EqualsAndHashCode(callSuper = false)
@ToString
public class InstalledProduct extends DomainObject {

	private final ProductType productType;
	private final String version;
}
