package nts.uk.ctx.basic.infra.entity.training.jobtitle;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class BsymtJobHistPK.
 */
@Getter
@Setter
@Embeddable
public class TrainingPositionPK implements Serializable {
    
    /** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	    
    /** The Position Code. */
    @Column(name = "POSITION_CD")
    private String positionCd;


    /**
     * Instantiates a new Training History PK.
     */
    public TrainingPositionPK() {
    	super();
    }

    /**
     * Instantiates a new Training History PK.
     *
     * @param historyId the history id
     * @param jobCd the job code
     */
    public TrainingPositionPK(String positionCd) {
        this.positionCd = positionCd;
    }

}