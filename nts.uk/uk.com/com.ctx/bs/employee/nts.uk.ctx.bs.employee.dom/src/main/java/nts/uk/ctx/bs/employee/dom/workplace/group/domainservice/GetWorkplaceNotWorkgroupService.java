package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformation;

/**
 * 職場グループに所属していない職場を取得する
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.職場グループに所属していない職場を取得する
 * @author phongtq
 *
 */
public class GetWorkplaceNotWorkgroupService {
	/**
	 * 	[1] 取得する
	 * @param require
	 * @param baseDate
	 * @return
	 */
	public static List<WorkplaceInformation> getWorkplace(Require require, GeneralDate baseDate){
		// require.運用している職場の情報をすべて取得する( 基準日 )
		List<WorkplaceInformation> lstInfoImports = require.getAllActiveWorkplace(baseDate);

		// 職場情報リスト.isEmpty
		if(lstInfoImports.isEmpty()) {
			return Collections.emptyList();
		}

		// QA http://192.168.50.4:3000/issues/110130 fixed
		List<AffWorkplaceGroup> workplaceGroup = require.getAll();
		// require.職場グループ所属情報をすべて取得する(): map $.職場ID
		List<String> lstWpid = workplaceGroup.stream().map(mapper->mapper.getWorkplaceId()).collect(Collectors.toList());

		// filter not $所属済み職場IDリスト.contains( $.職場ID )
		lstInfoImports = lstInfoImports.stream().filter(predicate-> !lstWpid.contains(predicate.getWorkplaceId())).collect(Collectors.toList());
		return lstInfoImports;
	}

	public static interface Require {
		// [R-1] 運用している職場の情報をすべて取得する    WorkplaceExportService
		// アルゴリズム.運用している職場の情報をすべて取得する( 会社ID, 職場ID )
		List<WorkplaceInformation> getAllActiveWorkplace(GeneralDate baseDate);

		// [R-2] 職場グループ所属情報をすべて取得する    AffWorkplaceGroupRespository
		// 職場グループ所属情報Repository.getAll( 会社ID ) :: JpaAffWorkplaceGroupRespository
		List<AffWorkplaceGroup> getAll();
	}
}
