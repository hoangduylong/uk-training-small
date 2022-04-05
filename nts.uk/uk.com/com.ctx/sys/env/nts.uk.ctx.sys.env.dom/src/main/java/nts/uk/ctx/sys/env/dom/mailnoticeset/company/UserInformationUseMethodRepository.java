package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

import java.util.Optional;

/**
 * Repository ユーザー情報の使用方法
 */
public interface UserInformationUseMethodRepository {

    /**
     * Add new UserInfoUseMethod_
     *
     * @param domain
     */
    void insert(UserInformationUseMethod domain);

    /**
     * Update UserInfoUseMethod_
     *
     * @param domain
     */
    void update(UserInformationUseMethod domain);

    /**
     * 取得する(会社ID)
     * Find UserInfoUseMethod_ by company ID
     *
     * @param cid
     * @return
     */
    Optional<UserInformationUseMethod> findByCId(String cid);
}
