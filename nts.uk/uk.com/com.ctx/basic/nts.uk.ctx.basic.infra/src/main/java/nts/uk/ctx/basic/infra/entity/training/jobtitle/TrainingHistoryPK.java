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
public class TrainingHistoryPK implements Serializable {
    
    /** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	    
    /** The history id. */
    @Column(name = "HISTORY_ID")
    private String historyId;


    /**
     * Instantiates a new Training History PK.
     */
    public TrainingHistoryPK() {
    	super();
    }

    /**
     * Instantiates a new Training History PK.
     *
     * @param historyId the history id
     * @param jobCd the job code
     */
    public TrainingHistoryPK(String historyId) {
        this.historyId = historyId;
    }

}