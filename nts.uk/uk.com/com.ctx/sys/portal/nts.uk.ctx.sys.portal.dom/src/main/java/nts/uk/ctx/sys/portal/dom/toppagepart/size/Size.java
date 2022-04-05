package nts.uk.ctx.sys.portal.dom.toppagepart.size;

import lombok.EqualsAndHashCode;
import lombok.Value;
import nts.arc.layer.dom.DomainObject;

/**
 * @author LamDT
 */
@Value
@EqualsAndHashCode(callSuper = false)
public class Size extends DomainObject {

	/** Width */
	Width width;

	/** Height */
	Height height;

	/**
	 * Create Size from Java type
	 * 
	 * @param
	 * @return Size
	 **/
	public static Size createFromJavaType(Integer width, Integer height) {
		return new Size(new Width(width), new Height(height));
	}
}