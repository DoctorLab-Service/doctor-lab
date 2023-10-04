// /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/ // phone
// /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ // email

<!-- FOR GRAPH DEP -->
<https://graphviz.gitlab.io/download/>

``` bash
npm install -g dependency-cruiser
# or
npm install --save-dev dependency-cruiser

npx dependency-cruiser --init
npx dependency-cruiser --modules --output-type dot src | dot -Tsvg -o dependency-graph.svg
```
