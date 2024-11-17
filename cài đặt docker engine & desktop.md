---
created-date: 2024-11-12 19:48
url: 
related: 
aliases:
  - docker
tags:
  - "#reference_note"
summary:
---
## Reference 
[link cài đặt docker trên ubuntu desktop & engine](https://docs.docker.com/engine/install/ubuntu/ ) 
[Complete Docker Compose in one Video - YouTube](https://www.youtube.com/watch?v=S8f5B8-BtzU&list=LL&index=2&t=520s) 
 - ? Docker  engine installation bugs in ubuntu 23 version above   [E: Package ‘docker-ce’ has no installation candidate](https://forums.docker.com/t/installing-docker-on-buster-e-package-docker-ce-has-no-installation-candidate/108397)
	 - <mark style="background: #FFF3A3A6;">Fix</mark> : 
		 - Create the keyring directory to "-p /etc/apt/keyrings '' and check the docker repository " docker.list" 
			 -  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu lunar stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
		 - Add the gpg key 
		 - Remember to update the package " sudp apt-get update"
		 - Installl docker from ubuntu's official package
- ? Docker desktop   [version for docker desktop ](https://docs.docker.com/desktop/release-notes/)
	- 
Basic task for learning docker container 

	- Create dockerfile for your project 
	- docker build -t welcome-to-docker .
	- push the image, create the container will show up in docker desktop 
Khóa học về cài đặt và sử dụng 
## See also 
[[docker]]
[[docker compose]]
## Dffd


