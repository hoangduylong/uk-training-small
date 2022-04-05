package nts.uk.ctx.sys.env.infra.entity.mailserver;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2018-05-09T16:58:26")
@StaticMetamodel(SevmtMailServer.class)
public class SevstMailServer_ { 

    public static volatile SingularAttribute<SevmtMailServer, String> popServer;
    public static volatile SingularAttribute<SevmtMailServer, Short> encryptMethod;
    public static volatile SingularAttribute<SevmtMailServer, String> imapServer;
    public static volatile SingularAttribute<SevmtMailServer, Integer> popPort;
    public static volatile SingularAttribute<SevmtMailServer, Integer> smtpPort;
    public static volatile SingularAttribute<SevmtMailServer, Short> useAuth;
    public static volatile SingularAttribute<SevmtMailServer, Short> imapUse;
    public static volatile SingularAttribute<SevmtMailServer, Integer> imapPort;
    public static volatile SingularAttribute<SevmtMailServer, String> password;
    public static volatile SingularAttribute<SevmtMailServer, String> smtpServer;
    public static volatile SingularAttribute<SevmtMailServer, Short> popUse;
    public static volatile SingularAttribute<SevmtMailServer, Short> authMethod;
    public static volatile SingularAttribute<SevmtMailServer, String> emailAuth;
    public static volatile SingularAttribute<SevmtMailServer, String> cid;

}