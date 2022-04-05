package nts.uk.ctx.bs.employee.dom.workplace.group;

import java.util.Collections;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.objecttype.DomainAggregate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoWithPeriod;

/**
 * 職場グループ
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.職場グループ
 * @author phongtq
 */
@Getter
@AllArgsConstructor
public class WorkplaceGroup implements DomainAggregate {

	/** 会社ID */
	private final String CID;
	/** 職場グループID */
	private final String id;
	/** 職場グループコード */
	private final WorkplaceGroupCode code;
	/** 職場グループ名称 */
	@Setter
	private WorkplaceGroupName name;
	/** 職場グループ種別 */
	private final WorkplaceGroupType type;



	/**
	 * 職場グループを作成する
	 * @param cid 会社ID
	 * @param code 職場グループコード
	 * @param name 職場グループ名称
	 * @param type 職場グループ種別
	 * @return
	 */
	public static WorkplaceGroup create(String cid, WorkplaceGroupCode code, WorkplaceGroupName name, WorkplaceGroupType type) {
		return new WorkplaceGroup(cid, IdentifierUtil.randomUniqueId(), code, name, type);
	}



	/**
	 * 所属する職場を追加する
	 * @param workplaceId 職場ID
	 * @return
	 */
	public AffWorkplaceGroup addAffWorkplaceGroup(String workplaceId){
		return new AffWorkplaceGroup(this.id, workplaceId);
	}

	/**
	 * 職場グループに属する職場を取得する
	 * @param require
	 * @return
	 */
	public List<String> getAffWorkplace(Require require){
		return require.getWorkplacesInGroup(this.CID, this.id);
	}


	/**
	 * 病棟・事業所情報を取得する
	 * @param require Require
	 * @param period 期間
	 * @return 病棟・事業所情報リスト
	 */
	public List<HospitalBusinessOfficeInfoWithPeriod> getHospitalOrBusinessOfficeInfo(Require require, DatePeriod period) {

		// 病棟・事業所情報が不要であればEmptyを返す
		if ( !this.type.isNeedHospitalOrBusinessOfficeInfo() ) {
			return Collections.emptyList();
		}

		// 期間付き病棟・事業所履歴項目を取得する
		return require.getHospitalOrBusinessOfficeInfoWithPeriod(this.id, period);
	}



	public static interface Require {

		/**
		 * 職場グループに属する職場を取得する
		 * @param cid 会社ID
		 * @param workplaceGroupId 職場グループID
		 * @return
		 */
		List<String> getWorkplacesInGroup(String cid, String workplaceGroupId);

		/**
		 * 期間付き病棟・事業所履歴項目を取得する
		 * @param workplaceGroupId 職場グループID
		 * @param period 期間
		 * @return
		 */
		List<HospitalBusinessOfficeInfoWithPeriod> getHospitalOrBusinessOfficeInfoWithPeriod(String workplaceGroupId, DatePeriod period);

	}

}
