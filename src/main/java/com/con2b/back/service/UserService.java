package com.con2b.back.service;

import com.con2b.back.model.UserDetails2b;
import com.con2b.back.model.User2b;
import com.con2b.back.model.Role;
import com.con2b.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service @Transactional
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void saveUser(User2b user) throws Exception {
        if(userRepository.findByEmail(user.getEmail()) != null){
            throw new Exception("Email already in use");
        };
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


    public void addRoleToUser(String userEmail, Role role){
        User2b user = userRepository.findByEmail(userEmail);
        user.addRole(role);
    }

    public List<User2b> getUsers(){
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User2b user = this.userRepository.findByEmail(username);
        if(user == null) throw new UsernameNotFoundException(username);
        return new UserDetails2b(user);
    }
}
