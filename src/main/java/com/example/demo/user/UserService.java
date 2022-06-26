package com.example.demo.user;

import com.example.demo.security.CustomUserDetails;
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
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void saveUser(AppUser appUser) throws Exception {
        if(userRepository.findByEmail(appUser.getEmail()) != null){
            throw new Exception("Email already in use");
        };
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        userRepository.save(appUser);
    }

    public void saveRole(Role role){
        roleRepository.save(role);
    }

    public void addRoleToUser(String userEmail, String roleName){
        AppUser user = userRepository.findByEmail(userEmail);
        Role role = roleRepository.findByName(roleName);
        user.addRole(role);
    }

    public List<AppUser> getUsers(){
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = this.userRepository.findByEmail(username);
        if(appUser == null) throw new UsernameNotFoundException(username);
        return new CustomUserDetails(appUser);
    }
}
