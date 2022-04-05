package nts.uk.ctx.sys.gateway.dom.singlesignon.saml;

import lombok.Getter;

@Getter
public class IdpUserAssociation {

	//テナントコード
	private String tenantCode;
	
	//会社ID
	private String companyId;
	
	//社員ID
	private String employeeId;
	
	//Idpユーザ名
	private String idpUserName;

	
	public IdpUserAssociation(String tenantCode, String companyId, String employeeId, String idpUserName) {
		this.tenantCode = tenantCode;
		this.companyId = companyId;
		this.employeeId = employeeId;
		this.idpUserName = idpUserName;
	}	
}
