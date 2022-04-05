package nts.uk.ctx.sys.portal.dom.logsettings;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * ログ設定
 */
@Getter
public class LogSetting extends AggregateRoot {
	
	/**
	 * システム
	 */
	private System system;

	/**
	 *  プログラムID 
	 */
	private String programId;

	/**
	 * メニュー分類
	 */
	private MenuClassification menuClassification;

	/**
	 * ログイン履歴記録
	 */
	private NotUseAtr loginHistoryRecord;

	/**
	 * 起動履歴記録
	 */
	private NotUseAtr startHistoryRecord;

	/**
	 * 修正履歴（データ）記録
	 */
	private NotUseAtr updateHistoryRecord;

	/**
	 * 会社ID
	 */
	private String companyId;
	
	/**
	 * プログラムコード
	 */
	private String programCd;

	/**
	 * Hàm khởi tạo domain thông qua memento
	 * 
	 * @param logSettingMementoGetter
	 * @return
	 */
	public static LogSetting createFromMemento(MementoGetter mementoGetter) {
		LogSetting domain = new LogSetting();
		domain.getMemento(mementoGetter);
		return domain;
	}

	/**
	 * Hàm get memento được sử dụng để cài đặt giá trị cho các primitive trong
	 * domain
	 * 
	 * @param logSettingMementoGetter Ý nghĩa của phương thức này là để thể hiện
	 *                                tính đóng gói (bao đóng) của đối tượng. Mọi
	 *                                thuộc tính của đối tượng đều được khởi tạo và
	 *                                cài đặt bên trong đối tượng. Hàm được sử dụng
	 *                                khi lấy các primitive value từ command hoặc
	 *                                entity
	 */
	public void getMemento(MementoGetter mementoGetter) {
		this.system = EnumAdaptor.valueOf(mementoGetter.getSystem(), System.class);
		this.programId = mementoGetter.getProgramId();
		this.companyId = mementoGetter.getCompanyId();
		this.menuClassification = EnumAdaptor.valueOf(mementoGetter.getMenuClassification(), MenuClassification.class);
		this.loginHistoryRecord = EnumAdaptor.valueOf(mementoGetter.getLoginHistoryRecord(), NotUseAtr.class);
		this.startHistoryRecord = EnumAdaptor.valueOf(mementoGetter.getStartHistoryRecord(), NotUseAtr.class);
		this.updateHistoryRecord = EnumAdaptor.valueOf(mementoGetter.getUpdateHistoryRecord(), NotUseAtr.class);
		this.programCd = mementoGetter.getProgramCd();
	}

	/**
	 * Hàm set memento được sử dụng để set các giá trị primitive của domain cho các
	 * đối tượng cần lấy dữ liệu như là dto hoặc entity
	 * 
	 * @param logSettingMementoSetter Ý nghĩa của hàm này cũng như getMemento, mọi
	 *                                lỗi ngoại lệ có thể xảy ra trong domain đều
	 *                                được quản lý bởi domain
	 */
	public void setMemento(MementoSetter mementoSetter) {
		mementoSetter.setSystem(this.system.value);
		mementoSetter.setProgramId(this.programId);
		mementoSetter.setCompanyId(this.companyId);
		mementoSetter.setMenuClassification(this.menuClassification.value);
		mementoSetter.setLoginHistoryRecord(this.loginHistoryRecord.value);
		mementoSetter.setStartHistoryRecord(this.startHistoryRecord.value);
		mementoSetter.setUpdateHistoryRecord(this.updateHistoryRecord.value);
		mementoSetter.setProgramCd(this.programCd);
	}

	/**
	 * interface này sẽ được implement bởi các đối tượng có quan hệ trực tiếp với
	 * domain Cụ thể trong trường hợp này là DTO và Entity là 2 đối tượng sẽ lấy dữ
	 * liệu từ domain trả ra. Như vậy 2 đối tượng kiểu này sẽ implement interface
	 * này
	 * 
	 * @author vuongnv
	 *
	 */
	public static interface MementoSetter {
		void setSystem(Integer system);

		void setProgramId(String programId);

		void setCompanyId(String companyId);

		void setMenuClassification(Integer menuClassification);
		
		void setLoginHistoryRecord(Integer loginHistoryRecord);

		void setStartHistoryRecord(Integer bootHistoryRecord);
		
		void setUpdateHistoryRecord(Integer editHistoryRecord);
		
		void setProgramCd(String programCd);
	}

	/**
	 * Interface này sẽ được implement bởi đối tượng sẽ sử dụng để khởi tạo domain
	 * Trong kiến trúc của project này thì có command và entity sẽ implement
	 * interface này.
	 * 
	 * @author vuongnv
	 *
	 */
	public static interface MementoGetter {
		Integer getSystem();

		String getProgramId();

		String getCompanyId();

		Integer getMenuClassification();

		Integer getLoginHistoryRecord();

		Integer getStartHistoryRecord();

		Integer getUpdateHistoryRecord();
		
		String getProgramCd();
	}
}
