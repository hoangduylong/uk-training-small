package nts.uk.shr.find.postcode;


import javax.ejb.Stateless;
import java.util.List;

@Stateless
public interface IPostCodeFinder {
	public List<PostCode> findPostCodeList(String zipCode);
}
