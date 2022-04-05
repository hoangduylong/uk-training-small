package nts.uk.ctx.bs.person.infra.entity.person.personal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class BpsmtContactAddrPsPK implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "PID")
    private String personalId;
}
