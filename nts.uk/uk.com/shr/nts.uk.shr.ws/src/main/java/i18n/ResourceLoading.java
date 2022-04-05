package i18n;

//@Path("loadresource")
//@Produces("text/javascript")
public class ResourceLoading {
//	private static final String CURRENT_LOCALE = "current locale";
//	private static int YEAR = 31536000;
//	
//	private ISessionLocale currentLanguage;
//	@Inject
//	private IInternationalization i18n;
//
//	@PostConstruct
//	public void postConstruct(){
//		getSessionLocale();
//	}
//	
//	private void getSessionLocale() {
//		ISessionLocale fromSeesion = SessionContextProvider.get().<ISessionLocale>get(CURRENT_LOCALE);
//		// if it isn't set yet, we will create new one with default locale
//		if (fromSeesion == null) {
//			fromSeesion = new SessionLocale();
//		}
//		this.currentLanguage = fromSeesion;
//	}
//	
//	@GET
//	public Response getSystemResource(@Context Request request) {
//		CacheControl cacheControl = new CacheControl();
//		cacheControl.setNoCache(true);
//		cacheControl.setMaxAge(YEAR);
//		cacheControl.setPrivate(false);
//
//		EntityTag eTag = new EntityTag(createEtag());
//		ResponseBuilder responseBuilder = request.evaluatePreconditions(eTag);
//		if (responseBuilder == null) {
//			responseBuilder = Response.ok(initialResource());
//			responseBuilder.tag(eTag);
//		}
//
//		responseBuilder.cacheControl(cacheControl);
//
//		return responseBuilder.build();
//	}
//
//	private String createEtag() {
//		// tag's format companycode_languagecode_programid_version
//		StringBuilder builder = new StringBuilder();
//		builder.append(SystemProperties.companyCode);
//		builder.append("_");
//		builder.append(currentLanguage.getSessionLocale().getLanguage());
//		builder.append("_");
//		builder.append(SystemProperties.programId);
//		builder.append("_");
//		builder.append(currentLanguage.getVersion());
//		return builder.toString();
//	}
//
//	private String initialResource() {
//		StringBuilder builder = new StringBuilder();
//		String messageObject = createJsObject(
//				i18n.getResourceForProgram(SystemProperties.programId).get(ResourceType.MESSAGE));
//		String codeNameObject = createJsObject(
//				i18n.getResourceForProgram(SystemProperties.programId).get(ResourceType.CODE_NAME));
//		builder.append("var systemLanguage='");
//		builder.append(currentLanguage.getSessionLocale().getLanguage());
//		builder.append("';");
//		builder.append("var names=");
//		builder.append(codeNameObject);
//		builder.append(";");
//		builder.append("var messages=");
//		builder.append(messageObject);
//		return builder.toString();
//	}
//
//	private String createJsObject(Map<String, String> resource) {
//		StringBuilder builder = new StringBuilder();
//		builder.append("{");
//
//		builder.append(resource.entrySet().stream().map(e -> e.getKey() + ":\"" + e.getValue() + "\"")
//				.collect(Collectors.joining(",")));
//
//		builder.append("}");
//		return builder.toString();
//	}
//	@POST
//	@Path("getmessage/{messageId}")
//	@Produces(MediaType.APPLICATION_JSON)
//	public JavaTypeResult<String> getMessage(@PathParam("messageId") String messageId){
//		return new JavaTypeResult<String>(i18n.getAllMessage().getOrDefault(messageId, Strings.EMPTY));
//	}

}
