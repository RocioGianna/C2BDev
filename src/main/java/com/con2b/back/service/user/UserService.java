package com.con2b.back.service.user;

import com.con2b.back.model.user.UserDetails2b;
import com.con2b.back.model.user.User2b;
import com.con2b.back.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service @Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User2b> getUserById(Long id){
        return userRepository.findById(id);
    }
    public User2b getUserByUserCode(String code) throws Exception {
        User2b user = userRepository.findByUserCode(code);
        if(user == null) throw new Exception("User not found");
        return user;
    }
    public void saveUser(User2b user) throws Exception {
        if(userRepository.findByEmail(user.getEmail()) != null){
            throw new Exception("Email already in use");
        };
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
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

    public List<User2b> getUsersByUserCode(String userCode) {
        List<User2b> collaborators = new ArrayList<>();
        collaborators.addAll(userRepository.getUsersbyUserCode(userCode, Role.COLLABORATOR_MOVISTAR.ordinal()));
        collaborators.addAll(userRepository.getUsersbyUserCode(userCode, Role.COLLABORATOR_ALL.ordinal()));
        return collaborators;
    }
}
