package nts.uk.shr.com.communicate.batch;

import java.util.function.Consumer;

import nts.gul.web.communicate.HttpMethod;
import nts.gul.web.communicate.typedapi.RequestDefine;
import nts.gul.web.communicate.typedapi.ResponseDefine;
import nts.gul.web.communicate.typedapi.TypedCommunication;
import nts.gul.web.communicate.typedapi.TypedWebAPI;
import nts.uk.shr.com.communicate.PathToWebApi;

public interface BatchServer {
	
	public static final String CUSTOM_HEADER_USER_CONTEXT = "X-UserContext";
	
	/**
	 * Returns true if the batch server exists.
	 * @return true if the batch server exists
	 */
	boolean exists();

	/**
	 * Create define of Web API of batch server.
	 * CAUTION!!: This method MUST NOT BE CALLED when the batch server does not exist.
	 * @param path
	 * @param requestDefine
	 * @param responseDefine
	 * @return
	 */
	<Q, S> TypedWebAPI<Q, S> webApi(PathToWebApi path, RequestDefine<Q> requestDefine, ResponseDefine<S> responseDefine);

	/**
	 * Create define of Web API (has request and response for JSON) of batch server.
	 * CAUTION!!: This method MUST NOT BE CALLED when the batch server does not exist.
	 * @param path
	 * @param requestEntityClass
	 * @param responseEntityClass
	 * @return
	 */
	default <Q, S> TypedWebAPI<Q, S> webApi(PathToWebApi path, Class<Q> requestEntityClass, Class<S> responseEntityClass) {
		return this.webApi(
				path,
				RequestDefine.json(requestEntityClass, HttpMethod.POST),
				ResponseDefine.json(responseEntityClass));
	}

	/**
	 * Create define of Web API (has only request for JSON, no response) of batch server.
	 * CAUTION!!: This method MUST NOT BE CALLED when the batch server does not exist.
	 * 
	 * @param path
	 * @param requestEntityClass
	 * @return
	 */
	default <Q, S> TypedWebAPI<Q, Void> webApi(PathToWebApi path, Class<Q> requestEntityClass) {
		return this.webApi(
				path,
				RequestDefine.json(requestEntityClass, HttpMethod.POST),
				ResponseDefine.noEntity());
	}
	
	/**
	 * Execute request.
	 * 
	 * @param api
	 * @param requestEntity
	 * @param communicationBuilder
	 */
	<Q, S> void request(TypedWebAPI<Q, S> webApi, Consumer<TypedCommunication<Q, S>> communicationBuilder);
}
