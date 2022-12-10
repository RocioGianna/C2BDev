package com.con2b.back.service.user;

import com.con2b.back.dto.user.*;
import com.con2b.back.model.user.Role;
import com.con2b.back.model.user.UserDetails2b;
import com.con2b.back.model.user.User2b;
import com.con2b.back.repository.user.UserRepository;
import com.con2b.back.service.operation.AddressService;
import org.passay.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service @Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressService addressService;
    @Autowired
    private EmailSenderService emailSender;
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

    public User2b getUserByEmail(String email){
        return userRepository.findByEmail(email);
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

    public List<User2b> gerAllUsers() {
        List<User2b> collaborators = new ArrayList<>();
        collaborators.addAll(userRepository.findAll());
        return collaborators;
    }

    public User2b createUser(NewUserDTO user) {
        User2b u = new User2b();
        u.setUserCode(user.getUserCode());
        u.setFirstname(user.getFirstname());
        u.setLastname(user.getLastname());
        u.setEmail(user.getEmail());
        u.setRole(user.getRole());
        u.setPhone(user.getPhone());
        u.setRefererCode(user.getRefererCode());
        u.setNid(user.getNid());
        u.setBankAccount(user.getBanckAcount());
        addressService.saveAddress(user.getAddress());
        u.setBillingAddress(user.getAddress());
        u.setEnabled(true);
        String pass = this.generatePassword();
        u.setPassword(passwordEncoder.encode(pass));

        User2b savedUser = userRepository.save(u);
        if(savedUser != null){
            emailSender.sendEmail(u.getEmail(),"New password", pass);
        }
        return savedUser;
    }

    private String generatePassword() {
        List<CharacterRule> specialCharacterRule = Arrays.asList(
                new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                new CharacterRule(EnglishCharacterData.Digit, 1));

        PasswordGenerator passwordGenerator = new PasswordGenerator();
        String password = passwordGenerator.generatePassword(10, specialCharacterRule);

        return password;
    }

    public User2b changePassword(UserPasswordDTO password, User2b user){
        if(isValid(password.getNewPass()) && passwordEncoder.matches(password.getActualPass(),(user.getPassword())))
            user.setPassword(passwordEncoder.encode(password.getNewPass()));

        return userRepository.save(user);

    }
    private boolean isValid(String password){
        PasswordValidator validator = new PasswordValidator(Arrays.asList(
        // length between 8 and 16 characters
        new LengthRule(8, 16),
        // at least one upper-case character
        new CharacterRule(EnglishCharacterData.UpperCase, 1),
        // at least one lower-case character
        new CharacterRule(EnglishCharacterData.LowerCase, 1),
        // at least one digit character
        new CharacterRule(EnglishCharacterData.Digit, 1),
        // at least one symbol (special character)
        new CharacterRule(EnglishCharacterData.Special, 1),
        // no whitespace
        new WhitespaceRule()));

        RuleResult result = validator.validate(new PasswordData(password));

        if (result.isValid()) {
            return true;
        }
        return false;
    }


    public User2b updateUser(UserEditDTO newData, User2b user2b) {
        user2b.setPhone(newData.getPhone());
        user2b.setEmail(newData.getEmail());

        return userRepository.save(user2b);
    }

    public User2b updateUser(ProcessorUserEditDTO newData, User2b user2b) {
        user2b.setFirstname(newData.getFirstname());
        user2b.setLastname(newData.getLastname());
        user2b.setNid(newData.getNid());
        user2b.setBankAccount(newData.getBankAccount());
        user2b.setBillingAddress(newData.getBillingAddress());

        return userRepository.save(user2b);
    }

    public User2b updateUser(AdminUserEditDTO newData, User2b user2b) {
        user2b.setFirstname(newData.getFirstname());
        user2b.setLastname(newData.getLastname());
        user2b.setNid(newData.getNid());
        user2b.setBankAccount(newData.getBankAccount());
        addressService.saveAddress(newData.getBillingAddress());
        user2b.setBillingAddress(newData.getBillingAddress());
        user2b.setRefererCode(newData.getRefererCode());
        user2b.setUserCode(newData.getUserCode());
        user2b.setRole(newData.getRole());

        return userRepository.save(user2b);
    }

    public User2b getNewPassword(User2b user) {
        String password = generatePassword();
        user.setPassword(password);
        User2b savedUser = userRepository.save(user);

        if(savedUser != null){
            emailSender.sendEmail(user.getEmail()," new password", user.getPassword());
        }
        return user;
    }

    public List<User2b> getProcessorsByUserCode(String processorCode) {
        List<User2b> processors = new ArrayList<>();
        processors.addAll(userRepository.getUsersbyUserCode(processorCode, Role.PROCESSOR.ordinal()));
        return processors;
    }
}
