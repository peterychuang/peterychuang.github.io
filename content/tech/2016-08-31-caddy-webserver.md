---
aliases: null
date: 2016-08-31T13:34:24-04:00
description: A new and super-easy-to-configure webserver written in Go
header:
  caption: null
  caption_url: null
  image: code.jpg
layout: null
seo_description: null
tag:
- Web Development
- Caddy
title: Serve static websites with Caddy web server
type: post
url: /tech/caddy-webserver/
youtube_id: null
---
First, a little bit of history.

I have been running websites---personal or otherwise---on-and-off for long enough to remember Geocities. Although I wouldn't claim to be an expert, I've seen and done quite a bit over the years, from hand-coding HTML files and uploading files via FTP to running Wordpress on LAMP and LEMP stacks and experimenting with Varnish Cache.

I stopped making websites for a while before building this website with static site generators (first with [Jekyll](/tech/jekyll/), then with [Hugo](/tech/hugo-vs-jekyll-static-site-generator/)). Static sites are simpler, cheaper to run, and with far better performances than dynamic sites such as Wordpress.

Initially, I put this website on Github Pages, which is free and fast, but lacks flexibility. For months, I've been itching to migrate (the move to [Firebase](/tech/switching-from-github-pages-to-firebase/) proved short-lived) while dreading the prospect of having to configure and maintain a server.

Then I discovered [Caddy web server](https://caddyserver.com/), **the easiest-to-set-up web server** I've ever used.

### Setting up Caddy

At the most basic level, the configuration file, ```Caddyfile```, can be as short as this:

{{< highlight go >}}
example.com:443
root /path-to-your-site-root/
{{< /highlight >}}

Or this:

{{< youtube nk4EWHvvZtI >}}

And this is all you need to enable HTTPS with a certificate issued by [Let's Encrypt](https://letsencrypt.org/). No additional work required!

*Note: since this website is behind Cloudflare, you won't see Caddy in the response header, and the certificate is issued through Cloudflare; the Let's Encrypt certficate is used for traffic between the origin server and Cloudflare.*

To allow non-root user to bind to port 80 and 443, run the following command in your terminal:

{{< highlight bash>}}
sudo setcap cap_net_bind_service=+ep /path-to/caddy
{{</ highlight >}}

Finally, set up a systemd service with the following unit file:

{{< highlight bash>}}
[Unit]
Description=Caddy HTTP/2 web server %I
Documentation=https://caddyserver.com/docs
After=network.target

[Service]
User=username
LimitNOFILE=8192
Environment=STNORESTART=yes
ExecStart=/path-to/caddy -agree=true -conf=/path-to/Caddyfile
Restart=on-failure

[Install]
WantedBy=multi-user.target
{{</ highlight >}}

Save it as ```/etc/systemd/system/caddy.service```, then run these commands:

{{< highlight bash>}}
sudo systemctl daemon-reload
sudo systemctl enable caddy.service
sudo systemctl start caddy.service
{{</ highlight >}}

Now, Caddy web server will start on boot.

The simplicity and automatic HTTPS feature are what set Caddy apart from other servers. With its [git addon](https://github.com/abiosoft/caddy-git), which I've [touched upon here](/tech/hugo-site-deployment-workflow/), it fits nicely to my workflow.

[Download Caddy here](https://caddyserver.com/download) and try it out now.

<a href="https://caddyserver.com/download"><img src="/assets/img/caddy-text-boxed-icon-dark.png"></a>
