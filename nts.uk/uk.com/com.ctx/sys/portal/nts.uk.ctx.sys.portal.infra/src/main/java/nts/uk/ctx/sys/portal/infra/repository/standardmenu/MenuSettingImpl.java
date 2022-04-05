package nts.uk.ctx.sys.portal.infra.repository.standardmenu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.MenuBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TitleBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TreeMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.i18n.TextResource;
import nts.uk.shr.infra.file.report.masterlist.annotation.DomainID;
import nts.uk.shr.infra.file.report.masterlist.data.ColumnTextAlign;
import nts.uk.shr.infra.file.report.masterlist.data.MasterCellStyle;
import nts.uk.shr.infra.file.report.masterlist.data.MasterData;
import nts.uk.shr.infra.file.report.masterlist.data.MasterHeaderColumn;
import nts.uk.shr.infra.file.report.masterlist.data.MasterListData;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListExportQuery;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListMode;

/**
 * 
 * @author thangnv
 *
 */

@Stateless
@DomainID(value = "MenuSetting")
public class MenuSettingImpl implements MasterListData {
	
	@Inject
	private WebMenuRepository webMenuRepository;
	
	@Inject
	private StandardMenuRepository standardMenuRepository; 
	
	private static final String commonTitle = TextResource.localize("CCG013_128").concat(" ");
	private static final String separatorLine = TextResource.localize("CCG013_135");
	private static final String line = TextResource.localize("CCG013_136");
	
	/** 
	 * get header columns text
	 * call seconds
	 */
	@Override
	public List<MasterHeaderColumn> getHeaderColumns(MasterListExportQuery query) {
		
		String companyId = AppContexts.user().companyId();

		List<WebMenu> listWebMenus = webMenuRepository.findAll(companyId);
		int maxTitle = 0;
		// get max of the number of titles (bar_menu is parent of titles)
		if (!CollectionUtil.isEmpty(listWebMenus)){
			for (WebMenu lv1 : listWebMenus) {
				List<MenuBar> listMenuBars= lv1.getMenuBars();
				if (!CollectionUtil.isEmpty(listMenuBars)){
					for (MenuBar lv2 : listMenuBars) {
						List<TitleBar> listTitles = lv2.getTitleMenu();
						if (!CollectionUtil.isEmpty(listTitles)){
							if (listTitles.size() > maxTitle) maxTitle = listTitles.size();
						}
					}
				}
			}
		}
		
		List<MasterHeaderColumn> columns = new ArrayList<>();
		columns.add(new MasterHeaderColumn("コード", TextResource.localize("CCG013_129"),
				ColumnTextAlign.LEFT, "", true));
		columns.add(new MasterHeaderColumn("名称", TextResource.localize("CCG013_130"),
				ColumnTextAlign.LEFT, "", true));
		columns.add(new MasterHeaderColumn("メニュー", TextResource.localize("CCG013_131"),
				ColumnTextAlign.LEFT, "", true));
		
		// Auto render columns header by number of titles
		for (int i = 0; i < maxTitle; i++) {
			columns.add(new MasterHeaderColumn(commonTitle.concat(String.valueOf(i+1)), commonTitle.concat(String.valueOf(i+1)), ColumnTextAlign.LEFT, "", true));
		}
	
		return columns;
	}

	/** 
	 * get master data
	 * call first
	 */
	@Override
	public List<MasterData> getMasterDatas(MasterListExportQuery query) {
		String companyId = AppContexts.user().companyId();

		List<WebMenu> listWebMenus = webMenuRepository.findAll(companyId);
		List<StandardMenu> listStandardMenus = standardMenuRepository.findAll(companyId);
		
		// get max of the number of titles (bar_menu is parent of titles)
		int maxTitle = 0;
		if (!CollectionUtil.isEmpty(listWebMenus)){
			for (WebMenu lv1 : listWebMenus) {
				List<MenuBar> listMenuBars= lv1.getMenuBars();
				if (!CollectionUtil.isEmpty(listMenuBars)){
					for (MenuBar lv2 : listMenuBars) {
						List<TitleBar> listTitles = lv2.getTitleMenu();
						if (!CollectionUtil.isEmpty(listTitles)){
							if (listTitles.size() > maxTitle) maxTitle = listTitles.size();
						}
					}
				}
			}
		}
		
		List<MasterData> datas = new ArrayList<>();
		if (CollectionUtil.isEmpty(listWebMenus)) {
			return null;
		} else {
			listWebMenus = listWebMenus.stream().sorted((object1, object2) -> object1.getWebMenuCode().compareTo(object2.getWebMenuCode())).collect(Collectors.toList());
			// loop web menu 
			for (WebMenu menu : listWebMenus) {
				AtomicInteger rowMenu = new AtomicInteger(0); 
				List<MenuBar> listMenuBars = menu.getMenuBars();
				listMenuBars = listMenuBars.stream().sorted((object1, object2) -> object1.getDisplayOrder().compareTo(object2.getDisplayOrder())).collect(Collectors.toList());
				// loop menu bar 
				if (listMenuBars.isEmpty()){
					// create empty row with only webmenu
					datas.add(createEmptyRow(menu, maxTitle));
				} else {
					for (MenuBar bar : listMenuBars) {
						AtomicInteger rowBar = new AtomicInteger(0); 
						datas.addAll(createMasterDateForRow(menu, bar, rowMenu, rowBar, companyId, listStandardMenus, maxTitle));
					};
				}
			};
		}
		return datas;
	}
	
	/**
	 * create empty row with only webmenu
	 * @param webMenu
	 * @param maxColumn
	 * @return
	 */
	public MasterData createEmptyRow(WebMenu webMenu, int maxColumn) {
		Map<String, Object> data = new HashMap<>();
		putEmptyData(data, maxColumn); 
		
		// display menu level 1 - webMenu
		data.put("コード", webMenu.getWebMenuCode());
		data.put("名称", webMenu.getWebMenuName());
		
		MasterData masterData = new MasterData(data, null, "");
		
		// set cell align
		masterData.cellAt("コード").setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT));
		masterData.cellAt("名称").setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT));

		return masterData;
	}
	
	/**
	 * create rows. One menu_bar is corresponding to many rows
	 * @param webMenu
	 * @param menuBar
	 * @param rowMenu
	 * @param rowBar
	 * @param companyId
	 * @return list of rows data
	 */
	private List<MasterData> createMasterDateForRow(WebMenu webMenu, MenuBar menuBar, AtomicInteger rowMenu, AtomicInteger rowBar, String companyId, List<StandardMenu> listStandardMenus, int maxColumn) {
		List<MasterData> datas = new ArrayList<>();
		List<TitleBar> titleBars = menuBar.getTitleMenu();
		titleBars = titleBars.stream().sorted((object1, object2) -> object1.getDisplayOrder().compareTo(object2.getDisplayOrder())).collect(Collectors.toList());
		// get max of child number (tree_menu is child of title_menu) -> max = number of row will be render for this bar 
		AtomicInteger max = new AtomicInteger(0); 
		titleBars.forEach(x -> {
			List<TreeMenu> listTreeTmps = x.getTreeMenu();
			listTreeTmps = listTreeTmps.stream().sorted((object1, object2) -> object1.getDisplayOrder().compareTo(object2.getDisplayOrder())).collect(Collectors.toList());
			if (!CollectionUtil.isEmpty(listTreeTmps)){
				if (listTreeTmps.size() > max.get()) 
					max.set(x.getTreeMenu().size());
			}
		});
		
		int maxInt = max.get() + 1; // add first row (parent)
		for (int i = 0; i < maxInt; i++) {
			Map<String, Object> data = new HashMap<>();
			putEmptyData(data, maxColumn); 
			
			if (rowMenu.get() == 0) {
				// display menu level 1 - webMenu
				data.put("コード", webMenu.getWebMenuCode());
				data.put("名称", webMenu.getWebMenuName());
			}
			
			if (rowBar.get() == 0) {
				// display menu level 2 - menuBar
				data.put("メニュー", menuBar.getMenuBarName());
			}
			
			AtomicInteger rowTitle = new AtomicInteger(0); 
			titleBars.stream().forEach(title -> {
				List<TreeMenu> listTrees = title.getTreeMenu();
				if (rowBar.get() == 0){
					// first row title is the same with first row of menu_bar
					
					data.put(commonTitle.concat(String.valueOf(1 + rowTitle.get())), title.getTitleMenuName());
				} else {
					if (!CollectionUtil.isEmpty(listTrees)){
						TreeMenu objTreeMenu = listTrees.get(0);
						String displayName = getTreeMenuName(objTreeMenu, listStandardMenus);
						data.put(commonTitle.concat(String.valueOf(1 + rowTitle.get())), displayName);
						listTrees.remove(objTreeMenu);
					}
				}
				rowTitle.getAndIncrement();
			});
			
			MasterData masterData = new MasterData(data, null, "");
			
			// set cell align
			masterData.cellAt("コード").setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT));
			masterData.cellAt("名称").setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT));
			if (rowBar.get() == 0){
				masterData.cellAt("メニュー").setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT).backgroundColor("#127D09").textColor("#ffffff"));
			}
			for (int j = 0; j < titleBars.size(); j++) {
				if (rowBar.get() == 0){
					TitleBar titleBar = titleBars.get(j);
					masterData.cellAt(commonTitle.concat(String.valueOf(j+1))).setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT).backgroundColor(titleBar.getBackgroundColor().toString()).textColor(titleBar.getTextColor().toString()));
					masterData.cellAt(commonTitle.concat(String.valueOf(j+1))).setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT).backgroundColor(titleBar.getBackgroundColor().toString()).textColor(titleBar.getTextColor().toString()));
				} else {
					masterData.cellAt(commonTitle.concat(String.valueOf(j+1))).setStyle(MasterCellStyle.build().horizontalAlign(ColumnTextAlign.LEFT));
				}
			}
			
			datas.add(masterData);
			rowMenu.getAndIncrement();
			rowBar.getAndIncrement();
		}
		return datas;
	}

	/**
	 * @param treeMenu
	 * get tree menu name
	 */
	public String getTreeMenuName(TreeMenu treeMenu, List<StandardMenu> listStandardMenus){
		for (StandardMenu menu : listStandardMenus) {
			if (treeMenu.getCode().equals(menu.getCode()) && treeMenu.getClassification().equals(menu.getClassification()) && treeMenu.getSystem().equals(menu.getSystem())) {
				String displayName = menu.getDisplayName().v();
				if (displayName != null){
					if (displayName.trim().equals(TextResource.localize("CCG013_134"))) {
						displayName = displayName.replaceAll(TextResource.localize("CCG013_134"), separatorLine);
						return displayName;
					}
					if (displayName.contains(line)){
						String str = displayName.trim().replaceAll(line, "");
						if (displayName.equals(line) || str.length() <= 0){
							return separatorLine;
						}
					}
					return displayName;
				}
			}
		}
		return null;
	}
	
	/* Sheet name */
	@Override
	public String mainSheetName() {
		return TextResource.localize("CCG013_132");
	}

	@Override
	public MasterListMode mainSheetMode(){
		return MasterListMode.NONE;
	}
	
	/* put empty map */
	private void putEmptyData(Map<String, Object> data, int maxColumn){
		data.put("コード","");
		data.put("名称", "");
		data.put("メニュー", "");
		for (int j = 0; j < maxColumn; j++) {
			data.put(commonTitle.concat(String.valueOf(j + 1)), "");
		}
	}
}

