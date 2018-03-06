---
layout: post
title:  "A signed HTTP request for AWS resources"
date:   2018-02-25 14:35:04 +0530
categories: cloud
tags:
  - aws
  - aws-sign-v4
  - http
  - http-client
  - aws-http
share: true
read_time: true
---

Recently, I was working with [AWS](https://aws.amazon.com/) [elasticsearch](https://aws.amazon.com/elasticsearch-service/) service and I had [AWS](https://aws.amazon.com/) [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) function which does some busiess logic interacting with [elasticsearch](https://aws.amazon.com/elasticsearch-service/) service. While making an `http` call to [elasticsearch](https://aws.amazon.com/elasticsearch-service/) service from [AWS](https://aws.amazon.com/) [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) function, we need to sign the the http request with [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). To get this signing process easy, I decided to use [aws-java-sdk-core](https://github.com/aws/aws-sdk-java/tree/master/aws-java-sdk-core) library which uses [Apache HttpComponents](https://hc.apache.org/) for `http` communication. Here is sample code to make a [signed] http request to [AWS](https://aws.amazon.com/) [elasticsearch](https://aws.amazon.com/elasticsearch-service/) service:

```java
    // Create the request
    Request<Void> request = new DefaultRequest<Void>("es");
    request.setHttpMethod(HttpMethodName.GET);
    request.setEndpoint(URI.create("http://..."));

    // Sign it
    AWS4Signer signer = new AWS4Signer();
    signer.setRegionName("...");
    signer.setServiceName(request.getServiceName());
    signer.sign(request, new AwsCredentialsFromSystem());

    // Execute and get the response
    Response<String> rsp = new AmazonHttpClient(new ClientConfiguration())
        .requestExecutionBuilder()
        .executionContext(new ExecutionContext(true))
        .request(request)
        .errorResponseHandler(new MyErrorHandler())
        .execute(new MyResponseHandler<String>());
```

So, while writing this code, I was also thinking inline with [this](http://www.amihaiemil.com/2017/02/18/decorators-with-tunnels.html) article about the above code. But, rather than using the tunnel decorators, I decided to use [jcabi-http](https://github.com/jcabi/jcabi-http) a fluent http api for my purpose. Sample code with jcabi will be as follows:

```java
    String name = new JdkRequest("http://...")
      .fetch()
      .as(JsonResponse.class)
      .json()
      .readJsonObject().getString("name");
```

That being said, I need to provide a way to sign the the http request of [jcabi-http](https://github.com/jcabi/jcabi-http) api. Thus I decided to implement the [Wire](https://github.com/jcabi/jcabi-http/blob/master/src/main/java/com/jcabi/http/Wire.java) interface to sign the request. This `wire` implementation will take the necessary signing input parameters for signing process. The future state of api can be depicted as below:

```java
    String name = new JdkRequest("http://...")
      .through(AwsSigner.class, new AwsSignParams("id", "key", "region", "service"));
      .fetch()
      .as(JsonResponse.class)
      .json()
      .readJsonObject().getString("name");
```

The only thing I saw missing here is lots of [old dependencies](https://www.versioneye.com/user/projects/561a9e01a193340f32000eab) and a lot more dependencies. The lot more dependencies means increase in your footprint of deployment package of [AWS](https://aws.amazon.com/) [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) function. Thus I decided to create my own [aws-http](https://github.com/RishikeshDarandale/aws-http) library to sign the http request for [AWS](https://aws.amazon.com/) services. I am not saying that this is perfect and everyone should use it, but rather I want to learn new things! The code snippet with `aws-http` api will be:

```java
    MyClass myClassObject = new JdkRequest("https://www.somehost.com")
          .method(RequestMethod.GET)
          .path("/mypath")
          .queryParams("message", "hello*world")
          .header("Accept", "application/json")
          .header("Content-Type", "application/json")
          .body("{}")
          .sign(AwsSignParams("myAccessKey", "MySecretId", "es"))
          .execute()
          .getAs(MyClass.class);
```

### Credits
I would like to extend the credits to
* [Mihai](http://www.amihaiemil.com/aboutme/about.html)
* [jcabi-http](https://github.com/jcabi/jcabi-http)