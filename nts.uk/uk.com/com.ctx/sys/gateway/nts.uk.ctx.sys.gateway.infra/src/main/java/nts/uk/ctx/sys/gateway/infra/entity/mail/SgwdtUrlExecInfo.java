package nts.uk.ctx.sys.gateway.infra.entity.mail;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.com.url.UrlExecInfo;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
* 
*/
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SGWDT_URL_EXEC_INFO")
public class SgwdtUrlExecInfo extends ContractUkJpaEntity implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    /**
    * ID
    */
    @EmbeddedId
    public SgwmtUrlExecInfoPk urlExecInfoPk;
    
    /**
    * プログラムID
    */
    @Basic(optional = false)
    @Column(name = "PROGRAM_ID")
    public String programId;
    
    /**
    * ログインID
    */
    @Basic(optional = false)
    @Column(name = "LOGIN_ID")
    public String loginId;
    
    /**
    * 有効期限
    */
    @Basic(optional = false)
    @Column(name = "EXPIRED_DATE")
    public GeneralDateTime expiredDate;
    
    /**
    * 発行日時
    */
    @Basic(optional = false)
    @Column(name = "ISSUE_DATE")
    public GeneralDateTime issueDate;
    
    /**
    * 遷移先の画面ID
    */
    @Basic(optional = false)
    @Column(name = "SCREEN_ID")
    public String screenId;
    
    /**
    * 社員ID
    */
    @Basic(optional = true)
    @Column(name = "SID")
    public String sid;
    
    /**
    * 社員コード
    */
    @Basic(optional = true)
    @Column(name = "SCD")
    public String scd;
    
    @Override
    protected Object getKey()
    {
        return urlExecInfoPk;
    }
    @OneToMany(targetEntity=SgwdtUrlTaskIncre.class, mappedBy="urlExecInfo", cascade = CascadeType.ALL)
    @JoinTable(name = "SGWDT_URL_TASK_INCRE")
	public List<SgwdtUrlTaskIncre> taskIncrement;
    
    public UrlExecInfo toDomain() {
        return new UrlExecInfo(this.urlExecInfoPk.embeddedId, this.urlExecInfoPk.cid, this.programId, this.loginId, this.contractCd, this.expiredDate, this.issueDate, this.screenId, this.sid, this.scd, this.taskIncrement.stream().map(x -> {
    		return x.toDomain();
    	}).collect(Collectors.toList()));
    }
    public static SgwdtUrlExecInfo toEntity(UrlExecInfo domain) {
    	
        return new SgwdtUrlExecInfo(new SgwmtUrlExecInfoPk(domain.getEmbeddedId(), domain.getCid()), domain.getProgramId(), domain.getLoginId(), domain.getExpiredDate(), domain.getIssueDate(), domain.getScreenId(), domain.getSid(), domain.getScd(), domain.getTaskIncre().stream().map(x -> {
    		return SgwdtUrlTaskIncre.toEntity(x);
    	}).collect(Collectors.toList()));
    }

}
