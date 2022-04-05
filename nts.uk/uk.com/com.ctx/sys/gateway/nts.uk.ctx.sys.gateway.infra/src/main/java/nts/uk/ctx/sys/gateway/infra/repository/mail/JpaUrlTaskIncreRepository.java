package nts.uk.ctx.sys.gateway.infra.repository.mail;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.gateway.dom.mail.UrlTaskIncreRepository;
import nts.uk.ctx.sys.gateway.infra.entity.mail.SgwdtUrlTaskIncre;
import nts.uk.ctx.sys.gateway.infra.entity.mail.SgwmtUrlTaskIncrePk;
import nts.uk.shr.com.url.UrlTaskIncre;

@Stateless
public class JpaUrlTaskIncreRepository extends JpaRepository implements UrlTaskIncreRepository
{

    private static final String SELECT_ALL_QUERY_STRING = "SELECT f FROM SgwdtUrlTaskIncre f";
    private static final String SELECT_BY_KEY_STRING = SELECT_ALL_QUERY_STRING + " WHERE  f.urlTaskIncrePk.embeddedId =:embeddedId AND  f.urlTaskIncrePk.cid =:cid AND  f.urlTaskIncrePk.taskIncreId =:taskIncreId ";

    @Override
    public List<UrlTaskIncre> getAllUrlTaskIncre(){
        return this.queryProxy().query(SELECT_ALL_QUERY_STRING, SgwdtUrlTaskIncre.class)
                .getList(item -> item.toDomain());
    }

    @Override
    public Optional<UrlTaskIncre> getUrlTaskIncreById(String embeddedId, String cid, String taskIncreId){
        return this.queryProxy().query(SELECT_BY_KEY_STRING, SgwdtUrlTaskIncre.class)
        .setParameter("embeddedId", embeddedId)
        .setParameter("cid", cid)
        .setParameter("taskIncreId", taskIncreId)
        .getSingle(c->c.toDomain());
    }

    @Override
    public void add(UrlTaskIncre domain){
        this.commandProxy().insert(SgwdtUrlTaskIncre.toEntity(domain));
    }

    @Override
    public void update(UrlTaskIncre domain){
        this.commandProxy().update(SgwdtUrlTaskIncre.toEntity(domain));
    }

    @Override
    public void remove(String embeddedId, String cid, String taskIncreId){
        this.commandProxy().remove(SgwdtUrlTaskIncre.class, new SgwmtUrlTaskIncrePk(embeddedId, cid, taskIncreId)); 
    }
}
