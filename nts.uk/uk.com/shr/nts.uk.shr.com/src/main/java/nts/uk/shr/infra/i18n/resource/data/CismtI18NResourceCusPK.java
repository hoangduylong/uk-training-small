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
public class CismtI18NResourceCusPK {

	/**
	 * @see: SystemProperties ,if is used for all program it will be "SYSTEM"
	 */
	public static final String CLASS_ID_FOR_ALL = "SYSTEM";
	
	@Column(name = "CID")
	public String companyId;
	
	@Column(name = "LANGUAGE_ID")
	public String languageId;
	
	@Column(name = "SYSTEM_ID")
	public String systemId;
	
	@Column(name ="CLASS_ID")
	public String classId;
	
	@Column(name = "RESOURCE_ID")
	public String resourceId;
	
	public static CismtI18NResourceCusPK createForAllPrograms(
			String companyId, String languageId, String systemId, String resourceId) {
		return new CismtI18NResourceCusPK(companyId, languageId, systemId, CLASS_ID_FOR_ALL, resourceId);
	}
}
