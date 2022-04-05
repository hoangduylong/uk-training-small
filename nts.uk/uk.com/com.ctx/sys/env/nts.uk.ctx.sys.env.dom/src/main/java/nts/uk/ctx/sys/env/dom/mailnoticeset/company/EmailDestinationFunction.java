package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

import lombok.Builder;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;
import nts.uk.ctx.sys.env.dom.mailnoticeset.FunctionId;

import java.util.List;

/**
 * メール送信先機能
 */
@Getter
@Builder
public class EmailDestinationFunction extends DomainObject {
	/**
	 * メール分類
	 */
	private EmailClassification emailClassification;

	/**
	 * 機能ID
	 */
	private List<FunctionId> functionIds;
}