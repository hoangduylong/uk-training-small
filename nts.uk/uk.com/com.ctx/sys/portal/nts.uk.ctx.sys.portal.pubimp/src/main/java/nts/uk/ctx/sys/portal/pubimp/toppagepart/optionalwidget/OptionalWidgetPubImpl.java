package nts.uk.ctx.sys.portal.pubimp.toppagepart.optionalwidget;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import nts.uk.ctx.sys.portal.pub.toppagepart.optionalwidget.OptionalWidgetExport;
import nts.uk.ctx.sys.portal.pub.toppagepart.optionalwidget.OptionalWidgetPub;

@Stateless
public class OptionalWidgetPubImpl implements OptionalWidgetPub {

	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public Optional<OptionalWidgetExport> getSelectedWidget(String companyId, String topPagePartCode) {
		return Optional.empty();
	}
}
