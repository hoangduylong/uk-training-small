package nts.uk.ctx.sys.portal.dom.webmenu.personaltying;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.gul.text.StringUtil;

public class PersonalTying extends AggregateRoot {
	
	@Getter
	private String companyId;
    
	@Getter
	private String webMenuCode;
	
	@Getter
	private String employeeId;
	

	
	
	/**
	 * Validate Employee or Web menu code when null
	 */
	@Override
	public void validate() {
	
		super.validate();
		if (StringUtil.isNullOrEmpty(this.employeeId, true) || StringUtil.isNullOrEmpty(this.webMenuCode, true)) {
			throw new RuntimeException("Employee or Web menu code null");
		}
	}
	
	/**
	 * 
	 * @param companyId
	 * @param webMenuCode
	 * @param employeeId
	 */
	public PersonalTying (String companyId, String webMenuCode, String employeeId){
		super();
		this.companyId = companyId;
		this.webMenuCode = webMenuCode;
		this.employeeId = employeeId;
		
	}

	/**
	 * Create From Java Type
	 * @param companyId
	 * @param webMenuCode
	 * @param employeeId
	 * @return
	 */
	public static PersonalTying createFromJavaType(String companyId, String webMenuCode, String employeeId){
		return new PersonalTying(companyId, webMenuCode, employeeId);
	}
}
