package nts.uk.ctx.sys.gateway.infra.repository.mail;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.gateway.dom.mail.UrlExecInfoRepository;
import nts.uk.ctx.sys.gateway.infra.entity.mail.SgwdtUrlExecInfo;
import nts.uk.ctx.sys.gateway.infra.entity.mail.SgwmtUrlExecInfoPk;
import nts.uk.shr.com.url.UrlExecInfo;

@Stateless
public class JpaUrlExecInfoRepository extends JpaRepository implements UrlExecInfoRepository
{

    private static final String SELECT_ALL_QUERY_STRING = "SELECT f FROM SgwdtUrlExecInfo f";
    private static final String SELECT_BY_KEY_STRING = SELECT_ALL_QUERY_STRING + " WHERE  f.urlExecInfoPk.embeddedId =:embeddedId AND  f.urlExecInfoPk.cid =:cid ";
    private static final String SELECT_BY_URL_ID = SELECT_ALL_QUERY_STRING + " WHERE  f.urlExecInfoPk.embeddedId = :embeddedId";

    @Override
    public List<UrlExecInfo> getAllUrlExecInfo(){
        return this.queryProxy().query(SELECT_ALL_QUERY_STRING, SgwdtUrlExecInfo.class)
                .getList(item -> item.toDomain());
    }

    @Override
    public Optional<UrlExecInfo> getUrlExecInfoById(String embeddedId, String cid){
        return this.queryProxy().query(SELECT_BY_KEY_STRING, SgwdtUrlExecInfo.class)
        .setParameter("embeddedId", embeddedId)
        .setParameter("cid", cid)
        .getSingle(c->c.toDomain());
    }

    @Override
    public void add(UrlExecInfo domain){
        this.commandProxy().insert(SgwdtUrlExecInfo.toEntity(domain));
    }

    @Override
    public void update(UrlExecInfo domain){
        this.commandProxy().update(SgwdtUrlExecInfo.toEntity(domain));
    }

    @Override
    public void remove(String embeddedId, String cid){
        this.commandProxy().remove(SgwdtUrlExecInfo.class, new SgwmtUrlExecInfoPk(embeddedId, cid)); 
    }

	@Override
	public Optional<UrlExecInfo> getUrlExecInfoByUrlID(String embeddedId) {
		return this.queryProxy().query(SELECT_BY_URL_ID, SgwdtUrlExecInfo.class)
		        .setParameter("embeddedId", embeddedId)
		        .getSingle(c->c.toDomain());
	}
}
