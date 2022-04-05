package nts.uk.shr.com.url;

import java.util.List;
import java.util.Optional;

/**
* 
*/
public interface UrlExecInfoRepository
{

    List<UrlExecInfo> getAllUrlExecInfo();

    Optional<UrlExecInfo> getUrlExecInfoById(String embeddedId, String cid);

    void add(UrlExecInfo domain);

    void update(UrlExecInfo domain);

    void remove(String embeddedId, String cid);

}
