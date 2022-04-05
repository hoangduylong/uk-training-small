package nts.uk.shr.sample.lazyload.ws;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/sample/lazyload")
@Produces("application/json")
public class SampleLoadWebService {
	
	@POST
	@Path("keys")
	public List<Integer> keys() {
		List<Integer> keys = new ArrayList<>();
		for (int i = 0; i < 400; i++) {
			keys.add(i);
		}
		return keys;
	}
	
	@POST
	@Path("data")
	public List<GridItem> getData(List<Integer> keys) {
		List<GridItem> items = new ArrayList<>();
		keys.stream().forEach(key -> {
			items.add(new GridItem(key));
		});
		return items;
	}
	
	@POST
	@Path("process")
	public List<Item> get(Item item) {
		List<Item> items = new ArrayList<>();
		items.add(new Item(item.getId(), "time", "10:00"));
		items.add(new Item(item.getId(), "header3", "999"));
		return items;
	}
}
