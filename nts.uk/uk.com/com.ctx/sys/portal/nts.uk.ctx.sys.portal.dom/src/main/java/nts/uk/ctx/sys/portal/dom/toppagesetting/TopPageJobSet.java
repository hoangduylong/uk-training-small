package nts.uk.ctx.sys.portal.dom.toppagesetting;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;

/**
 * 職位別トップページ設定
 * @author sonnh1
 *
 */
@Getter
@EqualsAndHashCode(callSuper = false)
public class TopPageJobSet extends AggregateRoot {

	/** The company id. */
	private String companyId;

	/** The top menu code. */
	private TopMenuCode topMenuCode;

	/** The login menu code. */
	private TopMenuCode loginMenuCode;

	/** The job id. */
	private String jobId;

	/** The person permission set. */
	/**
	 * 本人許可設定
	 */
	private PersonPermissionSetting personPermissionSet;

	/** System */
	private System loginSystem;

	private MenuClassification menuClassification;

	public TopPageJobSet(String companyId, TopMenuCode topMenuCode, TopMenuCode loginMenuCode, String jobId,
			PersonPermissionSetting personPermissionSet, System loginSystem, MenuClassification menuClassification) {
		super();
		this.companyId = companyId;
		this.topMenuCode = topMenuCode;
		this.loginMenuCode = loginMenuCode;
		this.jobId = jobId;
		this.personPermissionSet = personPermissionSet;
		this.loginSystem = loginSystem;
		this.menuClassification = menuClassification;
	}

	/**
	 * Convert from java type to TopPageJobSetting
	 *
	 */
	public static TopPageJobSet createFromJavaType(String companyId, String topMenuCode, String loginMenuCode,
			String jobId, int personPermissionSet, int loginSystem, int menuClassification) {
		return new TopPageJobSet(companyId, new TopMenuCode(topMenuCode), new TopMenuCode(loginMenuCode), jobId,
				EnumAdaptor.valueOf(personPermissionSet, PersonPermissionSetting.class),
				EnumAdaptor.valueOf(loginSystem, System.class),
				EnumAdaptor.valueOf(menuClassification, MenuClassification.class));
	}

}
