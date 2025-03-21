package com.sonnguyen.api_gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("chat-api", r -> r.path(
                                "/api/v1/channels/**",
                                "/api/v1/auth/**",
                                "/api/v1/friendships/**",
                                "/api/v1/users/**")
                        .uri("http://localhost:8081"))
                .route("chat-server-info", r -> r.path("/ws/info/**") // Tách riêng /ws/info
                        .filters(f -> f
                                .rewritePath("/ws/info/(.*)", "/ws/info/$1")
                                .filter((exchange, chain) -> {
                                    System.out.println("HTTP request to /ws/info: " + exchange.getRequest().getURI());
                                    return chain.filter(exchange);
                                }))
                        .uri("http://localhost:8080")) // Dùng http:// cho /ws/info
                .route("chat-server-ws", r -> r.path("/ws/**") // Các yêu cầu WebSocket khác
                        .filters(f -> f
                                .rewritePath("/ws/(.*)", "/ws/$1")
                                .filter((exchange, chain) -> {
                                    System.out.println("WebSocket request: " + exchange.getRequest().getURI());
                                    return chain.filter(exchange);
                                }))
                        .uri("ws://localhost:8080"))
                .build();
    }
}