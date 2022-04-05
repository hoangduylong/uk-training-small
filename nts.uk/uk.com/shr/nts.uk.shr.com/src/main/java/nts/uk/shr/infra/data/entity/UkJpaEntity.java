package nts.uk.shr.infra.data.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.JpaEntity;
import nts.arc.layer.infra.data.entity.type.GeneralDateTimeToDBConverter;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.com.context.AppContexts;

/**
 * Base class of JPA entity for UK.
 */
@Getter
@Setter
@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class UkJpaEntity extends JpaEntity {

	@Convert(converter = GeneralDateTimeToDBConverter.class)
    @Column(name = "INS_DATE", updatable = false)
    private GeneralDateTime insDate;
    
    @Column(name = "INS_CCD", updatable = false)
    private String insCcd;
    
    @Column(name = "INS_SCD", updatable = false)
    private String insScd;
    
    @Column(name = "INS_PG", updatable = false)
    private String insPg;

    @Column(name = "UPD_DATE")
    @Convert(converter = GeneralDateTimeToDBConverter.class)
    private GeneralDateTime updDate;
    
    @Column(name = "UPD_CCD")
    private String updCcd;
    
    @Column(name = "UPD_SCD")
    private String updScd;
    
    @Column(name = "UPD_PG")
    private String updPg;
    
    @PrePersist
    private void setInsertingMetaInfo() {
    	GeneralDateTime insertTime = GeneralDateTime.now();
    	this.insDate = insertTime;
    	this.insCcd = AppContexts.user().companyCode();
    	this.insScd = AppContexts.user().employeeCode();
    	this.insPg = AppContexts.programId();
    	this.updDate = insertTime;
    	this.updCcd = AppContexts.user().companyCode();
    	this.updScd = AppContexts.user().employeeCode();
    	this.updPg = AppContexts.programId();
    }
    
    @PreUpdate
    private void setUpdatingMetaInfo() {
    	this.dirtying();
    }
    
    public void dirtying() {
    	this.updDate = GeneralDateTime.now();
    	this.updCcd = AppContexts.user().companyCode();
    	this.updScd = AppContexts.user().employeeCode();
    	this.updPg = AppContexts.programId();
    }
    
}
