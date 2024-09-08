package com.sandeep.JobHub.SecurityConfig;

import com.sandeep.JobHub.JwtConfig.JwtRequestFilter;
import com.sandeep.JobHub.Service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {
    @Autowired
    CustomUserService userService;
    @Autowired
    public JwtRequestFilter jwtRequestFilter;

    @Bean
    UserDetailsService userDetailsService(){
        return  userService;
    }
    @Bean
    PasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder();
    }
    @Bean
    AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return  authenticationProvider;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{


        return http
               .csrf(AbstractHttpConfigurer::disable)
               .authorizeHttpRequests(req->req.requestMatchers("/login").permitAll())
                .authorizeHttpRequests(request->request.requestMatchers(new AntPathRequestMatcher("/ws/**")).permitAll())
               .authorizeHttpRequests(req->req.requestMatchers("/signup").permitAll())
               .authorizeHttpRequests(req->req.requestMatchers("/images/**").permitAll())
                .authorizeHttpRequests(req->req.requestMatchers("/Uploads/**").permitAll())
                .authorizeHttpRequests(req->req.requestMatchers("/docs/**").permitAll())

               .authorizeHttpRequests(req->req.requestMatchers("/hello").hasRole("ADMIN"))
               .authorizeHttpRequests(req->req.requestMatchers("/user").authenticated())
               .authorizeHttpRequests(req->req.requestMatchers("/post").authenticated())
               .authorizeHttpRequests(req->req.requestMatchers("/ws/**").permitAll())
               .authorizeHttpRequests(req->req.requestMatchers("/ws").permitAll())
               .authorizeHttpRequests(req->req.anyRequest().authenticated())
               .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
}
