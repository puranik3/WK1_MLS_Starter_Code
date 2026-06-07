# Questions

## Week 1 - Introduction to AI-assisted development

### Question 1
What happens if I have 2 Copilot business plans? How do I know which business plan I am using? How can I switch between them?  
  
_Answer_: If two organizations grant Copilot access to the same GitHub account, the resolution happens on GitHub's side rather than through a VS Code setting. GitHub's current model does not provide a user-facing "switch active business subscription" button in VS Code.

### Question 2
Are completions still unlimited with the business plan? If code completion is not accepted, is it charged?  
  
_Answer_: Code completions and Next Edit suggestions remain included in all plans and do not consume AI Credits.

### Question 3
Does Copilot have a deny list (folder list) feature?  

__Answer__: TODO

### Question 4
For some reason Prework introduced ES6 but didn’t include Arrow function and Lambda function content.  

__Answer__: The difference between arrow function and traditional function is mainly in the behavior of `this` (apart from shorter syntax). Please raise this question in the next class, I will explain it with an example at the end.

### Question 5
What is __zero-shot prompting__ and __few-shot prompting__? Can you give an example of each?  

_Answer_: Zero-shot and few-shot examples are usually provided at inference time, as part of the prompt sent to the model (examples are included only for that specific request, and need to be provided each time).

So they are not training the model permanently.

**Zero-shot prompting**: When prompting to identify sentiment of product reviews, you ask the model to do a task without giving examples.

```text
Classify the sentiment of this review as Positive, Negative, or Neutral:

"The phone is fast, but the battery drains quickly."
```

Possible output:

```text
Neutral
```

**Few-shot prompting**: You give a few examples first, then ask the model to follow the same pattern. Notice that the final Review is the same as in the zero-shot example, but now we have provided examples to guide the model.

```text
Classify the sentiment of each review.

Review: "The laptop is excellent and very fast."
Sentiment: Positive

Review: "The delivery was late and the box was damaged."
Sentiment: Negative

Review: "The product is okay, nothing special."
Sentiment: Neutral

Review: "The phone is fast, but the battery drains quickly."
Sentiment:
```

Possible output:

```text
Neutral
```

So, the difference is:

**Zero-shot** = no examples.
**Few-shot** = a few examples to guide the model.

### Question 6
Opening app via Live server and opening HTML file directly in the browser - what is the difference and which one is better for development and why?  

_Answer_:
- Live server provides a local development environment that mimics a real web server, allowing you to test your web applications in conditions similar to production.
- `http://` vs `file://` protocol
- fetch() requests do not work with `file://` protocol due to CORS policy, but work with `http://` protocol provided by live server.
```javascript
fetch('./data/products.json')
```

**file://**

```text
file:///C:/project/data/products.json
```

May fail because of browser security.

**[http://localhost:5500](http://localhost:5500)**

```text
http://localhost:5500/data/products.json
```

Works normally.
- ES Modules may fail with `file://` protocol but work correctly with live server.
```html
<script type="module" src="app.js"></script>
```
- Routing in SPAs usually breaks.
- __SUMMARY__: The difference is mainly in **how the browser loads resources and what features are available**.