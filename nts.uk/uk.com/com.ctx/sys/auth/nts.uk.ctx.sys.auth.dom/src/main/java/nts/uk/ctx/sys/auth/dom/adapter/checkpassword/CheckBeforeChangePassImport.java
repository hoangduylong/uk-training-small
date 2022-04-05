package nts.uk.ctx.sys.auth.dom.adapter.checkpassword;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheckBeforeChangePassImport {
    private boolean error;
    private List<PasswordMessageObject> message;
}
