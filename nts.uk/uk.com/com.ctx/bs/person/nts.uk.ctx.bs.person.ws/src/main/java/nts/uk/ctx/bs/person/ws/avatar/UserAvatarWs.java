package nts.uk.ctx.bs.person.ws.avatar;

import command.person.personal.avatar.UserAvatarDto;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.AvatarRepository;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.UserAvatar;
import nts.uk.shr.com.context.AppContexts;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import java.util.Optional;

@Path("ctx/bs/person/avatar")
@Produces("application/json")
public class UserAvatarWs {

    @Inject
    AvatarRepository repo;

    @POST
    @Path("get")
    public UserAvatarDto getAvatar() {
        String personalId = AppContexts.user().personId();
        UserAvatarDto avatarDto = UserAvatarDto.builder().build();
        Optional<UserAvatar> avatar = repo.getAvatarByPersonalId(personalId);
        avatar.ifPresent(ava -> ava.setMemento(avatarDto));
        return avatarDto;
    }
}
