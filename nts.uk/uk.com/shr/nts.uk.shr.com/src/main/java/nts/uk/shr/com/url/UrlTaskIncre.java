package nts.uk.shr.com.url;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;

/**
* 埋込URLタスク付帯データ
*/
@AllArgsConstructor
@Getter
@Setter
public class UrlTaskIncre extends AggregateRoot
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
    * 
    */
    private String taskIncreId;
    
    /**
    * キー
    */
    private String taskIncreKey;
    
    /**
    * 値
    */
    private String taskIncreValue;
    
    /**
     * パラメータ区分
     */
    private UrlParamAtr urlParamAtr;
    
    public static UrlTaskIncre createFromJavaType(String embeddedId, String cid, String taskIncreId, String taskIncreKey, String taskIncreValue)
    {
        UrlTaskIncre  urlTaskIncre =  new UrlTaskIncre(embeddedId, cid, taskIncreId, taskIncreKey,  taskIncreValue, UrlParamAtr.PROCESS_PARAM);
        return urlTaskIncre;
    }
    
}
