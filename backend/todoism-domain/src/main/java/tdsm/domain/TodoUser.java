package tdsm.domain;

import lombok.*;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
//@Entity
//public class TodoUser implements UserDetails {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long userId;
//    private String username;
//    private String firstName;
//    private String lastName;
//    private String password;
//    private String email;
//
//    @NonNull
//    private Date createdAt;
//
//    @PrePersist
//    void createdAt() {
//        this.createdAt = new Date();
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
//    }
//
//    @Override
//    public String getUsername() {
//        return this.username;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//
//}
