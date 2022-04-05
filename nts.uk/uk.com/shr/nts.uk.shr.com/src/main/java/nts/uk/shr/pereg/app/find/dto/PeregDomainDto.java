/**
 * 
 */
package nts.uk.shr.pereg.app.find.dto;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.pereg.app.PeregRecordId;

/**
 * @author danpv
 *
 */
@Getter
@Setter
public class PeregDomainDto {

	@PeregRecordId
	private String recordId;

	public PeregDomainDto() {
	}

	public PeregDomainDto(String recordId) {
		this.recordId = recordId;
	}

}
