package nts.uk.ctx.sys.env.dom.useatr;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;

/**
 * システム利用設定
 * @author yennth
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SysUsageSet extends AggregateRoot{
	@Setter
	/**会社ID**/
	private String companyId;
	
	/** 人事システム **/
	private Jinji jinji;
	/** 就業システム **/
	private ShuGyo shugyo;
	/** 給与システム **/
	private Kyuyo kyuyo;
	
	public static SysUsageSet createFromJavaType(String companyId, 
													int jinji, int shugyo, int kyuyo){
		return new SysUsageSet(companyId,
							EnumAdaptor.valueOf(jinji, Jinji.class),
							EnumAdaptor.valueOf(shugyo, ShuGyo.class),
							EnumAdaptor.valueOf(kyuyo, Kyuyo.class));
	}
	
	/**
	 * check list company mustn't be abolished all 
	 * @param currentCompanyId
	 * @return
	 * @author yennth
	 */
	public static String createCompanyId(String companyCode, String contractCd) {
		return contractCd + "-" + companyCode;
	}
	
	@Override
	public void validate(){
		super.validate();
	}
}
