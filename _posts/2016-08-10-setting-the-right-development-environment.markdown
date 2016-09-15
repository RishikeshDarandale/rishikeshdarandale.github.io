---
layout: post
title:  "Setting the right development environment"
date:   2016-08-10 11:45:04 +0530
categories: dev-setup
tags:
  - coding
  - dev-setup
  - sdkman
share: true
read_time: true
---

Setting the local development environment in a right way is very important while working one or more multiple projects. Especially when different projects has requirement of different version of tools. 
 
Being a Java developer, I usually setup my local enviroment with [java SE sdk][java-se-sdk], [maven] and [gradle] tools as below: 

### Java SE setup
Below mentioned steps are referenced from [wiki how to][wiki-how-to]:

{% gist 287fcc28fc678919beaf %}

This ensures the clean installation of java sdk, keep changing the destination for symlink 'latest' to switch your java sdk version. Additionally, you can have ```JAVA_HOME``` exposed to your environment as well.

Prior using [sdkman], I was using the same setup as [java SE sdk] for other sdk kits like [maven], [gradle], etc. Since late 2015, I started using [sdkman], which is very powertool and easy tool to manage your software development kits.

### sdkman setup

It super easy with following command:

```$curl -s "https://get.sdkman.io" | bash```

Following is quick reference to setup [gradle]:

To get a listing of Candidate Versions

```
$sdk list gradle
```

Install the specific version of the software

```
$sdk install gradle 2.14
```
Choose to use a given version in the current terminal

```
$sdk use gradle 2.14
```

Chose to make a given version the default:

```
$sdk deafult gradle 2.14
```

I hope that this gives a simple way to setup your development environment. 

Note: sdk is coming up with support for [java SE sdk], once it is available then the first step mentioned in this blog will be removed.


[wiki-how-to]: http://www.wikihow.com/Install-Oracle-Java-JDK-on-Ubuntu-Linux
[java-se-sdk]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[maven]: https://maven.apache.org/
[gradle]: https://gradle.org/
[sdkman]: http://sdkman.io/


