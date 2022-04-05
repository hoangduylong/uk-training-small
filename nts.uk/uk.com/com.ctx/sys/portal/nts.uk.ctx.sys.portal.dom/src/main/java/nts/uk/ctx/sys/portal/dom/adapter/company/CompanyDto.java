package nts.uk.ctx.sys.portal.dom.adapter.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {

	private String companyCode;

	private String companyName;

	private String companyId;

	private int isAbolition;
}
