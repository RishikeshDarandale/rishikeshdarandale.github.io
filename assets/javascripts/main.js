---
---
var words = [
  {% for skill in site.data.bio.skills %}
    {text: "{{skill.name}}", weight: {{skill.weight}} } {% if forloop.last == false %},{% endif %}
  {% endfor %}
];

$( document ).ready(function() {
  console.log( "ready!" );
  $('#skills').jQCloud(words);
});
