package nts.uk.ctx.sys.gateway.dom.mail;

import java.util.List;
import java.util.Optional;

import nts.uk.shr.com.url.UrlExecInfo;

/**
* 
*/
public interface UrlExecInfoRepository
{

    List<UrlExecInfo> getAllUrlExecInfo();

    Optional<UrlExecInfo> getUrlExecInfoById(String embeddedId, String cid);

    Optional<UrlExecInfo> getUrlExecInfoByUrlID(String embeddedId);
    
    void add(UrlExecInfo domain);

    void update(UrlExecInfo domain);

    void remove(String embeddedId, String cid);

}
