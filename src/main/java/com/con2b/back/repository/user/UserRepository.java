package com.con2b.back.repository.user;

import com.con2b.back.model.user.User2b;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User2b, Long> {

    User2b findByEmail(String email);
    User2b findByUserCode(String userCode);
    @Query(value = "SELECT DISTINCT * FROM user2b ub WHERE ub.user_code LIKE %:userCode% AND ub.role =:role LIMIT 8", nativeQuery = true)
    List<User2b> getUsersbyUserCode(String userCode, int role);

}
