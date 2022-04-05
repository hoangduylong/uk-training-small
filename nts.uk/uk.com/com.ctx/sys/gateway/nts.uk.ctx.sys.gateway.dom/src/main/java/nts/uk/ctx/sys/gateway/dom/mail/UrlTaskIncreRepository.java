package nts.uk.ctx.sys.gateway.dom.mail;

import java.util.List;
import java.util.Optional;

import nts.uk.shr.com.url.UrlTaskIncre;

/**
* 
*/
public interface UrlTaskIncreRepository
{

    List<UrlTaskIncre> getAllUrlTaskIncre();

    Optional<UrlTaskIncre> getUrlTaskIncreById(String embeddedId, String cid, String taskIncreId);

    void add(UrlTaskIncre domain);

    void update(UrlTaskIncre domain);

    void remove(String embeddedId, String cid, String taskIncreId);

}
