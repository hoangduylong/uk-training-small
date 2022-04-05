package nts.uk.ctx.sys.portal.ac.find.generalsearch;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.pub.role.RoleExportRepo;
import nts.uk.ctx.sys.auth.pub.role.RoleWhetherLoginPubExport;
import nts.uk.ctx.sys.portal.dom.adapter.generalsearch.LoginRoleResponsibleAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.generalsearch.LoginRulerImport;

/**
 * The Class LoginRoleResponsibleAdapterImpl.
 */
@Stateless
public class LoginRoleResponsibleAdapterImpl implements LoginRoleResponsibleAdapter {

	/** The role repo. */
	@Inject
	private RoleExportRepo roleRepo;
	
	/**
	 * Gets the login responsible.
	 * ログイン者のルール担当を取得する
	 * @return the login responsible
	 */
	@Override
	public LoginRulerImport getLoginResponsible() {
		RoleWhetherLoginPubExport pub = roleRepo.getWhetherLoginerCharge();
		return LoginRulerImport.builder()
				.isEmployee(pub.isEmployeeCharge())
				.isHumanResource(pub.isHumanResOfficer())
				.isPayRoll(pub.isSalaryProfessional())
				.build();
	}

}
