package nts.uk.ctx.sys.portal.dom.placement;

import java.util.Optional;

import lombok.EqualsAndHashCode;
import lombok.Value;
import nts.arc.layer.dom.DomainObject;
import nts.gul.text.StringUtil;
import nts.uk.ctx.sys.portal.dom.placement.externalurl.Column;
import nts.uk.ctx.sys.portal.dom.placement.externalurl.ExternalUrl;
import nts.uk.ctx.sys.portal.dom.placement.externalurl.Row;

/**
 * @author LamDT
 * 配置
 */
@Value
@EqualsAndHashCode(callSuper = false)
public class Placement extends DomainObject {

	/** Company ID */
	String companyID;

	/** Placement GUID */
	String placementID;

	/** Layout GUID */
	String layoutID;

	/** Toppage Part GUID */
	String toppagePartID;

	/** Column */
	Column column;

	/** Row */
	Row row;

	/** ExternalUrl */
	Optional<ExternalUrl> externalUrl;

	/** Create an Layout from Java type */
	public static Placement createFromJavaType(
			String companyId, String placementID, String layoutID, String toppagePartID,
			int column, int row,
			String url, Integer width, Integer height)
	{
		return new Placement(companyId, placementID, layoutID, toppagePartID,
			new Column(column), new Row(row),
			ExternalUrl.createFromJavaType(url, width, height)
		);
	}
	
	/** Check Placement is an ExternalUrl type */
	public boolean isExternalUrl() {
		if (externalUrl.isPresent() && StringUtil.isNullOrEmpty(toppagePartID, true)) {
			return true;
		}
		return false;
	}

}