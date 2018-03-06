---
layout: post
title:  "Implenting search using lunr.js in jekyll site"
date:   2016-09-12 11:45:04 +0530
updated-date: 2017-04-21 11:29:00 +0530
categories: dev-setup
tags:
  - coding
  - jekyll
  - lunr.js
share: true
read_time: true
---

By this time while reading this blog, probably you might have your [jekyll] site up and running on github pages or may be on AWS(Cloud Front backed by s3 bucket). Everybody wants to have some sort of search functionality on their personal site/blog. Definitely, I am not an exception to it.

Thus this lead me to find a way to have a search functionality on personal page/blog site. With help of google, I found a [simple jekyll search][simple-search] implementation on jekyll site.

You can find the code on [github][simple-search-code] and it's super easy to integrate it with your existing jekyll site.

As this is simple search, it will not look for two keywords rather it will search for complete word. e.g. "search jekyll" this should be consecutive words in your blog/page. This lead me to find for other options.

I came across [lunr.js][lunr], which is a simple full text search engine for your client side applications. The best part of lunr.js is it's full featured without needing any dependency on server side search services.

Actual data for indexing and the index are stored in HTML 5 session storage to avoid the getting the data for every page request with indexing. Rather lets stored it upfront in sessionStorage for this session for once and use it.

So, I have integrated the lunr.js with [simple jekyll search][simple-search-code] as below:

* Add lunr.js [library][lunr-library] to your jekyll site and include it in your project.

```html
  <script src="/assets/javascripts/vendor/lunr.min.js"></script>
  <script src="/assets/javascripts/search.js"></script>
```

* For the first time / if the sessionStorage does not have the index data, then store the actual data and the index in sessionStorage with configuration as below:
```javascript
/**
 * Initiate search functionality.
 * Shows results based on querystring if present.
 * Binds search function to form submission.
 */
function initSearch() {
  if(!sessionStorage.getItem("lunrIndex")) {
    // get the data
    getData();
  } else {
    // Get search results if q parameter is set in querystring
    if (getParameterByName('q')) {
      q = decodeURIComponent(getParameterByName('q'));
      $searchInput.val(q);
      execSearch(q);
    }
  }

  // Get search results on submission of form
  $searchForm.submit(function(e) {
    e.preventDefault();
    q = $searchInput.val();
    execSearch(q);
});
}
```

* The actual ```getData``` function looks like below
```javascript
/**
 * Get the JSON data
 * Get the generated feeds/feed.json file so lunr.js can search it locally.
 * Store the index in sessionStorage
 */
function getData() {
  jqxhr = $.getJSON(jsonFeedUrl)
    .done(function(loaded_data){
      // save the actual data as well
      sessionStorage.setItem("actualData", JSON.stringify(loaded_data));
      // set the index fields
      indexVar = lunr(function () {
        this.field('id');
        this.field('title');
        this.field('content', { boost: 10 });
        this.field('author');
        loaded_data.forEach(function (doc, index) {
          if ( doc.search_omit != "true" ) {
            console.log("adding to index: " + doc.title);
            this.add($.extend({ "id": index }, doc));
          }
        }, this)
      });

      // store the index in sessionStorage
      sessionStorage.setItem("lunrIndex", JSON.stringify(indexVar));
      // Get search results if q parameter is set in querystring
      if (getParameterByName('q')) {
        q = decodeURIComponent(getParameterByName('q'));
        $searchInput.val(q);
        execSearch(q);
      }
    })
    .fail( function() {
      console.log("get json failed...");
    })
    .always( function() {
      console.log("finally...");
    });
}
```

* The ```search``` function will look like below:
```javascript
/**
 * Get the search result from lunr
 * @param {String} q
 * @returns search results
 */
function getResults(q) {
  var savedIndexData = JSON.parse(sessionStorage.getItem("lunrIndex"));
  console.log("Indexed var from sessionStorage: " + savedIndexData);
  return lunr.Index.load(savedIndexData).search(q);
}
```

Morever, you can refer my new [modified code][lunr-search-code] repository for search and see it live in action on my personal [github page][gh-page].


[jekyll]: http://jekyllrb.com/
[simple-search]: http://mathayward.com/jekyll-search/
[simple-search-code]: https://github.com/mathaywarduk/jekyll-search
[lunr]: http://lunrjs.com/
[lunr-library]: https://github.com/olivernn/lunr.js/releases
[lunr-search-code]: https://github.com/RishikeshDarandale/jekyll-search
[gh-page]: https://rishikeshdarandale.github.io/
