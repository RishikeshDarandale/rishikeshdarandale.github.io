---
layout: post
title:  "Deploying artifact to OSS Sonatype with travis and gradle"
date:   2018-02-23 11:05:04 +0530
categories: build
tags:
  - gradle
  - maven
  - maven-central
  - oss-sonatype
  - travis
share: true
read_time: true
---

When you start coding with your opensource library, you might be exploring the way to publish the artifacts of it to maven central respository. Here, I am going to talk about the same process that I followed to publish the artifact to maven central repository. All these steps I carried out while releasng [aws-http](https://github.com/RishikeshDarandale/aws-http) to maven central.

## Release with gradle-release-plugin

First of all, lets start with how we want to maintain the version of the project. The current/latest development(master branch) will be always be a SNAPSHOT version and the release version will use [Semantic Versioning](https://semver.org/). To create a release version of my project I have used [gradle release plugin](https://github.com/researchgate/gradle-release). To configure the [gradle release plugin](https://github.com/researchgate/gradle-release), please follow below steps:

* Create a `gradle.properties` file in your root project directory and add following:

```
group=<YOUR_GROUP_ID>
archivesBaseName=<YOUR_ARTIFACT_ID>
version=1.0.0-SNAPSHOT
```

* Add below mentioned code in your `build.gradle` file:

```
// add the build script
buildscript {
  repositories {
    maven {
      url 'https://plugins.gradle.org/m2/'
    }
  }
  dependencies {
    classpath 'net.researchgate:gradle-release:2.6.0'
  }
}

//declare the release plugin
apply plugin: 'net.researchgate.release'
```

Once above setup is done, then you can create a release of your project using following command:
```
$./gradlew release
```

> This command will prompt you for release version and next development version.

> If you want not to prompt of version on command line, then you need to pass `release.useAutomaticVersion`, `release.releaseVersion` and `release.newVersion`.

```
$ gradle release -Prelease.useAutomaticVersion=true -Prelease.releaseVersion=1.0.0 -Prelease.newVersion=1.0.1-SNAPSHOT
```

## Releasing the artifact to maven central

Great! Now you have a way to release your project with [Semantic Versioning](https://semver.org/) using [gradle release plugin](https://github.com/researchgate/gradle-release).

To release your project artifacts to [OSS Sonatype](http://central.sonatype.org/) you need to create the [JIRA account](https://issues.sonatype.org/secure/Signup!default.jspa) and create a [project ticket](https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134) for your project repositories.

while releasing the artifacts to central, there are few [basic requirements](http://central.sonatype.org/pages/requirements.html) your project needs to comform. These reuirements are mentioned below:

* provide the javadoc and sources for your project
* sign the artifacts
* provide the correct metadata in POM file of the project

A complete example of pom file can be referred [here](http://central.sonatype.org/pages/requirements.html#a-complete-example-pom).

### GPG keys

As we learnt above that we need to sign the artifacts before pushing it to maven central, we need to have PGP keys for the signing purpose. Please refer [here](http://central.sonatype.org/pages/working-with-pgp-signatures.html) to create the PGP keys. I will be elaborating the steps I have used on uBuntu 17.10 with `gpg`

* Verify the installation of `gpg`

```
$gpg --version
gpg (GnuPG) 2.1.15
libgcrypt 1.7.8
...
$

```

* Create the key

```
$gpg --gen-key

```

> Enter the Real Name and Email Id properly. Important: Remember your passphrase while creating the keys!

* List the public keys

```
$ gpg --list-keys --keyid-format short
/home/<USER>/.gnupg/pubring.kbx
...

```

* List the secret keys

```
$ gpg --list-secret-keys --keyid-format short
```

* Export the keys as gradle-signing plugin can not read .kbx format

```
$ gpg --export-secret-key <KEY_ID> > ~/.gnupg/pubring.gpg
```

> You can get `KEY_ID` from output of command `gpg --list-secret-keys --keyid-format short`

Hmmm! Now you have private/public key pair. Lets publish your public key to the world so that they will be able to verify your signature!

* Publish your public key

```
$ gpg --keyserver hkp://pgp.mit.edu --send-keys <KEY_ID>
```

> Imporatant: Please read this to know [How we should backup the gpg keys?](https://gist.github.com/RishikeshDarandale/0b545beabe4913bf867ce329ee954c5c)

Now, lets configure our gradle build to sign and upload the artifacts to maven central.

* Lets add `maven` and `singing` gradle plugin

```
apply plugin: 'maven'
apply plugin: 'signing'
```

* Add a task for javadoc in `build.gradle`

```
// Create a jar with javadoc
task javadocJar(type: Jar) {
  classifier = 'javadoc'
  from javadoc
}
```

* Add a task for sources in `build.gradle`

```
// Create a jar with soruces
task sourcesJar(type: Jar) {
  classifier = 'sources'
  from sourceSets.main.allSource
}
```

* Hook the javadoc and sources task unser archive

```
// hook all the artifacts under artifacts task
artifacts {
  archives javadocJar, sourcesJar
}
```

* Add a signing task in `build.gradle`

```
// Signing task
signing {
  sign configurations.archives
}
```

* Add upload archives task in `build.gradle`

```
// `FOO` and `BAR` are overridden by external ones!
def v_ossrhUsername="FOO"
def v_ossrhPassword="BAR"

if (project.hasProperty("ossrhUsername")) {
  v_ossrhUsername = ossrhUsername
}
if (project.hasProperty("ossrhPassword")) {
  v_ossrhPassword = ossrhPassword
}

uploadArchives {
  repositories {
    mavenDeployer {
      beforeDeployment { MavenDeployment deployment -> signing.signPom(deployment) }

      repository(url: "https://oss.sonatype.org/service/local/staging/deploy/maven2/") {
        authentication(userName: v_ossrhUsername, password: v_ossrhPassword)
      }

      snapshotRepository(url: "https://oss.sonatype.org/content/repositories/snapshots/") {
        authentication(userName: v_ossrhUsername, password: v_ossrhPassword)
      }

      pom.project {
        name 'aws-http'
        packaging 'jar'
        artifactId archivesBaseName
        version version
        description 'A fluent http client library for aws'
        url 'https://rishikeshdarandale.github.io/aws-http/'

        scm {
          connection 'scm:git:git://github.com/rishikeshdarandale/aws-http.git'
          developerConnection 'scm:git:git@github.com:rishikeshdarandale/aws-http.git'
          url 'https://github.com/rishikeshdarandale/aws-http'
        }

        licenses {
          license {
            name 'MIT License'
            url 'http://www.opensource.org/licenses/mit-license.php'
          }
        }

        developers {
          developer {
            id 'rishikeshdarandale'
            name 'Rishikesh Darandale'
            email 'rishikesh.darandale@gmail.com'
            url 'https://rishikeshdarandale.github.io'
          }
        }
      }
    }
  }
}
```

* Lets add the JIRA username/password and signing information to your `~/.gradle/gradle.properties`

```
signing.keyId=YourKeyId
signing.password=YourPublicKeyPassword
signing.secretKeyRingFile=PathToYourKeyRingFile

ossrhUsername=your-jira-id
ossrhPassword=your-jira-password
```

* Lets first try pushing SNAPSHOT version from master branch

```
$gradle uploadArchives
```

If everything goes fine, your SNAPSHOT artifacts should in SNAPSHOT repository.

## Automate publishing of SNAPSHOT artifacts using travis build

Most likely you might be using [travis](travis-ci.org) or some other CI for CI pipeline. Here, I will be explaning you how to publish your SNAPSHOT artifacts to maven central using [travis](travis-ci.org).

* First create a seprate GPG keys for [travis](travis-ci.org) as we would be explicitely using it for only from [travis](travis-ci.org).
* Publish GPG Key
* Install [travis gem](https://github.com/travis-ci/travis.rb) to uBuntu

```
$sudo gem install travis
```

> I had install these dependency prior to gem installation. `$sudo apt install ruby ruby-dev libffi-dev gcc make`

* Create `.travis.yml` file in your root directory of project
* Encrypt the parameters for [travis](travis-ci.org) build. Execute below commands from the root directory of your project.

```
travis encrypt SONATYPE_USERNAME="<YOUR_JIRA_USER_NAME>" --add
travis encrypt SONATYPE_PASSWORD="<YOUR_JIRA_PASSWORD>" --add
travis encrypt GPG_KEY_ID="<TRAVIS_GPG_KEY_ID>" --add
travis encrypt GPG_KEY_PASSPHRASE="<TRAVIS_KEY_PASSPHRASE>" --add
```

* Export the secrect/private GPG key to `my.travis.gpg` into your root directoy of project

```
$gpg --export-secret-key <TRAVIS_KEY_ID> > my.travis.gpg
```

* Encrypt private key gpg file with travis

```
$travis encrypt-file my.travis.gpg
```

> This will create an encrypted file as `my.travis.gpg.enc`.

> Take a note of a line `openssl aes-256-cbc -K...`

* Delete the original `my.travis.gpg` file

```
$shred --remove my.travis.gpg
```

* Create a deploy script as below:

```
#!/usr/bin/env bash
if [ "$TRAVIS_BRANCH" = 'master' ] && [ "$TRAVIS_PULL_REQUEST" == 'false' ]; then
  openssl aes-256-cbc -K 
  ./gradlew uploadArchives -PossrhUsername=${SONATYPE_USERNAME} -PossrhPassword=${SONATYPE_PASSWORD} -Psigning.keyId=${GPG_KEY_ID} -Psigning.password=${GPG_KEY_PASSPHRASE} -Psigning.secretKeyRingFile=my.travis.gpg
fi

```

> Replace your `openssl aes-256-cbc -K` line above

> Deploy script will not be invoked for Pull Request!

* Finally, modify your `.travis.yml` as below:

```
language: java
jdk:
  - oraclejdk8
install:
  - ./gradlew assemble -x signArchives
script:
  - ./gradlew check
after_success:
  - ./deploy.sh
env:
  global:
    - secure: <ENCRYPTED_VALUE>
    - secure: <ENCRYPTED_VALUE>
    - secure: <ENCRYPTED_VALUE>
    - secure: <ENCRYPTED_VALUE>

```

## Release the release version to maven central

Lets integrate your gradle release with upload to maven central.

* Add the below task to `build.gradle`

```
/*
 * For each release, push the released artifacts to OSS sonatype
 */
afterReleaseBuild.dependsOn uploadArchives
```

* To create release

```
$gradle release
```

> At this point, I am creating release build from my personal computer. 

If anybody has a solution to release in automated way, then please let me know by sending an email to [me](mailto:rishikesh.darandale@gmail.com)! Thanks.

> Once you push your first release, then do not forget to comment on your project jira. This is needed to setup the auto-sync of your artifacts with maven central. Please refer [here](http://central.sonatype.org/pages/releasing-the-deployment.html) for more details.