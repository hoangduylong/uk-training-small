package nts.uk.ctx.bs.employee.pub.operationrule;

import java.util.Optional;

public interface OperationRulePub {

    Optional<OperationRuleExport> getOperationRuleByCompanyId(String companyId);
}
