package nts.uk.ctx.bs.employee.pub.workplace.export;

import java.util.List;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.workplace.workplacegroup.EmpOrganizationExport;

/**
 * IF_社員の所属組織Publish
 * UKDesign.ドメインモデル."NittsuSystem.UniversalK".基幹.社員.職場 
 * @author HieuLt
 *
 */
public interface EmpOrganizationPub {
	/**[1] 取得する**/			
	List<EmpOrganizationExport> getEmpOrganiztion(GeneralDate baseDate , List<String> lstEmpId);
}
