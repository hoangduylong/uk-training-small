package nts.uk.shr.sample.lazyload.ws;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter @Getter
public class Item {

	private int id;
	private String item;
	private String value;
}
