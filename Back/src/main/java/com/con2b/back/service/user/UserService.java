package com.con2b.back.service.user;

import com.con2b.back.dto.user.*;

import com.con2b.back.model.operation.Address;
import com.con2b.back.model.product.Provider;
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
import java.util.*;

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
    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    public Optional<User2b> getUserById(Long id){
        return userRepository.findById(id);
    }
    public User2b getUserByUserCode(String code) throws Exception {
        User2b user = userRepository.findByUserCode(code);
        if(user == null) throw new Exception("User not found");
        return user;
    }
    public User2b saveUser(User2b user) throws Exception {
        if(userRepository.findByEmail(user.getEmail()) != null){
            throw new Exception("Email already in use");
        };
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
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
        collaborators.addAll(userRepository.getUsersByUserCode(userCode, Role.COLLABORATOR.ordinal()));
        return collaborators;
    }

    public List<User2b> getAllUsers() {
        List<User2b> collaborators = new ArrayList<>();
        collaborators.addAll(userRepository.findAll());
        return collaborators;
    }

    public User2b createUser(String userCode, String email, String password, String firstName, String lastName, String nid, String phone, String bankAccount, Address billingAddress, Role role, Set<Provider> allowedProviders) throws Exception{
        Address savedAddress = addressService.saveAddress(billingAddress);
        User2b user = new User2b(null, userCode, email, password, firstName, lastName, nid, phone, bankAccount, savedAddress, role, allowedProviders, true);
        return this.saveUser(user);
    }

    public User2b createUser(NewUserDTO user) throws Exception{
        String generatedPassword =  this.generatePassword();
        User2b savedUser = this.createUser(user.getUserCode(), user.getEmail(), passwordEncoder.encode(generatedPassword), user.getFirstName(), user.getLastName(), user.getNid(), user.getPhone(), user.getBankAccount(),user.getBillingAddress(), user.getRole(), user.getAllowedProviders());
        emailSender.sendEmail(savedUser.getEmail(),"New password", generatedPassword);
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
            if(passwordEncoder.matches(password.getActualPass(),(user.getPassword()))) {
                if(isValid(password.getNewPass())) {
                    user.setPassword(passwordEncoder.encode(password.getNewPass()));
                }
                else {
                    throw new IllegalArgumentException("La contraseña no cumple con los requisitos");
                }
            }
            else {
                throw new RuntimeException("La contraseña actual no es correcta");
            }

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
        user2b.setFirstName(newData.getFirstName());
        user2b.setLastName(newData.getLastName());
        user2b.setNid(newData.getNid());
        user2b.setBankAccount(newData.getBankAccount());
        user2b.setBillingAddress(newData.getBillingAddress());

        return userRepository.save(user2b);
    }

    public User2b updateUser(AdminUserEditDTO newData, User2b user2b) {
        user2b.setFirstName(newData.getFirstName());
        user2b.setLastName(newData.getLastName());
        user2b.setNid(newData.getNid());
        user2b.setBankAccount(newData.getBankAccount());
        addressService.saveAddress(newData.getBillingAddress());
        user2b.setBillingAddress(newData.getBillingAddress());
        user2b.setUserCode(newData.getUserCode());
        user2b.setRole(newData.getRole());

        return userRepository.save(user2b);
    }

    public List<User2b> getProcessorsByUserCode(String userCode) {
        List<User2b> processors = new ArrayList<>();
        processors.addAll(userRepository.getUsersByUserCode(userCode, Role.PROCESSOR.ordinal()));
        processors.addAll(userRepository.getUsersByUserCode(userCode, Role.PROCESSOR_ADVANCED.ordinal()));
        return processors;
    }


    public Object getPasswordResetToken(User2b user) {
        String link = "app.2bconexion.com/password-reset?prt=";
        link += passwordResetTokenService.createPasswordResetToken(user.getId()).getToken();

        emailSender.sendEmail(user.getEmail(),"Link new password", link);

        return link + " Email " + user.getEmail() ;
    }

}
