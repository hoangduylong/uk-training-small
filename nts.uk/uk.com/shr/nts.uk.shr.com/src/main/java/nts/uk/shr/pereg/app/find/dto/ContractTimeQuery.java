/**
 * 
 */
package nts.uk.shr.pereg.app.find.dto;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * @author hieult
 *
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractTimeQuery {
	public List<String> listEmpID;
	public GeneralDate baseDate;
}
