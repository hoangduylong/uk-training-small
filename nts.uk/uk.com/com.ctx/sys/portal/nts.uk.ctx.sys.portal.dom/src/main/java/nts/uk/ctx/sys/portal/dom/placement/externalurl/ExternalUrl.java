package nts.uk.ctx.sys.portal.dom.placement.externalurl;

import java.util.Optional;

import lombok.EqualsAndHashCode;
import lombok.Value;
import nts.arc.layer.dom.DomainObject;
import nts.gul.text.StringUtil;
import nts.uk.ctx.sys.portal.dom.toppagepart.size.Height;
import nts.uk.ctx.sys.portal.dom.toppagepart.size.Size;
import nts.uk.ctx.sys.portal.dom.toppagepart.size.Width;

/**
 * @author LamDT
 */
@Value
@EqualsAndHashCode(callSuper = false)
public class ExternalUrl extends DomainObject {

	/** Url */
	Url url;

	/** Size */
	Size size;

	/** Quickly get Size.width */
	public Width getWidth() {
		return this.size.getWidth();
	}

	/** Quickly get Size.height */
	public Height getHeight() {
		return this.size.getHeight();
	}

	/**
	 * Create External Url from Java type if url is null return Optional.empty
	 * 
	 * @param url Url for class, if blank or NULL will return Optional.empty
	 * @param
	 * @return Optional&lt;ExternalUrl&gt;
	 **/
	public static Optional<ExternalUrl> createFromJavaType(String url, Integer width, Integer height) {
		if (!StringUtil.isNullOrEmpty(url, true)) {
			return Optional.of(new ExternalUrl(new Url(url), Size.createFromJavaType(width, height)));
		}
		return Optional.empty();
	}
}