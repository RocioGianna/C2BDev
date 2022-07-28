package com.con2b.back.repository;

import com.con2b.back.model.User2b;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User2b, Long> {

    User2b findByEmail(String email);

}
