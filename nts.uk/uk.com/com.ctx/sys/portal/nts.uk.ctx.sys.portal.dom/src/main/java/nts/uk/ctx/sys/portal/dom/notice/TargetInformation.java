package nts.uk.ctx.sys.portal.dom.notice;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.DomainObject;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.対象情報
 * @author DungDV
 *
 */
@Getter
@Setter
public class TargetInformation extends DomainObject {
	
	/** 対象社員ID */
	private List<String> targetSIDs;
	
	/** 対象職場ID */
	private List<String> targetWpids;
	
	/** 宛先区分 */
	private DestinationClassification destination;

}