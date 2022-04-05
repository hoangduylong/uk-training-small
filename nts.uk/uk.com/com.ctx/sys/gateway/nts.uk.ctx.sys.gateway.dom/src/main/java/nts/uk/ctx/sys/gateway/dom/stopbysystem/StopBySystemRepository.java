package nts.uk.ctx.sys.gateway.dom.stopbysystem;

import java.util.Optional;

public interface StopBySystemRepository {
	
	public void insert(StopBySystem domain);

	public void update(StopBySystem domain);

	public Optional<StopBySystem> findByKey(String contractCd);
	 /**
	  * ドメインモデル「システム全体の利用停止」を取得する
	  * @param 契約コード contractCd
	  * @param 利用停止モード stopMode
	  * @return
	  */
	public Optional<StopBySystem>findByCdStatus(String contractCd, int stopMode);
}
