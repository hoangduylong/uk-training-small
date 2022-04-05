package nts.uk.shr.com.url;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;

/**
* 埋込URL実行情報
*/
@AllArgsConstructor
@Getter
public class UrlExecInfo extends AggregateRoot
{
    
    /**
    * 埋込URLID
    */
    private String embeddedId;
    
    /**
    * 会社ID
    */
    private String cid;
    
    /**
    * プログラムID
    */
    private String programId;
    
    /**
    * ログインID
    */
    private String loginId;
    
    /**
    * 契約コード
    */
    private String contractCd;
    
    /**
    * 有効期限
    */
    private GeneralDateTime expiredDate;
    
    /**
    * 発行日時
    */
    private GeneralDateTime issueDate;
    
    /**
    * 遷移先の画面ID
    */
    private String screenId;
    
    /**
    * 社員ID
    */
    private String sid;
    
    /**
    * 社員コード
    */
    private String scd;
    
    private List<UrlTaskIncre> taskIncre;	
    
    public static UrlExecInfo createFromJavaType(String embeddedId, String cid, String programId, String loginId, String contractCd, GeneralDateTime expiredDate, GeneralDateTime issueDate, String screenId, String sid, String scd, List<UrlTaskIncre> taskIncre)
    {
        UrlExecInfo  urlExecInfo =  new UrlExecInfo(embeddedId, cid, programId, loginId, contractCd, expiredDate, issueDate, screenId, sid,  scd, taskIncre);
        return urlExecInfo;
    }
    
}
