package nts.uk.ctx.sys.auth.infra.entity.password.changelog;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class SacdtPasswordChangeLog_.
 */
@StaticMetamodel(SacdtPasswordChangeLog.class)
public class SacdtPasswordChangeLog_ {
	
	/** The sacdt password change log PK. */
	public static volatile SingularAttribute<SacdtPasswordChangeLog, SacdtPasswordChangeLogPK> sacdtPasswordChangeLogPK;
	
	/** The password. */
	public static volatile SingularAttribute<SacdtPasswordChangeLog, String> password;
	
}
