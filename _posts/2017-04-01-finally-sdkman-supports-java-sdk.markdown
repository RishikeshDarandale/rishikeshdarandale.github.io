---
layout: post
title:  "sdkman introduces java sdk as "
date:   2016-08-10 11:45:04 +0530
categories: dev-setup
tags:
  - dev-setup
  - sdkman
share: true
read_time: true
---

In my previous [post] of setting the development environment in a right way I talked about tool called [sdkman]. Now, setting the development environment for java (or any jvm based) developers becomes very easy, [sdkman] introduced a support for [java SE sdk][java-se-sdk].

The steps mentioned in my previous [post] for setting up java SDK becomes absolute and to manage different SDKs on your local environemt is done using [sdkman].

### sdkman setup

It super easy with following command:

```$curl -s "https://get.sdkman.io" | bash```

Following is quick reference to setup [java SE sdk][java-se-sdk]

To get a listing of Candidate Versions

```
$sdk list java
```

Install the specific version of the software

```
$sdk install java 8u121
$sdk install java 7u80
```

Choose to use a given version in the current terminal

```
$sdk use java 7u80
```

Chose to make a given version the default:

```
$sdk deafult java 8u121
```

I hope that this will make your life easy and java sdk (and related tool) setup in no time. Happy Coding!


[post]: /dev-setup/setting-the-right-development-environment/
[java-se-sdk]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[maven]: https://maven.apache.org/
[gradle]: https://gradle.org/
[sdkman]: http://sdkman.io/
