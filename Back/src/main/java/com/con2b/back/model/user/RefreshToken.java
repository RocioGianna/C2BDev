package com.con2b.back.model.user;

import com.con2b.back.model.user.User2b;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {

    @Id @GeneratedValue
    private Long id;

    private String token;
    @OneToOne
    private User2b user;

    private Instant expirationDate;
}
