package nts.uk.ctx.sys.portal.app.command.toppage;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.toppage.Toppage;

@Getter
@Setter
public class TopPageBaseCommand implements Toppage.MementoSetter, Toppage.MementoGetter {
	
	/** コード */
	private String topPageCode;
	/** レイアウトの表示種類 */
	private int layoutDisp;
	/** 会社ID */
	private String cid;
	/** 名称 */
	private String topPageName;
	
	@Override
	public BigDecimal getLayoutDisp() {
		return BigDecimal.valueOf(this.layoutDisp);
	}

	@Override
	public String getCid() {
		return this.cid;
	}

	@Override
	public void setLayoutDisp(BigDecimal layoutDisp) {
		this.layoutDisp = layoutDisp.intValue();
	}

	@Override
	public void setCid(String cid) {
		this.cid = cid;
	}
}
