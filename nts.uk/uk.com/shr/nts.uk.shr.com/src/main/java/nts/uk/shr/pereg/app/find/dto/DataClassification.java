/**
 * 
 */
package nts.uk.shr.pereg.app.find.dto;

import lombok.AllArgsConstructor;

/**
 * @author danpv
 *
 */

@AllArgsConstructor
public enum DataClassification {

	PERSON(1),
	
	EMPLOYEE(2);

	public final int value;

}
