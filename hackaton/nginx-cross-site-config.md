upstream backend {
  server localhost:9000;
}

server {
  listen 80 default;
  server_name localhost;

  location / {
    proxy_set_header        X-Real-IP $remote_addr;
    proxy_set_header        X-Forwarded-Host $host;
    proxy_set_header        X-Forwarded-Server $host;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header        Host $host;
    proxy_pass              http://backend;
  }
  
  location /api {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host [API HOST];
    proxy_set_header X-NginX-Proxy true;
    proxy_pass [API HOST];
    proxy_ssl_session_reuse off;
    proxy_redirect off;
  }
}
