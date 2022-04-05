package nts.uk.shr.infra.helper;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.helper.JPAHelper;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@Stateless
public class UkJpaHelper implements JPAHelper {

	@Override
	public void makeDirty(Object entity) {
		try {
			if(entity instanceof UkJpaEntity){
				((UkJpaEntity) entity).setUpdDate(GeneralDateTime.now());
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		}
	}

}
