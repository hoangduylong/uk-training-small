package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;
import nts.uk.ctx.bs.employee.dom.employee.service.EmployeeReferenceRangeImport;

/**
 * 職場グループ内の参照範囲  --- ENUM
 * UKDesign.ドメインモデル."NittsuSystem.UniversalK".基幹.社員.職場.職場グループ
 * @author HieuLt
 */
@RequiredArgsConstructor
public enum ScopeReferWorkplaceGroup {
	// 0:全社員
	ALL_EMPLOYEE(0),

	// 1:自分のみ
	ONLY_ME(1);

	public final int value;

	public static ScopeReferWorkplaceGroup of(int value) {
		return EnumAdaptor.valueOf(value, ScopeReferWorkplaceGroup.class);
	}

	public static ScopeReferWorkplaceGroup determineTheReferenceRange(EmployeeReferenceRangeImport employeeReferenceRange){
		if(employeeReferenceRange== EmployeeReferenceRangeImport.ONLY_MYSELF) {
			return ScopeReferWorkplaceGroup.ONLY_ME;
		}
		else {
			//Tao QA xasc nhan
			return ScopeReferWorkplaceGroup.ALL_EMPLOYEE;
		}
	}
}
