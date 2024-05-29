app = "indie-stack-template"

kill_signal = "SIGINT"
kill_timeout = 5
processes = []
swap_size_mb = 512

[experimental]
  allowed_public_ports = []
  auto_rollback = true
  cmd = "start.sh"
  entrypoint = "sh"

[mounts]
  source = "data"
  destination = "/data"

[[services]]
  internal_port = 8080
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    handlers = ["http"]
    port = 80
    force_https = true

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

  [[services.http_checks]]
    interval = "10s"
    grace_period = "5s"
    method = "get"
    path = "/healthcheck"
    protocol = "http"
    timeout = "2s"
    tls_skip_verify = false
    [services.http_checks.headers]