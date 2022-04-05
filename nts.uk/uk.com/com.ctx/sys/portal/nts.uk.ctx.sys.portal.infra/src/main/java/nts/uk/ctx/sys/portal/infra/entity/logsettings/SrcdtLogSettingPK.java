package nts.uk.ctx.sys.portal.infra.entity.logsettings;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SrcdtLogSettingPK {
	
	// Column 会社ID
	@NonNull
	@Column(name = "CID")
	public String cid;
	
	// Column  システム
	@NonNull
	@Column(name = "SYSTEM")
	public Integer system;
	
	// Column  プログラムコード
	@NonNull
	@Column(name = "PROGRAM_CODE")
	public String programCd;
	
	// Column  メニュー分類
	@NonNull
	@Column(name = "MENU_ATR")
	public Integer menuClassification;
}
