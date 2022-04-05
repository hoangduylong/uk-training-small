package command.person.personal;

import command.person.personal.anniversary.AnniversaryNoticeDto;
import command.person.personal.avatar.UserAvatarDto;
import command.person.personal.contact.PersonalContactDto;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryRepository;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.AvatarRepository;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.UserAvatar;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContactRepository;
import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.time.MonthDay;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * アカウント情報を登録する
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class PersonalCommandHandler extends CommandHandler<PersonalCommand> {

    @Inject
    private AvatarRepository avatarRepository;

    @Inject
    private AnniversaryRepository anniversaryRepository;

    @Inject
    private PersonalContactRepository personalContactRepository;

    @Override
    protected void handle(CommandHandlerContext<PersonalCommand> commandHandlerContext) {
        PersonalCommand command = commandHandlerContext.getCommand();
        //#113902
        boolean isUseOfProfile = command.getUseOfProfile();
        boolean isUseOfNotice = command.getUseOfNotice();
        String personalId = AppContexts.user().personId();
        
		// cmd 3 : 個人の顔写真を登録する
		if (isUseOfProfile) {
			String fileId = command.getAvatar().getFileId();
			if (fileId != null) {
				this.updateAvatar(command.getAvatar());
			}
			// cmd 7 : 社員連絡先を登録する
			this.updatePersonalContact(command.getPersonalContact(), personalId);
		}
		if (isUseOfNotice) {
			// cmd 4+5 : 記念日を削除する + 個人の記念日情報を登録する
			this.updateAnniversary(command.getAnniversaryNotices(), personalId);
		}
	}

    // 個人の顔写真を登録する
    private void updateAvatar(UserAvatarDto userAvatarDto) {
        Optional<UserAvatar> userAvatar = avatarRepository.getAvatarByPersonalId(userAvatarDto.getPersonalId());
        if (userAvatar.isPresent()) {
            userAvatar.get().getMemento(userAvatarDto);
            avatarRepository.update(userAvatar.get());
        } else {
            UserAvatar avatar = new UserAvatar();
            avatar.getMemento(userAvatarDto);
            avatarRepository.insert(avatar);
        }
    }

    // 記念日を削除する + 個人の記念日情報を登録する
    private void updateAnniversary(List<AnniversaryNoticeDto> list, String personalId) {
        List<AnniversaryNotice> listFromDatabase = anniversaryRepository.getByPersonalId(personalId);
        List<AnniversaryNotice> listFromClient = list.stream()
                .map(item -> {
                    AnniversaryNotice newAnniversary = new AnniversaryNotice();
                    newAnniversary.getMemento(item);
                    return newAnniversary;
                })
                .collect(Collectors.toList());

        Map<MonthDay, AnniversaryNotice> mapFromDatabase = listFromDatabase.stream()
                .collect(Collectors.toMap(AnniversaryNotice::getAnniversary, Function.identity()));

        Map<MonthDay, AnniversaryNotice> mapFromClient = listFromClient.stream()
                .collect(Collectors.toMap(AnniversaryNotice::getAnniversary, Function.identity()));

        List<AnniversaryNotice> listCreate = listFromClient.stream()
                .filter(item -> mapFromDatabase.get(item.getAnniversary()) == null)
                .map(item -> new AnniversaryNotice(
                                item.getPersonalId(),
                                item.getNoticeDay().value,
                                item.getAnniversary(),
                                item.getAnniversaryTitle().v(),
                                item.getNotificationMessage().v()
                        )
                )
                .collect(Collectors.toList());

        List<AnniversaryNotice> listDelete = listFromDatabase.stream()
                .filter(item -> mapFromClient.get(item.getAnniversary()) == null)
                .collect(Collectors.toList());

        List<AnniversaryNotice> listUpdate = listFromClient.stream()
                .filter(item -> mapFromDatabase.get(item.getAnniversary()) != null)
                .map(item -> {
                    GeneralDate currentSeenDate = mapFromDatabase.get(item.getAnniversary()).getSeenDate();
                    item.updateSeenDate(currentSeenDate);
                    return item;
                })
                .collect(Collectors.toList());

        anniversaryRepository.insertAll(listCreate);
        anniversaryRepository.deleteAll(listDelete);
        anniversaryRepository.updateAll(listUpdate);
    }

    // 社員連絡先を登録する
    private void updatePersonalContact(PersonalContactDto PersonalContactDto, String PersonalId) {
        Optional<PersonalContact> personalContact = personalContactRepository.getByPersonalId(PersonalId);
        if (personalContact.isPresent()) {
            PersonalContact updatePersonalContact = new PersonalContact();
            updatePersonalContact.getMemento(PersonalContactDto);
            personalContactRepository.update(updatePersonalContact);
        } else {
            PersonalContact newPersonalContact = new PersonalContact();
            newPersonalContact.getMemento(PersonalContactDto);
            personalContactRepository.insert(newPersonalContact);
        }
    }
}
