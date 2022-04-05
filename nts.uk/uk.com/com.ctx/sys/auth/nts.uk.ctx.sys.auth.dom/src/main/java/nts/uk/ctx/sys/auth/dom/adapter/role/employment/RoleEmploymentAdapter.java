package nts.uk.ctx.sys.auth.dom.adapter.role.employment;

import java.util.List;

public interface RoleEmploymentAdapter {
    List<EmploymentRolePubDto> getAllByCompanyId(String companyId);
}
