package nts.uk.ctx.sys.auth.dom.adapter.checkpassword;

import com.google.common.base.Strings;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.uk.shr.com.i18n.TextResource;

@AllArgsConstructor
@Data
public class PasswordMessageObject {
    private String message;
    private String param;
    public PasswordMessageObject(String message, int param) {
        super();
        this.message = message;
        this.param = String.valueOf(param);
    }
    public PasswordMessageObject(String message) {
        super();
        this.message = message;
    }
    
    public String getErrorMessage() {
    	return (Strings.isNullOrEmpty(this.param)) ? this.message : TextResource.localize(this.message, this.param);
    }
}
