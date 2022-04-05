package nts.uk.ctx.sys.portal.app.command.toppage;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.layout.Layout;
import nts.uk.ctx.sys.portal.dom.layout.LayoutRepository;
import nts.uk.ctx.sys.portal.dom.layout.WidgetSetting;
import nts.uk.ctx.sys.portal.dom.layout.WidgetType;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * class SaveLayoutWidgetCommandHandler
 */
@Stateless
@Transactional
public class SaveLayoutWidgetCommandHandler extends CommandHandler< SaveLayoutCommand> {
	
	@Inject
	private LayoutRepository layoutNewRepository;

	@Override
	protected void handle(CommandHandlerContext<SaveLayoutCommand> context) {
		SaveLayoutCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		command.setCid(companyId);
		Optional<Layout> findLayout = this.layoutNewRepository.getByCidAndCode(companyId, command.getTopPageCode(), command.getLayoutNo());
		// 新規モード
		Layout layout = Layout.createFromMemento(command);
		if (findLayout.isPresent()) {
			// ドメインモデル「レイアウト」を登録する
			List<WidgetSetting> listExistedWidget = findLayout.get().getWidgetSettings();
			Map<WidgetType, WidgetSetting> mapUpdateWidget = layout.getWidgetSettings().stream()
					.collect(Collectors.toMap(item -> item.getWidgetType(), Function.identity()));
			Map<WidgetType, WidgetSetting> mapExistedWidget = listExistedWidget.stream()
					.collect(Collectors.toMap(item -> item.getWidgetType(), Function.identity()));
			// insert/update/delete widget list
			List<WidgetSetting> listNewWidget = layout.getWidgetSettings().stream()
					.filter(widget -> mapExistedWidget.get(widget.getWidgetType()) == null)
					.collect(Collectors.toList());
			List<WidgetSetting> listUpdateWidget = layout.getWidgetSettings().stream()
					.filter(widget -> mapExistedWidget.get(widget.getWidgetType()) != null)
					.collect(Collectors.toList());
			List<WidgetSetting> listDeleteWidget = listExistedWidget.stream()
					.filter(widget -> mapUpdateWidget.get(widget.getWidgetType()) == null)
					.collect(Collectors.toList());
			this.layoutNewRepository.insertListWidget(layout, listNewWidget);
			this.layoutNewRepository.updateListWidget(layout, listUpdateWidget);
			this.layoutNewRepository.deleteListWidget(layout, listDeleteWidget);
		} else {
			this.layoutNewRepository.insertAndFlush(layout);
			
		}
	}

}
