package nts.uk.ctx.sys.portal.app.find.widget;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;

import nts.uk.shr.com.context.AppContexts;

@Stateless
public class OptionalWidgetFinder {

	public List<OptionalWidgetDto> findAll() {
		return new ArrayList<OptionalWidgetDto>();
	}
}
