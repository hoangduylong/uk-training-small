package nts.uk.ctx.basic.infra.entity.training.jobtitle;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class TrainingJobTitlePK implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Basic(optional = false)
	@Column(name = "JOB_CD")
	private String jobCd;
	
	/**
	 * constructor without args
	 */
    public TrainingJobTitlePK() {
    	super();
    }

    /**
     * constructor
     */
    public TrainingJobTitlePK(String jobCd) {
        this.jobCd = jobCd;
    }
}