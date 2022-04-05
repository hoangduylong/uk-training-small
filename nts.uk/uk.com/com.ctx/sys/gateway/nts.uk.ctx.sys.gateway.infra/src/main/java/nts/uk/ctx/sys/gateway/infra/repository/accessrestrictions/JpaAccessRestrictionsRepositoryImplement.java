package nts.uk.ctx.sys.gateway.infra.repository.accessrestrictions;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictions;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictionsRepository;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.ctx.sys.gateway.infra.entity.accessrestrictions.SgwmtAccess;

@Stateless
public class JpaAccessRestrictionsRepositoryImplement extends JpaRepository implements AccessRestrictionsRepository {

	@Override
	public void insert(AccessRestrictions domain) {
		this.commandProxy().insert(new SgwmtAccess(domain));
	}

	@Override
	public void update(AccessRestrictions domain) {
		this.commandProxy().update(new SgwmtAccess(domain));
	}

	@Override
	public Optional<AccessRestrictions> get(ContractCode contractCode) {
		Optional<SgwmtAccess> e = this.queryProxy().find(contractCode.v(), SgwmtAccess.class);
		return Optional.ofNullable(e.isPresent()?e.get().toDomain():null);
	}

}
