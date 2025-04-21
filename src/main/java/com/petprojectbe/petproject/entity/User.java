package com.petprojectbe.petproject.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Table(name = "AUTH_USER")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Id
    @GeneratedValue
    private UUID id;
    private String firstName;
    private String lastName;
    private String password;
    private Date createOn;
    private Date updateOn;

    @Column(nullable = false , unique = true)
    private String email;

    private String phoneNumber;
    private String provider;
    private String verificationCode;
    private boolean enabled = true;

    @ManyToMany(cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    @JoinTable(name = "AUTH_USER_AUTHORITY" , joinColumns = @JoinColumn(referencedColumnName = "id") , inverseJoinColumns = @JoinColumn(referencedColumnName = "id"))
    private List<Authority> authorities;

//    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
//    @ToString.Exclude
//    private List<Address> addresses;
}
