package nts.uk.shr.infra.i18n.resource.data;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class CisctI18NResourcePK {

	/**
	 * @see: SystemProperties ,if is used for all program it will be "SYSTEM"
	 */
	public static final String CLASS_ID_FOR_ALL = "SYSTEM";
	
	@Column(name = "LANGUAGE_ID")
	public String languageId;
	
	@Column(name = "SYSTEM_ID")
	public String systemId;
	
	@Column(name ="CLASS_ID")
	public String classId;
	
	@Column(name = "RESOURCE_ID")
	public String resourceId;
	
	public static CisctI18NResourcePK createForAllPrograms(String languageId, String systemId, String resourceId) {
		return new CisctI18NResourcePK(languageId, systemId, CLASS_ID_FOR_ALL, resourceId);
	}
}
