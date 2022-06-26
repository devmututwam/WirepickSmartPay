package com.wirepicksmartpay.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.*;

import java.util.List;

@Configuration
@EnableWebMvc
public class AppConfig  implements WebMvcConfigurer {

    /*@Value("${fileUploadsLocation}")
    private String uploadsLocation;*/

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        WebMvcConfigurer.super.configurePathMatch(configurer);
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        WebMvcConfigurer.super.configureContentNegotiation(configurer);
    }

    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
        WebMvcConfigurer.super.configureAsyncSupport(configurer);
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        WebMvcConfigurer.super.configureDefaultServletHandling(configurer);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        WebMvcConfigurer.super.addFormatters(registry);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        WebMvcConfigurer.super.addInterceptors(registry);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**").addResourceLocations("/assets/");
        //registry.addResourceHandler("/files/**").addResourceLocations("file:///"+ uploadsLocation);
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        WebMvcConfigurer.super.addCorsMappings(registry);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/landing");
        registry.addViewController("/index").setViewName( "landing");
        //WebMvcConfigurer.super.addViewControllers(registry);
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp().prefix("/WEB-INF/views/").suffix(".jsp");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        WebMvcConfigurer.super.addArgumentResolvers(resolvers);
    }

    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
        WebMvcConfigurer.super.addReturnValueHandlers(handlers);
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        WebMvcConfigurer.super.configureMessageConverters(converters);
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        WebMvcConfigurer.super.extendMessageConverters(converters);
    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        WebMvcConfigurer.super.configureHandlerExceptionResolvers(resolvers);
    }

    @Override
    public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        WebMvcConfigurer.super.extendHandlerExceptionResolvers(resolvers);
    }

    /*@Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUsername("root");
        dataSource.setPassword("QA6@TKwV");
        dataSource.setUrl(
                "jdbc:mysql://localhost:3306/wirepayDirect?createDatabaseIfNotExist=true");

        return dataSource;
    }*/


}
